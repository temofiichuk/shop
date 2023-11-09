import { ObjectType, Field, OmitType } from "@nestjs/graphql";
import { Optional } from "@nestjs/common";

@ObjectType()
export class UserAuthData {
  @Field()
  id: number;
  @Field()
  name: string;
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

@ObjectType()
export class AdminAuthData extends UserAuthData {
  @Field()
  @Optional()
  type: string;
}

@ObjectType()
export class AuthDataForAdmin extends OmitType(AuthData, ["user"]) {
  @Field()
  admin: AdminAuthData;
}
