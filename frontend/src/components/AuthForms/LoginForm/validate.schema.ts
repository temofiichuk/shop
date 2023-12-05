import { object, string } from "yup";

export const userSchema = object({
  email: string()
    .required()
    .min(3, "Too Short!")
    .email("Email format incorrect"),
  password: string().required().min(8, "Too Short!"),
});
