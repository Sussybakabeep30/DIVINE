import React from 'react';
import { Calendar, MapPin, Bed, Shield } from 'lucide-react';

interface SummaryStepProps {
  formData: any;
}

const SummaryStep: React.FC<SummaryStepProps> = ({ formData }) => {
  const destinations = [
    { id: 'yamunotri', name: 'Yamunotri' },
    { id: 'gangotri', name: 'Gangotri' },
    { id: 'kedarnath', name: 'Kedarnath' },
    { id: 'badrinath', name: 'Badrinath' },
  ];

  const travelOptions = {
    helicopter: 'Luxury Helicopter',
    car: 'Premium Car Service',
    trek: 'Guided Trekking',
    horse: 'Traditional Mount',
  };

  const stayOptions = {
    luxury: 'Luxury Hotels & Resorts',
    retreat: 'Spiritual Retreats',
    dharamshala: 'Premium Dharamshalas',
  };

  const services = {
    pujari: 'Private Pujari Services',
    medical: 'Medical Assistance',
    wellness: 'Ayurvedic Wellness',
    vip: 'VIP Darshan',
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#2C5F3E] mb-6">Your Journey Summary</h2>
      <p className="text-gray-600 mb-8">
        Review your selected preferences for your spiritual journey.
      </p>

      <div className="space-y-8">
        {/* Destinations */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <MapPin className="text-[#CBA95D] w-6 h-6" />
            <h3 className="text-xl font-semibold ml-2">Selected Destinations</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className={`p-3 rounded-lg text-center ${
                  formData.destinations?.includes(dest.id)
                    ? 'bg-[#2C5F3E] text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {dest.name}
              </div>
            ))}
          </div>
        </div>

        {/* Travel Option */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <Calendar className="text-[#CBA95D] w-6 h-6" />
            <h3 className="text-xl font-semibold ml-2">Travel Mode</h3>
          </div>
          <p className="text-lg text-[#00573F]">
            {travelOptions[formData.travelOption as keyof typeof travelOptions] || 'Not selected'}
          </p>
        </div>

        {/* Accommodation */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <Bed className="text-[#CBA95D] w-6 h-6" />
            <h3 className="text-xl font-semibold ml-2">Accommodation</h3>
          </div>
          <p className="text-lg text-[#00573F]">
            {stayOptions[formData.stayPreference as keyof typeof stayOptions] || 'Not selected'}
          </p>
        </div>

        {/* Additional Services */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <Shield className="text-[#CBA95D] w-6 h-6" />
            <h3 className="text-xl font-semibold ml-2">Additional Services</h3>
          </div>
          <div className="space-y-2">
            {formData.services?.length > 0 ? (
              formData.services.map((service: string) => (
                <p key={service} className="text-[#00573F]">
                  • {services[service as keyof typeof services]}
                </p>
              ))
            ) : (
              <p className="text-gray-500">No additional services selected</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-[#DDC6A4] bg-opacity-20 rounded-lg">
        <h4 className="text-lg font-semibold text-[#2C5F3E] mb-2">Next Steps</h4>
        <p className="text-[#00573F]">
          Our team will contact you shortly to finalize your itinerary and provide a detailed quote
          based on your selections. We'll also help you choose the most auspicious dates for your
          journey.
        </p>
      </div>

      <div className="mt-8 flex justify-center">
        <button className="px-8 py-3 bg-[#CBA95D] text-white rounded-lg hover:bg-[#B89A4E] transition-colors">
          Download Itinerary PDF
        </button>
      </div>
    </div>
  );
};

export default SummaryStep;