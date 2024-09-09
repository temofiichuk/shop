import { Field, InputType } from "@nestjs/graphql";
import { DateFilter, IntFilter, StringFilter } from "../../../services/filter/dto/filter.input";

@InputType()
export class FilterProductInput {
	@Field(() => StringFilter)
	name?: StringFilter;

	@Field(() => DateFilter)
	date?: DateFilter;


	@Field(() => IntFilter)
	price?: IntFilter;
}
