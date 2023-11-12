import { InputType, Field } from "@nestjs/graphql";

import { IsEmail, IsNotEmpty } from "class-validator";
@InputType()
export class LoginUserInput {
  @Field()
  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;
}