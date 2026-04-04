import {
  Lock,
  Mail,
  User,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { POSTMethod } from "../utils/server";
import { API } from "../utils/APIS";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // Step 1: Send OTP to email
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill all fields");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Send OTP to email using your backend API
      await POSTMethod(API.sendOTP, {
        email: formData.email,
      });

      setEmailForOtp(formData.email);
      setStep(2);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to send OTP. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and complete signup
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // First verify OTP
      await POSTMethod(API.verifyOTP, {
        email: emailForOtp,
        otp: otp,
        purpose: "registration",
      });

      // Then register the user
      const response = await POSTMethod(API.register, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        otp: otp,
      });

      // Store user data and token
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.token);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Verification failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError("");

    try {
      await POSTMethod("/auth/v1/send-otp", {
        email: emailForOtp,
      });
      alert("New OTP sent successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // For Google OAuth, you would typically redirect to backend Google OAuth endpoint
    window.location.href = "http://localhost:8080/api/auth/google";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <img src={logo} className="w-[40px] h-[40px]" alt="logo" />
            </div>
            <span className="font-bold text-xl text-gray-900">CareerStack</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-4">
            {step === 1 ? "Create an account" : "Verify your email"}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {step === 1
              ? "Enter your details to get started"
              : `We sent a code to ${emailForOtp}`}
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step >= 1 ? "bg-black text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            1
          </div>
          <div
            className={`w-12 h-0.5 ${step >= 2 ? "bg-black" : "bg-gray-200"}`}
          ></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step >= 2 ? "bg-black text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            2
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Step 1: Account Details */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition"
                  placeholder="johndoe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition"
                  placeholder="•••••••• (min 6 characters)"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? "Sending..." : "Continue"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        )}

        {/* Step 2: Verify OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter Verification Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength={6}
                  className="w-full pl-4 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition text-center text-xl tracking-wider"
                  placeholder="000000"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-2.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="flex-1 bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? "Verifying..." : "Verify & Sign Up"}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={loading}
                className="text-sm text-black hover:underline cursor-pointer disabled:opacity-50"
              >
                Resend OTP
              </button>
            </div>
          </form>
        )}

        {/* Google Login - Only show in step 1 */}
        {step === 1 && (
          <>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500">or</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="font-medium text-gray-700">
                Continue with Google
              </span>
            </button>
          </>
        )}

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
