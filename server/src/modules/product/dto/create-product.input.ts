import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsNotEmpty, IsOptional, IsString, Matches, Min } from "class-validator";
import { CreateProductVariantInput } from "../../product-variant/dto/create-product-variant.input";
import { CreateProductAttributeInput } from "../../product-attribute/dto/create-product-attribute.input";

@InputType()
export class ConnectCategoryInput {
	@Field(() => Int)
	id: number;
}

@InputType()
export class CreateProductInput {
	@Field()
	@IsNotEmpty()
	@IsString()
	@Matches(/^\p{Lu}\p{Ll}*\b/u, { message: "Must be Regular case" })
	name: string;

	@Field()
	@IsNotEmpty()
	@IsString()
	@Min(5)
	description: string;

	@Field()
	@IsNotEmpty()
	@IsString()
	sku: string;

	@Field(() => Int)
	@IsInt()
	@IsNotEmpty()
	base_price: number;

	@Field(() => Int, { defaultValue: 0, nullable: true })
	@IsInt()
	@IsOptional()
	@IsNotEmpty()
	stock?: number;

	@Field(() => [CreateProductAttributeInput])
	attributes: CreateProductAttributeInput[];

	@Field(() => [CreateProductVariantInput])
	variants: CreateProductVariantInput[];

	@Field(() => [ConnectCategoryInput])
	categories: ConnectCategoryInput[];
}
