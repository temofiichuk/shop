import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { WishlistService } from "./wishlist.service";
import { Wishlist } from "./entities/wishlist.entity";
import { CreateWishlistInput } from "./dto/create-wishlist.input";
import { UpdateWishlistInput } from "./dto/update-wishlist.input";
import { CurrentUser } from "../auth-user/decorators/current-user.decorators";
import { IsAdminAuth } from "../auth-admin/decorators/auth.decorators";
import { IsUserAuth } from "../auth-user/decorators/auth.decorators";

@Resolver(() => Wishlist)
export class WishlistResolver {
	constructor(private readonly wishlistService: WishlistService) {
	}

	@Mutation(() => Wishlist)
	async addToWishlist(@Args("data") data: CreateWishlistInput) {
		return this.wishlistService.add(data);
	}

	@Query(() => [Wishlist])
	@IsUserAuth()
	async userWishlist(@CurrentUser("id") user_id: number) {
		return this.wishlistService.findAll(user_id);
	}

	@Query(() => [Wishlist])
	@IsAdminAuth()
	async wishlists() {
		return this.wishlistService.findAll();
	}

	@Query(() => Wishlist)
	async wishlistItem(@Args("id", { type: () => Int }) id: number) {
		return this.wishlistService.findOne(id);
	}

	@Mutation(() => Wishlist)
	async updateWishlist(
		@Args("id", { type: () => Int }) id: number,
		@Args("data") data: UpdateWishlistInput,
	) {
		return this.wishlistService.update(id, data);
	}

	@Mutation(() => Wishlist)
	async deleteFromWishlist(@Args("id", { type: () => Int }) id: number) {
		return this.wishlistService.remove(id);
	}
}
