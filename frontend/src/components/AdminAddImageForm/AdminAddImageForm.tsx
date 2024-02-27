import styles from "./AdminAddImageForm.module.scss";
import { memo, useCallback, useMemo, useState } from "react";
import useOutsideEvent from "@/lib/hooks/useOutsideEvent";
import { SubmitHandler, useFieldArray, useForm, useFormContext } from "react-hook-form";
import { ProductImage } from "@/types/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { imageSchema } from "@/components/AdminProductForm/schema";
import { Button, Card, Collapse, Input } from "@material-tailwind/react";
import { toRegularCase } from "@/lib/functions";
import { ErrorMessage } from "@hookform/error-message";

const initialValues: Pick<ProductImage, "name" | "url"> = {
	name: "",
	url: "",
};

const AdminAddImageForm = memo(({ isMain }: { isMain: boolean }) => {
	const [openAddForm, setOpenAddForm] = useState(false);
	const ref = useOutsideEvent<HTMLDivElement, () => void>("click", () => setOpenAddForm(false));

	const {
		register,
		handleSubmit,
		formState: { defaultValues, errors },
	} = useForm<ProductImage>({
		resolver: yupResolver(imageSchema),
		defaultValues: initialValues,
	});

	const { control } = useFormContext();

	const { append } = useFieldArray({
		control,
		name: "images",
	});

	const onSubmit: SubmitHandler<ProductImage> = useCallback((data) => append({ ...data, is_main: !isMain }), [isMain]);

	const fields = useMemo(() => Object.keys({ ...defaultValues }), [defaultValues]);

	const FormCollapse = memo(() => {
		return (
			<Card className={styles.form}>
				{fields.map((key) => (
					<div key={key}>
						<Input
							crossOrigin="false"
							variant="standard"
							className={styles.input}
							placeholder={toRegularCase(key)}
							label={toRegularCase(key)}
							{...register(key as keyof ProductImage)}
						/>
						<ErrorMessage
							errors={errors}
							name={key}
							render={({ message }) => <span className="animate-shake">{message}</span>}
						/>
					</div>
				))}
				<Button onClick={handleSubmit(onSubmit)}> ADD </Button>
				<Button onClick={() => append({ name: "Some Name", url: "/marguerite.jpg", is_main: !isMain })}>
					Img (test)
				</Button>
			</Card>
		);
	});

	FormCollapse.displayName = "FormCollapse";

	return (
		<div ref={ref}>
			<Button className={styles.button} onClick={() => setOpenAddForm((prev) => !prev)}>
				Add Image
			</Button>
			<Collapse open={openAddForm} className={styles.collapse}>
				<FormCollapse />
			</Collapse>
		</div>
	);
});

AdminAddImageForm.displayName = "AdminAddImageForm";

export default AdminAddImageForm;
