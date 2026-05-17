/**
 * Health check submission shape — wire format between wizard, API, rules
 * engine and PDF generator. Keep these types stable; the rules engine
 * branches on the literal string values.
 */

export type AgencyType =
  | "marketing"
  | "creative"
  | "digital"
  | "advertising"
  | "pr"
  | "web-design"
  | "seo"
  | "ppc"
  | "performance-marketing"
  | "social-media"
  | "ai"
  | "saas"
  | "ecommerce"
  | "video-production"
  | "branding"
  | "influencer-marketing"
  | "email-marketing"
  | "recruitment"
  | "crypto-web3"
  | "other";

export type RevenueBand =
  | "under-50k"
  | "50k-90k"
  | "90k-250k"
  | "250k-500k"
  | "500k-1m"
  | "1m-2m"
  | "2m-5m"
  | "over-5m";

export type Entity =
  | "sole-trader"
  | "ltd"
  | "ltd-group"
  | "llp"
  | "partnership"
  | "none-yet";

export type RdActivity = "none" | "occasional" | "regular" | "core";

export type ContractorUse = "none" | "occasional" | "regular" | "primary";

export type International =
  | "uk-only"
  | "eu-clients"
  | "us-clients"
  | "uae-clients"
  | "other-non-uk"
  | "uae-move-planned";

export type ExitHorizon = "no-plan" | "1-2y" | "3-5y" | "5y-plus";

export interface HealthCheckAnswers {
  name: string;
  email: string;
  company?: string;
  agencyType: AgencyType;
  revenueBand: RevenueBand;
  entity: Entity;
  profitPreTax: number;
  currentSalary: number;
  currentDividend: number;
  rdActivity: RdActivity;
  contractorUse: ContractorUse;
  international: International[];
  exitHorizon: ExitHorizon;
  topConcern: string;
}

export type Severity = "high" | "medium" | "low" | "info";

export type Category =
  | "extraction"
  | "structure"
  | "vat"
  | "r-and-d"
  | "ir35"
  | "exit"
  | "international"
  | "mtd"
  | "pension";

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
