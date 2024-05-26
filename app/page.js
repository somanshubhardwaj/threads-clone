"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import axios from "axios";
import { Login } from "@/components/Login";
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
      <div className="flex justify-center">
        <div className="md:w-1/2">
          <div className="flex flex-col gap-3">
            <div>
              <form className="flex flex-col gap-3 ">
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
                  className="bg-blue-500 text-white px-3 py-2 rounded-lg w-max "
                >
                  Add Post
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {posts.map((post) => (
              <div
                key={post._id}
                className="shadow-xl p-8 rounded-md flex flex-col  m-6"
              >
                <div className="flex gap-3">
                  <button className="rounded-full w-11 h-11 p-1 bg-red-700 text-white">
                    {post.name.charAt(0).toUpperCase()}
                  </button>

                  <span className="font-bold">{post.name}</span>
                </div>

                <div>
                  <span className="font-medium">{post.content}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <Login />;
  }
}
