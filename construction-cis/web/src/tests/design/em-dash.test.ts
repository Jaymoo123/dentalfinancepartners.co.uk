/**
 * Copy gate: em dashes (U+2014) in user-facing copy, with an EXPLICIT
 * en-dash (U+2013) carve-out.
 *
 * THE METRIC, defined once here and used by nothing else. Scope =
 * `src/app`, `src/components`, `src/lib`, `src/config`, `.ts`/`.tsx` only,
 * `*.test.*` excluded, comment bodies blanked (the house rule exempts code
 * comments, and blanking rather than dropping keeps line numbers honest in the
 * failure message). On this metric the site carries 0 em dashes and 2 en
 * dashes today. That is deliberately NOT any of the four numbers quoted in
 * DISPOSITION_SLICE3 (raw source 39, user-facing source 35, rendered body 34,
 * sweep 36): those were measured over narrower scopes and against the rendered
 * DOM, which a source guard cannot see. Content markdown under `content/` is
 * out of scope (authored content, its own review path), as is `node_modules`.
 *
 * THE TARGET IS ZERO EM DASHES. TD-28 closed in Phase 4 WP-D1: the 43 em
 * dashes that sat in five calculator tool definitions and `llms-full.txt` were
 * all rewritten, so the ratchet's per-file budget table was deleted exactly as
 * its own doc comment instructed and the ceiling is now a flat zero site-wide.
 * Any em dash in any file in scope fails. Do not reintroduce a budget table: a
 * file absent from a budget map is the only shape that catches a NEW bad file.
 *
 * WHY EN DASHES ARE EXEMPT AND EM DASHES ARE NOT. The Phase 0 sweep's regex
 * counted both and reported 36; TD-28 then explicitly protects the 2 en dashes,
 * because both sit between two money figures (`£12,570–£50,270`) where an en
 * dash is the correct typography for a numeric range. A zero-dash gate would
 * force a builder to corrupt two correct figures. So: em dash = always a
 * failure; en dash = permitted ONLY with a digit or a currency symbol on both
 * sides, and a failure anywhere else.
 */
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";

const SRC = join(__dirname, "..", "..");
const ROOTS = ["app", "components", "lib", "config"];

const EM = "—";
const EN = "–";

/** Blank every comment body, keeping newlines so line numbers still line up. */
export function stripComments(src: string): string {
  const blank = (m: string) => m.replace(/[^\n]/g, " ");
  return src.replace(/\/\*[\s\S]*?\*\//g, blank).replace(/\/\/[^\n]*/g, blank);
}

/** An en dash is allowed only between two numbers, e.g. `£12,570–£50,270`. */
export function enDashInNumericRange(line: string, index: number): boolean {
  return /[\d%)]\s*$/.test(line.slice(0, index)) && /^\s*[£$€\d(]/.test(line.slice(index + 1));
}

function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...sourceFiles(full));
    else if (/\.tsx?$/.test(entry) && !entry.includes(".test.")) out.push(full);
  }
  return out;
}

function scan() {
  const emPerFile: Record<string, number> = {};
  const badEn: string[] = [];
  for (const root of ROOTS) {
    for (const file of sourceFiles(join(SRC, root))) {
      const rel = file.slice(SRC.length + 1).replace(/\\/g, "/");
      const lines = stripComments(readFileSync(file, "utf8")).split("\n");
      lines.forEach((line, i) => {
        const em = line.split(EM).length - 1;
        if (em) emPerFile[rel] = (emPerFile[rel] ?? 0) + em;
        let at = line.indexOf(EN);
        while (at !== -1) {
          if (!enDashInNumericRange(line, at)) {
            badEn.push(`${rel}:${i + 1}: en dash outside a numeric range: ${line.trim()}`);
          }
          at = line.indexOf(EN, at + 1);
        }
      });
    }
  }
  return { emPerFile, badEn };
}

describe("dash gate", () => {
  const { emPerFile, badEn } = scan();

  it("carries no em dash in any file in scope", () => {
    const offenders = Object.keys(emPerFile).map((f) => `${f}: ${emPerFile[f]} em dash(es)`);
    expect(
      offenders,
      `em dashes are banned in user-facing copy. Use a comma, a colon or a full stop.\n${offenders.join("\n")}`,
    ).toEqual([]);
  });

  it("allows en dashes only between two numbers (TD-28 protects the 2 money ranges)", () => {
    expect(badEn, badEn.join("\n")).toEqual([]);
  });

  it("the carve-out predicate really does distinguish a range from prose", () => {
    // Guards the guard: if this predicate degenerated to `true`, the en-dash
    // assertion above would pass on anything.
    const range = "bands: £12,570–£50,270 at 20%";
    expect(enDashInNumericRange(range, range.indexOf(EN))).toBe(true);
    const prose = "the refund – and the deduction – are separate";
    expect(enDashInNumericRange(prose, prose.indexOf(EN))).toBe(false);
  });
});
