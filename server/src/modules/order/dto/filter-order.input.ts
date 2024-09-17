import { Field, InputType } from "@nestjs/graphql";
import { DateFilter } from "../../../services/filter/dto/filter.input";


@InputType()
export class OrderFilterInput {
	@Field(() => DateFilter)
	created_at?: DateFilter;
}
