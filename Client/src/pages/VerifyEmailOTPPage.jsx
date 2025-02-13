import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../hooks/AuthContext";

const VerifyEmailOTPPage = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleOtpChange = (element, index) => {
    const value = element.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus on the next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleVerifyClick = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      Swal.fire({
        icon: "error",
        title: "OTP Required",
        text: "Please enter the complete 6-digit OTP sent to your email.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/verify-otp",
        {
          email,
          otp: enteredOtp,
        }
      );

      const token = response.data.token;
      login(token);

      Swal.fire({
        icon: "success",
        title: "OTP Verified",
        text: "Your email has been verified successfully!",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error(
        "Error verifying OTP:",
        error.response ? error.response.data : error
      );

      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/resend-otp",
        {
          email,
        }
      );

      Swal.fire({
        icon: "success",
        title: "OTP Resent",
        text: response.data.message || "OTP has been resent to your email!",
      });
      setTimer(60);
      setIsResendDisabled(true);
    } catch (error) {
      console.error(
        "Error resending OTP:",
        error.response ? error.response.data : error
      );

      Swal.fire({
        icon: "error",
        title: "Resend Failed",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  useEffect(() => {
    if (isResendDisabled) {
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            setIsResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [isResendDisabled]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">
          Verify Your Email
        </h1>
        <p className="text-gray-600 mb-6">
          Enter the OTP sent to <span className="font-semibold">{email}</span>{" "}
          to complete the verification.
        </p>
        <div className="mb-6 flex justify-between">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleOtpChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-[#060640] focus:border-[#060640]"
              maxLength={1}
            />
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleVerifyClick}
            className="bg-[#300a3a] text-white font-semibold py-2 px-4 rounded shadow hover:opacity-85 transition-opacity duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Verify"}
          </button>
          <button
            onClick={handleResendOtp}
            className={`ml-4 bg-[#300a3a] text-white font-semibold py-2 px-4 rounded shadow hover:opacity-85 transition-opacity duration-200 ${
              isResendDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isResendDisabled}
          >
            {isResendDisabled ? `Resend OTP (${timer}s)` : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailOTPPage;
