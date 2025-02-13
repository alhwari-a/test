import React, { useState, useEffect } from "react";
import AdoptionModal from "../adoption/AdoptionModal";
import { Link } from "react-router-dom";

const Adobt = () => {
  const [adoptionData, setAdoptionData] = useState([]);
  const [selectedAdoptionId, setSelectedAdoptionId] = useState(null);

  useEffect(() => {
    const fetchAdoptionData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/status/adoptions/approved"
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          setAdoptionData(data.slice(0, 6));
        } else {
          setAdoptionData([]);
        }
      } catch (error) {
        console.error("Error fetching adoption data:", error);
        setAdoptionData([]);
      }
    };

    fetchAdoptionData();
  }, []);

  return (
    <>
      <div className=" mt-16 px-4 sm:px-8 lg:pt-16 xl:px-40">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center">
          <h2 className="text-lg sm:text-xl mr-4 font-semibold text-[#060640]">
            Animal to Adopt
          </h2>
          <Link
            to="adoption/cats"
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
      <div>
        {adoptionData.length > 0 ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adoptionData.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={`http://localhost:4000/${item.mainImage}`}
                      alt={item.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-2 min-h-[48px]">
                      {item.description}
                    </p>
                    <button
                      className="w-full bg-rose-500 text-white py-2 px-4 rounded-lg hover:bg-rose-600 transition-colors duration-300 font-medium"
                      onClick={() => setSelectedAdoptionId(item.id)}
                    >
                      Adopt Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-[#FA5990]">
              No adoption yet
            </h2>
            <p className="text-gray-600 mt-4">
              There are no animals available for adoption at this moment. Please
              check back later.
            </p>
          </div>
        )}

        {selectedAdoptionId && (
          <AdoptionModal
            adoptionId={selectedAdoptionId}
            onClose={() => setSelectedAdoptionId(null)}
          />
        )}
      </div>
    </>
  );
};

export default Adobt;
