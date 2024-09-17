import { Module } from "@nestjs/common";
import { ProductAttributeValueService } from "./product-attribute-value.service";
import { ProductAttributeValueResolver } from "./product-attribute-value.resolver";
import { PrismaService } from "../../prisma.service";

@Module({
	providers: [ProductAttributeValueResolver, ProductAttributeValueService, PrismaService],
})
export class ProductAttributeValueModule {
}
