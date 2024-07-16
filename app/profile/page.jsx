"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/DefaultLayout";
import axios from "axios";
import Post from "@/components/Post";import { FaInstagram } from "react-icons/fa";
const page = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const getUSer = async () => {
    const res = await axios.get(`/api/user/loggedin`);
    setUser(res.data.data);
  };
  const getPosts = async () => {
    const res = await axios.get(`api/user/posts`);
    setPosts(res.data.data);
  };
  useEffect(() => {
    getUSer();
    getPosts();
  }, []);

  return (
    <DefaultLayout pagetitle="User Profile">
      <div>
        {/* <div>{user?.name}</div> */}
        <div className="m-4">
          <div className="flex ">
            <div className="flex-1 item-center flex flex-col">
              <div className="font-bold text-3xl">{user?.name}</div>{" "}
              <div>
                {user?.bio || (
                  <span className="text-gray-600">No bio added</span>
                )}
              </div>
            </div>
            <div className="">
              <img
                src={user?.image || "https://www.gravatar.com/avatar/000?d=mp"}
                alt="profile"
                className="w-20 h-20 rounded-full"
              />
            </div>
          </div>
          <div className="flex justify-between my-8 items-center">
            <div className="flex items-center">
            <img
                src={user?.image || "https://www.gravatar.com/avatar/000?d=mp"}
                alt="profile"
                className="w-5 h-5 rounded-full"
              /> <img
              src={user?.image || "https://www.gravatar.com/avatar/000?d=mp"}
              alt="profile"
              className="w-5 h-5 rounded-full -ml-1"
            />
            <span className="ml-2 text-gray-600">
              {user?.followers?.length} followers
            </span>

            </div>
            <div className="">
              <FaInstagram className="text-3xl " />
            </div>

           
          </div>
          <button className="flex justify-between items-center text-center border rounded-lg border-gray-600 w-full py-1 my-2">
          <span className="mx-auto">  Edit Profile</span>

          </button>
        </div>
        <div>
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default page;
