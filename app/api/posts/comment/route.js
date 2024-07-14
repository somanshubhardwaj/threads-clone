                                                            import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import Post from "@/models/posts";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(req, res) {
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
    const { id,content } = await req.json();
    const post = await Post.findById(id);
    if (!post) {
      return new Response(
        JSON.stringify({ success: false, error: "Post not found" }),
        { status: 404 }
      );
    }
    const data = {
      text: content,
      name: user.name,
      email: user.email,
    };
    post.comments.push(data);
    post.commentcount = post.comments.length;
    await post.save();
    return new Response(JSON.stringify({ success: true, data: post}));
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error }));
  }
}
