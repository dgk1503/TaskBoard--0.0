import express from "express"
import { createNotes, deleteNotes, getAllNotes, updateNotes,getNotebyId } from "../controllers/notesControllers.js"
const router = express.Router()
const app = express()




//getting one
router.get('/',getAllNotes)
router.get('/:id',getNotebyId)
//creating one
router.post('/',createNotes)
//updating one
router.put('/:id',updateNotes)

//deleting one
router.delete('/:id',deleteNotes)



export default router