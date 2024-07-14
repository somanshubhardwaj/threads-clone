import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
const Post = ({ post }) => {
  const handleLike = (e) => {
    e.preventDefault();
    addLike(post._id);
  };

  const addLike = async (id) => {
    console.log(id);
    const response = await axios.put(`/api/posts/like`, { id });
    if (!response.data.success) {
      toast.error(response.data.error);
      return;
    }
    if (response.error) {
      toast.error(response.error);
    }
    if (response.data.success) {
      toast.success("Liked ");
    }
  };

  return (
    <a href={`${post._id}`}>
      <div className="shadow-xl py-3 rounded-md flex flex-col  px-7 border-b border-[#7777779e]">
        <div className="flex gap-3">
          <button className="rounded-full w-11 h-11 p-1 bg-red-700 text-white">
            {post.name.charAt(0).toUpperCase()}
          </button>

          <span className="">{post.name}</span>
        </div>

        <div>
          <span className="">{post.content}</span>
        </div>
        <div>
          likecount: {post.likecount}
          <br />
          commentcount: {post.commentcount}
        </div>
        <div>
          <button
            onClick={handleLike}
            type="submit"
            className="bg-blue-500 text-white px-3 py-2 rounded-lg w-max "
          >
            Like
          </button>
        </div>
      </div>
      
    </a>
  );
};

export default Post;
