import { Args, Query, Resolver } from "@nestjs/graphql";
import { AnalyticsService } from "./analytics.service";
import { IsAdminAuth } from "../auth/decorators/auth-admin.decorators";
import { Revenue } from "./entity/revenue.entity";
import { RevenueInput } from "./dto/revenue.input";

@Resolver()
export class AnalyticsResolver {
	constructor(private readonly analyticsService: AnalyticsService) {
	}

	@Query(() => Revenue)
	@IsAdminAuth()
	async revenue(@Args("revenueInput") revenueInput: RevenueInput) {
		return this.analyticsService.getRevenue(revenueInput.period);
	}
}
