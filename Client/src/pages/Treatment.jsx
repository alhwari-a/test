import React, { useRef } from "react";
import { Calendar, PawPrint } from "lucide-react";
import Services from "../components/Treatment/Services";
import Appointment from "../components/Treatment/Appointment";
import TreatmentFooter from "../components/Treatment/TreatmentFooter";
import TreatmentHero from "../assets/Image/Treatment.jpg";

const Treatment = () => {
  const appointmentRef = useRef(null);

  const handleScrollToAppointment = () => {
    if (appointmentRef.current) {
      appointmentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative h-[800px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-rose-900/30 z-10"></div>
          <img
            src={TreatmentHero}
            alt="Veterinarian caring for pets"
            className="absolute inset-0 w-full h-full "
          />
          {/* Content Overlay */}
          <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto text-center">
              <div className="flex items-center justify-center mb-4">
                <PawPrint className="w-12 h-12 text-white mr-2" />
                <h1 className="text-5xl font-extrabold text-white">
                  Purrrfect Match
                </h1>
              </div>
              <p className="text-xl text-white mt-4 max-w-2xl mx-auto">
                Where Love Meets Expert Pet Care - Professional Treatment
                Services for Your Beloved Companions
              </p>
              <button
                onClick={handleScrollToAppointment}
                className="mt-8 px-8 py-3 bg-rose-600 text-white rounded-full hover:bg-rose-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center mx-auto"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book a Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <Services />

      {/* Appointment Form */}
      <div ref={appointmentRef}>
        <Appointment />
      </div>

      {/* Footer */}
      <TreatmentFooter />
    </div>
  );
};

export default Treatment;
