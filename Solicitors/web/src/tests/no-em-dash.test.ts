/**
 * Em dash ratchet over user-facing copy.
 *
 * House rule: no em dash (U+2014) in user-facing copy. Code comments are
 * exempt by the rule itself, so comment bodies are blanked before the scan
 * (newlines kept, so reported line numbers stay true).
 *
 * SHAPE, and why. The rendered baseline is roughly 330 em dashes across 274
 * routes; a raw source scan finds close to 400 across 70-odd files. A gate
 * that demands zero today can never go green during a multi-phase port, so it
 * would be switched off, which is worse than no gate. This is a RATCHET
 * instead: each bucket records the count that exists today and asserts the
 * count never RISES. The numbers below only ever move DOWN. Lowering one when
 * copy is cleaned is part of that change; raising one is never correct.
 *
 * Three buckets, because they are three different classes with different
 * owners:
 *   SRC      - .ts/.tsx under src/, comments stripped. Component copy.
 *   CONTENT  - markdown body under content/. Authored articles and guides.
 *   FRONTMATTER - metaTitle and metaDescription only. These never reach
 *                 rendered body text, so the rendered-route count misses them
 *                 entirely, but they DO reach users in search results. This is
 *                 the uncaught class.
 */
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";

const WEB_ROOT = join(__dirname, "..", "..");
const EM_DASH = "\u2014";
const NL = "\n";

// Ratchet. Only ever revise these DOWNWARD.
const MAX_SRC = 71;
const MAX_CONTENT = 247;
const MAX_FRONTMATTER = 3;

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
    .replace(/\/\*[\s\S]*?\*\//g, blank) // block comments, incl. inside {/* ... */}
    .replace(/\/\/[^\n]*/g, blank);
}

/** Split a markdown file into its YAML frontmatter block and its body. */
export function splitFrontmatter(src: string): { frontmatter: string; body: string } {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(src);
  if (!m) return { frontmatter: "", body: src };
  return { frontmatter: m[1], body: src.slice(m[0].length) };
}

function countHits(files: string[], text: (src: string) => string): string[] {
  const hits: string[] = [];
  for (const file of files) {
    const rel = file.slice(WEB_ROOT.length + 1).replace(/\\/g, "/");
    text(readFileSync(file, "utf8"))
      .split("\n")
      .forEach((line, i) => {
        for (let n = line.split(EM_DASH).length - 1; n > 0; n--) {
          hits.push(`${rel}:${i + 1}: ${line.trim().slice(0, 140)}`);
        }
      });
  }
  return hits;
}

const SRC_FILES = filesUnder(join(WEB_ROOT, "src"), /\.tsx?$/).filter(
  (f) => !f.includes(".test."),
);
const CONTENT_FILES = filesUnder(join(WEB_ROOT, "content"), /\.md$/);

describe("em dash ratchet", () => {
  it(`src/ carries no more than ${MAX_SRC} em dashes outside comments`, () => {
    const hits = countHits(SRC_FILES, stripComments);
    expect(hits.length, `${hits.length} > ${MAX_SRC}\n${hits.slice(0, 20).join("\n")}`).toBeLessThanOrEqual(
      MAX_SRC,
    );
  });

  it(`content/ (body plus rendered frontmatter) carries no more than ${MAX_CONTENT} em dashes`, () => {
    // Everything a reader sees on the page: the markdown body plus the
    // frontmatter fields that render (summary, faqs, keyTakeaways). The two
    // meta fields are excluded here only because they have their own bucket
    // below, so nothing in content/ is left unguarded.
    const hits = countHits(CONTENT_FILES, (src) =>
      src
        .split(NL)
        .filter((l) => !/^(metaTitle|metaDescription):/.test(l))
        .join(NL),
    );
    expect(
      hits.length,
      `${hits.length} > ${MAX_CONTENT}\n${hits.slice(0, 20).join("\n")}`,
    ).toBeLessThanOrEqual(MAX_CONTENT);
  });

  it(`metaTitle and metaDescription carry no more than ${MAX_FRONTMATTER} em dashes`, () => {
    const hits = countHits(CONTENT_FILES, (src) =>
      splitFrontmatter(src)
        .frontmatter.split("\n")
        .filter((l) => /^(metaTitle|metaDescription):/.test(l))
        .join("\n"),
    );
    expect(
      hits.length,
      `${hits.length} > ${MAX_FRONTMATTER}. These reach users in search results even though ` +
        `they never appear in rendered body text.\n${hits.join("\n")}`,
    ).toBeLessThanOrEqual(MAX_FRONTMATTER);
  });

});
