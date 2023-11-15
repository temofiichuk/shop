import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { ReviewService } from "./review.service";
import { Review } from "./entities/review.entity";
import { CreateReviewInput } from "./dto/create-review.input";
import { Auth } from "../auth/decorators/auth.decorators";
import { AuthAdmin } from "../auth/decorators/auth-admin.decorators";
import { EnumReviewStatus } from "@prisma/client";
import { CurrentUser } from "../auth/decorators/current-user.decorators";

@Resolver(() => Review)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Mutation(() => Review)
  @Auth()
  reviewCreate(
    @CurrentUser("id") id: number,
    @Args("createReviewInput") createReviewInput: CreateReviewInput
  ) {
    return this.reviewService.create(id, createReviewInput);
  }

  @Query(() => [Review])
  @AuthAdmin()
  reviewGetAllByStatus(@Args("status") status: EnumReviewStatus) {
    return this.reviewService.findAllByStatus(status);
  }

  @Query(() => Review)
  @AuthAdmin()
  reviewFindOne(@Args("pattern") pattern: string) {
    return this.reviewService.findOne(pattern);
  }

  @Query(() => Review)
  reviewGetByProduct(@Args("id") id: number) {
    return this.reviewService.findAllByProduct(id);
  }

  @Query(() => Review)
  @Auth()
  reviewGetByUser(@CurrentUser("id") id: number) {
    return this.reviewService.findAllByUser(id);
  }

  @Mutation(() => Review)
  @AuthAdmin()
  reviewUpdateStatus(
    @Args("id") id: number,
    @Args("status") status: EnumReviewStatus
  ) {
    return this.reviewService.updateStatus(id, status);
  }

  @Mutation(() => Review)
  @AuthAdmin()
  reviewRemove(@Args("id") id: number) {
    return this.reviewService.remove(id);
  }
}
