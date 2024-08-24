import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { EnumAdminRole } from "@prisma/client";

registerEnumType(EnumAdminRole, { name: "EnumAdminRole" });

@ObjectType()
export class AuthAdmin {
	@Field()
	id: number;
	@Field(() => EnumAdminRole)
	role: EnumAdminRole;
	@Field()
	email: string;
}

@ObjectType()
export class AuthAdminResponse {
	@Field({ nullable: true })
	user?: AuthAdmin;
	@Field()
	accessToken: string;
	@Field()
	refreshToken: string;
}
