import { Args, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthData } from "./entities/auth-data.entity";
import { UsePipes } from "@nestjs/common";
import { CustomValidationPipe } from "src/pipes/custom-validation.pipe";
import { LoginUserInput } from "./dto/login-user.input";
import { LoginAdminInput } from "./dto/login-admin.input";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => AuthData)
  @UsePipes(CustomValidationPipe)
  authLogin(@Args("loginInput") loginInput: LoginUserInput) {
    return this.authService.login(loginInput);
  }

  @Query(() => AuthData)
  @UsePipes(CustomValidationPipe)
  authAdminLogin(@Args("loginAdminInput") loginAdminInput: LoginAdminInput) {
    return this.authService.loginAdmin(loginAdminInput);
  }

  @Query(() => AuthData)
  authNewTokens(@Args("refresh_token") refresh_token: string) {
    return this.authService.getNewTokens(refresh_token);
  }
}
