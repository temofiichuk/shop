"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCategoriesSuspenseQuery } from "@/lib/graphql/generated/graphql";
import { memo, useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { FormValues } from "@/components/admin/ProductForm/ProductForm";
import { useFormContext } from "@/components/admin/ProductForm/FormProvider";

interface ProductCategoryProps {
	categories: FormValues["categories"];
}

const ProductCategory = ({ categories }: ProductCategoryProps) => {
	const [open, setOpen] = useState(false);
	const { data: { categories: availableCategories } } = useCategoriesSuspenseQuery();
	const categoryMap = useMemo(() => new Map(availableCategories.map((cat) => [cat.id, cat])), [availableCategories]);

	const { setValue, getValues } = useFormContext<FormValues>();

	const setCategoryHandler = useCallback((id: number) => {
		const categories = getValues("categories");
		setValue("categories", [...(categories ?? []), { id }]);
	}, [setValue, getValues]);

	const removeCategoryHandler = useCallback((id: number) => {
		const categories = getValues("categories");
		setValue("categories", [...(categories ?? [])].filter(({ id: catId }) => catId !== id));
	}, [setValue, getValues]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Product Category</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-wrap gap-4">
					{categories?.map(({ id }) => (
						<Button key={id} size="sm" onClick={() => removeCategoryHandler(id)}>{categoryMap.get(id)!.name}</Button>
					))}
				</div>
				<br />
				<Popover open={open} onOpenChange={open => setOpen(open)}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							role="combobox"
							className="w-[200px] justify-between"
						>
							{"Select category..."}
							<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[200px] p-0">
						<Command>
							<CommandInput placeholder="Search category..." className="h-9" />
							<CommandList>
								<CommandEmpty>No category found.</CommandEmpty>
								<CommandGroup>
									{availableCategories
										?.filter(({ id }) => !categories?.some(({ id: catId }) => id === catId))
										?.map(({ id, name }, index) => (
											<CommandItem
												key={id}
												className={`slide-up duration-[${index * 200}ms]`}
												onSelect={() => {
													setCategoryHandler(id);
													setOpen(false);
												}}>
												{name}
												<CheckIcon className={cn("ml-auto h-4 w-4", "opacity-100")} />
											</CommandItem>
										))}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>

			</CardContent>
		</Card>
	);
};

export default memo(ProductCategory);
