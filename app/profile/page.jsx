"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/DefaultLayout";
import { useSession } from "next-auth/react";
import axios from "axios";
import Post from "@/components/Post";
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
    <DefaultLayout>
      <div>
        profile details
        <div>{user?.name}</div>
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
