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
      model: "nova-3",
      language: languageCode,
    },
    voice: {
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.5, // Optimized for cost - higher stability = less regeneration needed
      similarityBoost: 0.75, // Slightly reduced to save on processing
      speed: 1,
      style: 0.4, // Reduced style variation to save costs
      useSpeakerBoost: false, // Disabled to reduce API costs
    },
    model: {
      provider: "openai",
      // Using GPT-3.5-turbo for cost efficiency (10-30x cheaper than GPT-4)
      // GPT-4 costs ~$0.03 per 1K input tokens, GPT-3.5-turbo costs ~$0.0015 per 1K tokens
      model: "gpt-3.5-turbo",
      temperature: 0.7, // Lower temperature for more consistent, cost-effective responses
      maxTokens: 150, // Limit response length to reduce costs
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
                    Keep your responses SHORT (2-3 sentences max) - this is a voice conversation.
                    Do not include any special characters in your responses - this is a voice conversation.
              `,
        },
      ],
    },
    clientMessages: [],
    serverMessages: [],
  };
  return vapiAssistant;
};
