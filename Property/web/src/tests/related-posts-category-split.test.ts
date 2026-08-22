/**
 * Guard for Phase 8.2.
 *
 * `getRelatedPosts` used to match on the raw frontmatter `category` string. Three of our ten
 * categories carry a two-way spelling split in frontmatter, so each of those three was really
 * two disconnected related-article pools that could never reach one another: 57 posts on the
 * minority spelling could only ever relate to their same-spelling siblings, and the 300 on the
 * majority spelling could never surface any of the 57.
 *
 * The fix is to match on the category SLUG. This test is what stops it regressing, and it is a
 * behaviour test rather than a source scan: it asserts that a post on the minority spelling
 * actually receives peers from the majority spelling, which is the thing that was broken.
 *
 * It also asserts the floor the phase promised: no post may end up with fewer related posts
 * than the raw-string predicate gave it. Slug groups are supersets of raw groups, so this is
 * structurally true, and the test pins it.
 */

import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { getRelatedPosts, slugifyCategory } from "../lib/blog";

const BLOG_DIR = join(__dirname, "..", "..", "content", "blog");

type Fm = { slug: string; title: string; category: string };

function frontmatter(): Fm[] {
  const out: Fm[] = [];
  for (const f of readdirSync(BLOG_DIR).filter((n) => n.endsWith(".md"))) {
    const m = readFileSync(join(BLOG_DIR, f), "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!m) continue;
    const fm: Record<string, string> = {};
    for (const line of m[1].split(/\r?\n/)) {
      const kv = line.match(/^(\w+):\s*(.*)$/);
      if (kv) fm[kv[1]] = kv[2].replace(/^["']|["']$/g, "").trim();
    }
    if (fm.slug && fm.title && fm.category) out.push(fm as Fm);
  }
  return out;
}

describe("getRelatedPosts matches on category slug, not raw frontmatter", () => {
  const posts = frontmatter();

  it("has posts to test against", () => {
    expect(posts.length).toBeGreaterThan(100);
  });

  it("every category slug that carries more than one frontmatter spelling is one pool", () => {
    const spellingsBySlug = new Map<string, Set<string>>();
    for (const p of posts) {
      const s = slugifyCategory(p.category);
      if (!spellingsBySlug.has(s)) spellingsBySlug.set(s, new Set());
      spellingsBySlug.get(s)!.add(p.category);
    }
    const split = [...spellingsBySlug].filter(([, v]) => v.size > 1);
    // If a future content pass normalises every spelling this list legitimately empties, and
    // the assertion below is then vacuous rather than wrong. The first assertion is the one
    // that matters either way.
    for (const [slug, spellings] of split) {
      const minority = [...spellings]
        .map((sp) => ({ sp, n: posts.filter((p) => p.category === sp).length }))
        .sort((a, b) => a.n - b.n)[0].sp;
      const probe = posts.find((p) => p.category === minority)!;
      const related = getRelatedPosts(probe.slug, probe.category, 50);

      // every peer is in the same SLUG
      for (const r of related) expect(slugifyCategory(r.category)).toBe(slug);

      // and the pool is the whole slug, not just the minority spelling
      const peersInSlug = posts.filter((p) => slugifyCategory(p.category) === slug && p.slug !== probe.slug).length;
      expect(related.length).toBe(Math.min(50, peersInSlug));

      // the thing that was actually broken: it can now reach the other spelling
      expect(related.some((r) => r.category !== minority)).toBe(true);
    }
  });

  it("no post gets a smaller pool than raw-string matching gave it", () => {
    // Two halves, because the whole-corpus version costs 115s: getRelatedPosts re-reads all
    // 783 files per call, so asserting it 783 times is 600k+ file reads and it would take the
    // suite from 4s to 2m. ponytail: prove the property from frontmatter, spot-check the
    // implementation against it on a sample that includes every split category.
    //
    // (a) the property itself. A slug group is the union of its spellings, so it is always a
    //     superset of any one spelling's raw group. Pure, no IO beyond the one read above.
    for (const p of posts) {
      const raw = posts.filter((q) => q.category === p.category && q.slug !== p.slug).length;
      const slug = posts.filter((q) => slugifyCategory(q.category) === slugifyCategory(p.category) && q.slug !== p.slug).length;
      expect(slug).toBeGreaterThanOrEqual(raw);
    }

    // (b) the implementation agrees with the property. One post per distinct frontmatter
    //     spelling, which covers both sides of all three splits.
    const oncePerSpelling = [...new Map(posts.map((p) => [p.category, p])).values()];
    for (const p of oncePerSpelling) {
      const expected = posts.filter(
        (q) => slugifyCategory(q.category) === slugifyCategory(p.category) && q.slug !== p.slug,
      ).length;
      expect(getRelatedPosts(p.slug, p.category, 10000).length).toBe(expected);
    }
  });
});
