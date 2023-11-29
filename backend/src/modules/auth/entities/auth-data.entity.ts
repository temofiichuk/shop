import { ObjectType, Field } from "@nestjs/graphql";
import { Optional } from "@nestjs/common";
import { EnumUserRole } from "@prisma/client";

@ObjectType()
export class UserAuthData {
  @Field()
  id: number;
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  role: EnumUserRole;
}

@ObjectType()
export class AdminAuthData extends UserAuthData {
  @Field()
  @Optional()
  type: string;
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
