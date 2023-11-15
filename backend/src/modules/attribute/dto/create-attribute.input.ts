import { InputType, Field } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class CreateAttributeValueInput {
  @Field()
  value: string;
}

@InputType()
export class CreateAttributeInput {
  @Field()
  @IsString()
  name: string;

  @Field(() => [CreateAttributeValueInput])
  values: CreateAttributeValueInput[];
}
