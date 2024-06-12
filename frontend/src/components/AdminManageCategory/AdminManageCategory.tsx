"use client";
import styles from "./AdminManageCategory.module.scss";
import { useMutation, useQuery } from "@apollo/client";
import {
	CategoriesResponse,
	Category,
	CategoryTreeResponse,
	CategoryType,
	Product,
	SyncCategoriesResponse,
	UpdateCategoriesResponse,
} from "@/types/types";
import { GET_CATEGORY_TREE, SYNC_CATEGORIES } from "@/lib/graphql/queries";
import Spinner from "@/components/Spinner/Spinner";
import {
	Button,
	Card,
	Collapse,
	Input,
	List,
	ListItem,
	ListItemSuffix,
	IconButton,
	Typography,
	ButtonGroup,
	ButtonGroupProps,
	Popover,
	PopoverHandler,
	PopoverContent,
} from "@material-tailwind/react";
import { ChevronRightIcon, PlusIcon } from "@heroicons/react/24/outline";
import { HTMLProps, memo, useCallback, useEffect } from "react";
import { FormProvider, useFieldArray, useForm, useFormContext } from "react-hook-form";
import { InformationCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import removeTypename from "remove-graphql-typename";

interface IFormCategories {
	categories: Partial<Category>[];
}

const defaultValues: IFormCategories = {
	categories: [{ name: "", type_name: "root", children: [] }],
};

const Item = memo(
	({
		fieldName,
		index,
		removeParent,
	}: {
		fieldName: string;
		index: number;
		removeParent: (index: number) => void;
	}) => {
		const { register, control, getValues, reset } = useFormContext();
		const name = `${fieldName}.children`;
		const { fields, remove, append } = useFieldArray({ control, name });
		const category = getValues(fieldName);

		const Buttons = memo((props: HTMLProps<HTMLDivElement>) => {
			return (
				<div {...props}>
					<ButtonGroup>
						<IconButton
							title={`Remove ${category.name}`}
							role="button"
							type="button"
							onClick={() => removeParent(index)}>
							<TrashIcon width={15} />
						</IconButton>
						<IconButton
							role="button"
							type="button"
							title={`Add Category to ${category.name}`}
							onClick={() => append(defaultValues.categories[0])}>
							<PlusIcon width={15} />
						</IconButton>
					</ButtonGroup>
				</div>
			);
		});

		return (
			<ListItem className={"block p-0 "} ripple={false}>
				<div className={"w-full flex gap-2"}>
					<Input
						className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
						labelProps={{
							className: "hidden",
						}}
						containerProps={{ className: "min-w-[100px]" }}
						crossOrigin={undefined}
						{...register(`${fieldName}.name`)}
					/>
					<ListItemSuffix>
						<div className={"flex justify-center gap-2"}>
							<Popover>
								<PopoverHandler>
									<IconButton title="Manage Category" className={styles.infoButton}>
										<InformationCircleIcon width={15} />
									</IconButton>
								</PopoverHandler>
								<PopoverContent>
									<Buttons />
								</PopoverContent>
							</Popover>
							<Buttons className={styles.manageButtons} />
						</div>
					</ListItemSuffix>
				</div>

				{fields.length > 0 && (
					<List className={"pr-0 pl-5"} role={"list"}>
						{fields.map((field, i) => (
							<Item key={field.id} fieldName={`${name}.${i}`} index={i} removeParent={remove} />
						))}
					</List>
				)}
			</ListItem>
		);
	}
);

const AdminManageCategory = () => {
	// console.clear();
	const {
		data: dataCategoryTree,
		loading: loadingCategoryTree,
		error: errorCategoryTree,
		refetch: refetchCategoryTree,
	} = useQuery<CategoryTreeResponse>(GET_CATEGORY_TREE);

	const [
		syncCategories,
		{ data: dataSyncCategories, loading: loadingSyncCategories, error: errorUpdateCategories },
	] = useMutation<SyncCategoriesResponse>(SYNC_CATEGORIES);

	// const {
	// 	data: dataCategoryTypes,
	// 	loading: loadingCategoryTypes,
	// 	error: errorCategoryTypes,
	// 	refetch: refetchCategoryTypes,
	// } = useQuery(GET_CATEGORY_TYPES);

	const methods = useForm<IFormCategories>({
		defaultValues,
	});
	const { reset, handleSubmit, control } = methods;

	const { fields, append, remove } = useFieldArray({ control, name: "categories" });

	// const flattenCategoryTree = useCallback((categoryTree: Category[]) => {
	// 	const flatCategories: Category[] = [];
	//
	// 	// A recursive function to flatten the tree
	// 	const flatten = (categories: Category[]) => {
	// 		for (const category of categories) {
	// 			const { children, ...categoryWithoutChildren } = category;
	// 			flatCategories.unshift(categoryWithoutChildren as Category);
	//
	// 			children?.length > 0 && flatten(children);
	// 		}
	// 	};
	//
	// 	// Start flattening from the top-level categories
	// 	flatten(categoryTree);
	//
	// 	return flatCategories;
	// }, []);

	const onSubmitHandler = useCallback(
		({ categories }: IFormCategories) => {
			console.log(categories);

			syncCategories({ variables: { newCategories: categories } });
			// updateCategories({ variables: { updateCategoryInput: flattenCategoryTree(categories) } });
		},
		[syncCategories]
		// [updateCategories, flattenCategoryTree]
	);

	// Sync Form Values
	useEffect(() => {
		if (dataSyncCategories) {
			reset({ categories: dataSyncCategories?.syncCategories });
			console.log("Successfully updated categories data", dataSyncCategories);
		}
	}, [dataSyncCategories]);

	// Reset Form Values
	useEffect(() => {
		dataCategoryTree?.getCategoryTree &&
			reset({ categories: removeTypename(dataCategoryTree?.getCategoryTree) });
	}, [dataCategoryTree]);

	if (loadingCategoryTree) return <Spinner />;

	return (
		<Card className={"p-5 pl-0 mt-5"}>
			<Typography variant="h2" className={"p-5"}>
				Categories
			</Typography>
			<form onSubmit={handleSubmit(onSubmitHandler)}>
				<FormProvider {...methods}>
					<List className={"pr-0 pl-5 " + styles.inputContainer}>
						{fields.map((field, index) => (
							<Item
								key={field.id}
								index={index}
								fieldName={`categories.${index}`}
								removeParent={remove}
							/>
						))}
					</List>
					<div className={"flex gap-2 justify-center"}>
						<Button
							size={"sm"}
							role="button"
							type="button"
							onClick={() => append(defaultValues.categories[0])}>
							<PlusIcon width={20} />
						</Button>
						<Button size={"sm"} type="submit">
							Safe
						</Button>
					</div>
				</FormProvider>
			</form>
		</Card>
	);
};

export default AdminManageCategory;
