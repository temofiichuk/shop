import { Module } from "@nestjs/common";
import { AuthUserService } from "./auth-user.service";
import { AuthUserResolver } from "./auth-user.resolver";
import { PrismaService } from "src/prisma.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { getJWTConfig } from "src/config/jwt.config";
import { JwtAuthUserStrategy } from "./jwt.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserService } from "../user/user.service";

@Module({
	providers: [
		AuthUserResolver,
		AuthUserService,
		PrismaService,
		JwtAuthUserStrategy,
		UserService,
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
export class AuthUserModule {
}
