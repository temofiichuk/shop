import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Product } from "../../product/entities/product.entity";

@ObjectType()
export class ProductImage {
	@Field(() => Int)
	id: number;

	@Field(() => Product)
	product?: Product;

	@Field(() => Int, { nullable: true })
	product_id?: number;

	@Field()
	name: string;

	@Field()
	url: string;

	@Field()
	created_at: Date;

	@Field()
	updated_at: Date;

	@Field()
	is_main: boolean;
}