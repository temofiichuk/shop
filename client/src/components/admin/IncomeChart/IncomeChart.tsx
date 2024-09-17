import { TrendingUp } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import getClient from "@/lib/apollo/apollo.client.rsc";
import { REVENUE_ANALYTICS } from "@/lib/graphql/queries/revenue";
import IncomeChartClient from "@/components/admin/IncomeChart/IncomeChart.client";

export const description = "A bar chart of revenue";

const chartData = [
	{ month: "January", revenue: 186 },
	{ month: "February", revenue: 305 },
	{ month: "March", revenue: 237 },
	{ month: "April", revenue: 73 },
	{ month: "May", revenue: 209 },
	{ month: "June", revenue: 214 },
];

interface IIncome {
	period: "week" | "month" | "year";
}


const IncomeChart = async ({ period }: IIncome) => {
	const { data: { revenueAnalytics } } = await getClient().query({
		query: REVENUE_ANALYTICS,
		variables: { revenueInput: { period } },
	});
	return (
		<Card>
			<CardHeader>
				<CardTitle>Bar Chart</CardTitle>
				<CardDescription>January - June 2024</CardDescription>
			</CardHeader>
			<CardContent>
				<IncomeChartClient revenueAnalytics={revenueAnalytics} />
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Showing total visitors for the last 6 months
				</div>
			</CardFooter>
		</Card>
	);
};

export default IncomeChart;