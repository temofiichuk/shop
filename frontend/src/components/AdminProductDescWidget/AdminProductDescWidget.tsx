import styles from "./AdminProductDescWidget.module.scss";
import { FC } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button, Card, Input, Textarea, Typography } from "@material-tailwind/react";
import { ErrorMessage } from "@hookform/error-message";

interface IAdminProductDescWidget {}

const initialValue = {
	head: "",
	body: "",
};

const AdminProductDescWidget: FC<IAdminProductDescWidget> = (props) => {
	const {
		register,
		control,
		getValues,
		formState: { errors },
	} = useFormContext();
	const { fields, remove, insert, append } = useFieldArray({
		control,
		name: "descriptions",
	});

	return (
		<Card color="transparent" shadow={false} className="mt-6">
			<div className={styles.wrapper}>
				<Typography className="mb-2"> Descriptions :</Typography>
				<div className="grid gap-6">
					{fields.map((field, index: number) => {
						return (
							<Card key={`${field.id}.${index}`} className="grid gap-6 p-4 shadow-2xl">
								<div>
									<div className="flex items-center gap-6">
										<Input
											{...register(`descriptions.${index}.head`)}
											crossOrigin="false"
											label="Head"
											placeholder="Head"
											className="shadow-none"
										/>
										<Button className="h-10" onClick={() => remove(index)}>
											X
										</Button>
									</div>
									<ErrorMessage
										errors={errors}
										name={`descriptions.${index}.head`}
										render={({ message }) => <p className="text-red-700 animate-shake">{message}</p>}
									/>
								</div>
								<div>
									<Textarea label="Body" className="shadow-none" {...register(`descriptions.${index}.body`)} />
									<ErrorMessage
										errors={errors}
										name={`descriptions.${index}.body`}
										render={({ message }) => <p className="text-red-700 animate-shake">{message}</p>}
									/>
								</div>
							</Card>
						);
					})}
					<Button onClick={() => append(initialValue)}>Add Desc</Button>
				</div>
			</div>
		</Card>
	);
};

AdminProductDescWidget.displayName = "AdminProductDescWidget";
export default AdminProductDescWidget;
