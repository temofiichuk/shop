import { FC } from "react";
import LoginForm from "@/components/AuthForms/LoginForm/LoginForm";
import { EnumUserRole } from "@/types/auth.types";

const Page: FC = () => {
  return <LoginForm role={EnumUserRole.ADMIN} />;
};

export default Page;
