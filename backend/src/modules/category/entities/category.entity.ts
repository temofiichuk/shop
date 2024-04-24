import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Subcategory } from "../../subcategory/entities/subcategory.entity";
import { Product } from "../../product/entities/product.entity";
import { Group } from "../../group/entities/group.entity";

@ObjectType()
export class Category {
	@Field(() => Int)
	id: number;

	@Field()
	name: string;

	@Field()
	slug: string;

	@Field(() => [Subcategory])
	subcategories: Subcategory[];

	@Field(() => [Group])
	groups: Group[];

	@Field(() => [Product])
	products: Product[];

	@Field()
	created_at: Date;

	@Field()
	updated_at: Date;
}
