import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AdminService } from "./admin.service";
import { Admin } from "./entities/admin.entity";
import { CreateAdminInput } from "./dto/create-admin.input";
import { UpdateAdminInput } from "./dto/update-admin.input";
import { UsePipes } from "@nestjs/common";
import { CustomValidationPipe } from "../../pipes/custom-validation.pipe";
import { CurrentAdmin } from "../auth.example/decorators/current-admin.decorators";

@Resolver(() => Admin)
export class AdminResolver {
	constructor(private readonly adminService: AdminService) {
	}

	@Mutation(() => Admin)
	@UsePipes(CustomValidationPipe)
	adminCreate(@Args("createAdminInput") createAdminInput: CreateAdminInput) {
		return this.adminService.create(createAdminInput);
	}

	@Mutation(() => Admin)
	@UsePipes(CustomValidationPipe)
	// @Auth()
	adminUpdate(
		@CurrentAdmin("id") id: number,
		@Args("updateAdminInput") updateAdminInput: UpdateAdminInput,
	) {
		return this.adminService.update(id, updateAdminInput);
	}

	@Mutation(() => Admin)
	// @Auth()
	adminRemove(@CurrentAdmin("id") current_admin_id: number) {
		return this.adminService.remove(current_admin_id);
	}

	@Query(() => Admin)
	// @Auth()
	adminById(@Args("id", { type: () => Int }) id: number) {
		return this.adminService.getById(id);
	}
}
