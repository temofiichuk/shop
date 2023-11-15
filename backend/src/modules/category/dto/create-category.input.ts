import { InputType, Field } from "@nestjs/graphql";
import { IsString, Matches } from "class-validator";

@InputType()
export class CreateCategoryInput {
  @Field()
  @IsString()
  @Matches(/^\p{Lu}\p{Ll}*/u, { message: "Must be Sentence Case" })
  name: string;
}
