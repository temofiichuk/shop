import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User, UserResponse } from "./entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { UsePipes } from "@nestjs/common";
import { CustomValidationPipe } from "../../pipes/custom-validation.pipe";
import { Auth } from "../auth/decorators/auth.decorators";
import { CurrentUser } from "../auth/decorators/current-user.decorators";
import { SuccessOutput } from "./dto/success.output";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => SuccessOutput)
  @UsePipes(CustomValidationPipe)
  userCreate(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  @UsePipes(CustomValidationPipe)
  @Auth()
  userUpdate(
    @CurrentUser("id") id: number,
    @Args("updateUserInput") updateUserInput: UpdateUserInput
  ) {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  @Auth()
  userRemove(@Args("id") id: number) {
    return this.userService.remove(id);
  }

  @Query(() => User)
  @Auth()
  userById(@Args("id", { type: () => Int }) id: number) {
    return this.userService.getById(id);
  }

  @Mutation(() => UserResponse)
  @Auth()
  userToggleFavorite(
    @CurrentUser("id") id: number,
    @Args("product_id", { type: () => Int }) productId: number
  ) {
    return this.userService.toggleFavorite(id, productId);
  }
}
