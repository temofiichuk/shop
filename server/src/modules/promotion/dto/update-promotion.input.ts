import { CreatePromotionInput } from "./create-promotion.input";
import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { IsInt, IsNotEmpty } from "class-validator";

@InputType()
export class UpdatePromotionInput extends PartialType(CreatePromotionInput) {
	@Field(() => Int)
	@IsInt()
	@IsNotEmpty()
	id: number;
}
