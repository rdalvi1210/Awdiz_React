import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Prac from "./components/Prac";
import Todos from "./components/Todos";
import Productpage from "./pages/01-08/Productpage";
import Useparams from "./pages/01-08/Useparams";
import Addfruits from "./pages/02-08/Addfruits";
import Fetchproducts from "./pages/06-08/Fetchproducts";
import Pagenotfound from "./pages/06-08/Pagenotfound";
import Mycart from "./pages/08-08/Mycart";
import ProductInfo from "./pages/08-08/ProductInfo";
import Products from "./pages/08-08/Products";
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
        <Route path="/prac" element={<Prac />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/use-state" element={<UseState />} />
        <Route path="/use-effect" element={<Useeffect />} />
        <Route path="/use-params" element={<Useparams />} />
        <Route path="/products/:id" element={<Productpage />} />
        <Route path="/fetchproducts" element={<Fetchproducts />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/add-fruits" element={<Addfruits />} />
        <Route path="/*" element={<Pagenotfound />} />
        <Route path="/products-page" element={<Products />} />
        <Route path="/productsInfo/:productId" element={<ProductInfo />} />
        <Route path="/mycart" element={<Mycart />} />
      </Routes>
    </div>
  );
}

export default App;
