/**
 * Generalist schema adapter.
 *
 * Imports all builders from the shared @accounting-network/web-shared/schema
 * module and pre-binds site-specific values so callers use the same API as
 * before.  Person builders (buildPerson, referencedPerson) remain here because
 * they depend on getTeamMember from @/app/team/[slug]/data.
 */

import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";
import { getTeamMember } from "@/app/team/[slug]/data";
import type { BlogPost } from "@/types/blog";

import {
  // re-export pass-through (no site deps)
  serialize,
  JsonLd,
  buildFaqPage,
  // re-export types
  type SchemaThing,
  type SiteSchemaOpts,
  type Organization,
  type Person,
  type BreadcrumbItem,
  type FaqEntry,
  type HowToStep,
  type HowToInput,
  type WebApplicationInput,
  type LocalBusinessInput,
  type ServiceInput,
  type DefinedTermInput,
  type CollectionPageInput,
  type DatasetInput,
  type CourseInput,
  type ArticleInput,
  // parameterised builders — imported for wrapping
  buildOrganization as _buildOrganization,
  referencedOrganization as _referencedOrganization,
  buildWebSite as _buildWebSite,
  buildBreadcrumb as _buildBreadcrumb,
  buildBlogPosting as _buildBlogPosting,
  buildArticle as _buildArticle,
  buildHowTo as _buildHowTo,
  buildWebApplication as _buildWebApplication,
  buildAccountingService as _buildAccountingService,
  buildCityPage as _buildCityPage,
  buildLocalBusinessJsonLd,
  buildService as _buildService,
  buildDefinedTerm as _buildDefinedTerm,
  buildDefinedTermSet as _buildDefinedTermSet,
  buildCollectionPage as _buildCollectionPage,
  buildDataset as _buildDataset,
  buildCourse as _buildCourse,
  buildOgImageUrl as _buildOgImageUrl,
  buildPerson as _buildPerson,
  referencedPerson as _referencedPerson,
} from "@accounting-network/web-shared/schema";

export {
  serialize,
  JsonLd,
  buildFaqPage,
  buildLocalBusinessJsonLd,
  type SchemaThing,
  type Organization,
  type Person,
  type BreadcrumbItem,
  type FaqEntry,
  type HowToStep,
  type HowToInput,
  type WebApplicationInput,
  type LocalBusinessInput,
  type ServiceInput,
  type DefinedTermInput,
  type CollectionPageInput,
  type DatasetInput,
  type CourseInput,
  type ArticleInput,
};

const GENERALIST_KNOWS_ABOUT = [
  "UK corporation tax",
  "Marginal relief and the small profits rate",
  "Director salary and dividend optimisation",
  "VAT registration and scheme selection",
  "Making Tax Digital for VAT and ITSA",
  "PAYE and employer National Insurance",
  "R&D tax credits for UK SMEs",
  "Incorporation timing and structure",
  "Business Asset Disposal Relief and exit planning",
  "Self-assessment for sole traders and partnerships",
  "Bookkeeping for UK small businesses",
];

function getSiteOpts(): SiteSchemaOpts {
  return {
    siteUrl: siteConfig.url,
    siteName: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    tagline: siteConfig.tagline,
    organizationType: niche.seo.organization_type || "ProfessionalService",
    publisherLogoUrl: siteConfig.publisherLogoUrl,
    email: siteConfig.contact.email,
    phone: siteConfig.contact.phone,
    serviceAreas: niche.seo.service_areas,
    knowsAbout: GENERALIST_KNOWS_ABOUT,
  };
}

// ---------------------------------------------------------------------------
// Person builders — stay local: depend on getTeamMember
// ---------------------------------------------------------------------------

export function buildPerson(slug: string): Person | null {
  const member = getTeamMember(slug);
  if (!member) return null;
  return _buildPerson(member, getSiteOpts());
}

export function referencedPerson(
  slug: string | undefined,
  fallbackName?: string,
): SchemaThing {
  const member = slug ? getTeamMember(slug) : null;
  return _referencedPerson(member ?? null, {
    siteUrl: siteConfig.url,
    siteName: siteConfig.name,
    name: fallbackName,
  });
}

// ---------------------------------------------------------------------------
// Site-bound wrappers — each call getSiteOpts() so url is always fresh
// ---------------------------------------------------------------------------

export function buildOrganization(): Organization {
  return _buildOrganization(getSiteOpts());
}

export function referencedOrganization(): SchemaThing {
  return _referencedOrganization(getSiteOpts());
}

export function buildWebSite(): SchemaThing {
  return _buildWebSite(getSiteOpts());
}

export function buildBreadcrumb(items: BreadcrumbItem[]): SchemaThing {
  return _buildBreadcrumb(items, getSiteOpts());
}

export function buildBlogPosting(post: BlogPost, path: string): SchemaThing {
  const author = referencedPerson(post.authorSlug || "emma-carter", post.author);
  return _buildBlogPosting(post, path, getSiteOpts(), author);
}

export function buildArticle(post: BlogPost, path: string): SchemaThing {
  const author = referencedPerson(post.authorSlug || "emma-carter", post.author);
  return _buildArticle(post, path, getSiteOpts(), author);
}

export function buildHowTo(input: HowToInput): SchemaThing {
  return _buildHowTo(input, getSiteOpts());
}

export function buildWebApplication(input: WebApplicationInput): SchemaThing {
  return _buildWebApplication(input, getSiteOpts());
}

export function buildAccountingService(input: LocalBusinessInput): Organization {
  return _buildAccountingService(input, getSiteOpts());
}

export function buildCityPage(
  input: LocalBusinessInput & { serviceName: string },
): SchemaThing[] {
  return _buildCityPage(input, getSiteOpts());
}

export function buildService(input: ServiceInput): SchemaThing {
  return _buildService(input, getSiteOpts());
}

export function buildDefinedTerm(input: DefinedTermInput): SchemaThing {
  return _buildDefinedTerm(input, getSiteOpts());
}

export function buildDefinedTermSet(
  terms: { slug: string; term: string }[],
): SchemaThing {
  return _buildDefinedTermSet(
    terms,
    getSiteOpts(),
    "Holloway Davies Glossary",
    "Plain-English definitions of UK business tax, finance, and accounting terms.",
  );
}

export function buildCollectionPage(input: CollectionPageInput): SchemaThing {
  return _buildCollectionPage(input, getSiteOpts());
}

export function buildDataset(input: DatasetInput): SchemaThing {
  return _buildDataset(input, getSiteOpts());
}

export function buildCourse(input: CourseInput): SchemaThing {
  return _buildCourse(input, getSiteOpts());
}

export function buildOgImageUrl(title: string, category?: string): string {
  return _buildOgImageUrl(title, getSiteOpts(), category);
}

// ---------------------------------------------------------------------------
// Legacy string-returning wrappers (backward compat for existing consumers)
// ---------------------------------------------------------------------------

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): string {
  return serialize(buildBreadcrumb(items));
}

export function buildBlogPostingJsonLd(post: BlogPost, path: string): string {
  const article = buildBlogPosting(post, path);
  const faq = post.faqs && post.faqs.length ? buildFaqPage(post.faqs) : null;
  return serialize(faq ? [article, faq] : article);
}

export function buildArticleJsonLd(post: BlogPost, path: string): string {
  const article = buildArticle(post, path);
  const faq = post.faqs && post.faqs.length ? buildFaqPage(post.faqs) : null;
  return serialize(faq ? [article, faq] : article);
}
