import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminResolver } from "./admin.resolver";
import { PrismaService } from "../../prisma.service";

@Module({
	providers: [AdminResolver, AdminService, PrismaService],
})
export class AdminModule {
}
