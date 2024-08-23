import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { Admin } from "@prisma/client";
import { AdminService } from "../admin/admin.service";

type ValidationPayloadType = {
	id: number;
};

@Injectable()
export class JwtAuthAdminStrategy extends PassportStrategy(Strategy, "jwt") {
	constructor(
		private configService: ConfigService,
		private adminService: AdminService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get("JWT_SECRET"),
		});
	}

	async validate({ id }: ValidationPayloadType): Promise<Admin> {
		const admin = await this.adminService.getById(+id);
		if (!admin) throw new UnauthorizedException();
		return admin;
	}
}

