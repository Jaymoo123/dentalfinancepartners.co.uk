import type { SchemaThing } from "./types";

/**
 * Serialise one or more SchemaThing objects as a JSON-LD payload safe to embed
 * inside <script type="application/ld+json">. Escapes `</` to prevent a closing
 * </script> inside string fields from terminating the surrounding script tag.
 */
export function serialize(thing: SchemaThing | SchemaThing[]): string {
  const json = JSON.stringify(thing);
  return json.replace(/<\//g, "<\\/");
}
