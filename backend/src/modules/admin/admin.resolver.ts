import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { AdminService } from "./admin.service";
import { Admin } from "./entities/admin.entity";
import { CreateAdminInput } from "./dto/create-admin.input";
import { UpdateAdminInput } from "./dto/update-admin.input";
import { CustomValidationPipe } from "src/pipes/custom-validation.pipe";
import { HttpCode, UsePipes } from "@nestjs/common";
import { AuthAdmin } from "../auth/decorators/auth-admin.decorators";
import { CurrentAdmin } from "../auth/decorators/current-admin.decorators";
import { AdminOutputType } from "./dto/admin.output";

@Resolver(() => Admin)
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Query(() => [Admin])
  @AuthAdmin()
  adminGetAll() {
    return this.adminService.getAll();
  }

  @Mutation(() => Admin)
  @UsePipes(CustomValidationPipe)
  @AuthAdmin()
  @HttpCode(200)
  adminCreate(@Args("createAdminInput") createAdminInput: CreateAdminInput) {
    return this.adminService.create(createAdminInput);
  }

  @Mutation(() => Admin)
  @UsePipes(CustomValidationPipe)
  @AuthAdmin()
  @HttpCode(200)
  adminUpdate(
    @CurrentAdmin() admin: AdminOutputType,
    @Args("updateAdminInput") updateAdminInput: UpdateAdminInput
  ) {
    return this.adminService.update(updateAdminInput, admin);
  }

  @Mutation(() => Admin)
  @AuthAdmin()
  @HttpCode(200)
  adminRemove(@Args("id") id: number, @CurrentAdmin() admin: AdminOutputType) {
    return this.adminService.remove(id, admin);
  }
}
