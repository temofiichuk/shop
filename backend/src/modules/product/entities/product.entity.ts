import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Category } from "../../category/entities/category.entity";

@ObjectType()
export class ProductDescription {
	@Field(() => Int)
	id: number;

	@Field()
	head: string;

	@Field()
	body: string;
}

@ObjectType()
export class ProductImage {
	@Field(() => Int)
	id: number;

	@Field()
	name: string;

	@Field()
	url: string;

	@Field()
	is_main: boolean;
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

	@Field(() => [ProductDescription])
	descriptions?: ProductDescription[];

	@Field(() => [Category])
	categories?: Category[];

	@Field(() => [ProductImage])
	images?: ProductImage[];

	@Field()
	quantity: number;

	@Field()
	stock: number;
}
