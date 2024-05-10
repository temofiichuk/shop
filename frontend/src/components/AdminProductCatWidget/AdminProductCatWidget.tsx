import styles from "./AdminProductCatWidget.module.scss";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "@/lib/graphql/queries";
import { Card, Option, Select } from "@material-tailwind/react";
import Spinner from "@/components/Spinner/Spinner";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CategoriesResponse, Category } from "@/types/types";
import React from "react";
import InputError from "@/components/InputError/InputError";
import { useFormContext } from "react-hook-form";

const AdminProductCatWidget = () => {
	const [categories, setCategories] = useState<Pick<Category, "id" | "parent_id">[]>([
		{ id: 0, parent_id: 0 },
	]);
	// const [fields, setFields] = useState([{ id: "", parent_id: 0 }]);

	const {
		data: dataCategories,
		loading: loadingCategories,
		error: errorCategories,
		refetch: refetchCategories,
	} = useQuery<CategoriesResponse>(GET_CATEGORIES);

	const {
		setValue,
		formState: { errors, isValidating },
		register,
	} = useFormContext();

	const categoriesMap = useMemo(() => {
		const categoriesMap = new Map<number | 0, Category[]>();
		dataCategories?.getCategories.map((category) => {
			categoriesMap.set(
				category.parent_id ?? 0,
				categoriesMap.has(category.parent_id ?? 0)
					? [...categoriesMap.get(category.parent_id ?? 0)!, category]
					: [category]
			);
		});
		return categoriesMap;
	}, [dataCategories]);

	const onChangeHandler = useCallback(
		(value: string, parent_id: number | null) => {
			setCategories((prevState) => {
				let newState: Pick<Category, "id" | "parent_id">[] = [];
				let isReset = false;

				for (let j = 0; j < prevState.length; j++) {
					if (isReset) break;
					if (prevState[j].parent_id === parent_id) {
						prevState[j].id = Number(value);
						isReset = true;
					}
					newState.push(prevState[j]);
				}

				return categoriesMap.has(Number(value))
					? [...newState, { id: 0, parent_id: Number(value) }]
					: [...newState];
			});
		},
		[categoriesMap]
	);

	useEffect(() => {
		setValue("categories", categories);
		console.log(isValidating);
	}, [categories]);

	if (loadingCategories) return <Spinner />;

	return (
		<Card className={styles.wrapper}>
			{categories.map(({ parent_id }, i) => {
				if (!categoriesMap.has(parent_id ?? 0)) return;
				return (
					<div key={parent_id}>
						<Select
							{...register(`categories.${i}.id`)}
							label="Category"
							key={parent_id}
							onChange={(value) => value && onChangeHandler(value, parent_id ?? 0)}
							children={categoriesMap
								.get(parent_id ?? 0)
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
