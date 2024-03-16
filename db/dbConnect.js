import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();
const connectDB =  async()=>{


    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("connected to mongoDb");
    } catch (error) {
        console.log("Error connecting to MongoDb",error.message)
    } 
}

export default connectDB;