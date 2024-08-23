import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AuthUser {
	@Field()
	id: number;
	@Field({ nullable: true })
	username: string;
	@Field()
	email: string;
}

@ObjectType()
export class AuthUserResponse {
	@Field()
	user: AuthUser;
	@Field()
	accessToken: string;
	@Field()
	refreshToken: string;
}
