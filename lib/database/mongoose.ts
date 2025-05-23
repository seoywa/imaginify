import mongoose, { Mongoose } from 'mongoose'

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null
}

//bc nextjs runs in a serverless environment, aka its functions are stateless - they start up to handle request and shut down right after w/o intending to maintain a continuous connection to the db => ensures each request is handle independently, allowing for better scalability as there is no need to manage persistent connections across many instances => we need to cache our connections

let cached : MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null, promise: null
  }
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error('Missing Mongodb_url')

  cached.promise = cached.promise || mongoose.connect(
    MONGODB_URL,
    { dbName: 'imaginify', bufferCommands: false }
  )

  cached.conn = await cached.promise;

  return cached.conn;
}