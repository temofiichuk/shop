import { CreateAdminInput } from "./create-admin.input";
import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { IsInt, IsNotEmpty } from "class-validator";

@InputType()
export class UpdateAdminInput extends PartialType(CreateAdminInput) {
	@Field(() => Int)
	@IsInt()
	@IsNotEmpty()
	id: number;
}
