import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Review } from "../../review/entities/review.entity";
import { Admin } from "../../admin/entities/admin.entity";
import { ProductVariant } from "../../product-variant/entities/product-variant.entity";
import { ProductCategory } from "../../product-category/entities/product-category.entity";
import { ProductPromotion } from "../../product-promotion/entities/product-promotion.entity";
import { Wishlist } from "../../wishlist/entities/wishlist.entity";
import { ProductImage } from "../../product-image/entities/product-image.entity";
import { ProductAttribute } from "../../product-attribute/entities/product-attribute.entity";

@ObjectType()
export class Product {
	@Field(() => Int)
	id: number;

	@Field()
	name: string;

	@Field()
	description: string;

	@Field()
	sku: string;

	@Field(() => Int)
	base_price: number;

	@Field()
	slug: string;

	@Field(() => Int)
	stock: number;

	@Field(() => Int, { defaultValue: 0 })
	rating: number;

	@Field(() => [Review])
	reviews?: Review[];

	@Field(() => Admin)
	admin?: Admin;

	@Field(() => Int)
	admin_id?: number;

	@Field()
	created_at: Date;

	@Field()
	updated_at: Date;

	@Field(() => [ProductVariant])
	variants?: ProductVariant[];

	@Field(() => [ProductCategory])
	categories?: ProductCategory[];

	@Field(() => [ProductImage])
	images?: ProductImage[];

	@Field(() => [ProductPromotion])
	promotions?: ProductPromotion[];

	@Field(() => [Wishlist])
	wishlist?: Wishlist[];

	@Field(() => [ProductAttribute])
	attributes?: ProductAttribute[];
}
