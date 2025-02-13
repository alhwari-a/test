import React from "react";
import { Link } from "react-router-dom";
import C1 from "../../assets/Image/te1.png";
import C2 from "../../assets/Image/C2.png";
import C3 from "../../assets/Image/C3.png";
import C4 from "../../assets/Image/C4.png";
import C5 from "../../assets/Image/C5.png";
import C6 from "../../assets/Image/C6.png";

const CategoryCard = ({
  title,
  category,
  image,
  cta,
  bgColor,
  Color,
  alignImage,
  imageSize = "medium",
  imageAlignment = "center",
  cardIndex,
  link, // Optional link prop
}) => {
  const imageClass = `${
    imageSize === "large" ? "scale-110 lg:mt-[-16]" : "scale-100"
  } ${
    cardIndex === 1 || cardIndex === 6
      ? "absolute right-0 h-full w-1/2 object-cover"
      : "flex justify-center items-center"
  }`;

  return (
    <div
      className={`relative p-4 rounded-lg shadow-md ${bgColor} flex flex-col h-[19rem] ${
        cardIndex === 1 || cardIndex === 6 ? "lg:flex-row" : ""
      }`}
    >
      <div className="flex-1">
        <div className="text-sm text-gray-500">{category}</div>
        <div className={`text-2xl font-bold ${Color}`}>{title}</div>
        {cta &&
          (link ? (
            <Link to={link}>
              <button className="mt-4 py-2 px-4 bg-[#FA5990] hover:opacity-80 w-36 text-white rounded-3xl">
                {cta}
              </button>
            </Link>
          ) : (
            <button className="mt-4 py-2 px-4 bg-[#FA5990] hover:opacity-80 w-36 text-white rounded-3xl">
              {cta}
            </button>
          ))}
      </div>
      <div
        className={`relative flex-1 ${
          cardIndex === 1 || cardIndex === 6
            ? "flex justify-end items-center"
            : alignImage
        }`}
      >
        <img
          src={image}
          alt={title}
          className={`object-cover rounded-lg ${imageClass}`}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

const CategorySection = () => {
  return (
    <>
      <div className="mt-16 px-4 sm:px-8 lg:pt-16 xl:px-40">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center">
          <h2 className="text-lg sm:text-xl mr-4 font-semibold text-[#060640]">
            Top Categories
          </h2>
          <Link
            to="/shop"
            className="flex items-center text-gray-600 hover:underline mt-4 sm:mt-0"
          >
            <span className="mr-2 text-[#515161]">See all resources</span>
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
        <hr className="my-4 border-[#FADED9] border-[2px]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 md:px-10 lg:px-40 mt-10">
        <div className="lg:col-span-2">
          <CategoryCard
            title="Adoption"
            category="Find homes for pets"
            image={C1}
            cta="Show More"
            bgColor="bg-[#eeeeee]"
            Color="text-[#646464]"
            alignImage="flex justify-end"
            imageSize="medium"
            imageAlignment="right"
            cardIndex={1}
            link="/adoption/cats" // ✅ Corrected Link
          />
        </div>
        <CategoryCard
          title="Animal Food"
          category="Nutrition & Supplies"
          image={C2}
          bgColor="bg-[#d4edf8]"
          Color="text-[#3a8fb6]"
          alignImage="flex justify-center"
          imageSize="large"
          cardIndex={2}
        />
        <CategoryCard
          title="Toys"
          category="Entertainment"
          image={C3}
          bgColor="bg-[#fef9c4]"
          Color="text-[#e4cd4c]"
          alignImage="flex justify-center"
          imageSize="small"
          cardIndex={3}
        />
        <CategoryCard
          title="Accessories"
          category="Comfort & Style"
          image={C4}
          bgColor="bg-[#f2e7e3]"
          Color="text-[#e5d3c0]"
          alignImage="flex justify-center"
          imageSize="large"
          cardIndex={4}
        />
        <CategoryCard
          title="Grooming Supplies"
          category="Hygiene & Care"
          image={C5}
          bgColor="bg-[#e3f2e6]"
          Color="text-[#79df7e]"
          alignImage="flex justify-center"
          imageSize="medium"
          cardIndex={5}
        />
        <div className="lg:col-span-2">
          <CategoryCard
            title="Luxury Items"
            category="Premium Products"
            image={C6}
            cta="Show More"
            bgColor="bg-[#fae8e8]"
            Color="text-[#de8a8d]"
            alignImage="flex justify-end"
            imageSize="large"
            imageAlignment="right"
            cardIndex={6}
            link="/shop" // ✅ Corrected Link
          />
        </div>
      </div>
    </>
  );
};

export default CategorySection;
