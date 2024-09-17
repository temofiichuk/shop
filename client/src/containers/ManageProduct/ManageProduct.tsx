"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Trash, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
	CreateProductInput,
	UpdateProductInput,
	useCreateCategoryMutation,
	useProductLazyQuery,
	useUpdateCategoryMutation,
} from "@/lib/graphql/generated/graphql";
import { useRouter, useSearchParams } from "next/navigation";
import { useLayoutEffect } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { LoadingSpinner } from "@/components/ui/spinner";
import ProductAttributes from "@/containers/ManageProduct/ProductAttributes";
import ProductVariants from "@/containers/ManageProduct/ProductVariants";
import SubmitButton from "@/components/SubmitButton/SubmitButton";


let initialState: CreateProductInput = {
	base_price: 0,
	description: "",
	name: "New Product",
	sku: "",
	stock: 0,
	attributes: [],
	variants: [],
};

// TODO: - update logic in variants/product_id

const ManageProduct = () => {
	const { back } = useRouter();

	const searchParams = useSearchParams();
	const editedProductId = searchParams.get("product_id");

	const [createProduct] = useUpdateCategoryMutation();
	const [updateProduct] = useCreateCategoryMutation();

	const methods = useForm<CreateProductInput | UpdateProductInput>({
		defaultValues: initialState,
	});

	const {
		handleSubmit,
		getValues,
		watch,
		register,
		reset,
	} = methods;

	const [fetchProduct, { data, loading: initLoading }] = useProductLazyQuery({
		onCompleted: (data) => reset(data.product as any),
	});

	const isInStock = getValues("stock");
	const [name, attributes] = watch(["name", "attributes"]);

	const submitHandler = (data: FieldValues) => {
		console.log(data);
	};

	useLayoutEffect(() => {
		if (!editedProductId) return;
		fetchProduct({ variables: { id: +editedProductId } });
	}, [editedProductId]);

	if ((editedProductId && !data) || initLoading) return <LoadingSpinner widths={24} />;

	return (
		<section className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 animate-in fade-in-0 duration-1000">
			<FormProvider {...methods}>
				<form
					className="mx-auto grid flex-1 auto-rows-max gap-4 w-full"
					onSubmit={handleSubmit(submitHandler)}
				>
					<div className="flex justify-between items-center">
						<div className="flex items-center gap-4">
							<Button
								variant="outline"
								size="icon"
								className="h-7 w-7"
								onClick={back}
							>
								<ChevronLeft className="h-4 w-4" />
								<span className="sr-only">Back</span>
							</Button>
							<h1 className="whitespace-nowrap text-xl font-semibold tracking-tight sr-only md:not-sr-only">
								{name}
							</h1>
							{isInStock ? (
								<Badge variant="outline" className="ml-auto sm:ml-0">
									In stock
								</Badge>
							) : (
								<Badge variant="destructive" className="ml-auto sm:ml-0">
									Out stock
								</Badge>
							)}
						</div>
						<div className="items-center gap-2 md:ml-auto flex">
							<Button variant="outline" size="sm">
								<Trash className="w-4 h-4 md:hidden" />
								<span className="sr-only md:not-sr-only">Discard</span>
							</Button>
							<SubmitButton><Button size="sm" asChild>Save Product</Button></SubmitButton>
						</div>
					</div>
					<div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
						<div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
							<Card>
								<CardHeader>
									<CardTitle>Product Details</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid gap-6">
										<div className="grid gap-3">
											<Label htmlFor="name">Name</Label>
											<Input
												id="name"
												type="text"
												className="w-full"
												defaultValue="Gamer Gear Pro Controller"
												{...register("name")}
											/>
										</div>
										<div className="grid gap-3">
											<Label htmlFor="description">Description</Label>
											<Textarea
												id="description"
												className="min-h-32"
												{...register("description")}
											/>
										</div>
									</div>
								</CardContent>
							</Card>

							<ProductAttributes />
							<ProductVariants />

							<Card>
								<CardHeader>
									<CardTitle>Product Category</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid gap-6 sm:grid-cols-3">
										<div className="grid gap-3">
											<Label htmlFor="category">Category</Label>
											<Select>
												<SelectTrigger id="category" aria-label="Select category">
													<SelectValue placeholder="Select category" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="clothing">Clothing</SelectItem>
													<SelectItem value="electronics">Electronics</SelectItem>
													<SelectItem value="accessories">Accessories</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className="grid gap-3">
											<Label htmlFor="subcategory">Subcategory (optional)</Label>
											<Select>
												<SelectTrigger
													id="subcategory"
													aria-label="Select subcategory"
												>
													<SelectValue placeholder="Select subcategory" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="t-shirts">T-Shirts</SelectItem>
													<SelectItem value="hoodies">Hoodies</SelectItem>
													<SelectItem value="sweatshirts">Sweatshirts</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
						<div className="grid auto-rows-max items-start gap-4 lg:gap-8">
							<Card>
								<CardHeader>
									<CardTitle>Product Status</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid gap-6">
										<div className="grid gap-3">
											<Label htmlFor="status">Status</Label>
											<Select>
												<SelectTrigger id="status" aria-label="Select status">
													<SelectValue placeholder="Select status" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="draft">Draft</SelectItem>
													<SelectItem value="published">Active</SelectItem>
													<SelectItem value="archived">Archived</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</div>
								</CardContent>
							</Card>
							<Card className="overflow-hidden">
								<CardHeader>
									<CardTitle>Product Images</CardTitle>
									<CardDescription>
										Lipsum dolor sit amet, consectetur adipiscing elit
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid gap-2">
										<Image
											alt="Product image"
											className="aspect-square w-full rounded-md object-cover"
											height="300"
											src="/placeholder.svg"
											width="300"
										/>
										<div className="grid grid-cols-3 gap-2">
											<button>
												<Image
													alt="Product image"
													className="aspect-square w-full rounded-md object-cover"
													height="84"
													src="/placeholder.svg"
													width="84"
												/>
											</button>
											<button>
												<Image
													alt="Product image"
													className="aspect-square w-full rounded-md object-cover"
													height="84"
													src="/placeholder.svg"
													width="84"
												/>
											</button>
											<button
												className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
												<Upload className="h-4 w-4 text-muted-foreground" />
												<span className="sr-only">Upload</span>
											</button>
										</div>
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Archive Product</CardTitle>
									<CardDescription>
										Lipsum dolor sit amet, consectetur adipiscing elit.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div></div>
									<Button size="sm" variant="secondary">
										Archive Product
									</Button>
								</CardContent>
							</Card>
						</div>
					</div>
				</form>
			</FormProvider>
		</section>
	);
};

ManageProduct.displayName = "ManageProduct";
export default ManageProduct;
