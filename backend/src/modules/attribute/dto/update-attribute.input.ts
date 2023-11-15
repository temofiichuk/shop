import {
  CreateAttributeInput,
  CreateAttributeValueInput,
} from "./create-attribute.input";
import { InputType, Field, Int, PartialType, OmitType } from "@nestjs/graphql";
import { IsOptional } from "class-validator";

@InputType()
export class UpdateAttributeValueInput extends PartialType(
  CreateAttributeValueInput
) {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  id?: number;
}

@InputType()
export class UpdateAttributeInput extends PartialType(
  OmitType(CreateAttributeInput, ["values"])
) {
  @Field(() => Int)
  id: number;

  @Field(() => [UpdateAttributeValueInput])
  values: UpdateAttributeValueInput[];
}
