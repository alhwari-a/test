import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  ShoppingCart,
  CreditCard,
  CheckCircle,
  Shield,
  Lock,
  Clock,
  Gift,
  Star,
  ArrowRight,
  Box,
} from "lucide-react";
import { useCart } from "../hooks/CartContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import axios from "axios";

const CheckOut = () => {
  const { cartItems, clearCart, calculateTotalPrice } = useCart();
  const navigate = useNavigate();
  const [orderID, setOrderID] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);

  useEffect(() => {
    // Add parallax effect on scroll
    const handleScroll = () => {
      const elements = document.querySelectorAll(".parallax");
      elements.forEach((elem) => {
        const speed = elem.getAttribute("data-speed");
        const yPos = -(window.pageYOffset * speed);
        elem.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOrderCreation = async (details) => {
    try {
      setIsProcessing(true);
      const productIds = cartItems.map((product) => product.id);
      const authToken = localStorage.getItem("authToken");

      await axios.post(
        "http://localhost:4000/api/orders",
        { product_ids: productIds },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      showSuccessAlert();
      clearCart();
      setCheckoutStep(3); // Move to the final step after a successful order
      navigate("/");
    } catch (error) {
      showErrorAlert();
    } finally {
      setIsProcessing(false);
    }
  };

  const showSuccessAlert = () => {
    Swal.fire({
      icon: "success", // 'success' automatically includes a checkmark
      title: "Payment Successful!",
      text: "Thank you for your purchase.",
      showCloseButton: true, // Optional: add close button
      customClass: {
        popup: "rounded-3xl shadow-2xl", // Optional: custom classes
        title: "text-3xl font-bold text-gray-900",
        content: "text-lg text-gray-600",
      },
    });
  };

  const showErrorAlert = () => {
    const alertContainer = document.createElement("div");
    alertContainer.innerHTML = `
      <div class="fixed inset-0 flex items-center justify-center z-50">
        <div class="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
        <div class="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mx-4 max-w-md w-full transform animate-error-modal">
          <div class="text-center">
            <div class="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 animate-error-circle">
              <svg class="h-10 w-10 text-red-600 animate-error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 class="mt-6 text-3xl font-bold text-gray-900">Payment Failed</h2>
            <p class="mt-3 text-lg text-gray-600">Please try again or contact support.</p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(alertContainer);
    setTimeout(() => document.body.removeChild(alertContainer), 3000);
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: calculateTotalPrice().toFixed(2),
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      setOrderID(details.id);
      handleOrderCreation(details);
    });
  };

  const onError = (err) => {
    showErrorAlert();
    console.error(err);
  };

  const SecurityBadge = ({ icon: Icon, title, description }) => (
    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 transform hover:scale-105">
      <div className="flex-shrink-0">
        <div className="p-3 rounded-xl bg-violet-100 text-violet-600">
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-sky-50 relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-1/2 left-1/4 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 parallax" data-speed="0.1">
            <div className="inline-block p-4 rounded-full bg-white/30 backdrop-blur-sm mb-4">
              <ShoppingCart className="w-8 h-8 text-violet-600" />
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Complete Your Purchase
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              You're just a few steps away from completing your order
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 relative">
            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-xl p-8 transform hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <Box className="w-7 h-7 text-violet-600" />
                    Order Summary
                  </h3>
                  <div className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
                    ${calculateTotalPrice().toFixed(2)}
                  </div>
                </div>

                {/* Order progress steps */}
                <div className="space-y-4 mb-8">
                  {[1].map((step) => (
                    <div
                      key={step}
                      className={`flex items-center gap-4 p-4 rounded-2xl ${
                        checkoutStep >= step
                          ? "bg-violet-50 border-2 border-violet-200"
                          : "bg-gray-50"
                      } transition-all duration-300`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          checkoutStep >= step
                            ? "bg-violet-600 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {step}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {["Review Order"][step - 1]}
                        </h4>
                      </div>
                      {checkoutStep > step && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Badges */}
              <div className="grid grid-cols-2 gap-4">
                <SecurityBadge
                  icon={Shield}
                  title="Secure Payment"
                  description="Your payment data is protected"
                />
                <SecurityBadge
                  icon={Lock}
                  title="Privacy Protected"
                  description="Your information is encrypted"
                />
                <SecurityBadge
                  icon={Clock}
                  title="24/7 Support"
                  description="Help whenever you need it"
                />
                <SecurityBadge
                  icon={Star}
                  title="Satisfaction Guarantee"
                  description="30-day money-back guarantee"
                />
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-xl p-8 transform hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3 mb-8">
                <CreditCard className="w-7 h-7 text-violet-600" />
                Payment Method
              </h3>

              <div
                className={`transition-all duration-300 ${
                  isProcessing ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <PayPalScriptProvider
                  options={{
                    "client-id":
                      "AQO_lrXGFsV-gcb9dl11jWIu-BW84qeQbOxa31FnSsbeJj_fpHAMK3sb-c2aJjJSnjuaN4CDAxvT3tL1",
                    currency: "USD",
                  }}
                >
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                    className="paypal-buttons"
                  />
                </PayPalScriptProvider>
              </div>

              <div className="mt-8 p-4 rounded-2xl bg-violet-50 border border-violet-100">
                <div className="flex items-start gap-3">
                  <Gift className="w-5 h-5 text-violet-600 flex-shrink-0 mt-1" />
                  <p className="text-sm text-violet-700">
                    Special offer: Free shipping on orders over $50! Complete
                    your payment now to claim this offer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }

        @keyframes success-modal {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes success-circle {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes success-check {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-success-modal {
          animation: success-modal 0.3s ease-out forwards;
        }

        .animate-success-circle {
          animation: success-circle 0.5s ease-out forwards;
        }

        .animate-success-check {
          animation: success-check 0.5s ease-out forwards 0.2s;
        }
      `}</style>
    </div>
  );
};

export default CheckOut;
