import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import Post from "@/models/posts";
export async function GET(){
    await connectMongoDB();
    const posts = await Post.find();
    return NextResponse.json({success: true, data: posts});
}
export async function POST(req){
    await connectMongoDB();
    try{
        const body = await req.json();
        const post = await Post.create(body);
        return NextResponse.json({success: true, data: post});
    }catch(error){
        return NextResponse.json({success: false, error: error});
    }
}