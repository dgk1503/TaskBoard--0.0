import { Route,Routes } from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import DetailsPage from './pages/DetailsPage'
import toast from 'react-hot-toast'

const App = () => {
  return (
    <div data-theme = "nord" className="bg-white/30 backdrop-blur-md rounded-xl  shadow-lg">
      <div class="relative h-full w-full bg-white">
        <div class="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      <Routes>
       <Route path="/" element={<HomePage/>}/>
       <Route path="/create" element={<CreatePage/>}/>
       <Route path="/note/:id" element={<DetailsPage/>}/>

       
       
     </Routes>
     </div>

    </div>
  )
}

export default App