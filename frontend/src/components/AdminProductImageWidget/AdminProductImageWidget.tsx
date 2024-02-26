"use client";
import styles from "./AdminProductImageWidget.module.scss";

import { ProductImage } from "@/types/types";
import { Button, ButtonGroup, Card } from "@material-tailwind/react";
import { memo, useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import AdminAddImageForm from "@/components/AdminAddImageForm/AdminAddImageForm";
import CustomPopover from "@/components/Popover/Popover";

const AdminProductImageWidget = memo(({ images = [] }: { images?: ProductImage[] }) => {
	const { control, getValues } = useFormContext();
	const { update, remove } = useFieldArray({
		control,
		name: "images",
	});

	const { main, mainIndex } = useMemo(() => {
		let mainIndex = images.findIndex((img: ProductImage) => img.is_main);
		const main = images[mainIndex];
		return { main, mainIndex };
	}, [images]);

	return (
		<Card color="transparent" shadow={false} className={styles.imageWidget}>
			<div className={styles.wrapper}>
				<CustomPopover>
					<img className={styles.mainImage} src={main?.url ?? "/no-image.jpg"} alt={main?.name ?? "No Image"} />
					{main && (
						<Button
							className="absolute z-50 left-1/2 -translate-x-1/2 bottom-8"
							onClick={async () => {
								update(0, { ...images[0], is_main: true });
								remove(mainIndex);
							}}>
							<span>Delete</span>
						</Button>
					)}
				</CustomPopover>
				{images.length > 0 && (
					<div className={styles.imagesWrapper}>
						{images.map((img: ProductImage, index: number) => {
							if (img.is_main) return;
							return (
								<CustomPopover key={`image.${index}`}>
									<img src={img.url} alt={img.name} className={styles.image} />

									<ButtonGroup size="sm" className="absolute z-50 left-1/2 -translate-x-1/2 bottom-4">
										<Button
											onClick={async () => {
												update(mainIndex, { ...main, is_main: false });
												update(index, { ...img, is_main: true });
											}}>
											Make Main
										</Button>
										<Button onClick={() => remove(index)}>Delete</Button>
									</ButtonGroup>
								</CustomPopover>
							);
						})}
					</div>
				)}

				<AdminAddImageForm isMain={!!main} />
			</div>
		</Card>
	);
});

AdminProductImageWidget.displayName = "AdminProductImageWidget";

export default AdminProductImageWidget;
