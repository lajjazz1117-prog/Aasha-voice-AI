import React from 'react';
import { X, Building2, Volume2, MapPin } from 'lucide-react';
import { audioService } from '../services/audioService';

interface VillageKendraLocatorProps {
  isOpen: boolean;
  userVillage?: string;
  onClose: () => void;
}

export const VillageKendraLocator: React.FC<VillageKendraLocatorProps> = ({
  isOpen,
  userVillage,
  onClose,
}) => {
  if (!isOpen) return null;

  const steps = [
    {
      icon: '🏛️',
      title: 'Where should you go?',
      desc: 'Visit your local Village Panchayat Office (Grama Sachivalayam) or Common Service Centre (CSC).',
    },
    {
      icon: '👤',
      title: 'Who should you ask for?',
      desc: 'Ask for the Village Welfare & Education Assistant, Panchayat Secretary, or CSC Operator.',
    },
    {
      icon: '⏰',
      title: 'Office Timings',
      desc: 'Open Monday to Saturday from 10:00 AM to 5:00 PM.',
    },
    {
      icon: '🆓',
      title: 'Application Charges',
      desc: 'This is 100% Free! Government welfare scheme registration is completely free. Never pay any fee or bribe.',
    },
  ];

  const speechScript =
    'Namaste, I have brought my Aasha Welfare Advisory Passbook with my Aadhaar card and documents. Please verify my details and register my free application.';

  const handleReadAll = () => {
    audioService.playChime('tap');
    const fullText = `Village Panchayat and Service Centre Guide. Where to go: Visit your local Village Panchayat or CSC. Who to ask for: The Welfare Assistant or Panchayat Secretary. Timings: 10 AM to 5 PM. It is 100% free of cost. What to say: ${speechScript}`;
    audioService.speakText(fullText);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl p-5 sm:p-7 shadow-2xl border-4 border-amber-600 relative overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-700 text-white flex items-center justify-center shadow-md">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900">
                Panchayat & Kendra Guide
              </h3>
              <p className="text-xs text-stone-500">Where to go & who to meet in your village</p>
            </div>
          </div>
          <button
            onClick={() => {
              audioService.stopSpeaking();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Read aloud button */}
        <div className="my-3 shrink-0">
          <button
            onClick={handleReadAll}
            className="w-full py-3 px-4 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Volume2 className="w-5 h-5" />
            <span>Listen to Directions (Voice)</span>
          </button>
        </div>

        {/* User Village Banner if known */}
        {userVillage && (
          <div className="mb-3 p-2.5 rounded-xl bg-amber-100/70 text-amber-950 text-xs font-semibold flex items-center gap-2 shrink-0 border border-amber-300">
            <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Your Designated Office: <strong>{userVillage}</strong> Panchayat</span>
          </div>
        )}

        {/* Guide Steps */}
        <div className="space-y-2.5 overflow-y-auto pr-1 flex-1">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3"
            >
              <span className="text-2xl mt-0.5">{step.icon}</span>
              <div>
                <h4 className="text-sm font-bold text-amber-950">{step.title}</h4>
                <p className="text-xs text-stone-700 mt-0.5 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}

          {/* What to say speech bubble */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-300">
            <h4 className="text-xs font-bold text-emerald-950 flex items-center gap-1.5 mb-1">
              <span>💬</span>
              <span>What should you say to the officer?</span>
            </h4>
            <p className="text-xs text-emerald-900 italic font-medium leading-relaxed bg-white/70 p-2.5 rounded-xl border border-emerald-200">
              "{speechScript}"
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-stone-200 text-center shrink-0">
          <button
            onClick={() => {
              audioService.stopSpeaking();
              onClose();
            }}
            className="py-2 px-6 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs cursor-pointer"
          >
            Understood (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
