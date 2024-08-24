import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateProductVariantInput {
	@Field(() => Int)
	@IsNotEmpty()
	@IsInt()
	product_id: number;

	@Field(() => Int)
	@IsNotEmpty()
	@IsInt()
	attribute_id: number;

	@Field()
	@IsNotEmpty()
	@IsString()
	value: string;

	@Field(() => Int)
	@IsNotEmpty()
	@IsInt()
	price_modifier: number;

	@Field(() => Int)
	@IsNotEmpty()
	@IsInt()
	stock_quantity: number;
}