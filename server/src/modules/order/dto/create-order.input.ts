import { Field, InputType, Int } from "@nestjs/graphql";
import { IsArray, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { CreateOrderItemInput } from "../../order-item/dto/create-order-item.input";

@InputType()
export class CreateOrderInput {
	@Field(() => Int, { nullable: true })
	@IsInt()
	@IsOptional()
	user_id?: number;

	@Field(() => Int)
	@IsNotEmpty()
	@IsInt()
	total_price: number;

	@Field(() => [CreateOrderItemInput])
	@IsArray()
	@IsNotEmpty()
	order_items: CreateOrderItemInput[];
}
