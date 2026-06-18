import nicheConfigJson from "../../../niche.config.json";
import { validateNicheConfig } from "@accounting-network/web-shared/lib/niche-config";
export type { NicheConfig } from "@accounting-network/web-shared/lib/niche-config";

// Augment the validated config with the required company block (always present for this site).
export interface ContractorsNicheConfig
  extends Omit<ReturnType<typeof validateNicheConfig>, "company"> {
  company: {
    number: string;
    place_of_registration: string;
    registered_office: {
      line1: string;
      line2: string;
      city: string;
      postcode: string;
    };
    vat_number: string | null;
    enquiry_retention_months: number;
  };
  partner: { name: string; privacy_policy_url: string | null } | null;
}

export const niche = validateNicheConfig(nicheConfigJson) as ContractorsNicheConfig;

export function getSiteUrl(): string {
  return (
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) ||
    `https://${niche.domain}`
  );
}
