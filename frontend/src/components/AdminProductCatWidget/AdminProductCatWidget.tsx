import styles from "./AdminProductCatWidget.module.scss";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "@/lib/graphql/queries";
import { Card, Option, Select } from "@material-tailwind/react";
import Spinner from "@/components/Spinner/Spinner";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CategoriesResponse, Category } from "@/types/types";
import React from "react";
import InputError from "@/components/InputError/InputError";
import { useFormContext, useWatch } from "react-hook-form";

const AdminProductCatWidget = () => {
	const {
		setValue,
		getValues,
		formState: { errors },
		register,
	} = useFormContext();

	const {
		data: dataCategories,
		loading: loadingCategories,
		error: errorCategories,
		refetch: refetchCategories,
	} = useQuery<CategoriesResponse>(GET_CATEGORIES);

	const categoriesMap = useMemo(() => {
		const categoriesMap = new Map<number | null, Category[]>();
		dataCategories?.getCategories.map((category) => {
			categoriesMap.set(
				category.parent_id,
				categoriesMap.has(category.parent_id)
					? [...(categoriesMap.get(category.parent_id) ?? []), category]
					: [category]
			);
		});
		return categoriesMap;
	}, [dataCategories]);

	const onChangeHandler = (value: string, parent_id: number | null) => {
		const currentCategories = getValues("categories");
		const updatedCategories = [];
		let updated = false;

		for (let i = 0; i < currentCategories.length; i++) {
			if (updated) break;
			const category = currentCategories[i];

			if (category.parent_id === parent_id) {
				updatedCategories.push({ ...category, id: Number(value) });
				updated = true;
			} else {
				updatedCategories.push(category);
			}
		}

		if (categoriesMap.has(Number(value))) {
			updatedCategories.push({ id: 0, parent_id: Number(value) });
		}

		setValue("categories", updatedCategories);
	};

	if (loadingCategories) return <Spinner />;

	return (
		<Card className={styles.wrapper}>
			{getValues("categories").map(({ parent_id, id }: Category, i: number) => {
				if (!categoriesMap.has(parent_id)) return;
				return (
					<div key={parent_id}>
						<Select
							{...register(`categories.${i}.id`)}
							label="Category"
							key={parent_id}
							onChange={(value) => value && onChangeHandler(value, parent_id)}
							value={id.toString()}
							children={categoriesMap
								.get(parent_id)
								?.map((cat) => (
									<Option key={cat.id} value={cat.id.toString()} children={cat.name} />
								))}
						/>
						<InputError errors={errors} name={`categories.${i}.id`} />
					</div>
				);
			})}
		</Card>
	);
};

AdminProductCatWidget.displayName = "AdminProductCatWidget";
export default AdminProductCatWidget;

// const AdminProductCatWidget = () => {
// 	const {
// 		setValue,
// 		getValues,
// 		formState: { errors },
// 		register,
// 	} = useFormContext();
//
// 	const [categories, setCategories] = useState<Pick<Category, "id" | "parent_id">[]>(
// 		getValues("categories")
// 	);
// 	// const [fields, setFields] = useState([{ id: "", parent_id: 0 }]);
//
// 	const {
// 		data: dataCategories,
// 		loading: loadingCategories,
// 		error: errorCategories,
// 		refetch: refetchCategories,
// 	} = useQuery<CategoriesResponse>(GET_CATEGORIES);
//
// 	const categoriesMap = useMemo(() => {
// 		const categoriesMap = new Map<number | 0, Category[]>();
// 		dataCategories?.getCategories.map((category) => {
// 			categoriesMap.set(
// 				category.parent_id ?? 0,
// 				categoriesMap.has(category.parent_id ?? 0)
// 					? [...categoriesMap.get(category.parent_id ?? 0)!, category]
// 					: [category]
// 			);
// 		});
// 		return categoriesMap;
// 	}, [dataCategories]);
//
// 	const onChangeHandler = useCallback(
// 		(value: string, parent_id: number | null) => {
// 			setCategories((prevState) => {
// 				let newState: Pick<Category, "id" | "parent_id">[] = [];
// 				let isReset = false;
//
// 				for (let j = 0; j < prevState.length; j++) {
// 					if (isReset) break;
// 					if (prevState[j].parent_id === parent_id) {
// 						prevState[j].id = Number(value);
// 						isReset = true;
// 					}
// 					newState.push(prevState[j]);
// 				}
//
// 				return categoriesMap.has(Number(value))
// 					? [...newState, { id: 0, parent_id: Number(value) }]
// 					: [...newState];
// 			});
// 		},
// 		[categoriesMap]
// 	);
//
// 	useEffect(() => {
// 		setValue("categories", categories);
// 		console.log(categories);
// 	}, [categories]);
//
// 	if (loadingCategories) return <Spinner />;
//
// 	return (
// 		<Card className={styles.wrapper}>
// 			{categories.map(({ parent_id, id }, i) => {
// 				if (!categoriesMap.has(parent_id ?? 0)) return;
// 				return (
// 					<div key={parent_id}>
// 						<Select
// 							{...register(`categories.${i}.id`)}
// 							label="Category"
// 							key={parent_id}
// 							onChange={(value) => value && onChangeHandler(value, parent_id ?? 0)}
// 							value={id.toString()}
// 							children={categoriesMap
// 								.get(parent_id ?? 0)
// 								?.map((cat) => (
// 									<Option key={cat.id} value={cat.id.toString()} children={cat.name} />
// 								))}
// 						/>
// 						<InputError errors={errors} name={`categories.${i}.id`} />
// 					</div>
// 				);
// 			})}
// 		</Card>
// 	);
// };
