import { InputType, Field } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsString, Matches } from "class-validator";
import { EnumCategoryType } from "@prisma/client";

@InputType()
export class CreateCategoryInput {
	@Field()
	@IsString()
	@Matches(/^\p{Lu}\p{Ll}*/u, { message: "Must be Regular Case" })
	name: string;

	@Field()
	type: EnumCategoryType;

	@Field({ nullable: true })
	@IsNumber()
	@IsOptional()
	parent_id: number;
}
