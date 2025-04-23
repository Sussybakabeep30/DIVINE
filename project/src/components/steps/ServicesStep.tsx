import React from 'react';
import { UserCheck, Stethoscope, Space as Spa, Shield } from 'lucide-react';

const services = [
  {
    id: 'pujari',
    name: 'Private Pujari Services',
    icon: UserCheck,
    description: 'Personal priest for ceremonies and rituals',
    price: '₹5,000 per temple',
  },
  {
    id: 'medical',
    name: 'Medical Assistance',
    icon: Stethoscope,
    description: '24/7 medical support and emergency care',
    price: '₹2,500 per person',
  },
  {
    id: 'wellness',
    name: 'Ayurvedic Wellness',
    icon: Spa,
    description: 'Traditional spa and relaxation services',
    price: '₹3,500 per session',
  },
  {
    id: 'vip',
    name: 'VIP Darshan',
    icon: Shield,
    description: 'Priority temple access and special arrangements',
    price: '₹7,500 per temple',
  },
];

interface ServicesStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const ServicesStep: React.FC<ServicesStepProps> = ({ formData, updateFormData }) => {
  const toggleService = (id: string) => {
    const current = formData.services || [];
    if (current.includes(id)) {
      updateFormData('services', current.filter((s: string) => s !== id));
    } else {
      updateFormData('services', [...current, id]);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#2C5F3E] mb-6">Additional Services</h2>
      <p className="text-gray-600 mb-8">
        Enhance your spiritual journey with our premium services and support.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => {
          const Icon = service.icon;
          const isSelected = (formData.services || []).includes(service.id);

          return (
            <div
              key={service.id}
              onClick={() => toggleService(service.id)}
              className={`p-6 rounded-xl cursor-pointer transition-all ${
                isSelected
                  ? 'bg-[#2C5F3E] text-white'
                  : 'bg-white border-2 border-gray-200 hover:border-[#CBA95D]'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Icon
                    size={24}
                    className={isSelected ? 'text-[#CBA95D]' : 'text-[#2C5F3E]'}
                  />
                  <h3 className="text-lg font-semibold ml-3">{service.name}</h3>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isSelected
                      ? 'border-[#CBA95D] bg-[#CBA95D]'
                      : 'border-gray-300'
                  }`}
                >
                  {isSelected && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <p
                className={`mb-3 ${
                  isSelected ? 'text-gray-200' : 'text-gray-600'
                }`}
              >
                {service.description}
              </p>
              <p
                className={`text-sm font-semibold ${
                  isSelected ? 'text-[#CBA95D]' : 'text-[#2C5F3E]'
                }`}
              >
                {service.price}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-[#DDC6A4] bg-opacity-20 rounded-lg">
        <p className="text-sm text-[#00573F]">
          <strong>Note:</strong> All services can be customized based on your specific requirements.
          Our team will coordinate all arrangements for a seamless experience.
        </p>
      </div>
    </div>
  );
};

export default ServicesStep;