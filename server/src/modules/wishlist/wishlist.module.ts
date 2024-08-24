import { Module } from "@nestjs/common";
import { WishlistService } from "./wishlist.service";
import { WishlistResolver } from "./wishlist.resolver";
import { PrismaService } from "../../prisma.service";

@Module({
	providers: [WishlistResolver, WishlistService, PrismaService],
})
export class WishlistModule {
}
