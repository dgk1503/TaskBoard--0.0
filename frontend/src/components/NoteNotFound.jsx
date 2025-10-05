import React from "react";
import { SearchX } from "lucide-react";
import { Link } from "react-router";
const NoteNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-sm p-8 backdrop-blur-2xl">
        <SearchX className="size-10 text-primary backdrop-blur-3xl"></SearchX>
      </div>
      <h3 className="text-2xl font-bold">No Notes Found.</h3>
      <p className="text-base-content/70">Lets Organise your day !</p>
      <Link to="/create" className="btn btn-outline">
        Create your Note
      </Link>
    </div>
  );
};

export default NoteNotFound;
