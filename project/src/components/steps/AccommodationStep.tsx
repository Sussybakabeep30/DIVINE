import React from 'react';
import { Building2, Home, Tent } from 'lucide-react';

const accommodations = [
  {
    id: 'luxury',
    name: 'Luxury Hotels & Resorts',
    icon: Building2,
    description: 'Premium accommodations with modern amenities',
    features: [
      'Five-star facilities',
      'Spa & wellness centers',
      'Fine dining restaurants',
      'Mountain views',
    ],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800',
  },
  {
    id: 'retreat',
    name: 'Spiritual Retreats',
    icon: Home,
    description: 'Peaceful ashrams and meditation centers',
    features: [
      'Meditation halls',
      'Yoga facilities',
      'Vegetarian meals',
      'Spiritual atmosphere',
    ],
    image: 'https://images.unsplash.com/photo-1545158535-c3f7168c28b6?auto=format&fit=crop&w=800',
  },
  {
    id: 'dharamshala',
    name: 'Premium Dharamshalas',
    icon: Tent,
    description: 'Traditional stay with modern comfort',
    features: [
      'Clean rooms',
      'Temple proximity',
      'Community dining',
      'Cultural experience',
    ],
    image: 'https://images.unsplash.com/photo-1626015365107-476dee9fc575?auto=format&fit=crop&w=800',
  },
];

interface AccommodationStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const AccommodationStep: React.FC<AccommodationStepProps> = ({ formData, updateFormData }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#2C5F3E] mb-6">Select Your Stay</h2>
      <p className="text-gray-600 mb-8">
        Choose your preferred accommodation type for a comfortable spiritual journey.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accommodations.map((accommodation) => {
          const Icon = accommodation.icon;
          return (
            <div
              key={accommodation.id}
              onClick={() => updateFormData('stayPreference', accommodation.id)}
              className={`rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] ${
                formData.stayPreference === accommodation.id
                  ? 'ring-4 ring-[#CBA95D]'
                  : 'ring-1 ring-gray-200'
              }`}
            >
              <div className="relative h-48">
                <img
                  src={accommodation.image}
                  alt={accommodation.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40" />
                <div className="absolute top-4 left-4">
                  <Icon
                    size={24}
                    className="text-white"
                  />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#2C5F3E] mb-2">{accommodation.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{accommodation.description}</p>
                <ul className="space-y-2">
                  {accommodation.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#CBA95D] mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-[#DDC6A4] bg-opacity-20 rounded-lg">
        <p className="text-sm text-[#00573F]">
          <strong>Tip:</strong> All accommodations are carefully selected to ensure comfort and
          cleanliness while maintaining the spiritual essence of your pilgrimage.
        </p>
      </div>
    </div>
  );
};

export default AccommodationStep;