import { useFieldArray } from "react-hook-form";
import {
	CreateProductVariantAttributeInput,
	CreateProductVariantInput,
	UpdateProductVariantInput,
} from "@/lib/graphql/generated/graphql";
import { FormValues } from "@/containers/ManageProduct/ProductForm";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { memo, useCallback, useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import ProductControlledSelect from "@/containers/ManageProduct/ProductControlledSelect";
import { SelectContent, SelectItem } from "@/components/ui/select";
import { useFormContext } from "@/containers/ManageProduct/FormProvider";
import { clsx } from "clsx";
import ProductTableCell from "@/containers/ManageProduct/ProductTableCell";

interface ProductVariantsProps {
	attributes: FormValues["attributes"],
	variants: FormValues["variants"],
}

type ArrayElement<A> = A extends readonly (infer T)[] ? T : never

const initialVariantValues: ArrayElement<FormValues["variants"]> = {
	sku: "",
	price: 0,
	stock: 0,
	variant_attributes: [],
};

const ProductVariants = ({ attributes, variants }: ProductVariantsProps) => {
	const [isGenerateMode, setIsGenerateMode] = useState(false);

	const { control, getValues, setValue, errors } = useFormContext<FormValues>();
	const { fields, append, remove } = useFieldArray({ control, name: "variants" });

	const handleGenerateVariants = useCallback(() => {
		if (!attributes?.length || !isGenerateMode) {
			// resetField("variants");
			return;
		}

		const variantsMap = new Map(variants?.map((variant) => {
			const key = variant?.variant_attributes?.map(({ value }) => value).join(".");
			return [key, variant];
		}));

		let variant_attributes: CreateProductVariantAttributeInput[][] = [[]];

		for (const attribute of attributes) {
			const allCombinations: CreateProductVariantAttributeInput[][] = [];
			if (!attribute?.values?.length) continue;

			for (let i = 0; i < attribute?.values?.length; i++) {
				for (const combination of variant_attributes) {
					const newCombination = [
						...combination,
						{ id: undefined, name: attribute.name, value: attribute.values[i]?.value },
					];
					allCombinations.push(newCombination as CreateProductVariantAttributeInput[]);
				}
			}
			variant_attributes = allCombinations;
		}

		const newVariants: CreateProductVariantInput[] = [];

		variant_attributes.forEach((attrs) => {
			const key = attrs.map(({ value }) => value).join(".");

			if (variantsMap.has(key)) {
				newVariants.push(variantsMap.get(key) as UpdateProductVariantInput);
			} else if (isGenerateMode) {
				newVariants.push({
					...initialVariantValues,
					variant_attributes: attrs as CreateProductVariantAttributeInput[],
				});
			}
		});

		setValue("variants", newVariants as UpdateProductVariantInput[]);
	}, [attributes, variants, getValues, setValue, isGenerateMode]);

	useEffect(() => {
		if (!isGenerateMode) return;
		handleGenerateVariants();
	}, [isGenerateMode]);

	useEffect(() => {
		handleGenerateVariants();
	}, [attributes]);

	return (
		<Card>
			<CardHeader>
				<Switch checked={isGenerateMode} onCheckedChange={setIsGenerateMode}>
					Generate Mode
				</Switch>
			</CardHeader>
			<CardContent>


				<Table>
					<TableBody>
						<TableRow>
							<TableHead>SKU</TableHead>
							<TableHead>Stock</TableHead>
							<TableHead>Price</TableHead>
							{attributes?.map((attr) => (
								<TableHead key={attr.name}>{attr.name}</TableHead>
							))}
							<TableHead>Actions</TableHead>
						</TableRow>
						{fields?.map(({ id, variant_attributes }, index: number) => (
							<TableRow key={id}>
								<ProductTableCell name={`variants.${index}.sku`} />
								<ProductTableCell name={`variants.${index}.stock`} />
								<ProductTableCell name={`variants.${index}.price`} />

								{variant_attributes?.map((attr, i) => {

									return (
										<TableCell key={attr.name}
										>
											<ProductControlledSelect
												className={clsx({ "border border-red-700": !!errors?.variants?.[index]?.variant_attributes?.[i]?.value })}
												name={`variants.${index}.variant_attributes.${i}.value`}
												control={control}>
												<SelectContent
												>
													{attributes?.[i]?.values?.map(({ value }) => (
														<SelectItem key={value} value={value}>{value}</SelectItem>
													))}
												</SelectContent>
											</ProductControlledSelect>
										</TableCell>
									);
								})}
								<TableCell>
									<Button onClick={() => remove(index)}>Delete</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
			<CardFooter>

				<Button onClick={() => append({
					...initialVariantValues,
					variant_attributes: attributes?.map(({ name }) => ({ name, value: "" })),
				} as UpdateProductVariantInput)
				}>Add variant </Button>

			</CardFooter>
		</Card>
	);
};

export default memo(ProductVariants);
