import type {
  AgencyType,
  ContractorUse,
  Entity,
  ExitHorizon,
  International,
  RdActivity,
  RevenueBand,
} from "./types";

export const AGENCY_TYPE_OPTIONS: { value: AgencyType; label: string }[] = [
  { value: "marketing", label: "Marketing agency" },
  { value: "creative", label: "Creative agency" },
  { value: "digital", label: "Digital agency" },
  { value: "advertising", label: "Advertising agency" },
  { value: "pr", label: "PR / communications" },
  { value: "web-design", label: "Web design / development" },
  { value: "seo", label: "SEO agency" },
  { value: "ppc", label: "PPC agency" },
  { value: "performance-marketing", label: "Performance marketing" },
  { value: "social-media", label: "Social media agency" },
  { value: "ai", label: "AI agency" },
  { value: "saas", label: "SaaS / product agency" },
  { value: "ecommerce", label: "Ecommerce agency" },
  { value: "video-production", label: "Video production" },
  { value: "branding", label: "Branding agency" },
  { value: "influencer-marketing", label: "Influencer marketing" },
  { value: "email-marketing", label: "Email marketing" },
  { value: "recruitment", label: "Recruitment / talent" },
  { value: "crypto-web3", label: "Crypto / Web3 agency" },
  { value: "other", label: "Other agency type" },
];

export const REVENUE_BAND_OPTIONS: {
  value: RevenueBand;
  label: string;
  midpoint: number;
}[] = [
  { value: "under-50k", label: "Under £50,000", midpoint: 30000 },
  { value: "50k-90k", label: "£50,000 – £90,000", midpoint: 70000 },
  { value: "90k-250k", label: "£90,000 – £250,000", midpoint: 170000 },
  { value: "250k-500k", label: "£250,000 – £500,000", midpoint: 375000 },
  { value: "500k-1m", label: "£500,000 – £1m", midpoint: 750000 },
  { value: "1m-2m", label: "£1m – £2m", midpoint: 1500000 },
  { value: "2m-5m", label: "£2m – £5m", midpoint: 3500000 },
  { value: "over-5m", label: "Over £5m", midpoint: 7500000 },
];

export const ENTITY_OPTIONS: { value: Entity; label: string }[] = [
  { value: "sole-trader", label: "Sole trader" },
  { value: "ltd", label: "Single Ltd company" },
  { value: "ltd-group", label: "Ltd group (holdco + opco)" },
  { value: "llp", label: "LLP" },
  { value: "partnership", label: "Partnership" },
  { value: "none-yet", label: "No formal structure yet" },
];

export const RD_OPTIONS: { value: RdActivity; label: string; helper: string }[] = [
  { value: "none", label: "None", helper: "We just deliver services" },
  { value: "occasional", label: "Occasionally", helper: "Sometimes we build something new" },
  { value: "regular", label: "Regularly", helper: "Custom builds, tooling, integrations" },
  { value: "core", label: "It's core to what we do", helper: "Building software / models is the work" },
];

export const CONTRACTOR_OPTIONS: {
  value: ContractorUse;
  label: string;
  helper: string;
}[] = [
  { value: "none", label: "None, all employees", helper: "PAYE workforce only" },
  { value: "occasional", label: "Occasional freelancers", helper: "A few per year" },
  { value: "regular", label: "Regular freelancers", helper: "Several engaged most months" },
  { value: "primary", label: "Primarily contractors", helper: "Contractor-led model" },
];

export const INTERNATIONAL_OPTIONS: { value: International; label: string }[] = [
  { value: "uk-only", label: "UK clients only" },
  { value: "eu-clients", label: "EU clients" },
  { value: "us-clients", label: "US clients" },
  { value: "uae-clients", label: "UAE / non-EU clients" },
  { value: "other-non-uk", label: "Other non-UK clients" },
  { value: "uae-move-planned", label: "I'm planning a UAE relocation" },
];

export const EXIT_OPTIONS: { value: ExitHorizon; label: string }[] = [
  { value: "no-plan", label: "No plan to sell" },
  { value: "1-2y", label: "1–2 years out" },
  { value: "3-5y", label: "3–5 years out" },
  { value: "5y-plus", label: "5+ years out" },
];
