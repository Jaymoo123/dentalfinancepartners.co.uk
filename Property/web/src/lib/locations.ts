// Single source of truth for city-slug -> final URL resolution.
//
// 2026-08-05: flow reversed. All five city slugs (london/manchester/birmingham/
// bristol/leeds) now render live at /locations/<slug>; the city blog posts were
// merged into those pages and 301 back to them (see BLOG_TO_LOCATION in
// middleware.ts). Link generators (homepage, locations hub, sitemap) resolve
// through here so no internal link points at a 301.
export const locationHref = (slug: string): string => `/locations/${slug}`;
