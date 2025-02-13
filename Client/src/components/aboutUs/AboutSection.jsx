import React, { useEffect } from "react";
import Icon from "@mdi/react";
import AOS from "aos";
import "aos/dist/aos.css";
import { mdiDog, mdiCat, mdiPaw } from "@mdi/js";
import { Link } from "react-router-dom";

const AboutSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="py-16 px-6 lg:px-0">
      <div className="flex flex-col-reverse lg:flex-row-reverse lg:w-4/5 sm:w-full mx-auto space-y-10 lg:space-y-0 lg:space-x-10">
        {/* Left Section */}
        <div className="lg:w-1/2 md:w-full ml-5 mt-1" data-aos="fade-left">
          <h5 className="text-lg font-bold text-gray-600">ABOUT US</h5>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mt-4">
            Purrrfect Match - Animal Care Platform
          </h1>
          <p className="text-gray-600 mt-6 leading-relaxed">
            Welcome to Purrrfect match, where we believe every pet deserves a
            loving home, the best care, and a life filled with happiness. At{" "}
            <span style={{ color: "#31043d" }}>purrrfect match</span> , we’re
            more than just a platform — we’re a community of pet lovers
            dedicated to making a difference. Every purchase and adoption
            supports our mission to rescue, rehabilitate, and rehome pets in
            need. Thank you for joining us on this journey. Together, we can
            create a brighter future for our four-legged friends! Purrrfect
            match — Where Love Finds a Home.
          </p>
          <Link
            to={"/adoption/cats"}
            className="inline-block px-6 py-3 border-2 border-[#31043d] text-white font-medium text-sm uppercase rounded-lg mt-6 bg-[#31043d] hover:bg-transparent hover:text-[#31043d] focus:outline-none transition duration-300 ease-in-out"
          >
            Explore Now
          </Link>
        </div>

        {/* Right Section */}
        <div
          className="lg:w-1/2 flex flex-col md:flex-row justify-center lg:justify-between items-center space-y-10 lg:space-y-0"
          data-aos="fade-right"
        >
          {/* Top-Rated Products */}
          <div className="w-full lg:w-1/2 flex flex-col items-center text-center">
            <div className="mb-4">
              <Icon path={mdiPaw} className="text-[#31043d]" size={2} />
            </div>
            <h3 className="text-2xl font-semibold text-[#31043d] mb-3">
              Top-Rated Products
            </h3>
            <p className="text-gray-600">
              Discover the highest-rated pet products and accessories in Jordan,
              selected by our community of animal lovers.
            </p>
            <img
              src="https://img.freepik.com/free-vector/veterinarians-examining-dog-vet-clinic_1262-21437.jpg?t=st=1733912851~exp=1733916451~hmac=ae482993aa42ccee8d291b7b4268303fd4451be340704479c20e7845ef87053a&w=826"
              alt="Top-rated products"
              className="mt-6 w-3/4 rounded-lg shadow-md"
            />
          </div>

          {/* Veterinary Services */}
          <div className="w-full lg:w-1/2 flex flex-col items-center text-center">
            <img
              src="https://img.freepik.com/premium-vector/homeless-pets-care-adoption-charity-volunteering-animals-vector_125133-2812.jpg?ga=GA1.1.905776187.1727602890&semt=ais_hybrid"
              alt="Veterinary services"
              className="mb-6 w-3/4 rounded-lg shadow-md"
            />
            <div className="mb-4">
              <Icon path={mdiDog} className="text-[#31043d]" size={2} />
            </div>
            <h3 className="text-2xl font-semibold text-[#31043d] mb-3">
              Veterinary Services
            </h3>
            <p className="text-gray-600">
              Explore top-rated veterinary clinics and services for your pets,
              reviewed and recommended by fellow pet owners.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
