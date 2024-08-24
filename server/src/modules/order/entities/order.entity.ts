import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "../../user/entities/user.entity";
import { OrderItem } from "../../order-item/entities/order-item.entity";

@ObjectType()
export class Order {
	@Field(() => Int)
	id: number;

	@Field(() => User)
	user?: User;

	@Field(() => Int, { nullable: true })
	user_id?: number;

	@Field(() => Int)
	total_price: number;

	@Field()
	status: string; // Change to EnumOrderStatus if you use enum

	@Field(() => [OrderItem])
	order_items: OrderItem[];

	@Field()
	created_at: Date;

	@Field()
	updated_at: Date;
}