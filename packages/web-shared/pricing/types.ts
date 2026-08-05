/**
 * Shared types for the self-serve package pricing surface (pkg_pricing_v1).
 *
 * Each site supplies a PackagesConfig from its own src/config/packages.ts
 * (mirroring the service-tiers.ts convention) and renders the shared
 * PackagesSection on a dedicated /pricing route. Prices are display strings
 * (e.g. "£59") so sites control formatting; the numeric month price rides in
 * `priceValue` for analytics/lead extras.
 */

export interface PackageTier {
  /** Stable id stamped on analytics props + lead extras (e.g. "landlord_sa"). */
  id: string;
  name: string;
  /** Display price, e.g. "£59". Period + VAT wording is rendered by the component. */
  price: string;
  /** Numeric monthly price for extras/SQL (59). */
  priceValue: number;
  description: string;
  features: string[];
  featured?: boolean;
}

export interface AdvisoryProjectConfig {
  /** e.g. "from £495" */
  fromPrice: string;
  blurb: string;
  /** Niche project-type options shown in the signup modal select. */
  projectTypes: string[];
}

export interface PackagesFaqItem {
  q: string;
  a: string;
}

export interface PackagesQualifierOption {
  value: string;
  label: string;
  /** Tier id (from tiers[].id) this answer recommends. */
  recommend: string;
}

/**
 * Optional situation selector rendered above the tier grid ("How many
 * properties do you have?"). Choosing an option highlights the recommended
 * tier and the answer is stored on the signup lead (extras.qualifier).
 */
export interface PackagesQualifier {
  label: string;
  options: PackagesQualifierOption[];
}

export interface PackagesConfig {
  /** Consent notice text, same one the site's lead forms use. */
  consentText: string;
  /** "Business type" select options for the signup modal (value stored as lead role). */
  businessTypes: { value: string; label: string }[];
  tiers: PackageTier[];
  /** Optional small print under the tier grid, e.g. "Additional properties +£10/month". */
  addOnNote?: string;
  advisory: AdvisoryProjectConfig;
  /** Extra site-specific FAQ items appended to the shared defaults. */
  faq?: PackagesFaqItem[];
  /** Optional situation selector above the tiers (see PackagesQualifier). */
  qualifier?: PackagesQualifier;
}
