/**
 * Canonical NicheConfig — single shared type + build-time validator.
 *
 * Superset reconciliation (2026-06-10):
 *   navigation.children — generalist/digital-agency/contractors-ir35 have optional children;
 *     Dentists/Medical/Solicitors/Property do not declare it. Superset: optional children.
 *   seo.google_site_verification — Dentists/Medical/Solicitors/Property use a flat string;
 *     generalist/digital-agency/contractors-ir35 use seo.search_console_verification object.
 *     Superset: both optional, sites populate whichever matches their config.
 *
 * Required core: niche_id, display_name, legal_name, domain, description,
 *   brand.primary_color, contact.email, contact.phone, navigation[], footer_links[],
 *   content_strategy.{site_key, source_identifier, categories}, seo.locale,
 *   lead_form.{role_label, role_options[], placeholders}.
 */

export interface NicheConfig {
  niche_id: string;
  display_name: string;
  legal_name: string;
  /** Specialist partner firm enquiries are shared with, or null when handled in-house. */
  partner?: { name: string; privacy_policy_url: string | null } | null;
  /** Registered-company block. Required for sites that display Companies Act disclosures. */
  company?: {
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
    theme_color: string;
    /** Flat single-key variant (Dentists/Medical/Solicitors/Property) */
    google_site_verification?: string;
    /** Multi-engine object variant (generalist/digital-agency/contractors-ir35) */
    search_console_verification?: {
      google: string;
      bing: string;
      yandex: string;
      naver: string;
      pinterest: string;
    };
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

// ---------------------------------------------------------------------------
// Validator
// ---------------------------------------------------------------------------

class NicheConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NicheConfigError";
  }
}

function asObj(value: unknown, path: string): Record<string, unknown> {
  if (value == null || typeof value !== "object" || Array.isArray(value)) {
    throw new NicheConfigError(
      `niche.config.json: "${path}" must be an object`
    );
  }
  return value as Record<string, unknown>;
}

function requireNonEmpty(value: unknown, path: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new NicheConfigError(
      `niche.config.json: missing required field "${path}"`
    );
  }
  return value;
}

function requireArray(value: unknown, path: string): unknown[] {
  if (!Array.isArray(value)) {
    throw new NicheConfigError(
      `niche.config.json: "${path}" must be an array`
    );
  }
  return value;
}

/**
 * Validates a raw JSON object against the canonical NicheConfig manifest.
 * Throws NicheConfigError naming the exact field path on any violation.
 * Called at module load time so misconfigured sites fail at build, not runtime.
 */
export function validateNicheConfig(json: unknown): NicheConfig {
  const root = asObj(json, "root");

  requireNonEmpty(root.niche_id, "niche_id");
  requireNonEmpty(root.display_name, "display_name");
  requireNonEmpty(root.legal_name, "legal_name");
  requireNonEmpty(root.domain, "domain");
  requireNonEmpty(root.description, "description");

  const brand = asObj(root.brand, "brand");
  requireNonEmpty(brand.primary_color, "brand.primary_color");

  const contact = asObj(root.contact, "contact");
  requireNonEmpty(contact.email, "contact.email");
  requireNonEmpty(contact.phone, "contact.phone");

  requireArray(root.navigation, "navigation");
  requireArray(root.footer_links, "footer_links");

  const cs = asObj(root.content_strategy, "content_strategy");
  requireNonEmpty(cs.site_key, "content_strategy.site_key");
  requireNonEmpty(cs.source_identifier, "content_strategy.source_identifier");
  requireArray(cs.categories, "content_strategy.categories");

  const seo = asObj(root.seo, "seo");
  requireNonEmpty(seo.locale, "seo.locale");

  const lf = asObj(root.lead_form, "lead_form");
  requireNonEmpty(lf.role_label, "lead_form.role_label");
  const roleOptions = requireArray(lf.role_options, "lead_form.role_options");
  for (let i = 0; i < roleOptions.length; i++) {
    const opt = asObj(roleOptions[i], `lead_form.role_options[${i}]`);
    if (typeof opt.label !== "string" || opt.label.trim() === "") {
      throw new NicheConfigError(
        `niche.config.json: missing required field "lead_form.role_options[${i}].label"`
      );
    }
  }
  const placeholders = asObj(lf.placeholders, "lead_form.placeholders");
  requireNonEmpty(placeholders.name, "lead_form.placeholders.name");
  requireNonEmpty(placeholders.email, "lead_form.placeholders.email");
  requireNonEmpty(placeholders.phone, "lead_form.placeholders.phone");
  requireNonEmpty(placeholders.message, "lead_form.placeholders.message");

  return json as NicheConfig;
}
