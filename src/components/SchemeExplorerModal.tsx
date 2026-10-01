import React from 'react';
import { Volume2, ArrowRight, X } from 'lucide-react';
import { audioService } from '../services/audioService';

interface SchemeExplorerModalProps {
  isOpen: boolean;
  onSelectScheme: (scheme: { name: string; benefit: string; prompt: string }) => void;
  onClose: () => void;
}

interface EnglishScheme {
  id: string;
  categoryIcon: string;
  category: string;
  title: string;
  benefitAmount: string;
  description: string;
  documents: string[];
  openingPrompt: string;
}

const ENGLISH_SCHEMES_LIST: EnglishScheme[] = [
  {
    id: 'sewing-machine',
    categoryIcon: '🧵',
    category: 'Tailoring & Craft Livelihood',
    title: 'PM Vishwakarma Free Sewing Machine Scheme',
    benefitAmount: '₹15,000 Machine Grant + ₹500 Daily Stipend',
    description: 'Free modern sewing machine grant of ₹15,000 deposited straight to your bank, plus 5 days of free certified tailoring training and ₹500 daily stipend.',
    documents: ['Aadhaar Card', 'Ration Card', 'Bank Passbook'],
    openingPrompt: 'Namaste Sister, I know tailoring and I want to apply for the free sewing machine scheme.',
  },
  {
    id: 'dwcra-shg',
    categoryIcon: '💰',
    category: 'Women Self-Help Group (SHG) Loans',
    title: 'Mahila Samman & SHG Livelihood Micro-Credit',
    benefitAmount: '₹50,000 to ₹1,00,000 Low-Interest Loan',
    description: 'Low-interest bank credit for rural women in self-help groups to start small grocery shops, local crafts, vegetable vending, or home businesses.',
    documents: ['Aadhaar Card', 'SHG Member Passbook', 'Bank Account'],
    openingPrompt: 'I am part of a women self-help group, I need loan assistance to start a small business.',
  },
  {
    id: 'pension-security',
    categoryIcon: '👵',
    category: 'Social Security & Pensions',
    title: 'Widow, Senior & Disability Pension Scheme',
    benefitAmount: 'Monthly ₹3,000 to ₹4,000 Direct Pension',
    description: 'Direct financial assistance deposited monthly into your bank account on the 1st of every month for senior citizens, widows, and single women.',
    documents: ['Aadhaar Card', 'Ration Card', 'Age Proof / Death Certificate (if applicable)'],
    openingPrompt: 'Sister, I need help applying for my monthly senior citizen or widow pension.',
  },
  {
    id: 'dairy-livestock',
    categoryIcon: '🐄',
    category: 'Dairy Cattle & Livestock Subsidy',
    title: 'Dairy Cattle & Goat Farming Subsidy Scheme',
    benefitAmount: '50% to 75% Direct Government Subsidy',
    description: 'Government covers more than half the cost for purchasing high-yield milch cows, buffaloes, or sheep to start rural milk and livestock sales.',
    documents: ['Aadhaar Card', 'Ration Card', 'Bank Passbook'],
    openingPrompt: 'I want to start dairy farming and milk sales, can you guide me on livestock subsidies?',
  },
  {
    id: 'maternal-nutrition',
    categoryIcon: '🤰',
    category: 'Maternal Nutrition & Motherhood',
    title: 'PM Matru Vandana Yojana (PMMVY)',
    benefitAmount: '₹5,000 to ₹6,000 Cash Support in Bank',
    description: 'Direct financial grant for pregnant and nursing mothers to cover nutritional food, healthcare, and safe institutional delivery.',
    documents: ['Aadhaar Card', 'Mother & Child Protection (MCP) Card', 'Bank Passbook'],
    openingPrompt: 'I am an expecting mother, please guide me on maternal nutrition welfare support.',
  },
];

export const SchemeExplorerModal: React.FC<SchemeExplorerModalProps> = ({
  isOpen,
  onSelectScheme,
  onClose,
}) => {
  if (!isOpen) return null;

  const handleListenScheme = (scheme: EnglishScheme) => {
    audioService.playChime('tap');
    const fullAudio = `${scheme.title}. Entitled benefits: ${scheme.benefitAmount}. ${scheme.description}`;
    audioService.speakText(fullAudio);
  };

  const handleApplyScheme = (scheme: EnglishScheme) => {
    audioService.playChime('success');
    onSelectScheme({
      name: scheme.title,
      benefit: scheme.benefitAmount,
      prompt: scheme.openingPrompt,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl p-5 sm:p-7 shadow-2xl border-4 border-amber-600 relative overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-700 text-white flex items-center justify-center shadow-md">
              <span className="text-2xl">✨</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900">Government Welfare Schemes</h3>
              <p className="text-xs text-stone-500">Explore schemes and listen to benefit details</p>
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

        {/* Schemes list */}
        <div className="space-y-3.5 my-3 overflow-y-auto pr-1 flex-1">
          {ENGLISH_SCHEMES_LIST.map((scheme) => (
            <div
              key={scheme.id}
              className="p-4 rounded-2xl bg-amber-50/70 hover:bg-amber-100/70 border-2 border-amber-200 hover:border-amber-400 transition-all text-left group"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl">{scheme.categoryIcon}</span>
                  <div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                      {scheme.category}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-amber-950 mt-1">
                      {scheme.title}
                    </h4>
                  </div>
                </div>

                <button
                  onClick={() => handleListenScheme(scheme)}
                  className="p-2 rounded-xl bg-amber-200 hover:bg-amber-300 text-amber-950 text-xs font-bold flex items-center gap-1 shrink-0 transition-all cursor-pointer"
                  title="Listen"
                >
                  <Volume2 className="w-4 h-4 text-amber-800" />
                  <span className="hidden sm:inline">Listen</span>
                </button>
              </div>

              <div className="my-2 bg-white/80 p-2.5 rounded-xl border border-amber-200/80">
                <p className="text-xs text-amber-800 font-bold mb-0.5">
                  Entitled Benefit: <span className="text-amber-950">{scheme.benefitAmount}</span>
                </p>
                <p className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed">
                  {scheme.description}
                </p>
              </div>

              <button
                onClick={() => handleApplyScheme(scheme)}
                className="w-full mt-2 py-2.5 px-4 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
              >
                <span>Apply for this Scheme with Aasha</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-stone-200 text-center shrink-0">
          <p className="text-[11px] text-stone-500 italic">
            You can also tap the microphone on the main screen to speak directly in your own words.
          </p>
        </div>
      </div>
    </div>
  );
};
