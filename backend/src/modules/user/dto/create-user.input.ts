import { InputType, Field } from "@nestjs/graphql";

import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches,
} from "class-validator";
@InputType()
export class CreateUserInput {
  @Field()
  @Matches(/^\p{Lu}\p{Ll}*\b/gu, { message: "Must be Camel Case" })
  @IsNotEmpty()
  name: string;

  @Field()
  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty()
  email: string;

  @Field()
  @Length(8, 255, { message: "Password must be at least 8 characters long" })
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      "Password must contain at least 8 characters including one uppercase letter, one lowercase letter, and one number",
  })
  password: string;

  @Field()
  @IsOptional()
  phone: string;

  @Field()
  @IsOptional()
  avatar: string;
}
