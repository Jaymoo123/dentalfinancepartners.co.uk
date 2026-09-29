import {
  topicForBlogSlug,
  topicForCalcSlug,
  topicForServiceSlug,
  topicForHubSlug,
  topicForResearchSlug,
  type TopicKey,
} from "./taxonomy";

/**
 * Pure, isomorphic topic derivation from a pathname. No per-page wiring: the
 * topic falls out of the route.
 *   /blog/<category>/<slug>  -> blog category slug
 *   /blog/<category>         -> blog category slug (index)
 *   /calculators/<slug>      -> calculator slug
 *   /embed/<slug>            -> calculator slug
 *   /services/<slug>         -> service slug
 *   /for/<slug>              -> audience hub slug
 *   /research/<slug>         -> research page slug
 * Everything else (homepage, /contact, /about, the bare index routes) returns
 * null = no topic, and the assistant falls back to its generic opener.
 */
export function deriveTopic(pathname: string): TopicKey | null {
  const path = (pathname || "").split("?")[0].split("#")[0].replace(/\/+$/, "");
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 0) return null;
  if (parts[0] === "blog" && parts[1]) return topicForBlogSlug(parts[1]);
  if ((parts[0] === "calculators" || parts[0] === "embed") && parts[1]) {
    return topicForCalcSlug(parts[1]);
  }
  if (parts[0] === "services" && parts[1]) return topicForServiceSlug(parts[1]);
  if (parts[0] === "for" && parts[1]) return topicForHubSlug(parts[1]);
  if (parts[0] === "research" && parts[1]) return topicForResearchSlug(parts[1]);
  return null;
}
