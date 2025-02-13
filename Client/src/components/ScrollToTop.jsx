import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <button
        onClick={scrollToTop}
        className={`
          fixed bottom-8 right-8 
          p-4 rounded-full
          bg-gradient-to-r from-[#fa5990] to-[#fa5981]
          shadow-lg hover:shadow-xl
          transform transition-all duration-300
          ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }
          hover:scale-110 hover:from-[#fa5990] hover:to-[#fa5981]
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
          group
        `}
        aria-label="Scroll to top"
      >
        <ArrowUp
          className="w-6 h-6 text-white group-hover:animate-bounce"
          strokeWidth={2.5}
        />
      </button>
    </div>
  );
};

export default ScrollToTop;
