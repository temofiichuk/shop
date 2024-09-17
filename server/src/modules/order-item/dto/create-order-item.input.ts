import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsNotEmpty } from "class-validator";
import { Prisma } from "@prisma/client";

@InputType()
export class CreateOrderItemInput implements Prisma.OrderItemCreateInput {
	@Field(() => Int)
	@IsNotEmpty()
	@IsInt()
	order_id: number;

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
}
