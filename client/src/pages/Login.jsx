import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // 1. Initialize the navigate function
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://college-backend-x811.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      // Save token and user info
      localStorage.setItem("userInfo", JSON.stringify(data));

      // Optional: You can remove this alert if you want an instant seamless redirect
      alert("Login Successful!");

      // 2. Navigate directly to the Home page
      navigate("/");

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100"
      >
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-900">
          Welcome Back
        </h1>

        <div className="space-y-4 mb-6">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg">
          Login
        </button>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-bold hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;