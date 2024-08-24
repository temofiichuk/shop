import { Field, InputType, Int } from "@nestjs/graphql";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, Min } from "class-validator";

@InputType()
export class CreateProductImageInput {
	@Field(() => Int)
	@IsNotEmpty()
	@IsInt()
	product_id: number;

	@Field()
	@IsString()
	@IsInt()
	@Min(3, { message: "There must be at least 3 characters" })
	name: string;

	@Field()
	@IsNotEmpty()
	@IsUrl()
	url: string;

	@Field({ defaultValue: false })
	@IsBoolean()
	@IsOptional()
	is_main?: boolean;
}