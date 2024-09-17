import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Revenue {
	@Field(() => Int)
	current: number;

	@Field(() => Int)
	previous?: number;
}

@ObjectType()
export class RevenueAnalytics {
	@Field(() => String)
	period: string;

	@Field(() => Int)
	revenue?: number;
}