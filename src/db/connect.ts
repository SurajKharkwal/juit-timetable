import { MongoClient } from "mongodb"

const uri = process.env.DATABASE_URL
if (!uri) {
  throw new Error("DATABASE_URL is not set")
}

const options = {}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  if (!globalThis._mongoClientPromise) {
    const client = new MongoClient(uri, options)
    globalThis._mongoClientPromise = client.connect()
  }
  clientPromise = globalThis._mongoClientPromise
} else {
  const client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
