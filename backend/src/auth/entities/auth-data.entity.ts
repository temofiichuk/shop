import { ObjectType, Field } from "@nestjs/graphql";

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
