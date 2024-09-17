import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { PrismaService } from "../../prisma.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getJWTConfig } from "../../config/jwt.config";
import { JwtAuthAdminStrategy } from "./jwt.admin.strategy";
import { JwtAuthUserStrategy } from "./jwt.user.strategy";

@Module({
	providers: [AuthResolver, AuthService, PrismaService, JwtAuthAdminStrategy, JwtAuthUserStrategy, PassportModule],
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
export class AuthModule {
}
