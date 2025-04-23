import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  icon: LucideIcon;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-between items-center">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;

        return (
          <React.Fragment key={step.id}>
            {/* Step */}
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isActive
                    ? 'bg-[#CBA95D] text-white'
                    : isCompleted
                    ? 'bg-[#2C5F3E] text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                <Icon size={24} />
              </div>
              <span
                className={`mt-2 text-sm font-medium ${
                  isActive ? 'text-[#CBA95D]' : isCompleted ? 'text-[#2C5F3E]' : 'text-gray-500'
                }`}
              >
                {step.title}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-4 rounded ${
                  step.id < currentStep ? 'bg-[#2C5F3E]' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepIndicator;