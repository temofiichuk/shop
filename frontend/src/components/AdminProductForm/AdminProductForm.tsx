"use client";
import styles from "./AdminProductForm.module.scss";

import { Card } from "@material-tailwind/react";
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

const initialValues = {
	name: "",
	price: 0,
	stock: 0,
	images: [],
	descriptions: [],
};

const AdminProductForm = () => {
	const productID = useSearchParams().get("product_id");
	const [fetchProduct, { data, loading, error }] = useLazyQuery<{ productGetByID: Product }>(GET_PRODUCT);

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
				.then((data) => methods.reset(data.productGetByID))
				.finally(() => console.log("fetch is ended"));
	}, [productID]);

	if (error) return notFound();
	if ((productID && !product) || loading) return <Loading />;

	return (
		<Card className="p-4 mt-6 flex flex-row relative">
			<FormProvider {...methods}>
				<form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
					<div className="flex flex-col lg:flex-row-reverse">
						<div className="lg:h-[calc(100vh-2rem)] lg:w-full lg:sticky lg:top-10 lg:right-0 lg:max-w-[20rem] lg:shadow-blue-gray-900/5 ">
							<AdminProductImageWidget />
						</div>
						<div className="w-full mr-4">
							<AdminProductTextFieldsWidget />
						</div>
					</div>

					<button type="submit"> AA</button>
				</form>
			</FormProvider>
		</Card>
	);
};

AdminProductForm.displayName = "AdminProductForm";

export default AdminProductForm;
