import { CreateOrderItemInput } from "./create-order-item.input";
import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { IsInt, IsNotEmpty } from "class-validator";

@InputType()
export class UpdateOrderItemInput extends PartialType(CreateOrderItemInput) {
	@Field(() => Int)
	@IsInt()
	@IsNotEmpty()
	id: number;
}
