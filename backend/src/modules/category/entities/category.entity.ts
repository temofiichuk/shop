import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Product } from "../../product/entities/product.entity";
import { Category as CategoryEntity } from "@prisma/client";
import { CategoryType } from "../../category-type/entities/category-type.entity";

@ObjectType()
export class Category implements CategoryEntity {
	@Field(() => Int)
	id: number;

	@Field()
	name: string;

	@Field()
	type: CategoryType;

	@Field()
	type_name: string;

	@Field(() => Int, { nullable: true })
	parent_id: number;

	@Field(() => Category)
	parent: Category;

	@Field(() => [Category])
	children: Category[];

	@Field(() => [Product])
	products: Product[];

	@Field()
	created_at: Date;

	@Field()
	updated_at: Date;
}
