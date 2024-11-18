import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusIcon } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import getClient from "@/lib/apollo/apollo.client.rsc";
import moment from "moment/moment";
import { PROMOTIONS } from "@/lib/graphql/queries/promotions";
import { PromotionsQuery } from "@/lib/graphql/generated/graphql";

const Promotions = async () => {

	const { data: { promotions } } = await getClient().query<PromotionsQuery>({ query: PROMOTIONS });

	return (
		<div>
			<Card className="xl:col-span-2">
				<CardHeader className="flex flex-row items-center">
					<div className="grid gap-2">
						<CardTitle>Promotions</CardTitle>
						<CardDescription className="hidden md:block">
							Recent promotions in your store.
						</CardDescription>
					</div>
					<Button asChild size="sm" className="ml-auto gap-1">
						<Button>
							<span className="hidden md:inline">Add Promotion</span>
							<PlusIcon className="h-4 w-4" />
						</Button>
					</Button>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-inherit dark:hover:bg-inherit cursor-default">
								<TableHead>Name</TableHead>
								<TableHead>Type</TableHead>
								<TableHead className="text-nowrap">Start Date</TableHead>
								<TableHead className="text-nowrap">End Date</TableHead>
								<TableHead className="text-nowrap">Created At</TableHead>
								<TableHead className="text-right">
									<span className="sr-only md:not-sr-only">Actions</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{/*TODO: - change field "end_data" to "end_date" */}
							{promotions?.map(({ name, created_at, start_date, end_data, discount_type }) => (
								<TableRow key={name}>
									<TableCell>
										<p className="font-medium text-nowrap">{name}</p>
									</TableCell>
									<TableCell>
										<Badge className="text-xs" variant="outline"> {discount_type} </Badge>
									</TableCell>
									<TableCell>{moment(start_date).format("DD.MM.YY")}</TableCell>
									<TableCell>{moment(end_data).format("DD.MM.YY")}</TableCell>
									<TableCell>
										<span className="md:hidden">{moment(created_at).format("DD.MM.YY")}</span>
										<span
											className="hidden md:inline"><span>{moment(created_at).format("YYYY-MM-DD")}</span> <span>{moment(created_at).format("HH-MM")}</span></span>
									</TableCell>
									<TableCell className="text-right">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													aria-haspopup="true"
													size="icon"
													variant="ghost">
													<MoreHorizontal className="h-4 w-4" />
													<span className="sr-only">Toggle menu</span>
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuLabel>Actions</DropdownMenuLabel>
												<DropdownMenuItem>Edit</DropdownMenuItem>
												<DropdownMenuItem>Delete</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
};

Promotions.displayName = "Promotions";
export default Promotions;