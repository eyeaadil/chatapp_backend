import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const dbURI = "mongodb+srv://madil9227583:R8d6BjEpgN6t6o5w@cluster0.1jlm2.mongodb.net/chat-app"; // Ensure to replace 'myDatabaseName' with your actual database name
    
    const connection = await mongoose.connect(dbURI); // Removed deprecated options

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // process.exit(1);
  }
};

export default connectDB;
