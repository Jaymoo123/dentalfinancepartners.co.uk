import { topicForBlogSlug, topicForCalcSlug, type TopicKey } from "./taxonomy";

/**
 * Route-prefix table for /for-* audience pages.
 *
 * Actual routes enumerated from Solicitors/web/src/app:
 *   /for-partners          -> partnership-llp (partners are LLP/partnership topic)
 *   /for-locum-solicitors  -> sole-practitioner (locums are self-employed)
 *   /for-junior-solicitors -> sole-practitioner (junior = employed/take-home focus)
 *   /for-firm-buyers       -> succession-sale (acquisition intent)
 */
const FOR_ROUTE_TO_TOPIC: Record<string, TopicKey> = {
  "for-partners": "partnership-llp",
  "for-locum-solicitors": "sole-practitioner",
  "for-junior-solicitors": "sole-practitioner",
  "for-firm-buyers": "succession-sale",
};

/**
 * Pure, isomorphic topic derivation from a pathname. No per-page wiring: the
 * topic falls out of the route.
 *
 *   /blog/<category>/<slug>  -> category slug (blog post)
 *   /blog/<category>         -> category slug (hub index or static hub page)
 *   /calculators/<slug>      -> calculator slug
 *   /embed/<slug>            -> calculator slug
 *   /for-partners            -> partnership-llp
 *   /for-locum-solicitors    -> sole-practitioner
 *   /for-junior-solicitors   -> sole-practitioner
 *   /for-firm-buyers         -> succession-sale
 *
 * Everything else (homepage, /contact, /about, ...) returns null = no topic.
 */
export function deriveTopic(pathname: string): TopicKey | null {
  const path = (pathname || "").split("?")[0].split("#")[0].replace(/\/+$/, "");
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 0) return null;
  if (parts[0] === "blog" && parts[1]) return topicForBlogSlug(parts[1]);
  if ((parts[0] === "calculators" || parts[0] === "embed") && parts[1]) {
    return topicForCalcSlug(parts[1]);
  }
  // /for-* audience pages: the full first segment (e.g. "for-partners").
  const forKey = parts[0];
  if (forKey in FOR_ROUTE_TO_TOPIC) return FOR_ROUTE_TO_TOPIC[forKey];
  return null;
}

/** Exported for testing: the complete /for-* route map. */
export { FOR_ROUTE_TO_TOPIC };
