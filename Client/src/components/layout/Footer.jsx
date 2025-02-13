import React from "react";
import { NavLink } from "react-router-dom";
import { Facebook } from "lucide-react";

const getCurrentYear = () => {
  return new Date().getFullYear();
};

const Footer = () => {
  return (
    <section className="bg-white">
      <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <p className="mt-8 text-base leading-6 text-center text-gray-900">
          © {getCurrentYear()} Purrrfect Match, All rights reserved.
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="https://www.facebook.com/share/12EtE6vvLSf/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Facebook page"
          >
            <Facebook className="w-6 h-6 text-gray-900 hover:text-blue-600" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Footer;
