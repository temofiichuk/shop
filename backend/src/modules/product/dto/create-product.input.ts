import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class ProductDescription {
  @Field()
  head: string;

  @Field()
  body: string;
}

@InputType()
export class ProductCategory {
  @Field()
  name: string;

  @Field()
  slug: string;
}

@InputType()
export class ProductSubCategory {
  @Field()
  name: string;

  @Field()
  slug: string;

  @Field(() => [ProductCategory])
  category: ProductCategory;
}

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  slug: string;

  @Field(() => [ProductDescription])
  descriptions: ProductDescription[];

  @Field(() => [ProductCategory])
  category: ProductCategory;

  @Field(() => [ProductSubCategory])
  subcategory: ProductSubCategory;

  @Field()
  image: string;

  @Field()
  quantity: number;

  @Field()
  stock: number;
}
