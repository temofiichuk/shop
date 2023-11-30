"use client";
import style from "./LoginForm.module.scss";
import { ErrorMessage, Field, Formik } from "formik";
import { userSchema } from "@/components/LoginForm/validate.schema";
import { useLazyQuery } from "@apollo/client";
import { USER_LOGIN } from "@/lib/graphql/queries";
import { EnumUserRole } from "@/types/auth.types";
const LoginForm = () => {
  const [loginFetch, { loading, error, data }] = useLazyQuery(USER_LOGIN);
  if (error) console.log(error.message);
  if (data) console.log(data);

  return (
    <>
      {loading && <div>Loading...</div>}
      <Formik
        initialValues={{ email: "", password: "", role: EnumUserRole.USER }}
        onSubmit={async (values, { setSubmitting }) => {
          await loginFetch({ variables: { loginUserInput: values } });
          setSubmitting(false);
        }}
        validationSchema={userSchema}>
        {({ isSubmitting, handleSubmit, errors, touched }) => (
          <form className={style.login} onSubmit={handleSubmit}>
            <h1>Login Form</h1>
            <Field type="hidden" name="role" value="role" />
            <label htmlFor="user.email">
              <Field id="user.email" name="email" />
              <ErrorMessage className={style.error} name="email" />
            </label>
            <label htmlFor="user.password">
              <Field id="user.password" type="password" name="password" />
              <ErrorMessage className={style.error} name="password" />
            </label>
            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
