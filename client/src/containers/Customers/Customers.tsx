import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, User } from "lucide-react";
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
import { CUSTOMERS } from "@/lib/graphql/queries/customer";
import { UsersQuery } from "@/lib/graphql/generated/graphql";

const Customers = async () => {

	const { data: { users } } = await getClient().query<UsersQuery>({ query: CUSTOMERS });

	return (
		<section
			className="grid flex-1 items-start p-4 sm:px-6 sm:py-0 md:gap-8 opacity-100 animate-in fade-in-0 duration-1000">

			<Card className="xl:col-span-2">
				<CardHeader className="flex flex-row items-center">
					<div className="grid gap-2">
						<CardTitle>Customers</CardTitle>
						<CardDescription className="hidden md:block">
							Recent Customers in your store.
						</CardDescription>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-inherit dark:hover:bg-inherit cursor-default">
								<TableHead>Image</TableHead>
								<TableHead>User</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Rating</TableHead>
								<TableHead className="text-nowrap">Is Verified</TableHead>
								<TableHead className="text-nowrap">Created At</TableHead>
								<TableHead className="text-right">
									<span className="sr-only md:not-sr-only">Actions</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{users?.map(({
														 first_name,
														 last_name,
														 is_verified,
														 email,
														 image,
														 rating,
														 created_at,
													 }) => (
								<TableRow key={email}>
									<TableCell>
										{/*{image ? <Image src={image} alt={`${first_name} ${last_name}`} width={24} height={24} /> :*/}
										<User className="w-8 h-8" />
										{/*}*/}
									</TableCell>
									<TableCell>
										<p className="font-medium text-nowrap">{first_name} {last_name}</p>
									</TableCell>
									<TableCell>{email}</TableCell>
									<TableCell>{rating}</TableCell>
									<TableCell>
										<Badge className="text-xs" variant="outline"> {is_verified ? "Yes" : "No"} </Badge>
									</TableCell>
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
		</section>
	);
};

Customers.displayName = "Customers";
export default Customers;