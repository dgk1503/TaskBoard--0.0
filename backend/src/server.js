import express from 'express'
import cors from "cors"
import dotenv from 'dotenv'
import path from "path"

import router from './routes/notes.js'
import { connectDB } from './config/db.js'
import rateLimiter from '../middleware/rateLimiter.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()
if(process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin:"http://localhost:5173",
    }))

}

//middleware to parse JSON : req.body etc

app.use(express.json());
app.use(rateLimiter);


//custom middleware 
// app.use((req,res,next) => {
//     console.log(`Req method is : ${req.method} & Request url is : ${req.url}`)
//     next();

// })


app.use('/api/notes',router)
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
})
}
connectDB().then(() => {

    app.listen(PORT,() => {
    console.log(`Server started on port ${PORT}` )
   })




})





