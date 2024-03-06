import { array, number, object, string } from "yup";

export const imageSchema = object({
	name: string().required("Image name is required field"),
	url: string()
		.required("Url is required field")
		.matches(/\.(jpe?g|png|webp)$/i, "Invalid format"),
});

export default object().shape({
	name: string().required("Name is required field").min(5).max(50),
	price: number()
		.required("Price is required field")
		.positive("Price must be a positive number")
		.integer("Price must be a number"),
	stock: number()
		.required("Stock is required field")
		.positive("Price must be a positive number")
		.integer("Price must be a number"),
	descriptions: array(
		object({
			head: string()
				.required("Head is required field")
				.min(2, "Head must be at least 2 characters")
				.max(50),
			body: string().required("Body is required field"),
		})
	),
	category_id: number()
		.positive("Category is required field")
		.required("Category is required field"),
	subcategory_id: number()
		.positive("Subcategory is required field")
		.required("Subcategory is required field"),
});
