import type { SiteSchemaOpts } from "./types";

/**
 * Build a dynamic OG image URL via the /api/og route.
 * Title is required; category is optional and produces the pill above the title.
 */
export function buildOgImageUrl(
  title: string,
  opts: SiteSchemaOpts,
  category?: string,
): string {
  const params = new URLSearchParams({ title });
  if (category) params.set("category", category);
  return `${opts.siteUrl}/api/og?${params.toString()}`;
}
