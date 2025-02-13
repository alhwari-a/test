import React, { useState, useEffect } from "react";

const ClinicForm = () => {
  const [clinic, setClinic] = useState({
    name: "",
    location: "",
    phoneNumber: "",
    email: "",
    workingHours: {
      Monday: "",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
      Saturday: "",
      Sunday: "",
    },
    holidays: [],
    openDays: [],
    closedDays: [],
  });

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchClinic = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/clinics/1");
        if (!response.ok) {
          throw new Error("Failed to fetch clinic data");
        }
        const data = await response.json();
        setClinic(data.data);
        setIsEditMode(true);
      } catch (error) {
        console.error("Error fetching clinic:", error);
      }
    };

    fetchClinic();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClinic((prevClinic) => ({
      ...prevClinic,
      [name]: value,
    }));
  };

  const handleWorkingHoursChange = (day, value) => {
    setClinic((prevClinic) => ({
      ...prevClinic,
      workingHours: {
        ...prevClinic.workingHours,
        [day]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isEditMode
      ? "http://localhost:4000/api/clinics/1"
      : "http://localhost:4000/api/clinics";
    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clinic),
      });

      if (!response.ok) {
        throw new Error("Failed to save clinic data");
      }

      const result = await response.json();
      console.log("Clinic saved successfully:", result);
      alert("Clinic saved successfully!");
    } catch (error) {
      console.error("Error saving clinic:", error);
      alert("Failed to save clinic data");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg px-8 py-6">
          <div className="bg-gray-800 text-white rounded-lg py-4 px-6">
            <h1 className="text-2xl font-bold">Edit Clinic</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Section */}
            <div className="bg-gray-50 p-4 rounded-md space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={clinic.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={clinic.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={clinic.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={clinic.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Working Hours Section */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Working Hours
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(clinic.workingHours).map((day) => (
                  <div key={day}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {day}
                    </label>
                    <input
                      type="text"
                      value={clinic.workingHours[day]}
                      onChange={(e) =>
                        handleWorkingHoursChange(day, e.target.value)
                      }
                      required
                      placeholder="e.g., 9:00 AM - 5:00 PM"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Special Days Section */}
            <div className="bg-gray-50 p-4 rounded-md space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Special Days
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Holidays (comma-separated dates)
                </label>
                <input
                  type="text"
                  name="holidays"
                  value={clinic.holidays
                    .map((date) =>
                      new Date(date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }),
                    )
                    .join(", ")}
                  onChange={(e) =>
                    setClinic((prevClinic) => ({
                      ...prevClinic,
                      holidays: e.target.value
                        .split(", ")
                        .map((dateStr) => new Date(dateStr).toISOString()),
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="e.g., 12/25/2024, 12/31/2024"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Open Days (comma-separated)
                </label>
                <input
                  type="text"
                  name="openDays"
                  value={clinic.openDays.join(", ")}
                  onChange={(e) =>
                    setClinic((prevClinic) => ({
                      ...prevClinic,
                      openDays: e.target.value.split(", "),
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="e.g., Monday, Wednesday, Friday"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Closed Days (comma-separated)
                </label>
                <input
                  type="text"
                  name="closedDays"
                  value={clinic.closedDays.join(", ")}
                  onChange={(e) =>
                    setClinic((prevClinic) => ({
                      ...prevClinic,
                      closedDays: e.target.value.split(", "),
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="e.g., Saturday, Sunday"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                {isEditMode ? "Update Clinic" : "Add Clinic"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClinicForm;
