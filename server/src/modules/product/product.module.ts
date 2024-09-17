import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductResolver } from "./product.resolver";
import { PrismaService } from "../../prisma.service";
import { PaginationService } from "../../services/pagination/pagination.service";
import { ProductVariantService } from "../product-variant/product-variant.service";

@Module({
	providers: [ProductResolver, ProductService, PrismaService, PaginationService, ProductVariantService],
})
export class ProductModule {
}
