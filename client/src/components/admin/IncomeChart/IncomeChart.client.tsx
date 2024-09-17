"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { RevenueAnalytics } from "@/lib/graphql/generated/graphql";

interface IncomeChartProps {
	revenueAnalytics: RevenueAnalytics[];
}

const chartConfig = {
	revenue: {
		label: "Revenue",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

const IncomeChartClient = ({ revenueAnalytics }: IncomeChartProps) => {

	return (
		<ChartContainer config={chartConfig}>
			<BarChart accessibilityLayer data={revenueAnalytics}>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="period"
					tickMargin={10}
					tickFormatter={(value) => value.slice(0, 3)}
				/>
				<ChartTooltip>
					<ChartTooltipContent hideLabel />
				</ChartTooltip>
				<Bar dataKey="revenue" fill="var(--color-desktop)" radius={8} />
			</BarChart>
		</ChartContainer>
	);
};

export default IncomeChartClient;
