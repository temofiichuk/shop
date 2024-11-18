import { CreateProductAttributeValueInput } from "./create-product-attribute-value.input";
import { Field, InputType, Int, PartialType } from "@nestjs/graphql";


@InputType()
export class UpdateProductAttributeValueInput extends PartialType(CreateProductAttributeValueInput) {
	@Field(() => Int, { nullable: true })
	id?: number;
}
