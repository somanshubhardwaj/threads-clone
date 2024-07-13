import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import Post from "@/models/posts";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(req, res) {
  // update like count and add user to like array
  await connectMongoDB();
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(
        JSON.stringify({ success: false, error: "Unauthorized" }),
        { status: 401 }
      );
    }
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, error: "Unauthorized" }),
        { status: 401 }
      );
    }

    

    const { id } = await req.json();
    console.log(id);
    const post = await Post.findById(id);
    if (!post) {
    return new Response(
      JSON.stringify({ success: false, error: "Post not found" }),
      { status: 404 }
    );
    }
    if(post.likes.includes(user._id)){
      return new Response(
        JSON.stringify({ success: false, error: "Already liked" }),
        { status: 400 }
      );
    }
    post.likes.push(user._id);
    post.likecount = post.likes.length;
    console.log(post);
    await post.save();
    return new Response(JSON.stringify({ success: true, data: post }));
    return new Response(JSON.stringify({ success: true, data: "liked" }));
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error }));
  }
}
