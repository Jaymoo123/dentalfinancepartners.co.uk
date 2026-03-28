import type { BlogPost } from "@/types/blog";
import { siteConfig } from "@/config/site";
import type { BreadcrumbItem } from "@/components/ui/Breadcrumb";

/** Build BreadcrumbList JSON-LD schema */
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

/** Fallback BlogPosting + FAQPage JSON-LD when Python `schema` frontmatter is absent */
export function buildBlogPostingJsonLd(post: BlogPost, path: string) {
  const url = `${siteConfig.url}${path}`;
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

  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.h1,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.publisherLogoUrl}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    articleSection: post.category,
    inLanguage: "en-GB",
  };

  return JSON.stringify(faq ? [article, faq] : article);
}
