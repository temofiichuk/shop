import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ProductVariant } from "../../product-variant/entities/product-variant.entity";
import { Order } from "../../order/entities/order.entity";

@ObjectType()
export class OrderItem {
	@Field(() => Int)
	id: number;

	@Field(() => Order)
	order?: Order;

	@Field(() => Int, { nullable: true })
	order_id?: number;

	@Field(() => ProductVariant)
	product_variant: ProductVariant;

	@Field(() => Int)
	product_variant_id: number;

	@Field(() => Int)
	quantity: number;

	@Field(() => Int)
	price: number;

	@Field(() => Int)
	total_price: number;

	@Field()
	created_at: Date;

	@Field()
	updated_at: Date;
}