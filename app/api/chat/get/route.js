import mongoose from "mongoose";
import ConnectDb from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export async function GET(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "user not authenticated",
      });
    }
    await ConnectDb();
    const data = await Chat.find({userId});
    return NextResponse.json({ success: true, data });
  } catch (error) {
    NextResponse.json({ success: false, error: error.message });
    console.log("Error in GET request");
  }
}
