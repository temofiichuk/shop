import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class RevenueInput {
	@Field(() => String)
	period: "week" | "month" | "year";
}

