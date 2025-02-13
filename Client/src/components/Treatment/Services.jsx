import React from "react";
import { Heart, Dog, Cat, Stethoscope, Award } from "lucide-react";

const Services = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-rose-800 mb-12 flex items-center justify-center">
        <Stethoscope className="w-8 h-8 mr-2" />
        Our Specialized Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Dog Treatment Card */}
        <div className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center mb-4">
            <Dog className="w-8 h-8 text-rose-600" />
            <h3 className="text-xl font-bold ml-2 text-rose-800">
              Dog Treatment
            </h3>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <Heart className="w-4 h-4 mr-2 text-rose-500" />
              Behavioral Therapy
            </li>
            <li className="flex items-center">
              <Heart className="w-4 h-4 mr-2 text-rose-500" />
              Physical Rehabilitation
            </li>
            <li className="flex items-center">
              <Heart className="w-4 h-4 mr-2 text-rose-500" />
              Joint Health Programs
            </li>
          </ul>
        </div>

        {/* Cat Treatment Card */}
        <div className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center mb-4">
            <Cat className="w-8 h-8 text-rose-600" />
            <h3 className="text-xl font-bold ml-2 text-rose-800">
              Cat Treatment
            </h3>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <Heart className="w-4 h-4 mr-2 text-rose-500" />
              Stress Management
            </li>
            <li className="flex items-center">
              <Heart className="w-4 h-4 mr-2 text-rose-500" />
              Grooming Therapy
            </li>
            <li className="flex items-center">
              <Heart className="w-4 h-4 mr-2 text-rose-500" />
              Senior Cat Care
            </li>
          </ul>
        </div>

        {/* Rehabilitation Card */}
        <div className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center mb-4">
            <Award className="w-8 h-8 text-rose-600" />
            <h3 className="text-xl font-bold ml-2 text-rose-800">
              Rehabilitation
            </h3>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <Heart className="w-4 h-4 mr-2 text-rose-500" />
              Post-Surgery Care
            </li>
            <li className="flex items-center">
              <Heart className="w-4 h-4 mr-2 text-rose-500" />
              Mobility Training
            </li>
            <li className="flex items-center">
              <Heart className="w-4 h-4 mr-2 text-rose-500" />
              Pain Management
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Services;
