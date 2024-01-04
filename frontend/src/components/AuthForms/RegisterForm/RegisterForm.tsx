"use client";
import style from ".././forms.module.scss";
import { ErrorMessage, Field, Formik } from "formik";
import { userRegisterSchema } from "./validate.schema";
import { useMutation } from "@apollo/client";
import { USER_REGISTER } from "@/lib/graphql/queries";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import {
  changeType,
  EnumTypeOfForm,
} from "@/store/features/type-of-auth-form.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type FieldsType = {
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
  avatar?: string;
};

type RegisterForm = {
  className?: string;
};

const RegisterForm = ({ className }: RegisterForm) => {
  const [registerUserFetch, { error }] = useMutation(USER_REGISTER);
  const { refresh } = useRouter();
  const typeOfForm = useAppSelector((state) => state.typeOfForm.value);

  const dispatch = useAppDispatch();

  const validError = error?.graphQLErrors[0]?.extensions
    .validation_errors as FieldsType;

  const FieldInput = ({ field }: { field: keyof FieldsType }) => {
    const label = field.charAt(0).toUpperCase() + field.slice(1);
    return (
      <div>
        <label htmlFor={`register.user.${field}`}>{label}</label>
        <div className="mt-2">
          <Field id={`register.user.${field}`} name={field} />
          <p className={style.error}>
            {validError ? validError[field] : <ErrorMessage name={field} />}
          </p>
        </div>
      </div>
    );
  };

  const anima =
    typeOfForm === EnumTypeOfForm.REGISTER
      ? "animate-changeAndShow "
      : "animate-changeAndHide ";

  const classElem = `${style.form} ${className ?? ""} ${
    typeOfForm ? anima : "hidden"
  } `;

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        phone: "",
        avatar: "",
        name: "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const { data } = await registerUserFetch({
          variables: { createUserInput: values },
        });
        if (data.userCreate) {
          refresh();
        }
        setSubmitting(false);
      }}
      validationSchema={userRegisterSchema}>
      {({ isSubmitting, handleSubmit }) => (
        <div className={classElem}>
          <div className="title">
            <RiAccountPinCircleLine className="mx-auto h-20 w-auto" />
            <h2>Create an account</h2>
          </div>
          <div className="box">
            <form onSubmit={handleSubmit}>
              <FieldInput field="name" />
              <FieldInput field="email" />
              <FieldInput field="phone" />
              <FieldInput field="password" />
              <FieldInput field="avatar" />
              <div>
                <button type="submit" disabled={isSubmitting}>
                  Register
                </button>
                <p className="error">{error?.message}</p>
              </div>
              <div>
                <p className="text-center">Do you already have an account?</p>
                <button
                  type="button"
                  onClick={() => dispatch(changeType(EnumTypeOfForm.LOGIN))}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default RegisterForm;
