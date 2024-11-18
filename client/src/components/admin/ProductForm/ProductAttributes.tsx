"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Attribute, ProductAttribute, useAll_AttributesSuspenseQuery } from "@/lib/graphql/generated/graphql";
import { memo, useCallback, useMemo } from "react";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "sonner";
import { type FormValues } from "@/components/admin/ProductForm/ProductForm";
import { useFormContext } from "@/components/admin/ProductForm/FormProvider";

interface ProductAttributesProps {
	attributes: FormValues["attributes"];
}

const ProductAttributes = ({}: ProductAttributesProps) => {
	const { data: { attributes: availableAttrs } } = useAll_AttributesSuspenseQuery();
	const { setValue, watch } = useFormContext<FormValues>();

	const attributes = watch("attributes");

	const attributesMap = useMemo(() => {
		return new Map<string, Attribute>(availableAttrs?.map(attr => [attr.name, attr as Attribute]));
	}, [availableAttrs]);

	const setAttrsValues = useCallback((values: string[], attribute: ProductAttribute) => {
		const currentAttr = attributesMap.get(attribute.name);
		const attrIndex = attributes?.findIndex(attr => attr.name === attribute.name);
		const splicedAttrs = attributes?.toSpliced(attrIndex ?? -1, 1) ?? [];

		const newAttrs = [...splicedAttrs, {
			...attribute,
			values: currentAttr?.values?.filter(({ value }) => values.includes(value)),
		}];
		const sortedAttrs = newAttrs.toSorted((a, b) => a.id! - b.id!);

		setValue("attributes", sortedAttrs);
	}, [setValue, attributesMap, attributes]);

	const changeValueHandler = useCallback((values: string[], attribute: ProductAttribute) => {
		values.length < attribute.values.length
			? toast.warning("Are you sure you wont to delete this value?", {
				description: "aAll variants that include this attribute value, will be deleted!",
				duration: 20000,
				action: {
					label: "Delete",
					onClick: () => setAttrsValues(values, attribute),
				},
			})
			: setAttrsValues(values, attribute);
	}, [setAttrsValues]);

	const changeAttributeHandler = useCallback((pressed: boolean, attribute: ProductAttribute) => {
		pressed
			? setValue("attributes", [...attributes ?? [], attribute] as ProductAttribute[])
			: toast.warning("Are you sure you wont to delete this attribute?", {
				description: "All variants that contain this attribute will be removed! Усі варіанти, які містять цей атрибут, будуть видалені!",
				duration: 20000,
				action: {
					label: "Delete",
					onClick: () => setValue("attributes", attributes?.filter(({ name }) => name !== attribute.name) as ProductAttribute[]),
				},
			});
	}, [setValue, attributes]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Attributes</CardTitle>
			</CardHeader>
			<CardContent className="transition-height">
				<table>
					<tbody className="flex flex-col gap-4">

					{availableAttrs?.map((attribute, index) => {
						const checkedAttr = attributes?.find(attr => attr?.name === attribute?.name);
						return (
							<tr key={attribute.name} className="w-full flex gap-2">
								<th>
									<Toggle
										pressed={!!checkedAttr}
										onPressedChange={(pressed) => changeAttributeHandler(pressed, attribute as ProductAttribute)}
										variant="outline"
										style={{ animationDuration: `${(index + 1) * 100}ms` }}
										className="slide-up data-[state=on]:bg-zinc-900 data-[state='on']:text-zinc-100"
									>
										{attribute.name}
									</Toggle>
								</th>
								<td>
									{checkedAttr && <ToggleGroup
										aria-label="Set values to product atribute"
										type="multiple"
										variant="outline"
										className="flex items-start justify-start gap-4"
										value={checkedAttr?.values?.map(({ value }) => value) ?? []}
										onValueChange={values => changeValueHandler(values, checkedAttr as ProductAttribute)}
									>
										{attributesMap?.get(attribute.name)?.values?.map(({ value }, index) => (
											<ToggleGroupItem
												key={value}
												value={value}
												style={{ animationDuration: `${(index + 1) * 50}ms` }}
												className="slide-up data-[state=on]:bg-blue-900 data-[state='on']:text-zinc-100"
											>
												{value}
											</ToggleGroupItem>
										))}
									</ToggleGroup>
									}
								</td>
							</tr>
						);
					})}
					</tbody>
				</table>

			</CardContent>
			<CardFooter className="justify-center border-t p-4">
				<Link href={"/admin/dashboard/attributes"}>
					<Button size="sm" variant="ghost" className="gap-1">
						<PlusCircle className="h-3.5 w-3.5" />
						Add Attribute
					</Button>
				</Link>
			</CardFooter>
		</Card>
	);
};

export default memo(ProductAttributes);
