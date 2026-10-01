import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { Step } from '../types';
import { audioService } from '../services/audioService';

interface StepTrackerProps {
  currentStep: Step;
}

interface StepItem {
  key: string;
  label: string;
  description: string;
}

const STEPS: StepItem[] = [
  { key: 'greeting', label: 'Greeting', description: 'Sister Introduction' },
  { key: 'need', label: 'Your Need', description: 'Tell what help you need' },
  { key: 'scheme', label: 'Scheme Match', description: 'Finding the right welfare scheme' },
  { key: 'details', label: 'Details', description: 'Confirming your name & village' },
  { key: 'card', label: 'Welfare Card', description: 'Application pass ready' },
];

export const StepTracker: React.FC<StepTrackerProps> = ({ currentStep }) => {
  const getStepIndex = (step: Step): number => {
    switch (step) {
      case 'greeting':
        return 0;
      case 'listening_need':
      case 'confirming_need':
        return 1;
      case 'collecting_name':
      case 'collecting_location':
      case 'checking_eligibility':
        return 2;
      case 'confirming_documents':
      case 'scheme_selected':
        return 3;
      case 'ready_for_application':
        return 4;
      default:
        return 0;
    }
  };

  const currentIndex = getStepIndex(currentStep);

  const handleStepAudio = (step: StepItem, idx: number) => {
    audioService.playChime('tap');
    audioService.speakText(`Step ${idx + 1}: ${step.label}. ${step.description}.`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 my-2">
      <div className="bg-amber-100/70 border border-amber-300 rounded-2xl p-3 sm:p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Application Progress:</span>
          </div>
          <span className="text-xs font-bold text-amber-800">
            Step {currentIndex + 1} of 5
          </span>
        </div>

        {/* Step dots line */}
        <div className="flex items-center justify-between relative">
          {/* Connector bar */}
          <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-1 bg-amber-200 z-0" />
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2 h-1 bg-amber-600 z-0 transition-all duration-500"
            style={{ width: `${(currentIndex / (STEPS.length - 1)) * 90}%` }}
          />

          {STEPS.map((s, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;

            return (
              <button
                key={s.key}
                onClick={() => handleStepAudio(s, idx)}
                className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
                title={`${s.label}: ${s.description}`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                    isCompleted
                      ? 'bg-amber-700 text-white'
                      : isCurrent
                      ? 'bg-orange-600 text-white ring-4 ring-orange-200 scale-110 animate-pulse'
                      : 'bg-white text-stone-400 border-2 border-amber-300'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                </div>
                <span
                  className={`text-[10px] sm:text-xs font-semibold mt-1 hidden sm:block ${
                    isCurrent ? 'text-amber-950 font-bold' : 'text-stone-600'
                  }`}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
