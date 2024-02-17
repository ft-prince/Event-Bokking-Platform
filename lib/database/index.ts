import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || {
  connection: null,
  connectionPromise: null,
};

export const connectToDatabase = async () => {
  if (cached.connection) return cached.connection;

  if (!MONGODB_URI) throw new Error(" Your MONGODB_URI is missing or invalid ");

  cached.connectionPromise =
    cached.connectionPromise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "evently",
      bufferCommands: false,
    });

  cached.connection = await cached.connectionPromise;
  return cached.connection;
};

// cached: This variable stores the cached connection and connection promise.
// It is initialized with the global mongoose object if available, or with an 
// object containing connection and connectionPromise properties set to null.



// connectToDatabase: This function is an asynchronous function that establishes a 
// connection to the MongoDB database. It first checks if a connection already exists in the cache. 
//If not, it ensures that MONGODB_URI is defined and then initiates a connection using mongoose.connect() with the specified options.
// Once the connection is established, it updates the cached connection and returns it. 
//Subsequent calls to connectToDatabase will reuse the existing connection.