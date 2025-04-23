import React, { useState, useEffect } from 'react';
import { Compass, Users, Hotel, Bus, FileText } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Auth from './Auth';
import StepIndicator from './StepIndicator';
import DestinationStep from './steps/DestinationStep';
import TravelOptionsStep from './steps/TravelOptionsStep';
import AccommodationStep from './steps/AccommodationStep';
import ServicesStep from './steps/ServicesStep';
import SummaryStep from './steps/SummaryStep';
import GroupPlanning from './GroupPlanning';

const steps = [
  { id: 1, title: 'Destinations', icon: Compass },
  { id: 2, title: 'Travel', icon: Bus },
  { id: 3, title: 'Stay', icon: Hotel },
  { id: 4, title: 'Services', icon: Users },
  { id: 5, title: 'Summary', icon: FileText },
];

function Planner() {
  const [session, setSession] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    destinations: [],
    travelOption: '',
    stayPreference: '',
    services: [],
    groupSize: 1,
    groupMembers: [],
    startDate: null,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveTrip = async () => {
    try {
      const { data: tripData, error: tripError } = await supabase
        .from('trips')
        .insert([
          {
            user_id: session?.user?.id,
            destinations: formData.destinations,
            travel_option: formData.travelOption,
            stay_preference: formData.stayPreference,
            services: formData.services,
            group_size: formData.groupSize,
            start_date: formData.startDate,
          },
        ])
        .select()
        .single();

      if (tripError) throw tripError;

      if (formData.groupMembers?.length > 0) {
        const { error: membersError } = await supabase
          .from('trip_members')
          .insert(
            formData.groupMembers.map((member: any) => ({
              trip_id: tripData.id,
              email: member.email,
              name: member.name,
            }))
          );

        if (membersError) throw membersError;
      }

      alert('Trip saved successfully!');
    } catch (error: any) {
      alert('Error saving trip: ' + error.message);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <DestinationStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <TravelOptionsStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <AccommodationStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <ServicesStep formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <SummaryStep formData={formData} />;
      default:
        return null;
    }
  };

  if (!session) {
    return <Auth onAuthSuccess={() => {}} />;
  }

  return (
    <div className="min-h-screen bg-[#F1F1F1]">
      {/* Header */}
      <header className="bg-[#2C5F3E] text-white py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Char Dham Yatra Planner
          </h1>
          <p className="text-center mt-2 text-[#DDC6A4]">
            Plan your divine journey to the sacred temples
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <StepIndicator steps={steps} currentStep={currentStep} />
          
          <div className="mt-8">
            {renderStep()}
            {currentStep !== 5 && <GroupPlanning formData={formData} updateFormData={updateFormData} />}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className="px-6 py-2 rounded-lg bg-[#00573F] text-white hover:bg-[#2C5F3E] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <div className="flex gap-4">
              {currentStep === 5 && (
                <button
                  onClick={handleSaveTrip}
                  className="px-6 py-2 rounded-lg bg-[#2C5F3E] text-white hover:bg-[#1F4F2E] transition-colors"
                >
                  Save Trip
                </button>
              )}
              <button
                onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
                disabled={currentStep === 5}
                className="px-6 py-2 rounded-lg bg-[#CBA95D] text-white hover:bg-[#B89A4E] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {currentStep === 4 ? 'Review' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Planner;