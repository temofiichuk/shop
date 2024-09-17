import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProductCount {
	@Field()
	count: number;
}