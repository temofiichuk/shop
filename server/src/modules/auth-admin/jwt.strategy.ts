import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { Admin, EnumAdminRole } from "@prisma/client";
import { PrismaService } from "../../prisma.service";

type ValidationPayloadType = {
	user: {
		id: number;
		email: string;
		role: EnumAdminRole
	}
};

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

	async validate(payload: ValidationPayloadType): Promise<Admin> {
		console.log("jwt-admin");
		const { user: { id, email, role } } = payload;
		const admin = await this.prisma.admin.findUnique({ where: { id, email } });

		if (!admin) throw new UnauthorizedException();
		return admin;
	}

}
