// Composes guided-enquiry answers into the single `message` string stored on
// the lead. Ported verbatim from Property/web/src/lib/leads/enquiry-message.ts.

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
  if (promptedIdx === -1) {
    return { situation: rest };
  }

  const situation = rest.slice(0, promptedIdx);
  rest = rest.slice(promptedIdx + LABEL_PROMPTED.length);

  const callGoalIdx = rest.indexOf(LABEL_CALL_GOAL);
  if (callGoalIdx === -1) {
    return { situation, prompted: rest };
  }

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

  if (s.length > 0) {
    s = s[0].toLowerCase() + s.slice(1);
  }

  s = s.replace(/\s+/g, " ").trim();

  if (s.endsWith(".")) {
    s = s.slice(0, -1);
  }

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

// IR35-specific category phrases (no property/dental/solicitor references).
const CATEGORY_PHRASE_MAP: Record<string, string> = {
  ir35_status: "understand your IR35 status and what it means for your take-home",
  umbrella_vs_limited: "compare working through an umbrella company versus a limited company",
  day_rate: "work out your day rate, take-home and tax position",
  msc_risk: "check whether your arrangement could be caught by the managed service company rules",
  corporation_tax: "review the corporation tax position for your limited company",
  payroll: "get payroll and salary-dividend split sorted",
  self_assessment: "get on top of self assessment as a contractor",
  vat: "get the VAT position clear for your contracting business",
  pensions: "understand pension options and tax relief available to contractors",
};

export function categoryPhrase(
  intentCategory?: string,
  _role?: string,
): string {
  if (intentCategory && intentCategory in CATEGORY_PHRASE_MAP) {
    return CATEGORY_PHRASE_MAP[intentCategory];
  }
  return "get your contracting tax and IR35 position clear";
}
