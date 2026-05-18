export type Role =
  | "associate"
  | "principal"
  | "partner"
  | "locum"
  | "foundation"
  | "specialist"
  | "other";

export type PracticeType =
  | "nhs-only"
  | "nhs-heavy"
  | "mixed"
  | "private-heavy"
  | "private-only"
  | "na";

export type UdaBand =
  | "under-1k"
  | "1k-2k"
  | "2k-5k"
  | "5k-10k"
  | "10k-20k"
  | "over-20k"
  | "na";

export type Entity =
  | "sole-trader"
  | "partnership"
  | "llp"
  | "ltd"
  | "ltd-group"
  | "umbrella"
  | "none-yet";

export type NhsPensionStatus =
  | "active-full"
  | "active-retainer"
  | "opted-out"
  | "never-joined"
  | "retired-drawing"
  | "unsure";

export type GoodwillPlans =
  | "no-plan"
  | "buying-now"
  | "selling-within-2y"
  | "selling-3-5y"
  | "selling-5y-plus"
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
  practiceName?: string;
  role: Role;
  practiceType: PracticeType;
  udaBand: UdaBand;
  associateCount: number;
  entity: Entity;
  profitPreTax: number;
  currentSalary: number;
  currentDividend: number;
  nhsPensionStatus: NhsPensionStatus;
  goodwillPlans: GoodwillPlans;
  accountantSatisfaction: AccountantSatisfaction;
  topConcern: string;
}

export type Severity = "high" | "medium" | "low" | "info";

export type Category =
  | "structure"
  | "extraction"
  | "nhs-pension"
  | "ir35"
  | "vat"
  | "exit"
  | "goodwill"
  | "compliance"
  | "associate"
  | "locum";

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
