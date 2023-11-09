import { CreateUserInput } from "./create-user.input";
import { InputType, Field, ID } from "@nestjs/graphql";

@InputType()
export class UpdateUserInput extends CreateUserInput {
  @Field(() => ID)
  id: number;
}
