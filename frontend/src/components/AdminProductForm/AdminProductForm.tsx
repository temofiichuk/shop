"use client";
import styles from "./AdminProductForm.module.scss";

import { Button, Card } from "@material-tailwind/react";
import { useLayoutEffect, useMemo } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_PRODUCT } from "@/lib/graphql/queries";
import { Product } from "@/types/types";
import { useSearchParams } from "next/navigation";
import removeTypename from "remove-graphql-typename";
import Loading from "@/components/Loading/Loading";
import { notFound } from "next/navigation";
import AdminProductImageWidget from "@/components/AdminProductImageWidget/AdminProductImageWidget";
import AdminProductTextFieldsWidget from "@/components/AdminProductTextFieldsWidget/AdminProductTextFieldsWidget";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import productSchema from "@/components/AdminProductForm/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import AdminProductDescWidget from "@/components/AdminProductDescWidget/AdminProductDescWidget";
import AdminProductCatWidget from "@/components/AdminProductCatWidget.tsx/AdminProductCatWidget.tsx";

const initialValues = {
	name: "",
	price: 0,
	stock: 0,
	images: [],
	descriptions: [{ head: "", body: "" }],
	category_id: 0,
	subcategory_id: 0,
};

const AdminProductForm = () => {
	const productID = useSearchParams().get("product_id");
	const [fetchProduct, { data, loading, error }] = useLazyQuery<{ productGetByID: Product }>(
		GET_PRODUCT
	);

	const product = useMemo(() => data?.productGetByID, [data]);

	const methods = useForm<Product>({
		resolver: yupResolver(productSchema),
		defaultValues: product ?? initialValues,
	});

	const onSubmit: SubmitHandler<Product> = (data) => console.log(data);

	useLayoutEffect(() => {
		productID &&
			fetchProduct({ variables: { id: +productID } })
				.then(({ data }) => removeTypename(data))
				.then((data) => methods.reset(data.productGetByID));
	}, [productID]);

	if (error) return notFound();
	if ((productID && !product) || loading) return <Loading />;

	return (
		<Card shadow={false} className=" mt-6 flex flex-row relative bg-gray-50">
			<FormProvider {...methods}>
				<form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
					<div className="flex flex-col lg:flex-row">
						<div className="w-full mr-4">
							<AdminProductTextFieldsWidget />
							<AdminProductDescWidget />
						</div>
						<div className="lg:w-full lg:sticky lg:top-10 lg:h-max lg:max-w-[20rem] grid gap-6">
							<AdminProductCatWidget />
							<AdminProductImageWidget />
						</div>
					</div>

					<Button type="submit"> SAFE </Button>
				</form>
			</FormProvider>
		</Card>
	);
};

AdminProductForm.displayName = "AdminProductForm";

export default AdminProductForm;
