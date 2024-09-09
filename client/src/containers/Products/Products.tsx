"use client";

import Image from "next/image";
import { File, ImageIcon, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProductsCountSuspenseQuery, useProductsLazyQuery } from "@/lib/graphql/generated/graphql";
import { useEffect, useState } from "react";
import { USD } from "@/lib/functions";
import moment from "moment/moment";
import usePagination from "@/lib/hooks/usePagination";
import { LoadingSpinner } from "@/components/ui/spinner";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Products = () => {
	const [page, setPage] = useState(1);
	const [take, setTake] = useState(15);

	const { data: { productsCount } } = useProductsCountSuspenseQuery();
	const totalPages = Math.ceil(productsCount.count / take);
	const [fetchProducts, { data, loading }] = useProductsLazyQuery({ variables: { pagination: { take, page } } });

	const paginationRange = usePagination({
		total: totalPages,
		siblingCount: 1,
		currentPage: page,
		showEdges: true,
	});

	useEffect(() => {
		const fetch = async () => {
			// await new Promise(resolve => setTimeout(resolve, 57000));
			await fetchProducts();
		};
		fetch();
	}, [page, take]);

	return (
		<main
			className="grid flex-1 items-start p-4 sm:px-6 sm:py-0 md:gap-8 opacity-100 animate-in fade-in-0 duration-1000">
			<div className="flex items-center ">
				<div>
					<Button size="sm" className="h-7 gap-1">
						<PlusCircle className="h-3.5 w-3.5" />
						<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
							Add Product
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
							<DropdownMenuCheckboxItem checked>
								Active
							</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem>
								Archived
							</DropdownMenuCheckboxItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<Button size="sm" variant="outline" className="h-7 gap-1">
						<File className="h-3.5 w-3.5" />
						<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
							Export
						</span>
					</Button>
				</div>
			</div>
			<Card>
				<CardHeader>
					<CardTitle className="flex gap-4 items-center">Products {loading && <LoadingSpinner />}</CardTitle>
					<div className="flex justify-between items-center text-zinc-500">
						<div>
							Manage your products and view their sales performance.
						</div>
						<div>
							<Pagination>
								<PaginationContent>

									<PaginationItem>
										<PaginationPrevious
											disabled={page === 1}
											onClick={() => setPage((prev) => prev === 1 ? 1 : prev - 1)} />
									</PaginationItem>

									{paginationRange.map((item, index) => {
										return <PaginationItem key={index}>
											{item === "ellipsis"
												? <PaginationEllipsis />
												: <PaginationLink
													onClick={() => setPage(item as number)}
													isActive={item === page}>{item}</PaginationLink>
											}
										</PaginationItem>;
									})}

									<PaginationItem>
										<PaginationNext
											disabled={page === totalPages}
											onClick={() => setPage((prev) => prev === totalPages ? totalPages : prev + 1)} />
									</PaginationItem>

								</PaginationContent>
							</Pagination>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="hidden w-[100px] sm:table-cell">
									<span className="sr-only">Image</span>
								</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Price</TableHead>
								<TableHead className="hidden md:table-cell">
									Stock
								</TableHead>
								<TableHead className="hidden md:table-cell text-nowrap">Created at</TableHead>
								<TableHead>
									<span className="sr-only md:not-sr-only">Actions</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.products?.map(({ name, created_at, base_price, id, images, stock }) => {
								const mainImage = images.length ? images.find(image => image.is_main) : undefined;
								return (
									<TableRow key={id}>
										<TableCell className="hidden sm:table-cell">
											{mainImage ? <Image
												alt={`Product image: ${mainImage.name}`}
												className="aspect-square rounded-md object-cover"
												height="80"
												src={mainImage.url}
												width="80"
											/> : <ImageIcon className="w-20 h-20" />}

										</TableCell>
										<TableCell className="font-medium w-1/2">
											{name}
										</TableCell>
										<TableCell>
											<Badge variant="outline">Draft</Badge>
										</TableCell>
										<TableCell>{USD.format(base_price)}</TableCell>
										<TableCell className="hidden md:table-cell">{stock}</TableCell>
										<TableCell className="hidden md:table-cell min-w-max text-nowrap">
											{moment(created_at).format("YYYY-MM-DD HH:mm")}
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button aria-haspopup="true" size="icon" variant="ghost">
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</CardContent>
				<CardFooter className="flex justify-between items-center">
					<div className="text-xs text-muted-foreground">
						Showing <strong>{(page - 1) * take + 1}-{page * take > productsCount.count ? productsCount.count : page * take}</strong> of <strong>{productsCount.count}</strong> products
					</div>
				</CardFooter>
			</Card>
		</main>
	);
};

Products.displayName = "Products";
export default Products;