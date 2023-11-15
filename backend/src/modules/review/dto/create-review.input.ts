import { InputType, Int, Field } from "@nestjs/graphql";
import { IsNumber, IsString, Max, Min } from "class-validator";

@InputType()
export class CreateReviewInput {
  @Field(() => Int)
  @Min(0)
  @Max(5)
  rating: number;

  @Field()
  @IsString()
  comment: string;

  @Field(() => Int)
  @IsNumber()
  product_id: number;
}
