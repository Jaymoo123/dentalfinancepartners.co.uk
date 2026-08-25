/**
 * FAQ set for divorce-finances SpecialistWidget.
 *
 * STUB (scaffold phase): GENERIC only. BY_TOPIC is filled with real,
 * HP-traced answers once the house positions are set and the calculator
 * fleet exists.
 *
 * UK English. No em-dashes. Storage prefix: dvf.
 */
import type { TopicKey } from "@/lib/intent/taxonomy";

export type Faq = { q: string; a: string };

/** Generic Q&As shown when no topic is known (reply time / free call / what to have ready). */
export const GENERIC: Faq[] = [
  {
    q: "How quickly will a specialist reply?",
    a: "Within one working day, and usually sooner. Leave your email and a one-line question and a specialist will come back to you personally.",
  },
  {
    q: "Is the first call free?",
    a: "Yes. The initial conversation to understand your situation and point you in the right direction is free, with no obligation.",
  },
  {
    q: "What should I have ready?",
    a: "Roughly: where you are in the process, what the main assets are, and what you most want to understand first. If you are not sure, we will guide you.",
  },
];

/** Topic-specific Q&As (empty at scaffold; filled with HP-traced answers later). */
export const BY_TOPIC: Partial<Record<TopicKey, Faq[]>> = {};
