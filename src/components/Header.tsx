import React from 'react';
import { Volume2, VolumeX, RotateCcw, HelpCircle, Heart, Sparkles, UserCheck, FileText, Building2, Phone } from 'lucide-react';
import { audioService } from '../services/audioService';

interface HeaderProps {
  onOpenSchemes: () => void;
  onOpenDocuments: () => void;
  onOpenKendra: () => void;
  onOpenHelplines: () => void;
  isSlowVoice: boolean;
  onToggleSlowVoice: () => void;
  onReset: () => void;
  onOpenHelp: () => void;
  onOpenPersonas: () => void;
  userVillage?: string;
  userName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSchemes,
  onOpenDocuments,
  onOpenKendra,
  onOpenHelplines,
  isSlowVoice,
  onToggleSlowVoice,
  onReset,
  onOpenHelp,
  onOpenPersonas,
  userName,
  userVillage,
}) => {
  return (
    <header className="w-full bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-white shadow-md border-b-4 border-amber-600">
      <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg border-2 border-amber-200 shrink-0">
            <span className="text-2xl sm:text-3xl select-none" role="img" aria-label="Aasha">
              🪔
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-amber-100 font-['Outfit',sans-serif]">
                Aasha (Hope)
              </h1>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-700/80 text-amber-200 border border-amber-500/40">
                Sister Companion
              </span>
            </div>
            <p className="text-xs sm:text-sm text-amber-200/90 font-medium">
              Voice AI Companion for Government Welfare Schemes
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Slow Voice Toggle */}
          <button
            onClick={() => {
              audioService.playChime('tap');
              onToggleSlowVoice();
            }}
            title={isSlowVoice ? 'Gentle Slow Voice (Active)' : 'Speak Slower for Better Understanding'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-sm cursor-pointer ${
              isSlowVoice
                ? 'bg-amber-500 text-stone-950 font-bold ring-2 ring-amber-300'
                : 'bg-amber-900/80 hover:bg-amber-800 text-amber-200 border border-amber-700'
            }`}
          >
            <span>🐢</span>
            <span className="hidden sm:inline">
              {isSlowVoice ? 'Slow Pace (On)' : 'Speak Slower'}
            </span>
          </button>

          {/* Help button */}
          <button
            onClick={() => {
              audioService.playChime('tap');
              onOpenHelp();
            }}
            className="p-2 rounded-xl bg-amber-900/70 hover:bg-amber-800 text-amber-200 border border-amber-700 transition-all cursor-pointer"
            title="Help & Audio Guide"
            aria-label="Help"
          >
            <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
          </button>

          {/* Restart */}
          <button
            onClick={() => {
              audioService.playChime('tap');
              onReset();
            }}
            className="p-2 rounded-xl bg-amber-900/70 hover:bg-amber-800 text-amber-200 border border-amber-700 transition-all cursor-pointer"
            title="Start New Conversation"
            aria-label="Start New Conversation"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Feature Action Bar */}
      <div className="bg-amber-950/80 border-t border-amber-800/80 py-1.5 px-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Scheme Catalog */}
            <button
              onClick={() => {
                audioService.playChime('tap');
                onOpenSchemes();
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-800/90 hover:bg-amber-700 text-amber-100 border border-amber-600 transition-all shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Welfare Schemes</span>
            </button>

            {/* Document Readiness */}
            <button
              onClick={() => {
                audioService.playChime('tap');
                onOpenDocuments();
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-800/90 hover:bg-amber-700 text-amber-100 border border-amber-600 transition-all shrink-0 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-amber-300" />
              <span>Document Checker</span>
            </button>

            {/* Village Kendra Guide */}
            <button
              onClick={() => {
                audioService.playChime('tap');
                onOpenKendra();
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-800/90 hover:bg-amber-700 text-amber-100 border border-amber-600 transition-all shrink-0 cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-300" />
              <span>Panchayat Guide</span>
            </button>

            {/* Helplines */}
            <button
              onClick={() => {
                audioService.playChime('tap');
                onOpenHelplines();
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-900/80 hover:bg-rose-800 text-rose-100 border border-rose-700 transition-all shrink-0 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-rose-300" />
              <span>Helpline 181</span>
            </button>
          </div>

          {/* Test Scenarios */}
          <button
            onClick={() => {
              audioService.playChime('tap');
              onOpenPersonas();
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-700/80 hover:bg-amber-600 text-amber-100 border border-amber-500 transition-all shrink-0 cursor-pointer"
          >
            <span>👩‍🌾 Sample Stories</span>
          </button>
        </div>
      </div>

      {/* User Status Bar if recognized */}
      {(userName || userVillage) && (
        <div className="bg-amber-950 py-1 px-4 border-t border-amber-800 text-xs text-amber-300 flex items-center justify-center gap-3">
          <UserCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>
            Beneficiary: <strong className="text-white">{userName || 'Sister'}</strong>
            {userVillage && <span> ({userVillage})</span>}
          </span>
        </div>
      )}
    </header>
  );
};
