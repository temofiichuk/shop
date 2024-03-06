"use client";
import styles from "./AdminProductImageWidget.module.scss";

import { ProductImage } from "@/types/types";
import { Button, ButtonGroup } from "@material-tailwind/react";
import { memo, useCallback, useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import AdminAddImageForm from "@/components/AdminAddImageForm/AdminAddImageForm";
import CustomPopover from "@/components/Popover/Popover";
import Image from "next/image";
import { StarIcon, TrashIcon } from "@heroicons/react/24/solid";

const AdminProductImageWidget = memo(() => {
	const { control, watch } = useFormContext();
	const { update, remove } = useFieldArray({
		control,
		name: "images",
	});

	const images = watch("images");

	const { main, mainIndex } = useMemo(() => {
		let mainIndex = images.findIndex((img: ProductImage) => img.is_main);
		const main = images[mainIndex];
		return { main, mainIndex };
	}, [images]);

	const removeMain = useCallback(
		(index: number) => {
			const firstNotMainImgIndex = images.findIndex((img: ProductImage) => !img.is_main);
			update(firstNotMainImgIndex, { ...images[firstNotMainImgIndex], is_main: true });
			remove(index);
		},
		[remove, update, images]
	);

	const makeMain = useCallback(
		(index: number, img: ProductImage) => {
			update(index, { ...img, is_main: true });
			update(mainIndex, { ...main, is_main: false });
		},
		[remove, update, images]
	);

	return (
		<div className={styles.wrapper}>
			<CustomPopover contentProps={{ className: styles.positionOfButtons }}>
				<Image
					priority={true}
					width={700}
					height={400}
					className={styles.mainImage}
					src={main?.url ?? "/no-image.jpg"}
					alt={main?.name ?? "No Image"}
				/>
				{main && (
					<Button onClick={() => removeMain(mainIndex)}>
						<TrashIcon className={styles.button} />
					</Button>
				)}
			</CustomPopover>
			{images.length > 1 && (
				<div className={styles.imagesWrapper}>
					{images.map((img: ProductImage, index: number) => {
						if (img.is_main) return;
						return (
							<CustomPopover
								key={`image.${img.url}`}
								contentProps={{ className: styles.positionOfButtons }}>
								<Image
									priority={true}
									width={100}
									height={40}
									src={img.url}
									alt={img.name}
									className={styles.image}
								/>

								<ButtonGroup size="sm">
									<Button onClick={() => makeMain(index, img)}>
										<StarIcon className={styles.button} />
									</Button>
									<Button onClick={() => remove(index)}>
										<TrashIcon className={styles.button} />
									</Button>
								</ButtonGroup>
							</CustomPopover>
						);
					})}
				</div>
			)}

			<AdminAddImageForm isMain={!!main} />
		</div>
	);
});

AdminProductImageWidget.displayName = "AdminProductImageWidget";

export default AdminProductImageWidget;
