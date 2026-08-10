import nicheConfigJson from "../../../niche.config.json";

export interface CtaLink {
  label: string;
  href: string;
}

/** Mirrors web-shared CtaVariantConfig (packages experiment). Type-only, no validator. */
export interface CtaVariantConfig {
  header_primary: CtaLink;
  header_secondary?: CtaLink;
  hero_primary: CtaLink;
  hero_secondary?: CtaLink;
  sticky: {
    primary: string;
    secondary: string;
    button: string;
    href: string;
  };
  blog: {
    cta_heading: string;
    cta_body: string;
    cta_button: string;
  };
  home_cta: {
    heading: string;
    body: string;
    primary: CtaLink;
    secondary?: CtaLink;
  };
}

export interface NicheConfig {
  niche_id: string;
  display_name: string;
  legal_name: string;
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
  /** Specialist partner firm enquiries are shared with, or null when handled in-house.
   *  `descriptor` is an optional suffix shown after the name (e.g. a group
   *  disclosure like "(part of a wider group of companies)"). */
  partner: { name: string; descriptor?: string; privacy_policy_url: string | null } | null;
  domain: string;
  tagline: string;
  description: string;
  brand: {
    primary_color: string;
    logo_path: string;
    publisher_logo_url: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  navigation: Array<{
    label: string;
    href: string;
    /** Hidden from nav while cta.variant === "packages" (route stays live for SEO). */
    hide_in_packages?: boolean;
    children?: Array<{ label: string; href: string }>;
  }>;
  footer_links: Array<{ label: string; href: string }>;
  locations: Array<{ slug: string; title: string }>;
  content_strategy: {
    audience: string;
    categories: string[];
    supabase_table: string;
    site_key?: string;
    source_identifier: string;
  };
  seo: {
    locale: string;
    organization_type: string;
    service_areas: string[];
    google_analytics_id: string;
    google_site_verification: string;
    theme_color: string;
  };
  lead_form: {
    role_label: string;
    role_options: Array<{ value: string; label: string }>;
    placeholders: {
      name: string;
      email: string;
      phone: string;
      message: string;
    };
  };
  cta: {
    /** Active CTA model; reversal = flip this one value + redeploy. */
    variant?: "packages" | "leadgen";
    variants?: {
      packages: CtaVariantConfig;
      leadgen: CtaVariantConfig;
    };
    /** Flat legacy keys kept for estate typing; not read at render on variant sites. */
    sticky_primary: string;
    sticky_secondary: string;
    sticky_button: string;
  };
  blog: {
    cta_heading: string;
    cta_body: string;
    cta_button: string;
  };
  shared_components_version: string;
  last_sync: string | null;
}

export const niche = nicheConfigJson as NicheConfig;

// Local equivalents of web-shared niche-config helpers. Property's NicheConfig
// is not structurally compatible with the shared type (optional site_key,
// different seo/partner shapes), so the shared helpers do not typecheck here.
export function getActiveCta(n: NicheConfig = niche): CtaVariantConfig {
  const variants = n.cta.variants;
  if (!variants) throw new Error(`getActiveCta: "${n.niche_id}" has no cta.variants block`);
  return variants[n.cta.variant === "packages" ? "packages" : "leadgen"];
}

export function isPackagesMode(n: NicheConfig = niche): boolean {
  return n.cta.variant === "packages" && n.cta.variants != null;
}

export function getActiveNav(n: NicheConfig = niche): NicheConfig["navigation"] {
  if (!isPackagesMode(n)) return n.navigation;
  return n.navigation.filter((item) => !item.hide_in_packages);
}

export function getSiteUrl(): string {
  return (
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) ||
    `https://${niche.domain}`
  );
}
