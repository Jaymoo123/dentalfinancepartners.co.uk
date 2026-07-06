import type { BlogPost } from "@/types/blog";
import { siteConfig } from "@/config/site";
import type { BreadcrumbItem } from "@/components/ui/Breadcrumb";

// Re-export shared builders used by calculator and tool pages (additive — no
// local builder output changes; local blog/organisation builders remain local).
export {
  JsonLd,
  buildFaqPage,
  type SchemaThing,
  type WebApplicationInput,
  type FaqEntry,
} from "@accounting-network/web-shared/schema";

import {
  buildWebApplication as _buildWebApplication,
  buildWebSite as _buildWebSite,
  buildService,
  buildBreadcrumb,
  buildFaqPage as _buildFaqPage,
  buildHowTo,
  type SchemaThing,
  type SiteSchemaOpts,
  type WebApplicationInput,
} from "@accounting-network/web-shared/schema";

function getSiteOpts(): SiteSchemaOpts {
  return {
    siteUrl: siteConfig.url,
    siteName: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    tagline: siteConfig.tagline,
    publisherLogoUrl: siteConfig.publisherLogoUrl,
    // Phone intentionally omitted: the business publishes no public phone, so no
    // telephone is emitted in any shared schema builder (Organization, etc).
  };
}

/** Site-bound wrapper so calculator/tool pages call the shared builder with one argument. */
export function buildWebApplication(input: WebApplicationInput): SchemaThing {
  return _buildWebApplication(input, getSiteOpts());
}

/**
 * Site-bound WebSite + SearchAction node. Emitted once site-wide from the root
 * layout so the whole entity graph has a WebSite root whose publisher resolves
 * to the canonical Organization @id, and so search engines can offer a
 * sitelinks search box. Estate-consistent (SearchAction targets /blog?q=).
 */
export function buildWebSite(): SchemaThing {
  return _buildWebSite(getSiteOpts());
}

/**
 * HowTo JSON-LD for a procedural post that carries a `howtoSteps` frontmatter
 * field. Name and description resolve from the post itself; steps come from the
 * body-derived frontmatter. Returns null when the post has no howtoSteps so
 * callers can render conditionally. Schema-only: adds no rendered markup.
 */
export function buildPostHowToJsonLd(post: BlogPost, path: string): SchemaThing | null {
  if (!post.howtoSteps || post.howtoSteps.length === 0) return null;
  return buildHowTo(
    {
      name: post.h1,
      description: post.summary || post.metaDescription,
      path,
      steps: post.howtoSteps,
    },
    getSiteOpts(),
  );
}

/**
 * Schema graph for an audience landing page (/for-gps, /for-consultants,
 * /for-locum-doctors, /for-junior-doctors). Emits BreadcrumbList + Service
 * (with an OfferCatalog of the listed services, provider = the canonical
 * Organization) + FAQPage so AI answer engines can extract the Q&A directly.
 * Built once here and consumed by AudienceStageLayout, so every /for-* page
 * gains answer-ready structured data from one place.
 */
export function buildAudiencePageSchema(data: {
  slug: string;
  displayRole: string;
  heroHeading: string;
  intro: string;
  services: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
}): SchemaThing[] {
  const opts = getSiteOpts();
  const url = `${siteConfig.url}/${data.slug}`;

  const things: SchemaThing[] = [
    buildBreadcrumb(
      [
        { label: "Home", href: "/" },
        { label: `For ${data.displayRole}` },
      ],
      opts,
    ),
    buildService(
      {
        name: data.heroHeading,
        description: data.intro,
        url,
        serviceType: "Medical accountancy and tax",
        areaServed: "United Kingdom",
        audience: data.displayRole,
        hasOfferCatalog: {
          name: `Services for ${data.displayRole}`,
          items: data.services.map((s) => s.title),
        },
      },
      opts,
    ),
  ];

  const faq = _buildFaqPage(
    data.faqs.map((f) => ({ question: f.q, answer: f.a })),
  );
  if (faq) things.push(faq);

  return things;
}

/**
 * BreadcrumbList + Service graph for a core commercial/service tsx page
 * (e.g. /nhs-pension). Service.provider resolves to the canonical
 * Organization @id, so AI knowledge-graph crawlers tie the offering to the
 * firm. Pass offerItems to emit an OfferCatalog of the sub-services.
 */
export function buildServicePageSchema(input: {
  name: string;
  description: string;
  path: string;
  breadcrumbLabel: string;
  serviceType?: string;
  offerItems?: string[];
}): SchemaThing[] {
  const opts = getSiteOpts();
  return [
    buildBreadcrumb(
      [
        { label: "Home", href: "/" },
        { label: input.breadcrumbLabel },
      ],
      opts,
    ),
    buildService(
      {
        name: input.name,
        description: input.description,
        url: `${siteConfig.url}${input.path}`,
        serviceType: input.serviceType ?? "Medical accountancy and tax",
        areaServed: "United Kingdom",
        ...(input.offerItems && input.offerItems.length > 0
          ? {
              hasOfferCatalog: {
                name: input.name,
                items: input.offerItems,
              },
            }
          : {}),
      },
      opts,
    ),
  ];
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href && { item: `${siteConfig.url}${item.href}` }),
    })),
  });
}

/** Build OG image URL for a blog post based on category and title */
export function buildOgImageUrl(title: string, category?: string) {
  const params = new URLSearchParams({ title });
  if (category) params.set("category", category);
  return `${siteConfig.url}/api/og?${params.toString()}`;
}

export function buildBlogPostingJsonLd(post: BlogPost, path: string) {
  const url = `${siteConfig.url}${path}`;
  const imageUrl = post.image
    ? (post.image.startsWith("http") ? post.image : `${siteConfig.url}${post.image}`)
    : buildOgImageUrl(post.h1, post.category);

  const faq =
    post.faqs && post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  const publisher = {
    "@type": "Organization" as const,
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject" as const,
      url: `${siteConfig.url}${siteConfig.publisherLogoUrl}`,
    },
    areaServed: {
      "@type": "Country" as const,
      name: "United Kingdom",
    },
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.h1,
    description: post.metaDescription,
    image: imageUrl,
    datePublished: post.date,
    // Freshness signal: emit the real last-modified date when the post carries
    // one, falling back to the publish date so unedited posts are unchanged.
    dateModified: post.dateModified ?? post.date,
    author: {
      "@type": "Person" as const,
      name: `${siteConfig.name} Editorial Team`,
      url: `${siteConfig.url}/about`,
    },
    publisher,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    articleSection: post.category,
    inLanguage: "en-GB",
  };

  return JSON.stringify(faq ? [article, faq] : article);
}
