import { MongoClient } from 'mongodb';


const MONGO_DB_URI = "mongodb+srv://valerishnaider:2DNAKhTD9TUTS7C8@econest.z9gxo.mongodb.net/?retryWrites=true&w=majority" //This is hardcoded here only for the purpose of the assigment, in real life situation such things should alaways be in a secure .env type file
const client = new MongoClient(MONGO_DB_URI);

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use the global MongoClient variable to avoid repeated connections
  if (!(global as any)._mongoClientPromise) {
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production mode, it's safe to directly use client.connect()
  clientPromise = client.connect();
}

export default clientPromise;
