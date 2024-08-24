import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "../../user/entities/user.entity";
import { Product } from "../../product/entities/product.entity";
import { EnumReviewStatus } from "@prisma/client";

@ObjectType()
export class Review {
	@Field(() => Int)
	id: number;

	@Field()
	comment: string;

	@Field(() => Product)
	product?: Product;

	@Field(() => Int, { nullable: true })
	product_id?: number;

	@Field(() => User)
	user?: User;

	@Field(() => Int, { nullable: true })
	user_id?: number;

	@Field(() => EnumReviewStatus)
	status: EnumReviewStatus;

	@Field()
	created_at: Date;

	@Field()
	updated_at: Date;
}