import React from 'react';
import { HeaterIcon as Helicopter, Car, PersonStanding, Users as Horse } from 'lucide-react';

const travelOptions = [
  {
    id: 'helicopter',
    name: 'Luxury Helicopter',
    icon: Helicopter,
    description: 'VIP travel with stunning aerial views',
    features: ['Time-efficient', 'Panoramic views', 'Luxury service'],
  },
  {
    id: 'car',
    name: 'Premium Car Service',
    icon: Car,
    description: 'Comfortable SUVs with experienced drivers',
    features: ['Chauffeur-driven', 'Flexible stops', 'Air-conditioned'],
  },
  {
    id: 'trek',
    name: 'Guided Trekking',
    icon: PersonStanding,
    description: 'Spiritual journey on foot with support',
    features: ['Porter support', 'Expert guides', 'Traditional route'],
  },
  {
    id: 'horse',
    name: 'Traditional Mount',
    icon: Horse,
    description: 'Travel by horse/mule with handlers',
    features: ['Traditional experience', 'Guided service', 'Rest stops'],
  },
];

interface TravelOptionsStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const TravelOptionsStep: React.FC<TravelOptionsStepProps> = ({ formData, updateFormData }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#2C5F3E] mb-6">Choose Your Travel Mode</h2>
      <p className="text-gray-600 mb-8">
        Select your preferred mode of transportation for this sacred journey.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {travelOptions.map((option) => {
          const Icon = option.icon;
          return (
            <div
              key={option.id}
              onClick={() => updateFormData('travelOption', option.id)}
              className={`p-6 rounded-xl cursor-pointer transition-all ${
                formData.travelOption === option.id
                  ? 'bg-[#2C5F3E] text-white'
                  : 'bg-white border-2 border-gray-200 hover:border-[#CBA95D]'
              }`}
            >
              <div className="flex items-center mb-4">
                <Icon
                  size={32}
                  className={formData.travelOption === option.id ? 'text-[#CBA95D]' : 'text-[#2C5F3E]'}
                />
                <h3 className="text-xl font-semibold ml-4">{option.name}</h3>
              </div>
              <p
                className={`mb-4 ${
                  formData.travelOption === option.id ? 'text-gray-200' : 'text-gray-600'
                }`}
              >
                {option.description}
              </p>
              <ul className="space-y-2">
                {option.features.map((feature, index) => (
                  <li
                    key={index}
                    className={`flex items-center ${
                      formData.travelOption === option.id ? 'text-gray-200' : 'text-gray-600'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CBA95D] mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-[#DDC6A4] bg-opacity-20 rounded-lg">
        <p className="text-sm text-[#00573F]">
          <strong>Note:</strong> Each travel option is carefully curated to provide a comfortable and
          meaningful journey. Our team ensures safety and reliability across all modes of transport.
        </p>
      </div>
    </div>
  );
};

export default TravelOptionsStep;