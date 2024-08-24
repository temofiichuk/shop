import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsString, Matches, Min } from "class-validator";

@InputType()
export class CreateCategoryInput {
	@Field(() => String)
	@Matches(/^\p{Lu}\p{Ll}*\b/u, { message: "Must be Regular case" })
	@IsString()
	@IsNotEmpty()
	@Min(3)
	name: string;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	parent_id?: number;

	@Field({ nullable: true })
	slug?: string;
}