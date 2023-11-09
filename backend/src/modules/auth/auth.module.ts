import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { PrismaService } from "src/prisma.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { getJWTConfig } from "src/config/jwt.config";
import { JwtAuthAdminStrategy, JwtAuthStrategy } from "./jwt.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserService } from "../user/user.service";
import { AdminService } from "../admin/admin.service";

@Module({
  providers: [
    AuthResolver,
    AuthService,
    PrismaService,
    JwtAuthStrategy,
    JwtAuthAdminStrategy,
    UserService,
    AdminService,
  ],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
    ConfigModule,
    PassportModule,
  ],
})
export class AuthModule {}
