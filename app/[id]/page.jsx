"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const Page = ({ params }) => {
  const [post, setPost] = useState({});
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
  const handleCommentSubmit =(e)=>{
    e.preventDefault();
    console.log("click")
    addComment()
   
  }
  const addComment = async () => {
    console.log("addddd")
    
    const response = await axios.put(`/api/posts/comment`, 
        {
            id: params.id,
            content: "comment content"
        }
    );
    console.log("addeddd")
    if (!response.data.success) {
      console.log(response);
      return
    }
toast.success("Comment sent")
    setPost(response.data.data);
    console.log("set")
  }

  return (
    <div>
      {params.id}
      <div>
        <h1>{post.content}</h1>
        <p>{post.name}</p>
        <p>{post.email}</p>
        <p>{post.likecount}</p>
        <p>{post.commentcount}</p>
      </div>
      <div className="comment">
        <form>
        <input type="text" />
        <button onClick={handleCommentSubmit} type="submit">Comment</button></form>
      </div>
    </div>
  );
};

export default Page;
