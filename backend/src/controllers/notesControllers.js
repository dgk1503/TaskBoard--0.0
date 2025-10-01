import note from "../../models/Note.js"
//get all
export  const getAllNotes= async (_,res) => {
    try{
        const notes = await note.find().sort({createdAt : -1}) // to sort the newly created ones at the start
        res.status(200).json(notes)

    }
    catch(err){
        console.error(err)
        res.status(500).json({message : "Internal Server Error"})

    }
}
export const getNotebyId = async (req,res) =>  {
    try{
        const notes = await note.findById(req.params.id)
        if(!notes){
            return res.status(404).json({message : "Note not found"})
        }
        res.status(200).json(notes)

    }
    catch(err){
        console.error(err)
        res.status(500).json({message : "Internal Server Error."})
    }
    
}
//create notes

export const createNotes =  async (req,res)=>  {
    try{
        const {title,content} = req.body
        const newNote = new note({title,content})

        const saved_note = await newNote.save()
        res.status(201).json(saved_note)

    }
    catch(err){

    }
}
//upd notes
export const updateNotes = async (req,res) => {

    
    try{
 
            const {title,content} = req.body
            const updatedNote = await note.findByIdAndUpdate(req.params.id,{title,content},{new:true})
            if(updatedNote == null){
                return res.status(404).json({message : "Note not found"})
                
            }
            res.status(200).json(updatedNote)
      }
    catch(err){
            res.status(500).json({message:"Internal server error"},err)

        }

        
    
}
//delete notes
export const deleteNotes = async (req,res) => {
    try{
        const deletedNote = await note.findByIdAndDelete(req.params.id)
        if(!deletedNote){
            return res.status(404).json({message : "Note not Found"})
        }
        res.status(200).json({message : "Deleted Sucessfully"});


    }
    catch(err){
        console.error("Internal Server Error",err);
        res.status(500).json({message : "Internal sever error"})
    }

}