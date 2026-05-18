import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();

  const { register, verifyOtp } = React.useContext(AuthContext);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [otp, setOtp] = React.useState("");

  const [showOtp, setShowOtp] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");

  // REGISTER USER
  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      await register(name, email, password);

      setMessage(
        "OTP sent to your mail. Please verify your account."
      );

      setShowOtp(true);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async () => {

  try {

    const { data } = await api.post(
      "/bookings/verify-otp",
      {
        eventId: id,
        otp,
      }
    );

    console.log(data);

    // Save booking in localStorage
    const existingBookings =
      JSON.parse(localStorage.getItem("myBookings")) || [];

    const newBooking = {
      eventId: event._id,
      title: event.title,
      date: event.date,
      location: event.location,
      ticketPrice: event.ticketPrice,
      imageUrl: event.imageUrl,
      status: "Awaiting Admin Confirmation",
    };

    localStorage.setItem(
      "myBookings",
      JSON.stringify([
        ...existingBookings,
        newBooking,
      ])
    );

    setBookingRequested(true);

  } catch (error) {

    console.log(error);

    alert("Invalid OTP");

  }

};

  return (
    <div className="min-h-screen bg-black flex justify-center items-center px-4 text-white">
      <div className="bg-[#111] w-full max-w-[420px] p-8 rounded-3xl border border-gray-800 shadow-2xl">
        
        {/* HEADING */}
        <h1 className="text-4xl font-bold text-center mb-2">
          {showOtp ? "Verification Code" : "Create Account"}
        </h1>

        <p className="text-center text-gray-400 mb-8">
          {showOtp
            ? "Enter the OTP sent to your email"
            : "Join Eventora today"}
        </p>

        {/* ERROR */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="bg-green-500/10 border border-green-500 text-green-400 p-3 rounded-xl mb-4 text-sm">
            {message}
          </div>
        )}

        {/* REGISTER FORM */}
        {!showOtp ? (
          <form onSubmit={handleRegister}>
            {/* NAME */}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-xl bg-black border border-gray-700 mb-4 outline-none focus:border-[#ff3c00]"
              required
            />

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-xl bg-black border border-gray-700 mb-4 outline-none focus:border-[#ff3c00]"
              required
            />

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-xl bg-black border border-gray-700 mb-6 outline-none focus:border-[#ff3c00]"
              required
            />

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                loading
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-[#ff3c00] hover:bg-[#ff5722]"
              }`}
            >
              {loading ? "Processing..." : "Sign Up"}
            </button>
          </form>
        ) : (
          /* OTP FORM */
          <form onSubmit={handleVerifyOtp}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-4 rounded-xl bg-black border border-gray-700 mb-6 outline-none focus:border-[#ff3c00]"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                loading
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-[#ff3c00] hover:bg-[#ff5722]"
              }`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {/* LOGIN LINK */}
        <p className="text-center mt-6 text-gray-400">
          Already have an account?
          <Link
            to="/login"
            className="text-[#ff3c00] font-bold ml-2 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;