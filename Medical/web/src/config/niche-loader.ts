import nicheConfigJson from "../../../niche.config.json";

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
  /** Specialist partner firm enquiries are shared with, or null when handled in-house. */
  partner: { name: string; privacy_policy_url: string | null } | null;
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
    children?: Array<{ label: string; href: string; description?: string }>;
  }>;
  footer_links: Array<{ label: string; href: string }>;
  locations: Array<{ slug: string; title: string }>;
  content_strategy: {
    audience: string;
    categories: string[];
    supabase_table: string;
    site_key: string;
    source_identifier: string;
  };
  seo: {
    locale: string;
    organization_type: string;
    service_areas: string[];
    google_analytics_id: string;
    google_site_verification?: string;
    theme_color: string;
    homepage_title?: string;
    homepage_h1?: string;
    homepage_description?: string;
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

export const niche = nicheConfigJson as unknown as NicheConfig;

export function getSiteUrl(): string {
  return (
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) ||
    `https://${niche.domain}`
  );
}
