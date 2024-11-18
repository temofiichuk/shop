import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FieldName } from "react-hook-form";
import { type FormValues } from "@/components/admin/ProductForm/ProductForm";
import { Textarea } from "@/components/ui/textarea";
import { toCamelCase } from "@/lib/functions";
import { memo } from "react";
import { useFormContext } from "@/components/admin/ProductForm/FormProvider";
import { ErrorMessage } from "@hookform/error-message";

interface ProductFieldProps {
	name: FieldName<FormValues>;
	type?: "text" | "number" | "textarea";
	isLabel?: true;
}

const ProductField = ({ name, type = "text", isLabel }: ProductFieldProps) => {
	const { register, errors } = useFormContext<FormValues>();
	return (
		<>
			{isLabel && <Label htmlFor={name}>{toCamelCase(name)}</Label>}
			{type !== "textarea"
				? <Input
					id={name}
					type={type}
					className="w-full"
					{...register(name as "name", {
						setValueAs: (value) => type === "number" ? +value : value.trim(),
					})} />
				: <Textarea
					id={name}
					className="w-full"
					{...register(name as "name", {
						setValueAs: (value) => value.trim(),
					})} />}
			<ErrorMessage
				name={name} errors={errors}
				render={({ message }) => <p className={"text-xs text-red-700"}>{message}</p>} />
		</>
	);
};

ProductField.displayName = "ProductField";

export default memo(ProductField);
