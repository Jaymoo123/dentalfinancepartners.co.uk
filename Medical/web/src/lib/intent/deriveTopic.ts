import { topicForBlogSlug, topicForCalcSlug, type TopicKey } from "./taxonomy";

/**
 * Pure, isomorphic topic derivation from a pathname. No per-page wiring: the
 * topic falls out of the route.
 *
 * FLAT-routing note: Medical uses /blog/[slug] (no category segment). Blog
 * post pages CANNOT derive their topic from the URL. The renderer/page server
 * resolves the category from post.category and passes it as a prop (via
 * TopicContext). deriveTopic handles only:
 *
 *   /calculators/<slug>             -> calculator slug -> topic
 *   /embed/<slug>                   -> calculator slug -> topic
 *   /for-gps                        -> gp-practice
 *   /for-consultants                -> gp-tax
 *   /for-locum-doctors              -> locum
 *   /for-junior-doctors             -> gp-tax
 *   /nhs-pension                    -> nhs-pension
 *   /blog/<hub-slug>  (static hubs) -> topic via BLOG_HUB_SLUG_TO_TOPIC
 *   /blog/<slug>      (flat posts)  -> null (topic comes as a prop)
 *   everything else                 -> null (no personalisation)
 */

/** The 8 static category-hub paths that do carry a topic via the URL. */
const BLOG_HUB_SLUG_TO_TOPIC: Record<string, TopicKey> = {
  "gp-practice-management": "gp-practice",
  "gp-accountant-services": "gp-practice",
  "gp-tax-and-accounts": "gp-tax",
  "medical-expenses": "gp-tax",
  "nhs-pension-planning": "nhs-pension",
  "locum-tax": "locum",
  "incorporation-and-company-structures": "incorporation-private",
  "private-practice": "incorporation-private",
};

export function deriveTopic(pathname: string): TopicKey | null {
  const path = (pathname || "").split("?")[0].split("#")[0].replace(/\/+$/, "");
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 0) return null;

  if (parts[0] === "blog" && parts[1]) {
    // A single-segment /blog/<slug> could be either:
    //   (a) a static hub slug (maps to a topic via BLOG_HUB_SLUG_TO_TOPIC)
    //   (b) a flat post slug (topic comes as a prop -- return null)
    // The hub map is the discriminant: if it matches, return the topic; otherwise
    // null so the renderer's prop-based TopicContext takes over.
    return BLOG_HUB_SLUG_TO_TOPIC[parts[1]] ?? null;
  }

  if ((parts[0] === "calculators" || parts[0] === "embed") && parts[1]) {
    return topicForCalcSlug(parts[1]);
  }

  // /nhs-pension pillar page
  if (path === "/nhs-pension") return "nhs-pension";

  // /for-* routes
  switch (path) {
    case "/for-gps":
      return "gp-practice";
    case "/for-consultants":
      return "gp-tax";
    case "/for-locum-doctors":
      return "locum";
    case "/for-junior-doctors":
      return "gp-tax";
  }

  return null;
}

/**
 * Resolve topic from a blog post's category field (server-side, for flat-routed
 * blog posts). Slugifies the category string (matching slugifyCategory in
 * lib/blog.ts) then looks up via topicForBlogSlug.
 */
export function topicFromCategory(category: string): TopicKey | null {
  if (!category) return null;
  const slug = category
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
  return topicForBlogSlug(slug);
}
