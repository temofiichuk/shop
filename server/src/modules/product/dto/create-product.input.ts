import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsLowercase, IsNotEmpty, IsOptional, IsString, Matches, Min } from "class-validator";

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

	@Field()
	@IsNotEmpty()
	@IsString()
	@IsLowercase()
	slug: string;

	@Field(() => Int, { defaultValue: 0, nullable: true })
	@IsInt()
	@IsOptional()
	@IsNotEmpty()
	stock?: number;

	@Field(() => Int, { nullable: true })
	@IsInt()
	@IsOptional()
	@IsNotEmpty()
	rating?: number;

	@Field(() => Int, { nullable: true })
	@IsInt()
	@IsOptional()
	admin_id?: number;
}
