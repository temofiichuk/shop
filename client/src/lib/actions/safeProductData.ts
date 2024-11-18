"use server";
import { type ProductForm } from "@/components/admin/ProductForm/ProductForm";
import getClient from "@/lib/apollo/apollo.client.rsc";
import { CREATE_PRODUCT, UPDATE_PRODUCT } from "@/lib/graphql/queries/product";
import { CreateProductInput, UpdateProductInput } from "@/lib/graphql/generated/graphql";


const safeProductData = async (fields: ProductForm, isEdit?: boolean) => {
	const data = isEdit ? fields as UpdateProductInput : fields as CreateProductInput;

	try {
		await getClient().mutate({ mutation: isEdit ? UPDATE_PRODUCT : CREATE_PRODUCT, variables: { data } });
	} catch (e) {
		throw Error("Safe product Error", { cause: e });
	}
};

export default safeProductData;
