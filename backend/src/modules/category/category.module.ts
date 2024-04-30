import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryResolver } from "./category.resolver";
import { PrismaService } from "../../prisma.service";
import { ConfigService } from "@nestjs/config";

@Module({
	providers: [CategoryResolver, CategoryService, PrismaService, ConfigService],
})
export class CategoryModule {}
