import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGODB_URI as string,
    );
    console.log(`Database connected : ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error connecing the database : ${error}`);
    process.exit(1);
  }
};

export default connectDB;
