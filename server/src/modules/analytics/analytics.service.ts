import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import * as moment from "moment/moment";
import { EnumOrderStatus } from "@prisma/client";
import { RevenueAnalytics } from "./entity/revenue.entity";

@Injectable()
export class AnalyticsService {
	constructor(private readonly prisma: PrismaService) {
	}

	private formatDate(date: moment.Moment): string {
		return date.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
	}

	private async calculateRevenue(startDate: string, endDate: string): Promise<number> {
		const result = await this.prisma.order.aggregate({
			_sum: {
				total_price: true,
			},
			where: {
				created_at: {
					gt: startDate,
					lt: endDate,
				},
				status: EnumOrderStatus.FINISHED, // враховуємо тільки завершені замовлення
			},
		});

		return result._sum.total_price ?? 0;
	}

	async getRevenue(period: "week" | "month" | "year") {
		const now = moment();
		const startOfCurrentPeriod = now.clone().subtract(1, period);
		const endOfCurrentPeriod = now.clone();
		const startOfPreviousPeriod = startOfCurrentPeriod.clone().subtract(1, period);
		const endOfPreviousPeriod = startOfCurrentPeriod.clone();

		return {
			current: await this.calculateRevenue(this.formatDate(startOfCurrentPeriod), this.formatDate(endOfCurrentPeriod)),
			previous: await this.calculateRevenue(this.formatDate(startOfPreviousPeriod), this.formatDate(endOfPreviousPeriod)),
		};
	}

	async getRevenueAnalytics(period: "week" | "month" | "year") {
		const now = moment();

		const startDate = now.clone().startOf(period);
		const endDate = now.clone().endOf(period);
		const frequency = period === "year" ? "month" : period === "month" ? "week" : "day";

		const chartData: RevenueAnalytics[] = [];

		for (let date = startDate.clone(); date.isBefore(endDate); date.add(1, frequency)) {
			const start = date.clone().startOf(frequency);
			const end = date.clone().endOf(frequency);

			const revenue = await this.calculateRevenue(this.formatDate(start), this.formatDate(end));

			chartData.push({
				period: date.format("MMMM"), // Назва місяця, наприклад, January, February і т.д.
				revenue: revenue,
			});
		}

		return chartData;
	}
}
