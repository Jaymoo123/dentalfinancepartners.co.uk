import nicheConfigJson from "../../../niche.config.json";
import { validateNicheConfig } from "@accounting-network/web-shared/lib/niche-config";
import type { NicheConfig as SharedNicheConfig } from "@accounting-network/web-shared/lib/niche-config";

/** Extends the shared type with the estate-wide registered-company block. */
export interface NicheConfig extends SharedNicheConfig {
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
  /** Specialist partner firm enquiries are shared with, or null when handled in-house. */
  partner: { name: string; privacy_policy_url: string | null } | null;
}

export const niche = validateNicheConfig(nicheConfigJson) as NicheConfig;

export function getSiteUrl(): string {
  return (
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) ||
    `https://${niche.domain}`
  );
}
