import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import * as moment from "moment/moment";
import { EnumOrderStatus } from "@prisma/client";

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
}
