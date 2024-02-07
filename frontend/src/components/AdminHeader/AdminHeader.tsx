"use client";
import styles from "./AdminHeader.module.scss";

import { useEffect } from "react";
import { Navbar, IconButton, Collapse } from "@material-tailwind/react";
import { Bars2Icon } from "@heroicons/react/24/solid";
import AdminProfileMenu from "@/components/AdminProfileMenu/AdminProfileMenu";
import AdminNavList from "@/components/AdminNavList/AdminNavList";
import useOpen from "@/lib/hooks/useOpen";

function AdminHeader() {
  const [isNavOpen, setIsNavOpen] = useOpen("navbar");

  useEffect(() => {
    const closeNavBar = () => window.innerWidth >= 960 && setIsNavOpen(false);
    window.addEventListener("resize", closeNavBar);
    return () => window.removeEventListener("resize", closeNavBar);
  }, [setIsNavOpen]);

  return (
    <Navbar className={styles.header}>
      <div className={styles.nav}>
        <div className={styles.navDesktop}>
          <AdminNavList />
        </div>
        <IconButton
          variant="text"
          onClick={() => setIsNavOpen(!isNavOpen)}
          className={styles.button}>
          <Bars2Icon className={styles.icon} />
        </IconButton>

        <AdminProfileMenu />
      </div>
      <Collapse open={isNavOpen} className={styles.collapse}>
        <AdminNavList />
      </Collapse>
    </Navbar>
  );
}

export default AdminHeader;
