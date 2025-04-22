export const maxDuration = 60;
import ConnectDb from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  try {
    const { userId } = await getAuth(req);
    const { chatId, prompt } = await req.json();
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "user not authenticated",
      });
    }
    await ConnectDb();
    const data = await Chat.findOne({ _id: chatId, userId });
    const UserPrompt = {
      role: "user",
      content: prompt,
      timestamp: Date.now(),
    };
    await data.messages.push(UserPrompt);
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const message = completion.choices[0].message;
    message.timestamp = Date.now();
    await data.messages.push(message);
    await data.save();
    console.log("hey",message);
    return NextResponse.json({ success: true, data:message });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }}
