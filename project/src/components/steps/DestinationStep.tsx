import React from 'react';
import { MapPin } from 'lucide-react';

const destinations = [
  {
    id: 'yamunotri',
    name: 'Yamunotri',
    image: 'https://tsms.b-cdn.net/tsms/staging/dham_details_config/dham_details_config_gallery_section-110320251247474954.jpg',
    description: 'The source of the Yamuna River and seat of Goddess Yamuna',
  },
  {
    id: 'gangotri',
    name: 'Gangotri',
    image: 'https://tsms.b-cdn.net/tsms/staging/dham_details_config/dham_details_config_gallery_section-110320251339352616.jpg',
    description: 'Origin of the holy River Ganges and shrine of Goddess Ganga',
  },
  {
    id: 'kedarnath',
    name: 'Kedarnath',
    image: 'https://tsms.b-cdn.net/tsms/staging/dham_details_config/dham_details_config_gallery_section-110320251409017503.jpg',
    description: 'Ancient temple dedicated to Lord Shiva in the Himalayas',
  },
  {
    id: 'badrinath',
    name: 'Badrinath',
    image: 'https://tsms.b-cdn.net/tsms/staging/dham_details_config/dham_details_config_gallery_section-110320251351095427.jpg',
    description: 'Sacred shrine of Lord Vishnu nestled in the Garhwal hills',
  },
];

interface DestinationStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const DestinationStep: React.FC<DestinationStepProps> = ({ formData, updateFormData }) => {
  const toggleDestination = (id: string) => {
    const current = formData.destinations || [];
    if (current.includes(id)) {
      updateFormData('destinations', current.filter((d: string) => d !== id));
    } else {
      updateFormData('destinations', [...current, id]);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#2C5F3E] mb-6">Select Your Sacred Destinations</h2>
      <p className="text-gray-600 mb-8">
        Choose which holy temples you wish to visit during your spiritual journey.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            onClick={() => toggleDestination(destination.id)}
            className={`relative rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] ${
              formData.destinations?.includes(destination.id)
                ? 'ring-4 ring-[#CBA95D]'
                : 'ring-1 ring-gray-200'
            }`}
          >
            <div className="relative h-48">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  <h3 className="text-xl font-semibold">{destination.name}</h3>
                </div>
                <p className="mt-1 text-sm text-gray-200">{destination.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-[#DDC6A4] bg-opacity-20 rounded-lg">
        <p className="text-sm text-[#00573F]">
          <strong>Tip:</strong> For the most complete spiritual experience, we recommend visiting all
          four dhams. However, you can customize your journey based on your time and preferences.
        </p>
      </div>
    </div>
  );
};

export default DestinationStep;