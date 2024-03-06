"use client";
import styles from "./AdminProductForm.module.scss";

import { Button, Card } from "@material-tailwind/react";
import { useLayoutEffect, useMemo } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_PRODUCT, UPDATE_PRODUCT, CREATE_PRODUCT } from "@/lib/graphql/queries";
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
import AdminProductCatWidget from "@/components/AdminProductCatWidget/AdminProductCatWidget";

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

	const [updateProduct, { data: updatedProduct, loading: isUpdateLoading, error: hasUpdateError }] =
		useMutation(UPDATE_PRODUCT);

	const [createProduct, { data: createdProduct, loading: isCreateLoading, error: hasCreateError }] =
		useMutation(CREATE_PRODUCT);

	const product = useMemo(() => data?.productGetByID, [data]);

	const methods = useForm<Product>({
		resolver: yupResolver(productSchema),
		defaultValues: product ?? initialValues,
	});

	const onSubmit: SubmitHandler<Product> = (data) => {
		if (productID) {
			data.id = +productID;
			updateProduct({ variables: { updateProductInput: data } });
			return;
		}
		createProduct({ variables: { createProductInput: data } });
	};

	useLayoutEffect(() => {
		productID &&
			fetchProduct({ variables: { id: +productID } })
				.then(({ data }) => removeTypename(data))
				.then((data) => methods.reset(data.productGetByID));
	}, [productID]);

	if (error) return notFound();
	if ((productID && !product) || loading) return <Loading />;

	return (
		<Card shadow={false} className={styles.formWrapper}>
			<FormProvider {...methods}>
				<form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
					<div className={styles.wrapper}>
						<div className={styles.main}>
							<AdminProductTextFieldsWidget />
							<AdminProductDescWidget />
						</div>
						<div className={styles.aside}>
							<AdminProductImageWidget />
							<AdminProductCatWidget />
						</div>
					</div>

					<Button type="submit" disabled={isUpdateLoading}>
						{" "}
						SAFE{" "}
					</Button>
				</form>
			</FormProvider>
		</Card>
	);
};

AdminProductForm.displayName = "AdminProductForm";

export default AdminProductForm;
