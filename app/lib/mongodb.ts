///// Database connection /////

import { MongoClient } from "mongodb";

// Ensure the MongoDB URI is provided
const uri = process.env.MONGODB_URI;

if (!uri) throw new Error("Please add your MongoDB URI to .env");

// Define the MongoDB client promise globally in development mode
const client = new MongoClient(uri);
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to persist connection
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new connection
  clientPromise = client.connect();
}

export default clientPromise;

/// import MongoClient from "mongodb".
// then, get the uri that is MONGODB_URI stroed in .env.
/// then, create client using MongoClient and uri to connect and create clientPromise
