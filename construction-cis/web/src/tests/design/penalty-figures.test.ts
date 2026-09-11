/**
 * TD-08 / TD-09 / TD-30 regression guard, Phase 3 / WP-C3. Assertions rewritten
 * after a bite harness showed five of eight real breach shapes walking past the
 * previous regexes.
 *
 * Three published statements of UK tax law are pinned here, all three of which
 * have been wrong on this site before:
 *   TD-08  s.62B stated as a percentage of the sums returned (the statute
 *          charges the whole sum; house positions section 3).
 *   TD-09  the 100% CIS300 layer attached to the ordinary 12-month tier rather
 *          than to deliberate withholding (house positions section 4).
 *   TD-30  the banned "30% of the tax HMRC considers lost" director penalty
 *          under ss.62A/62B, which house positions section 3 bans in capitals
 *          ("no 30% figure appears in either section").
 *
 * It enumerates the whole published corpus programmatically (every .ts/.tsx
 * under src/ except the tests themselves, every .md under content/, plus
 * niche.config.json), so a new page or data file is covered the day it is added.
 *
 * Two deliberate design points:
 *  - The context window is the SENTENCE (or block) containing the match, not a
 *    fixed character pad. A ±110 char pad made the verdict depend on prose
 *    layout: the same clause passed when its qualifier happened to sit within
 *    110 characters and failed when it was pushed beyond.
 *  - A percentage of a s.72A penalty is a different quantum from the ss.62A/62B
 *    quanta, and house positions section 3 expressly permits a precisely cited
 *    officer-liability mechanism. So a 30% clause that names s.72A is legitimate
 *    and is not flagged; what is banned is 30% attached to ss.62A/62B or to "the
 *    tax lost".
 */
import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

const WEB = join(__dirname, "..", "..", "..");

function walk(dir: string, exts: string[], skip: string[] = []): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (skip.some((s) => p.includes(s))) continue;
    if (statSync(p).isDirectory()) out.push(...walk(p, exts, skip));
    else if (exts.some((e) => name.endsWith(e))) out.push(p);
  }
  return out;
}

const FILES = [
  ...walk(join(WEB, "src"), [".ts", ".tsx"], [join("src", "tests")]),
  ...walk(join(WEB, "content"), [".md"]),
  join(WEB, "..", "niche.config.json"),
];

const CORPUS = FILES.map((f) => ({
  path: relative(WEB, f).replace(/\\/g, "/"),
  text: readFileSync(f, "utf8"),
}));

/**
 * Sentence / block boundaries: end of sentence followed by whitespace, a line
 * break, or a block-level tag. Inline tags (<strong>, <a>, <em>) do NOT split,
 * so a sentence carrying a link stays whole. <td>/<th> do NOT split either: a
 * penalty-ladder table states one rule per ROW, with the behaviour in one cell
 * and the charge in the next, so the row is the unit of meaning. Colons do not
 * split ("deliberate and concealed withholding: ...").
 */
const BOUNDARY =
  /(?:[.!?]["')\]]?\s)|\n|<\/?(?:p|li|tr|h[1-6]|br|div|ul|ol|table|tbody|thead|section|blockquote)\b[^>]*>/gi;

/** The sentence (or block) containing [start, end) of `text`. */
export function sentenceAt(text: string, start: number, end: number): string {
  let from = 0;
  let to = text.length;
  BOUNDARY.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = BOUNDARY.exec(text)) !== null) {
    const b = m.index + m[0].length;
    if (b <= start) from = b;
    else if (m.index >= end) {
      to = b;
      break;
    }
    if (m[0].length === 0) BOUNDARY.lastIndex++;
  }
  return text.slice(from, to).trim();
}

/** Every sentence in the corpus containing a match for `re`. */
function windows(re: RegExp): string[] {
  const out: string[] = [];
  for (const { path, text } of CORPUS) {
    const g = new RegExp(re.source, "g" + re.flags.replace("g", ""));
    let m: RegExpExecArray | null;
    while ((m = g.exec(text)) !== null) {
      // A match that itself straddles a sentence or block boundary is not a
      // single claim (e.g. a percentage in one table cell, a section number in
      // the next row). Discard it rather than widen the window to the whole
      // table.
      if (!new RegExp(BOUNDARY.source, "i").test(m[0])) {
        out.push(`${path}: ${sentenceAt(text, m.index, m.index + m[0].length)}`);
      }
      if (m[0].length === 0) g.lastIndex++;
    }
  }
  return out;
}

function hits(re: RegExp): string[] {
  const out: string[] = [];
  for (const { path, text } of CORPUS) {
    for (const m of text.match(new RegExp(re.source, "g" + re.flags.replace("g", ""))) ?? []) {
      out.push(`${path}: ${m}`);
    }
  }
  return out;
}

/** Numerals 1-99, digits or spelled out. 100 is excluded on purpose: it is the statute. */
const SUB100 =
  "(?:\\d{1,2}|ten|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)(?:[- ](?:one|two|three|four|five|six|seven|eight|nine))?";
const PCT = `${SUB100}\\s*(?:%|per ?cent)`;

/** A clause that names deliberate withholding may carry the 100% layer. */
const DELIBERATE = /deliberat|conceal|withheld|withholding|serious case/i;
/** A clause quantifying the ss.62A/62B pair must carry the s.62B quantum too. */
const S62B_QUANTUM = /100%|(?:full|whole) sum|equal to the sum/i;
/** A percentage OF a s.72A penalty is a different quantum and is permitted (HP section 3). */
const S72A = /72A/i;

describe("published statutory penalty figures, site-wide", () => {
  it("enumerates a real corpus (guards the guard)", () => {
    // If the walk breaks or the tree moves, every assertion below goes vacuous.
    expect(CORPUS.length).toBeGreaterThan(200);
    const all = CORPUS.map((c) => c.text).join("\n");
    expect(all).toContain("section-62b-penalty"); // glossary data.ts
    expect(all).toContain("Knowledge-based penalty on payments under FA 2004 s.62A"); // trade-types.ts
    expect(all).toContain("£300 or 5%"); // the correct ladder is present somewhere
    expect(CORPUS.some((c) => c.path.endsWith("niche.config.json"))).toBe(true);
    // The counterpart of the "Finance Bill 2026" rule below: the live-law
    // phrasing must be present, or that rule is passing over nothing.
    expect(all).toContain("Finance Act 2026");
  });

  it("TD-08: s.62B is never quantified as a percentage of the sums returned", () => {
    // 1-99% (digits or words) of the sums is the banned shape; 100% is the statute.
    expect(hits(new RegExp(`\\b${PCT} of the sums`, "i"))).toEqual([]);
    // "s.62A 20% of the payment, s.62B the whole sum" is correct, so a percentage
    // running either side of s.62B is only a breach when no s.62B quantum sits in
    // the same sentence. 160 chars, not 60: a real clause ("s.62B, a provision
    // inserted by Finance Act 2026 which applies to returns made in knowledge of
    // deliberate failures, charges 20% of the sum") walked past the 60-char gap.
    const s62bRules = [
      new RegExp(`(?:s\\.?\\s?|section )62B[^.]{0,160}\\b${PCT}`, "i"),
      new RegExp(`\\b${PCT}[^.]{0,160}s\\.62B`, "i"),
    ];
    for (const re of s62bRules) {
      for (const w of windows(re)) {
        if (S72A.test(w)) continue;
        expect(w).toMatch(S62B_QUANTUM);
      }
    }
  });

  it("TD-08: a percentage is never attached to the bare ss.62A/62B pair", () => {
    // The two quanta differ, so any clause that puts a percentage on the pair
    // must also state the s.62B quantum (the whole sum returned). A percentage
    // of the SEPARATE s.72A penalty is not a 62A/62B quantum and is exempt.
    const pairRules = [
      new RegExp(`62A\\s*(?:\\/|and|or)\\s*(?:s\\.)?62B[^.]{0,90}\\b${PCT}`, "i"),
      new RegExp(`\\b${PCT}[^.]{0,70}(?:ss?\\.)?62A\\s*(?:\\/|and|or)\\s*(?:s\\.)?62B`, "i"),
    ];
    for (const re of pairRules) {
      for (const w of windows(re)) {
        if (S72A.test(w)) continue;
        expect(w).toMatch(S62B_QUANTUM);
      }
    }
  });

  it("TD-09: the 100% CIS300 layer is only ever the deliberate-withholding charge", () => {
    // Shape, not literal: "£300 or  100%", "£300 or up to 100%" and "£300 or 100 %"
    // all walked past the two pinned literals this replaces.
    expect(hits(/£300\s*(?:<em>)?or(?:<\/em>)?[^.]{0,20}100\s*%/i)).toEqual([]);
    // Any clause charging 100% of the deductions / liability on a return must
    // name deliberate withholding, however it is phrased and wherever the
    // qualifier sits. This is the shape, not the wording, so rephrasing the
    // 12-month tier ("rises to 100% of the deductions on the return") cannot
    // escape it.
    for (const w of windows(
      /100%\s*(?:of|de)?\s*(?:of )?the\s*(?:CIS\s*)?(?:deductions?|liability|amount due|sums? due)/i,
    )) {
      expect(w).toMatch(DELIBERATE);
    }
  });

  it("TD-30: the banned 30%-of-tax-lost director penalty never appears", () => {
    // House positions section 3: NEVER state a "30% of tax lost" director
    // penalty under ss.62A/62B. No percentage of "tax lost" is ever correct.
    expect(hits(new RegExp(`\\b${PCT}\\s*of (?:the )?tax[^.]{0,60}lost`, "i"))).toEqual([]);
    // 30% sitting with ss.62A/62B is banned unless it is the s.72A penalty,
    // which is a cited, separate mechanism (HP section 3 exception).
    for (const w of windows(/\b30\s*(?:%|per ?cent)[^.]{0,120}62[AB]|62[AB][^.]{0,120}\b30\s*(?:%|per ?cent)/i)) {
      expect(w).toMatch(S72A);
    }
  });

  it("TD-07: the 2026 measures are never called a Bill; Royal Assent was 18 March 2026", () => {
    // The live law is Finance Act 2026. "Finance Bill 2026" is a statement that
    // the measures are not yet law, which is false on every page that carries
    // it. The previous guard for this pinned ONE page's FAQ registry; this one
    // rides the corpus walk above, so a new page or data file is covered the
    // day it is added. The window is the containing sentence, so a failure
    // names the claim, not a character slice of it.
    expect(windows(/Finance\s+Bill\s+2026/i)).toEqual([]);
  });
});
