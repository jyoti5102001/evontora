import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const [showOtp, setShowOtp] = React.useState(false);
  const navigate = useNavigate();

  const { login, verifyOtp , user} = React.useContext(AuthContext);

  const handleLogin = (e) => {
  e.preventDefault();

  // SAVE TOKEN
  localStorage.setItem("token", "user");

  // REDIRECT
  window.location.href = "/dashboard";
};

  return (
    <div className="flex justify-center items-center h-[80vh]">

      <form
        onSubmit={handleLogin}
        className="bg-[#111] p-8 rounded-3xl w-[400px]"
      >
        <h1 className="text-4xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 rounded-xl bg-black border border-gray-700 mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 rounded-xl bg-black border border-gray-700 mb-6"
        />

        <button
          className="w-full bg-white text-black py-4 rounded-xl font-bold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;