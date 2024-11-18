import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Review } from "../../review/entities/review.entity";
import { Admin } from "../../admin/entities/admin.entity";
import { ProductVariant } from "../../product-variant/entities/product-variant.entity";
import { ProductPromotion } from "../../product-promotion/entities/product-promotion.entity";
import { Wishlist } from "../../wishlist/entities/wishlist.entity";
import { ProductImage } from "../../product-image/entities/product-image.entity";
import { ProductAttribute } from "../../product-attribute/entities/product-attribute.entity";
import { Category } from "../../category/entities/category.entity";

@ObjectType()
export class Product {
	@Field(() => Int)
	id: number;

	@Field()
	name: string;

	@Field()
	description: string;

	@Field(() => String, { nullable: true })
	sku?: string;

	@Field(() => Int)
	base_price: number;

	@Field()
	slug: string;

	@Field(() => Int)
	stock: number;

	@Field(() => Int, { defaultValue: 0 })
	rating: number;

	@Field(() => [Review], { nullable: true })
	reviews?: Review[];

	@Field(() => Admin, { nullable: true })
	admin?: Admin;

	@Field(() => Int, { nullable: true })
	admin_id?: number;

	@Field()
	created_at: Date;

	@Field()
	updated_at: Date;

	@Field(() => [ProductVariant], { nullable: true })
	variants?: ProductVariant[];

	@Field(() => [Category], { nullable: true })
	categories?: Category[];

	@Field(() => [ProductImage], { nullable: true })
	images?: ProductImage[];

	@Field(() => [ProductPromotion], { nullable: true })
	promotions?: ProductPromotion[];

	@Field(() => [Wishlist], { nullable: true })
	wishlist?: Wishlist[];

	@Field(() => [ProductAttribute], { nullable: true })
	attributes?: ProductAttribute[];
}
