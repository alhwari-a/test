import React from "react";

//components
import Hero from "../components/home/Hero";
import CategorySectoin from "../components/home/CategorySectoin";
import TopRated from "../components/home/TopRated";
import FeaturedSection from "../components/home/FeaturedSection";
import Adobt from "../components/home/Adobt";

const Home = () => {
  return (
    <div>
      <Hero />
      <Adobt />
      <CategorySectoin />
      <TopRated />
      <FeaturedSection />
    </div>
  );
};

export default Home;
