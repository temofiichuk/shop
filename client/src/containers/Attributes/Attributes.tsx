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
import { ATTRIBUTES } from "@/lib/graphql/queries/attributes";
import moment from "moment/moment";
import { Fragment } from "react";
import { AttributesQuery } from "@/lib/graphql/generated/graphql";

const Attributes = async () => {

	const { data: { attributes } } = await getClient().query<AttributesQuery>({ query: ATTRIBUTES });
	console.log(attributes);
	return (
		<div>
			<Card className="xl:col-span-2">
				<CardHeader className="flex flex-row items-center">
					<div className="grid gap-2">
						<CardTitle>Attributes</CardTitle>
						<CardDescription className="hidden md:block">
							Recent attributes from your store.
						</CardDescription>
					</div>
					<Button size="sm" className="ml-auto">
						<span className="hidden md:inline">Add Attribute</span>
						<PlusIcon className="h-4 w-4" />
					</Button>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Values</TableHead>
								<TableHead className="text-nowrap">Created At</TableHead>
								<TableHead className="text-right">
									<span className="sr-only md:not-sr-only">Actions</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{attributes?.map(({ name, created_at, values, id }) => (
								<TableRow key={name}>
									<TableCell>
										<p className="font-medium text-nowrap">{name}</p>
									</TableCell>
									<TableCell>
										<div className="flex flex-wrap">
											{values.map(({ value }) => (
												<Fragment key={value}>
													<Badge className="text-xs" variant="outline"> {value} </Badge>
												</Fragment>))}
										</div>
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
		</div>
	);
};

Attributes.displayName = "Attributes";
export default Attributes;