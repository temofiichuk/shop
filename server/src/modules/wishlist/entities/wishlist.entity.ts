import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ProductVariant } from "../../product-variant/entities/product-variant.entity";
import { User } from "../../user/entities/user.entity";
import { Product } from "../../product/entities/product.entity";

@ObjectType()
export class Wishlist {
	@Field(() => Int)
	id: number;

	@Field(() => User)
	user: User;

	@Field(() => Int)
	user_id: number;

	@Field(() => Product)
	product?: Product;

	@Field(() => Int, { nullable: true })
	product_id?: number;

	@Field(() => ProductVariant)
	product_variant?: ProductVariant;

	@Field(() => Int, { nullable: true })
	product_variant_id?: number;

	@Field()
	created_at: Date;

	@Field()
	updated_at: Date;
}