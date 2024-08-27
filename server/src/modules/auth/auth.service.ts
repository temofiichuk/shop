import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Admin, Prisma } from "@prisma/client";
import { LoginInput } from "./dto/auth.input";
import { selectAuth } from "./dto/auth.output";

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwt: JwtService,
		private readonly configService: ConfigService,
	) {
	}

	async loginAdmin(data: LoginInput) {
		let availableAdmin = await this.prisma.admin.findUnique({
			where: { email: data.email },
			select: { ...selectAuth, password: true },
		}) as Admin;

		if (!availableAdmin) throw new NotFoundException("Admin Not Found");
		await this.isPasswordCorrect(data.password, availableAdmin.password);

		return await this.getAuthFields(availableAdmin);
	}

	async loginUser(data: LoginInput) {
		selectAuth.role = undefined;
		let availableUser = await this.prisma.user.findUnique({
			where: { email: data.email },
			select: { ...selectAuth, password: true },
		});

		if (!availableUser) throw new NotFoundException("Admin Not Found");
		await this.isPasswordCorrect(data.password, availableUser.password);

		return await this.getAuthFields(availableUser);
	}

	private async isPasswordCorrect(inputPass: string, availablePass: string): Promise<boolean> {
		//!!!
		// const isPasswordCorrect = await verify(
		// 	availablePass,
		// 	inputPass,
		// );
		const isPasswordCorrect = inputPass === availablePass;

		if (!isPasswordCorrect) {
			throw new UnauthorizedException("Password Incorrect");
		}
		return isPasswordCorrect;
	}


	async adminTokens(refreshToken: string) {
		console.log("get new admin tokens");
		const isVerifiedToken = await this.jwt
			.verifyAsync(refreshToken)
			.catch(() => {
				throw new UnauthorizedException();
			});

		const admin = await this.getAdmin({ id: isVerifiedToken.id });
		return await this.getAuthFields(admin);
	}

	async userTokens(refreshToken: string) {
		console.log("get new admin tokens");
		const isVerifiedToken = await this.jwt
			.verifyAsync(refreshToken)
			.catch(() => {
				throw new UnauthorizedException();
			});

		const user = await this.getUser({ id: isVerifiedToken.id });
		return await this.getAuthFields(user);
	}

	private async getAdmin(param: Prisma.AdminWhereUniqueInput) {
		return this.prisma.admin.findUnique({
			where: param, select: {
				password: false, id: true, role: true, email: true, first_name: true, last_name: true,
			},
		});
	}

	private async getUser(param: Prisma.UserWhereUniqueInput) {
		return this.prisma.user.findUnique({
			where: param, select: {
				password: false, id: true, email: true, first_name: true, last_name: true,
			},
		});
	}

	private async getAuthFields(user) {
		return {
			user,
			...(await this.createNewTokens(user)),
		};
	}

	private async createNewTokens(user) {
		const accessToken = await this.jwt.signAsync(
			{ user },
			{ expiresIn: this.configService.get("LIFECYCLE_ACCESS_TOKEN") },
		);
		const refreshToken = await this.jwt.signAsync(
			{ user },
			{ expiresIn: this.configService.get("LIFECYCLE_REFRESH_TOKEN") },
		);

		return { accessToken, refreshToken };
	}
}
