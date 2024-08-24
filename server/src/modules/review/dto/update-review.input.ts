import { CreateReviewInput } from "./create-review.input";
import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { IsInt, IsNotEmpty } from "class-validator";

@InputType()
export class UpdateReviewInput extends PartialType(CreateReviewInput) {
	@Field(() => Int)
	@IsInt()
	@IsNotEmpty()
	id: number;
}
