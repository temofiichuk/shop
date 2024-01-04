"use client";
import { FC } from "react";
import { EnumUserRole } from "@/types/auth.types";
import withAuth from "@/utils/withAuth";

const Page: FC = () => {
  return <>Profile</>;
};

export default withAuth(EnumUserRole.USER, Page);
