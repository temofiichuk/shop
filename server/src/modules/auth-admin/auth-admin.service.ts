import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { LoginAdminInput } from "./dto/login-auth-admin.input";
import { Admin, Prisma } from "@prisma/client";

@Injectable()
export class AuthAdminService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwt: JwtService,
		private readonly configService: ConfigService,
	) {
	}

	async login(data: LoginAdminInput) {

		let availableAdmin = await this.prisma.admin.findUnique({
			where: { email: data.email },
			select: { password: true, id: true, role: true, email: true },
		}) as Admin;

		if (!availableAdmin) throw new NotFoundException("Admin Not Found");

		// const isPasswordCorrect = await verify(
		// 	availableAdmin.password,
		// 	data.password,
		// );
		const isPasswordCorrect = data.password === availableAdmin.password;

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
		const user = { id, email, role } as Admin;
		return {
			user,
			...(await this.createNewTokens(user)),
		};
	}

	private async createNewTokens(user: Admin) {
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
