"use client";
import { useSession } from "next-auth/react";
import { Login } from "@/components/Login";
import HomePosts from "@/components/HomePosts";
export default function Home() {
  const { status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "authenticated") {
    return <HomePosts />;
  } else {
    return <Login />;
  }
}
