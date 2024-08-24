import { Module } from "@nestjs/common";
import { ProductPromotionService } from "./product-promotion.service";
import { ProductPromotionResolver } from "./product-promotion.resolver";
import { PrismaService } from "../../prisma.service";

@Module({
	providers: [ProductPromotionResolver, ProductPromotionService, PrismaService],
})
export class ProductPromotionModule {
}
