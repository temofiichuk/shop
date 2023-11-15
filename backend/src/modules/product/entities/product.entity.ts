import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Category } from "../../category/entities/category.entity";
import { Subcategory } from "../../subcategory/entities/subcategory.entity";

@ObjectType()
export class ProductDescriptionType {
  @Field(() => Int)
  id: number;

  @Field()
  head: string;

  @Field()
  body: string;
}

@ObjectType()
export class ProductImageType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  url: string;
}

@ObjectType()
export class Product {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  slug: string;

  @Field(() => [ProductDescriptionType])
  descriptions?: ProductDescriptionType[];

  @Field(() => Category)
  category?: Category;

  @Field(() => Int)
  category_id?: number;

  @Field(() => Subcategory)
  subcategory?: Subcategory;

  @Field(() => Int)
  subcategory_id?: number;

  @Field(() => [ProductImageType])
  images?: ProductImageType[];

  @Field()
  quantity: number;

  @Field()
  stock: number;
}
