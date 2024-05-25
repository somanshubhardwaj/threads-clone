import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import Post from "@/models/posts";
export async function GET(req, { params }) {
  await connectMongoDB();
  try {
    const post = await Post.findById(params.id);
    if (!post) {
      return NextResponse.json({ success: false, error: "Post not found" });
    }
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
export async function PUT(req, { params }) {
  await connectMongoDB();
  try {
    const body = await req.json();
    const post = await Post.findByIdAndUpdate(params.id, body, { new: true });
    if (!post) {
      return NextResponse.json({ success: false, error: "Post not found" });
    }
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
export async function DELETE(req, { params }) {
  await connectMongoDB();
  try {
    const post = await Post.findByIdAndDelete(params.id);
    if (!post) {
      return NextResponse.json({ success: false, error: "Post not found" });
    }
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
