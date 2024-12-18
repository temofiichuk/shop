import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Upload } from "lucide-react";
import { useFormContext } from "@/components/admin/ProductForm/FormProvider";
import { FormValues } from "@/components/admin/ProductForm/ProductForm";
import { memo } from "react";

interface ProductGalleryProps {
}

const ProductGallery = ({}: ProductGalleryProps) => {
	const { control } = useFormContext<FormValues>();
	// const { fields } = useFieldArray({ control, name: "images" });
	return (
		<Card className="overflow-hidden">
			<CardHeader>
				<CardTitle>Gallery</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-2">
					<Image
						alt="Product image"
						className="aspect-square w-full rounded-md object-cover"
						height="300"
						src="/placeholder.svg"
						width="300"
					/>
					<div className="grid grid-cols-3 gap-2">
						<button>
							<Image
								alt="Product image"
								className="aspect-square w-full rounded-md object-cover"
								height="84"
								src="/placeholder.svg"
								width="84"
							/>
						</button>
						<button>
							<Image
								alt="Product image"
								className="aspect-square w-full rounded-md object-cover"
								height="84"
								src="/placeholder.svg"
								width="84"
							/>
						</button>
						<button
							type="button"
							className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
							<Upload className="h-4 w-4 text-muted-foreground" />
							<span className="sr-only">Upload</span>
						</button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

ProductGallery.displayName = "ProductGallery";
export default memo(ProductGallery);