import { Module } from "@nestjs/common";
import { SubcategoryService } from "./subcategory.service";
import { SubcategoryResolver } from "./subcategory.resolver";
import { PrismaService } from "../../prisma.service";

@Module({
  providers: [SubcategoryResolver, SubcategoryService, PrismaService],
})
export class SubcategoryModule {}
