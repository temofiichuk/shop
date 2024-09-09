import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsNotEmpty, IsOptional, IsString, Matches, Min } from "class-validator";
import { Prisma } from "@prisma/client";

@InputType()
export class CreateProductInput implements Prisma.ProductCreateInput {
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
}
