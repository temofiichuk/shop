import { CreateOrderInput } from "./create-order.input";
import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { IsInt, IsNotEmpty } from "class-validator";


@InputType()
export class UpdateOrderInput extends PartialType(CreateOrderInput) {
	@Field(() => Int)
	@IsInt()
	@IsNotEmpty()
	id: number;

}
