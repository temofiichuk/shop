import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { Admin, EnumUserRole, User } from "@prisma/client";
import { UserService } from "../user/user.service";
import { AdminService } from "../admin/admin.service";

type ValidationPayloadType = { id: number; role: string };

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

  async validate({ id, role }: ValidationPayloadType): Promise<User> {
    const user = await this.userService.getById(+id);
    if (role !== EnumUserRole.USER && !user) throw new UnauthorizedException();
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

  async validate({ id, role }: ValidationPayloadType): Promise<Admin> {
    const admin = await this.adminService.getById(+id);
    if (role !== EnumUserRole.ADMIN || !admin)
      throw new UnauthorizedException();
    return admin;
  }
}
