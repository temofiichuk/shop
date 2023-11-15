import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductResolver } from "./product.resolver";
import { PrismaService } from "../../prisma.service";
import { ConfigService } from "@nestjs/config";

@Module({
  providers: [ProductResolver, ProductService, PrismaService, ConfigService],
})
export class ProductModule {}
