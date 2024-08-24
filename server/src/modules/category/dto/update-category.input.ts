import { CreateCategoryInput } from "./create-category.input";
import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { IsInt, IsNotEmpty } from "class-validator";

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
	@Field(() => Int)
	@IsInt()
	@IsNotEmpty()
	id: number;
}
