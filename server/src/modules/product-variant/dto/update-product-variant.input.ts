import { CreateProductVariantInput } from "./create-product-variant.input";
import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { IsInt, IsNotEmpty } from "class-validator";

@InputType()
export class UpdateProductVariantInput extends PartialType(CreateProductVariantInput) {
	@Field(() => Int)
	@IsInt()
	@IsNotEmpty()
	id: number;
}
