import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import Post from "@/models/posts";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
export async function GET() {
  await connectMongoDB();
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
  const posts = await Post.find();
  return NextResponse.json({ success: true, data: posts });
}
export async function POST(req) {
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

    const body = await req.json();
    if (!body.content) {
      return NextResponse.json({
        success: false,
        error: "Content is required",
      });
    }
    if(session.user.email !== body.email){
      return NextResponse.json({
        success: false,
        error: "Unauthorized"
      })
    }
    const post = await Post.create(body);
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
