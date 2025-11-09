import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
// import ProductList from "./pages/23-08/Assignment/redux/Productlist";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "./axios/AxiosInstance";
import AddProduct from "./pages/AddProduct";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ViewProducts from "./pages/ViewProducts";
import { setUser } from "./redux/userSlice";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const getUser = async () => {
    const res = await api.get("/auth/getcurrentuser");
    if (res.data.success) {
      dispatch(setUser(res.data.user));
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [dispatch]);
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <Navbar />
      <h1>Hello, {user?.name}</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/viewproducts" element={<ViewProducts />} />
        {/* <Route path="/prac" element={<Prac />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/use-state" element={<UseState />} />
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
        <Route path="/redux-counter" element={<CounterRedux />} /> */}
        {/* <Route path="/redux-addtocart" element={<ProductList />} /> */}
        {/* <Route path="/calculator" element={<Calculator />} /> */}
      </Routes>
    </div>
  );
}

export default App;
