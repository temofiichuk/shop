import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Category } from "../../category/entities/category.entity";
import { Subcategory } from "../../subcategory/entities/subcategory.entity";
import { Group } from "../../group/entities/group.entity";
import { Type } from "../../type/entities/type.entity";

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

	@Field(() => Category)
	category?: Category;

	@Field(() => Int)
	category_id?: number;

	@Field(() => Subcategory, { nullable: true })
	subcategory?: Subcategory;

	@Field(() => Int, { nullable: true })
	subcategory_id?: number;

	@Field(() => Group)
	group?: Group;

	@Field(() => Int)
	group_id?: number;

	@Field(() => Type)
	type?: Type;

	@Field(() => Int)
	type_id?: number;

	@Field(() => [ProductImage])
	images?: ProductImage[];

	@Field()
	quantity: number;

	@Field()
	stock: number;
}
