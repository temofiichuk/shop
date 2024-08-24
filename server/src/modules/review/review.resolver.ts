import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ReviewService } from "./review.service";
import { Review } from "./entities/review.entity";
import { CreateReviewInput } from "./dto/create-review.input";
import { UpdateReviewInput } from "./dto/update-review.input";
import { IsAdminAuth } from "../auth-admin/decorators/auth.decorators";
import { IsUserAuth } from "../auth-user/decorators/auth.decorators";
import { CurrentUser } from "../auth-user/decorators/current-user.decorators";

@Resolver(() => Review)
export class ReviewResolver {
	constructor(private readonly reviewService: ReviewService) {
	}

	@Mutation(() => Review)
	@IsUserAuth()
	async createReview(@CurrentUser("id") userId: number, @Args("data") data: CreateReviewInput) {
		return this.reviewService.create(data, userId);
	}

	@Query(() => [Review])
	async reviews() {
		return this.reviewService.findAll();
	}

	@Query(() => Review)
	async review(@Args("id", { type: () => Int }) id: number) {
		return this.reviewService.findOne(id);
	}

	@Mutation(() => Review)
	@IsAdminAuth()
	async updateReview(@Args("data") data: UpdateReviewInput) {
		return this.reviewService.update(data.id, data);
	}

	@Mutation(() => Review)
	@IsAdminAuth()
	async deleteReview(@Args("id", { type: () => Int }) id: number) {
		return this.reviewService.remove(id);
	}
}
