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

/** Build OG image URL for a blog post based on category and title */
export function buildOgImageUrl(title: string, category?: string) {
  const params = new URLSearchParams({ title });
  if (category) params.set("category", category);
  return `${siteConfig.url}/api/og?${params.toString()}`;
}

/** Fallback BlogPosting JSON-LD when Python `schema` frontmatter is absent */
export function buildBlogPostingJsonLd(post: BlogPost, path: string) {
  const url = `${siteConfig.url}${path}`;
  const imageUrl = post.image
    ? (post.image.startsWith("http") ? post.image : `${siteConfig.url}${post.image}`)
    : buildOgImageUrl(post.title, post.category);

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.h1 || post.title,
    description: post.metaDescription,
    image: imageUrl,
    url,
    datePublished: post.date,
    dateModified: post.updatedDate || post.date,
    author: {
      "@type": "Person",
      name: post.author || siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  });
}
