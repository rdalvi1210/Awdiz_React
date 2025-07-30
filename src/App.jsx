import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Useeffect from "./pages/30-7/Useeffect";
import UseState from "./pages/30-7/UseState";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/use-state" element={<UseState />} />
        <Route path="/use-effect" element={<Useeffect />} />
      </Routes>
    </div>
  );
}

export default App;
