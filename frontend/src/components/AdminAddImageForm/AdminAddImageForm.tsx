import styles from "./AdminAddImageForm.module.scss";
import { FC, useCallback, useMemo, useState } from "react";
import useOutsideEvent from "@/lib/hooks/useOutsideEvent";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductImage } from "@/types/types";
import { yupResolver } from "@hookform/resolvers/yup";
import imageSchema from "@/components/AdminAddImageForm/schema";
import { Button, Card, Collapse, Input } from "@material-tailwind/react";
import { toRegularCase } from "@/lib/functions";
import InputError from "@/components/InputError/InputError";

const initialValues: Pick<ProductImage, "name" | "url"> = {
	name: "",
	url: "",
};

interface IAdminAddImageForm {
	isMain: boolean;
	append: (data: ProductImage) => void;
}

const AdminAddImageForm: FC<IAdminAddImageForm> = ({ isMain, append }) => {
	const [openAddForm, setOpenAddForm] = useState(false);
	const ref = useOutsideEvent<HTMLDivElement, () => void>("click", () => setOpenAddForm(false));

	const {
		register,
		handleSubmit,
		reset,
		formState: { defaultValues, errors },
	} = useForm<ProductImage>({
		resolver: yupResolver(imageSchema),
		defaultValues: initialValues,
	});

	const onSubmit: SubmitHandler<ProductImage> = useCallback(
		(data) => {
			append({ ...data, is_main: !isMain });
			setOpenAddForm(false);
			reset();
		},
		[isMain]
	);

	const form = useMemo(
		() => (
			<Card className={styles.form}>
				{Object.keys({ ...defaultValues }).map((key) => (
					<div key={`add_image.${key}`}>
						<Input
							crossOrigin="false"
							variant="standard"
							className={styles.input}
							placeholder={toRegularCase(key)}
							label={toRegularCase(key)}
							{...register(key as keyof ProductImage)}
						/>
						<InputError errors={errors} name={key} />
					</div>
				))}
				<Button onClick={handleSubmit(onSubmit)}> ADD </Button>
			</Card>
		),
		[errors, isMain]
	);

	return (
		<div ref={ref}>
			<Button className={styles.button} onClick={() => setOpenAddForm((prev) => !prev)}>
				Add Image
			</Button>
			<Collapse open={openAddForm} className={styles.collapse}>
				{form}
			</Collapse>
		</div>
	);
};

AdminAddImageForm.displayName = "AdminAddImageForm";

export default AdminAddImageForm;
