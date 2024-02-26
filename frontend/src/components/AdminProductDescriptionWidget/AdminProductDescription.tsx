import styles from "./AdminProductDescription.module.scss";

import { HTMLAttributes, memo } from "react";
import { Description, Product } from "@/types/types";
import { ErrorMessage, Field, FieldArray, FieldProps } from "formik";
import { Button, Input, Typography } from "@material-tailwind/react";
import { toRegularCase } from "@/lib/functions";

interface IArrayFields extends HTMLAttributes<HTMLUListElement> {
	keyField: keyof Product;
	valueField: Description[];
}

const initVal = {
	head: "",
	body: "",
};

const AdminProductDescription = memo(({ keyField, valueField }: IArrayFields) => {
	return (
		<FieldArray name={keyField}>
			{(arrayHelpers) => {
				return (
					<>
						{valueField.map((field, index) => (
							<div key={`${keyField}.${index}`}>
								<Typography className="text-center">{toRegularCase(keyField)}</Typography>
								<div className="flex flex-col gap-4">
									{Object.entries(field).map(([keyItem, valueItem]) => (
										<div key={`${keyField}.${index}.${keyItem}`}>
											<Field
												name={`${keyField}.${index}.${keyItem}`}
												value={valueItem}
												type={keyItem === "id" ? "hidden" : "text"}>
												{({ field, form, ...props }: FieldProps) => (
													<Input
														variant="standard"
														crossOrigin="false"
														className="shadow-none border-0 border-b-2"
														label={toRegularCase(keyItem)}
														placeholder={toRegularCase(keyItem)}
														{...field}
														{...props}
													/>
												)}
											</Field>
											<ErrorMessage name={`${keyField}.${index}.${keyItem}`} />
										</div>
									))}
									<Button
										variant="gradient"
										type="button"
										onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
									>
										Delete
									</Button>
								</div>
							</div>
						))}
						<Button variant="gradient" type="button" onClick={() => arrayHelpers.push(initVal)}>
							Add Description
						</Button>
					</>
				);
			}}
		</FieldArray>
	);
});

export default AdminProductDescription;
