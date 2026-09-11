/**
 * Guards the structural cost of FLAT blog routing.
 *
 * Medical serves posts at `/blog/<slug>` and category hubs at `/blog/<slug>`
 * too. Next resolves a static segment before the dynamic `[slug]` one, so a
 * post whose slug equalled a hub slug would be permanently shadowed: the hub
 * would render, the post would be unreachable at its canonical URL, and
 * nothing would error. Property never sees this because its posts are nested.
 *
 * The hub set is read off the filesystem rather than hard-coded, so adding a
 * ninth hub directory brings it into the guard automatically.
 */
import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { getAllPosts, getAllCategories } from "@/lib/blog";

const blogAppDir = path.join(process.cwd(), "src/app/blog");

/** Static child routes of /blog: a directory holding a page.tsx, not [slug]. */
function staticBlogRoutes(): string[] {
  return fs
    .readdirSync(blogAppDir, { withFileTypes: true })
    .filter(
      (e) =>
        e.isDirectory() &&
        !e.name.startsWith("[") &&
        fs.existsSync(path.join(blogAppDir, e.name, "page.tsx")),
    )
    .map((e) => e.name)
    .sort();
}

describe("flat blog routing", () => {
  const hubs = staticBlogRoutes();
  const postSlugs = getAllPosts().map((p) => p.slug);

  it("finds both sets", () => {
    expect(hubs.length).toBeGreaterThan(0);
    expect(postSlugs.length).toBeGreaterThan(0);
  });

  it("no post slug is shadowed by a static /blog route", () => {
    const shadowed = postSlugs.filter((slug) => hubs.includes(slug));
    expect(shadowed).toEqual([]);
  });

  it("every live category has a hub route", () => {
    const missing = getAllCategories()
      .map((c) => c.slug)
      .filter((slug) => !hubs.includes(slug));
    expect(missing).toEqual([]);
  });
});
