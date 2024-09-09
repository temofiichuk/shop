import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class StringFilter {
	@Field({ nullable: true })
	equals?: string;

	@Field({ nullable: true })
	contains?: string;

	@Field({ nullable: true })
	startsWith?: string;

	@Field({ nullable: true })
	endsWith?: string;
}

@InputType()
export class DateFilter {
	@Field({ nullable: true })
	equals?: Date;

	@Field({ nullable: true })
	gt?: Date;

	@Field({ nullable: true })
	lt?: Date;
}

@InputType()
export class IntFilter {
	@Field({ nullable: true })
	equals?: number;

	@Field({ nullable: true })
	lt?: number;

	@Field({ nullable: true })
	gt?: number;
}

@InputType()
export class FilterInput {
	@Field(() => StringFilter)
	stringFields?: { [key: string]: StringFilter };

	@Field(() => DateFilter)
	dateFields?: { [key: string]: DateFilter };

	@Field(() => IntFilter)
	intFields?: { [key: string]: IntFilter };
}
