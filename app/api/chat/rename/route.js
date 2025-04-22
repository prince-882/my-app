import mongoose from "mongoose";
import ConnectDb from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export async function POST(req){ 
 try {
   const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "user not authenticated",
      });
    }
  await ConnectDb()
  const {chatId,name}= await req.json()
  await Chat.findOneAndUpdate({_id:chatId,userId},{name})
  return NextResponse.json({success:true,message:"Chat Renamed"})
 } catch (error) {
    NextResponse.json({ success: false, error: error.message });
 } 
}
