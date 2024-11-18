import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator";
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
	@Length(5)
	description: string;

	@Field({ nullable: true })
	@IsString()
	@IsOptional()
	sku?: string;

	@Field(() => Int)
	@IsInt()
	@IsNotEmpty()
	base_price: number;

	@Field(() => Int, { nullable: true })
	@IsInt()
	@IsOptional()
	@IsNotEmpty()
	stock?: number;

	@Field(() => [CreateProductAttributeInput], { nullable: true })
	attributes?: CreateProductAttributeInput[];

	@Field(() => [CreateProductVariantInput], { nullable: true })
	variants?: CreateProductVariantInput[];

	@Field(() => [ConnectCategoryInput], { nullable: true })
	categories?: ConnectCategoryInput[];
}
