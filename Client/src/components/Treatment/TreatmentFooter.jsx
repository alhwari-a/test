import React, { useEffect, useState } from "react";
import {
  Clock,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Loader2,
} from "lucide-react";

const TreatmentFooter = () => {
  const [clinicData, setClinicData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClinicData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/clinics");
        const data = await response.json();
        if (data.success) {
          setClinicData(data.data[0]);
        } else {
          throw new Error("Failed to fetch clinic data");
        }
      } catch (error) {
        setError("Unable to load clinic information. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchClinicData();
  }, []);

  if (loading) {
    return (
      <footer className="bg-gradient-to-b from-rose-950 to-rose-900 text-white">
        <div className="max-w-6xl mx-auto p-8">
          <div className="flex items-center justify-center min-h-[300px]">
            <Loader2 className="w-8 h-8 animate-spin text-rose-400" />
          </div>
        </div>
      </footer>
    );
  }

  if (error || !clinicData) {
    return (
      <footer className="bg-gradient-to-b from-rose-950 to-rose-900 text-white">
        <div className="max-w-6xl mx-auto p-8">
          <div className="flex items-center justify-center min-h-[300px] text-rose-300">
            {error || "No clinic information available."}
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-950 to-rose-900 opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1)_0%,_transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Working Hours Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-500/10 rounded-lg">
                <Clock className="w-6 h-6 text-rose-300" />
              </div>
              <h3 className="text-2xl font-semibold text-white">
                Working Hours
              </h3>
            </div>
            <div className="space-y-3">
              {Object.entries(clinicData.workingHours).map(([day, hours]) => (
                <div
                  key={day}
                  className="flex justify-between items-center py-2 border-b border-rose-800/30 hover:bg-rose-800/10 px-2 rounded transition-colors"
                >
                  <span className="text-rose-100 font-medium">{day}</span>
                  <span className="text-rose-300">{hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-500/10 rounded-lg">
                <MapPin className="w-6 h-6 text-rose-300" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Location</h3>
            </div>
            <div className="space-y-4">
              <p className="text-rose-100 leading-relaxed text-lg">
                {clinicData.location}
              </p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  clinicData.location
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-rose-300 hover:text-rose-200 group"
              >
                <span className="underline-offset-4 group-hover:underline">
                  Get Directions
                </span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-500/10 rounded-lg">
                <Phone className="w-6 h-6 text-rose-300" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Contact Us</h3>
            </div>
            <div className="space-y-4">
              <a
                href={`tel:${clinicData.phoneNumber}`}
                className="flex items-center gap-3 p-3 bg-rose-500/5 rounded-lg hover:bg-rose-500/10 transition-colors group"
              >
                <Phone className="w-5 h-5 text-rose-300 group-hover:scale-110 transition-transform" />
                <span className="text-rose-100 text-lg">
                  {clinicData.phoneNumber}
                </span>
              </a>
              <a
                href={`mailto:${clinicData.email}`}
                className="flex items-center gap-3 p-3 bg-rose-500/5 rounded-lg hover:bg-rose-500/10 transition-colors group"
              >
                <Mail className="w-5 h-5 text-rose-300 group-hover:scale-110 transition-transform" />
                <span className="text-rose-100 text-lg">
                  {clinicData.email}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TreatmentFooter;
