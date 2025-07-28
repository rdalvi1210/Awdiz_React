import { useNavigate } from "react-router-dom";

const Register = () => {
  const router = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center bg-white text-center space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Register</h1>
      {/* Replace this with your actual registration form later */}
      <div className="space-x-4">
        <button
          onClick={() => router("/")}
          className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-md transition"
        >
          Home
        </button>
        <button
          onClick={() => router("/login")}
          className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-md transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Register;
