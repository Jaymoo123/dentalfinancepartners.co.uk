/**
 * EmbedAttribution
 *
 * Renders a tasteful "Powered by [site name]" backlink + lead CTA strip at the
 * bottom of every embedded calculator iframe.
 *
 * Design constraints:
 * - Keeps the iframe footprint small (text-xs, one line on most viewports)
 * - Opens in a new tab so the embedding page is not navigated away
 * - UTM params let us attribute inbound traffic to specific embeds
 * - No em-dashes, no AI-scammy copy; wording is plain, short, on-brand
 *
 * Usage (in each site's /embed/[slug]/page.tsx):
 *
 *   import { EmbedAttribution } from
 *     "@accounting-network/web-shared/tools/embed/EmbedAttribution";
 *
 *   <EmbedAttribution
 *     siteName="Dental Finance Partners"
 *     siteUrl="https://www.dentalfinancepartners.co.uk"
 *     toolSlug={slug}
 *     leadCtaLabel="Get specialist advice"
 *   />
 *
 * The leadCtaLabel is optional; it defaults to "Get free advice". Pass a
 * niche-specific label for more relevant copy (e.g. "Speak to a dental accountant").
 */

export function EmbedAttribution({
  siteName,
  siteUrl,
  toolSlug,
  leadCtaLabel = "Get free advice",
}: {
  /** The site's display name, e.g. "Dental Finance Partners" */
  siteName: string;
  /** The site root URL without trailing slash, e.g. "https://www.dentalfinancepartners.co.uk" */
  siteUrl: string;
  /** The calculator slug, used to build UTM params */
  toolSlug: string;
  /** CTA anchor text (optional). Defaults to "Get free advice". */
  leadCtaLabel?: string;
}) {
  const base = siteUrl.replace(/\/$/, "");
  const poweredByHref = `${base}/?utm_source=partner-embed&utm_medium=iframe&utm_campaign=${toolSlug}`;
  const ctaHref = `${base}/contact?utm_source=partner-embed&utm_medium=iframe-cta&utm_campaign=${toolSlug}`;

  return (
    <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-slate-100 pt-3 text-xs text-slate-500">
      <a
        href={poweredByHref}
        target="_blank"
        rel="noopener"
        className="hover:text-slate-700 transition-colors"
      >
        Powered by <span className="font-semibold text-slate-700">{siteName}</span>
      </a>
      <a
        href={ctaHref}
        target="_blank"
        rel="noopener"
        className="font-semibold text-[var(--brand-primary)] hover:underline transition-colors"
      >
        {leadCtaLabel} &rarr;
      </a>
    </div>
  );
}
