"use client";
import { FC, useLayoutEffect } from "react";
import LoginForm from "@/components/AuthForms/LoginForm/LoginForm";
import { EnumUserRole } from "@/types/auth.types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { redirect } from "next/navigation";
import { setIsLoading } from "@/store/features/is-loading.slice";

const Page: FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    user?.role === EnumUserRole.ADMIN
      ? redirect("/admin/dashboard")
      : dispatch(setIsLoading(false));
  }, [user]);

  return <LoginForm role={EnumUserRole.ADMIN} />;
};

export default Page;
