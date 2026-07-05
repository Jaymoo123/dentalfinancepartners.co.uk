import { topicForBlogSlug, topicForCalcSlug, type TopicKey } from "./taxonomy";

/**
 * Pure, isomorphic topic derivation from a pathname. No per-page wiring: the
 * topic falls out of the route.
 *
 *   /blog/<category>/<slug>    -> category slug
 *   /blog/<category>           -> category slug (hub)
 *   /calculators/<slug>        -> calculator slug
 *   /embed/<slug>              -> calculator slug
 *   /for-associates            -> associate
 *   /for-principals            -> principal
 *   /for-practice-buyers       -> buying
 *   /for-locum-dentists        -> associate
 *   everything else            -> null (no personalisation)
 */
export function deriveTopic(pathname: string): TopicKey | null {
  const path = (pathname || "").split("?")[0].split("#")[0].replace(/\/+$/, "");
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 0) return null;

  if (parts[0] === "blog" && parts[1]) return topicForBlogSlug(parts[1]);

  if ((parts[0] === "calculators" || parts[0] === "embed") && parts[1]) {
    return topicForCalcSlug(parts[1]);
  }

  // /for-* routes: map each segment to its nearest intent topic.
  switch (path) {
    case "/for-associates":
      return "associate";
    case "/for-locum-dentists":
      return "associate";
    case "/for-principals":
      return "principal";
    case "/for-practice-buyers":
      return "buying";
  }

  return null;
}
