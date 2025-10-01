import { Pen, Trash2Icon } from "lucide-react"
import { Link, Navigate } from "react-router"
import { formatDate } from "../lib/util"
import api from "../lib/axios"
import toast from "react-hot-toast"



const NoteCard = ({note,Setnotes}) => {

  const handle_delete = async(e,id) => {
    e.preventDefault();

    if(!window.confirm("Are you sure you want to delete this note ?")) return;
    try{
      await api.delete(`/notes/${id}`)
      toast.success("Deleted Successfully !")
      Setnotes((prev) => prev.filter(note => note._id !== id)) // remove the delted note



    }
    catch(err){
      console.error("Failed to delete the note",err)

    }
    

  } 
  return (
    <Link to={`/note/${note._id}`} className ="card bg-slate-200  hover:shadow-2xl transition-all duration-700 border-b-4 border-solid border-[#2cc5fdaf]">
        <div className="card-body">
            <h3 className="card-title text-base-content">{note.title}</h3>
            <p className="text-base-content/70 line-clamp-3">{note.content}</p>
            <div className="card-actions justify-between items-center mt-4">
                <span className="text-sm text-base-content/60">
                    {formatDate(note.createdAt)}
                </span>
                <div className="flex items-center gap-1">
                    <button className="btn btn-ghost btn-xs ">
                      <Pen className="size-4   "/>
                    </button>
                    <button className="btn btn-ghost btn-xs text-error ml-5" onClick = {(e) => handle_delete(e,note._id)}>
                        <Trash2Icon className="size-4"/>
                    </button>

                </div>

            </div>
        </div>

    </Link>
  )
}

export default NoteCard