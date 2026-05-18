import type {
  AccountantSatisfaction,
  Entity,
  GoodwillPlans,
  NhsPensionStatus,
  PracticeType,
  Role,
  UdaBand,
} from "./types";

export const ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: "associate", label: "Associate dentist" },
  { value: "principal", label: "Principal / practice owner" },
  { value: "partner", label: "Partner in a partnership / LLP" },
  { value: "locum", label: "Locum dentist" },
  { value: "foundation", label: "Foundation / vocational trainee" },
  { value: "specialist", label: "Specialist (ortho, endo, perio, oral surgery, etc.)" },
  { value: "other", label: "Other dental professional" },
];

export const PRACTICE_TYPE_OPTIONS: { value: PracticeType; label: string }[] = [
  { value: "nhs-only", label: "NHS only" },
  { value: "nhs-heavy", label: "Mostly NHS (over 75% NHS)" },
  { value: "mixed", label: "Mixed NHS + private (roughly balanced)" },
  { value: "private-heavy", label: "Mostly private (over 75% private)" },
  { value: "private-only", label: "Private only" },
  { value: "na", label: "Not applicable (e.g. locum-only)" },
];

export const UDA_BAND_OPTIONS: { value: UdaBand; label: string; midpoint: number }[] = [
  { value: "under-1k", label: "Under 1,000 UDAs", midpoint: 500 },
  { value: "1k-2k", label: "1,000 – 2,000 UDAs", midpoint: 1500 },
  { value: "2k-5k", label: "2,000 – 5,000 UDAs", midpoint: 3500 },
  { value: "5k-10k", label: "5,000 – 10,000 UDAs", midpoint: 7500 },
  { value: "10k-20k", label: "10,000 – 20,000 UDAs", midpoint: 15000 },
  { value: "over-20k", label: "Over 20,000 UDAs", midpoint: 25000 },
  { value: "na", label: "No NHS contract / Wales / NI", midpoint: 0 },
];

export const ENTITY_OPTIONS: { value: Entity; label: string }[] = [
  { value: "sole-trader", label: "Sole trader (self-employed)" },
  { value: "partnership", label: "Partnership" },
  { value: "llp", label: "LLP" },
  { value: "ltd", label: "Limited company" },
  { value: "ltd-group", label: "Ltd group (holding + trading)" },
  { value: "umbrella", label: "Umbrella company (locum/associate)" },
  { value: "none-yet", label: "No formal structure yet" },
];

export const NHS_PENSION_OPTIONS: { value: NhsPensionStatus; label: string }[] = [
  { value: "active-full", label: "Active full member" },
  { value: "active-retainer", label: "Active on retainer terms" },
  { value: "opted-out", label: "Opted out" },
  { value: "never-joined", label: "Never joined" },
  { value: "retired-drawing", label: "Retired and drawing pension" },
  { value: "unsure", label: "Unsure of current status" },
];

export const GOODWILL_OPTIONS: { value: GoodwillPlans; label: string }[] = [
  { value: "no-plan", label: "No current sale or purchase plans" },
  { value: "buying-now", label: "Buying a practice in the next 12 months" },
  { value: "selling-within-2y", label: "Selling within 2 years" },
  { value: "selling-3-5y", label: "Selling 3-5 years out" },
  { value: "selling-5y-plus", label: "Selling 5+ years out" },
  { value: "merging-or-partnering", label: "Merging / bringing in a partner" },
];

export const ACCOUNTANT_OPTIONS: { value: AccountantSatisfaction; label: string }[] = [
  { value: "no-accountant", label: "I don't have an accountant" },
  { value: "high", label: "Happy with my current accountant" },
  { value: "ok", label: "Current accountant is okay, not specialist" },
  { value: "low", label: "Not happy with current arrangement" },
  { value: "switching", label: "Actively looking to switch" },
];
