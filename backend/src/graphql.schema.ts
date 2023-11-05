import { ObjectType, Field, ID, Resolver, InputType } from "@nestjs/graphql";

@Resolver()
@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;
}

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;
}
