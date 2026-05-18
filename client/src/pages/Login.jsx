import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const [showOtp, setShowOtp] = React.useState(false);

  const navigate = useNavigate();

  const { login, verifyOtp } = React.useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // STEP 1: LOGIN
      if (!showOtp) {
        const data = await login(email, password);

        // If backend says verified user
        if (data?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }

      // STEP 2: VERIFY OTP
      else {
        const data = await verifyOtp(email, otp);

        setSuccess("OTP verified successfully!");

        setTimeout(() => {
          if (data?.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/dashboard");
          }
        }, 1000);
      }
    } catch (err) {
      console.log(err);

      // If account not verified
      if (err?.needsVerification) {
        setShowOtp(true);

        setError(
          "Account not verified. A new OTP has been sent to your email."
        );
      } else {
        setError(err?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white px-4">
      <form
        onSubmit={handleLogin}
        className="bg-[#111] p-8 rounded-3xl w-full max-w-[400px] border border-gray-800 shadow-2xl"
      >
        <h1 className="text-4xl font-bold mb-2 text-center">
          {showOtp ? "Verify OTP" : "Login"}
        </h1>

        <p className="text-gray-400 text-center mb-6">
          {showOtp
            ? "Enter the OTP sent to your email"
            : "Welcome back to Eventora"}
        </p>

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
        {!showOtp && (
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl bg-black border border-gray-700 mb-4 outline-none focus:border-[#ff3c00]"
            required
          />
        )}

        {/* OTP INPUT */}
        {showOtp && (
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-4 rounded-xl bg-black border border-gray-700 mb-4 outline-none focus:border-[#ff3c00]"
            required
          />
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}

        {/* SUCCESS MESSAGE */}
        {success && (
          <div className="bg-green-500/10 border border-green-500 text-green-400 p-3 rounded-xl mb-4 text-sm">
            {success}
          </div>
        )}

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
          {loading
            ? "Please wait..."
            : showOtp
            ? "Verify OTP & Login"
            : "Sign In"}
        </button>
      </form>

      {/* REGISTER LINK */}
      <p className="text-center mt-6 text-gray-400">
        Don't have an account?
        <Link
          to="/register"
          className="text-[#ff3c00] font-bold ml-2 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;