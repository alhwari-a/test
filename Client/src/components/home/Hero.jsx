import React, { useState, useEffect } from "react";
import axios from "axios";
import BgHero from "../../assets/Svg/HeroBg.svg";
import HeroImag from "../../assets/Image/HeroSec.png";
import { Link } from "react-router-dom";

const Hero = () => {
  const [userCount, setUserCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const userResponse = await axios.get(
          "http://localhost:4000/api/users/count"
        );
        setUserCount(userResponse.data.count);

        const productsResponse = await axios.get(
          "http://localhost:4000/api/all-services"
        );
        setProductsCount(productsResponse.data.length);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <>
      <div className="relative flex justify-center mt-5 z-[-30] ">
        <img src={BgHero} alt="Background Hero" className="hidden lg:block" />
      </div>
      <div className="absolute w-full p-5 top-[-40px] flex flex-col lg:flex-row lg:items-center lg:p-[6rem] lg:justify-around">
        <div className="order-2 lg:order-1">
          <h3 className="text-left text-2xl font-bold text-[#060640] lg:text-white tracking-[0.25rem] w-full lg:w-[600px] pl-0 lg:pl-28">
            Care for Your <span className="text-[#FA5990]">Furry Friends</span>{" "}
            Discover premium pet food, luxurious products, and top-notch
            healthcare services for your beloved animals.
          </h3>
          <div className="flex justify-around mt-5 lg:mt-10 lg:pl-20 items-center">
            <Link to="/adoption/cats">
              <button className="w-[150px] h-[35px] rounded-xl bg-[#FA5990] hover:opacity-80">
                Explore Now
              </button>
            </Link>
            <div className="flex flex-col items-center mx-2">
              <p className="font-serif lg:text-white text-[#060640] font-semibold text-2xl leading-7">
                {productsCount}
              </p>
              <p className="font-bitter font-normal text-xs leading-3 text-[#FA5990]">
                Products Available
              </p>
            </div>
            <div className="flex flex-col items-center mx-2">
              <p className="font-serif lg:text-white text-[#060640] font-semibold text-2xl leading-7">
                {userCount}
              </p>
              <p className="font-bitter font-normal text-xs leading-3 text-[#FA5990]">
                Number Of User's
              </p>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 text-center lg:text-right mb-5 lg:mb-0">
          <img
            src={HeroImag}
            alt="Hero Section Image"
            className="h-[400px] w-[300px] mt-24 lg:h-[480px] lg:w-[600px] mx-auto lg:mx-0 lg:mt-10 lg:pr-14"
          />
        </div>
      </div>

      <div className="flex flex-col mt-[30rem] lg:mt-0 lg:flex-row lg:w-[480px] lg:h-[55px] w-[350px] lg:mx-0 justify-center items-center rounded-3xl border border-[#060640] p-2 shadow-md absolute left-[200px] lg:left-[200px] top-[350px] lg:top-[505px] transform -translate-x-1/2 lg:translate-x-0">
        <div className="text-center text-[#060640] font-medium w-full">
          Search for pet care services, food, and products!
        </div>
      </div>
    </>
  );
};

export default Hero;
