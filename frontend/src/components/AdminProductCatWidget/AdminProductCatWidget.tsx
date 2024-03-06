import styles from "./AdminProductCatWidget.module.scss";
import { FC, memo, useEffect } from "react";
import { Select, Option, Card } from "@material-tailwind/react";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useLazyQuery } from "@apollo/client";
import { GET_CATEGORIES, GET_SUBCATEGORIES } from "@/lib/graphql/queries";
import { Category, Subcategory } from "@/types/types";

interface IAdminProductCatWidget {}

const AdminProductCatWidget: FC<IAdminProductCatWidget> = memo(() => {
	const [fetchCat, { data: category, error: errorCat, loading: loadingCat }] = useLazyQuery<{
		categoryGetAll: Category[];
	}>(GET_CATEGORIES);
	const [fetchSubcat, { data: subcategory, error, loading }] = useLazyQuery<{
		subcategoryGetAll: Subcategory[];
	}>(GET_SUBCATEGORIES);

	const {
		register,
		control,
		watch,
		setValue,
		getValues,
		formState: { errors },
	} = useFormContext();

	const cat_id: number = watch("category_id");
	const subcat_id: number = getValues("subcategory_id");

	useEffect(() => {
		fetchCat();
	}, []);

	useEffect(() => {
		if (cat_id !== 0) fetchSubcat({ variables: { id: +cat_id } });
	}, [cat_id]);

	return (
		<Card className={styles.wrapper}>
			{category && (
				<div>
					<Controller
						name="category_id"
						control={control}
						render={({ field: { value, ...field } }) => (
							<Select {...field} value={value.toString()} label="Category">
								{category.categoryGetAll.map((cat) => (
									<Option value={cat.id?.toString()} key={cat.id}>
										{cat.name}
									</Option>
								)) ?? <Option>Category</Option>}
							</Select>
						)}
					/>

					<ErrorMessage
						errors={errors}
						name="category_id"
						render={({ message }) => <p className="text-red-700 animate-shake">{message}</p>}
					/>
				</div>
			)}
			<div>
				{subcategory && (
					<Select
						{...register("subcategory_id")}
						onChange={(value) => setValue("subcategory_id", value ?? "")}
						disabled={cat_id == 0}
						value={subcat_id.toString()}
						label="Subcategory">
						{subcategory.subcategoryGetAll.map((cat) => (
							<Option value={cat.id?.toString()} key={cat.id}>
								{cat.name}
							</Option>
						)) ?? <Option value={"0"}>Subcategory</Option>}
					</Select>
				)}

				<ErrorMessage
					errors={errors}
					name={"subcategory_id"}
					render={({ message }) => <p className="text-red-700 animate-shake">{message}</p>}
				/>
			</div>
		</Card>
	);
});

AdminProductCatWidget.displayName = "AdminProductCatWidget";
export default AdminProductCatWidget;
