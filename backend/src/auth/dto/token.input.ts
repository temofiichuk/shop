import { InputType, Field } from "@nestjs/graphql";

import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUppercase,
  Length,
  Matches,
  MinLength,
} from "class-validator";
@InputType()
export class RefreshTokenInput {
  @Field()
  @IsString()
  refresh_token: string;
}
