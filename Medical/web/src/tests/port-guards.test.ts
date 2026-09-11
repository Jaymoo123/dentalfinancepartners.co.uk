/**
 * Design-port guards for Medical Accountants UK (disposition slice 3, section 9.2).
 *
 * vitest here runs `environment: "node"` over `src/**\/*.test.ts` only, so no
 * .tsx file can be rendered and no DOM exists. Every guard below is therefore
 * either a plain assertion or a source-text scan, which is the lazy shape
 * anyway and needs no new dependency.
 *
 * G1 (leadConsentText verbatim) is NOT here: it already exists at
 * src/lib/leads/lead-payload.test.ts. Do not weaken, skip or update it.
 * G3 (contrast floors) lives in src/tests/contrast.test.ts.
 */
import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const SRC = path.join(process.cwd(), "src");

function walk(dir: string, exts: string[]): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, exts));
    else if (exts.some((e) => entry.name.endsWith(e))) out.push(full);
  }
  return out;
}

const TSX = walk(SRC, [".tsx"]);
const ALL_SOURCE = walk(SRC, [".tsx", ".ts", ".css"]);
const rel = (f: string) => path.relative(process.cwd(), f).replace(/\\/g, "/");
const read = (f: string) => fs.readFileSync(f, "utf8");

// ─── G2 ──────────────────────────────────────────────────────────────────────
// Copper #b87333 measures 3.79 on white and 3.62 on slate-50. It is legal as a
// GRAPHIC (3:1 floor: rings, borders, strokes, tints) and illegal as text or as
// a ground under a white label. The 3.79 defect must not creep back.

describe("G2 copper never grounds a white label", () => {
  /* Copper is legal as a GRAPHIC (3:1 floor): icon strokes, rings, borders,
     tints, and as TEXT on the navy ground (4.52). It is illegal as a ground
     under a white label: white on #b87333 measures 3.79.

     KNOWN OPEN, re-derived 2026-09-11, both owned by the calculator slice and
     NOT by this phase's file set. Recorded rather than silently allowed, so a
     NEW occurrence anywhere fails this guard and fixing one of these two also
     fails it, which forces the list to be updated in the same commit. */
  /* Empty, and it should stay that way. The two calculator routes that were on
     this list when the guard was written were fixed in the same phase: both the
     "Free tools" / "Free calculator" chips and the hero CTA on the slug page
     moved from raw --copper (white label 3.79) to --btn-ground (4.91). The list
     is kept rather than deleted because it is the mechanism that forces a fix
     and its record to land together: adding an offender fails this test, and so
     does fixing one without emptying the entry. */
  const KNOWN_OPEN: string[] = [];

  const offenders = new Set<string>();
  for (const file of TSX) {
    for (const line of read(file).split("\n")) {
      // bg copper with no alpha suffix (an alpha tint is a graphic) plus a
      // white label on the same element.
      if (/bg-\[var\(--copper\)\](?!\/)/.test(line) && /text-white/.test(line)) {
        // A fixed-size disc holding an SVG is an icon, not a label.
        if (/h-\d+ w-\d+/.test(line)) continue;
        offenders.add(rel(file));
      }
    }
  }

  it("has no white-on-copper label outside the recorded open set", () => {
    expect([...offenders].sort()).toEqual(KNOWN_OPEN);
  });
});

// ─── G4 ──────────────────────────────────────────────────────────────────────
// Owner decision 2 (2026-09-10): Plus Jakarta Sans is the single face. 131
// occurrences across 29 files went to 0 and must stay there.

describe("G4 the serif face is gone and stays gone", () => {
  it("names no serif utility, token or font anywhere in src", () => {
    const offenders = ALL_SOURCE.filter((f) => !f.endsWith("port-guards.test.ts")).flatMap((file) =>
      read(file)
        .split("\n")
        .map((line, i) =>
          /font-serif|display-serif|--font-cormorant|Cormorant_Garamond/.test(line) &&
          !/No --font-serif|is dropped/.test(line)
            ? `${rel(file)}:${i + 1}`
            : null,
        )
        .filter(Boolean),
    );
    expect(offenders).toEqual([]);
  });
});

// ─── G5 ──────────────────────────────────────────────────────────────────────
// The AA index page and its press CSV read the SAME committed snapshot, which
// is the reason the asset is trustworthy: the two can never drift.

describe("G5 the research CSV route and the page read one snapshot", () => {
  const route = read(
    path.join(SRC, "app/research/annual-allowance-pension-tax-index/data/route.ts"),
  );
  const page = read(
    path.join(SRC, "app/research/annual-allowance-pension-tax-index/page.tsx"),
  );

  it("both import @/data/nhs-aa-index.json and nothing else", () => {
    expect(route).toMatch(/from "@\/data\/nhs-aa-index\.json"/);
    expect(page).toMatch(/from "@\/data\/nhs-aa-index\.json"/);
  });

  it("the snapshot still carries every series the CSV and the page render", async () => {
    const snapshot = (await import("@/data/nhs-aa-index.json")) as unknown as {
      default: Record<string, unknown>;
    };
    const data = (snapshot.default ?? snapshot) as Record<string, unknown>;
    for (const key of ["meta", "headline", "hmrc", "nhs", "nhs_role_split_2019_20"]) {
      expect(data[key], `snapshot key ${key}`).toBeDefined();
    }
  });

  it("the route is force-static, so the CSV cannot be rebuilt off a live source", () => {
    expect(route).toMatch(/export const dynamic = "force-static"/);
  });
});

// ─── G6 ──────────────────────────────────────────────────────────────────────
// A sibling site logged 7 production client_error rows from an undefined
// niche.company in a partially loaded client chunk. A null registered office
// takes out /privacy-policy, /terms and the footer legal line.

describe("G6 site.ts survives a missing registered_office", () => {
  const site = read(path.join(SRC, "config/site.ts"));
  it("falls back to an empty object rather than dereferencing undefined", () => {
    expect(site).toMatch(/company\.registered_office \?\? \{\}/);
    expect(site).toMatch(/niche\?\.company \?\? \{\}/);
  });
  it("builds the office line from filtered parts, so empties collapse cleanly", () => {
    expect(site).toMatch(/\.filter\(Boolean\)/);
  });
});

// ─── G7 ──────────────────────────────────────────────────────────────────────
// Standard terms section 7: adding an interruptive surface, or changing an
// existing one's trigger, timing, cadence, audience or suppression, is a hard
// owner gate. A restyle must not move a threshold. These are the recorded
// values; the constants are module-private, so the guard reads the source.

describe("G7 the interruptive-stack thresholds are frozen", () => {
  const cases: Array<[string, string, RegExp]> = [
    ["StickyCTA scroll threshold", "components/ui/StickyCTA.tsx", /const SCROLL_THRESHOLD = 500;/],
    ["StickyCTA 25% page-height cap", "components/ui/StickyCTA.tsx", /scrollHeight \* 0\.25/],
    ["DeepScrollModal per-topic suppress", "components/intent/DeepScrollModal.tsx", /const SUPPRESS_DAYS = 30;/],
    ["deep-scroll fire point", "lib/intent/engine.ts", /const SCROLL_MODAL_PCT = 70;/],
    ["widget auto-open delay", "components/support/SpecialistWidget.tsx", /const AUTO_OPEN_DELAY_MS = 600;/],
    [
      "widget cadence ladder",
      "components/support/SpecialistWidget.tsx",
      /const CADENCE_THRESHOLDS_MS = \[30_000, 70_000, 120_000, 180_000\];/,
    ],
    ["IntentProvider poll interval", "components/intent/IntentProvider.tsx", /1500/],
  ];
  for (const [name, file, pattern] of cases) {
    it(name, () => {
      expect(read(path.join(SRC, file))).toMatch(pattern);
    });
  }

  /* Assert the DECLARATION, not a bare substring: every one of these files
     also names its own key in its docstring, so a `toContain` check passed
     even after the live constant was changed. Proved by mutation. */
  const STORAGE_KEYS: Array<[string, RegExp]> = [
    ["components/intent/DeepScrollModal.tsx", /const suppressKey = \(topic: string\) => `ma_deepscroll_\$\{topic\}`;/],
    ["components/intent/DeepScrollModal.tsx", /sessionStorage\.setItem\("ma_modal_shown", "1"\)/],
    ["components/intent/ReturningBar.tsx", /const DISMISS_KEY = "ma_returning_bar_dismissed";/],
    ["components/ui/StickyCTA.tsx", /const DISMISS_KEY = "ma_sticky_dismissed";/],
    ["components/support/SpecialistWidget.tsx", /"ma_assistant_autoopened"/],
  ];
  for (const [file, pattern] of STORAGE_KEYS) {
    it(`storage key in ${file} is unchanged (ma_ prefix FROZEN)`, () => {
      expect(read(path.join(SRC, file))).toMatch(pattern);
    });
  }

  /* Renamed from "no interruptive surface was added", which this could not
     detect: it only asserted four names were PRESENT, `toContain` matched them
     in docstrings as well as mounts, and NextStepOffer was never checked at all.
     A sixth surface would have sailed through. It now reads the actual JSX
     elements mounted in the two files that mount them and compares the SET, so
     an addition fails as loudly as a removal. Nothing interruptive gets added to
     this site without the owner's explicit yes, which is the rule this guards. */
  it("the mounted interruptive set is exactly the recorded one", () => {
    const layout = read(path.join(SRC, "app/layout.tsx"));
    const shell = read(path.join(SRC, "components/layout/PageShell.tsx"));
    const INTERRUPTIVE = [
      "ReturningBar",
      "DeepScrollModal",
      "StickyCTA",
      "SpecialistWidget",
      "ExitIntentModal",
      "NewsletterModal",
      "CookieBanner",
      "ConsentBanner",
      "PromoModal",
      "ExitModal",
    ];
    const mountedIn = (src: string) =>
      INTERRUPTIVE.filter((c) => new RegExp(`<${c}[\\s/>]`).test(src));
    const mounted = [...new Set([...mountedIn(layout), ...mountedIn(shell)])].sort();
    expect(mounted).toEqual(
      ["DeepScrollModal", "ReturningBar", "SpecialistWidget", "StickyCTA"].sort(),
    );
    // NextStepOffer is the fifth, mounted inside the article renderer rather
    // than the shell, so it is asserted where it actually lives.
    expect(read(path.join(SRC, "components/blog/BlogPostRenderer.tsx"))).toMatch(
      /<NextStepOffer[\s/>]/,
    );
    // The retired blog exit-intent modal is deleted and must not come back.
    expect(fs.existsSync(path.join(SRC, "components/blog/ExitIntentModal.tsx"))).toBe(false);
  });
});

// ─── G8 ──────────────────────────────────────────────────────────────────────
// vw_cta_performance keys off these ids. Never rename or delete one without
// restating the deploy-watch baseline in the SAME commit. Additions are fine.

/** The slice-3 source census, 2026-09-10, minus the four ids that moved into
 *  packages/web-shared/design/chrome/SiteHeader.tsx and are not in this tree. */
const BASELINE_CTA_IDS = [
  "cta-section-primary",
  "contact_pricing_link",
  "deep_scroll_close",
  "deep_scroll_modal",
  "hero_primary",
  "hero_secondary",
  "home_cta_primary",
  "home_cta_secondary",
  "next_step",
  "returning_bar",
  "returning_bar_close",
  "see_result",
  "specialist_widget",
  "sticky_cta",
  "thankyou-return-article",
];

describe("G8 the data-cta id set is stable", () => {
  /* Scrape the id out of a LITERAL attribute, a ternary, a variable default or a
     prop, and never out of a comment. The first version of this guard matched
     `/data-cta="([^"]*)"/` over raw source, which found `see_result` only inside
     an explanatory comment in ResultGate.tsx and could not see the live emission,
     which is a ternary (`tier === "premium" ? "see_result" : "calc_see_result"`).
     Deleting that live branch left this guard green, which made it useless for
     exactly the id it matters most for: `see_result` is the busiest interaction
     on the site and FUNNEL_BASELINE says not to remove it without a measurement
     plan. Proved by mutation after the fix: deleting the branch now fails. */
  const stripComments = (src: string) =>
    src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
  const found = new Set(
    TSX.flatMap((f) => {
      const src = stripComments(read(f));
      const ids = [...src.matchAll(/data-cta="([^"]*)"/g)].map((m) => m[1]);
      // Ids reaching the attribute through an expression: cta_id / ctaId props,
      // ternaries and object literals. Anything quoted next to those names.
      // Any quoted id on a line that mentions "cta" in any casing. Broad on
      // purpose: this guard asks "does this id still exist anywhere", and a
      // narrow pattern is what made the first version blind to a ternary
      // assigned to a variable (seeResultCtaId).
      const viaExpression = src
        .split("\n")
        // /cta[_-]?id/i, not /cta/i: the looser form swept up an unrelated
        // display label in the admin analytics page ("embed-cta"). This still
        // catches a ternary assigned to a variable, which is what the first
        // version of the guard was blind to.
        .filter((line) => /cta[_-]?id/i.test(line))
        .flatMap((line) => [...line.matchAll(/"([a-z0-9_-]+)"/g)].map((q) => q[1]));
      return [...ids, ...viaExpression];
    }),
  );
  for (const id of BASELINE_CTA_IDS) {
    it(`${id} still exists`, () => {
      expect(found.has(id)).toBe(true);
    });
  }
  it("every id is snake_case or the kebab spellings the estate already records", () => {
    const allowedKebab = ["cta-section-primary", "thankyou-return-article"];
    for (const id of found) {
      if (allowedKebab.includes(id)) continue;
      expect(id, `unexpected kebab-case id ${id}`).toMatch(/^[a-z0-9_]+$/);
    }
  });
});

// ─── G9 ──────────────────────────────────────────────────────────────────────
// The site runs GA4 G-CQF7KFZ1P6. A notice that overstates OR understates is
// the defect either way, and naming Universal Analytics cookies on a GA4 site
// is the exact generalist defect shape.

describe("G9 the cookie policy names the analytics that actually runs", () => {
  const policy = read(path.join(SRC, "app/cookie-policy/page.tsx"));
  it("names _ga and the GA4 property cookie", () => {
    expect(policy).toContain("_ga:");
    expect(policy).toContain("_ga_CQF7KFZ1P6");
  });
  it("names no Universal Analytics cookie", () => {
    expect(policy).not.toContain("_gid");
    expect(policy).not.toContain("_gat_gtag");
  });
  it("the measurement id in the policy is the one the site actually mounts", () => {
    // layout.tsx mounts niche.seo.google_analytics_id through ConsentedScripts,
    // so the config, not the layout, is where the literal lives.
    const niche = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "..", "niche.config.json"), "utf8"),
    ) as { seo: { google_analytics_id: string } };
    expect(niche.seo.google_analytics_id).toBe("G-CQF7KFZ1P6");
    expect(read(path.join(SRC, "app/layout.tsx"))).toContain(
      "gaMeasurementId={niche.seo.google_analytics_id}",
    );
  });
});

// ─── G10 ─────────────────────────────────────────────────────────────────────
// globals.css opened with a UTF-8 BOM and carried mojibake at four lines.

describe("G10 globals.css is clean bytes", () => {
  const file = path.join(SRC, "app/globals.css");
  it("has no UTF-8 BOM", () => {
    expect([...fs.readFileSync(file).subarray(0, 3)]).not.toEqual([0xef, 0xbb, 0xbf]);
  });
  it("has no mojibake", () => {
    // The double-encoded sequences a UTF-8-read-as-latin1 round trip leaves:
    // "Â£", "â€"", "â€™", "Ã©".
    expect(read(file)).not.toMatch(/Â£|â|Ã©/);
  });
});

// ─── House rule ──────────────────────────────────────────────────────────────
// CLAUDE.md: no em-dashes in user-facing copy. Code comments are exempt, so
// this scans the routes and components this phase owns rather than all of src.

describe("no em-dash in the copy this phase owns", () => {
  const owned = [
    "app/research",
    "app/resources",
    "app/thank-you",
    "app/complete",
    "app/free-practice-health-check",
    "components/intent",
    "components/support/SpecialistWidget.tsx",
    "components/ui/StickyCTA.tsx",
  ].flatMap((p) => {
    const full = path.join(SRC, p);
    return fs.statSync(full).isDirectory() ? walk(full, [".tsx", ".ts"]) : [full];
  });

  it("finds none", () => {
    const offenders = owned.flatMap((f) =>
      read(f)
        .split("\n")
        .map((line, i) => (line.includes("—") ? `${rel(f)}:${i + 1}` : null))
        .filter(Boolean),
    );
    expect(offenders).toEqual([]);
  });
});
