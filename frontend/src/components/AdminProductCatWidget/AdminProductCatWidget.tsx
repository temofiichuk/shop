import styles from "./AdminProductCatWidget.module.scss";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "@/lib/graphql/queries";
import { Card, Option, Select } from "@material-tailwind/react";
import Spinner from "@/components/Spinner/Spinner";
import { useEffect, useMemo } from "react";
import { CategoriesResponse, Category } from "@/types/types";
import React from "react";
import InputError from "@/components/InputError/InputError";
import { useFormContext } from "react-hook-form";

const AdminProductCatWidget = () => {
	const {
		setValue,
		watch,
		formState: { errors },
		register,
	} = useFormContext();

	const { data: dataCategories, loading: loadingCategories } =
		useQuery<CategoriesResponse>(GET_CATEGORIES);

	const currentCategories = watch("categories");

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
			{currentCategories.map(({ parent_id, id }: Category, i: number) => {
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
