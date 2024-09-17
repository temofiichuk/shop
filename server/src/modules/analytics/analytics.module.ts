import { Module } from "@nestjs/common";
import { AnalyticsService } from "./analytics.service";
import { AnalyticsResolver } from "./analytics.resolver";
import { PrismaService } from "../../prisma.service";

@Module({
	providers: [AnalyticsResolver, AnalyticsService, PrismaService],
})
export class AnalyticsModule {
}
