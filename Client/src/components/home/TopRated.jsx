import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import axios from "axios";
import { useCart } from "../../hooks/CartContext";
import { Toaster, toast } from "sonner";
// import "react-toastify/dist/ReactToastify.css";

const TopRated = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shuffledProducts = [...products].sort(() => Math.random() - 0.5);

  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/all-services")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      mainImage: product.mainImage,
      quantity: 1,
    });

    toast.success(`${product.title} has been added to the cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleViewMore = (productId) => {
    axios
      .get(`http://localhost:4000/api/services/${productId}`)
      .then((response) => {
        setSelectedProduct(response.data);
        setIsModalOpen(true);
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <Toaster />
      <div className="mt-16 px-4 sm:px-8 lg:pt-16 xl:px-40">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center">
          <h2 className="text-lg sm:text-xl mr-4 font-semibold text-[#060640]">
            Top Product
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
      <div className="mt-10 px-4 sm:px-8 xl:px-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {shuffledProducts.slice(0, 8).map((product) => (
            <div
              key={product.id}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 relative"
            >
              {/* Floating Cart Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
                aria-label="Add to cart"
              >
                <ShoppingCart className="w-5 h-5 text-gray-700" />
              </button>

              {/* Image Container */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-50">
                <img
                  src={`http://localhost:4000/${product.mainImage}`}
                  alt={product.title}
                  className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-lg text-gray-900 truncate">
                    {product.title}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>

                <button
                  onClick={() => handleViewMore(product.id)}
                  className="w-full mt-4 bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-90 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-lg h-[80vh] overflow-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
            <div className="flex flex-col items-center">
              <div className="w-full">
                <img
                  src={`http://localhost:4000/${selectedProduct.mainImage}`}
                  alt={selectedProduct.title}
                  className="w-full h-auto mb-4 object-cover rounded-lg"
                />
                <h3 className="text-lg font-extrabold text-gray-800">
                  {selectedProduct.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  {selectedProduct.description}
                </p>
                <h4 className="text-lg text-gray-800 font-bold mt-4">
                  ${selectedProduct.price.toFixed(2)}
                </h4>
              </div>

              <div className="mt-4 flex space-x-4 overflow-x-auto">
                {selectedProduct.subImages.map((subImage, index) => (
                  <img
                    key={index}
                    src={`http://localhost:4000/${subImage}`}
                    alt={`Sub Image ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopRated;
