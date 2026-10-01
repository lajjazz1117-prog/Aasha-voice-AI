import React from 'react';
import { Volume2, CheckCircle2, FileText, MapPin, Award, User, Printer, Sparkles, Building2, Share2, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types';
import { audioService } from '../services/audioService';

interface VoicePassbookCardProps {
  profile: UserProfile;
  onReadCardAloud: () => void;
  isSpeaking: boolean;
}

export const VoicePassbookCard: React.FC<VoicePassbookCardProps> = ({
  profile,
  onReadCardAloud,
  isSpeaking,
}) => {
  const schemeName = profile.schemeName || 'PM Vishwakarma Free Sewing Machine Scheme';
  const schemeBenefit =
    profile.schemeBenefit ||
    '₹15,000 Free Sewing Machine Grant + 5 Days Free Training + ₹500 Daily Stipend';
  const beneficiaryName = profile.name || 'Rural Sister';
  const villageLocation =
    profile.village || profile.mandal
      ? `${profile.village || ''} ${profile.mandal || ''}`.trim()
      : 'Local Village Panchayat';

  const defaultDocuments = [
    'Aadhaar Card (Original & 1 Photocopy)',
    'Ration Card / Food Security Card',
    'Bank Account Passbook (Front Page Copy)',
    '2 Recent Passport-Size Photographs',
  ];

  const documents =
    profile.documents && profile.documents.length > 0
      ? profile.documents
      : defaultDocuments;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const textToShare = `📜 *Aasha Voice Welfare Passbook Card*
👤 Beneficiary: ${beneficiaryName}
📍 Location: ${villageLocation}
🎯 Scheme: ${schemeName}
💰 Sanctioned Benefit: ${schemeBenefit}
📑 Required Documents: ${documents.join(', ')}
🏛️ Next Step: Visit your local Village Panchayat / CSC to submit your free application.
✅ 100% Free Government Welfare Service. Never pay bribes!`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(textToShare)}`;
    window.open(url, '_blank');
  };

  const handleReadDoc = (docName: string) => {
    audioService.speakText(`For this scheme, please carry your ${docName}.`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 my-6">
      {/* Visual Government / Welfare Passbook Card */}
      <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-600 relative overflow-hidden">
        {/* Official Aasha Seal */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 border-2 border-dashed border-amber-700/60 rounded-full w-20 h-20 sm:w-24 sm:h-24 flex flex-col items-center justify-center p-1 text-center rotate-12 bg-amber-100/50 pointer-events-none select-none">
          <Award className="w-6 h-6 text-amber-800" />
          <span className="text-[10px] font-bold text-amber-900 leading-tight">
            AASHA VERIFIED
          </span>
          <span className="text-[8px] text-amber-700">WELFARE PASS</span>
        </div>

        {/* Card Header */}
        <div className="flex items-center gap-3 mb-5 pb-4 border-b-2 border-amber-200">
          <div className="w-12 h-12 rounded-2xl bg-amber-700 text-white flex items-center justify-center shadow-md">
            <span className="text-2xl" role="img" aria-label="Welfare Card">📜</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                Official Scheme Passbook
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                100% Free Service
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
              Voice Welfare Passbook Card
            </h2>
          </div>
        </div>

        {/* Beneficiary Details Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <div className="bg-white/80 p-3.5 rounded-2xl border border-amber-200">
            <div className="flex items-center gap-2 text-xs text-amber-800 font-medium mb-1">
              <User className="w-3.5 h-3.5" />
              <span>Beneficiary Name:</span>
            </div>
            <p className="text-lg font-bold text-stone-900">
              {beneficiaryName}
            </p>
          </div>

          <div className="bg-white/80 p-3.5 rounded-2xl border border-amber-200">
            <div className="flex items-center gap-2 text-xs text-amber-800 font-medium mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Village / Location:</span>
            </div>
            <p className="text-base font-bold text-stone-900">
              {villageLocation}
            </p>
          </div>
        </div>

        {/* Matched Scheme Highlight Banner */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white p-4 sm:p-5 rounded-2xl shadow-md mb-6">
          <div className="flex items-center gap-2 text-xs text-amber-200 font-medium mb-1">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Recommended Scheme for You:</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-1">
            {schemeName}
          </h3>
          <p className="text-sm sm:text-base text-amber-100 font-medium">
            Entitled Benefits: <strong className="text-white font-bold">{schemeBenefit}</strong>
          </p>
        </div>

        {/* Required Documents Checklist */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm sm:text-base font-bold text-stone-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-700" />
              <span>Required Documents to Carry:</span>
            </h4>
          </div>

          <div className="space-y-2.5">
            {documents.map((doc, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-amber-200 shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-sm sm:text-base font-semibold text-stone-800">
                    {doc}
                  </span>
                </div>
                <button
                  onClick={() => handleReadDoc(doc)}
                  className="p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs flex items-center gap-1 font-medium transition-all cursor-pointer"
                  title="Listen"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Listen</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Anti-bribery guarantee banner */}
        <div className="bg-emerald-50 border-2 border-emerald-300 p-4 rounded-2xl mb-6">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h5 className="text-sm font-bold text-emerald-950">
                  What should you do next? (Next Steps)
                </h5>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                  Zero Fee Guaranteed
                </span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-900 mt-1 leading-relaxed">
                Take photocopies of these documents to your local Village Panchayat Office or Common Service Centre (CSC). The Welfare Assistant will register your free application. Never pay any bribe or extra charges!
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* Read Entire Card Aloud */}
          <button
            onClick={() => {
              audioService.playChime('tap');
              onReadCardAloud();
            }}
            className="flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm sm:text-base shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Volume2 className="w-5 h-5" />
            <span>Read Entire Card Aloud (Voice)</span>
          </button>

          {/* WhatsApp Share */}
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center gap-1.5 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-md cursor-pointer"
            title="Share via WhatsApp"
          >
            <Share2 className="w-4 h-4" />
            <span>WhatsApp Share</span>
          </button>

          {/* Print / Save */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 py-3 px-4 rounded-2xl bg-white hover:bg-amber-50 text-stone-800 border-2 border-amber-300 font-bold text-sm transition-all shadow-sm cursor-pointer"
          >
            <Printer className="w-4 h-4 text-stone-600" />
            <span>Print / Save</span>
          </button>
        </div>
      </div>
    </div>
  );
};
