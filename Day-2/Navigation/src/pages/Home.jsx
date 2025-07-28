import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center bg-white text-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Home</h1>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/register")}
          className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-md transition"
        >
          Register
        </button>
        <button
          onClick={() => navigate("/login")}
          className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-md transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
