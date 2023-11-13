import { CreateAdminInput } from "./create-admin.input";
import { InputType, Field, PartialType, Int } from "@nestjs/graphql";
import { IsNumber } from "class-validator";

@InputType()
export class UpdateAdminInput extends PartialType(CreateAdminInput) {
  @Field(() => Int)
  @IsNumber()
  id: number;
}
