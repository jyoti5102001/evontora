import React from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
  e.preventDefault();

  // SAVE TOKEN
  localStorage.setItem("token", "user");

  // REDIRECT
  window.location.href = "/dashboard";
};
  return (
    <div className="flex justify-center items-center h-[80vh]">

      <form
        onSubmit={handleSignup}
        className="bg-[#111] p-8 rounded-3xl w-[400px]"
      >
        <h1 className="text-4xl font-bold mb-6 text-center">
          Signup
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-4 rounded-xl bg-black border border-gray-700 mb-4"
        />

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
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;