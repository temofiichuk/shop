import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Subcategory } from "../../subcategory/entities/subcategory.entity";
import { Product } from "../../product/entities/product.entity";

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

	@Field(() => [Product])
	products: Product[];

	@Field()
	created_at: Date;

	@Field()
	updated_at: Date;
}
