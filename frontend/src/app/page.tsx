"use client";

import Link from "next/link";

const Home = () => {
  return (
    <main className="flex flex-col gap-2 justify-center items-center">
      <h1>Hello, Next.js 13 App Directory!</h1>
      <Link href="login">Login</Link>
    </main>
  );
};

export default Home;
