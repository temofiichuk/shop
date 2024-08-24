import { CreateProductInput } from "./create-product.input";
import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { IsInt, IsNotEmpty } from "class-validator";

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
	@Field(() => Int)
	@IsInt()
	@IsNotEmpty()
	id: number;
}
