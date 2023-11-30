import { InputType, Field } from "@nestjs/graphql";

import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";
import { EnumUserRole } from "@prisma/client";
@InputType()
export class LoginUserInput {
  @Field()
  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsEnum(EnumUserRole)
  role: EnumUserRole;
}
