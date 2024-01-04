"use client";
import { FC, useLayoutEffect } from "react";
import LoginForm from "@/components/AuthForms/LoginForm/LoginForm";
import { EnumUserRole } from "@/types/auth.types";
import { useAppSelector } from "@/store/hooks";
import { redirect } from "next/navigation";

const Page: FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  useLayoutEffect(() => {
    if (user?.role === EnumUserRole.ADMIN) {
      redirect("/admin/dashboard");
    }
  }, [user]);

  return <LoginForm role={EnumUserRole.ADMIN} />;
};

export default Page;
