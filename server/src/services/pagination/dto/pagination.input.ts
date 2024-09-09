import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsPositive } from "class-validator";

@InputType()
export class PaginationInput {
	@Field()
	@IsNumber()
	@IsPositive()
	page: number;

	@Field()
	@IsNumber()
	@IsPositive()
	take: number;
}
