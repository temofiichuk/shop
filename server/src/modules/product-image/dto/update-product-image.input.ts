import { CreateProductImageInput } from "./create-product-image.input";
import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { IsInt, IsNotEmpty } from "class-validator";

@InputType()
export class UpdateProductImageInput extends PartialType(CreateProductImageInput) {
	@Field(() => Int)
	@IsInt()
	@IsNotEmpty()
	id: number;
}
