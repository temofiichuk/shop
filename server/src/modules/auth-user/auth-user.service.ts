import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { LoginUserInput } from "./dto/login-auth-user.input";
import { Prisma, User } from "@prisma/client";
import { verify } from "argon2";
import { PrismaService } from "../../prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthUserService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwt: JwtService,
		private readonly configService: ConfigService,
	) {
	}

	async login(data: LoginUserInput) {
		let availableUser = await this.getUser({ email: data.email }) as User;

		if (!availableUser) throw new NotFoundException("User Not Found");

		const isPasswordCorrect = await verify(
			availableUser.password,
			data.password,
		);

		if (!isPasswordCorrect) {
			throw new UnauthorizedException("Password Incorrect");
		}

		return await this.getAuthFields(availableUser);
	}


	async getNewTokens(refreshToken: string) {
		const isVerifiedToken = await this.jwt
			.verifyAsync(refreshToken)
			.catch(() => {
				throw new UnauthorizedException();
			});

		const user = await this.getUser({ id: isVerifiedToken.id }) as User;
		return await this.getAuthFields(user);
	}

	private async getUser(param: Prisma.UserWhereUniqueInput) {
		return this.prisma.user.findUnique({ where: param });
	}

	private async getAuthFields({ id, email, username }: User) {
		return {
			user: { id, email, username },
			...(await this.createNewTokens(id)),
		};
	}

	private async createNewTokens(id: number) {
		const accessToken = await this.jwt.signAsync(
			{ id },
			{ expiresIn: this.configService.get("LIFECYCLE_ACCESS_TOKEN") },
		);
		const refreshToken = await this.jwt.signAsync(
			{ id },
			{ expiresIn: this.configService.get("LIFECYCLE_REFRESH_TOKEN") },
		);

		return { accessToken, refreshToken };
	}
}
