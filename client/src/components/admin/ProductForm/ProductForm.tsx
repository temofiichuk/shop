import { Button } from "@/components/ui/button";
import { ChevronLeft, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/spinner";
import ProductCategory from "@/components/admin/ProductForm/ProductCategory";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CreateProductInput, UpdateProductInput } from "@/lib/graphql/generated/graphql";
import ProductAttributes from "@/components/admin/ProductForm/ProductAttributes";
import SafeButton from "@/components/admin/ProductForm/SafeButton";
import ProductVariants from "@/components/admin/ProductForm/ProductVariants";
import ProductDetails from "@/components/admin/ProductForm/ProductDetails";
import FormProvider from "@/components/admin/ProductForm/FormProvider";
import ProductStatus from "@/components/admin/ProductForm/ProductStatus";
import { zodResolver } from "@hookform/resolvers/zod";
import CreateProductInputSchema from "@/components/admin/ProductForm/schema";


type FormMode = "create" | "update";

export type FormValues = FormMode extends "create" ? CreateProductInput : UpdateProductInput;

interface ProductFormProps {
	mode: FormMode;
	defaultValues: FormValues;
}

function ProductForm({ defaultValues, mode }: ProductFormProps) {
	const { back } = useRouter();
	const methods = useForm<FormValues>({ defaultValues, resolver: zodResolver(CreateProductInputSchema) });

	const {
		getValues,
		formState: { errors, defaultValues: defaultState },
	} = methods;

	return (
		<FormProvider<FormValues> {...methods} errors={errors} defaultValues={defaultState}>
			<form
				className="mx-auto grid flex-1 auto-rows-max gap-4 w-full"
			>
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-4">
						<Button
							variant="outline"
							size="icon"
							className="h-7 w-7"
							onClick={back}
						>
							<ChevronLeft className="h-4 w-4" />
							<span className="sr-only">Back</span>
						</Button>
						<h1 className="whitespace-nowrap text-xl font-semibold tracking-tight sr-only md:not-sr-only">
							{getValues("name")}
						</h1>
						{getValues("stock") ? (
							<Badge variant="outline" className="ml-auto sm:ml-0">
								In stock
							</Badge>
						) : (
							<Badge variant="destructive" className="ml-auto sm:ml-0">
								Out stock
							</Badge>
						)}
					</div>
					<div className="items-center gap-2 md:ml-auto flex">

						<Button variant="outline" size="sm">
							<Trash className="w-4 h-4 md:hidden" />
							<span className="sr-only md:not-sr-only">Discard</span>
						</Button>

						<SafeButton mode={mode} />

					</div>
				</div>
				<div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
					<div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">

						<ProductDetails />

						<Suspense fallback={<LoadingSpinner widths={24} />}>
							<ProductAttributes attributes={getValues("attributes")} />
						</Suspense>

						<ProductVariants
							attributes={getValues("attributes")}
							variants={getValues("variants")}
						/>

						<Suspense fallback={<LoadingSpinner widths={24} />}>
							<ProductCategory categories={getValues("categories")} />
						</Suspense>

					</div>
					<div className="grid auto-rows-max items-start gap-4 lg:gap-8">
						<ProductStatus />

						{/*TODO: - upload image*/}

					</div>
				</div>
			</form>
		</FormProvider>
	);
}

ProductForm.displayName = "ProductForm";

export default ProductForm;
