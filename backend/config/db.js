import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("Error in DB connection", error.message);
    }
}

export default connectDB;