import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { subjectsColors, voices } from "@/constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSubjectColor = (subject: string) => {
  return subjectsColors[subject as keyof typeof subjectsColors];
};

// Language code mapping for Deepgram transcriber
const languageCodes: Record<string, string> = {
  english: "en",
  hindi: "hi",
  french: "fr",
  spanish: "es",
  german: "de",
  korean: "ko",
  chinese: "zh",
};

export const configureAssistant = (voice: string, style: string, language: string = "english") => {
  const voiceId = voices[voice as keyof typeof voices][
          style as keyof (typeof voices)[keyof typeof voices]
          ] || "sarah";

  const languageCode = languageCodes[language.toLowerCase()] || "en";

  const vapiAssistant: CreateAssistantDTO = {
    name: "Companion",
    firstMessage:
        "Hello, let's start the session. Today we'll be talking about {{topic}}.",
    transcriber: {
      provider: "deepgram",
      model: "nova-2", // Faster model for better real-time performance (nova-2 is faster than nova-3)
      language: languageCode,
    },
    voice: {
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 1,
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a highly knowledgeable tutor teaching a real-time voice session with a student. Your goal is to teach the student about the topic and subject.

                    Tutor Guidelines:
                    Stick to the given topic - {{ topic }} and subject - {{ subject }} and teach the student about it.
                    Keep the conversation flowing smoothly while maintaining control.
                    From time to time make sure that the student is following you and understands you.
                    Break down the topic into smaller parts and teach the student one part at a time.
                    Keep your style of conversation {{ style }}.
                    Keep your responses concise and natural, like in a real voice conversation.
                    Do not include any special characters in your responses - this is a voice conversation.

                    IMPORTANT - Dynamic Language Switching:
                    The student may request you to switch languages during the conversation. For example:
                    - "First say it in French, then explain in English"
                    - "Help me in Hindi first, then English"
                    - "Say this in Spanish, then teach in English"
                    
                    When the student requests language switching:
                    1. IMMEDIATELY acknowledge and switch to the requested language(s)
                    2. Follow the sequence they specify (e.g., "first French, then English" means: respond in French first, then continue in English)
                    3. You can seamlessly switch between languages within the same response if requested
                    4. Maintain the teaching quality regardless of language
                    5. If they say "first in [language] then in [language]", respond accordingly in that sequence
                    
                    Supported languages: English, French, Spanish, German, Hindi, Korean, Chinese.
                    Always prioritize understanding the student's language preference and adapt immediately.
              `,
        },
      ],
    },
    clientMessages: [],
    serverMessages: [],
  };
  return vapiAssistant;
};
