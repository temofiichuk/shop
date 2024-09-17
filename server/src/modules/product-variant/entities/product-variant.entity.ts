import { Field, Int, ObjectType } from "@nestjs/graphql";
import { OrderItem } from "../../order-item/entities/order-item.entity";
import { Product } from "../../product/entities/product.entity";
import { Wishlist } from "../../wishlist/entities/wishlist.entity";
import { ProductImage } from "../../product-image/entities/product-image.entity";


@ObjectType()
export class ProductVariantAttribute {
	@Field(() => Int)
	id: number;

	@Field(() => String)
	name: string;

	@Field(() => String)
	value: string;

	@Field()
	created_at: Date;

	@Field()
	updated_at: Date;
}


@ObjectType()
export class ProductVariant {
	@Field(() => Int)
	id: number;

	@Field(() => Int)
	product_id: number;

	@Field(() => Product)
	product: Product;

	@Field(() => Int)
	price: number;

	@Field(() => Int)
	stock: number;

	@Field()
	created_at: Date;

	@Field()
	updated_at: Date;

	@Field(() => [OrderItem])
	order_items?: OrderItem[];

	@Field(() => [Wishlist])
	wishlist?: Wishlist[];

	@Field(() => [ProductImage])
	product_image?: ProductImage[];

	@Field(() => Int, { nullable: true })
	product_image_id?: number;

	@Field(() => [ProductVariantAttribute])
	variant_attributes: ProductVariantAttribute[];
}
