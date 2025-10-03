import { Route,Routes } from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import DetailsPage from './pages/DetailsPage'
import toast from 'react-hot-toast'

const App = () => {
  return (

    
    <div data-theme = "nord" className="relative h-full w-full ">
      <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-gray-500 opacity-20 blur-[100px]"></div>
      
      
      
    
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