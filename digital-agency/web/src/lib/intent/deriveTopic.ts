import {
  topicForBlogSlug,
  topicForCalcSlug,
  topicForAgenciesSlug,
  topicForRelocationSlug,
  type TopicKey,
} from "./taxonomy";

/**
 * Pure, isomorphic topic derivation from a pathname. No per-page wiring: the
 * topic falls out of the route shape.
 *
 *   /blog/<category>/<slug>       -> category slug -> topic
 *   /blog/<category>              -> category slug -> topic (hub)
 *   /calculators/<slug>           -> calc slug -> topic
 *   /embed/<slug>                 -> calc slug -> topic
 *   /agencies/<slug>              -> agencies slug -> topic (all 19 pages)
 *   /for-new-founders             -> structure (new founders -> incorporation)
 *   /for-growth-stage             -> pay-planning (growth -> pay optimisation)
 *   /for-pre-exit                 -> exit (pre-exit founders)
 *   /<slug>-relocation            -> international (all 10 relocation pages)
 *   Everything else               -> null (homepage, /contact, /about, ...)
 */
export function deriveTopic(pathname: string): TopicKey | null {
  const path = (pathname || "").split("?")[0].split("#")[0].replace(/\/+$/, "");
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 0) return null;

  // /blog/<category>[/<slug>]
  if (parts[0] === "blog" && parts[1]) return topicForBlogSlug(parts[1]);

  // /calculators/<slug> or /embed/<slug>
  if ((parts[0] === "calculators" || parts[0] === "embed") && parts[1]) {
    return topicForCalcSlug(parts[1]);
  }

  // /agencies/<slug> (19 type pages)
  if (parts[0] === "agencies" && parts[1]) {
    return topicForAgenciesSlug(parts[1]);
  }

  // /for-* pages (at root, e.g. /for-new-founders)
  if (parts.length === 1) {
    if (parts[0] === "for-new-founders") return "structure";
    if (parts[0] === "for-growth-stage") return "pay-planning";
    if (parts[0] === "for-pre-exit") return "exit";

    // Relocation pages (/dubai-relocation, /portugal-relocation, etc.)
    const topic = topicForRelocationSlug(parts[0]);
    if (topic) return topic;
  }

  return null;
}
