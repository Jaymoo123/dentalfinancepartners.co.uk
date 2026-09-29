import type { RouteRule } from "./types";

/**
 * Pure, isomorphic topic derivation from a pathname. No per-page wiring: the
 * topic falls out of the route. The route FAMILIES are site config
 * (`WidgetConfig.routeRules`); the parsing is not.
 *
 *   rule { segments: ["blog"], lookup }         -> /blog/<slug> and /blog/<slug>/<post>
 *   rule { segments: ["calculators","embed"] }  -> /calculators/<slug>, /embed/<slug>
 *
 * A bare index route (/blog), the homepage and anything unmatched return null,
 * so the widget falls back to its generic opener.
 *
 * Query strings, hashes and trailing slashes are stripped before matching.
 */
export function makeDeriveTopic(rules: RouteRule[]): (pathname: string) => string | null {
  return function deriveTopic(pathname: string): string | null {
    const path = (pathname || "").split("?")[0].split("#")[0].replace(/\/+$/, "");
    const parts = path.split("/").filter(Boolean);
    if (parts.length === 0) return null;
    for (const rule of rules) {
      if (rule.segments.includes(parts[0]) && parts[1]) return rule.lookup(parts[1]);
    }
    return null;
  };
}
