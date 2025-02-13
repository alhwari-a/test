import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import GoogleIcon from "../assets/Svg/GoogleIcon.jsx";
import FacebookIcon from "../assets/Svg/FacebookIcon.jsx";
import { useAuth } from "../hooks/AuthContext.jsx";

const Login = ({ isOpen, onClose, onSignUpOpen }) => {
  const { login } = useAuth();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("authToken", token);
      navigate("/");
    }
  }, [location]);

  const handleGoogleSignIn = () => {
    window.open("http://localhost:4000/api/auth/google", "_self");
  };

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:4000/api/auth/login",
          { email, password }
        );
        localStorage.setItem("authToken", response.data.token);
        login(response.data.token);
        Swal.fire({
          title: "Success!",
          text: "You have successfully logged in.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          onClose();
          navigate("/");
        });
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-40"
        onClick={onClose}
      ></div>
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-[25rem] z-50">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <div className="mb-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-[#300a3a] text-white font-bold py-2 px-4 rounded-lg hover:opacity-80 flex items-center justify-center mb-2"
          >
            <GoogleIcon />
            Log in with Google
          </button>
          <a
            href="http://localhost:4000/api/auth/facebook"
            className="w-full bg-[#300a3a] text-white font-bold py-2 px-4 rounded-lg hover:opacity-80 flex items-center justify-center"
          >
            <FacebookIcon />
            Log in with Facebook
          </a>
        </div>
        <div className="relative flex items-center justify-center mb-4">
          <span className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300"></span>
          </span>
          <span className="relative bg-white px-4 text-gray-500">or</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-2 top-9 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          {errors.apiError && (
            <p className="text-red-500 text-xs mt-1">{errors.apiError}</p>
          )}
          <button
            type="submit"
            className="w-full bg-[#300a3a] text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-80"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <div className="flex justify-between items-center mt-4">
          <Link
            to="/forget-password"
            className="text-sm text-gray-500 hover:underline"
            onClick={() => {
              onClose();
            }}
          >
            Forgot password?
          </Link>
          <Link
            to="#"
            className="text-sm text-gray-500 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              onSignUpOpen();
            }}
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
