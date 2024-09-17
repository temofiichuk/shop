import { CreateAttributeInput } from "./create-attribute.input";
import { Field, InputType, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateAttributeInput extends PartialType(CreateAttributeInput) {
	@Field(() => Int)
	id: number;
}
