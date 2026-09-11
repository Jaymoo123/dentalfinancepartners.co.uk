/**
 * Does this href resolve to a real page under `src/app`?
 *
 * Shared by the niche-config nav guard and the page-summaries guard; a test
 * helper rather than a lib module because nothing in the app needs it. Matches a
 * dynamic segment (`[slug]`, `[...slug]`) where no literal directory exists.
 */
import { existsSync, readdirSync } from "fs";
import { join } from "path";

export const APP_DIR = join(__dirname, "..", "..", "app");

export function routeExists(href: string, appDir = APP_DIR): boolean {
  const segments = href.split("/").filter(Boolean);
  let dir = appDir;
  for (const segment of segments) {
    if (existsSync(join(dir, segment))) {
      dir = join(dir, segment);
      continue;
    }
    const dynamic = readdirSync(dir).find((e) => /^\[.+\]$/.test(e));
    if (!dynamic) return false;
    dir = join(dir, dynamic);
  }
  return existsSync(join(dir, "page.tsx")) || existsSync(join(dir, "route.ts"));
}
