export type Role =
  | "sole-practitioner"
  | "equity-partner"
  | "fixed-share"
  | "salaried-partner"
  | "associate"
  | "trainee"
  | "consultant"
  | "colp-cofa"
  | "other";

export type FirmType =
  | "sole-practitioner"
  | "small-partnership"
  | "small-llp"
  | "mid-llp"
  | "large-llp"
  | "abs"
  | "incorporated";

export type PracticeArea =
  | "conveyancing-heavy"
  | "private-client"
  | "family"
  | "litigation"
  | "commercial"
  | "criminal"
  | "personal-injury"
  | "mixed"
  | "specialist-niche";

export type Entity =
  | "sole-trader"
  | "partnership"
  | "llp"
  | "ltd"
  | "abs"
  | "consultant-ltd"
  | "consultant-sole-trader"
  | "umbrella";

export type ClientMoneyVolume =
  | "none"
  | "very-low"
  | "low"
  | "moderate"
  | "high"
  | "very-high";

export type ExitHorizon =
  | "no-plan"
  | "selling-within-2y"
  | "selling-3-5y"
  | "selling-5y-plus"
  | "buying-firm"
  | "merging-or-partnering";

export type AccountantSatisfaction =
  | "no-accountant"
  | "high"
  | "ok"
  | "low"
  | "switching";

export interface HealthCheckAnswers {
  name: string;
  email: string;
  firmName?: string;
  role: Role;
  firmType: FirmType;
  practiceArea: PracticeArea;
  entity: Entity;
  feeEarnerCount: number;
  profitPreTax: number;
  partnerDrawings: number;
  clientMoneyVolume: ClientMoneyVolume;
  cofaInPlace: boolean;
  exitHorizon: ExitHorizon;
  accountantSatisfaction: AccountantSatisfaction;
  topConcern: string;
}

export type Severity = "high" | "medium" | "low" | "info";

export type Category =
  | "sra-compliance"
  | "structure"
  | "extraction"
  | "indemnity"
  | "ir35"
  | "exit"
  | "goodwill"
  | "vat"
  | "fa-2014";

export interface Opportunity {
  id: string;
  severity: Severity;
  category: Category;
  title: string;
  detail: string;
  action: string;
  estimatedSaving?: string;
  reference?: string;
}
