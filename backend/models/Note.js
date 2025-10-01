import mongoose from "mongoose";

//schema
const noteSchema = mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    content:{
        type: String,
        required:true
    },
    
},{timestamps:true});


const note = mongoose.model("Note",noteSchema)

export default note;


