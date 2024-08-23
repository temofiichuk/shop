import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { User } from "@prisma/client";
import { UserService } from "../user/user.service";

type ValidationPayloadType = {
	id: number;
};

@Injectable()
export class JwtAuthUserStrategy extends PassportStrategy(Strategy, "jwt") {
	constructor(
		private configService: ConfigService,
		private userService: UserService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get("JWT_SECRET"),
		});
	}

	async validate({ id }: ValidationPayloadType): Promise<User> {
		const user = await this.userService.getById(+id);
		if (!user) throw new UnauthorizedException();
		return user;
	}
}

