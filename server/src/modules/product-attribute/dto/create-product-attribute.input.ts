import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, Min } from "class-validator";

@InputType()
export class CreateProductAttributeInput {
	@Field(() => String)
	@IsNotEmpty()
	@IsString()
	@Min(3, { message: "There must be at least 3 characters" })
	name: string;
}