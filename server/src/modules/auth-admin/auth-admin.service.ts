import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { LoginAdminInput } from "./dto/login-auth-admin.input";
import { Admin, Prisma } from "@prisma/client";
import { verify } from "argon2";

@Injectable()
export class AuthAdminService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwt: JwtService,
		private readonly configService: ConfigService,
	) {
	}

	async login(data: LoginAdminInput) {
		let availableAdmin = await this.getAdmin({ email: data.email }) as Admin;

		if (!availableAdmin) throw new NotFoundException("Admin Not Found");

		const isPasswordCorrect = await verify(
			availableAdmin.password,
			data.password,
		);

		if (!isPasswordCorrect) {
			throw new UnauthorizedException("Password Incorrect");
		}

		return await this.getAuthFields(availableAdmin);
	}


	async getNewTokens(refreshToken: string) {
		const isVerifiedToken = await this.jwt
			.verifyAsync(refreshToken)
			.catch(() => {
				throw new UnauthorizedException();
			});

		const admin = await this.getAdmin({ id: isVerifiedToken.id }) as Admin;
		return await this.getAuthFields(admin);
	}

	private async getAdmin(param: Prisma.AdminWhereUniqueInput) {
		return this.prisma.admin.findUnique({ where: param });
	}

	private async getAuthFields({ id, email, role }: Admin) {
		return {
			admin: { id, email, role },
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
