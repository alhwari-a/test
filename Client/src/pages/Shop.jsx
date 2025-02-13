import React, { useState, useEffect } from "react";
import { ShoppingCart, Search, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { useCart } from "../hooks/CartContext";
import { Toaster, toast } from "sonner";
// import "react-toastify/dist/ReactToastify.css";
import Hero from "../components/Shop/Hero";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useCart();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of items to display per page

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/all-services")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Combined filter function for category and search
  const filterProducts = (products, category, search) => {
    return products.filter((product) => {
      const categoryMatch = category === "all" || product.category === category;
      const searchMatch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());
      return categoryMatch && searchMatch;
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const filtered = filterProducts(products, category, searchTerm);
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchTerm(search);
    const filtered = filterProducts(products, selectedCategory, search);
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      mainImage: product.mainImage,
      quantity: 1,
    });
    toast.dismiss();
    toast.success(`${product.title} has been added to the cart!`, {
      position: "top-right",
      duration: 3000,
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

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <Toaster />
      <Hero />
      <div className="mt-10 px-4 sm:px-8 xl:px-40">
        {/* Search and Category Container */}
        <div className="flex flex-col sm:flex-row justify-center items-center mb-10 space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search Input */}
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fa5990]"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>

          {/* Category Buttons */}
          <div className="flex space-x-2">
            {["all", "Accessories", "Food", "Litter"].map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-lg text-black font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#fa5990] shadow-lg text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-[#fa5990] hover:text-white"
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center text-gray-500 mt-6">
            <h2 className="text-2xl font-semibold">
              No products found in this category or matching your search.
            </h2>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6 mb-8">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-100 rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative"
                >
                  <div
                    className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-4"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="w-5 h-5 text-gray-800" />
                  </div>

                  <div className="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                    <img
                      src={`http://localhost:4000/${product.mainImage}`}
                      alt={product.title}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-extrabold text-gray-800">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2">
                      {product.description.split(" ").slice(0, 9).join(" ")} ...
                    </p>
                    <button
                      onClick={() => handleViewMore(product.id)}
                      className="text-[#FA5990] hover:underline mt-2 inline-block"
                    >
                      View More
                    </button>
                    <h4 className="text-lg text-gray-800 font-bold mt-4">
                      ${product.price.toFixed(2)}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center space-x-4 mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-full bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={24} />
              </button>

              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Modal remains the same as in the original code */}
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

export default Shop;
