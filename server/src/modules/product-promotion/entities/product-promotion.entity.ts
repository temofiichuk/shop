import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Promotion } from "../../promotion/entities/promotion.entity";
import { Product } from "../../product/entities/product.entity";

@ObjectType()
export class ProductPromotion {
	@Field(() => Int)
	id: number;

	@Field(() => Product)
	product: Product;

	@Field(() => Int)
	product_id: number;

	@Field(() => Promotion)
	promotion: Promotion;

	@Field(() => Int)
	promotion_id: number;

	@Field()
	created_at: Date;

	@Field()
	updated_at: Date;
}