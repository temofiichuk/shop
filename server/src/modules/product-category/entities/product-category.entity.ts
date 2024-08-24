import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Category } from "../../category/entities/category.entity";
import { Product } from "../../product/entities/product.entity";

@ObjectType()
export class ProductCategory {
	@Field(() => Int)
	id: number;

	@Field(() => Product)
	product: Product;

	@Field(() => Int)
	product_id: number;

	@Field(() => Category)
	category: Category;

	@Field(() => Int)
	category_id: number;

	@Field()
	created_at: Date;

	@Field()
	updated_at: Date;
}
