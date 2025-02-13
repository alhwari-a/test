import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Upload,
  DollarSign,
  Type,
  ListFilter,
  FileText,
  Images,
  PlusCircle,
  Edit2,
  Trash2,
  Tag,
  Image,
  Save,
  X,
} from "lucide-react";

const Product = () => {
  const [services, setServices] = useState([]);
  const [serviceData, setServiceData] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    subImages: [],
  });

  const [mainImage, setMainImage] = useState(null);
  const [subImages, setSubImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);

  const authToken = localStorage.getItem("authToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMainImageChange = (e) => {
    setMainImage(e.target.files[0]);
  };

  const handleSubImagesChange = (e) => {
    setSubImages(e.target.files);
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", serviceData.title);
    formData.append("category", serviceData.category);
    formData.append("price", serviceData.price);
    formData.append("description", serviceData.description);
    formData.append("mainImage", mainImage);
    Array.from(subImages).forEach((image) => {
      formData.append("subImages", image);
    });

    try {
      const response = await axios.post(
        "http://localhost:4000/api/services-create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      Swal.fire({
        icon: "success",
        title: "Service created successfully!",
        text: response.data.message,
        confirmButtonText: "OK",
        customClass: {
          confirmButton:
            "bg-green-600 text-white border-none hover:bg-green-800",
        },
      });
      fetchServices();
    } catch (error) {
      console.error("Error creating service:", error);
      Swal.fire({
        icon: "error",
        title: "Error creating service",
        text: error.response?.data?.message || "An error occurred.",
        customClass: {
          confirmButton: "bg-red-600 text-white border-none hover:bg-red-800",
        },
      });
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/all-services",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleEdit = (id) => {
    const serviceToEdit = services.find((service) => service.id === id);
    setServiceData({
      title: serviceToEdit.title,
      category: serviceToEdit.category,
      price: serviceToEdit.price,
      description: serviceToEdit.description,
      subImages: serviceToEdit.subImages,
    });
    setMainImage(serviceToEdit.mainImage);
    setSubImages(serviceToEdit.subImages);
    setEditingServiceId(id);
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", serviceData.title);
    formData.append("category", serviceData.category);
    formData.append("price", serviceData.price);
    formData.append("description", serviceData.description);
    if (mainImage) formData.append("mainImage", mainImage);
    Array.from(subImages).forEach((image) =>
      formData.append("subImages", image),
    );

    try {
      const response = await axios.put(
        `http://localhost:4000/api/services-edit/${editingServiceId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      Swal.fire({
        icon: "success",
        title: "Service updated successfully!",
        text: response.data.message,
        confirmButtonText: "OK",
        customClass: {
          confirmButton:
            "bg-green-600 text-white border-none hover:bg-green-800",
        },
      });
      fetchServices();
      setShowModal(false);
    } catch (error) {
      console.error("Error updating service:", error);
      Swal.fire({
        icon: "error",
        title: "Error updating service",
        text: error.response?.data?.message || "An error occurred.",
        customClass: {
          confirmButton: "bg-red-600 text-white border-none hover:bg-red-800",
        },
      });
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "bg-black text-white border-none hover:bg-gray-800",
        cancelButton: "bg-red-600 text-white border-none hover:bg-red-800",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `http://localhost:4000/api/services-delete/${id}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            },
          );
          Swal.fire({
            icon: "success",
            title: "Service deleted successfully!",
            text: `Service with ID ${id} has been deleted.`,
            customClass: {
              confirmButton:
                "bg-green-600 text-white border-none hover:bg-green-800",
            },
          });
          setServices(services.filter((service) => service.id !== id));
        } catch (error) {
          console.error("Error deleting service:", error);
          Swal.fire({
            icon: "error",
            title: "Error deleting service",
            text: error.response?.data?.message || "An error occurred.",
            customClass: {
              confirmButton:
                "bg-red-600 text-white border-none hover:bg-red-800",
            },
          });
        }
      }
    });
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="container mx-auto p-8">
      {/* Form for creating a new service */}
      <form
        onSubmit={handleCreate}
        className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto border border-gray-100 mb-[5rem]"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <PlusCircle className="w-8 h-8 text-gray-800" />
          Create Product
        </h2>

        <div className="space-y-6">
          {/* Main Image Upload */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Upload className="w-4 h-4" />
              Main Image
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={handleMainImageChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
            </div>
          </div>

          {/* Title Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Type className="w-4 h-4" />
              Title
            </label>
            <input
              type="text"
              name="title"
              value={serviceData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all"
              required
            />
          </div>

          {/* Category Select */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <ListFilter className="w-4 h-4" />
              Category
            </label>
            <select
              name="category"
              value={serviceData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all appearance-none bg-white"
              required
            >
              <option value="">Select Category</option>
              <option value="Accessories">Accessories</option>
              <option value="Food">Food</option>
              <option value="Litter">Litter</option>
            </select>
          </div>

          {/* Price Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <DollarSign className="w-4 h-4" />
              Price
            </label>
            <input
              type="number"
              name="price"
              value={serviceData.price}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all"
              required
            />
          </div>

          {/* Description Textarea */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FileText className="w-4 h-4" />
              Description
            </label>
            <textarea
              name="description"
              value={serviceData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all min-h-[120px]"
              required
            />
          </div>

          {/* Sub Images Upload */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Images className="w-4 h-4" />
              Sub Images
            </label>
            <input
              type="file"
              multiple
              onChange={handleSubImagesChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            Create Product
          </button>
        </div>
      </form>

      {/* List of services */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] border border-gray-100"
          >
            {/* Main Image Container */}
            <div className="relative">
              <img
                src={`http://localhost:4000/${service.mainImage}`}
                alt={service.title}
                className="w-full h-56 object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  {service.category}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 line-clamp-3">
                {service.description}
              </p>

              {/* Sub Images Section */}
              {service.subImages.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-3">
                    <Image className="w-4 h-4" />
                    Additional Images
                  </h4>
                  <div className="grid grid-cols-4 gap-2">
                    {service.subImages.map((subImage, index) => (
                      <div key={index} className="relative aspect-square">
                        <img
                          src={`http://localhost:4000/${subImage}`}
                          alt={`Sub Image ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => handleEdit(service.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Editing Service */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md relative animate-fadeIn">
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Edit Service
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-800" />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-5">
                {/* Main Image */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Upload className="w-4 h-4" />
                    Main Image
                  </label>
                  <input
                    type="file"
                    onChange={handleMainImageChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Type className="w-4 h-4" />
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={serviceData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all"
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <ListFilter className="w-4 h-4" />
                    Category
                  </label>
                  <select
                    name="category"
                    value={serviceData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all appearance-none bg-white"
                    required
                  >
                    <option value="Accessories">Accessories</option>
                    <option value="Food">Food</option>
                    <option value="Litter">Litter</option>
                  </select>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <DollarSign className="w-4 h-4" />
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={serviceData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <FileText className="w-4 h-4" />
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={serviceData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all min-h-[100px]"
                    required
                  />
                </div>

                {/* Sub Images */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Images className="w-4 h-4" />
                    Sub Images
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={handleSubImagesChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    <Save className="w-4 h-4" />
                    Update Product
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    type="button"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
