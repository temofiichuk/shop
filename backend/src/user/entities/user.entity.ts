import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  created_at: Date;

  @Field()
  update_at: Date;

  @Field()
  phone: string;

  @Field()
  avatar: string;
}
