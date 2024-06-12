import { CreateCategoryInput } from "./create-category.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";
import { IsOptional } from "class-validator";

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
	@Field(() => Int, { nullable: true })
	@IsOptional()
	id?: number;

	@Field(() => [UpdateCategoryInput], { nullable: true })
	@IsOptional()
	children?: UpdateCategoryInput[];
}
