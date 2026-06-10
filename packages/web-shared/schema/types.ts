/**
 * Shared JSON-LD types. Loose by design; schema.org accepts a wide range of
 * shapes and we don't want to fight the type system. Builders return
 * SchemaThing objects that can be composed and serialised.
 */

export type SchemaThing = {
  "@context"?: string | string[];
  "@type": string | string[];
  "@id"?: string;
  [key: string]: unknown;
};

export type Organization = SchemaThing & {
  "@type": "Organization" | "ProfessionalService" | "AccountingService" | "LocalBusiness";
  name: string;
  url: string;
  logo?: { "@type": "ImageObject"; url: string };
  sameAs?: string[];
  areaServed?: SchemaThing | SchemaThing[] | string | string[];
};

export type Person = SchemaThing & {
  "@type": "Person";
  name: string;
  url?: string;
  jobTitle?: string;
  knowsAbout?: string[];
  worksFor?: SchemaThing;
  sameAs?: string[];
};

export type ImageObject = {
  "@type": "ImageObject";
  url: string;
  width?: number;
  height?: number;
  caption?: string;
};

export type PostalAddress = {
  "@type": "PostalAddress";
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
};

/** Minimal item shape for the BreadcrumbList builder. */
export type BreadcrumbItem = {
  label: string;
  href?: string;
};

/** Team member data passed to shared person builders. */
export type TeamMemberData = {
  slug: string;
  name: string;
  role?: string;
  shortBio?: string;
  expertise?: string[];
  links?: { url: string }[];
};

/**
 * Site-specific values passed to every parameterised schema builder.
 * Callers construct this from their own siteConfig once and pass it through.
 */
export type SiteSchemaOpts = {
  siteUrl: string;
  siteName: string;
  legalName?: string;
  description?: string;
  tagline?: string;
  /** schema.org @type for the top-level Organization. Defaults to "ProfessionalService". */
  organizationType?: string;
  /** Path-only logo URL, e.g. /brand/icon-alt.png. Combined with siteUrl inside builders. */
  publisherLogoUrl: string;
  email?: string;
  phone?: string;
  serviceAreas?: string[];
  knowsAbout?: string[];
};

/** Minimal post shape used by article and blog-posting builders. */
export type ArticleInput = {
  h1: string;
  metaDescription: string;
  image?: string;
  date: string;
  /** Generalist convention — falls back to `dateModified` then `date`. */
  updatedDate?: string;
  /** Property convention — takes precedence over `updatedDate`. */
  dateModified?: string;
  category?: string;
  /** Optional Property fields — omitting produces identical output on generalist pages. */
  reviewedBy?: string;
  reviewerCredentials?: string;
};
