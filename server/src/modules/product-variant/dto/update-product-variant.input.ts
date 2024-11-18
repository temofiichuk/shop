import { CreateProductVariantAttributeInput, CreateProductVariantInput } from "./create-product-variant.input";
import { Field, InputType, Int, OmitType } from "@nestjs/graphql";

@InputType()
export class UpdateProductVariantAttributeInput extends CreateProductVariantAttributeInput {
	@Field(() => Int, { nullable: true })
	id?: number;
}

@InputType()
export class UpdateProductVariantInput extends OmitType(CreateProductVariantInput, ["variant_attributes"]) {
	@Field(() => Int, { nullable: true })
	id?: number;

	@Field(() => [UpdateProductVariantAttributeInput], { nullable: true })
	variant_attributes?: UpdateProductVariantAttributeInput[];
}
