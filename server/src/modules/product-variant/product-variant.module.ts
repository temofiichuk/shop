import { Module } from "@nestjs/common";
import { ProductVariantService } from "./product-variant.service";
import { ProductVariantResolver } from "./product-variant.resolver";
import { PrismaService } from "../../prisma.service";

@Module({
	providers: [ProductVariantResolver, ProductVariantService, PrismaService],
})
export class ProductVariantModule {
}
