import { Module } from "@nestjs/common";
import { TypeService } from "./type.service";
import { TypeResolver } from "./type.resolver";
import { PrismaService } from "../../prisma.service";

@Module({
	providers: [TypeResolver, TypeService, PrismaService],
})
export class TypeModule {}
