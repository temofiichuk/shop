"use client";
import styles from "./AdminProfileMenu.module.scss";
import { createElement, useState } from "react";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_ADMIN_AVATAR } from "@/lib/graphql/queries";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/features/auth.slice";
import { useRouter } from "next/navigation";

const adminProfileHref = "/admin/profile";

const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    href: `${adminProfileHref}`,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
    href: `${adminProfileHref}?edit=true`,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
    href: `${adminProfileHref}/inbox`,
  },
];

const AdminProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data } = useQuery<{ adminGetAvatar: { avatar: string } }>(
    GET_CURRENT_ADMIN_AVATAR
  );
  const currentUser = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();
  const navigation = useRouter();

  const logOutHandler = () => {
    dispatch(logout());
    navigation.replace("/admin");
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className={styles.avatarButton}>
          {data?.adminGetAvatar.avatar ? (
            <Avatar
              variant="circular"
              size="sm"
              alt={currentUser?.name}
              className={styles.avatar}
              src={data?.adminGetAvatar?.avatar}
            />
          ) : (
            <UserCircleIcon className="w-8" />
          )}
          <ChevronDownIcon
            className={`${styles.arrowIcon} ${isMenuOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </MenuHandler>
      <MenuList>
        {profileMenuItems.map(({ label, icon, href }) => (
          <MenuItem
            key={label}
            onClick={() => navigation.push(href)}
            className={styles.menuItem}>
            {createElement(icon, {
              className: styles.icon,
              strokeWidth: 2,
            })}
            <span>{label}</span>
          </MenuItem>
        ))}
        <MenuItem
          className={`${styles.menuItem} ${styles.signOutItem}`}
          onClick={logOutHandler}>
          <PowerIcon
            strokeWidth={2}
            className={`${styles.icon} ${styles.signOutIcon}`}
          />
          <span>Sign Out</span>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AdminProfileMenu;
