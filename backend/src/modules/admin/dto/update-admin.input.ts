import { CreateAdminInput } from "./create-admin.input";
import { InputType, Field, ID } from "@nestjs/graphql";

@InputType()
export class UpdateAdminInput extends CreateAdminInput {
  @Field(() => ID)
  id: number;
}
