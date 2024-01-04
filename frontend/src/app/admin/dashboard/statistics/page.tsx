"use client";
import { FC } from "react";
import withAuth from "@/utils/withAuth";
import { EnumUserRole } from "@/types/auth.types";

const Statistics: FC = () => {
  return <div>Statistics</div>;
};

export default withAuth(EnumUserRole.ADMIN, Statistics);
