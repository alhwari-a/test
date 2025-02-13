import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { Toaster } from "sonner";

// Layout Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import VerifyEmailOTPPage from "./pages/VerifyEmailOTPPage";
import ForgotPassword from "./pages/ForgotPassword";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import Checkout from "./pages/CheckOut";
import Adoption from "./pages/Adoption";
import Treatment from "./pages/Treatment";
import AddAdoption from "./pages/AddAdoption";

import { CartProvider } from "./hooks/CartContext";
import SetNewPassword from "./pages/SetNewPassword";

import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const location = useLocation();
  const hideNavbarFooter =
    location.pathname === "/Login" || location.pathname === "/signup";

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster />
      <CartProvider>
        {!hideNavbarFooter && <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/Verify-email" element={<VerifyEmailPage />} />
            <Route path="/forget-password" element={<ForgotPassword />} />
            <Route path="/set-new-password" element={<SetNewPassword />} />
            <Route path="/verify-otp/:email" element={<VerifyEmailOTPPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/add-adoption" element={<AddAdoption />} />
            <Route path="/treatment" element={<Treatment />} />
            <Route path="/adoption/:animal" element={<Adoption />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
            <Route path="/Login" element={<Login setUser={setUser} />} />
          </Routes>
        </main>
        {!hideNavbarFooter && <Footer />}
        <ScrollToTop />
      </CartProvider>
    </div>
  );
};

export default App;
