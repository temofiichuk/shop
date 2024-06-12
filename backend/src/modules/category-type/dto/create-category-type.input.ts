import { InputType, Field } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class CreateCategoryTypeInput {
	@Field()
	@IsString()
	name: string;
}
