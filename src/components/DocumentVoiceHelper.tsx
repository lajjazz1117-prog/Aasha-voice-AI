import React, { useState } from 'react';
import { Volume2, CheckCircle2, Circle, Camera, Sparkles, AlertCircle, X } from 'lucide-react';
import { audioService } from '../services/audioService';

interface DocumentVoiceHelperProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DocGuide {
  id: string;
  icon: string;
  title: string;
  explanation: string;
  tip: string;
}

const ENGLISH_DOCS: DocGuide[] = [
  {
    id: 'aadhaar',
    icon: '🪪',
    title: 'Aadhaar Card',
    explanation: 'Your original Aadhaar card is required as your primary proof of identity, age, and home address. Keep one clear photocopy with you.',
    tip: 'Ensure your full name, date of birth, and 12-digit Aadhaar number are clearly legible.',
  },
  {
    id: 'ration',
    icon: '🍚',
    title: 'Ration Card / Food Security Card',
    explanation: 'Proves your household income eligibility for government subsidies and livelihood welfare schemes.',
    tip: 'Take a photocopy of the page showing your family member details and your name.',
  },
  {
    id: 'bank',
    icon: '🏦',
    title: 'Bank Account Passbook',
    explanation: 'Required for Direct Benefit Transfer (DBT). The government grant or pension is deposited straight into your bank account.',
    tip: 'The front page must clearly display your account number, bank branch, and IFSC code.',
  },
  {
    id: 'photos',
    icon: '📷',
    title: '2 Passport-Size Color Photographs',
    explanation: 'Recent passport-size color photographs to affix to the paper application form and beneficiary identity pass.',
    tip: 'Clear front-facing color photos with good lighting.',
  },
];

export const DocumentVoiceHelper: React.FC<DocumentVoiceHelperProps> = ({
  isOpen,
  onClose,
}) => {
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({
    aadhaar: true,
  });
  const [simulatedScanDoc, setSimulatedScanDoc] = useState<DocGuide | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleToggleDoc = (id: string) => {
    audioService.playChime('tap');
    setCheckedDocs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleListenDoc = (doc: DocGuide) => {
    audioService.playChime('tap');
    const fullAudio = `${doc.title}. ${doc.explanation} Important tip: ${doc.tip}`;
    audioService.speakText(fullAudio);
  };

  const handleSimulateScan = (doc: DocGuide) => {
    audioService.playChime('tap');
    setSimulatedScanDoc(doc);
    setIsScanning(true);
    setScanResult(null);

    audioService.speakText('Checking your document clarity... please hold steady.');

    setTimeout(() => {
      setIsScanning(false);
      const verifiedMessage = `Wonderful! Your ${doc.title} is clearly legible. The photo and details match your identity.`;
      setScanResult(verifiedMessage);
      setCheckedDocs((prev) => ({ ...prev, [doc.id]: true }));
      audioService.playChime('success');
      audioService.speakText(verifiedMessage);
    }, 2000);
  };

  const readyCount = Object.values(checkedDocs).filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-3xl p-5 sm:p-7 shadow-2xl border-4 border-amber-600 relative overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md">
              <span className="text-2xl">📋</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900">Document Readiness Checker</h3>
              <p className="text-xs text-stone-500">Listen to audio guidance on required paperwork</p>
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

        {/* Readiness progress bar */}
        <div className="my-3 p-3 rounded-2xl bg-amber-50 border border-amber-200 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span className="text-xs sm:text-sm font-bold text-amber-950">
              Documents Ready: {readyCount} of {ENGLISH_DOCS.length}
            </span>
          </div>
          <button
            onClick={() => {
              const allDocsText = ENGLISH_DOCS.map(
                (d) => `${d.title}: ${d.explanation}`
              ).join(' ');
              audioService.speakText(allDocsText);
            }}
            className="flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-200/80 hover:bg-amber-300 px-3 py-1.5 rounded-full transition-all cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Listen to All Requirements</span>
          </button>
        </div>

        {/* Camera simulation banner if active */}
        {simulatedScanDoc && (
          <div className="my-2 p-3 rounded-2xl bg-teal-50 border-2 border-teal-400 text-teal-950 shrink-0 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-teal-700 animate-pulse" />
                <span className="text-xs font-bold">
                  Camera Check: {simulatedScanDoc.title}
                </span>
              </div>
              <button
                onClick={() => setSimulatedScanDoc(null)}
                className="text-teal-700 hover:text-teal-900 text-xs font-bold"
              >
                ✕
              </button>
            </div>
            {isScanning ? (
              <p className="text-xs mt-1 animate-pulse">
                🔍 Inspecting document sharpness and readability...
              </p>
            ) : (
              scanResult && (
                <p className="text-xs mt-1 font-semibold text-emerald-800">
                  ✓ {scanResult}
                </p>
              )
            )}
          </div>
        )}

        {/* Document list */}
        <div className="space-y-3 my-2 overflow-y-auto pr-1 flex-1">
          {ENGLISH_DOCS.map((doc) => {
            const isChecked = Boolean(checkedDocs[doc.id]);

            return (
              <div
                key={doc.id}
                className={`p-3.5 rounded-2xl border-2 transition-all ${
                  isChecked
                    ? 'bg-amber-50/60 border-amber-400 shadow-xs'
                    : 'bg-stone-50 border-stone-200 hover:border-amber-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => handleToggleDoc(doc.id)}
                      className="cursor-pointer text-amber-700 hover:scale-110 transition-all"
                      title="Mark as ready"
                    >
                      {isChecked ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                      ) : (
                        <Circle className="w-6 h-6 text-stone-400" />
                      )}
                    </button>
                    <span className="text-2xl">{doc.icon}</span>
                    <h4 className="text-sm sm:text-base font-bold text-stone-900">
                      {doc.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleListenDoc(doc)}
                      className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                      title="Listen"
                    >
                      <Volume2 className="w-4 h-4 text-amber-700" />
                      <span className="hidden sm:inline">Listen</span>
                    </button>

                    <button
                      onClick={() => handleSimulateScan(doc)}
                      className="p-2 rounded-xl bg-teal-100 hover:bg-teal-200 text-teal-900 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                      title="Camera Check"
                    >
                      <Camera className="w-4 h-4 text-teal-700" />
                      <span className="hidden sm:inline">Check</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed pl-8">
                  {doc.explanation}
                </p>

                <div className="mt-2 pl-8 text-[11px] text-amber-800 bg-amber-100/50 p-2 rounded-xl border border-amber-200/60 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                  <span>{doc.tip}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 shrink-0">
          <span>Carry photocopies of these documents to the Panchayat office</span>
          <button
            onClick={() => {
              audioService.stopSpeaking();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-amber-700 text-white font-bold hover:bg-amber-800 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
