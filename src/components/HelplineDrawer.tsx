import React from 'react';
import { X, Phone, Volume2, ShieldCheck } from 'lucide-react';
import { audioService } from '../services/audioService';

interface HelplineDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EnglishHelpline {
  number: string;
  name: string;
  desc: string;
  icon: string;
}

const ENGLISH_HELPLINES: EnglishHelpline[] = [
  {
    number: '181',
    icon: '🛡️',
    name: 'National Women Helpline',
    desc: '24x7 toll-free helpline providing immediate emergency support, counseling, legal guidance, and welfare assistance for women in distress.',
  },
  {
    number: '1902',
    icon: '🏛️',
    name: 'Citizen Grievance & Scheme Delay Helpline',
    desc: 'Call this official government helpline if your pension, ration card, or welfare scheme application faces any undue delay or problem.',
  },
  {
    number: '14400',
    icon: '⚖️',
    name: 'Anti-Corruption Toll-Free Helpline',
    desc: 'All government welfare schemes are 100% free of cost! If anyone demands money, gifts, or a bribe for your application, call 14400 immediately.',
  },
];

export const HelplineDrawer: React.FC<HelplineDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handleListenHelpline = (item: EnglishHelpline) => {
    audioService.playChime('tap');
    const audioText = `${item.name}, toll-free number ${item.number}. ${item.desc}`;
    audioService.speakText(audioText);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl p-5 sm:p-7 shadow-2xl border-4 border-amber-600 relative overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900">
                Government Welfare Helplines
              </h3>
              <p className="text-xs text-stone-500">24x7 Toll-Free Assistance Numbers</p>
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

        {/* Anti corruption reassurance banner */}
        <div className="my-3 p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex items-center gap-3 shrink-0">
          <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0" />
          <p className="text-xs sm:text-sm font-bold leading-tight">
            Government welfare schemes are 100% free! Never pay any bribes or middlemen fees.
          </p>
        </div>

        {/* Helplines List */}
        <div className="space-y-3.5 my-2 overflow-y-auto pr-1 flex-1">
          {ENGLISH_HELPLINES.map((item) => (
            <div
              key={item.number}
              className="p-4 rounded-2xl bg-stone-50 border-2 border-stone-200 hover:border-amber-400 transition-all text-left"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="text-base font-bold text-stone-900">{item.name}</h4>
                    <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                      Toll-Free: {item.number}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleListenHelpline(item)}
                  className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                  title="Listen"
                >
                  <Volume2 className="w-4 h-4 text-amber-800" />
                  <span className="hidden sm:inline">Listen</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed mb-3">
                {item.desc}
              </p>

              <a
                href={`tel:${item.number}`}
                className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all text-center"
              >
                <Phone className="w-4 h-4" />
                <span>Call {item.number} (Toll-Free)</span>
              </a>
            </div>
          ))}
        </div>

        {/* Close */}
        <div className="pt-3 border-t border-stone-200 text-center shrink-0">
          <button
            onClick={() => {
              audioService.stopSpeaking();
              onClose();
            }}
            className="py-2 px-6 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
