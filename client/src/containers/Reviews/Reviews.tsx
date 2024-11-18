import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import getClient from "@/lib/apollo/apollo.client.rsc";
import moment from "moment/moment";
import { REVIEWS } from "@/lib/graphql/queries/review";
import { EnumReviewStatus, ReviewsQuery } from "@/lib/graphql/generated/graphql";

const Reviews = async () => {

	const { data: { reviews } } = await getClient().query<ReviewsQuery>({ query: REVIEWS });

	return (
		<main
			className="grid flex-1 items-start p-4 sm:px-6 sm:py-0 md:gap-8 opacity-100 animate-in fade-in-0 duration-1000">
			<div className="flex items-center col-span-2">
				<div>
					<Button size="sm" className="h-7 gap-1">
						<PlusCircle className="h-3.5 w-3.5" />
						<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
							Add Review
						</span>
					</Button>
				</div>
				<div className="ml-auto flex items-center gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="sm" className="h-7 gap-1">
								<ListFilter className="h-3.5 w-3.5" />
								<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
									Filter
								</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Filter by</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuCheckboxItem>
								Pending
							</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem>
								Approved
							</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem>
								Rejected
							</DropdownMenuCheckboxItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<Card className="xl:col-span-2">
				<CardHeader className="flex flex-row items-center">
					<div className="grid gap-2">
						<CardTitle>Reviews</CardTitle>
						<CardDescription className="hidden md:block">
							Recent Reviews in your store.
						</CardDescription>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-inherit dark:hover:bg-inherit cursor-default">
								<TableHead>User</TableHead>
								<TableHead>Product</TableHead>
								<TableHead className="text-nowrap">Status</TableHead>
								<TableHead className="text-nowrap">Comment</TableHead>
								<TableHead className="text-nowrap">Created At</TableHead>
								<TableHead className="text-right">
									<span className="sr-only md:not-sr-only">Actions</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{reviews?.map(({ user, status: currentStatus, comment, created_at, product, id }) => (
								<TableRow key={id}>
									<TableCell>
										<p className="font-medium text-nowrap">{user.email}</p>
									</TableCell>
									<TableCell>{product.name}</TableCell>
									<TableCell>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Badge className="text-xs" variant="outline"> {currentStatus} </Badge>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												{currentStatus !== EnumReviewStatus.Approved && <DropdownMenuItem>Approve</DropdownMenuItem>}
												{currentStatus !== EnumReviewStatus.Rejected && <DropdownMenuItem>Reject</DropdownMenuItem>}
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
									<TableCell>{comment}</TableCell>
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
		</main>
	);
};

Reviews.displayName = "Reviews";
export default Reviews;