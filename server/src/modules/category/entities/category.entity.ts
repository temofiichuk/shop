import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Category {
	@Field(() => Int)
	id: number;

	@Field(() => String)
	name: string;

	@Field(() => Int, { nullable: true })
	parent_id?: number;

	@Field(() => Category)
	parent?: Category;

	@Field(() => String)
	slug: string;

	@Field(() => Date)
	created_at: Date;

	@Field(() => Date)
	updated_at: Date;

	@Field(() => [Category])
	children: Category[];
}