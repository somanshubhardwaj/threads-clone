import { connectMongoDB } from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
export async function POST(request) {
  const { name, email } = await request.json();
  await connectMongoDB();
  await User.create({ name, email });
  return NextResponse.json({ message: "User Registered" }, { status: 201 });
}

export async function GET(request) {
  await connectMongoDB();
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" });
  }
  const users = await User.find().select("-__v  -email");
  return NextResponse.json({ success: true, data: users });
}


