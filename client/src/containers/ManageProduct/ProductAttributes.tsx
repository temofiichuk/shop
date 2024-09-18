"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
	Attribute,
	CreateProductAttributeInput,
	ProductAttribute,
	useAttributesQuery,
} from "@/lib/graphql/generated/graphql";
import { useFormContext } from "react-hook-form";
import { LoadingSpinner } from "@/components/ui/spinner";
import { memo, useCallback, useMemo } from "react";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "sonner";


const ProductAttributes = () => {
	const { data, loading } = useAttributesQuery();

	const { setValue, watch, getValues } = useFormContext();
	const attributes = watch("attributes") as ProductAttribute[];

	const attributesMap = useMemo(() => {
		return new Map<string, Attribute>(data?.attributes?.map(attr => [attr.name, attr as Attribute]));
	}, [data]);

	const setAttrsValues = useCallback((values: string[], attribute: CreateProductAttributeInput) => {
		const attributes = getValues("attributes") as ProductAttribute[];
		const currentAttr = attributesMap.get(attribute.name);
		const attrIndex = attributes.findIndex(attr => attr.name === attribute.name);
		const splicedAttrs = attributes.toSpliced(attrIndex, 1);

		const newAttrs = [...splicedAttrs, {
			...attribute as ProductAttribute,
			values: currentAttr?.values?.filter(({ value }) => values.includes(value)),
		}];
		const sortedAttrs = newAttrs.toSorted((a, b) => a.id - b.id);

		setValue("attributes", sortedAttrs);
	}, [setValue, attributesMap, getValues]);

	const changeValueHandler = useCallback((values: string[], attribute: CreateProductAttributeInput) => {
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

	const changeAttributeHandler = useCallback((pressed: boolean, attribute: CreateProductAttributeInput) => {
		const attributes = getValues("attributes");
		pressed
			? setValue("attributes", [...attributes, attribute])
			: toast.warning("Are you sure you wont to delete this attribute?", {
				description: "All variants that include this attribute, will be deleted!",
				duration: 20000,
				action: {
					label: "Delete",
					onClick: () => setValue("attributes", [...attributes].filter(({ name }) => name !== attribute.name)),
				},
			});
	}, [setValue, getValues]);

	if (loading) return <LoadingSpinner widths={24} />;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Attributes</CardTitle>
			</CardHeader>
			<CardContent className="transition-height">
				<table>
					<tbody className="flex flex-col gap-4">

					{data?.attributes?.map((attribute, index) => {
						const checkedAttr = attributes.find(attr => attr.name === attribute.name)!;
						return (
							<tr key={attribute.name} className="w-full flex gap-2">
								<th>
									<Toggle
										pressed={!!checkedAttr}
										defaultPressed={!!checkedAttr}
										onPressedChange={(pressed) => changeAttributeHandler(pressed, checkedAttr)}
										variant="outline"
										style={{ animationDuration: `${(index + 1) * 100}ms` }}
										className="slide-up data-[state=on]:bg-zinc-900 data-[state='on']:text-zinc-100"
									>
										{attribute.name}
									</Toggle>
								</th>
								<td>
									{!!checkedAttr && <ToggleGroup
										aria-label="Set values to product atribute"
										type="multiple"
										variant="outline"
										className="flex items-start justify-start gap-4"
										value={checkedAttr?.values?.map(({ value }) => value) ?? []}
										onValueChange={values => changeValueHandler(values, checkedAttr)}
									>
										{attributesMap?.get(attribute.name)?.values?.map(({ value }, index) => (
											<ToggleGroupItem
												key={value}
												value={value}
												style={{ animationDuration: `${(index + 1) * 50}ms` }}
												className="slide-up"
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
