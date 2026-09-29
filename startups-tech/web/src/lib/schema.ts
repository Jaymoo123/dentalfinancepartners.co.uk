import { siteConfig } from "@/config/site";
import { buildService } from "@accounting-network/web-shared/schema";

export function buildOgImageUrl(title: string, category?: string) {
  const params = new URLSearchParams({ title });
  if (category) params.set("category", category);
  return `${siteConfig.url}/api/og?${params.toString()}`;
}

// P0 E1: this used to emit a second full Organization node under the same
// @id as the canonical node in layout.tsx (via organization-schema.ts),
// with a different @type and description — two contradictory records under
// one identifier. The canonical node (sameAs, parentOrganization, knowsAbout)
// stays in layout.tsx; this is now a reference stub only, so any JSON-LD
// consumer resolves #organization to the one full record. P0 E2: priceRange
// (an unsourced fee band) went with it — it lived only on the deleted node.
export function buildOrganizationJsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
  });
}

export function buildWebsiteJsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}#organization` },
    inLanguage: "en-GB",
  });
}

// R3 G5: faq.answer is authored HTML (rendered as-is on the page). JSON-LD
// acceptedAnswer.text must be plain text, so tags are stripped and the
// common entities decoded before the string enters the schema. This does
// not touch how the answer renders on the page, only the schema copy of it.
function stripAnswerHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function buildFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: stripAnswerHtml(faq.answer) },
    })),
  });
}

export function buildServiceJsonLd(opts: { name: string; description: string; url: string }) {
  return JSON.stringify(
    buildService(
      { name: opts.name, description: opts.description, url: opts.url, serviceType: "AccountingService" },
      { siteUrl: siteConfig.url, siteName: siteConfig.name, publisherLogoUrl: siteConfig.publisherLogoUrl },
    ),
  );
}

export function buildBreadcrumbJsonLd(items: { label: string; href?: string }[]) {
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

export function buildHowToJsonLd(post: { h1: string; metaDescription?: string; howToSteps?: { name: string; text: string }[] }) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: post.h1,
    ...(post.metaDescription && { description: post.metaDescription }),
    step: (post.howToSteps ?? []).map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  });
}

export function buildDatasetJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  dateModified: string;
  sources: { name: string; url: string; licence: string; publisher: string }[];
}) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    dateModified: opts.dateModified,
    creator: { "@type": "Organization", "@id": `${siteConfig.url}#organization`, name: siteConfig.name },
    license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
    isAccessibleForFree: true,
    inLanguage: "en-GB",
    sourceOrganization: opts.sources.map((s) => ({
      "@type": "Organization",
      name: s.publisher,
      url: s.url,
      description: `${s.name}. Licence: ${s.licence}`,
    })),
  });
}

export function buildArticleJsonLd(opts: {
  title: string;
  description: string;
  url: string;
  dateModified?: string;
}) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: `${siteConfig.url}${opts.url}`,
    dateModified: opts.dateModified,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}${opts.url}` },
  });
}
