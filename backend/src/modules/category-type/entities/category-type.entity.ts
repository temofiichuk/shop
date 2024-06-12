import { ObjectType, Field, Int } from "@nestjs/graphql";
import { CategoryType as CategoryTypeEntity } from ".prisma/client";
import { Category } from "../../category/entities/category.entity";

@ObjectType()
export class CategoryType implements CategoryTypeEntity {
	@Field(() => Int)
	id: number;

	@Field()
	name: string;

	@Field(() => [Category])
	categories: Category[];

	@Field()
	created_at: Date;

	@Field()
	updated_at: Date;
}
