import { CreateProductVariantAttributeInput, CreateProductVariantInput } from "./create-product-variant.input";
import { Field, InputType, Int, OmitType } from "@nestjs/graphql";
import { IsInt, IsNotEmpty } from "class-validator";

@InputType()
export class UpdateProductVariantAttributeInput extends CreateProductVariantAttributeInput {
	@Field(() => Int)
	@IsInt()
	@IsNotEmpty()
	id: number;
}

@InputType()
export class UpdateProductVariantInput extends OmitType(CreateProductVariantInput, ["variant_attributes"]) {
	@Field(() => Int)
	@IsInt()
	@IsNotEmpty()
	id: number;

	@Field(() => [UpdateProductVariantAttributeInput])
	variant_attributes: UpdateProductVariantAttributeInput[];
}
