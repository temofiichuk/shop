import { ReactNode } from "react";
import Sidebar from "@/components/admin/Sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full flex">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
