import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@hookform/error-message";
import { TableCell } from "@/components/ui/table";
import { useFormContext } from "@/components/admin/ProductForm/FormProvider";
import { FormValues } from "@/components/admin/ProductForm/ProductForm";
import { clsx } from "clsx";

interface ProductTableCellProps {
	name: string;
	type?: "number";
}

type AnyObject = Record<string, unknown>;

const get = (from: AnyObject, selector: string): unknown =>
	selector
		.replace(/\[([^\[\]]*)\]/g, ".$1.")
		.split(".")
		.filter((t) => t !== "")
		.reduce((prev: unknown, cur: string) => (prev as AnyObject)?.[cur], from);

const ProductTableCell = ({ name, type }: ProductTableCellProps) => {
	const { register, errors } = useFormContext<FormValues>();

	return (
		<TableCell>

			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger type={"button"}>
						<Input
							className={clsx({ "border-red-700 dark:border-red-700": !!get(errors, name) })}
							type={type} {...register(name as "name", {
							setValueAs: (value: string) => type === "number" ? +value : value.trim(),
						})} />
					</TooltipTrigger>

					<ErrorMessage
						errors={errors}
						name={name as "name"}
						render={({ message }) => <TooltipContent>{message}</TooltipContent>}
					/>
				</Tooltip>
			</TooltipProvider>

		</TableCell>
	);
};

ProductTableCell.displayName = "ProductTableCell";
export default ProductTableCell;
