import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { AdminService } from "./admin.service";
import { Admin } from "./entities/admin.entity";
import { CreateAdminInput } from "./dto/create-admin.input";
import { UpdateAdminInput } from "./dto/update-admin.input";
import { SuccessOutput } from "../user/dto/success.output";
import { CustomValidationPipe } from "src/pipes/custom-validation.pipe";
import { UsePipes } from "@nestjs/common";

@Resolver(() => Admin)
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Query(() => [Admin])
  adminGetAll() {
    return this.adminService.getAll();
  }

  @Mutation(() => SuccessOutput)
  @UsePipes(CustomValidationPipe)
  adminCreate(@Args("createAdminInput") createAdminInput: CreateAdminInput) {
    return this.adminService.create(createAdminInput);
  }

  @Mutation(() => Admin)
  adminUpdate(@Args("updateAdminInput") updateAdminInput: UpdateAdminInput) {
    return this.adminService.update(updateAdminInput.id, updateAdminInput);
  }

  @Mutation(() => Admin)
  adminRemove(@Args("id", { type: () => Int }) id: number) {
    return this.adminService.remove(id);
  }
}
