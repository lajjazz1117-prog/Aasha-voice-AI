import React from 'react';
import { Volume2, MessageCircle } from 'lucide-react';
import { audioService } from '../services/audioService';

interface QuickVoiceChipsProps {
  suggestions: string[];
  onSelectSuggestion: (text: string) => void;
  disabled?: boolean;
}

export const QuickVoiceChips: React.FC<QuickVoiceChipsProps> = ({
  suggestions,
  onSelectSuggestion,
  disabled,
}) => {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 my-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs text-stone-600 font-semibold">
          <MessageCircle className="w-3.5 h-3.5 text-amber-700" />
          <span>Or tap one of these spoken phrases to reply:</span>
        </div>
        <span className="text-[11px] text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded-full font-medium">
          Voice Quick Replies
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {suggestions.map((phrase, idx) => (
          <button
            key={idx}
            disabled={disabled}
            onClick={() => {
              audioService.playChime('tap');
              onSelectSuggestion(phrase);
            }}
            className="group flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-stone-900 border-2 border-amber-300 hover:border-amber-400 shadow-sm transition-all text-sm font-semibold active:scale-95 text-left disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full bg-amber-200 group-hover:bg-amber-300 flex items-center justify-center shrink-0 text-amber-900">
              <Volume2 className="w-3.5 h-3.5" />
            </div>
            <span>"{phrase}"</span>
          </button>
        ))}
      </div>
    </div>
  );
};
