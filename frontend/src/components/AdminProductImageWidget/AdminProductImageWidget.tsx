"use client";
import styles from "./AdminProductImageWidget.module.scss";

import { ProductImage } from "@/types/types";
import { Button, ButtonGroup, Card } from "@material-tailwind/react";
import { memo, useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import AdminAddImageForm from "@/components/AdminAddImageForm/AdminAddImageForm";
import CustomPopover from "@/components/Popover/Popover";
import Image from "next/image";

const AdminProductImageWidget = memo(() => {
	const { control, getValues } = useFormContext();
	const { update, remove } = useFieldArray({
		control,
		name: "images",
	});

	const images = getValues("images");

	const { main, mainIndex } = useMemo(() => {
		let mainIndex = images.findIndex((img: ProductImage) => img.is_main);
		const main = images[mainIndex];
		return { main, mainIndex };
	}, [images]);

	return (
		<Card className="shadow-2xl h-fit">
			<div className={styles.wrapper}>
				<CustomPopover>
					<Image
						priority={true}
						width={700}
						height={400}
						className={styles.mainImage}
						src={main?.url ?? "/no-image.jpg"}
						alt={main?.name ?? "No Image"}
					/>
					{main && (
						<Button
							className={styles.button}
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
									<Image
										priority={true}
										width={100}
										height={40}
										src={img.url}
										alt={img.name}
										className={styles.image}
									/>

									<ButtonGroup size="sm" className={styles.button}>
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
