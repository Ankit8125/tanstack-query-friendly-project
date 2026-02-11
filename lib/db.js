import mongoose from "mongoose"

// New way of connecting to DB
const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI){
  throw new Error("Undefined MongoDB variable")
}

let cached = global.mongoose

if(!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB(params) {
  if(cached.conn) {
    return cached.conn
  }

  if(!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (error) {
    cached.promise = null
    throw error
  }

  return cached.conn
}

export default connectDB