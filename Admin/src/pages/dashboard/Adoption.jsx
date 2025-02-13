import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Check,
  X,
  Phone,
  Syringe,
  Tag,
  ChartColumnStacked,
  Search,
  AlertCircle,
} from "lucide-react";
const Adoption = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:4000/api/all-Adoptions",
        );
        setAdoptions(response.data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch adoptions. Please try again later.");
        console.error("Error fetching adoptions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdoptions();
  }, []);

  const updateAdoptionStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        "http://localhost:4000/api/adoption/status",
        { id, status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        setAdoptions((prevAdoptions) =>
          prevAdoptions.map((adoption) =>
            adoption.id === id ? { ...adoption, status } : adoption,
          ),
        );
      }
    } catch (error) {
      console.error("Error updating adoption status:", error);
    }
  };

  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const ImageModal = ({ src, onClose }) => (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="max-w-4xl max-h-[90vh] relative bg-white p-2 rounded-xl">
        <img
          src={`http://localhost:4000/${src}`}
          alt="Enlarged view"
          className="max-w-full max-h-[85vh] object-contain rounded-lg"
        />
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white rounded-full p-2 hover:bg-gray-100 shadow-lg"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-600">Loading adoptions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center gap-2 text-red-600">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Pet Adoption List
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adoptions.map((adoption) => (
            <div
              key={adoption.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              <div className="relative h-72 bg-gray-200 group">
                <img
                  src={`http://localhost:4000/${adoption.mainImage}`}
                  alt={adoption.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onClick={() => setSelectedImage(adoption.mainImage)}
                />
                <button
                  onClick={() => setSelectedImage(adoption.mainImage)}
                  className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Search className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {adoption.name}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyles(
                      adoption.status,
                    )}`}
                  >
                    {adoption.status}
                  </span>
                </div>

                <p className="text-gray-600 mb-6 line-clamp-2">
                  {adoption.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Tag className="w-4 h-4" />
                    <span>{adoption.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <ChartColumnStacked className="w-4 h-4" />
                    <span>{adoption.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Syringe className="w-4 h-4" />
                    <span>
                      Vaccinated: {adoption.isVaccinated ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{adoption.phoneNumber}</span>
                  </div>
                </div>

                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                  {adoption.subImages?.map((img, index) => (
                    <img
                      key={index}
                      src={`http://localhost:4000/${img}`}
                      alt={`${adoption.name} ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setSelectedImage(img)}
                    />
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() =>
                      updateAdoptionStatus(adoption.id, "approved")
                    }
                    className="flex-1 bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() =>
                      updateAdoptionStatus(adoption.id, "rejected")
                    }
                    className="flex-1 bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <ImageModal
          src={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default Adoption;
