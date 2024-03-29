import { InputType, Field, Int } from "@nestjs/graphql";
import {
	IS_BOOLEAN,
	IsBoolean,
	IsLowercase,
	IsNumber,
	IsOptional,
	IsString,
	Matches,
} from "class-validator";

@InputType()
export class DescriptionInput {
	@Field()
	@IsString()
	@Matches(/^\p{Lu}\p{Ll}*/u, { message: "Must be Sentence Case" })
	head: string;

	@Field()
	@IsString()
	@Matches(/^\p{Lu}\p{Ll}*/u, { message: "Must be Sentence Case" })
	body: string;
}

@InputType()
export class ImageInput {
	@Field()
	@IsString()
	name: string;

	@Field()
	@IsString()
	url: string;

	@Field()
	@IsBoolean()
	is_main: boolean;
}

@InputType()
export class CreateProductInput {
	@Field()
	@IsString()
	@Matches(/^\p{Lu}\p{Ll}*/u, { message: "Must be Sentence Case" })
	name: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	slug?: string;

	@Field(() => Int)
	@IsNumber()
	price: number;

	@Field(() => Int, { nullable: true })
	@IsOptional()
	@IsNumber()
	combination_id?: number;

	@Field(() => [DescriptionInput], { nullable: true })
	@IsOptional()
	descriptions?: DescriptionInput[];

	@Field(() => Int)
	@IsNumber()
	stock: number;

	@Field(() => Int, { nullable: true })
	@IsOptional()
	@IsNumber()
	rating?: number;

	@Field(() => [ImageInput], { nullable: true })
	@IsOptional()
	images?: ImageInput[];

	@Field()
	@IsNumber()
	category_id: number;

	@Field()
	@IsNumber()
	subcategory_id: number;
}
