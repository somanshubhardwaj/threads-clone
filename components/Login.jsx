import React from 'react'
import { signIn } from 'next-auth/react'
export const Login = () => {
  return (
    <div className='flex justify-center items-center min-h-screen flex-col'>
         <h1 className="md:text-6xl font-bold">
          Threads Clone App
        </h1>
        <p className="text-lg">
            This is a clone of the threads app
            made with Next.js and MongoDB

            
        </p>
        <button
          onClick={() => signIn("google")}
          className="flex items-center gap-4 shadow-xl rounded-lg pl-3"
        >
          <span className="bg-blue-500 text-white px-4 py-3">
            Sign in with Google
          </span>
        </button>
    </div>
  )
}
