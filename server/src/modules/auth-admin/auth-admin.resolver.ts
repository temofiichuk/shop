import { Args, Query, Resolver } from "@nestjs/graphql";
import { AuthAdminService } from "./auth-admin.service";
import { AuthAdminResponse } from "./entities/auth-admin.entity";
import { LoginAdminInput } from "./dto/login-auth-admin.input";
import { IsAdminAuth } from "./decorators/auth.decorators";
import { CustomValidationPipe } from "../../pipes/custom-validation.pipe";
import { UsePipes } from "@nestjs/common";

@Resolver()
export class AuthAdminResolver {
	constructor(private readonly authAdminService: AuthAdminService) {
	}

	@Query(() => AuthAdminResponse)
	@UsePipes(CustomValidationPipe)
	async authAdminLogin(@Args("loginInput") loginInput: LoginAdminInput) {
		// console.log(await this.authAdminService.login(loginInput));
		return await this.authAdminService.login(loginInput);
	}

	@Query(() => AuthAdminResponse)
	@IsAdminAuth()
	authAdminNewTokens(@Args("refresh_token") refresh_token: string) {
		return this.authAdminService.getNewTokens(refresh_token);
	}
}
