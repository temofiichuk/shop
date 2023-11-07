import { Args, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthData } from "./entities/auth-data.entity";
import { UsePipes } from "@nestjs/common";
import { CustomValidationPipe } from "./pipes/custom-validation.pipe";
import { LoginUserInput } from "./dto/login-user.input";
import { RefreshTokenInput } from "./dto/token.input";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(CustomValidationPipe)
  @Query(() => AuthData)
  login(@Args("data") data: LoginUserInput) {
    return this.authService.login(data);
  }

  @UsePipes(CustomValidationPipe)
  @Query(() => AuthData)
  getNewTokens(@Args("data") token: RefreshTokenInput) {
    return this.authService.getNewTokens(token.refresh_token);
  }
}
