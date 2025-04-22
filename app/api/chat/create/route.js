import mongoose from 'mongoose'
import ConnectDb from '@/config/db'
import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import Chat from '@/models/Chat'
export async function POST(req) {
  try {
    const {userId} = getAuth(req)
    if(!userId){
      return NextResponse.json({success:false,message:"User Not Authenticated"})
    }
    const Chatdata ={
      userId,
      messages:[],
      name:"New Chat"
    }
    await ConnectDb()
    Chat.create(Chatdata)
    return NextResponse.json({success:true,message:"Chat Created Successfully"})
  } catch (error) {
    return NextResponse.json({success:false,error:error.message})
  }
}
