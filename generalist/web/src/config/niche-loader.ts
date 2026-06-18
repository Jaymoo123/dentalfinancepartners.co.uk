import nicheConfigJson from "../../../niche.config.json";
import { validateNicheConfig } from "@accounting-network/web-shared/lib/niche-config";
export type { NicheConfig } from "@accounting-network/web-shared/lib/niche-config";

// Extend the shared NicheConfig with blocks that are required on this site.
// The shared interface marks company and partner as optional (not all sites use them yet);
// here we re-declare them as required so TypeScript catches any missing JSON field at build time.
export interface GeneralistNicheConfig
  extends ReturnType<typeof validateNicheConfig> {
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

export const niche = validateNicheConfig(nicheConfigJson) as GeneralistNicheConfig;

export function getSiteUrl(): string {
  return (
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) ||
    `https://${niche.domain}`
  );
}
