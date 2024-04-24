import { ObjectType, Field, Int, ID } from "@nestjs/graphql";
import { Subcategory } from "../../subcategory/entities/subcategory.entity";
import { Product } from "../../product/entities/product.entity";
import { Type } from "../../type/entities/type.entity";
import { Category } from "../../category/entities/category.entity";

@ObjectType()
export class Group {
	@Field(() => ID)
	id: number;

	@Field()
	name: string;

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;

	@Field(() => [Product], { nullable: true })
	products: Product[];

	@Field(() => [Type], { nullable: true })
	types: Type[];

	@Field(() => Category, { nullable: true })
	category: Category;

	@Field(() => Int, { nullable: true })
	category_id: number;

	@Field(() => Subcategory, { nullable: true })
	subcategory: Subcategory;

	@Field(() => Int, { nullable: true })
	subcategory_id: number;

	@Field({ nullable: true })
	slug: string;
}
