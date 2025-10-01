import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_URL)

        console.log("Connected to Database")


    }
    catch(err){
        console.error(err)
        process.exit(1)
    }
}