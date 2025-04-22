import mongoose from "mongoose";
import ConnectDb from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    const { chatId } = await req.json();
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "user not authenticated",
      });
    }
    await ConnectDb();
    await Chat.findOneAndDelete({ _id: chatId, userId });
    return NextResponse.json({ success: true, message: "Chat Deleted" });
  } catch (error) {
    NextResponse.json({ success: false, error: error.message });
  }
}
