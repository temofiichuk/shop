import { InputType, Int, Field } from "@nestjs/graphql";
import { IsNumber, IsString, Matches } from "class-validator";

@InputType()
export class CreateSubcategoryInput {
	@Field()
	@IsString()
	@Matches(/^\p{Lu}\p{Ll}*/u, { message: "Must be Sentences Case" })
	name: string;

	@Field(() => Int)
	@IsNumber()
	category_id: number;
}
