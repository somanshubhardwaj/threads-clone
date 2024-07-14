import React from "react";
import axios from "axios";
import toast from "react-hot-toast";import { IoIosHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";import { RxShare2 } from "react-icons/rx";
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
        <div className="flex flex-row gap-3">
          <div className="">
            <button className="rounded-full w-9 h-9 p-1 bg-red-700 text-white">
              {post.name.charAt(0).toUpperCase()}
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
    </a>
  );
};

export default Post;

// <div className="flex gap-3">
//           <button className="rounded-full w-11 h-11 p-1 bg-red-700 text-white">
//             {post.name.charAt(0).toUpperCase()}
//           </button>

//           <span className="">{post.name}</span>
//         </div>

//         <div>
//           <span className="">{post.content}</span>
//         </div>
//         <div>
//           likecount: {post.likecount}
//           <br />
//           commentcount: {post.commentcount}
//         </div>
//         <div>
//           <button
//             onClick={handleLike}
//             type="submit"
//             className="bg-blue-500 text-white px-3 py-2 rounded-lg w-max "
//           >
//             Like
//           </button>
//         </div>
