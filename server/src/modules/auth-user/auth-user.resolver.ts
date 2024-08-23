import { Args, Query, Resolver } from "@nestjs/graphql";
import { AuthUserService } from "./auth-user.service";
import { AuthUserResponse } from "./entities/auth-user.entity";
import { UsePipes } from "@nestjs/common";
import { CustomValidationPipe } from "../../pipes/custom-validation.pipe";
import { LoginUserInput } from "../auth.example/dto/login-user.input";
import { IsUserAuth } from "./decorators/auth.decorators";

@Resolver(() => AuthUserResponse)
export class AuthUserResolver {
	constructor(private readonly authUserService: AuthUserService) {
	}

	@Query(() => AuthUserResponse)
	@UsePipes(CustomValidationPipe)
	authUserLogin(@Args("loginInput") loginInput: LoginUserInput) {
		return this.authUserService.login(loginInput);
	}


	@Query(() => AuthUserResponse)
	@IsUserAuth()
	authUserNewTokens(@Args("refresh_token") refresh_token: string) {
		return this.authUserService.getNewTokens(refresh_token);
	}
}
