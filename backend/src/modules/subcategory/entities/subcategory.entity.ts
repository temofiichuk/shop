import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Product } from "../../product/entities/product.entity";
import { Category } from "../../category/entities/category.entity";
import { Group } from "../../group/entities/group.entity";

@ObjectType()
export class Subcategory {
	@Field(() => Int)
	id: number;

	@Field()
	name: string;

	@Field()
	slug: string;

	@Field(() => [Product])
	products: Product[];

	@Field(() => Category)
	category: Category;

	@Field(() => Int)
	category_id: number;

	@Field(() => [Group])
	groups: Group[];

	@Field()
	created_at: Date;

	@Field()
	updated_at: Date;
}
