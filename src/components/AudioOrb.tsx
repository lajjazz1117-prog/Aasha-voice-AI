import React from 'react';
import { Mic, Volume2, RotateCw, VolumeX } from 'lucide-react';
import { audioService } from '../services/audioService';

interface AudioOrbProps {
  isListening: boolean;
  isSpeaking: boolean;
  isThinking: boolean;
  lastAashaReply?: string;
  interimTranscript?: string;
  onToggleMic: () => void;
  onRepeatAudio: () => void;
  onStopAudio: () => void;
}

export const AudioOrb: React.FC<AudioOrbProps> = ({
  isListening,
  isSpeaking,
  isThinking,
  lastAashaReply,
  interimTranscript,
  onToggleMic,
  onRepeatAudio,
  onStopAudio,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-6 px-4">
      {/* Central Visualizer & Orb Container */}
      <div className="relative flex items-center justify-center my-2">
        {/* Animated concentric rippling glow waves */}
        {isListening && (
          <>
            <div className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-emerald-500/20 animate-ping pointer-events-none" />
            <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-emerald-400/25 animate-pulse pointer-events-none" />
            <div className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full border-2 border-emerald-400/60 animate-spin pointer-events-none" />
          </>
        )}

        {isSpeaking && (
          <>
            <div className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-amber-400/20 animate-pulse pointer-events-none" />
            <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-orange-400/25 animate-ping pointer-events-none" />
          </>
        )}

        {isThinking && (
          <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border-4 border-dashed border-amber-500/60 animate-spin pointer-events-none" />
        )}

        {/* Ambient idle breathing ring */}
        {!isListening && !isSpeaking && !isThinking && (
          <div className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-amber-200/50 animate-pulse pointer-events-none" />
        )}

        {/* The Big Tactile Mic Orb Button */}
        <button
          onClick={onToggleMic}
          disabled={isThinking}
          aria-label={isListening ? 'Stop Listening' : 'Tap to Speak'}
          className={`relative z-10 w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-300 transform active:scale-95 cursor-pointer select-none border-4 ${
            isListening
              ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white border-emerald-200 shadow-emerald-400/50 scale-105 ring-8 ring-emerald-300/40'
              : isSpeaking
              ? 'bg-gradient-to-tr from-amber-500 to-orange-600 text-white border-amber-200 shadow-amber-500/50 scale-102 ring-8 ring-amber-300/30'
              : isThinking
              ? 'bg-gradient-to-tr from-amber-600 to-orange-700 text-white border-amber-300 opacity-90'
              : 'bg-gradient-to-tr from-amber-600 via-orange-600 to-red-600 text-white border-amber-200/90 shadow-orange-500/40 hover:shadow-orange-500/60 hover:scale-105 ring-4 ring-amber-300/40'
          }`}
        >
          {isListening ? (
            <>
              <Mic className="w-14 h-14 sm:w-16 sm:h-16 text-white animate-bounce mb-1" />
              <span className="text-xs sm:text-sm font-bold tracking-wide">Listening...</span>
            </>
          ) : isSpeaking ? (
            <>
              <div className="flex items-center gap-1.5 mb-2">
                <span className="w-2 h-7 bg-white rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-10 bg-white rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-6 bg-white rounded-full animate-bounce [animation-delay:300ms]" />
                <span className="w-2 h-9 bg-white rounded-full animate-bounce [animation-delay:450ms]" />
              </div>
              <span className="text-xs sm:text-sm font-bold">Speaking...</span>
            </>
          ) : isThinking ? (
            <>
              <RotateCw className="w-12 h-12 sm:w-14 sm:h-14 animate-spin text-amber-100 mb-1" />
              <span className="text-xs sm:text-sm font-medium">Thinking...</span>
            </>
          ) : (
            <>
              <Mic className="w-14 h-14 sm:w-16 sm:h-16 text-white mb-1 drop-shadow" />
              <span className="text-xs sm:text-sm font-bold tracking-wide text-amber-50">
                Tap to Speak
              </span>
            </>
          )}
        </button>
      </div>

      {/* Status Instruction Bar */}
      <div className="mt-4 text-center max-w-md px-4">
        {isListening ? (
          <div className="bg-emerald-100/90 text-emerald-900 border border-emerald-300 px-4 py-2 rounded-2xl shadow-sm animate-pulse">
            <p className="text-base sm:text-lg font-semibold">
              👂 I am listening, sister... please speak
            </p>
            {interimTranscript && (
              <p className="text-sm font-medium text-emerald-800 mt-1 italic">
                "{interimTranscript}"
              </p>
            )}
          </div>
        ) : isSpeaking ? (
          <div className="flex items-center justify-center gap-3">
            <div className="bg-amber-100/90 text-amber-950 border border-amber-300 px-4 py-2 rounded-2xl shadow-sm flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-amber-700 animate-pulse shrink-0" />
              <p className="text-sm sm:text-base font-semibold">
                Aasha is speaking to you... please listen
              </p>
            </div>
            <button
              onClick={() => {
                audioService.playChime('tap');
                onStopAudio();
              }}
              className="p-2.5 rounded-2xl bg-amber-200/80 hover:bg-amber-300 text-stone-800 border border-amber-400 text-xs font-semibold flex items-center gap-1 shadow-sm transition-all cursor-pointer"
              title="Stop voice"
            >
              <VolumeX className="w-4 h-4 text-amber-900" />
              <span>Stop</span>
            </button>
          </div>
        ) : isThinking ? (
          <div className="bg-amber-50 text-amber-900 border border-amber-200 px-4 py-2 rounded-2xl shadow-sm flex items-center justify-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-600 animate-ping" />
            <p className="text-sm sm:text-base font-medium">
              Aasha is preparing your answer... one moment, sister
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <p className="text-stone-700 text-sm sm:text-base font-medium">
              👉 Tap the microphone and tell me your need in your own words
            </p>

            {/* Repeat Audio Button */}
            {lastAashaReply && (
              <button
                onClick={() => {
                  audioService.playChime('tap');
                  onRepeatAudio();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 shadow-sm text-sm font-bold transition-all active:scale-95 cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-amber-700" />
                <span>Repeat What You Said (Listen Again)</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
