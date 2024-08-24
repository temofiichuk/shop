import { CreateProductPromotionInput } from "./create-product-promotion.input";
import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { IsInt, IsNotEmpty } from "class-validator";

@InputType()
export class UpdateProductPromotionInput extends PartialType(CreateProductPromotionInput) {
	@Field(() => Int)
	@IsInt()
	@IsNotEmpty()
	id: number;
}
