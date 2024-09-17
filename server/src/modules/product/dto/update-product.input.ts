import { CreateProductInput } from "./create-product.input";
import { Field, InputType, Int, OmitType, PartialType } from "@nestjs/graphql";
import { IsInt, IsNotEmpty } from "class-validator";
import { UpdateProductVariantInput } from "../../product-variant/dto/update-product-variant.input";
import { UpdateProductAttributeInput } from "../../product-attribute/dto/update-product-attribute.input";

@InputType()
export class UpdateProductInput extends OmitType(PartialType(CreateProductInput), ["variants", "attributes"]) {
	@Field(() => Int)
	@IsInt()
	@IsNotEmpty()
	id: number;
	
	@Field(() => [UpdateProductAttributeInput])
	attributes: UpdateProductAttributeInput[];

	@Field(() => [UpdateProductVariantInput])
	variants: UpdateProductVariantInput[];

}
