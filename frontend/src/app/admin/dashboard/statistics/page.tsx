"use client";
import { FC, useEffect } from "react";
import withAuth from "@/utils/withAuth";
import { EnumUserRole } from "@/types/auth.types";
import { useAppDispatch } from "@/store/hooks";
import { setTitle } from "@/store/features/admin.page-title.slice";

const Statistics: FC = () => {
  const title = "Statistics";
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTitle({ value: title }));
  }, []);

  return <div>Statistic's Page Content</div>;
};

export default withAuth(EnumUserRole.ADMIN, Statistics);
