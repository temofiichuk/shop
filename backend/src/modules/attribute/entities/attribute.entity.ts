import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class AttributeValue {
  @Field()
  value: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}

@ObjectType()
export class Attribute {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [AttributeValue])
  values: AttributeValue[];

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
