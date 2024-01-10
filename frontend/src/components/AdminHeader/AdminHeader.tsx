"use client";

import styles from "./AdminHeader.module.scss";
import { useAppSelector } from "@/store/hooks";
import { gql, useQuery } from "@apollo/client";
import { GET_CURRENT_ADMIN_AVATAR } from "@/lib/graphql/queries";
import { RiUser3Line } from "react-icons/ri";
import Spinner from "@/components/Spinner/Spinner";
import Image from "next/image";
import { toRegularCase } from "@/lib/functions";

type AdminAvatarDataType = {
  adminGetAvatar: { avatar: string };
};

const AdminHeader = () => {
  const title = useAppSelector((state) => state.adminPageTitle.value);
  const currentAdmin = useAppSelector((state) => state.auth.user);
  const { data, error, loading } = useQuery<AdminAvatarDataType>(
    GET_CURRENT_ADMIN_AVATAR
  );

  return (
    <header className={styles.header}>
      <h2>{title}</h2>

      <div className={styles.admin}>
        {loading && <Spinner />}
        {(error || !data?.adminGetAvatar?.avatar) && (
          <RiUser3Line className={styles.avatar} />
        )}
        {data?.adminGetAvatar?.avatar && (
          <Image
            src={data.adminGetAvatar.avatar}
            layout="responsive"
            alt="avatar"
            className={styles.avatar}
          />
        )}
        {currentAdmin && (
          <div>
            <p>{currentAdmin.name}</p>
            <p>
              <span>{toRegularCase(currentAdmin.role)}</span>
            </p>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
