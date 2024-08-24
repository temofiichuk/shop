import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsNotEmpty } from "class-validator";

@InputType()
export class CreateOrderItemInput {
	@Field(() => Int)
	@IsNotEmpty()
	@IsInt()
	product_variant_id: number;

	@Field(() => Int)
	@IsNotEmpty()
	@IsInt()
	quantity: number;

	@Field(() => Int)
	@IsNotEmpty()
	@IsInt()
	price: number;

	@Field(() => Int)
	@IsNotEmpty()
	@IsInt()
	total_price: number;
}
