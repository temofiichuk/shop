import { InputType, Field, Int } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";

@InputType()
export class CreateGroupInput {
	@Field()
	@IsString()
	name: string;

	@Field(() => Int, { nullable: true })
	@IsOptional()
	category_id: number;

	@Field(() => Int, { nullable: true })
	@IsOptional()
	subcategory_id: number;
}
