/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { AudioOrb } from './components/AudioOrb';
import { AashaDialogueBox } from './components/AashaDialogueBox';
import { QuickVoiceChips } from './components/QuickVoiceChips';
import { StepTracker } from './components/StepTracker';
import { VoicePassbookCard } from './components/VoicePassbookCard';
import { GuidedPersonasModal } from './components/GuidedPersonasModal';
import { HelpModal } from './components/HelpModal';
import { DocumentVoiceHelper } from './components/DocumentVoiceHelper';
import { SchemeExplorerModal } from './components/SchemeExplorerModal';
import { HelplineDrawer } from './components/HelplineDrawer';
import { VillageKendraLocator } from './components/VillageKendraLocator';
import { ChatMessage, Step, UserProfile } from './types';
import { audioService } from './services/audioService';
import { AlertCircle } from 'lucide-react';

const INITIAL_AASHA_GREETING =
  'Hello sister! I am Aasha, your caring companion. Whatever government welfare scheme or assistance you need, I am right here by your side. Please do not worry. What kind of help or livelihood support are you looking for today?';

const INITIAL_QUICK_REPLIES = [
  'I need a sewing machine for tailoring',
  'I need monthly pension support',
  'I need a women self-help group loan',
  'I want to start dairy cattle farming',
];

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState<Step>('greeting');
  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [isSlowVoice, setIsSlowVoice] = useState<boolean>(false);
  const [interimTranscript, setInterimTranscript] = useState<string>('');
  const [quickSuggestions, setQuickSuggestions] = useState<string[]>(INITIAL_QUICK_REPLIES);

  // Modals
  const [isPersonasModalOpen, setIsPersonasModalOpen] = useState<boolean>(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
  const [isDocumentsModalOpen, setIsDocumentsModalOpen] = useState<boolean>(false);
  const [isSchemesModalOpen, setIsSchemesModalOpen] = useState<boolean>(false);
  const [isHelplinesModalOpen, setIsHelplinesModalOpen] = useState<boolean>(false);
  const [isKendraModalOpen, setIsKendraModalOpen] = useState<boolean>(false);
  const [micErrorMessage, setMicErrorMessage] = useState<string | null>(null);

  const initialGreetingSpokenRef = useRef<boolean>(false);

  // Initialize with English greeting
  useEffect(() => {
    const greetingMsg: ChatMessage = {
      id: `msg-welcome-${Date.now()}`,
      role: 'aasha',
      text: INITIAL_AASHA_GREETING,
      step: 'greeting',
      timestamp: Date.now(),
    };
    setMessages([greetingMsg]);
    setQuickSuggestions(INITIAL_QUICK_REPLIES);
  }, []);

  // Try to speak greeting on user interaction
  const speakGreetingIfRequested = () => {
    if (!initialGreetingSpokenRef.current && messages.length > 0) {
      initialGreetingSpokenRef.current = true;
      audioService.speakText(INITIAL_AASHA_GREETING, {
        slow: isSlowVoice,
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
      });
    }
  };

  // Send user message to Aasha backend
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isThinking) return;

    setMicErrorMessage(null);
    setInterimTranscript('');

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: text.trim(),
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsThinking(true);
    audioService.stopSpeaking();
    setIsSpeaking(false);

    try {
      const response = await fetch('/api/aasha/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: updatedMessages.map((m) => ({
            role: m.role === 'aasha' ? 'model' : 'user',
            text: m.text,
          })),
          userProfile,
        }),
      });

      const resData = await response.json();
      const aashaData = resData.data || {};

      const replyText =
        aashaData.replyText ||
        'I heard you say that, sister. I am checking the best government scheme for you right now.';

      const newStep = (aashaData.step as Step) || currentStep;
      setCurrentStep(newStep);

      // Merge updated profile
      if (aashaData.confirmedProfile) {
        setUserProfile((prev) => ({
          ...prev,
          ...aashaData.confirmedProfile,
        }));
      }

      if (aashaData.quickVoiceReplies && Array.isArray(aashaData.quickVoiceReplies)) {
        setQuickSuggestions(aashaData.quickVoiceReplies);
      }

      const aashaMsg: ChatMessage = {
        id: `aasha-${Date.now()}`,
        role: 'aasha',
        text: replyText,
        step: newStep,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aashaMsg]);
      setIsThinking(false);

      // Speak Aasha's reply aloud immediately in warm English
      audioService.playChime('success');
      audioService.speakText(replyText, {
        slow: isSlowVoice,
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
      });
    } catch (err: any) {
      console.error('Error contacting Aasha:', err);
      setIsThinking(false);

      const fallbackReply =
        'Hello sister! I am listening carefully to you. Please do not worry, I am right here by your side. What kind of support do you need today?';

      const fallbackMsg: ChatMessage = {
        id: `aasha-err-${Date.now()}`,
        role: 'aasha',
        text: fallbackReply,
        step: currentStep,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, fallbackMsg]);
      audioService.speakText(fallbackReply, {
        slow: isSlowVoice,
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
      });
    }
  };

  // Toggle Microphone
  const handleToggleMic = () => {
    speakGreetingIfRequested();

    if (isSpeaking) {
      audioService.stopSpeaking();
      setIsSpeaking(false);
    }

    if (isListening) {
      audioService.stopListening();
      setIsListening(false);
      return;
    }

    if (!audioService.hasSpeechRecognition()) {
      setMicErrorMessage(
        'Speech microphone recording is not supported in this browser. Please tap any of the suggested voice options below.'
      );
      return;
    }

    audioService.startListening({
      onStart: () => {
        setIsListening(true);
        setMicErrorMessage(null);
      },
      onResult: (transcript, isFinal) => {
        setInterimTranscript(transcript);
        if (isFinal && transcript.trim()) {
          setIsListening(false);
          handleSendMessage(transcript);
        }
      },
      onError: (err) => {
        setIsListening(false);
        if (err !== 'no-speech') {
          setMicErrorMessage(
            'Microphone voice was not clear, sister. Please tap one of the suggested voice replies below.'
          );
        }
      },
      onEnd: () => {
        setIsListening(false);
      },
    });
  };

  // Repeat last Aasha reply
  const handleRepeatAudio = () => {
    const lastAasha = messages.filter((m) => m.role === 'aasha').slice(-1)[0];
    if (lastAasha) {
      audioService.speakText(lastAasha.text, {
        slow: isSlowVoice,
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
      });
    }
  };

  // Stop currently playing voice
  const handleStopAudio = () => {
    audioService.stopSpeaking();
    setIsSpeaking(false);
  };

  // Select Quick Voice Suggestion
  const handleSelectQuickSuggestion = (phrase: string) => {
    speakGreetingIfRequested();
    audioService.speakText(phrase, {
      slow: isSlowVoice,
      onEnd: () => {
        handleSendMessage(phrase);
      },
    });
  };

  // Scheme selected from Explorer modal
  const handleSelectSchemeFromExplorer = (scheme: { name: string; benefit: string; prompt: string }) => {
    setUserProfile((prev) => ({
      ...prev,
      schemeName: scheme.name,
      schemeBenefit: scheme.benefit,
    }));
    handleSendMessage(scheme.prompt);
  };

  // Read entire Welfare Passbook Card aloud
  const handleReadCardAloud = () => {
    const cardText = `Beneficiary Name: ${userProfile.name || 'Sister'}. 
Recommended Scheme: ${userProfile.schemeName || 'PM Vishwakarma Free Sewing Machine Scheme'}. 
Entitled Benefits: ${userProfile.schemeBenefit || '₹15,000 sewing machine grant and training'}. 
Required Documents to carry: Aadhaar card photocopy, Ration card, Bank passbook front page, and 2 passport photos. 
Visit your local Village Panchayat or Common Service Centre to submit your application for free.`;

    audioService.speakText(cardText, {
      slow: isSlowVoice,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
    });
  };

  // Reset conversation
  const handleReset = () => {
    audioService.stopSpeaking();
    audioService.stopListening();
    setIsListening(false);
    setIsSpeaking(false);
    setIsThinking(false);
    setUserProfile({});
    setCurrentStep('greeting');
    setQuickSuggestions(INITIAL_QUICK_REPLIES);

    const greetingMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'aasha',
      text: INITIAL_AASHA_GREETING,
      step: 'greeting',
      timestamp: Date.now(),
    };
    setMessages([greetingMsg]);

    audioService.speakText(INITIAL_AASHA_GREETING, {
      slow: isSlowVoice,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
    });
  };

  // Run guided persona scenario
  const handleSelectPersona = (persona: {
    name: string;
    village: string;
    need: string;
    openingSpeech: string;
  }) => {
    setUserProfile({
      name: persona.name,
      village: persona.village,
      need: persona.need,
    });
    handleSendMessage(persona.openingSpeech);
  };

  const lastAashaReply = messages.filter((m) => m.role === 'aasha').slice(-1)[0]?.text;

  // Show Passbook Card when scheme has been identified or user is in later stages
  const showPassbookCard =
    currentStep === 'scheme_selected' ||
    currentStep === 'ready_for_application' ||
    Boolean(userProfile.schemeName);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50/70 via-stone-50 to-orange-50/40 text-stone-900 pb-16">
      {/* Header with Quick Feature Navigation */}
      <Header
        onOpenSchemes={() => setIsSchemesModalOpen(true)}
        onOpenDocuments={() => setIsDocumentsModalOpen(true)}
        onOpenKendra={() => setIsKendraModalOpen(true)}
        onOpenHelplines={() => setIsHelplinesModalOpen(true)}
        isSlowVoice={isSlowVoice}
        onToggleSlowVoice={() => setIsSlowVoice((prev) => !prev)}
        onReset={handleReset}
        onOpenHelp={() => setIsHelpModalOpen(true)}
        onOpenPersonas={() => setIsPersonasModalOpen(true)}
        userName={userProfile.name}
        userVillage={userProfile.village}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-2 sm:px-4 py-4 flex flex-col items-center">
        {/* Step Progress Milestone Bar */}
        <StepTracker currentStep={currentStep} />

        {/* Tactile Microphone Orb */}
        <AudioOrb
          isListening={isListening}
          isSpeaking={isSpeaking}
          isThinking={isThinking}
          lastAashaReply={lastAashaReply}
          interimTranscript={interimTranscript}
          onToggleMic={handleToggleMic}
          onRepeatAudio={handleRepeatAudio}
          onStopAudio={handleStopAudio}
        />

        {/* Mic Error Notice if needed */}
        {micErrorMessage && (
          <div className="w-full max-w-md mx-auto my-2 p-3 bg-amber-100 text-amber-900 rounded-2xl border border-amber-300 text-xs sm:text-sm flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>{micErrorMessage}</span>
          </div>
        )}

        {/* Featured Empathetic Dialogue Box */}
        <AashaDialogueBox
          messages={messages}
          currentAashaMessage={messages.filter((m) => m.role === 'aasha').slice(-1)[0]}
          onPlayMessage={(msg) => {
            audioService.speakText(msg.text, {
              slow: isSlowVoice,
              onStart: () => setIsSpeaking(true),
              onEnd: () => setIsSpeaking(false),
            });
          }}
          isSpeaking={isSpeaking}
        />

        {/* Assisted Quick Voice Response Chips */}
        <QuickVoiceChips
          suggestions={quickSuggestions}
          onSelectSuggestion={handleSelectQuickSuggestion}
          disabled={isThinking || isListening}
        />

        {/* The Resulting Welfare Passbook Card */}
        {showPassbookCard && (
          <VoicePassbookCard
            profile={userProfile}
            onReadCardAloud={handleReadCardAloud}
            isSpeaking={isSpeaking}
          />
        )}
      </main>

      {/* Scheme Explorer Modal */}
      <SchemeExplorerModal
        isOpen={isSchemesModalOpen}
        onSelectScheme={handleSelectSchemeFromExplorer}
        onClose={() => setIsSchemesModalOpen(false)}
      />

      {/* Document Voice Readiness Checker Modal */}
      <DocumentVoiceHelper
        isOpen={isDocumentsModalOpen}
        onClose={() => setIsDocumentsModalOpen(false)}
      />

      {/* Village Kendra Guide Modal */}
      <VillageKendraLocator
        isOpen={isKendraModalOpen}
        userVillage={userProfile.village}
        onClose={() => setIsKendraModalOpen(false)}
      />

      {/* Emergency & Welfare Helplines Drawer */}
      <HelplineDrawer
        isOpen={isHelplinesModalOpen}
        onClose={() => setIsHelplinesModalOpen(false)}
      />

      {/* Guided Personas Modal */}
      <GuidedPersonasModal
        isOpen={isPersonasModalOpen}
        onClose={() => setIsPersonasModalOpen(false)}
        onSelectPersona={handleSelectPersona}
      />

      {/* Help Modal */}
      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </div>
  );
}
