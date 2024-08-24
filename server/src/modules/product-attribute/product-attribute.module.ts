import { Module } from "@nestjs/common";
import { ProductAttributeService } from "./product-attribute.service";
import { ProductAttributeResolver } from "./product-attribute.resolver";
import { PrismaService } from "../../prisma.service";

@Module({
	providers: [ProductAttributeResolver, ProductAttributeService, PrismaService],
})
export class ProductAttributeModule {
}
