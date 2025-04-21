import mongoose from "mongoose";

const connectMongoDB = async (): Promise<mongoose.Connection> => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in environment variables.");
    }

    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB.");
      return mongoose.connection;
    }

    await mongoose.connect(uri);
    console.log("Connected to MongoDB.");
    return mongoose.connection;
  } catch (error) {
    console.log("Error connecting to MongoDB:", (error as Error).message);
    throw error;
  }
};

export default connectMongoDB;
