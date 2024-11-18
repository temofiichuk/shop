import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class CreateProductVariantAttributeInput {
	@Field(() => String)
	name: string;

	@Field(() => String)
	value: string;
}

@InputType()
export class CreateProductVariantInput {
	@Field(() => Int)
	@IsNotEmpty()
	@IsInt()
	price: number;

	@Field(() => Int)
	@IsNotEmpty()
	@IsInt()
	stock: number;

	@Field(() => String, { nullable: true })
	sku?: string;

	@Field(() => [CreateProductVariantAttributeInput], { nullable: true })
	variant_attributes?: CreateProductVariantAttributeInput[];

	@Field(() => Int, { nullable: true })
	@IsOptional()
	@IsInt()
	product_image_id?: number;

}