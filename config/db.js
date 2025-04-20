import mongoose from "mongoose";
let cached = global.mongoose || { conn: null, promise: null };
console.log(!null)
export default async function ConnectDb() {
  if(cached.conn) return cached.conn;
  if(!cached.promise){
    cached.promise = await  mongoose.connect(process.env.MONGODB_URI)
  }
  try {
    cached.conn = await cached.promise
  } catch (error) {
    console.error("Error Connecting To MongoDB",error);
  }
  return cached.conn
}
