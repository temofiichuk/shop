import { Module } from "@nestjs/common";
import { AuthAdminService } from "./auth-admin.service";
import { AuthAdminResolver } from "./auth-admin.resolver";
import { PrismaService } from "../../prisma.service";
import { JwtAuthAdminStrategy } from "./jwt.strategy";
import { AdminService } from "../admin/admin.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getJWTConfig } from "../../config/jwt.config";
import { PassportModule } from "@nestjs/passport";

@Module({
	providers: [AuthAdminResolver, AuthAdminService, PrismaService, JwtAuthAdminStrategy, AdminService],
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
export class AuthAdminModule {
}
