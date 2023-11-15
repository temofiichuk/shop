import { Module } from "@nestjs/common";
import { AttributeService } from "./attribute.service";
import { AttributeResolver } from "./attribute.resolver";
import { PrismaService } from "../../prisma.service";

@Module({
  providers: [AttributeResolver, AttributeService, PrismaService],
})
export class AttributeModule {}
