export type LanguageCode = 'te' | 'hi' | 'ta' | 'kn' | 'bn' | 'mr' | 'en';

export type Step =
  | 'greeting'
  | 'listening_need'
  | 'confirming_need'
  | 'collecting_name'
  | 'collecting_location'
  | 'checking_eligibility'
  | 'confirming_documents'
  | 'scheme_selected'
  | 'ready_for_application';

export interface UserProfile {
  name?: string;
  village?: string;
  mandal?: string;
  district?: string;
  need?: string;
  schemeName?: string;
  schemeBenefit?: string;
  documents?: string[];
  ageGroup?: string;
  notes?: string;
  language?: LanguageCode;
}

export interface ChatMessage {
  id: string;
  role: 'aasha' | 'user';
  text: string;
  phoneticEnglish?: string;
  step?: Step;
  timestamp: number;
  audioBase64?: string;
}

export interface SchemeInfo {
  id: string;
  title: string;
  category: string;
  benefitAmount: string;
  description: string;
  documents: string[];
  department?: string;
  icon: string;
}

