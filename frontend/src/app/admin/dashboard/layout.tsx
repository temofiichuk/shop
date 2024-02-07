import { ReactNode } from "react";
import AdminHeader from "@/components/AdminHeader/AdminHeader";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <AdminHeader />
      <div>{children}</div>
    </>
  );
};

export default Layout;
