import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiLogOut } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import Logo from "../../assets/Svg/Screenshot_from_2024-12-02_13-16-17-removebg-preview.svg";
import { ChevronDown, ShoppingCart } from "lucide-react";

import { Toaster } from "sonner";

import { useAuth } from "../../hooks/AuthContext";
import { useCart } from "../../hooks/CartContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const { cartNavRefresh } = useCart();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdown1 = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const openSignUp = () => setIsSignUpOpen(true);
  const closeSignUp = () => setIsSignUpOpen(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {" "}
      <Toaster />{" "}
      <nav className="bg-white px-10  z-50 sticky top-0">
        <div className="container mx-auto flex items-center justify-between">
          <NavLink to="/">
            <div className="flex items-center">
              <img src={Logo} alt="Logo" className="h-[100px] w-[100px]" />
            </div>
          </NavLink>
          <div className="hidden md:flex flex-grow text-center justify-center">
            <ul className="flex justify-center space-x-10">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-gray-900 underline font-bold"
                      : "text-gray-700 hover:text-gray-900"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  className={({ isActive }) =>
                    isActive
                      ? "text-gray-900 underline font-bold"
                      : "text-gray-700 hover:text-gray-900"
                  }
                >
                  Our Shop
                </NavLink>
              </li>{" "}
              <li className="relative" ref={dropdownRef}>
                {/* Adoption Link with Arrow */}
                <div
                  onClick={toggleDropdown1}
                  className="cursor-pointer text-gray-700 hover:text-gray-900 flex items-center gap-1"
                >
                  Adoption
                  <ChevronDown
                    className={`transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Dropdown Menu */}
                {isOpen && (
                  <ul className="absolute -left-12 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <li>
                      <NavLink
                        to="/adoption/cats"
                        className={({ isActive }) =>
                          `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                            isActive ? "font-bold underline" : ""
                          }`
                        }
                        onClick={() => setIsOpen(false)}
                      >
                        Cats
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/adoption/kittens"
                        className={({ isActive }) =>
                          `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                            isActive ? "font-bold underline" : ""
                          }`
                        }
                        onClick={() => setIsOpen(false)}
                      >
                        Kittens
                      </NavLink>
                    </li>{" "}
                    <li>
                      <NavLink
                        to="/adoption/dogs"
                        className={({ isActive }) =>
                          `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                            isActive ? "font-bold underline" : ""
                          }`
                        }
                        onClick={() => setIsOpen(false)}
                      >
                        Dogs
                      </NavLink>
                    </li>{" "}
                    <li>
                      <NavLink
                        to="/adoption/puppies"
                        className={({ isActive }) =>
                          `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                            isActive ? "font-bold underline" : ""
                          }`
                        }
                        onClick={() => setIsOpen(false)}
                      >
                        Puppies
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <NavLink
                  to="/treatment"
                  className={({ isActive }) =>
                    isActive
                      ? "text-gray-900 underline font-bold"
                      : "text-gray-700 hover:text-gray-900"
                  }
                >
                  Treatment
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "text-gray-900 underline font-bold"
                      : "text-gray-700 hover:text-gray-900"
                  }
                >
                  Our Vision
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? "text-gray-900 underline font-bold"
                      : "text-gray-700 hover:text-gray-900"
                  }
                >
                  Get In Touch
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    isActive
                      ? "relative flex items-center text-gray-900 underline font-bold"
                      : "relative flex items-center text-gray-700 hover:text-gray-900"
                  }
                >
                  <span className="flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full absolute top-0 left-5">
                    {cartNavRefresh}
                  </span>
                  <ShoppingCart size={20} />
                </NavLink>
              </li>
            </ul>
          </div>

          {isLoggedIn ? (
            <>
              <div className="flex items-center relative" ref={menuRef}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsg0F0hqjo2pVSEgusU_JvJ4WOxd-U1QWMnw&usqp=CAU"
                  alt="User avatar"
                  className="mr-4 rounded-full w-10 h-10"
                />
                <FaChevronDown
                  className={`cursor-pointer transform transition-transform duration-150 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  onClick={toggleDropdown}
                  aria-label="Toggle dropdown"
                />
              </div>
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50"
                >
                  <div
                    onClick={logout}
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    <FiLogOut className="mr-2" />
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center md:justify-end space-x-4">
                <button
                  onClick={openLogin}
                  className="bg-[#300a3a] hover:opacity-80 text-white font-bold h-8 px-4 rounded-3xl"
                >
                  Log In
                </button>
                <li className="relative list-none lg:hidden md:hidden">
                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      `flex items-center ${
                        isActive
                          ? "text-gray-900 underline font-bold"
                          : "text-gray-700 hover:text-gray-900"
                      }`
                    }
                  >
                    <span className="absolute -top-1 -right-5 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                      {cartNavRefresh}
                    </span>
                    <ShoppingCart size={20} />
                  </NavLink>
                </li>
              </div>
              <Login
                isOpen={isLoginOpen}
                onClose={closeLogin}
                onSignUpOpen={openSignUp}
              />
              <Signup
                isOpen={isSignUpOpen}
                onClose={closeSignUp}
                onLoginOpen={openLogin}
              />
            </>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-gray-900"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-70 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleMobileMenu}
              />
              <motion.div
                className="fixed inset-y-0 right-0 w-72 bg-gradient-to-b from-white to-gray-100 shadow-lg z-50 flex flex-col overflow-y-auto max-h-screen"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.4 }}
              >
                <div className="p-6 flex justify-between items-center border-b border-gray-300">
                  <img src={Logo} alt="Logo" className="h-12 w-12" />
                  <button
                    onClick={toggleMobileMenu}
                    className="text-gray-800 hover:text-gray-900"
                  >
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <ul className="flex flex-col mt-4">
                  <li className="px-6 py-3">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive
                          ? "block text-gray-800 font-semibold border-l-4 border-[#060640] pl-4"
                          : "block text-gray-700 hover:text-gray-900  pl-4"
                      }
                      onClick={toggleMobileMenu}
                    >
                      Home
                    </NavLink>
                  </li>{" "}
                  <li className="px-6 py-3">
                    <NavLink
                      to="/shop"
                      className={({ isActive }) =>
                        isActive
                          ? "block text-gray-800 font-semibold border-l-4 border-[#060640] pl-4"
                          : "block text-gray-700 hover:text-gray-900  pl-4"
                      }
                      onClick={toggleMobileMenu}
                    >
                      Our Shop
                    </NavLink>
                  </li>{" "}
                  <li className="px-6 py-3" ref={dropdownRef}>
                    {/* Adoption Link with Arrow */}
                    <div
                      className="cursor-pointer flex items-center gap-1"
                      onClick={toggleDropdown1}
                    >
                      <NavLink
                        to="/adoption"
                        className={({ isActive }) =>
                          isActive
                            ? "block text-gray-800 font-semibold border-l-4 border-[#060640] pl-4"
                            : "block text-gray-700 hover:text-gray-900 pl-4"
                        }
                        onClick={toggleMobileMenu}
                      >
                        Adoption
                      </NavLink>
                      <ChevronDown
                        className={`transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    {/* Dropdown Menu */}
                    {isOpen && (
                      <ul className="pl-8 mt-2 space-y-2">
                        <li>
                          <NavLink
                            to="/adoption/cats"
                            className={({ isActive }) =>
                              `block text-gray-700 hover:text-gray-900 ${
                                isActive
                                  ? "font-semibold border-l-4 border-[#060640] pl-4"
                                  : "pl-4"
                              }`
                            }
                            onClick={() => {
                              toggleMobileMenu();
                              setIsOpen(false);
                            }}
                          >
                            Cats
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/adoption/dogs"
                            className={({ isActive }) =>
                              `block text-gray-700 hover:text-gray-900 ${
                                isActive
                                  ? "font-semibold border-l-4 border-[#060640] pl-4"
                                  : "pl-4"
                              }`
                            }
                            onClick={() => {
                              toggleMobileMenu();
                              setIsOpen(false);
                            }}
                          >
                            Dogs
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/adoption/kittens"
                            className={({ isActive }) =>
                              `block text-gray-700 hover:text-gray-900 ${
                                isActive
                                  ? "font-semibold border-l-4 border-[#060640] pl-4"
                                  : "pl-4"
                              }`
                            }
                            onClick={() => {
                              toggleMobileMenu();
                              setIsOpen(false);
                            }}
                          >
                            Kittens
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/adoption/puppies"
                            className={({ isActive }) =>
                              `block text-gray-700 hover:text-gray-900 ${
                                isActive
                                  ? "font-semibold border-l-4 border-[#060640] pl-4"
                                  : "pl-4"
                              }`
                            }
                            onClick={() => {
                              toggleMobileMenu();
                              setIsOpen(false);
                            }}
                          >
                            Puppies
                          </NavLink>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li className="px-6 py-3">
                    <NavLink
                      to="/treatment"
                      className={({ isActive }) =>
                        isActive
                          ? "block text-gray-800 font-semibold border-l-4 border-[#060640] pl-4"
                          : "block text-gray-700 hover:text-gray-900  pl-4"
                      }
                      onClick={toggleMobileMenu}
                    >
                      Treatment
                    </NavLink>
                  </li>
                  <li className="px-6 py-3">
                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        isActive
                          ? "block text-gray-800 font-semibold border-l-4 border-[#060640] pl-4"
                          : "block text-gray-700 hover:text-gray-900  pl-4"
                      }
                      onClick={toggleMobileMenu}
                    >
                      Our Vision
                    </NavLink>
                  </li>{" "}
                  <li className="px-6 py-3">
                    <NavLink
                      to="/contact"
                      className={({ isActive }) =>
                        isActive
                          ? "block text-gray-800 font-semibold border-l-4 border-[#060640] pl-4"
                          : "block text-gray-700 hover:text-gray-900  pl-4"
                      }
                      onClick={toggleMobileMenu}
                    >
                      Get In Touch
                    </NavLink>
                  </li>{" "}
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
