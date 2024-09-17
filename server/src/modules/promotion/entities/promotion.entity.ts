import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ProductPromotion } from "../../product-promotion/entities/product-promotion.entity";
import { EnumDiscountType } from "@prisma/client";

@ObjectType()
export class Promotion {
	@Field(() => Int)
	id: number;

	@Field()
	name: string;

	@Field()
	description: string;

	@Field(() => EnumDiscountType)
	discount_type: EnumDiscountType;

	@Field({ nullable: true })
	start_date?: Date;

	@Field({ nullable: true })
	end_data?: Date;

	@Field()
	created_at: Date;

	@Field()
	updated_at: Date;

	@Field(() => [ProductPromotion])
	promotions: ProductPromotion[];
}