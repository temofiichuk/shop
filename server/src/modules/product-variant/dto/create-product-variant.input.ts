import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { Prisma } from "@prisma/client";

@InputType()
export class CreateProductVariantAttributeInput implements Prisma.ProductVariantAttributeCreateInput {
	@Field(() => String)
	name: string;

	@Field(() => String)
	value: string;
}

@InputType()
export class CreateProductVariantInput implements Prisma.ProductVariantCreateInput {
	@Field(() => Int)
	@IsNotEmpty()
	@IsInt()
	product_id: number;

	@Field(() => Int)
	@IsNotEmpty()
	@IsInt()
	price: number;

	@Field(() => Int)
	@IsNotEmpty()
	@IsInt()
	stock: number;

	@Field(() => [CreateProductVariantAttributeInput])
	variant_attributes?: CreateProductVariantAttributeInput[];

	@Field(() => Int, { nullable: true })
	@IsOptional()
	@IsInt()
	product_image_id?: number;

}