"use client";
import styles from "./OrdersList.module.scss";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toRegularCase } from "@/lib/functions";
import { Fragment, useState } from "react";
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
import { EnumUserRole } from "@/lib/graphql/generated/graphql";
import { EnumOrderStatus } from "@/lib/graphql/generated/types/order.types";


const filters = [];
for (const status in EnumUserRole) {
	const name = status.split("_");
	filters.push({ title: name.map(item => toRegularCase(item)).join(" "), value: status });
}

const periods = [
	{ title: "Week", value: "week" },
	{ title: "Month", value: "month" },
	{ title: "Year", value: "year" },
];


const OrdersList = () => {
	const [filterBy, setFilterBy] = useState<EnumOrderStatus | "">(EnumOrderStatus.Pending);
	const [period, setPeriod] = useState(periods[0]);

	return (
		<div className={styles.table}>

			<div className="flex items-center py-5">
				{/*Date filter*/}
				<Select>
					<SelectTrigger className="max-w-[180px]">
						<SelectValue placeholder={period.title ?? "Period"} defaultValue={period.value} />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{periods.map((period) =>
								(<SelectItem
									key={period.value}
									onClick={() => setPeriod(period)}
									value={period.value}>
									{period.title}
								</SelectItem>))}
						</SelectGroup>
					</SelectContent>
				</Select>
				<div className="ml-auto flex items-center gap-2">
					{/*filter By*/}
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
						<DropdownMenuContent align="end" defaultValue={EnumOrderStatus.PENDING}>
							<DropdownMenuLabel>Filter by</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuRadioGroup value={filterBy}>
								<DropdownMenuRadioItem value={""} onClick={() => setFilterBy("")}>
									Turn Off Filter
								</DropdownMenuRadioItem>
								<DropdownMenuSeparator />
								{filters.map((filter, index) => (
									<Fragment key={filter.value}>
										<DropdownMenuRadioItem value={filter.value} onClick={() => setFilterBy(filter.value)}>
											{filter.title}
										</DropdownMenuRadioItem>
										{index !== filters.length - 1 && (<DropdownMenuSeparator />)}
									</Fragment>
								))}
							</DropdownMenuRadioGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<Card>
				<CardHeader className="px-7">
					<CardTitle>Orders </CardTitle>
					<CardDescription>
						Recent orders from your store for {period.value}.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Customer</TableHead>
								<TableHead className="hidden sm:table-cell">
									Type
								</TableHead>
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
							<TableRow className="bg-accent">
								<TableCell>
									<div className="font-medium">Liam Johnson</div>
									<div className="hidden text-sm text-muted-foreground md:inline">
										liam@example.com
									</div>
								</TableCell>
								<TableCell className="hidden sm:table-cell">
									Sale
								</TableCell>
								<TableCell className="hidden sm:table-cell">
									<Badge className="text-xs" variant="secondary">
										Fulfilled
									</Badge>
								</TableCell>
								<TableCell className="hidden md:table-cell">
									2023-06-23
								</TableCell>
								<TableCell className="text-right">$250.00</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<div className="font-medium">Olivia Smith</div>
									<div className="hidden text-sm text-muted-foreground md:inline">
										olivia@example.com
									</div>
								</TableCell>
								<TableCell className="hidden sm:table-cell">
									Refund
								</TableCell>
								<TableCell className="hidden sm:table-cell">
									<Badge className="text-xs" variant="outline">
										Declined
									</Badge>
								</TableCell>
								<TableCell className="hidden md:table-cell">
									2023-06-24
								</TableCell>
								<TableCell className="text-right">$150.00</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<div className="font-medium">Liam Johnson</div>
									<div className="hidden text-sm text-muted-foreground md:inline">
										liam@example.com
									</div>
								</TableCell>
								<TableCell className="hidden sm:table-cell">
									Sale
								</TableCell>
								<TableCell className="hidden sm:table-cell">
									<Badge className="text-xs" variant="secondary">
										Fulfilled
									</Badge>
								</TableCell>
								<TableCell className="hidden md:table-cell">
									2023-06-23
								</TableCell>
								<TableCell className="text-right">$250.00</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<div className="font-medium">Noah Williams</div>
									<div className="hidden text-sm text-muted-foreground md:inline">
										noah@example.com
									</div>
								</TableCell>
								<TableCell className="hidden sm:table-cell">
									Subscription
								</TableCell>
								<TableCell className="hidden sm:table-cell">
									<Badge className="text-xs" variant="secondary">
										Fulfilled
									</Badge>
								</TableCell>
								<TableCell className="hidden md:table-cell">
									2023-06-25
								</TableCell>
								<TableCell className="text-right">$350.00</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<div className="font-medium">Emma Brown</div>
									<div className="hidden text-sm text-muted-foreground md:inline">
										emma@example.com
									</div>
								</TableCell>
								<TableCell className="hidden sm:table-cell">
									Sale
								</TableCell>
								<TableCell className="hidden sm:table-cell">
									<Badge className="text-xs" variant="secondary">
										Fulfilled
									</Badge>
								</TableCell>
								<TableCell className="hidden md:table-cell">
									2023-06-26
								</TableCell>
								<TableCell className="text-right">$450.00</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<div className="font-medium">Liam Johnson</div>
									<div className="hidden text-sm text-muted-foreground md:inline">
										liam@example.com
									</div>
								</TableCell>
								<TableCell className="hidden sm:table-cell">
									Sale
								</TableCell>
								<TableCell className="hidden sm:table-cell">
									<Badge className="text-xs" variant="secondary">
										Fulfilled
									</Badge>
								</TableCell>
								<TableCell className="hidden md:table-cell">
									2023-06-23
								</TableCell>
								<TableCell className="text-right">$250.00</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<div className="font-medium">Olivia Smith</div>
									<div className="hidden text-sm text-muted-foreground md:inline">
										olivia@example.com
									</div>
								</TableCell>
								<TableCell className="hidden sm:table-cell">
									Refund
								</TableCell>
								<TableCell className="hidden sm:table-cell">
									<Badge className="text-xs" variant="outline">
										Declined
									</Badge>
								</TableCell>
								<TableCell className="hidden md:table-cell">
									2023-06-24
								</TableCell>
								<TableCell className="text-right">$150.00</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<div className="font-medium">Emma Brown</div>
									<div className="hidden text-sm text-muted-foreground md:inline">
										emma@example.com
									</div>
								</TableCell>
								<TableCell className="hidden sm:table-cell">
									Sale
								</TableCell>
								<TableCell className="hidden sm:table-cell">
									<Badge className="text-xs" variant="secondary">
										Fulfilled
									</Badge>
								</TableCell>
								<TableCell className="hidden md:table-cell">
									2023-06-26
								</TableCell>
								<TableCell className="text-right">$450.00</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
};

OrdersList.displayName = "OrdersList";
export default OrdersList;