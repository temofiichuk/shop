import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { UsePipes } from "@nestjs/common";
import { CustomValidationPipe } from "../../pipes/custom-validation.pipe";
import { IsUserAuth } from "../auth/decorators/auth-user.decorators";
import { CurrentUser } from "../auth/decorators/current-user.decorators";
import { FilterUserInput } from "./dto/filter-user.input";
import { IsAdminAuth } from "../auth/decorators/auth-admin.decorators";

@Resolver(() => User)
export class UserResolver {
	constructor(private readonly userService: UserService) {
	}

	@Mutation(() => User)
	@UsePipes(CustomValidationPipe)
	userCreate(@Args("createUserInput") createUserInput: CreateUserInput) {
		return this.userService.create(createUserInput);
	}

	@Query(() => [User])
	@IsAdminAuth()
	users(@Args("filter", { nullable: true }) filter?: FilterUserInput) {
		return this.userService.findAll(filter);
	}

	@Mutation(() => User)
	@UsePipes(CustomValidationPipe)
	@IsUserAuth()
	userUpdate(
		@CurrentUser("id") id: number,
		@Args("updateUserInput") updateUserInput: UpdateUserInput,
	) {
		return this.userService.update(id, updateUserInput);
	}

	@Mutation(() => User)
	@IsUserAuth()
	userRemove(@CurrentUser("id") current_user_id: number) {
		return this.userService.remove(current_user_id);
	}

	@Query(() => User)
	@IsUserAuth()
	userById(@Args("id", { type: () => Int }) id: number) {
		return this.userService.getById(id);
	}

}
