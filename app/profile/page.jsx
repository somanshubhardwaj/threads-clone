"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/DefaultLayout";
import { useSession } from "next-auth/react";
import axios from "axios";
const page = () => {
  const { status, data: session } = useSession();
  const [user, setUser] = useState({});
  const getUSer = async () => {
    const res = await axios.get(`/api/user`);
    setUser(res.data.data[0]);
    console.log(res.data.data[0]);
  };
  useEffect(() => {
    getUSer();
  }, []);

  return (
    <DefaultLayout>
      <div>
       profile details

        <div>
          <h1>{user.name}</h1>
          <h1>{user.email}</h1>

          </div>
      </div>
    </DefaultLayout>
  );
};

export default page;
