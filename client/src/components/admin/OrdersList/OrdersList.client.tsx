"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { date, toRegularCase, USD } from "@/lib/functions";
import { Fragment, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OrdersQuery, useOrdersQuery } from "@/lib/graphql/generated/graphql";
import { clsx } from "clsx";
import moment from "moment/moment";
import { dateFormat } from "@/lib/helpers";
import useAppState from "@/lib/hooks/useAppState";
import { EnumOrderStatus } from "@/lib/graphql/generated/types/order.types";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/components/ui/spinner";


const filters = [];
for (const status in EnumOrderStatus) {
	const name = status.split("_");
	filters.push({
		title: name.map(item => toRegularCase(item)).join(" "),
		value: status.toUpperCase() as EnumOrderStatus,
	});
}

type Period = {
	title: string;
	date: string;
}

const periods: Period[] = [
	{ title: "Week", date: date().weekAgo },
	{ title: "Month", date: date().monthAgo },
	{ title: "Year", date: date().yearAgo },
];

const OrdersListClient = () => {
	const [filterBy, setFilterBy] = useState<EnumOrderStatus | "off">("off");
	const [period, setPeriod] = useState<Period["date"]>(periods[0].date);
	const [currentOrderId, setCurrentOrderId] = useAppState<number | null>("currentOrderId");

	const [filteredOrders, setFilteredOrders] = useState<OrdersQuery["orders"] | null>(null);

	const {
		data: resultOrders,
		loading,
		refetch,
	} = useOrdersQuery({ variables: { filter: { created_at: { gt: period } } }, fetchPolicy: "cache-and-network" });

	useEffect(() => {
		if (!resultOrders) return;
		refetch();
	}, [period]);

	useEffect(() => {
		if (!resultOrders) return;
		if (filterBy === "off") {
			setFilteredOrders(resultOrders.orders);
			return;
		}
		setFilteredOrders(resultOrders?.orders.filter(({ status }) => status === filterBy));
	}, [filterBy, resultOrders]);


	return (
		<div className="bg-transparent">
			<div className="flex items-center py-5">
				{/*Date filter*/}
				<Select onValueChange={(value => setPeriod(value))} defaultValue={periods[0].date}>
					<SelectTrigger className="max-w-[180px]">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{periods.map((period) =>
								(<SelectItem
									key={period.title}
									value={period.date}>
									{period.title}
								</SelectItem>))}
						</SelectGroup>
					</SelectContent>
				</Select>
				<div className="ml-auto flex items-center gap-2">
					{/*Filter By*/}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								size="sm"
								className="h-7 gap-1 text-sm"
							>
								<ListFilter className="h-3.5 w-3.5" />
								<span className="sr-only sm:not-sr-only">Filter</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" defaultValue={EnumOrderStatus.Pending}>
							<DropdownMenuLabel>Filter by</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuRadioGroup
								value={filterBy}
								onValueChange={(value: EnumOrderStatus | "off") => setFilterBy(value)}>
								<DropdownMenuRadioItem value={"off"}>
									Turn Off Filter
								</DropdownMenuRadioItem>
								<DropdownMenuSeparator />
								{filters.map((filter, index) => (
									<Fragment key={filter.value}>
										<DropdownMenuRadioItem value={filter.value}>
											{filter.title}
										</DropdownMenuRadioItem>
										{index < filters.length && (<DropdownMenuSeparator />)}
									</Fragment>
								))}
							</DropdownMenuRadioGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<Card>
				<CardHeader className="px-7">
					<CardTitle className="flex gap-4 items-center h-8">Orders {loading && <LoadingSpinner />}</CardTitle>
					<CardDescription>
						Last orders in your store from {moment(period).format(dateFormat)}.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Customer</TableHead>
								<TableHead className="hidden sm:table-cell">
									Status
								</TableHead>
								<TableHead className="hidden md:table-cell">
									Date
								</TableHead>
								<TableHead className="text-right">Amount</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{!resultOrders?.orders?.length && !loading && <TableRow>
								<TableCell colSpan={4}>No results found.</TableCell>
							</TableRow>}
							{filteredOrders?.map(({ id, user, created_at, total_price, status }, index) => (
								<TableRow
									className={cn(clsx({ "bg-accent": currentOrderId === id }), `opacity-100 animate-in fade-in-0 duration-300 delay-[${100 * (index + 1)}ms]`)}
									// style={{ animationDuration: `${200 * (index + 1)}ms` }}
									key={id}
									onClick={() => {
										setCurrentOrderId({ value: id });
									}}>
									<TableCell>
										<div className="font-medium">{`${user.first_name} ${user.last_name}`}</div>
										<div className="hidden text-sm text-muted-foreground md:inline">
											{user.email}
										</div>
									</TableCell>
									<TableCell className="hidden sm:table-cell">
										<Badge className="text-xs" variant="secondary">
											{toRegularCase(status)}
										</Badge>
									</TableCell>
									<TableCell className="hidden md:table-cell">
										{moment(created_at).format(dateFormat)}
									</TableCell>
									<TableCell className="text-right">{USD.format(total_price)}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
};

OrdersListClient.displayName = "OrdersList";
export default OrdersListClient;