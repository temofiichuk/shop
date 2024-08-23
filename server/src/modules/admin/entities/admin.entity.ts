import { Field, Int, ObjectType } from "@nestjs/graphql";
import { EnumAdminRole } from "@prisma/client";

@ObjectType()
export class Admin {
	@Field(() => Int)
	id: number;

	@Field()
	first_name: string;

	@Field()
	last_name: string;

	@Field()
	email: string;

	@Field()
	password: string;

	@Field()
	role: EnumAdminRole;

	@Field()
	is_active: boolean;

	@Field()
	created_at: Date;

	@Field()
	updated_at: Date;
}
