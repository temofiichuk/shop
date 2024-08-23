import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { UsePipes } from "@nestjs/common";
import { CustomValidationPipe } from "../../pipes/custom-validation.pipe";
import { Auth } from "../auth/decorators/auth.decorators";
import { CurrentUser } from "../auth/decorators/current-user.decorators";

@Resolver(() => User)
export class UserResolver {
	constructor(private readonly userService: UserService) {
	}

	@Mutation(() => User)
	@UsePipes(CustomValidationPipe)
	userCreate(@Args("createUserInput") createUserInput: CreateUserInput) {
		return this.userService.create(createUserInput);
	}

	@Mutation(() => User)
	@UsePipes(CustomValidationPipe)
	@Auth()
	userUpdate(
		@CurrentUser("id") id: number,
		@Args("updateUserInput") updateUserInput: UpdateUserInput,
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
	
}
