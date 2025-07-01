import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

export const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...', process.env.MONGODB_CONNECTION_STRING);
    const connection = await  mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1);
  }
}