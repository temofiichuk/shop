import styles from "./AdminProductCatWidget.module.scss";
import { HTMLAttributes, memo, useEffect, useMemo } from "react";
import { Select, Option, Card } from "@material-tailwind/react";
import { Controller, FieldName, FieldValues, useFormContext, useWatch } from "react-hook-form";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_CATEGORIES, GET_SUBCATEGORIES } from "@/lib/graphql/queries";
import { Category, Subcategory } from "@/types/types";
import InputError from "@/components/InputError/InputError";

interface IControlledSelect extends HTMLAttributes<HTMLSelectElement> {
	label: string;
	name: FieldName<FieldValues>;
}

const mapCallback = (cat: Category | Subcategory) => (
	<Option value={cat.id.toString()} key={cat.id}>
		{cat.name}
	</Option>
);

const ControlledSelect = ({ label, name, children }: IControlledSelect) => {
	const {
		control,
		formState: { errors },
	} = useFormContext();

	return (
		<div>
			<Controller
				name={name}
				control={control}
				render={({ field: { value, ...field } }) => (
					<Select {...field} value={value.toString()} label={label}>
						{children}
					</Select>
				)}
			/>
			<InputError errors={errors} name={name} />
		</div>
	);
};

const AdminProductCatWidget = () => {
	const { data: categories } = useQuery<{
		categoryGetAll: Category[];
	}>(GET_CATEGORIES);

	const catID = useWatch({ name: "category_id" });

	const categoriesChildren = useMemo(() => {
		return categories?.categoryGetAll.map(mapCallback);
	}, [categories]);

	const subcategoriesChildren = useMemo(() => {
		if (catID === 0) return;
		const currentCat = categories?.categoryGetAll.find((cat) => cat.id === +catID);
		return currentCat?.subcategories?.map(mapCallback);
	}, [catID]);

	return (
		<Card className={styles.wrapper}>
			{categoriesChildren && (
				<ControlledSelect name="category_id" label="Category">
					{categoriesChildren}
				</ControlledSelect>
			)}

			{subcategoriesChildren && (
				<ControlledSelect name="subcategory_id" label="Subcategory">
					{subcategoriesChildren}
				</ControlledSelect>
			)}
		</Card>
	);
};

AdminProductCatWidget.displayName = "AdminProductCatWidget";
export default AdminProductCatWidget;
