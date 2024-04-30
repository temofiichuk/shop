import { CreateProductInput, DescriptionInput } from "./create-product.input";
import { Field, ID, InputType, Int, OmitType, PartialType } from "@nestjs/graphql";
import { IsNumber, IsOptional } from "class-validator";

@InputType()
export class UpdateDescriptionInput extends PartialType(DescriptionInput) {
	@Field(() => Int, { nullable: true })
	@IsNumber()
	@IsOptional()
	id?: number;
}

@InputType()
export class UpdateProductInput extends PartialType(
	OmitType(CreateProductInput, ["descriptions"])
) {
	@Field(() => Int)
	@IsNumber()
	id: number;

	@Field(() => [UpdateDescriptionInput])
	descriptions: UpdateDescriptionInput[];
}
