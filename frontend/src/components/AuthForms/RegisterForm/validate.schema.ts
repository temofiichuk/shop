import { object, string } from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const userRegisterSchema = object({
  email: string()
    .required()
    .min(3, "Too Short!")
    .email("Email format incorrect"),
  password: string().required().min(8, "Too Short!"),
  name: string().uppercase().required(),
  avatar: string().url().optional(),
  phone: string().matches(phoneRegExp, "Phone number is not valid"),
});
