import { InputType, Field, OmitType } from "@nestjs/graphql";

import { CreateUserInput } from "../../user/dto/create-user.input";
import { EnumAdminType } from "@prisma/client";
import { IsEnum, IsOptional } from "class-validator";

@InputType()
export class CreateAdminInput extends OmitType(CreateUserInput, ["phone"]) {
  @Field({ nullable: true })
  @IsEnum(EnumAdminType)
  @IsOptional()
  type?: EnumAdminType;
}
