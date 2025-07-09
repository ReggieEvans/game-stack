import mongoose from 'mongoose'

type MongooseCache = {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

const globalWithMongoose = global as typeof global & { mongoose?: MongooseCache }

const cached: MongooseCache = globalWithMongoose.mongoose || { conn: null, promise: null }

export async function connectToDB() {
  if (cached.conn) {
    console.log('Using existing MongoDB connection')
    return cached.conn
  }

  if (!cached.promise) {
    mongoose.set('strictQuery', true)
    console.log('Connecting to MongoDB...')
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI!, {
        dbName: 'shame_stack',
      })
      .then(m => m)
  }

  cached.conn = await cached.promise
  globalWithMongoose.mongoose = cached

  return cached.conn
}
