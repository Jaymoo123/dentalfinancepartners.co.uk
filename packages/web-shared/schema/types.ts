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
  "@type": string | string[];
  name: string;
  url: string;
  legalName?: string;
  alternateName?: string;
  logo?: { "@type": "ImageObject"; url: string } | string;
  sameAs?: string[];
  areaServed?: SchemaThing | SchemaThing[] | string | string[];
  parentOrganization?: SchemaThing;
  address?: PostalAddress;
  contactPoint?: SchemaThing | SchemaThing[];
  foundingDate?: string;
  priceRange?: string;
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
  organizationType?: string | string[];
  /** Path-only logo URL, e.g. /brand/icon-alt.png. Combined with siteUrl inside builders. */
  publisherLogoUrl: string;
  email?: string;
  phone?: string;
  serviceAreas?: string[];
  knowsAbout?: string[];
  /** Trading name shown alongside legalName, e.g. Property vs Medical convention. */
  alternateName?: string;
  /** Full JSON-LD Organization logo shape override; defaults to an ImageObject built from publisherLogoUrl. */
  sameAs?: string[];
  /** Companies House / registered-office address for the top-level Organization. */
  address?: PostalAddress;
  /** Defaults to a United Kingdom Country node when omitted and areaServed/serviceAreas are unset. */
  areaServedCountry?: string;
  contactPoint?: SchemaThing | SchemaThing[];
  foundingDate?: string;
  priceRange?: string;
  /** Companies House filing number, used to build parentOrganization.identifier as a PropertyValue. */
  parentOrganization?: {
    name: string;
    url?: string;
    companyNumber?: string;
  };
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
