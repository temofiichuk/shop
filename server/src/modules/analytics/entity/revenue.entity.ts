import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Revenue {
	@Field(() => Int)
	current: number;

	@Field(() => Int)
	previous?: number;
}