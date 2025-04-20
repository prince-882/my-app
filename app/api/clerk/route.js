import mongoose from "mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";
import ConnectDb from "@/config/db";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
export async function POST(request) {
  const wh = new Webhook(process.env.SINGING_SECRET);
  const Headers = await headers();
  const svixHeaders = {
    "svix-id": Headers.get("svix-id"),
    "svix-timestamp": Headers.get("svix-timestamp"),
    "svix-signature": Headers.get("svix-signature"),
  };
  const body = await request.json();
  const Body = JSON.stringify(body);
  const { type, data } = wh.verify(Body, svixHeaders);
  const Newuser = {
    _id: data.id,
    name: data.first_name + " " + data.last_name,
    email: data.email_addresses[0].email_address,
    image: data.image_url,
  }
 await ConnectDb()
  switch (type) {
    case 'user.created':
       await User.create(Newuser)
      break;
    case 'user.updated':
       await User.findByIdAndUpdate(data.id, Newuser)
      break;
    case 'user.deleted':
      await User.findByIdAndDelete(data.id)
      break;
    default:
      break;
  }
  return NextResponse.json({ message: "User Created" }, { status: 200 });
}
