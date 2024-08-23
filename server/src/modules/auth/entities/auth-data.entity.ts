import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserAuthData {
	@Field()
	id: number;
	@Field()
	username: string;
	@Field()
	email: string;
}

@ObjectType()
export class AuthData {
	@Field()
	user: UserAuthData;
	@Field()
	accessToken: string;
	@Field()
	refreshToken: string;
}
