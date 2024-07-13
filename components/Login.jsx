import React from "react";
import { signIn } from "next-auth/react";
export const Login = () => {
  return (
    <div className="flex flex-col sm:flex-row min-h-[80vh] ">
      <div className="sm:w-1/2 sm:h-[80vh] w-full flex justify-center items-center ">
        <div className="">
          <h1 className="text-4xl font-bold text-center">Welcome to Threads</h1>
          <p className="text-center mt-4">
            This is a simple example of how to use NextAuth.js
          </p>
        </div>
      </div>
      <div className="sm:w-1/2 sm:h-[80vh] w-full flex justify-center items-center">
        <div className="glass p-5 min-w-[30vw] flex flex-col gap-5 justify-center items-center min-h-[30vh]">
          <h1 className="text-4xl font-bold text-center">Login</h1>
          <button
            onClick={() => signIn("google")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};
