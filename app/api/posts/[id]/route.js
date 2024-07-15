import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import Post from "@/models/posts";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
export async function GET(req, { params }) {
  await connectMongoDB();
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" });
    }

    const post = await Post.findById(params.id).select("-__v -updatedAt -createdAt -email");
    if (!post) {
      return NextResponse.json({ success: false, error: "Post not found" });
    }
    
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
