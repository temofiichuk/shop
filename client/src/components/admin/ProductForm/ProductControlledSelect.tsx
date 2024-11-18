import { Control, Controller } from "react-hook-form";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormValues } from "@/components/admin/ProductForm/ProductForm";
import { HTMLAttributes, memo, ReactElement } from "react";


interface ProductControlledSelectProps extends HTMLAttributes<HTMLSelectElement> {
	name: string;
	children: ReactElement<typeof SelectContent>;
	control: Control<FormValues, any>;
}

const ProductControlledSelect = ({ name, children, control, className }: ProductControlledSelectProps) => {
	// const attributes = watch("attributes");
	return (
		<Controller
			control={control}
			name={name as "name"}
			render={({ field }) => (
				<Select
					value={field.value as string}
					onValueChange={field.onChange}>
					<SelectTrigger className={className}><SelectValue /></SelectTrigger>
					{children}
				</Select>
			)} />
	);
};

ProductControlledSelect.displayName = "ProductControlledSelect";

export default memo(ProductControlledSelect);
