import React from 'react';
import { X, Volume2, HelpCircle } from 'lucide-react';
import { audioService } from '../services/audioService';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HELP_AUDIO_TEXT =
  'Hello sister. Using Aasha is very simple. ' +
  'First, tap the large microphone button in the center of the screen. ' +
  'When the green light pulses, speak your need or question clearly in your everyday words. ' +
  'Answer one question at a time. Aasha will listen, repeat back what you said to make sure she understood, and guide you to the right government scheme. ' +
  'At the end, you will receive an official Voice Welfare Passbook Card to take to your local Panchayat office. Please do not worry, take your time.';

export const HelpModal: React.FC<HelpModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handleReadHelp = () => {
    audioService.playChime('tap');
    audioService.speakText(HELP_AUDIO_TEXT);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border-4 border-amber-600 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900">
                How to use Aasha?
              </h3>
              <p className="text-xs text-stone-500">Audio Guide & Simple Steps</p>
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

        {/* Read aloud help button */}
        <div className="my-4">
          <button
            onClick={handleReadHelp}
            className="w-full py-3 px-4 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Volume2 className="w-5 h-5" />
            <span>Listen to Instructions (Voice)</span>
          </button>
        </div>

        {/* Steps */}
        <div className="space-y-3 text-stone-800 text-sm">
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-amber-50 border border-amber-200">
            <span className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
              1
            </span>
            <p className="leading-relaxed">
              <strong>Tap the big microphone orb:</strong> Speak when the green glowing wave turns on.
            </p>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-amber-50 border border-amber-200">
            <span className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
              2
            </span>
            <p className="leading-relaxed">
              <strong>Answer one question at a time:</strong> Mention what you need, such as a sewing machine, pension, or dairy cattle loan.
            </p>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-amber-50 border border-amber-200">
            <span className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
              3
            </span>
            <p className="leading-relaxed">
              <strong>Receive your Welfare Passbook Card:</strong> Aasha prepares your required paperwork checklist to present at your local Village Panchayat.
            </p>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-stone-200 text-center">
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
