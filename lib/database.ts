import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

export async function Database() {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("✅ Already connected to MongoDB");
            return;
        }
        await mongoose.connect(MONGODB_URI, { dbName: "seminar" });
        console.log("✅ MongoDB connected successfully");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
        throw new Error("Database connection failed");
    }
}
