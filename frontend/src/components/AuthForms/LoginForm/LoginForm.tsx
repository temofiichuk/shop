"use client";
import style from ".././forms.module.scss";
import { ErrorMessage, Field, Formik } from "formik";
import { userSchema } from "./validate.schema";
import { useLazyQuery } from "@apollo/client";
import { USER_LOGIN } from "@/lib/graphql/queries";
import { EnumUserRole } from "@/types/auth.types";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  changeType,
  EnumTypeOfForm,
} from "@/store/features/type-of-auth-form.slice";
import AuthService from "@/services/auth/auth.service";

type FieldsType = {
  email?: string;
  password?: string;
};

type LoginForm = {
  role: EnumUserRole;
  className?: string;
};

const LoginForm = ({ role, className }: LoginForm) => {
  const [loginFetch, { error }] = useLazyQuery(USER_LOGIN);

  const validError = error?.graphQLErrors[0]?.extensions
    .validation_errors as FieldsType;
  const { push } = useRouter();

  const errorMessage = (field: keyof FieldsType) => {
    return validError ? validError[field] : <ErrorMessage name={field} />;
  };

  const typeOfForm = useAppSelector((state) => state.typeOfForm.value);
  const dispatch = useAppDispatch();

  const anima =
    typeOfForm === EnumTypeOfForm.LOGIN
      ? " animate-changeAndShow "
      : " animate-changeAndHide ";

  const classElem = `${style.form} ${className ?? ""} ${
    typeOfForm ? anima : " animate-fadeLeftIn"
  }`;

  const isAdmin = role === EnumUserRole.ADMIN;

  return (
    <Formik
      initialValues={{ email: "", password: "", role }}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        const { data } = await loginFetch({
          variables: { loginUserInput: values },
        });
        if (data?.authLogin) {
          AuthService.login(data.authLogin);
          push(isAdmin ? "/admin/dashboard" : "/profile");
        }
        setSubmitting(false);
      }}
      validationSchema={userSchema}>
      {({ isSubmitting, handleSubmit }) => (
        <div className={classElem}>
          <div className="title">
            <RiAccountPinCircleLine className="mx-auto h-20 w-auto" />
            <h2>
              Sign in to your {isAdmin ? "admin " : ""}
              account
            </h2>
          </div>
          <div className="box">
            <form onSubmit={handleSubmit}>
              <Field type="hidden" name="role" />
              <div>
                <label htmlFor="user.email">Email</label>
                <div className="mt-2">
                  <Field id="user.email" name="email" />
                  <p className={style.error}>{errorMessage("email")}</p>
                </div>
              </div>
              <div>
                <label htmlFor="user.password">Password</label>
                <div className="mt-2">
                  <Field type="password" id="user.password" name="password" />
                  <p className={style.error}>{errorMessage("password")}</p>
                </div>
              </div>
              <div>
                <button type="submit" disabled={isSubmitting}>
                  Sign in
                </button>
                <p className={style.error + " mt-2"}>{error?.message}</p>
              </div>
              {isAdmin && (
                <div>
                  <p className="text-center">Don't have an account yet?</p>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(changeType(EnumTypeOfForm.REGISTER))
                    }>
                    Registration
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default LoginForm;
