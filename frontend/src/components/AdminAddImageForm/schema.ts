import { object, string } from "yup";

export default object().shape({
	name: string().required("Image name is required field"),
	url: string()
		.required("Url is required field")
		.matches(/\.(jpe?g|png|webp)$/i, "Invalid format"),
});
