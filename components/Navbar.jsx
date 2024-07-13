"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
const Navbar = () => {
  const { status, data: session } = useSession();

  return (
    <div>
      <nav className="flex justify-between items-center py-4 px-6">
        {status === "authenticated" && (
          <>
            <span className="">Threads Clone</span>
            <div className="flex">
              <div className="   mx-3">
                <img
                  src={session.user.image}
                  alt={session.user.name}
                  className="rounded-full w-10 h-10"
                />
              </div>
              <button
                className="bg-black text-white rounded-md p-2"
                onClick={signOut}
              >
                Sign out
              </button>
            </div>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
