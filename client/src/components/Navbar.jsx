import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // CHECK TOKEN DIRECTLY
  const loggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");

    // refresh navbar
    window.location.reload();
  };

  return (
    <nav className="bg-black border-b border-gray-800 px-6 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="text-3xl font-bold text-white"
        >
          Eventora
        </Link>

        {/* NAV BUTTONS */}
        <div className="flex items-center gap-5">

          {/* ALWAYS SHOW */}
          <Link
            to="/"
            className="text-gray-300 hover:text-white"
          >
            Events
          </Link>

          {!loggedIn ? (
            <>
              {/* BEFORE LOGIN */}

              <Link
                to="/login"
                className="text-gray-300 hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-white text-black px-5 py-2 rounded-xl font-semibold"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              {/* AFTER LOGIN */}

              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-white"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-5 py-2 rounded-xl"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;