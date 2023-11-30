import { object, string } from "yup";

export const userSchema = object({
  email: string().required().min(3, "Too Short!"),
  password: string().required().min(8, "Too Short!"),
});
