/**
 * P1-GUARD: no em dash in user-facing copy, frontmatter meta fields included.
 *
 * House rule: user-facing copy uses commas, parentheses or full stops, never
 * an em dash. Code comments are exempt by the rule itself, so comment bodies
 * are blanked before the scan (newlines kept, so line numbers stay true).
 *
 * WHY A ZERO GATE AND NOT A RATCHET. Solicitors shipped a ratchet because its
 * rendered baseline was ~330 dashes and a zero gate could never go green. This
 * site is the opposite case, and the number in the port baseline is misleading
 * about it: `docs/contractors-ir35/_port/sweep_baseline.json` records 14
 * "dashes" across 157 URLs, but `docs/_engines/instruments/sweep.mjs:72`
 * counts EN dashes and the HTML entities too (`/[—–]|&mdash;|&ndash;/`). Scan
 * this site's own source for U+2014 alone, comments stripped, and the count is
 * ZERO in src/ and zero in content/, body and frontmatter alike; the 14 are
 * en dashes, 13 of them in `src/data/contractor-types.ts` (which feeds the
 * /for pages) plus one on the home page. En dashes are allowed by the house
 * rule in numeric ranges, so they are not this gate's business. With the true
 * em-dash count already at zero, a ratchet would license 14 regressions that
 * do not exist. The gate is zero, and any dash a port phase introduces fails
 * it on the commit that adds it.
 *
 * THE META-FIELD BUCKET IS THE POINT. An em dash in `metaTitle` or
 * `metaDescription` never reaches rendered body text, so a rendered-route
 * sweep and a body-text scan both miss it, while it reaches every user who
 * sees the result in Google or Bing. It gets its own named bucket so the
 * failure message says which class broke.
 */
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";

const WEB_ROOT = join(__dirname, "..", "..");
const EM_DASH = "—";
const EM_DASH_ENTITY = /&mdash;/g;
const META_FIELD = /^(metaTitle|metaDescription):/;

function filesUnder(dir: string, match: RegExp): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === "node_modules" || entry === ".next") continue;
      out.push(...filesUnder(full, match));
    } else if (match.test(entry)) out.push(full);
  }
  return out;
}

/** Blank every comment body, keeping newlines so line numbers still line up. */
export function stripComments(src: string): string {
  const blank = (m: string) => m.replace(/[^\n]/g, " ");
  return src
    .replace(/\/\*[\s\S]*?\*\//g, blank) // block comments, incl. the inside of {/* ... */}
    .replace(/\/\/[^\n]*/g, blank);
}

/** Split a markdown file into its YAML frontmatter block and its body. */
export function splitFrontmatter(src: string): { frontmatter: string; body: string } {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(src);
  if (!m) return { frontmatter: "", body: src };
  return { frontmatter: m[1], body: src.slice(m[0].length) };
}

function hits(files: string[], text: (src: string) => string): string[] {
  const out: string[] = [];
  for (const file of files) {
    const rel = file.slice(WEB_ROOT.length + 1).replace(/\\/g, "/");
    text(readFileSync(file, "utf8"))
      .split("\n")
      .forEach((line, i) => {
        const count = line.split(EM_DASH).length - 1 + (line.match(EM_DASH_ENTITY)?.length ?? 0);
        for (let n = 0; n < count; n++) out.push(`${rel}:${i + 1}: ${line.trim().slice(0, 140)}`);
      });
  }
  return out;
}

const SRC_FILES = filesUnder(join(WEB_ROOT, "src"), /\.tsx?$/).filter((f) => !f.includes(".test."));
const CONTENT_FILES = filesUnder(join(WEB_ROOT, "content"), /\.md$/);

describe("em dash gate", () => {
  it("has files to scan", () => {
    expect(SRC_FILES.length).toBeGreaterThan(0);
    expect(CONTENT_FILES.length).toBeGreaterThan(0);
  });

  it("src/ carries no em dash outside comments", () => {
    const found = hits(SRC_FILES, stripComments);
    expect(found, found.join("\n")).toEqual([]);
  });

  it("content/ bodies and rendered frontmatter carry no em dash", () => {
    // Everything a reader sees on the page: the markdown body plus the
    // frontmatter that renders (summary, keyTakeaways, faqs). The two meta
    // fields are excluded only because they have their own bucket below.
    const found = hits(CONTENT_FILES, (src) =>
      src
        .split("\n")
        .filter((l) => !META_FIELD.test(l))
        .join("\n"),
    );
    expect(found, found.join("\n")).toEqual([]);
  });

  it("metaTitle and metaDescription carry no em dash", () => {
    const found = hits(CONTENT_FILES, (src) =>
      splitFrontmatter(src)
        .frontmatter.split("\n")
        .filter((l) => META_FIELD.test(l))
        .join("\n"),
    );
    expect(
      found,
      "these never appear in rendered body text, so a body-text sweep misses them, but they reach " +
        `users in search results:\n${found.join("\n")}`,
    ).toEqual([]);
  });
});
