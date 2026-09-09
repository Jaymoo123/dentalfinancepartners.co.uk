/**
 * Copy gate: no em dash (U+2014) in user-facing source copy.
 *
 * House rule: user-facing copy uses commas or full stops, never an em dash.
 * Code comments are exempt (the rule names them as exempt), so comments are
 * blanked out before the scan rather than skipped by heuristic, which keeps
 * line numbers intact for the failure message.
 *
 * Scope is `src/app` and `src/components` .ts/.tsx only. Blog markdown under
 * `content/` is out of scope on purpose: it is authored content with its own
 * review path, and node_modules is never scanned.
 */
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";

const SRC = join(__dirname, "..");
const ROOTS = ["app", "components"];

function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...sourceFiles(full));
    else if (/\.tsx?$/.test(entry) && !entry.includes(".test.")) out.push(full);
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

describe("no em dash in user-facing copy", () => {
  it("src/app and src/components carry no U+2014 outside comments", () => {
    const hits: string[] = [];
    for (const root of ROOTS) {
      for (const file of sourceFiles(join(SRC, root))) {
        const lines = stripComments(readFileSync(file, "utf8")).split("\n");
        lines.forEach((line, i) => {
          if (line.includes("—")) {
            hits.push(`${file.slice(SRC.length + 1).replace(/\\/g, "/")}:${i + 1}: ${line.trim()}`);
          }
        });
      }
    }
    expect(hits, hits.join("\n")).toEqual([]);
  });
});
