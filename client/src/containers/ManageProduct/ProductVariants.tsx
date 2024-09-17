import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
	CreateProductAttributeInput,
	CreateProductVariantInput,
	ProductAttribute,
	ProductVariant,
} from "@/lib/graphql/generated/graphql";
import { memo, useCallback, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import useAppState from "@/lib/hooks/useAppState";


const ProductVariants = () => {
	const [isGenerateMode, setIsGenerateMode] = useAppState("generate-mode", false);

	const {
		control,
		register,
		watch,
		setValue,
		getValues,
	} = useFormContext();

	const initialState: CreateProductVariantInput = useMemo(() => {
		const stock = Math.ceil(+getValues("stock") / getValues("variants").length);
		return {
			sku: `${getValues("sku")}`.substring(0, 3) ?? "",
			price: getValues("base_price") ?? 0,
			stock: !isNaN(stock) ? stock : 0,
			variant_attributes: [],
		};
	}, [getValues]);

	const {
		fields,
		append,
		remove,
	} = useFieldArray({ control, name: "variants" });

	const {
		fields: attrsFields,
	} = useFieldArray({ control, name: "attributes" });

	const [attributes] = watch(["attributes"]);

	const generateVariantsAttrs = useCallback((attributes: ProductAttribute[]) => {
		// Initialize an empty array for storing variant combinations
		let variant_attributes: Array<Array<{ name: string, value: string }>> = [[]];
		// Loop through each attribute and its possible values
		for (const attr of attributes) {
			if (!attr?.values?.length) continue;
			const values = attr.values;
			const allCombinations: Array<Array<{ name: string, value: string }>> = [];
			// Loop through all existing variant combinations
			for (let i = 0; i < values.length; i++) {
				for (const combination of variant_attributes) {
					// Create a new combination by adding the current attribute value
					const newCombination = [
						...combination,
						{ name: attr.name, value: values[i].value },
					];
					// Add the new combination to the list of all combinations
					allCombinations.push(newCombination);
				}
			}
			// Update variant_attributes with the new combinations
			variant_attributes = allCombinations;
		}
		return variant_attributes;
	}, []);

	const generateVariants = useCallback(() => {
		const [variants, attributes] = getValues(["variants", "attributes"]) as [ProductVariant[], ProductAttribute[]];
		const variantsMap = new Map<string, ProductVariant>(variants.map((variant) => {
			const key = variant.variant_attributes.map(({ value }) => value).join(".");
			return [key, variant];
		}));
		const newVariants: CreateProductVariantInput[] = [];

		const newVariantsAttrs = generateVariantsAttrs(attributes);

		newVariantsAttrs.forEach((attrs) => {
			const key = attrs.map(({ value }) => value).join(".");
			if (variantsMap.has(key)) {
				newVariants.push(variantsMap.get(key)!);
			} else {
				isGenerateMode && newVariants.push({ ...initialState, variant_attributes: attrs });
			}
		});

		setValue("variants", newVariants);
	}, [getValues, setValue, isGenerateMode]);

	useEffect(() => {
		if (!isGenerateMode) return;
		generateVariants();
	}, [isGenerateMode]);

	useEffect(() => {
		generateVariants();
	}, [attributes]);

	return (
		<Card>
			<CardHeader className="flex flex-row justify-between items-center">
				<CardTitle>Variants</CardTitle>
				<div className="flex items-center space-x-2">
					<Switch id="generate-mode" checked={isGenerateMode}
									onCheckedChange={checked => setIsGenerateMode({ value: checked })} />
					<Label htmlFor="generate-mode">Generate Mode</Label>
				</div>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						{!!fields.length && <TableRow>
							<TableHead>SKU</TableHead>
							<TableHead>Stock</TableHead>
							<TableHead>Price</TableHead>
							{attributes?.map((attr: CreateProductAttributeInput) => !!attr?.values?.length && (
								<TableHead key={attr.name}>{attr.name}</TableHead>
							))}
							<TableHead>Actions</TableHead>
						</TableRow>}
					</TableHeader>
					<TableBody>
						{fields.map((field, index) => {
							const keyName = `variants.${index}`;
							return (
								<TableRow key={field.id} className="slide-up" style={{ animationDuration: `${(index + 1) * 30}ms` }}>
									<TableCell className="font-semibold text-nowrap">
										<Label htmlFor={`${keyName}.sku`} className="sr-only">
											SKU
										</Label>
										<Input autoFocus={index === 0} id={`${keyName}.sku`} type="text" {...register(`${keyName}.sku`)} />
									</TableCell>
									<TableCell>
										<Label htmlFor={`${keyName}.stock`} className="sr-only">
											Stock
										</Label>
										<Input id={`${keyName}.stock`} type="number" {...register(`${keyName}.stock`)} />
									</TableCell>
									<TableCell>
										<Label htmlFor={`${keyName}.price`} className="sr-only">
											Price
										</Label>
										<Input id={`${keyName}.price`} type="number" {...register(`${keyName}.price`)} />
									</TableCell>
									{attrsFields?.map((fieldAttr, i) => {
										const attribute = getValues(`attributes.${i}`) as ProductAttribute;
										const currentVariant = getValues(`variants.${index}`) as ProductVariant;
										const currentVariantAttr = currentVariant.variant_attributes.find((attr) => attr.name === attribute.name);
										return !!attribute?.values?.length && (
											<TableCell
												key={fieldAttr.id}
												className="font-semibold text-nowrap text-center"
											>
												<Select
													defaultValue={currentVariantAttr?.value}
													onValueChange={value => {
														const variantAttrs = currentVariant.variant_attributes;
														const currentAttrIndex = variantAttrs.findIndex(({ name }) => name === attribute.name);
														if (currentAttrIndex !== -1) variantAttrs.splice(currentAttrIndex, 1);

														setValue(`variants.${index}.variant_attributes`, [...variantAttrs, {
															name: attribute.name,
															value,
														}]);
													}}>
													<SelectTrigger><SelectValue placeholder={attribute.name}></SelectValue></SelectTrigger>
													<SelectContent>
														{attribute.values.map(({ value }) => (
															<SelectItem key={value} value={value}>{value}</SelectItem>
														))}
													</SelectContent>
												</Select>
											</TableCell>
										);
									})}
									<TableCell>
										<Button onClick={() => remove(index)}>Delete</Button>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</CardContent>
			<CardFooter className="justify-center border-t p-4">
				{!attributes?.length ? (
					"Add attributes to create variants"
				) : (
					<Button
						size="sm"
						variant="ghost"
						className="gap-1"
						onClick={() => append(initialState)}>
						<PlusCircle className="h-3.5 w-3.5" />
						Add Variant
					</Button>
				)}
			</CardFooter>
		</Card>
	);
};

export default memo(ProductVariants);
