import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";

/**
 * R5 gap-fix guard for D2, "buttons we can measure".
 *
 * THE DEFECT THIS EXISTS FOR. The uplift wave shipped `data-cta` on the detail
 * templates and not on the hubs: fifteen money routes (the blog index, six blog
 * category hubs, /calculators and its four tools, /services, /for and /vat) each
 * emitted exactly one id, the header's, so the brand-new enquiry panel on those
 * routes could not report a click. The cause was that the site's only control on
 * them, `LeadForm`'s own button, carried no attributes at all. Two separate ways
 * of regressing that are guarded here:
 *
 *   1. the attributes coming off `LeadForm`'s two buttons again;
 *   2. a `LeadForm` mount landing without an explicit `ctaId`, which would make
 *      it share the default id with every other untagged mount and be exactly as
 *      unattributable as one id on three homepage tool links was (R5 B4).
 *
 * Comments are stripped before anything is measured: the port's own §9.1 gate
 * was corrected twice for counting comments as code, and these files carry long
 * decline notes that quote the very attribute names being counted.
 */

const SRC = join(__dirname, "..");
const strip = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (/\.tsx$/.test(entry.name)) out.push(p);
  }
  return out;
}

const LEAD_FORM = join(SRC, "components", "forms", "LeadForm.tsx");

describe("LeadForm carries the data-cta triple", () => {
  const src = strip(readFileSync(LEAD_FORM, "utf8"));

  it("puts all three attributes on the step-2 submit button", () => {
    const submit = src.slice(src.indexOf('type="submit"'));
    const button = submit.slice(0, submit.indexOf(">"));
    expect(button).toContain("data-cta={ctaId}");
    expect(button).toContain("data-cta-placement={ctaPlacement}");
    expect(button).toContain('data-cta-goal="form"');
  });

  it("also tags the step-1 button, which is the one in the server HTML", () => {
    // Step 2 is client-only state, so a static scan of the served routes sees
    // only this button. Without it the fix would not be measurable at all.
    expect(src).toContain("data-cta={`${ctaId}_start`}");
  });

  it("never puts data-cta on a wrapper element", () => {
    const wrappers = src.match(
      /<(div|section|aside|li|figure|ul|ol|form|p|span)[^>]*data-cta=/g
    );
    expect(wrappers).toBeNull();
  });
});

describe("every LeadForm mount names its own id", () => {
  const mounts: { file: string; call: string }[] = [];
  for (const file of walk(join(SRC, "app"))) {
    const src = strip(readFileSync(file, "utf8"));
    for (const m of src.matchAll(/<LeadForm\b[^>]*\/>/g)) {
      mounts.push({ file, call: m[0] });
    }
  }

  it("finds the mounts (guards the guard)", () => {
    expect(mounts.length).toBeGreaterThanOrEqual(18);
  });

  it("passes an explicit ctaId at each one", () => {
    const untagged = mounts.filter((m) => !m.call.includes("ctaId=")).map((m) => m.file);
    expect(untagged).toEqual([]);
  });

  it("uses a distinct id per mount", () => {
    const ids = mounts.map((m) => /ctaId="([^"]+)"/.exec(m.call)?.[1]).filter(Boolean);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("the three homepage tool links are told apart", () => {
  it("carries one id per tool, not one shared id", () => {
    const src = strip(readFileSync(join(SRC, "app", "page.tsx"), "utf8"));
    const ids = [...src.matchAll(/ctaId: "(home_calculator_[a-z_]+)"/g)].map((m) => m[1]);
    expect(new Set(ids).size).toBe(3);
    expect(src).not.toContain('data-cta="home_calculator"');
  });
});
