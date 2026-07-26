// Single source of truth for city-slug -> final URL resolution.
//
// Four city slugs (london/manchester/birmingham/bristol) 301-redirect from
// /locations/<city> to their richer blog counterparts (see middleware.ts).
// The remaining slug (leeds) has no blog post, so its /locations/<slug> page is
// the live 200. Link generators (homepage, locations hub, sitemap) MUST resolve
// through here so no internal link points at a 301 and the sitemap lists only
// 200 canonicals. Keep this map and the middleware redirect the same set.
export const LOCATION_TO_BLOG: Record<string, string> = {
  london: "/blog/property-accountant-services/london-property-accountant",
  manchester: "/blog/property-accountant-services/manchester-property-accountant",
  birmingham: "/blog/property-accountant-services/birmingham-property-accountant",
  bristol: "/blog/property-accountant-services/bristol-property-accountant",
};

// Final 200 URL for a location slug: the blog post if it redirects, else the
// on-site /locations/<slug> page.
export const locationHref = (slug: string): string =>
  LOCATION_TO_BLOG[slug] ?? `/locations/${slug}`;
