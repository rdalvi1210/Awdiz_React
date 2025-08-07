import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Todos from "./components/Todos";
import Productpage from "./pages/01-08/Productpage";
import Useparams from "./pages/01-08/Useparams";
import Addfruits from "./pages/02-08/Addfruits";
import Fetchproducts from "./pages/06-08/Fetchproducts";
import Pagenotfound from "./pages/06-08/Pagenotfound";
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
        <Route path="/use-params" element={<Useparams />} />
        <Route path="/products/:id" element={<Productpage />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/add-fruits" element={<Addfruits />} />
        <Route path="/*" element={<Pagenotfound />} />
        <Route path="/fetchproducts" element={<Fetchproducts />} />
      </Routes>
    </div>
  );
}

export default App;
