import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddAdoption = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [isVaccinated, setIsVaccinated] = useState(false);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState(null);
  const [subImages, setSubImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [showGuidelines, setShowGuidelines] = useState(true);
  const navigate = useNavigate();

  const guidelines = [
    "Ensure all images are clear and well-lit",
    "Provide accurate and detailed description of the pet like if it homless or your bet",
    "Include any special needs or medical conditions",
    "Be honest about the pet's temperament and behavior",
    "Provide accurate contact information",
    "Response time should be within 24 hours",
    "Upload at least one main image and up to 4 additional images",
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "name is required";
    } else if (name.length < 3) {
      newErrors.name = "name must be at least 3 characters long";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    } else if (description.length < 10) {
      newErrors.description = "Description must be at least 10 characters long";
    }

    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!phoneRegex.test(phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    if (!image) {
      newErrors.image = "Main image is required";
    }

    if (subImages.length > 4) {
      newErrors.subImages = "Maximum 4 additional images allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage && !selectedImage.type.startsWith("image/")) {
      setErrors({ ...errors, image: "Please select a valid image file" });
      return;
    }
    setImage(selectedImage);
    setErrors({ ...errors, image: undefined });
  };

  const handleSubImagesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 4) {
      setErrors({
        ...errors,
        subImages: "Maximum 4 additional images allowed",
      });
      return;
    }
    const invalidFiles = selectedFiles.filter(
      (file) => !file.type.startsWith("image/")
    );
    if (invalidFiles.length > 0) {
      setErrors({
        ...errors,
        subImages: "Please select valid image files only",
      });
      return;
    }
    setSubImages(selectedFiles);
    setErrors({ ...errors, subImages: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
      Swal.fire({
        title: "Login Required",
        text: "You must be logged in to submit an adoption listing. Please log in and try again.",
        icon: "warning",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/");
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("phoneNumber", phoneNumber);
    formData.append("type", type);
    formData.append("isVaccinated", isVaccinated);
    if (image) {
      formData.append("mainImage", image);
    }
    subImages.forEach((img, index) => {
      formData.append(`subImages`, img);
    });

    try {
      const response = await axios.post(
        "http://localhost:4000/api/Adoptions-create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Adoption listing added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/adoption/cats");
        });
      }
    } catch (error) {
      console.error("Error creating adoption:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to add adoption listing.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      {/* Guidelines Modal */}
      {showGuidelines && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full m-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Adoption Listing Guidelines
            </h2>
            <ul className="space-y-2 mb-6">
              {guidelines.map((guideline, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-rose-500 mr-2">•</span>
                  {guideline}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowGuidelines(false)}
              className="w-full py-2 px-4 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors"
            >
              I Understand
            </button>
          </div>
        </div>
      )}

      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Add Adoption Listing
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              pet's name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 
                ${errors.name ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pet Type
            </label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              placeholder="Enter pet type (e.g.,Scottish fold , husky,...)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500
                ${errors.description ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            >
              <option value="">Select Option </option>
              <option value="cats">Cats</option>
              <option value="dogs">Dogs</option>{" "}
              <option value="kittens">Kittens</option>
              <option value="puppies">Puppies</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500
                ${errors.phoneNumber ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
            )}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isVaccinated}
              onChange={(e) => setIsVaccinated(e.target.checked)}
              className="h-5 w-5 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
            />
            <label className="ml-2 text-sm font-medium text-gray-700">
              Is Vaccinated?
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className={`w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 
                file:text-sm file:font-medium file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100
                ${errors.image ? "border-red-500" : ""}`}
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">{errors.image}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Images (Up to 4)
            </label>
            <input
              type="file"
              onChange={handleSubImagesChange}
              accept="image/*"
              multiple
              className={`w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 
                file:text-sm file:font-medium file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100
                ${errors.subImages ? "border-red-500" : ""}`}
            />
            {errors.subImages && (
              <p className="mt-1 text-sm text-red-600">{errors.subImages}</p>
            )}
            {subImages.length > 0 && (
              <p className="mt-1 text-sm text-gray-500">
                Selected {subImages.length} additional image(s)
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors"
          >
            Submit Listing
          </button>

          <button
            type="button"
            onClick={() => setShowGuidelines(true)}
            className="w-full flex justify-center py-2 px-4 border border-rose-300 rounded-md shadow-sm text-sm font-medium text-rose-700 bg-white hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors"
          >
            View Guidelines
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdoption;
