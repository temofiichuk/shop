import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ProductAttributeValue } from "../../product-attribute-value/entities/product-attribute-value.entity";
import { Product } from "../../product/entities/product.entity";


@ObjectType()
export class ProductAttribute {
	@Field(() => Int)
	id: number;

	@Field(() => String)
	name: string;

	@Field(() => [ProductAttributeValue])
	values: ProductAttributeValue[];

	@Field(() => Product)
	product: Product;

	@Field(() => Int)
	product_id: number;

	@Field(() => Date)
	created_at: Date;

	@Field(() => Date)
	updated_at: Date;
}