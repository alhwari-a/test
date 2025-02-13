import React, { useState } from "react";
import axios from "axios";
import { Calendar, Phone } from "lucide-react";

const Appointment = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    animal_type: "",
    description: "",
    phone_number: "",
    reservation_time: "",
    is_coming: false,
    need_driver: false,
    location: "",
    street: "",
    building_number: "",
  });

  // State for form submission status
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // Send POST request to the API
      const response = await axios.post(
        "http://localhost:4000/api/clinic-orders",
        formData
      );

      // Handle success
      setSuccess(true);
      console.log("Clinic order created:", response.data);
    } catch (err) {
      // Handle error
      setError(err.response?.data?.message || "Failed to create clinic order");
      console.error("Error creating clinic order:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-rose-800 mb-8 text-center flex items-center justify-center">
          <Calendar className="w-8 h-8 mr-2" />
          Schedule a Treatment Session
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Animal Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Animal Type
            </label>
            <input
              type="text"
              name="animal_type"
              value={formData.animal_type}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-colors duration-200"
              placeholder="Dog, Cat, etc."
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-colors duration-200"
              rows="4"
              placeholder="Describe the issue or reason for the visit"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-colors duration-200"
                placeholder="+1 (555) 000-0000"
                required
              />
            </div>
          </div>

          {/* Reservation Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reservation Time
            </label>
            <input
              type="datetime-local"
              name="reservation_time"
              value={formData.reservation_time}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-colors duration-200"
              required
            />
          </div>

          {/* Is Coming */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <input
                type="checkbox"
                name="is_coming"
                checked={formData.is_coming}
                onChange={handleChange}
                className="mr-2"
              />
              Is the pet coming to the clinic?
            </label>
          </div>

          {/* Need Driver */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <input
                type="checkbox"
                name="need_driver"
                checked={formData.need_driver}
                onChange={handleChange}
                className="mr-2"
              />
              Need a driver for transportation?
            </label>
          </div>

          {/* Conditional Fields for Driver */}
          {formData.need_driver && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-colors duration-200"
                  placeholder="City or Area"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-colors duration-200"
                  placeholder="Street Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Building Number
                </label>
                <input
                  type="text"
                  name="building_number"
                  value={formData.building_number}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-colors duration-200"
                  placeholder="Building Number"
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-rose-600 text-white py-3 px-6 rounded-lg hover:bg-rose-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
          >
            <Calendar className="w-5 h-5 mr-2" />
            {submitting ? "Submitting..." : "Schedule Treatment"}
          </button>

          {/* Success and Error Messages */}
          {success && (
            <p className="text-green-600 text-center mt-4">
              Clinic order created successfully!
            </p>
          )}
          {error && (
            <p className="text-red-600 text-center mt-4">Error: {error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Appointment;
