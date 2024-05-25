"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
export default function Home() {
  const { status, data: session } = useSession();

  if (status === "authenticated") {
    return (
      <div className="shadow-xl p-8 rounded-md flex flex-col gap-3 bg-yellow-200">
        <div>
          Name: <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
        <button
          onClick={() => signOut()}
          className="flex items-center gap-4 shadow-xl rounded-lg pl-3"
        >
          <span className="bg-blue-500 text-white px-4 py-3">SignOut</span>
        </button>
      </div>
    );
  } else {
    return (
      <>
        <h1 className="text-3xl font-bold">
          Welcome to the Next.js with MongoDB and NextAuth.js
        </h1>
        <p className="text-lg">
          This is a simple example of using Next.js with MongoDB and NextAuth.js
        </p>
        <p className="text-lg">Please sign in to continue</p>
        <button
          onClick={() => signIn("google")}
          className="flex items-center gap-4 shadow-xl rounded-lg pl-3"
        >
          <span className="bg-blue-500 text-white px-4 py-3">
            Sign in with Google
          </span>
        </button>
      </>
    );
  }
}
