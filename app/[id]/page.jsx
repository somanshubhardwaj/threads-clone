"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { RxShare2 } from "react-icons/rx";
import DefaultLayout from "@/components/DefaultLayout";
import { useSession } from "next-auth/react";
const Page = ({ params }) => {
  const [post, setPost] = useState({});
  const [comment, setComment] = useState("");
  const { data: session } = useSession();
  const fetchData = async () => {
    const response = await axios.get(`/api/posts/${params.id}`);
    if (!response.data.success) {
      return;
    }
    setPost(response.data.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log("click");
    addComment();
  };
  const addComment = async () => {
    console.log("addddd");

    const response = await axios.put(`/api/posts/comment`, {
      id: params.id,
      content: comment,
    });
    console.log("addeddd");
    if (!response.data.success) {
      console.log(response);
      return;
    }
    toast.success("Comment sent");
    setPost(response.data.data);
 
    setComment("");
  };

  return (
    <DefaultLayout>
      <div>
        <div className="shadow-xl py-3 rounded-md flex flex-col  px-7 border-b border-[#7777779e]">
          <div className="flex flex-row gap-3">
            <div className="">
              <button className="rounded-full w-9 h-9 p-1 bg-red-700 text-white">
                {post?.name?.charAt(0).toUpperCase()}
              </button>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex flex-col">
                <span className="text-base font-medium">{post.name}</span>
                <span className="text-base font-light">{post.content}</span>
              </div>
              <div className="flex flex-row gap-7 mt-3 ">
                <div className="flex flex-row  items-center justify-center">
                  <IoIosHeartEmpty className="text-xl" />
                  <span className="text-md font-light">{post.likecount}</span>
                </div>
                <div className="flex flex-row  items-center justify-center gap-1">
                  <FaRegComment className="text-xl" />
                  <span className="text-base font-light">
                    {post.commentcount}
                  </span>
                </div>
                <div className="flex flex-row  items-center justify-center gap-1">
                  <RxShare2 className="text-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="comment p-6">
          <h1 className="font-bold text-xl mb-3">Comments</h1>

          <form className="flex flex-col sm:flex-row gap-3 items-center">
            <img src={session?.user?.image} className="w-9 h-9 rounded-full" />

            <input
              type="text"
              placeholder="write your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="shadow-xl p-3 rounded-md flex-1"
            />
            <button
              type="submit"
              onClick={handleCommentSubmit}
              className="border border-gray-500 text-white px-3 py-1 rounded-lg w-max text-base"
            >
              Post
            </button>

          </form>
          <div className="">
            {post.comments?.map((comment) => (
              <div className="flex flex-row gap-3 my-8">
                <div>
                  <button className="rounded-full w-9 h-9 p-1 bg-red-700 text-white">
                    {comment.name.charAt(0).toUpperCase()}
                  </button>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex flex-col">
                    <span className="text-base font-medium">{comment.name}</span>
                    <span className="text-base font-light">{comment.text}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Page;
