import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateTypeInput {
	@Field()
	name: string;

	@Field(() => Int)
	group_id: number;
}
