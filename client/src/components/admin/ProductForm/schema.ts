import { z } from "zod";

export const ConnectCategoryInputSchema = z.object({
	id: z.number().int(),
});

export const CreateProductAttributeValueInputSchema = z.object({
	value: z.string(),
});

export const CreateProductAttributeInputSchema = z.object({
	name: z.string(),
	values: z.array(CreateProductAttributeValueInputSchema).optional(),
});


export const CreateProductVariantInputSchema = z.object({
	sku: z.string().optional(),
	price: z.number().int().nonnegative(),
	stock: z.number().int().nonnegative().optional(),
	variant_attributes: z.array(z.object({
		name: z.string(),
		value: z.string().min(1),
	})).optional(),
});

const CreateProductInputSchema = z.object({
	name: z.string().min(1, "Name is required").regex(/^\p{Lu}\p{Ll}*\b/u, {
		message: "Must be Regular case",
	}),
	description: z.string().min(1, "Description is required").min(5, {
		message: "Description must be at least 5 characters long",
	}),
	sku: z.string().optional(),
	base_price: z.number().int().nonnegative(),
	stock: z.number().int().nonnegative().optional(),
	attributes: z.array(CreateProductAttributeInputSchema).optional(),
	variants: z.array(CreateProductVariantInputSchema).optional(),
	categories: z.array(ConnectCategoryInputSchema).optional(),
});


export default CreateProductInputSchema;