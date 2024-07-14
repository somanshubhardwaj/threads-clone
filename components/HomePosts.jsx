"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Post from "@/components/Post";
import toast from "react-hot-toast";
import DefaultLayout from "./DefaultLayout";
function Posts() {
  const { status, data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  
  useEffect(() => {
    fetchPosts();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    addPost({
      content: content,
      name: session?.user?.name,
      email: session?.user?.email,
    });
    setContent("");
    toast.success("Post added successfully");
  };

  const fetchPosts = async () => {
    const response = await axios.get("/api/posts");
    if (!response.data.success) {
      toast.error(response.data.error);
      return;
    }

    setPosts(response.data.data);
  };
  const addPost = async (post) => {
    const response = await axios.post("/api/posts", post);
    setPosts([...posts, response.data.data]);
  };
  //update and delete to be added later

  return (
    <div className="">
      <div className="flex justify-center ">
        <div className="w-full">
          <div className="sm:flex flex-col gap-3 p-5 hidden">
            <div>
              <form className="flex flex-col sm:flex-row gap-3 items-center">
                <img src={session?.user?.image} className="w-9 h-9 rounded-full" />
           
                <input
                  type="text"
                  placeholder="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="shadow-xl p-3 rounded-md flex-1"
                />
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="border border-gray-500 text-white px-3 py-1 rounded-lg w-max text-base"
                >
                   Post
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full ">
            {posts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const HomePosts = () => {
  return (
    <DefaultLayout pagetitle="Home">
      <Posts />
    </DefaultLayout>
  );
};
export default HomePosts;
