import { ObjectType, Field } from "@nestjs/graphql";
import { User } from "../../user/entities/user.entity";

@ObjectType()
export class Admin extends User {
  @Field()
  type: string;
}

@ObjectType()
export class AdminAvatar {
  @Field({ nullable: true })
  avatar: string;
}
