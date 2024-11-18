import { isEmpty } from "lodash";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useMemo } from "react";
import { isEqual } from "apollo-utilities";
import { FormValues } from "@/components/admin/ProductForm/ProductForm";
import {
	CreateProductInput,
	useCreateProductMutation,
	useUpdateProductMutation,
} from "@/lib/graphql/generated/graphql";
import { LoadingSpinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useFormContext } from "@/components/admin/ProductForm/FormProvider";


interface SafeButtonProps {
	mode: "create" | "update";
}

const SafeButton = ({ mode }: SafeButtonProps) => {
	const { replace } = useRouter();
	const isEdit = mode === "update";
	const [update, { data: updatedData, loading: loadingUpdate, error: errorUpdate }] = useUpdateProductMutation();
	const [create, { data: createdData, loading: loadingCreate, error: errorCreate }] = useCreateProductMutation();

	const { watch, reset, defaultValues, setError, trigger } = useFormContext<FormValues>();
	const productFields = watch();

	const submitHandler = useCallback(async (changedProductFields: Partial<FormValues>) => {
		if (!changedProductFields || !(await trigger())) return;

		isEdit
			? await update({
				variables: {
					data: {
						...changedProductFields,
						id: +defaultValues?.id!,
					},
				},
			})
			: await create({ variables: { data: changedProductFields as CreateProductInput } });

	}, [create, update, defaultValues]);

	const changedProductFields = useMemo(() => {
		const changes: Partial<FormValues> = {};

		for (const key in productFields) {
			const keyName = key as keyof FormValues;
			if (!isEqual(productFields[keyName], defaultValues?.[keyName])) {
				changes[keyName] = productFields[keyName] as any;
			}
		}

		return isEmpty(changes) ? undefined : changes;
	}, [productFields, defaultValues]);


	useEffect(() => {
		if (!updatedData) return;
		reset(updatedData.updateProduct);
		toast.success("The Product was updated successfully", {});
	}, [updatedData]);

	useEffect(() => {
		if (!createdData) return;
		replace(`?product_id=${createdData.createProduct.id}`);
		// reset(createdData.createProduct);

		toast.success("The Product was created successfully", {});
	}, [createdData]);

	useEffect(() => {
		const error = errorUpdate || errorCreate;
		if (!error) return;
		const graphQLError = error?.graphQLErrors?.[0];
		if (graphQLError?.message === "Validation error") {
			Object.entries(graphQLError?.extensions?.validation_errors as {}).forEach(([key, value]) => {
				setError(key as "name", { message: value as string });
			});
		}
	}, [errorUpdate, errorCreate]);

	const loading = loadingCreate || loadingUpdate;

	return (
		<Button
			onClick={() => changedProductFields && submitHandler(changedProductFields)}
			size="sm"
			disabled={isEmpty(changedProductFields) || loading}>
			Save Product {loading && <LoadingSpinner />}
		</Button>
	);
};

export default SafeButton;
