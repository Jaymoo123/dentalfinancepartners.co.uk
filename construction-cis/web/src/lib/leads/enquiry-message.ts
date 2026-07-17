// Composes three guided-enquiry parts into the `message` string stored on the lead.
// CIS-specific categoryPhrase fallbacks; everything else is shared logic.

export const SITUATION_MIN_CHARS = 40;

export const ENQUIRY_ERRORS = {
  situation: "Tell us a bit more so we can prepare. A couple of sentences is ideal.",
  prompted: "Tell us what has prompted your enquiry.",
  callGoal: "Tell us what you would like from the call.",
} as const;

export type EnquiryParts = {
  situation: string;
  prompted: string;
  callGoal: string;
};

export function validateEnquiryParts(
  parts: EnquiryParts,
): Partial<Record<keyof EnquiryParts, string>> {
  const errs: Partial<Record<keyof EnquiryParts, string>> = {};
  if (parts.situation.trim().length < SITUATION_MIN_CHARS) {
    errs.situation = ENQUIRY_ERRORS.situation;
  }
  if (parts.prompted.trim().length < 3) {
    errs.prompted = ENQUIRY_ERRORS.prompted;
  }
  if (parts.callGoal.trim().length < 3) {
    errs.callGoal = ENQUIRY_ERRORS.callGoal;
  }
  return errs;
}

export function composeEnquiryMessage(parts: EnquiryParts): string {
  const situation = parts.situation.trim();
  const prompted = parts.prompted.trim();
  const callGoal = parts.callGoal.trim();
  return `Situation: ${situation}\n\nPrompted by: ${prompted}\n\nWants from call: ${callGoal}`;
}

export interface EnquiryEchoes {
  situation?: string;
  prompted?: string;
  callGoal?: string;
}

const LABEL_SITUATION = "Situation: ";
const LABEL_PROMPTED = "\n\nPrompted by: ";
const LABEL_CALL_GOAL = "\n\nWants from call: ";

export function parseEnquiryEchoes(
  message: string | null | undefined,
): EnquiryEchoes {
  if (!message || !message.startsWith(LABEL_SITUATION)) return {};

  let rest = message.slice(LABEL_SITUATION.length);

  const promptedIdx = rest.indexOf(LABEL_PROMPTED);
  if (promptedIdx === -1) return { situation: rest };

  const situation = rest.slice(0, promptedIdx);
  rest = rest.slice(promptedIdx + LABEL_PROMPTED.length);

  const callGoalIdx = rest.indexOf(LABEL_CALL_GOAL);
  if (callGoalIdx === -1) return { situation, prompted: rest };

  const prompted = rest.slice(0, callGoalIdx);
  const callGoal = rest.slice(callGoalIdx + LABEL_CALL_GOAL.length);

  return { situation, prompted, callGoal };
}

const ECHO_ALLOWED_RE = /^[a-zA-Z0-9 £%&',.()-]*$/;

const STRIP_PREFIXES_RE =
  /^(?:i would like to |i'd like to |i want to |we want to |to )/i;

export function normaliseEcho(raw: string | undefined): string {
  if (raw === undefined || raw === null) return "";

  let s = (raw as string).trim();
  s = s.replace(STRIP_PREFIXES_RE, "");
  if (s.length > 0) s = s[0].toLowerCase() + s.slice(1);
  s = s.replace(/\s+/g, " ").trim();
  if (s.endsWith(".")) s = s.slice(0, -1);
  if (s.length < 8) return "";

  if (s.length > 120) {
    const cut = s.lastIndexOf(" ", 119);
    s = cut >= 0 ? s.slice(0, cut) : s.slice(0, 120);
  }

  if (s.includes("@")) return "";
  if (/https?:\/\//i.test(s) || /www\./i.test(s)) return "";
  if (/\d{7,}/.test(s)) return "";
  if (!ECHO_ALLOWED_RE.test(s)) return "";

  return s;
}

// CIS-specific category phrase map.
const CATEGORY_PHRASE_MAP: Record<string, string> = {
  cis_refund: "claim your CIS tax refund",
  cis_deduction: "understand your CIS deductions and what you can reclaim",
  cis300: "get on top of CIS300 returns and avoid penalties",
  vat_reverse_charge: "understand the CIS VAT reverse charge and stay compliant",
  gross_payment_status: "apply for gross payment status and keep more of each payment",
  sole_trader_vs_limited: "work out whether a limited company makes sense for your trade",
  self_assessment: "get your Self Assessment filed correctly and on time",
};

/**
 * Neutral fallback phrase when no clean echo exists, derived from intent
 * category. Falls back to a generic CIS trade phrase.
 */
export function categoryPhrase(
  intentCategory?: string,
  _role?: string,
): string {
  if (intentCategory && intentCategory in CATEGORY_PHRASE_MAP) {
    return CATEGORY_PHRASE_MAP[intentCategory];
  }
  return "sort out your CIS tax position";
}
