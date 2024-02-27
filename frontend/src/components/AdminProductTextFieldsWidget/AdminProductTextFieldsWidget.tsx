import styles from "./AdminProductTextFieldsWidget.module.scss";

import { Input } from "@material-tailwind/react";
import { toRegularCase } from "@/lib/functions";
import { memo, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const AdminProductTextFieldsWidget = memo(() => {
	const {
		register,
		formState: { errors, defaultValues },
	} = useFormContext();

	const simpleFields = useMemo(
		() => Object.entries({ ...defaultValues }).filter(([_, val]) => val !== Object(val)),
		[defaultValues]
	);

	return (
		<div className={styles.wrapper}>
			{simpleFields.map(([key]) => (
				<div key={key} className={styles.field}>
					<Input
						{...register(key)}
						crossOrigin="false"
						variant="standard"
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
		</div>
	);
});

export default AdminProductTextFieldsWidget;
