import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import Post from "@/models/posts";


export async function GET(request,{params}) {
    await connectMongoDB();
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, error: "Unauthorized" });
        }
        const id  = params.id;

        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({ success: false, error: "User not found" });
        }
        const posts = await Post.find({email: user.email});
        return NextResponse.json({ success: true, data: posts });

        
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
        
    }
}
