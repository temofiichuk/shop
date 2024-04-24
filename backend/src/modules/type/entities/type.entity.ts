import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Category } from "../../category/entities/category.entity";
import { Product } from "../../product/entities/product.entity";
import { Group } from "../../group/entities/group.entity";

@ObjectType()
export class Type {
	@Field(() => Int)
	id: number;

	@Field()
	name: string;

	@Field()
	created_at: Date;

	@Field()
	updated_at: Date;

	@Field(() => [Product], { nullable: true })
	products: Product[];

	@Field(() => Category, { nullable: true })
	group: Category;

	@Field(() => Int, { nullable: true })
	group_id: number;

	@Field(() => Group, { nullable: true })
	Group: Group;

	@Field(() => Int, { nullable: true })
	groupId: number;

	@Field({ nullable: true })
	slug: string;
}
