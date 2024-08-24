import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProductAttribute {
	@Field(() => Int)
	id: number;

	@Field(() => String)
	name: string;

	@Field(() => Date)
	created_at: Date;

	@Field(() => Date)
	updated_at: Date;
}