import React, { useState } from 'react';
import { Modal } from './Modal';
import { X } from 'lucide-react';

interface ModalDemoProps {
  title?: string;
  className?: string;
}

export const ModalDemo: React.FC<ModalDemoProps> = ({
  title = "Modal Component Demo",
  className = "",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLayout, setModalLayout] = useState<'center' | 'sidebar-right' | 'sidebar-left' | 'bottom'>('center');

  const layouts = [
    { name: 'Center Modal', layout: 'center' as const, color: 'blue' },
    { name: 'Right Sidebar', layout: 'sidebar-right' as const, color: 'green' },
    { name: 'Left Sidebar', layout: 'sidebar-left' as const, color: 'purple' },
    { name: 'Bottom Sheet', layout: 'bottom' as const, color: 'orange' },
  ];

  return (
    <div className={`min-h-screen bg-gray-100 p-8 ${className}`}>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-6">{title}</h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {layouts.map(({ name, layout, color }) => (
              <button
                key={layout}
                onClick={() => {
                  setModalLayout(layout);
                  setIsModalOpen(true);
                }}
                className={`px-4 py-2 bg-${color}-600 text-white rounded-lg hover:bg-${color}-700 transition-colors`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        layout={modalLayout}
        theme="glass"
        backdropImage="https://images.unsplash.com/photo-1579546929518-9e396f3cc809"
        blurIntensity={10}
        closeIcon={<X className="w-6 h-6 text-red-500" />}
      >
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Welcome to our Modal!</h2>
          
          <p className="text-gray-600">
            This is a fully featured modal component with:
          </p>
          
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Multiple layout options (center, sidebar, bottom sheet)</li>
            <li>Customizable themes (light, dark, glass)</li>
            <li>Backdrop blur effect with optional background image</li>
            <li>Smooth animations using Framer Motion</li>
            <li>Close on escape key or outside click</li>
            <li>Customizable close button icon</li>
            <li>Fully responsive design</li>
          </ul>

          <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg" />
          
          <p className="text-gray-600">
            Scroll to see more content if needed. The modal will handle overflow automatically!
          </p>
          
          <div className="h-40 bg-gradient-to-r from-green-500 to-yellow-500 rounded-lg" />
        </div>
      </Modal>
    </div>
  );
};