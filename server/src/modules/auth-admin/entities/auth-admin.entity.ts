import { Field, ObjectType } from "@nestjs/graphql";
import { EnumAdminRole } from "@prisma/client";

@ObjectType()
export class AuthAdmin {
	@Field()
	id: number;
	@Field({ nullable: true })
	role: EnumAdminRole;
	@Field()
	email: string;
}

@ObjectType()
export class AuthAdminResponse {
	@Field()
	user: AuthAdmin;
	@Field()
	accessToken: string;
	@Field()
	refreshToken: string;
}
