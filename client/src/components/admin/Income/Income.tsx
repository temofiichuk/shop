import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import getClient from "@/lib/apollo/apollo.client.rsc";
import { REVENUE } from "@/lib/graphql/queries/revenue";
import { toRegularCase } from "@/lib/functions";
import { RevenueQuery } from "@/lib/graphql/generated/graphql";
import Price from "./Price.client";
import Progress from "./Progress.client";

interface IIncome {
	period: "week" | "month" | "year";
}

const Income = async ({ period }: IIncome) => {
	const { data: { revenue } } = await getClient().query<RevenueQuery>({
		query: REVENUE,
		variables: { revenueInput: { period } },
	});

	if (!revenue) return null;

	const difference = Math.ceil(((revenue.current - revenue.previous) / revenue.previous) * 100);
	const income = isNaN(difference) || difference < 0 ? 0 : difference;

	return (
		<Card>
			<CardHeader className="pb-2">
				<CardDescription>This {toRegularCase(period)}</CardDescription>
				<CardTitle className="text-4xl">
					<Price price={revenue.current} />
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="text-xs text-muted-foreground">
					+{income}% from last {period}
				</div>
			</CardContent>
			<CardFooter>
				<Progress value={income} />
			</CardFooter>
		</Card>
	);
};

Income.displayName = "Income";
export default Income;