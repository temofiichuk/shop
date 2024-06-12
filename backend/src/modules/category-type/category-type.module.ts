import { Module } from "@nestjs/common";
import { CategoryTypeService } from "./category-type.service";
import { CategoryTypeResolver } from "./category-type.resolver";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../../prisma.service";

@Module({
	providers: [CategoryTypeResolver, CategoryTypeService, ConfigService, PrismaService],
})
export class CategoryTypeModule {}
