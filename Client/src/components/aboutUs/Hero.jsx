import { useState, useEffect } from "react";
import "./Styling.css";

const Hero = () => {
  const images = [
    "https://img.freepik.com/premium-photo/friendship_1048944-23642584.jpg?w=826",
    "https://img.freepik.com/premium-photo/medium-shot-doctor-cat-owner-clinic_23-2148302190.jpg?ga=GA1.1.905776187.1727602890&semt=ais_hybrid",
    "https://img.freepik.com/premium-photo/cropped-close-up-professional-vet-examining-little-siberian-husky-puppy-using-stethoscope-her-vet-clinic-professionalism-medical-concept_7502-5612.jpg?ga=GA1.1.905776187.1727602890&semt=ais_hybrid",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={images[currentImageIndex]}
          alt="Background"
          className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
        />
      </div>
      <div className="relative flex justify-center items-center w-full h-full bg-black bg-opacity-60">
        <div className="text-center">
          <h1 className="text-7xl font-bold font-serif text-white mb-4">
            About <span className="text-[#FA5990]">Purrrfect Match</span>
          </h1>
          <p className="text-lg text-white opacity-80 mb-8">
            Discover the journey, the passion, and the innovation behind
            Purrrfect Match.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
