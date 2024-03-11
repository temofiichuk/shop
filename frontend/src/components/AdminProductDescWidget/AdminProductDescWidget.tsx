import styles from "./AdminProductDescWidget.module.scss";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Button, Card, Input, Textarea, Typography } from "@material-tailwind/react";
import InputError from "@/components/InputError/InputError";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useCallback } from "react";

const initialValue = {
	head: "",
	body: "",
};

const AdminProductDescWidget = () => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext();
	const { fields, remove, append } = useFieldArray({
		control,
		name: "descriptions",
	});

	const removeItem = useCallback((index: number) => remove(index), []);

	return (
		<Card color="transparent" shadow={false} className={styles.widget}>
			<div className={styles.wrapper}>
				<Typography className={styles.title}> Descriptions </Typography>
				<div className={styles.wrapper}>
					{fields.map((field, index: number) => (
						<Card key={field.id} className={styles.card}>
							<div>
								<div className={styles.description}>
									<Input
										{...register(`descriptions.${index}.head`)}
										crossOrigin="false"
										label="Head"
										placeholder="Head"
										className="input"
									/>
									<Button className={styles.removeButton} onClick={() => removeItem(index)}>
										<TrashIcon width={20} />
									</Button>
								</div>
								<InputError errors={errors} name={`descriptions.${index}.head`} />
							</div>
							<div>
								<Textarea
									label="Body"
									className="input"
									{...register(`descriptions.${index}.body`)}
								/>
								<InputError errors={errors} name={`descriptions.${index}.body`} />
							</div>
						</Card>
					))}
					<Button onClick={() => append(initialValue)}>Add Desc</Button>
				</div>
			</div>
		</Card>
	);
};

AdminProductDescWidget.displayName = "AdminProductDescWidget";
export default AdminProductDescWidget;
