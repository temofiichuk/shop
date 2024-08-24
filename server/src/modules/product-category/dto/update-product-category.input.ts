import { CreateProductCategoryInput } from "./create-product-category.input";
import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { IsInt, IsNotEmpty } from "class-validator";

@InputType()
export class UpdateProductCategoryInput extends PartialType(CreateProductCategoryInput) {
	@Field(() => Int)
	@IsInt()
	@IsNotEmpty()
	id: number;
}
