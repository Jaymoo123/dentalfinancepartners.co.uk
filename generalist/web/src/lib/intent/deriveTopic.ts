import { topicForBlogSlug, topicForCalcSlug, type TopicKey } from "./taxonomy";

/**
 * Pure, isomorphic topic derivation from a pathname. No per-page wiring: the
 * topic falls out of the route.
 *   /blog/<category>/<slug>  -> category slug
 *   /blog/<category>         -> category slug (index)
 *   /calculators/<slug>      -> calculator slug
 *   /embed/<slug>            -> calculator slug
 *   /for/<segment>           -> sole-trader (generic small-business entry, best match)
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
  // For-pages: a small-business visitor landing on /for/<segment> has general
  // business-accounting intent, best proxied by sole-trader.
  if (parts[0] === "for" && parts[1]) return "sole-trader";
  return null;
}
