import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class ProductDescriptionType {
  @Field()
  head: string;

  @Field()
  body: string;
}

@ObjectType()
export class ProductCategoryType {
  @Field()
  name: string;

  @Field()
  slug: string;
}

@ObjectType()
export class ProductSubCategoryType {
  @Field()
  name: string;

  @Field()
  slug: string;

  @Field(() => [ProductCategoryType])
  category: ProductCategoryType;
}

@ObjectType()
export class ProductImageType {
  @Field()
  name: string;

  @Field()
  url: string;
}

@ObjectType()
export class Product {
  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  slug: string;

  @Field(() => [ProductDescriptionType])
  descriptions: ProductDescriptionType[];

  @Field(() => [ProductCategoryType])
  category: ProductCategoryType;

  @Field(() => [ProductSubCategoryType])
  subcategory: ProductSubCategoryType;

  @Field(() => [ProductImageType])
  images: ProductImageType[];

  @Field()
  quantity: number;

  @Field()
  stock: number;
}
