import { Field, Int, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class User {
	@Field(() => Int)
	id: number;

	@Field()
	username: string;
	@Field()
	first_name: string;
	@Field()
	last_name: string;

	@Field()
	email: string;

	@Field()
	password: string;

	@Field({ nullable: true })
	phone: string;

	@Field({ nullable: true })
	address: string;

	@Field({ nullable: true })
	image: string;

	@Field()
	is_verified: boolean;

	// @Field()
	// reviews:     Review[]

	@Field()
	rating: number;

	// @Field()
	// orders :     Order[]
	@Field()
	created_at: Date;
	@Field()
	updated_at: Date;
}

