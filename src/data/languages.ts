import { LanguageCode } from '../types';

export interface LanguageMeta {
  code: LanguageCode;
  nativeName: string;
  englishName: string;
  flag: string;
  speechLocale: string;
  sisterTerm: string;
  welcomeGreeting: string;
  subtitle: string;
  listenGuideText: string;
  tapToSpeakText: string;
  listeningText: string;
  speakingText: string;
  thinkingText: string;
  repeatAudioText: string;
  slowVoiceText: string;
  normalVoiceText: string;
  stopAudioText: string;
  cardTitle: string;
  cardSub: string;
  beneficiaryLabel: string;
  villageLabel: string;
  schemeFoundLabel: string;
  documentsHeading: string;
  nextStepTitle: string;
  nextStepDesc: string;
  readCardAloudText: string;
  printCardText: string;
  sampleReplies: string[];
  steps: {
    greeting: string;
    need: string;
    scheme: string;
    details: string;
    card: string;
  };
  samplePersonas: {
    id: string;
    name: string;
    age: string;
    village: string;
    need: string;
    openingSpeech: string;
    icon: string;
  }[];
}

export const SUPPORTED_LANGUAGES: Record<LanguageCode, LanguageMeta> = {
  te: {
    code: 'te',
    nativeName: 'తెలుగు',
    englishName: 'Telugu',
    flag: '🇮🇳',
    speechLocale: 'te-IN',
    sisterTerm: 'అక్కా / చెల్లెమ్మా',
    welcomeGreeting:
      'నమస్తే అమ్మా! నేను నీ తోబుట్టువు లాంటి ఆశను. నీకు ఏ కష్టమొచ్చినా, ఏ ప్రభుత్వ పథకం కావాలన్నా నేను తోడుగా ఉంటాను. ఏ భయం పడకు తల్లీ. నీకు ఏ విషయంలో సాయం కావాలమ్మా?',
    subtitle: 'గ్రామీణ మహిళల ప్రభుత్వ సంక్షేమ వాయిస్ సహాయకురాలు',
    listenGuideText: '👉 మైక్ నొక్కి మీ అవసరం లేదా సందేహం చెప్పండి',
    tapToSpeakText: 'మాట్లాడండి',
    listeningText: '👂 నేను వింటున్నాను అమ్మా... మీ మాట చెప్పండి',
    speakingText: 'ఆశ మీకు చెబుతోంది... వినండి',
    thinkingText: 'ఆశ సమాధానం సిద్ధం చేస్తోంది... ఒక్క క్షణం అమ్మా',
    repeatAudioText: 'మళ్ళీ చెప్పక్కా (మళ్ళీ వినండి)',
    slowVoiceText: 'నెమ్మదైన మాట (ఆన్)',
    normalVoiceText: 'నెమ్మదిగా మాట్లాడు',
    stopAudioText: 'ఆపు',
    cardTitle: 'వాయిస్ సంక్షేమ పాస్‌బుక్',
    cardSub: 'ప్రభుత్వ సంక్షేమ పత్రం',
    beneficiaryLabel: 'లబ్ధిదారురాలి పేరు',
    villageLabel: 'గ్రామం / ప్రాంతం',
    schemeFoundLabel: 'మీ కోసం ఎంపిక చేసిన పథకం',
    documentsHeading: 'వెంట తీసుకెళ్లాల్సిన ముఖ్యమైన కాగితాలు (డాక్యుమెంట్లు):',
    nextStepTitle: 'తర్వాత మీరు ఏం చేయాలి? (తదుపరి అడుగు)',
    nextStepDesc:
      'మీ గ్రామ సచివాలయానికి లేదా సేవా కేంద్రానికి వెళ్లి, అక్కడి వెల్ఫేర్ అసిస్టెంట్ గారికి ఈ పత్రాల జిరాక్స్ కాపీలు ఇవ్వండి. వాళ్ళు మీకు ఉచితంగా దరఖాస్తు నమోదు చేస్తారు.',
    readCardAloudText: 'ఈ కార్డు మొత్తం వినిపించు (వాయిస్)',
    printCardText: 'కార్డు ప్రింట్ / సేవ్',
    sampleReplies: [
      'నాకు బట్టలు కుట్టే మిషన్ కావాలక్కా',
      'నాకు పింఛను సాయం కావాలి తల్లీ',
      'డ్వాక్రా సంఘంలో రుణం కావాలి',
      'పాడి గేదెలు కొనుక్కోవడానికి సాయం కావాలి',
    ],
    steps: {
      greeting: 'పలకరింపు',
      need: 'నీ అవసరం',
      scheme: 'పథకం ఎంపిక',
      details: 'వివరాలు',
      card: 'దరఖాస్తు కార్డు',
    },
    samplePersonas: [
      {
        id: 'lakshmi',
        name: 'లక్ష్మమ్మ (Lakshmi)',
        age: '38 ఏళ్లు',
        village: 'ధర్మసాగరం గ్రామం, వరంగల్',
        need: 'పిల్లల చదువుల కోసం బట్టలు కుట్టే కుట్టు మిషన్ కావాలి',
        openingSpeech:
          'నమస్తే అక్కా, నా పేరు లక్ష్మమ్మ. మాది వరంగల్ జిల్లా. నాకు కుట్టు పని వచ్చు కానీ మిషన్ లేదు. కుట్టు మిషన్ కోసం ఏదైనా ప్రభుత్వ సాయం ఉందా తల్లీ?',
        icon: '🧵',
      },
      {
        id: 'saraswathi',
        name: 'సరస్వతమ్మ (Saraswathi)',
        age: '62 ఏళ్లు',
        village: 'కణేకల్ గ్రామం, అనంతపురం',
        need: 'ఒంటరిగా ఉంటున్నాను, వృద్ధాప్య పింఛను సాయం కావాలి',
        openingSpeech:
          'అమ్మా నా పేరు సరస్వతమ్మ. నాకు 60 ఏళ్లు దాటాయి, ఒంటరిగా ఉంటున్నాను. నాకు నెలా నెలా వచ్చే పింఛను ఎలా దరఖాస్తు చేసుకోవాలో చెప్పు తల్లీ.',
        icon: '👵',
      },
      {
        id: 'ramadevi',
        name: 'రమాదేవి (Ramadevi)',
        age: '34 ఏళ్లు',
        village: 'తెనాలి రూరల్, గుంటూరు',
        need: 'డ్వాక్రా సంఘంలో ఉన్నాను, పాడి గేదె కొనుక్కోవడానికి రుణం కావాలి',
        openingSpeech:
          'నమస్తే అమ్మా, నేను పొదుపు సంఘంలో సభ్యురాలిని. మా ఊర్లో పాలు పోయడానికి ఒక పాడి గేదె కొనుక్కోవాలని ఉంది. ప్రభుత్వం నుంచి ఏదైనా సబ్సిడీ రుణం ఉందా?',
        icon: '🐄',
      },
    ],
  },
  hi: {
    code: 'hi',
    nativeName: 'हिन्दी',
    englishName: 'Hindi',
    flag: '🇮🇳',
    speechLocale: 'hi-IN',
    sisterTerm: 'दीदी / बहना',
    welcomeGreeting:
      'नमस्ते दीदी! मैं आपकी सगी बहन जैसी आशा हूँ। आपको किसी भी सरकारी योजना या सहायता की जरूरत हो, तो मैं आपके साथ हूँ। बिल्कुल मत घबराइए। आपको किस काम के लिए मदद चाहिए बहना?',
    subtitle: 'ग्रामीण महिलाओं की भरोसेमंद सरकारी योजना वॉयस साथी',
    listenGuideText: '👉 माइक दबाएं और अपनी जरूरत या परेशानी आराम से बताएं',
    tapToSpeakText: 'बोलिए',
    listeningText: '👂 मैं सुन रही हूँ दीदी... अपनी बात कहिए',
    speakingText: 'आशा बोल रही है... ध्यान से सुनिए',
    thinkingText: 'आशा सोच रही है... एक पल रुकिए बहना',
    repeatAudioText: 'दीदी फिर से बोलो (दोबारा सुनें)',
    slowVoiceText: 'धीमी आवाज़ (चालू)',
    normalVoiceText: 'धीमी आवाज़ में बोलें',
    stopAudioText: 'रोकें',
    cardTitle: 'वॉयस कल्याण पासबुक',
    cardSub: 'सरकारी कल्याण पत्र',
    beneficiaryLabel: 'लाभार्थी का नाम',
    villageLabel: 'गाँव / क्षेत्र',
    schemeFoundLabel: 'आपके लिए चुनी गई सरकारी योजना',
    documentsHeading: 'साथ ले जाने वाले जरूरी कागजात (दस्तावेज):',
    nextStepTitle: 'अब आगे आपको क्या करना है?',
    nextStepDesc:
      'अपने गाँव की पंचायत या ग्राहक सेवा केंद्र (CSC) जाएं। वहां इन कागजातों की फोटोकॉपी देकर मुफ्त में आवेदन भरवाएं।',
    readCardAloudText: 'यह पूरा कार्ड बोलकर सुनाओ (वॉयस)',
    printCardText: 'कार्ड प्रिंट / सेव करें',
    sampleReplies: [
      'मुझे सिलाई मशीन योजना चाहिए दीदी',
      'मुझे विधवा या वृद्धा पेंशन चाहिए',
      'स्वयं सहायता समूह से ऋण चाहिए',
      'दूध बेचने के लिए गाय-भैंस का लोन चाहिए',
    ],
    steps: {
      greeting: 'परिचय',
      need: 'आपकी जरूरत',
      scheme: 'योजना चयन',
      details: 'विवरण',
      card: 'आवेदन कार्ड',
    },
    samplePersonas: [
      {
        id: 'shanti',
        name: 'शान्ति देवी (Shanti Devi)',
        age: '36 वर्ष',
        village: 'समस्तीपुर, बिहार',
        need: 'सिलाई मशीन चाहिए ताकि बच्चों की पढ़ाई का खर्च निकाल सकूँ',
        openingSpeech:
          'नमस्ते दीदी, मेरा नाम शान्ति है। मुझे सिलाई आती है पर मशीन नहीं है। क्या सरकार से सिलाई मशीन की कोई मदद मिल सकती है?',
        icon: '🧵',
      },
      {
        id: 'kamla',
        name: 'कमला बाई (Kamla Bai)',
        age: '64 वर्ष',
        village: 'सीकर, राजस्थान',
        need: 'वृद्धावस्था पेंशन की सहायता चाहिए',
        openingSpeech:
          'प्रणाम बेटी, मैं अकेली रहती हूँ। मुझे हर महीने की वृद्धावस्था पेंशन कैसे मिलेगी, मुझे समझा दो।',
        icon: '👵',
      },
      {
        id: 'rekha',
        name: 'रेखा वर्मा (Rekha Verma)',
        age: '31 वर्ष',
        village: 'वाराणसी, उत्तर प्रदेश',
        need: 'महिला स्वयं सहायता समूह से सिलाई व दुकान के लिए लोन',
        openingSpeech:
          'नमस्ते दीदी, मैं महिला समूह से जुड़ी हूँ। मुझे अपनी छोटी दुकान बढ़ाने के लिए कम ब्याज वाला सरकारी लोन चाहिए।',
        icon: '🛍️',
      },
    ],
  },
  ta: {
    code: 'ta',
    nativeName: 'தமிழ்',
    englishName: 'Tamil',
    flag: '🇮🇳',
    speechLocale: 'ta-IN',
    sisterTerm: 'அக்கா / தங்கச்சி',
    welcomeGreeting:
      'வணக்கம் அம்மா! நான் உங்கள் உடன் பிறந்த சகோதரி போன்ற ஆஷா. அரசு நலத்திட்டங்கள் மூலமாக உங்களுக்கு என்ன உதவி வேண்டுமானாலும் நான் துணை நிற்பேன். எதற்கும் பயப்பட வேண்டாம். உங்களுக்கு என்ன உதவி வேண்டும் அம்மா?',
    subtitle: 'கிராமப்புற பெண்களுக்கான அரசு நலத்திட்ட குரல் தோழி',
    listenGuideText: '👉 மைக்கை அழுத்தி உங்கள் தேவையை அல்லது சந்தேகத்தை பேசுங்கள்',
    tapToSpeakText: 'பேசுங்கள்',
    listeningText: '👂 நான் கேட்கிறேன் அம்மா... பேசுங்கள்',
    speakingText: 'ஆஷா பேசுகிறாள்... கேளுங்கள்',
    thinkingText: 'ஆஷா யோசிக்கிறாள்... ஒரு நிமிடம் அம்மா',
    repeatAudioText: 'மறுபடியும் சொல் அக்கா (மீண்டும் கேளுங்கள்)',
    slowVoiceText: 'மெதுவான குரல் (ஆன்)',
    normalVoiceText: 'மெதுவாக பேசுங்கள்',
    stopAudioText: 'நிறுத்து',
    cardTitle: 'குரல் நலத்திட்ட பாஸ்புக்',
    cardSub: 'அரசு நலத்திட்ட அட்டை',
    beneficiaryLabel: 'பயனாளியின் பெயர்',
    villageLabel: 'கிராமம் / ஊர்',
    schemeFoundLabel: 'உங்களுக்காக தேர்வு செய்யப்பட்ட திட்டம்',
    documentsHeading: 'எடுத்துச் செல்ல வேண்டிய முக்கிய ஆவணங்கள்:',
    nextStepTitle: 'அடுத்து நீங்கள் என்ன செய்ய வேண்டும்?',
    nextStepDesc:
      'உங்கள் கிராம பஞ்சாயத்து அல்லது இ-சேவை மையத்திற்கு சென்று இந்த ஆவணங்களின் நகலை கொடுத்து இலவசமாக பதிவு செய்யுங்கள்.',
    readCardAloudText: 'இந்த அட்டையை முழுமையாக வாசித்துக் காட்டு',
    printCardText: 'அட்டையை சேமி / பிரிண்ட் செய்',
    sampleReplies: [
      'எனக்கு தையல் மெஷின் திட்டம் வேண்டும் அக்கா',
      'முதியோர் அல்லது விதவை ஓய்வூதியம் வேண்டும்',
      'சுயஉதவி குழு மகளிர் கடன் வேண்டும்',
      'கால்நடை வளர்ப்பு மானிய கடன் வேண்டும்',
    ],
    steps: {
      greeting: 'அறிமுகம்',
      need: 'உங்கள் தேவை',
      scheme: 'திட்டம் தேர்வு',
      details: 'விவரங்கள்',
      card: 'விண்ணப்ப அட்டை',
    },
    samplePersonas: [
      {
        id: 'meenakshi',
        name: 'மீனாட்சி (Meenakshi)',
        age: '37 வயது',
        village: 'மதுரை புறநகர்',
        need: 'குடும்ப செலவுக்கு இலவச தையல் இயந்திரம் வேண்டும்',
        openingSpeech:
          'வணக்கம் அக்கா, என் பெயர் மீனாட்சி. எனக்கு தையல் தெரியும் ஆனால் மெஷின் இல்லை. அரசு இலவச தையல் மெஷின் திட்டம் உள்ளதா?',
        icon: '🧵',
      },
      {
        id: 'mariammal',
        name: 'மாரியம்மாள் (Mariammal)',
        age: '65 வயது',
        village: 'திருநெல்வேலி',
        need: 'முதியோர் பென்ஷன் உதவி வேண்டும்',
        openingSpeech:
          'வணக்கம் அம்மா, எனக்கு வயதாகிவிட்டது. தனியாக இருக்கிறேன். எனக்கு முதியோர் பென்ஷன் எப்படி கிடைக்கும்?',
        icon: '👵',
      },
    ],
  },
  kn: {
    code: 'kn',
    nativeName: 'ಕನ್ನಡ',
    englishName: 'Kannada',
    flag: '🇮🇳',
    speechLocale: 'kn-IN',
    sisterTerm: 'ಅಕ್ಕ / ತಂಗಿ',
    welcomeGreeting:
      'ನಮಸ್ಕಾರ ಅಮ್ಮ! ನಾನು ನಿಮ್ಮ ಸ್ವಂತ ಒಡಹುಟ್ಟಿದ ಅಕ್ಕನಂತಿರುವ ಆಶಾ. ಸರ್ಕಾರದ ಯೋಜನೆಗಳ ಮೂಲಕ ನಿಮಗೆ ಯಾವುದೇ ನೆರವು ಬೇಕಿದ್ದರೂ ನಾನು ನಿಮ್ಮ ಜೊತೆಗಿರುತ್ತೇನೆ. ಹೆದರಬೇಡಿ ತಾಯಿ. ನಿಮಗೆ ಏನು ಸಹಾಯ ಬೇಕು?',
    subtitle: 'ಗ್ರಾಮೀಣ ಮಹಿಳೆಯರ ಸರ್ಕಾರಿ ಕಲ್ಯಾಣ ಯೋಜನೆ ವಾಯ್ಸ್ ಒಡನಾಡಿ',
    listenGuideText: '👉 ಮೈಕ್ ಒತ್ತಿ ನಿಮ್ಮ ಅವಶ್ಯಕತೆ ಅಥವಾ ಕಷ್ಟವನ್ನು ಮಾತನಾಡಿ',
    tapToSpeakText: 'ಮಾತನಾಡಿ',
    listeningText: '👂 ನಾನು ಕೇಳ್ತಾ ಇದ್ದೀನಿ ಅಮ್ಮ... ಮಾತನಾಡಿ',
    speakingText: 'ಆಶಾ ಮಾತನಾಡುತ್ತಿದ್ದಾಳೆ... ಕೇಳಿ',
    thinkingText: 'ಆಶಾ ಯೋಚಿಸುತ್ತಿದ್ದಾಳೆ... ಒಂದು ಕ್ಷಣ ಅಮ್ಮ',
    repeatAudioText: 'ಮತ್ತೆ ಹೇಳು ಅಕ್ಕ (ಮತ್ತೆ ಕೇಳಿ)',
    slowVoiceText: 'ನಿಧಾನ ಧ್ವನಿ (ಆನ್)',
    normalVoiceText: 'ನಿಧಾನವಾಗಿ ಮಾತನಾಡಿ',
    stopAudioText: 'ನಿಲ್ಲಿಸಿ',
    cardTitle: 'ವಾಯ್ಸ್ ಕಲ್ಯಾಣ ಪಾಸ್‌ಬುಕ್',
    cardSub: 'ಸರ್ಕಾರಿ ಕಲ್ಯಾಣ ಪತ್ರ',
    beneficiaryLabel: 'ಫಲಾನುಭವಿಯ ಹೆಸರು',
    villageLabel: 'ಗ್ರಾಮ / ಊರು',
    schemeFoundLabel: 'ನಿಮಗಾಗಿ ಆಯ್ಕೆ ಮಾಡಿದ ಯೋಜನೆ',
    documentsHeading: 'ಜೊತೆಯಲ್ಲಿ ಕೊಂಡೊಯ್ಯಬೇಕಾದ ಪ್ರಮುಖ ದಾಖಲೆಗಳು:',
    nextStepTitle: 'ಮುಂದೆ ನೀವು ಏನು ಮಾಡಬೇಕು?',
    nextStepDesc:
      'ನಿಮ್ಮ ಗ್ರಾಮ ಪಂಚಾಯತ್ ಅಥವಾ ಗ್ರಾಮ ಒನ್ ಕೇಂದ್ರಕ್ಕೆ ಹೋಗಿ ಈ ದಾಖಲೆಗಳನ್ನು ನೀಡಿ ಉಚಿತವಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.',
    readCardAloudText: 'ಈ ಕಾರ್ಡ್ ಪೂರ್ತಿ ಓದಿ ಹೇಳು (ವಾಯ್ಸ್)',
    printCardText: 'ಕಾರ್ಡ್ ಪ್ರಿಂಟ್ / ಸೇವ್ ಮಾಡಿ',
    sampleReplies: [
      'ನನಗೆ ಹೊಲಿಗೆ ಯಂತ್ರದ ಯೋಜನೆ ಬೇಕು ಅಕ್ಕ',
      'ವಿಧವಾ ಅಥವಾ ವೃದ್ಧಾಪ್ಯ ಪಿಂಚಣಿ ಬೇಕು',
      'ಸ್ತ್ರೀ ಶಕ್ತಿ ಸಂಘದ ಸಾಲ ಬೇಕು',
      'ಹಸು ಸಾಕಣೆಗೆ ಸಬ್ಸಿಡಿ ಸಾಲ ಬೇಕು',
    ],
    steps: {
      greeting: 'ಪರಿಚಯ',
      need: 'ನಿಮ್ಮ ಅಗತ್ಯ',
      scheme: 'ಯೋಜನೆ ಆಯ್ಕೆ',
      details: 'ವಿವರಗಳು',
      card: 'ಅರ್ಜಿ ಕಾರ್ಡ್',
    },
    samplePersonas: [
      {
        id: 'savitri',
        name: 'ಸಾವಿತ್ರಿ (Savitri)',
        age: '35 ವರ್ಷ',
        village: 'ಮಂಡ್ಯ ಗ್ರಾಮಾಂತರ',
        need: 'ಹೊಲಿಗೆ ಯಂತ್ರ ಬೇಕಾಗಿದೆ',
        openingSpeech:
          'ನಮಸ್ಕಾರ ಅಕ್ಕ, ನನ್ನ ಹೆಸರು ಸಾವಿತ್ರಿ. ನನಗೆ ಬಟ್ಟೆ ಹೊಲಿಯಲು ಬರುತ್ತದೆ, ಆದರೆ ಮೆಷಿನ್ ಇಲ್ಲ. ಸರ್ಕಾರದಿಂದ ಉಚಿತ ಹೊಲಿಗೆ ಮೆಷಿನ್ ಸಿಗುತ್ತಾ?',
        icon: '🧵',
      },
    ],
  },
  bn: {
    code: 'bn',
    nativeName: 'বাংলা',
    englishName: 'Bengali',
    flag: '🇮🇳',
    speechLocale: 'bn-IN',
    sisterTerm: 'দিদি / বোন',
    welcomeGreeting:
      'নমস্কার দিদি! আমি আপনার নিজের বোনের মতো আশা। সরকারি প্রকল্প বা সাহায্যের জন্য আমি সবসময় আপনার পাশে আছি। একদম ভয় পাবেন না। আপনার কী সাহায্য চাই বলুন দিদি?',
    subtitle: 'গ্রামীণ নারীদের সরকারি প্রকল্পের বিশ্বস্ত ভয়েস সহায়িকা',
    listenGuideText: '👉 মাইক টিপে আপনার প্রয়োজন বা সমস্যার কথা বলুন',
    tapToSpeakText: 'বলুন',
    listeningText: '👂 আমি শুনছি দিদি... বলুন',
    speakingText: 'আশা বলছে... শুনুন',
    thinkingText: 'আশা ভাবছে... এক মুহূর্ত অপেক্ষা করুন',
    repeatAudioText: 'আবার বলো দিদি (পুনরায় শুনুন)',
    slowVoiceText: 'ধীর কণ্ঠস্বর (অন)',
    normalVoiceText: 'ধীরে কথা বলুন',
    stopAudioText: 'থামুন',
    cardTitle: 'ভয়েস কল্যাণ পাসবুক',
    cardSub: 'সরকারি সহায়তা পত্র',
    beneficiaryLabel: 'সুবিধাভোগীর নাম',
    villageLabel: 'গ্রাম / এলাকা',
    schemeFoundLabel: 'আপনার জন্য নির্বাচিত সরকারি প্রকল্প',
    documentsHeading: 'সঙ্গে নিয়ে যাওয়ার প্রয়োজনীয় কাগজপত্র:',
    nextStepTitle: 'এরপর আপনাকে কী করতে হবে?',
    nextStepDesc:
      'আপনার গ্রাম পঞ্চায়েত বা বাংলা সহায়তা কেন্দ্রে (BSK) গিয়ে এই কাগজপত্রের জেরক্স দিয়ে বিনামূল্যে আবেদন জমা দিন।',
    readCardAloudText: 'এই কার্ডটি পড়ে শোনাও (ভয়েস)',
    printCardText: 'কার্ড প্রিন্ট / সেভ করুন',
    sampleReplies: [
      'আমার সেলাই মেশিন প্রকল্পের সাহায্য চাই দিদি',
      'বিধবা বা বার্ধক্য ভাতার দরকার',
      'স্বনির্ভর দলের কম সুদের ঋণ দরকার',
      'গাভী পালনের জন্য সরকারি অনুদান চাই',
    ],
    steps: {
      greeting: 'পরিচয়',
      need: 'আপনার প্রয়োজন',
      scheme: 'প্রকল্প বাছাই',
      details: 'তথ্য যাচাই',
      card: 'আবেদন কার্ড',
    },
    samplePersonas: [
      {
        id: 'anjali',
        name: 'অঞ্জলি মণ্ডল (Anjali Mondal)',
        age: '34 বছর',
        village: 'সুন্দরবন, দক্ষিণ ২৪ পরগনা',
        need: 'সেলাই মেশিন ও জীবিকা সহায়তা',
        openingSpeech:
          'নমস্কার দিদি, আমার নাম অঞ্জলি। আমার পরিবার চালাতে সেলাই মেশিন দরকার। সরকার থেকে কি কোনো সাহায্য পাওয়া যাবে?',
        icon: '🧵',
      },
    ],
  },
  mr: {
    code: 'mr',
    nativeName: 'मराठी',
    englishName: 'Marathi',
    flag: '🇮🇳',
    speechLocale: 'mr-IN',
    sisterTerm: 'ताई / माई',
    welcomeGreeting:
      'नमस्कार ताई! मी तुमच्या सख्ख्या बहिणीसारखी आशा आहे. कोणत्याही सरकारी योजनेसाठी किंवा मदतीसाठी मी तुमच्या पाठीशी खंबीरपणे उभी आहे. अजिबात घाबरू नका. तुम्हाला कोणत्या कामासाठी मदत हवी आहे ताई?',
    subtitle: 'ग्रामीण महिलांची शासकीय योजनांसाठी हक्काची व्हॉइस मदतनीस',
    listenGuideText: '👉 माईक दाबा आणि तुमची गरज किंवा अडचण मनमोकळेपणाने सांगा',
    tapToSpeakText: 'बोला',
    listeningText: '👂 मी ऐकतेय ताई... बोला',
    speakingText: 'आशा बोलतेय... ऐका',
    thinkingText: 'आशा विचार करतेय... एक क्षण थांबा ताई',
    repeatAudioText: 'ताई पुन्हा सांग (पुन्हा ऐका)',
    slowVoiceText: 'हळू आवाज (चालू)',
    normalVoiceText: 'हळू आवाजात बोला',
    stopAudioText: 'थांबवा',
    cardTitle: 'व्हॉइस कल्याण पासबुक',
    cardSub: 'शासकीय कल्याण पत्र',
    beneficiaryLabel: 'लाभार्थीचे नाव',
    villageLabel: 'गाव / तालुका',
    schemeFoundLabel: 'तुमच्यासाठी निवडलेली योजना',
    documentsHeading: 'सोबत नेण्याची आवश्यक कागदपत्रे:',
    nextStepTitle: 'पुढे तुम्हाला काय करावे लागेल?',
    nextStepDesc:
      'तुमच्या ग्रामपंचायत किंवा आपले सरकार सेवा केंद्रात जाऊन या कागदपत्रांच्या झेरॉक्स प्रती जमा करा आणि मोफत अर्ज भरा.',
    readCardAloudText: 'हे संपूर्ण कार्ड वाचून दाखव (व्हॉइस)',
    printCardText: 'कार्ड सेव्ह / प्रिंट करा',
    sampleReplies: [
      'मला शिलाई मशीन योजना हवी आहे ताई',
      'मला विधवा किंवा श्रावणबाळ पेन्शन हवी आहे',
      'महिला बचत गटाचे कर्ज हवे आहे',
      'दुग्ध व्यवसायासाठी गाय-म्हशीचे कर्ज हवे आहे',
    ],
    steps: {
      greeting: 'ओळख',
      need: 'तुमची गरज',
      scheme: 'योजना निवड',
      details: 'माहिती',
      card: 'अर्ज कार्ड',
    },
    samplePersonas: [
      {
        id: 'sunita',
        name: 'सुनिता ताई (Sunita Tai)',
        age: '38 वर्षे',
        village: 'पंढरपूर ग्रामीण, सोलापूर',
        need: 'शिलाई मशीन व टेलरिंग व्यवसाय',
        openingSpeech:
          'नमस्कार ताई, माझं नाव सुनिता. मला शिलाई काम येतं पण स्वतःचे मशीन नाही. सरकारकडून शिलाई मशीनसाठी काही मदत मिळेल का?',
        icon: '🧵',
      },
    ],
  },
  en: {
    code: 'en',
    nativeName: 'English',
    englishName: 'English',
    flag: '🇮🇳',
    speechLocale: 'en-IN',
    sisterTerm: 'Sister / Amma',
    welcomeGreeting:
      'Namaste Sister! I am Aasha, your caring village companion. Whatever government welfare scheme or assistance you need, I am here to guide you step-by-step. Please do not worry. What help do you need today?',
    subtitle: 'Voice-Native Welfare Companion for Rural Women',
    listenGuideText: '👉 Tap the microphone and speak your need in your own words',
    tapToSpeakText: 'Speak',
    listeningText: '👂 I am listening... please speak',
    speakingText: 'Aasha is speaking... listen',
    thinkingText: 'Aasha is preparing your answer... one moment',
    repeatAudioText: 'Repeat what you said (Listen Again)',
    slowVoiceText: 'Slow Voice (On)',
    normalVoiceText: 'Speak Slowly',
    stopAudioText: 'Stop',
    cardTitle: 'Voice Welfare Passbook Card',
    cardSub: 'Official Scheme Advisory Card',
    beneficiaryLabel: 'Beneficiary Name',
    villageLabel: 'Village / Area',
    schemeFoundLabel: 'Selected Scheme for You',
    documentsHeading: 'Key Documents to Carry:',
    nextStepTitle: 'What should you do next? (Next Steps)',
    nextStepDesc:
      'Visit your local Village Secretariat (Grama Sachivalayam) or Common Service Centre (CSC) with photocopies of these documents to submit your free application.',
    readCardAloudText: 'Read Entire Card Aloud (Voice)',
    printCardText: 'Print / Save Card',
    sampleReplies: [
      'I need a sewing machine scheme for tailoring',
      'I need widow or old age pension support',
      'I need self-help group livelihood loan',
      'I need cattle dairy farming subsidy',
    ],
    steps: {
      greeting: 'Greeting',
      need: 'Your Need',
      scheme: 'Scheme Match',
      details: 'Details',
      card: 'Welfare Card',
    },
    samplePersonas: [
      {
        id: 'lakshmi-en',
        name: 'Lakshmi (Rural Artisan)',
        age: '38 years',
        village: 'Warangal District',
        need: 'Sewing machine scheme for livelihood',
        openingSpeech:
          'Namaste Sister, my name is Lakshmi. I know tailoring but do not have a machine. Is there any government scheme to help me get a sewing machine?',
        icon: '🧵',
      },
    ],
  },
};
