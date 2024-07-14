"use client";
import React, {  } from "react";
import { useSession } from "next-auth/react";
import { Login } from "@/components/Login";
import HomePosts from "@/components/HomePosts";
export default function Home() {
  const { status, data: session } = useSession();
 
 


  if (status === "authenticated") {
    return (
      <HomePosts/>
    );
  } else {
    return <Login />;
  }
}
