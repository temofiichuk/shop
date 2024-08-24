import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

@InputType()
export class CreateWishlistInput {
	@Field(() => Int)
	@IsInt()
	@IsNotEmpty()
	user_id: number;

	@Field(() => Int, { nullable: true })
	@IsOptional()
	@IsNumber()
	product_id?: number;

	@Field(() => Int, { nullable: true })
	@IsOptional()
	@IsNumber()
	product_variant_id?: number;
}