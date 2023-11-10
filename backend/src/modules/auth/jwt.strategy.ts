import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { User } from "@prisma/client";
import { UserService } from "../user/user.service";
import { AdminService } from "../admin/admin.service";
import { AdminOutputType } from "../admin/dto/admin.output";

type ValidationPayloadType = { id: number; type: string };

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private configService: ConfigService,
    private userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT_SECRET"),
    });
  }

  async validate({ id, type }: ValidationPayloadType): Promise<User> {
    console.log("user validate");
    const user: User = await this.userService.getById(+id);
    if (type !== "user" && !user) throw new UnauthorizedException();
    return user;
  }
}

@Injectable()
export class JwtAuthAdminStrategy extends PassportStrategy(
  Strategy,
  "adminJwt"
) {
  constructor(
    private configService: ConfigService,
    private adminService: AdminService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT_SECRET"),
    });
  }

  async validate({
    id,
    type,
  }: ValidationPayloadType): Promise<{ admin: AdminOutputType }> {
    console.log("admin validate");
    const admin: AdminOutputType = await this.adminService.getById(+id);
    if (type !== "admin" || !admin) throw new UnauthorizedException();
    return { admin };
  }
}
