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
		() => Object.entries({ ...defaultValues }).filter(([_, val]) => !Array.isArray(val)),
		[defaultValues]
	);

	return (
		<div className="mb-1 flex flex-col gap-6">
			{simpleFields.map(([key]) => (
				<div key={key}>
					<Input
						{...register(key)}
						crossOrigin="false"
						variant="standard"
						label={toRegularCase(key)}
						placeholder={toRegularCase(key)}
						className="shadow-none border-0 border-b-2"
					/>
					<ErrorMessage errors={errors} name={key} />
				</div>
			))}
		</div>
	);
});

export default AdminProductTextFieldsWidget;
