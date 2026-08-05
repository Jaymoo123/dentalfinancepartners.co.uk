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

export interface CtaLink {
  label: string;
  href: string;
}

/**
 * One CTA model's full copy set (packages-first or lead-gen-first).
 * Consumed via getActiveCta(); components never read variants directly.
 */
export interface CtaVariantConfig {
  header_primary: CtaLink;
  /** Rendered only when present (e.g. packages mode adds a "Talk to us" secondary). */
  header_secondary?: CtaLink;
  hero_primary: CtaLink;
  hero_secondary?: CtaLink;
  sticky: {
    primary: string;
    secondary: string;
    button: string;
    href: string;
  };
  /** End-of-article CTA block: heading/body copy + LeadForm submit label. */
  blog: {
    cta_heading: string;
    cta_body: string;
    cta_button: string;
  };
  /** Homepage closing CTA section copy. */
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
    /** Hidden from nav while cta.variant === "packages" (route stays live for SEO). */
    hide_in_packages?: boolean;
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
    /**
     * Active CTA model. "packages" = pricing-first chrome, "leadgen" = free
     * consultation chrome. Reversal = flip this one value + redeploy.
     * Optional: sites without `variants` (non-experiment sites) ignore it.
     */
    variant?: "packages" | "leadgen";
    /** Both variants' full CTA copy. Present only on packages-experiment sites. */
    variants?: {
      packages: CtaVariantConfig;
      leadgen: CtaVariantConfig;
    };
    /**
     * Flat sticky keys: source of truth on sites without `variants`; on
     * experiment sites they mirror variants.leadgen.sticky (kept so shared
     * typing stays required across the estate) and are not read at render.
     */
    sticky_primary: string;
    sticky_secondary: string;
    sticky_button: string;
  };
  blog: {
    /** Flat blog CTA keys: same convention as cta.sticky_* above. */
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

  // CTA variant block (packages-experiment sites only). If `variants` exists,
  // `variant` must name a valid model and both models must be complete, so a
  // half-migrated config fails at build, not silently at render.
  const cta = root.cta == null ? null : asObj(root.cta, "cta");
  if (cta && cta.variants != null) {
    const variant = requireNonEmpty(cta.variant, "cta.variant");
    if (variant !== "packages" && variant !== "leadgen") {
      throw new NicheConfigError(
        `niche.config.json: "cta.variant" must be "packages" or "leadgen"`
      );
    }
    const variants = asObj(cta.variants, "cta.variants");
    for (const model of ["packages", "leadgen"] as const) {
      const v = asObj(variants[model], `cta.variants.${model}`);
      for (const linkKey of ["header_primary", "hero_primary"] as const) {
        const link = asObj(v[linkKey], `cta.variants.${model}.${linkKey}`);
        requireNonEmpty(link.label, `cta.variants.${model}.${linkKey}.label`);
        requireNonEmpty(link.href, `cta.variants.${model}.${linkKey}.href`);
      }
      const sticky = asObj(v.sticky, `cta.variants.${model}.sticky`);
      for (const k of ["primary", "secondary", "button", "href"] as const) {
        requireNonEmpty(sticky[k], `cta.variants.${model}.sticky.${k}`);
      }
      const blog = asObj(v.blog, `cta.variants.${model}.blog`);
      for (const k of ["cta_heading", "cta_body", "cta_button"] as const) {
        requireNonEmpty(blog[k], `cta.variants.${model}.blog.${k}`);
      }
      const homeCta = asObj(v.home_cta, `cta.variants.${model}.home_cta`);
      requireNonEmpty(homeCta.heading, `cta.variants.${model}.home_cta.heading`);
      requireNonEmpty(homeCta.body, `cta.variants.${model}.home_cta.body`);
      const homePrimary = asObj(homeCta.primary, `cta.variants.${model}.home_cta.primary`);
      requireNonEmpty(homePrimary.label, `cta.variants.${model}.home_cta.primary.label`);
      requireNonEmpty(homePrimary.href, `cta.variants.${model}.home_cta.primary.href`);
    }
  }

  return json as NicheConfig;
}

// ---------------------------------------------------------------------------
// CTA variant helpers (packages-experiment sites)
// ---------------------------------------------------------------------------

/**
 * Returns the active CTA copy set for a site running the packages experiment.
 * Throws on sites without `cta.variants` — those sites keep reading the legacy
 * flat keys and must not call this.
 */
export function getActiveCta(niche: NicheConfig): CtaVariantConfig {
  const variants = niche.cta?.variants;
  if (!variants) {
    throw new NicheConfigError(
      `getActiveCta: "${niche.niche_id}" has no cta.variants block`
    );
  }
  return variants[niche.cta.variant === "packages" ? "packages" : "leadgen"];
}

/** True when the site is in pricing-first mode. */
export function isPackagesMode(niche: NicheConfig): boolean {
  return niche.cta?.variant === "packages" && niche.cta?.variants != null;
}

/**
 * Navigation filtered for the active CTA variant: items flagged
 * `hide_in_packages` disappear in packages mode. Routes themselves stay live.
 */
export function getActiveNav(niche: NicheConfig): NicheConfig["navigation"] {
  if (!isPackagesMode(niche)) return niche.navigation;
  return niche.navigation.filter((item) => !item.hide_in_packages);
}
