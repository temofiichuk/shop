import { Field, Int, ObjectType } from "@nestjs/graphql";
import { OrderItem } from "../../order-item/entities/order-item.entity";
import { Product } from "../../product/entities/product.entity";
import { Wishlist } from "../../wishlist/entities/wishlist.entity";
import { ProductAttribute } from "../../product-attribute/entities/product-attribute.entity";

@ObjectType()
export class ProductVariant {
	@Field(() => Int)
	id: number;

	@Field(() => Product)
	product: Product;

	@Field(() => Int)
	product_id: number;

	@Field(() => ProductAttribute)
	attribute: ProductAttribute;

	@Field(() => Int)
	attribute_id: number;

	@Field()
	value: string;

	@Field(() => Int)
	price_modifier: number;

	@Field(() => Int)
	stock_quantity: number;

	@Field()
	created_at: Date;

	@Field()
	updated_at: Date;

	@Field(() => [OrderItem])
	order_item?: OrderItem[];

	@Field(() => [Wishlist])
	Wishlist?: Wishlist[];
}
