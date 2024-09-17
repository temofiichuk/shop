import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { User } from "@prisma/client";
import { PrismaService } from "../../prisma.service";

type ValidationPayloadType = {
	user: {
		id: number;
		email: string;
	}
};

@Injectable()
export class JwtAuthUserStrategy extends PassportStrategy(Strategy, "jwt-user") {
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

	async validate({ user: { id, email } }: ValidationPayloadType): Promise<User> {
		console.log("jwt user");
		const user = await this.prisma.user.findFirst({ where: { id, email } });
		if (!user) throw new UnauthorizedException();
		return user;
	}
}

