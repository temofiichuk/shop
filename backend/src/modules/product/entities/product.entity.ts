import { ObjectType, Field, Int } from "@nestjs/graphql";

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
export class ProductCategoryType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  slug: string;
}

@ObjectType()
export class ProductSubCategoryType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field(() => ProductCategoryType)
  category: ProductCategoryType;
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
  descriptions: ProductDescriptionType[];

  @Field(() => ProductCategoryType)
  category: ProductCategoryType;

  @Field(() => Int)
  category_id: number;

  @Field(() => ProductSubCategoryType)
  subcategory: ProductSubCategoryType;

  @Field(() => Int)
  subcategory_id: number;

  @Field(() => [ProductImageType])
  images: ProductImageType[];

  @Field()
  quantity: number;

  @Field()
  stock: number;
}
