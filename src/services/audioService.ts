/**
 * Audio Service for Aasha:
 * Handles Speech-to-Text (STT), Text-to-Speech (TTS), audio feedback chimes,
 * and audio playback for rural users.
 */

class AudioService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private currentAudioElement: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private recognition: any = null;
  private isListeningInternal = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  private getAudioContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // Play a soft, reassuring temple/village chime when mic turns on
  public playChime(type: 'listen' | 'success' | 'tap') {
    try {
      const ctx = this.getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'listen') {
        // Soft rising chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(587.33, now + 0.15); // D5
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'success') {
        // Reassuring harmonic bell
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.12); // E5
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      } else {
        // Subtle click
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch (e) {
      // AudioContext might be blocked until user gesture
    }
  }

  // Stop any currently playing audio or speech
  public stopSpeaking() {
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
      this.currentAudioElement = null;
    }
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  // Speak text out loud in the chosen regional language
  public async speakText(
    text: string,
    options: {
      slow?: boolean;
      locale?: string;
      base64Audio?: string;
      onStart?: () => void;
      onEnd?: () => void;
    } = {}
  ): Promise<void> {
    this.stopSpeaking();

    // If server provided generated base64 WAV audio (from Gemini TTS), use it first!
    if (options.base64Audio) {
      try {
        const audio = new Audio(`data:audio/wav;base64,${options.base64Audio}`);
        this.currentAudioElement = audio;
        if (options.slow) {
          audio.playbackRate = 0.85;
        }

        return new Promise((resolve) => {
          audio.onplay = () => {
            options.onStart?.();
          };
          audio.onended = () => {
            this.currentAudioElement = null;
            options.onEnd?.();
            resolve();
          };
          audio.onerror = () => {
            console.warn('Audio element error, falling back to Web Speech synthesis');
            this.speakWithWebSpeech(text, options).then(resolve);
          };
          audio.play().catch(() => {
            this.speakWithWebSpeech(text, options).then(resolve);
          });
        });
      } catch (err) {
        console.warn('Base64 audio failed, using Web Speech:', err);
      }
    }

    return this.speakWithWebSpeech(text, options);
  }

  private speakWithWebSpeech(
    text: string,
    options: {
      slow?: boolean;
      locale?: string;
      onStart?: () => void;
      onEnd?: () => void;
    }
  ): Promise<void> {
    return new Promise((resolve) => {
      if (!this.synth) {
        options.onEnd?.();
        resolve();
        return;
      }

      const targetLocale = options.locale || 'en-US';
      const langPrefix = targetLocale.split('-')[0].toLowerCase();

      // Clean text of non-spoken symbols
      const cleanText = text
        .replace(/[*_#`~]/g, '')
        .replace(/₹/g, ' ')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      this.currentUtterance = utterance;

      // Rate: normal is 0.9 (warm, steady, village pace), slow is 0.75 (for elders)
      utterance.rate = options.slow ? 0.75 : 0.9;
      utterance.pitch = 1.05; // Gentle, maternal warm pitch

      const voices = this.synth.getVoices();
      // Match voice by exact locale, prefix, or language name
      const matchedVoice = voices.find(
        (v) =>
          v.lang.toLowerCase() === targetLocale.toLowerCase() ||
          v.lang.toLowerCase().startsWith(langPrefix) ||
          v.name.toLowerCase().includes(langPrefix)
      );
      const fallbackIndianVoice = voices.find(
        (v) =>
          v.lang.includes('IN') ||
          v.name.toLowerCase().includes('india')
      );

      if (matchedVoice) {
        utterance.voice = matchedVoice;
        utterance.lang = targetLocale;
      } else if (fallbackIndianVoice) {
        utterance.voice = fallbackIndianVoice;
        utterance.lang = targetLocale;
      } else {
        utterance.lang = targetLocale;
      }

      utterance.onstart = () => {
        options.onStart?.();
      };

      utterance.onend = () => {
        this.currentUtterance = null;
        options.onEnd?.();
        resolve();
      };

      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis error:', e);
        this.currentUtterance = null;
        options.onEnd?.();
        resolve();
      };

      this.synth.speak(utterance);
    });
  }

  // Check if browser supports speech recognition
  public hasSpeechRecognition(): boolean {
    return typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }

  // Start listening to the microphone in the user's chosen language
  public startListening(callbacks: {
    locale?: string;
    onStart?: () => void;
    onResult?: (transcript: string, isFinal: boolean) => void;
    onError?: (error: any) => void;
    onEnd?: () => void;
  }): void {
    if (!this.hasSpeechRecognition()) {
      callbacks.onError?.('Speech recognition is not supported in this browser');
      return;
    }

    try {
      this.stopSpeaking();
      this.playChime('listen');

      const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognitionClass();

      this.recognition.lang = callbacks.locale || 'en-US';
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;
      this.recognition.continuous = false;

      this.recognition.onstart = () => {
        this.isListeningInternal = true;
        callbacks.onStart?.();
      };

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const text = finalTranscript || interimTranscript;
        callbacks.onResult?.(text, Boolean(finalTranscript));
      };

      this.recognition.onerror = (event: any) => {
        console.warn('Speech recognition error event:', event.error);
        this.isListeningInternal = false;
        callbacks.onError?.(event.error);
      };

      this.recognition.onend = () => {
        this.isListeningInternal = false;
        callbacks.onEnd?.();
      };

      this.recognition.start();
    } catch (err) {
      console.warn('Failed to start speech recognition:', err);
      this.isListeningInternal = false;
      callbacks.onError?.(err);
    }
  }

  // Stop listening
  public stopListening(): void {
    if (this.recognition && this.isListeningInternal) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
    }
    this.isListeningInternal = false;
  }

  public isListening(): boolean {
    return this.isListeningInternal;
  }
}

export const audioService = new AudioService();
