import { Link } from "react-router";
import { FilePlus } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-transparent backdrop-blur-sm border-b border-base-content/10 ">
      <div className="mx-auto max-w-6xl p-4 backdrop-blur-3xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl  font-mono font-bold text-primary tracking-tight ">
            TaskBoard
          </h1>
          <div className="flex items-center gap-4 ">
            <Link to={"/create"} className="btn btn-outline ">
              <FilePlus className="w-5 h-5" />
              <span>New Task</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
