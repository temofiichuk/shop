import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Product } from "../../product/entities/product.entity";
import { User } from "../../user/entities/user.entity";
import { EnumReviewStatus } from "@prisma/client";

@ObjectType()
export class Review {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  rating: number;

  @Field()
  comment: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field(() => [Product])
  product: Product[];

  @Field(() => Int)
  product_id: number;

  @Field(() => User)
  user: User;

  @Field(() => Int)
  user_id: number;

  @Field()
  status: EnumReviewStatus;
}
