import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { AuthResponse, AuthUser } from "./entities/auth.entity";


@Injectable()
export class JwtAuthAdminStrategy extends PassportStrategy(Strategy, "jwt-admin") {
	constructor(
		private configService: ConfigService,
		private prisma: PrismaService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get("JWT_SECRET"),
		});
	}

	async validate(payload: AuthResponse): Promise<AuthUser> {
		const { user: { id, email } } = payload;
		const admin = await this.prisma.admin.findFirst({ where: { id, email } }) as AuthUser;
		if (!admin) throw new UnauthorizedException();
		return admin;
	}

}

