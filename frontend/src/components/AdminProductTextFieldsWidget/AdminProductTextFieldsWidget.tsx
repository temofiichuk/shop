import styles from "./AdminProductTextFieldsWidget.module.scss";

import { Card, Input } from "@material-tailwind/react";
import { toRegularCase } from "@/lib/functions";
import { memo, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const simpleFields = ["name", "price", "slug", "stock"];

const AdminProductTextFieldsWidget = memo(() => {
	const {
		register,
		formState: { errors, defaultValues },
	} = useFormContext();

	const fields = useMemo(
		() => Object.entries({ ...defaultValues }).filter(([key]) => simpleFields.includes(key)),
		[defaultValues]
	);

	return (
		<Card className={styles.wrapper}>
			{fields.map(([key]) => (
				<div key={key} className={styles.field}>
					<Input
						{...register(key)}
						crossOrigin="false"
						label={toRegularCase(key)}
						placeholder={toRegularCase(key)}
						className="input"
					/>
					<ErrorMessage
						errors={errors}
						name={key}
						render={({ message }) => <p className="text-red-700 animate-shake">{message}</p>}
					/>
				</div>
			))}
		</Card>
	);
});

export default AdminProductTextFieldsWidget;
