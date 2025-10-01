import  { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router';
import api from '../lib/axios';
import { LoaderIcon,ArrowLeftIcon,Trash2Icon, AwardIcon, Trophy } from 'lucide-react';
import toast from 'react-hot-toast';

const DetailsPage = () => {
  const [note,setNote] = useState(null);
  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);

  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    const fetchNotes = async() => {
      try{
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)

      }
      catch(err){
        console.error("Failed to get notes details ",err)
        toast.error("Failed to fetch the note")

      }
      finally{
        setLoading(false)
      }

    }
    fetchNotes();
  },[id])

  const handleDelete = async () => {
    if(!window.confirm("Are you sure you want to delete this note ?")) return;
    try{
      await api.delete(`/notes/${id}`)
      toast.success("Note Deleted Successfully")
      navigate("/")

    }
    catch(err){
      console.error("Failed to delete notes ",err);
      toast.error("Failed to delete note");

    }

  }
  const handleSave = async ()=>{
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Add a title or content")
      return;
    }
    setSaving(true)
    try{
      await api.put(`/notes/${id}`,note)
      toast.success("Note updated Successfully");
      navigate("/") 

    }
    catch(err){
      console.error("Failed to save changes",err)
      toast.error("Failed to save changes")
    }
    finally{
    setSaving(false)
  }

  }
  

  if(loading){
    return(<div className = "min-h-screen bg-base-200 flex items-center justify-center">
      <LoaderIcon className="animate-spin size-10"></LoaderIcon>
      
    </div>);
    
  }
  
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="maxw-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="btn btn-ghost">
            <ArrowLeftIcon className="h-5 w-5">
              Back to Notes
            </ArrowLeftIcon>
          </Link>
          <button onClick={handleDelete} className="btn btn-error btn-outline">
            <Trash2Icon className="h-5 w-5"/>
            Delete Note

          </button>
        </div>
        </div>
        <div className="card bg-bsae-100">
          <div className="card-body">
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input type="text" placeHolder="Note Title" className="input input-bordered" value={note.title} onChange={(e)=> setNote({...note,title:e.target.value})}/>
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea placeHolder="Enter your note here.." className="textarea textarea-bordered h-32" value={note.content} onChange={(e) => setNote({...note,content:e.target.value})}></textarea>
            </div>

            <div className="card-actions justify-end">
              <button className="btn btn-outline" disabled = {saving} onClick={handleSave}>
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsPage