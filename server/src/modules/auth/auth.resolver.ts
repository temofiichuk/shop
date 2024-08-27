import { Args, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { UsePipes } from "@nestjs/common";
import { CustomValidationPipe } from "../../pipes/custom-validation.pipe";
import { AuthResponse } from "./entities/auth.entity";
import { LoginInput } from "./dto/auth.input";
import { IsAdminAuth } from "./decorators/auth-admin.decorators";
import { IsUserAuth } from "./decorators/auth-user.decorators";

@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {
	}

	@Query(() => AuthResponse)
	@UsePipes(CustomValidationPipe)
	async authAdminLogin(@Args("loginInput") loginInput: LoginInput) {
		return await this.authService.loginAdmin(loginInput);
	}

	@Query(() => AuthResponse)
	@IsAdminAuth()
	authAdminNewTokens(@Args("refresh_token") refresh_token: string) {
		return this.authService.adminTokens(refresh_token);
	}

	@Query(() => AuthResponse)
	@UsePipes(CustomValidationPipe)
	async authUserLogin(@Args("loginInput") loginInput: LoginInput) {
		return await this.authService.loginUser(loginInput);
	}

	@Query(() => AuthResponse)
	@IsUserAuth()
	authUserNewTokens(@Args("refresh_token") refresh_token: string) {
		return this.authService.userTokens(refresh_token);
	}
}
