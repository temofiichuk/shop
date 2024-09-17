import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { EnumUserRole } from "src/modules/auth/dto/auth.enum";

registerEnumType(EnumUserRole, { name: "EnumUserRole" });

@ObjectType()
export class AuthUser {
	@Field()
	id: number;
	@Field(() => EnumUserRole)
	role?: EnumUserRole;
	@Field()
	first_name: string;
	@Field()
	last_name: string;
	@Field()
	email: string;
}

@ObjectType()
export class AuthResponse {
	@Field({ nullable: true })
	user?: AuthUser;
	@Field()
	accessToken: string;
	@Field()
	refreshToken: string;
}
