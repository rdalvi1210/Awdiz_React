import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const router = useNavigate();
  return (
    <>
      <button onClick={() => router("/")}>Home</button>
      <button onClick={() => router("/login")}>Login</button>
      <button onClick={() => router("/register")}>Register</button>
      <button onClick={() => router("/use-state")}>UseState</button>
      <button onClick={() => router("/use-effect")}>UseEffect</button>
      <button onClick={() => router("/use-params")}>UseParams</button>
    </>
  );
};

export default Navbar;
