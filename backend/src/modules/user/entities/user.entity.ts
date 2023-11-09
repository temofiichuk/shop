import { ObjectType, Field, ID, OmitType } from "@nestjs/graphql";

@ObjectType()
export class Image {
  @Field()
  id: number;

  @Field()
  product_id: number;

  @Field()
  name: string;

  @Field()
  url: string;
}

@ObjectType()
export class FavoriteProduct {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  price: number;

  @Field(() => [Image])
  images: Image[];

  @Field()
  slug: string;
}

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  phone: string;

  @Field()
  avatar: string;
}

@ObjectType()
export class UserResponse extends OmitType(User, ["password"]) {
  @Field(() => [FavoriteProduct])
  favorites: FavoriteProduct[];
}
