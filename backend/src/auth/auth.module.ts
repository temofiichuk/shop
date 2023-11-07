import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { PrismaService } from "../prisma.service";
import { JwtModule } from "@nestjs/jwt";
import { getJWTConfig } from "../config/jwt.config";
import { JwtStrategy } from "./jwt.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  providers: [AuthResolver, AuthService, PrismaService, JwtStrategy],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
    ConfigModule,
  ],
})
export class AuthModule {}
