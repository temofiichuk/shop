import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Product } from "../../product/entities/product.entity";
import { EnumCategoryType } from "@prisma/client";

@ObjectType()
export class Category {
	@Field(() => Int)
	id: number;

	@Field()
	name: string;

	@Field()
	type: EnumCategoryType;

	@Field()
	parent_id: number;

	@Field()
	parent: Category;

	@Field()
	children: Category[];

	@Field(() => [Product])
	products: Product[];

	@Field()
	created_at: Date;

	@Field()
	updated_at: Date;
}
