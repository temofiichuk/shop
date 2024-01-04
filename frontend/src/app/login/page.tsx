"use client";
import { FC, useLayoutEffect } from "react";
import LoginForm from "@/components/AuthForms/LoginForm/LoginForm";
import { EnumUserRole } from "@/types/auth.types";
import RegisterForm from "@/components/AuthForms/RegisterForm/RegisterForm";
import { useAppSelector } from "@/store/hooks";
import { redirect } from "next/navigation";

const Page: FC = () => {
  const currentUser = useAppSelector((state) => state.auth.user);

  useLayoutEffect(() => {
    if (currentUser?.role === EnumUserRole.USER) {
      redirect("/profile");
    }
  }, []);

  return (
    <>
      <LoginForm role={EnumUserRole.USER} />
      <RegisterForm />
    </>
  );
};

export default Page;
