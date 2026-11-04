import mongoose from "mongoose"

export const DbConnect = async () => {
    
    const mongo_url = process.env.MONGO_URL
    console.log("Database connected successfully.....")
    
    try {
        await mongoose.connect(mongo_url)
    } catch (error) {
        console.error("Database not connected error :", error.message)
    }
}