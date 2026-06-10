import type { BreadcrumbItem, SchemaThing, SiteSchemaOpts } from "./types";

/**
 * BreadcrumbList for any nested page. Items with `href` get an absolute URL;
 * the last item (current page, no href) is the position-last entry without a URL.
 */
export function buildBreadcrumb(
  items: BreadcrumbItem[],
  opts: SiteSchemaOpts,
): SchemaThing {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${opts.siteUrl}${item.href}` } : {}),
    })),
  };
}
