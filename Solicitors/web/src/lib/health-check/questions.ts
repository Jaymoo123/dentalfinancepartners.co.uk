import type {
  AccountantSatisfaction,
  ClientMoneyVolume,
  Entity,
  ExitHorizon,
  FirmType,
  PracticeArea,
  Role,
} from "./types";

export const ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: "sole-practitioner", label: "Sole practitioner solicitor" },
  { value: "equity-partner", label: "Equity partner / member" },
  { value: "fixed-share", label: "Fixed-share partner / member" },
  { value: "salaried-partner", label: "Salaried partner" },
  { value: "associate", label: "Associate solicitor" },
  { value: "trainee", label: "Trainee / newly qualified" },
  { value: "consultant", label: "Consultant / locum solicitor" },
  { value: "colp-cofa", label: "COLP / COFA only role" },
  { value: "other", label: "Other (paralegal, legal exec, etc.)" },
];

export const FIRM_TYPE_OPTIONS: { value: FirmType; label: string }[] = [
  { value: "sole-practitioner", label: "Sole practitioner" },
  { value: "small-partnership", label: "Partnership (2-5 partners)" },
  { value: "small-llp", label: "LLP (2-5 members)" },
  { value: "mid-llp", label: "LLP (6-15 members)" },
  { value: "large-llp", label: "LLP (16+ members)" },
  { value: "abs", label: "ABS (Alternative Business Structure)" },
  { value: "incorporated", label: "Limited company (Ltd / PLC)" },
];

export const PRACTICE_AREA_OPTIONS: { value: PracticeArea; label: string }[] = [
  { value: "conveyancing-heavy", label: "Conveyancing-heavy (residential / commercial)" },
  { value: "private-client", label: "Private client (wills, probate, trusts)" },
  { value: "family", label: "Family law" },
  { value: "litigation", label: "Litigation (commercial or general)" },
  { value: "commercial", label: "Commercial / corporate" },
  { value: "criminal", label: "Criminal law" },
  { value: "personal-injury", label: "Personal injury" },
  { value: "mixed", label: "Mixed general practice" },
  { value: "specialist-niche", label: "Specialist niche (employment, IP, immigration, etc.)" },
];

export const ENTITY_OPTIONS: { value: Entity; label: string }[] = [
  { value: "sole-trader", label: "Sole trader (self-employed)" },
  { value: "partnership", label: "General partnership" },
  { value: "llp", label: "LLP" },
  { value: "ltd", label: "Limited company" },
  { value: "abs", label: "ABS-licensed entity" },
  { value: "consultant-sole-trader", label: "Sole-trader consultant" },
  { value: "consultant-ltd", label: "Ltd-co consultant" },
  { value: "umbrella", label: "Umbrella company (locum / consultant)" },
];

export const CLIENT_MONEY_OPTIONS: { value: ClientMoneyVolume; label: string }[] = [
  { value: "none", label: "None (we hold no client money)" },
  { value: "very-low", label: "Very low (under £10,000 ever)" },
  { value: "low", label: "Low (occasional retainers / one-off matters)" },
  { value: "moderate", label: "Moderate (typical mid-size firm volume)" },
  { value: "high", label: "High (conveyancing-significant)" },
  { value: "very-high", label: "Very high (conveyancing-factory scale)" },
];

export const EXIT_OPTIONS: { value: ExitHorizon; label: string }[] = [
  { value: "no-plan", label: "No current sale / buy plans" },
  { value: "selling-within-2y", label: "Planning to sell / retire within 2 years" },
  { value: "selling-3-5y", label: "Selling / retiring in 3-5 years" },
  { value: "selling-5y-plus", label: "Selling / retiring 5+ years out" },
  { value: "buying-firm", label: "Buying / acquiring a firm in next 12 months" },
  { value: "merging-or-partnering", label: "Merging / bringing in a partner" },
];

export const ACCOUNTANT_OPTIONS: { value: AccountantSatisfaction; label: string }[] = [
  { value: "no-accountant", label: "I don't have an accountant" },
  { value: "high", label: "Happy with current accountant" },
  { value: "ok", label: "Current accountant is okay, not specialist" },
  { value: "low", label: "Not happy with current arrangement" },
  { value: "switching", label: "Actively looking to switch" },
];
