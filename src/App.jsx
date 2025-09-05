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
import Parent from "./pages/10-08/Parent";
import UseMemo from "./pages/10-08/UseMemo";
import Usecallback from "./pages/13-08/Usecallback";
import UseReducer from "./pages/13-08/UseReducer";
import UseRef from "./pages/13-08/UseRef";
import Theme from "./pages/22-08/Assignment/Theme";
import UseContext from "./pages/22-08/UseContext";
import Useeffect from "./pages/30-7/Useeffect";
import UseState from "./pages/30-7/UseState";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CounterRedux from "./redux/CounterRedux";

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
        <Route path="/use-memo" element={<UseMemo />} />
        <Route path="/memo-method" element={<Parent />} />
        <Route path="/use-callback" element={<Usecallback />} />
        <Route path="/use-reducer" element={<UseReducer />} />
        <Route path="/use-ref" element={<UseRef />} />
        <Route path="/use-context" element={<UseContext />} />
        <Route path="/theme" element={<Theme />} />
        <Route path="/redux-counter" element={<CounterRedux />} />
      </Routes>
    </div>
  );
}

export default App;
