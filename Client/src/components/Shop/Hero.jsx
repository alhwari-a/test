import React from "react";

const Hero = () => {
  return (
    <div className="pb-8 pt-4 px-4 lg:px-32">
      <div
        className="relative h-[400px] w-full rounded-xl"
        style={{
          backgroundImage: `url(https://img.freepik.com/premium-photo/friendship_1048944-23642584.jpg?w=826)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="max-w-3xl p-4 isolate z-30 mt-[-2rem] mx-auto">
        <div className="shadow-lg bg-white p-4 sm:p-8 overflow-hidden rounded-2xl">
          <div className="relative z-10 flex flex-col space-y-6 text-left h-[100px]">
            <h1 className="text-4xl leading-none font-bold text-[#060640]">
              Discover Our <span className="text-[#FA5990]">Animal Care</span>{" "}
              Services
            </h1>
            <h1 className="text-gray-400 text-xl max-w-2xl leading-none hidden sm:block">
              Discover a wide range of products, food, and accessories for your
              pets. Our platform offers carefully curated selections to suit
              your needs.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
