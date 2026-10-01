import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { audioService } from '../services/audioService';

interface GuidedPersonasModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPersona: (persona: {
    name: string;
    village: string;
    need: string;
    openingSpeech: string;
  }) => void;
}

const ENGLISH_PERSONAS = [
  {
    id: 'lakshmi',
    name: 'Lakshmi Devi',
    age: '38 years',
    village: 'Rampur Village',
    need: 'Wants a sewing machine to stitch clothes and support children education',
    openingSpeech: 'Namaste Sister, my name is Lakshmi. I know tailoring and sewing, but I do not have my own machine. Is there any government scheme to help me get a free sewing machine?',
    icon: '🧵',
  },
  {
    id: 'saraswathi',
    name: 'Saraswathi Amma',
    age: '64 years',
    village: 'Kalyanpur Village',
    need: 'Living alone, needs monthly old age or widow social security pension',
    openingSpeech: 'Namaste Sister, I am Saraswathi. I am 64 years old and living alone. How can I apply for the monthly government senior pension?',
    icon: '👵',
  },
  {
    id: 'ramadevi',
    name: 'Ramadevi',
    age: '34 years',
    village: 'Sundarpur Village',
    need: 'Self-Help Group (SHG) member wanting to purchase dairy cattle',
    openingSpeech: 'Namaste Sister, I am a member of our village women savings group. I want to buy a milch cow to sell milk. Is there a government subsidy loan available?',
    icon: '🐄',
  },
];

export const GuidedPersonasModal: React.FC<GuidedPersonasModalProps> = ({
  isOpen,
  onClose,
  onSelectPersona,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border-4 border-amber-600 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👩‍🌾</span>
            <div>
              <h3 className="text-lg font-bold text-stone-900">
                Sample Beneficiary Stories
              </h3>
              <p className="text-xs text-stone-500">
                Select a story to test speech simulation with one click
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              audioService.playChime('tap');
              onClose();
            }}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Persona list */}
        <div className="space-y-3.5 my-4 max-h-[60vh] overflow-y-auto pr-1">
          {ENGLISH_PERSONAS.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-2xl bg-amber-50/70 hover:bg-amber-100/70 border-2 border-amber-200 hover:border-amber-400 transition-all text-left group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <h4 className="text-base font-bold text-amber-950">
                      {p.name}
                    </h4>
                    <span className="text-xs text-amber-800">
                      {p.age} • {p.village}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 font-medium mb-3 bg-white/70 p-2.5 rounded-xl border border-amber-100">
                "{p.openingSpeech}"
              </p>

              <button
                onClick={() => {
                  audioService.playChime('success');
                  onSelectPersona({
                    name: p.name.split(' ')[0],
                    village: p.village,
                    need: p.need,
                    openingSpeech: p.openingSpeech,
                  });
                  onClose();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>Speak as {p.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
