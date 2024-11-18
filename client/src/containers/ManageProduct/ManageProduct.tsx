"use client";
import { CreateProductInput, UpdateProductInput, useProductLazyQuery } from "@/lib/graphql/generated/graphql";
import { useSearchParams } from "next/navigation";
import { useLayoutEffect } from "react";
import { LoadingSpinner } from "@/components/ui/spinner";
import ProductForm from "@/components/admin/ProductForm/ProductForm";

let initialState: CreateProductInput = {
	base_price: 0,
	description: "",
	name: "New Product",
	sku: "",
	stock: 0,
	attributes: [],
	variants: [],
	categories: [],
	// images: []
};

// TODO: - update logic in variants/product_id

const ManageProduct = () => {
	const searchParams = useSearchParams();
	const editedProductId = searchParams.get("product_id");

	const [fetchProduct, { data, loading: initLoading }] = useProductLazyQuery();

	useLayoutEffect(() => {
		if (!editedProductId) return;
		fetchProduct({ variables: { id: +editedProductId } });
	}, [editedProductId]);

	if ((editedProductId && !data) || initLoading) return <LoadingSpinner widths={24} />;

	const product = data?.product as unknown as UpdateProductInput;

	return (
		<section className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 animate-in fade-in-0 duration-1000">
			<ProductForm
				mode={product ? "update" : "create"}
				defaultValues={product ?? initialState} />
		</section>
	);
};

ManageProduct.displayName = "ManageProduct";
export default ManageProduct;
