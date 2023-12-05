import { FC } from "react";
import LoginForm from "@/components/AuthForms/LoginForm/LoginForm";
import { EnumUserRole } from "@/types/auth.types";
import RegisterForm from "@/components/AuthForms/RegisterForm/RegisterForm";

const Page: FC = () => {
  return (
    <>
      <LoginForm role={EnumUserRole.USER} />
      <RegisterForm />
    </>
  );
};

export default Page;
