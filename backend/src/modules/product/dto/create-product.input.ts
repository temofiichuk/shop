import { InputType, Field, Int } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsString } from "class-validator";

@InputType()
export class DescriptionInput {
  @Field()
  @IsString()
  head: string;

  @Field()
  @IsString()
  body: string;
}

@InputType()
export class CategoryInput {
  @Field()
  name: string;

  @Field()
  slug: string;
}

@InputType()
export class SubCategoryInput {
  @Field()
  name: string;

  @Field()
  slug: string;

  @Field(() => CategoryInput)
  category: CategoryInput;
}

@InputType()
export class ImageInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  url: string;
}

@InputType()
export class CreateProductInput {
  @Field()
  @IsString()
  name: string;

  @Field(() => Int)
  @IsNumber()
  price: number;

  @Field()
  @IsString()
  slug: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  combination_id?: number;

  @Field(() => [DescriptionInput], { nullable: true })
  @IsOptional()
  descriptions?: DescriptionInput[];

  @Field(() => Int)
  @IsNumber()
  stock: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @Field(() => [ImageInput], { nullable: true })
  @IsOptional()
  images?: ImageInput[];

  @Field(() => CategoryInput, { nullable: true })
  @IsOptional()
  category?: CategoryInput;

  @Field(() => SubCategoryInput, { nullable: true })
  @IsOptional()
  subcategory?: SubCategoryInput;
}
