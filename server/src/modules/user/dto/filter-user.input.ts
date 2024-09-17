import { Field, InputType } from "@nestjs/graphql";
import { PaginationInput } from "../../../services/pagination/dto/pagination.input";
import { IsOptional } from "class-validator";

@InputType()
export class FilterUserInput {
	@Field(() => PaginationInput)
	@IsOptional()
	pagination?: PaginationInput;
}
