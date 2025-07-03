import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

// Obviously would be in .env file in production
const MONGODB_CONNECTION_STRING="mongodb+srv://admin:p%40ssw0rd@megpt-cluster.ldjp43p.mongodb.net/ProperViewDB?retryWrites=true&w=majority&appName=ProperViewDB"

export const connectDB = async () => {
  try {
    const connection = await  mongoose.connect(MONGODB_CONNECTION_STRING);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1);
  }
}