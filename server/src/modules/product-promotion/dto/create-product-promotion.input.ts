import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsNotEmpty } from "class-validator";

@InputType()
export class CreateProductPromotionInput {
	@Field(() => Int)
	@IsNotEmpty()
	@IsInt()
	product_id: number;

	@Field(() => Int)
	@IsNotEmpty()
	@IsInt()
	promotion_id: number;
}
