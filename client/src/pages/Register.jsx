import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, verifyOtp } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Register User
      if (!showOtp) {
        await register(name, email, password);

        setShowOtp(true);
        setSuccess('OTP sent to your email successfully.');
      }
      
      // Verify OTP
      else {
        await verifyOtp(email, otp);

        setSuccess('Registration successful!');
        navigate('/Dashboard');
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          'Something went wrong'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8"
    >
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        {showOtp ? 'Verify Your Account' : 'Create Account'}
      </h2>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="bg-green-100 text-green-600 p-3 rounded-lg mb-4 text-sm text-center">
          {success}
        </div>
      )}

      {/* REGISTER FORM */}
      {!showOtp ? (
        <>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </>
      ) : (
        <>
          {/* OTP Verification UI */}
          <div className="text-center mb-5">
            <p className="text-gray-600 text-sm">
              We have sent a verification code to
            </p>

            <p className="font-semibold text-blue-600 mt-1">
              {email}
            </p>
          </div>

          {/* OTP Input */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              Verification Code
            </label>

            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={6}
              className="w-full px-4 py-3 border rounded-lg text-center tracking-[8px] text-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg text-white font-semibold transition duration-300 ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : showOtp
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading
          ? 'Please wait...'
          : showOtp
          ? 'Verify Account'
          : 'Register'}
      </button>

      {/* Login Link */}
      {!showOtp && (
        <p className="text-center text-gray-600 mt-5 text-sm">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      )}

      {/* Resend OTP */}
      {showOtp && (
        <p className="text-center text-gray-600 mt-5 text-sm">
          Didn’t receive the OTP?{' '}
          <span
            className="text-green-600 cursor-pointer hover:underline"
            onClick={() => handleSubmit(new Event('submit'))}
          >
            Resend OTP
          </span>
        </p>
      )}
    </form>
  </div>
);
};

export default Register;