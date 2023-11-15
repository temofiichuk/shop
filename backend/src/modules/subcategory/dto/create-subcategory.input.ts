import { InputType, Int, Field } from "@nestjs/graphql";
import { IsNumber, IsString, Matches } from "class-validator";
import { Prisma } from "@prisma/client";

@InputType()
export class CreateSubcategoryInput implements Prisma.SubcategoryCreateInput {
  @Field()
  @IsString()
  @Matches(/^\p{Lu}\p{Ll}*/u, { message: "Must be Sentences Case" })
  name: string;

  @Field()
  @IsString()
  slug: string;

  @Field(() => Int)
  @IsNumber()
  category_id: number;
}
