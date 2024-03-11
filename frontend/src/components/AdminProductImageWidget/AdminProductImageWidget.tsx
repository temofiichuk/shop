"use client";
import styles from "./AdminProductImageWidget.module.scss";

import { ProductImage } from "@/types/types";
import { Button, ButtonGroup } from "@material-tailwind/react";
import { useCallback, useId, useMemo } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import AdminAddImageForm from "@/components/AdminAddImageForm/AdminAddImageForm";
import CustomPopover from "@/components/Popover/Popover";
import Image from "next/image";
import { StarIcon, TrashIcon } from "@heroicons/react/24/solid";
import InputError from "@/components/InputError/InputError";
import { nanoid } from "nanoid";

const AdminProductImageWidget = () => {
	const {
		control,
		formState: { errors },
	} = useFormContext();
	const { update, remove, append } = useFieldArray({
		control,
		name: "images",
	});

	const images = useWatch({ name: "images" });

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
		[images]
	);

	const makeMain = useCallback(
		(index: number, img: ProductImage) => {
			update(index, { ...img, is_main: true });
			update(mainIndex, { ...main, is_main: false });
		},
		[images]
	);

	const imagesCard = useMemo(
		() => (
			<>
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
							if (img.is_main) return null;
							return (
								<CustomPopover
									key={nanoid()}
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
			</>
		),
		[images]
	);

	return (
		<div className={styles.widget}>
			{imagesCard}
			<InputError errors={errors} name="images" />
			<AdminAddImageForm append={append} isMain={!!main} />
		</div>
	);
};

AdminProductImageWidget.displayName = "AdminProductImageWidget";

export default AdminProductImageWidget;
