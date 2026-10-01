import React from 'react';
import { Volume2, HeartHandshake, User } from 'lucide-react';
import { ChatMessage } from '../types';
import { audioService } from '../services/audioService';

interface AashaDialogueBoxProps {
  messages: ChatMessage[];
  currentAashaMessage?: ChatMessage;
  onPlayMessage: (msg: ChatMessage) => void;
  isSpeaking: boolean;
}

export const AashaDialogueBox: React.FC<AashaDialogueBoxProps> = ({
  messages,
  currentAashaMessage,
  onPlayMessage,
  isSpeaking,
}) => {
  if (!currentAashaMessage && messages.length === 0) {
    return null;
  }

  const activeMessage = currentAashaMessage || messages.filter((m) => m.role === 'aasha').slice(-1)[0];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 my-2">
      {/* Featured Main Aasha Caring Response Card */}
      {activeMessage && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-lg border-2 border-amber-300 relative overflow-hidden transition-all duration-300">
          {/* Subtle warm decorative top accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />

          {/* Speaker label & Audio Replay Button */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-white shadow-sm border border-amber-200">
                <span className="text-xl" role="img" aria-label="Aasha">🪔</span>
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-amber-950">
                  Aasha (Sister Companion)
                </h2>
                <span className="text-xs text-amber-700 font-medium">Your Caring Welfare Guide</span>
              </div>
            </div>

            <button
              onClick={() => {
                audioService.playChime('tap');
                onPlayMessage(activeMessage);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs sm:text-sm font-bold border border-amber-300 shadow-sm transition-all active:scale-95 cursor-pointer"
              title="Listen to Aasha's voice"
            >
              <Volume2 className="w-4 h-4 text-amber-700" />
              <span>Listen</span>
            </button>
          </div>

          {/* Large, clear, warm speech text */}
          <div className="my-2">
            <p className="text-lg sm:text-2xl leading-relaxed sm:leading-loose text-stone-900 font-semibold">
              "{activeMessage.text}"
            </p>
          </div>

          {/* Soft reassurance tag */}
          <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-xs text-amber-800">
            <div className="flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-amber-600" />
              <span>Speak without fear or hesitation, I am right here with you</span>
            </div>
            <span className="text-amber-600/70 hidden sm:inline">Tap the mic anytime to reply</span>
          </div>
        </div>
      )}

      {/* Recent exchange snippet (last user input if any) */}
      {messages.length > 1 && (
        <div className="mt-3 px-2 flex flex-col gap-2">
          {messages.slice(-3, -1).map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2 p-2.5 rounded-2xl text-xs sm:text-sm ${
                msg.role === 'user'
                  ? 'bg-orange-50 text-stone-800 border border-orange-200 ml-auto max-w-[85%]'
                  : 'bg-stone-50 text-stone-700 border border-stone-200 mr-auto max-w-[85%]'
              }`}
            >
              {msg.role === 'user' ? (
                <User className="w-4 h-4 text-orange-600 mt-0.5 shrink-0" />
              ) : (
                <span className="text-sm mt-0.5 shrink-0">🪔</span>
              )}
              <div className="flex-1">
                <span className="font-bold mr-1">
                  {msg.role === 'user' ? 'You:' : 'Aasha:'}
                </span>
                <span>{msg.text}</span>
              </div>
              <button
                onClick={() => onPlayMessage(msg)}
                className="p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
                title="Listen"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
