import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, PawPrint, Shield, Clock } from "lucide-react";

import AdoptionModal from "../components/adoption/AdoptionModal";

const AdoptionPage = () => {
  const { animal } = useParams();
  const [adoptionData, setAdoptionData] = useState([]);
  const [selectedAdoptionId, setSelectedAdoptionId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchAdoptionData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/Adoptions/category/${animal}`
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          setAdoptionData(data);
        } else {
          setAdoptionData([]);
        }
      } catch (error) {
        console.error("Error fetching adoption data:", error);
        setAdoptionData([]);
      }
    };

    fetchAdoptionData();
  }, [animal]);

  const content = {
    cats: {
      title: "Adopt a Loving Cat",
      description:
        "Open your heart and home to a furry friend. Our cats are carefully selected, fully vaccinated, and ready to bring joy to your life. Each adoption includes veterinary checks, microchipping, and ongoing support.",
      features: [
        "Fully vaccinated and health-checked",
        "Microchipped for safety",
        "Behavioral assessment completed",
        "Post-adoption support included",
      ],
      image:
        "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNhdHxlbnwwfHwwfHx8MA%3D%3D",
    },
    dogs: {
      title: "Find Your Perfect Canine Match",
      description:
        "Give a deserving dog a forever home. Our dogs are lovingly cared for, professionally trained, and eager to become part of your family. Each adoption includes comprehensive health checks and lifetime support.",
      features: [
        "Complete health screening",
        "Basic training included",
        "Temperament tested",
        "Lifetime support guarantee",
      ],
      image:
        "https://plus.unsplash.com/premium_photo-1677545183884-421157b2da02?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0fGVufDB8fDB8fHww",
    },
    kittens: {
      title: "Adorable Kittens Seeking Homes",
      description:
        "Fall in love with our playful and cuddly kittens. Carefully socialized and raised with love, these little bundles of joy are ready to become your newest family member. Each kitten comes with comprehensive early care.",
      features: [
        "Age-appropriate vaccinations",
        "Early socialization",
        "Health certificate provided",
        "Starter kit included",
      ],
      image:
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fHww",
    },
    puppies: {
      title: "Puppies Ready for Their Forever Homes",
      description:
        "Bring home a bundle of energy and love. Our puppies are carefully bred, early-socialized, and prepared for a lifetime of companionship. Each puppy receives exceptional care and support.",
      features: [
        "First round of puppy vaccinations",
        "Early socialization program",
        "Breed-specific health checks",
        "Puppy starter package",
      ],
      image:
        "https://plus.unsplash.com/premium_photo-1707353401897-da9ba223f807?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNhdHxlbnwwfHwwfHx8MA%3D%3D",
    },
  };

  const heroContent = content[animal];

  if (!heroContent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <PawPrint className="mx-auto mb-4 text-gray-400" size={48} />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Invalid Category
          </h2>
          <p className="text-gray-600">
            Please select a valid pet category to continue.
          </p>
        </div>
      </div>
    );
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = adoptionData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(adoptionData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const benefits = [
    {
      icon: <Heart className="w-8 h-8 text-rose-500" />,
      title: "Loving Care",
      description:
        "All our pets receive the highest standard of care and attention",
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "Health Guarantee",
      description: "Complete health checks and vaccination records provided",
    },
    {
      icon: <Clock className="w-8 h-8 text-green-500" />,
      title: "Lifetime Support",
      description: "Our team is always here to help with your pet's journey",
    },
  ];

  return (
    <div className="min-h-screen to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-[#FA5990] leading-tight">
                  {heroContent.title}
                </h1>
                <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                  {heroContent.description}
                </p>
                <Link to="/add-adoption">
                  <button className="mt-6 px-6 py-3 text-white bg-[#FA5990] rounded-full shadow-lg hover:bg-[#fa598fa2] transition duration-300">
                    Add Animal to Adopt
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <img
                src={heroContent.image}
                alt={`Adopt a ${animal}`}
                className="rounded-2xl shadow-2xl w-full h-[25rem] transform hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Adoption Data Section */}
      {adoptionData && adoptionData.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#FA5990]">
              Available {animal.charAt(0).toUpperCase() + animal.slice(1)} for
              Adoption
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((item) => (
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
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <PawPrint className="w-5 h-5 text-rose-500" />
                    </div>
                    <div className="text-sm text-gray-500">{item.animal}</div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-gray-600 line-clamp-2 min-h-[48px]">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-2 text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span>{item.phoneNumber}</span>
                    </div>

                    <button
                      className="w-full bg-rose-500 text-white py-2 px-4 rounded-lg hover:bg-rose-600 transition-colors duration-300 font-medium flex items-center justify-center gap-2"
                      onClick={() => setSelectedAdoptionId(item.id)}
                    >
                      <PawPrint className="w-4 h-4" />
                      Adopt Now
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {selectedAdoptionId && (
              <AdoptionModal
                adoptionId={selectedAdoptionId}
                onClose={() => setSelectedAdoptionId(null)}
              />
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-rose-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
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

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#FA5990]">
            Why Choose Our Adoption Program?
          </h2>
          <p className="mt-4 text-gray-600">
            We ensure the best experience for both pets and their new families
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6"
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-[#FA5990] mb-6">
            What's Included
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {heroContent.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <PawPrint className="w-5 h-5 text-rose-500" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptionPage;
