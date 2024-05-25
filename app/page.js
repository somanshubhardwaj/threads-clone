"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import axios from "axios";
export default function Home() {
  const { status, data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  useEffect(() => {
    fetchPosts();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({
      content: content,
      name: session?.user?.name,
      email: session?.user?.email,
    });
    setContent("");
  };

  const fetchPosts = async () => {
    const response = await axios.get("/api/posts");

    setPosts(response.data.data);
  };
  const addTodo = async (post) => {
    const response = await axios.post("/api/posts", post);
    setPosts([...posts, response.data.data]);
  };
  //update and delete to be added later

  if (status === "authenticated") {
    return (
      <>
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

        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">Add Post</h1>
          <div>
            <form className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="shadow-xl p-3 rounded-md"
              />
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-3 rounded-lg"
              >
                Add Post
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">Posts</h1>
          {posts.map((post) => (
            <div
              key={post._id}
              className="shadow-xl p-8 rounded-md flex flex-col gap-3 bg-yellow-200"
            >
              <div>
                Name: <span className="font-bold">{post.name}</span>
              </div>
              <div>
                Email: <span className="font-bold">{post.email}</span>
              </div>
              <div>
                Content: <span className="font-bold">{post.content}</span>
              </div>
            </div>
          ))}
        </div>
      </>
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
