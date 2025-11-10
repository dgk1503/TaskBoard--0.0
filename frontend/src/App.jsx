import { Route, Routes } from "react-router";
import DotGrid from "./components/Background";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import DetailsPage from "./pages/DetailsPage";

import toast from "react-hot-toast";
import Register from "./components/RegistrationForm";

const App = () => {
  return (
    <div className="relative h-full w-full overflow-hidden ">
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <DotGrid
          dotSize={10}
          gap={15}
          baseColor="#e2e2e2"
          activeColor="#a6b4bb"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />
        <div className="">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/note/:id" element={<DetailsPage />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
