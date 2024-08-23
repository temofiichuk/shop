"use client";

import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import AuthService from "@/services/auth/auth.service";

const Home = () => {
  const user = useAppSelector((state) => state.auth.user);
  const handleClick = () => {
    console.log(user);
  };

  return (
    <main className="flex flex-col gap-2 justify-center items-center">
      <h1>Hello, Next.js 13 App Directory!</h1>
      <Link href="login">Login</Link>
      <Link href="admin">Login Admin </Link>
      <Link href="admin/dashboard">Admin Dashboard</Link>
      <button onClick={handleClick}> User </button>
      <button onClick={AuthService.logout}> Log Out </button>
    </main>
  );
};

export default Home;
