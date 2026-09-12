# P1-3 Footer: kit `SiteFooter` adoption

Package scope: `contractors-ir35/web/src/components/layout/SiteFooter.tsx` only.
No build/server run this pass — coordinator's build lock (four agents share one
`.next`); static verification only. Live DOM checks below are listed as
UNVERIFIED, to be run against the coordinator's single serialised build.

## What changed

Local `SiteFooter.tsx` now wraps `@accounting-network/web-shared/design/chrome/SiteFooter`
instead of hand-rolling the footer markup. `showBuilderCredit` is not passed
(kit default `true` is Property-only; this site did not commission Double
Wired Creative, so leaving it unset would ship an unearned outbound credit
link in an indigo/orange gradient matching no brand token here).

Props:
- `footerLinks = siteConfig.footer` — the site's existing 9-item flat list,
  unchanged. Kept deliberately non-"legal-only" (kit convention) to guarantee
  the link floor by construction: nothing that linked before stops linking.
- `nav` / `fallbackNav` / `resourcesHref` / `companyItems` — left at kit
  defaults. `niche.config.json` navigation is flat (no `children`/`groups`),
  so the kit's Services/Resources columns derive to empty arrays and are
  dropped by its own `.filter((c) => c.items.length > 0)`. Verified no dead
  column ships. `DEFAULT_COMPANY_ITEMS` (About /about, Contact /contact,
  Locations /locations, Book a consultation /book) all resolve to real
  routes here — confirmed by `ls src/app` (about/, contact/, book/ exist)
  and `DESIGN_DELTA.md` §7 (/locations, 10 cities, live). Regrouping the flat
  nav into `navigation[]` groups (the delta's Tools group: Calculators /
  Glossary / Research / Resources) is IA authoring, priced separately in
  DESIGN_DELTA.md §7 as 0.75 phase-2 agent-days, and is explicitly NOT done
  in this package.
- `wordmarkIcon={FileBadge}`, `wordmarkTop="CONTRACTOR TAX"`,
  `wordmarkBottom="ACCOUNTANTS · IR35 SPECIALISTS"` — the kit's type requires
  these three; DESIGN_DELTA.md §1/§8 marks the wordmark lockup an owner
  BLOCKER, "PROPOSED... awaiting pick," with exactly these values as its own
  recommendation (icon fallback `Briefcase`). Used the delta's proposal
  rather than leaving the prop unfillable. One-line revert either way
  (swap the import and the two strings) if the owner picks differently.
- `consentToggle` — `ConsentToggle` kept, styled `text-slate-400
  hover:text-white` to match the kit's own legal-row treatment on the navy
  ground (was `text-neutral-500` on `#fafaf7`, the old cream footer).

## Contrast — hand-computed, method self-tested

Script asserted against the two published anchors before running:
`ratio('#64748b','#ffffff') == 4.76` and `ratio('#94a3b8','#ffffff') == 2.56`.
Both reproduced exactly. WCAG relative-luminance formula, sRGB->linear per
channel, `(L1+0.05)/(L2+0.05)`.

Ground for every row below: `#0f172a` (slate-900, the kit footer's `bg-slate-900`).

| Element | Class | Hex | Ratio | Floor | Verdict |
|---|---|---|---|---|---|
| Brand description paragraph | `text-slate-300` | `#cbd5e1` | 12.02 | 4.5 | PASS |
| Column headings, wordmark rule, wordmark icon | `text-primary-400` / `bg-primary-400` (resolves to cyan-400 per DESIGN_DELTA §1's ramp binding) | `#22d3ee` | 9.88 | 4.5 (text) / 3.0 (icon/rule, graphic) | PASS both |
| Wordmark top/bottom text | `text-white` | `#ffffff` | 17.85 | 4.5 | PASS |
| Nav-column links (Calculators, Company) | `text-slate-300` | `#cbd5e1` | 12.02 | 4.5 | PASS |
| Legal row links (`footerLinks`) | `text-slate-400` | `#94a3b8` | 6.96 | 4.5 | PASS |
| Legal disclosure paragraph | `text-slate-400` | `#94a3b8` | 6.96 | 4.5 | PASS |
| Copyright line | `text-slate-400` | `#94a3b8` | 6.96 | 4.5 | PASS |
| Consent toggle (styled to match legal row) | `text-slate-400` | `#94a3b8` | 6.96 | 4.5 | PASS |

**Lowest ratio found: 6.96** (every slate-400-on-navy text element), well clear
of 4.5. This is a large improvement over the pre-port footer's worst row,
neutral-500 on `#fafaf7` at 4.53 (near-zero headroom) — moving off the warm
cream ground onto slate-900 fixes that fragility as a side effect of the kit
adoption, not a deliberate target of this package.

One caveat flagged per H2 in DESIGN_DELTA.md: `primary-400` is a Tailwind
theme-scale utility (`--color-primary-400`), not a literal `cyan-400` class.
It resolves correctly only once the ramp is declared in `globals.css` (§1's
job, a sibling agent's lease this wave — every already-ported sibling site
carries a full `--color-primary-50..950` block; contractors-ir35's did not
yet, as of this file). Until that lands, `text-primary-400` is an
unrecognised Tailwind utility and falls back to inherited (likely white)
text, which happens to still pass on this dark ground but for the wrong
reason. **This ratio table assumes the ramp resolves cyan-400 for
`primary-400`, per DESIGN_DELTA §1's own binding.** Re-check once `globals.css`
lands; if `primary-400` is still undefined at review time, add it or swap
these three usages to a literal `text-cyan-400`.

## Consent toggle

Not runtime-verified this pass (no build/server, per coordinator's build
lock). Static check: `ConsentToggle` import path unchanged
(`@/components/analytics/ConsentToggle`), component unedited, still passed
into the footer and still rendered (`{consentToggle}` at
`packages/web-shared/design/chrome/SiteFooter.tsx:239`, inside the same
`flex ... justify-between` row as the copyright line). Its `"use client"`
directive and `getConsent()`/`setConsent()` wiring are untouched.
**UNVERIFIED until the coordinator's serialised build**: that the button
renders with the label "Do not track me" in server HTML pre-hydration, and
that clicking it flips `localStorage` consent and swaps the label.

## Links: before / after

Source-only count (`niche.config.json` navigation/footer_links, kit's
`buildFooterColumns`, `ls src/app`). Not yet cross-checked against
`sweep_baseline.json`'s crawled totals — see verification list.

**Before** (old hand-rolled footer, one instance, appears on every page):
- Brand column: 1 link (`/contact`, "Contact us")
- 3 flat columns built from `siteConfig.footer` (9 items): `/services`,
  `/ir35-status`, `/for`, `/blog`, `/about`, `/contact`, `/privacy-policy`,
  `/terms`, `/cookie-policy`
- Total anchors: 10. Unique hrefs: 9 (`/contact` duplicated by the brand
  "Contact us" link).

**After** (kit `SiteFooter`, same one mount point):
- Wordmark home link: 1 (`/`) — new, was not a distinct link before (the old
  brand block had no home link, only "Contact us")
- `footerLinks` row: same 9 items, unchanged hrefs
- "Calculators" column: 1 link, `/calculators` ("All calculators") — new
- "Company" column: 4 links, `/about`, `/contact`, `/locations`, `/book` —
  `/about` and `/contact` duplicate `footerLinks`; `/locations` and `/book`
  are new
- "Services"/"Resources" columns: absent (0 items, filtered by the kit)
- Total anchors: 15. Unique hrefs: 12 (`/`, `/services`, `/ir35-status`,
  `/for`, `/blog`, `/about`, `/contact`, `/privacy-policy`, `/terms`,
  `/cookie-policy`, `/calculators`, `/locations`, `/book`)

**Link-floor verdict: PASS, by construction.** Every hred that was reachable
from the old footer is still in `footerLinks`, verbatim. The only changes are
additions (`/`, `/calculators`, `/locations`, `/book`) and one duplicate
pairing (`/about`, `/contact` now linked twice from the footer). Nothing was
removed. This is a per-instance count (the footer mounts once per page); the
estate-wide `sweep_baseline.json` delta (157 URLs) is +4 unique links **per
page**, so the crawl total should rise, never fall.

I did not verify every one of `/calculators`, `/locations`, `/book`,
`/about`, `/contact`, `/privacy-policy`, `/terms`, `/cookie-policy` returns a
real page by requesting it (no server running this pass). `ls src/app`
confirms route folders exist for `about/`, `book/`, `calculators/`,
`contact/`; the remaining five were not independently re-checked here beyond
trusting `niche.config.json` (their being live today, unedited, is the
premise of "footerLinks = the existing list, unchanged" — I made no claim
about them beyond preserving them as-is).

## Verification list for the coordinator's serialised build

Run against `next start` (never `next dev`), a port other than 3611, kill the
server after. Assert page title first to confirm it's this site, not a
sibling on a stale port.

1. `curl -s http://localhost:<port>/ | grep -o "<title>[^<]*</title>"` —
   expect a Contractor Tax Accountants / IR35 title, not a sibling site's.
2. `curl -s http://localhost:<port>/ | grep -o 'bg-slate-900'` on the footer
   region (or view-source in-browser) — expect the footer `<footer>` element
   to carry `bg-slate-900 text-white`, replacing the old
   `border-t border-neutral-200 bg-[#fafaf7]`.
3. In the rendered DOM (dev tools, not view-source, since `ConsentToggle` is
   a client component): confirm a button reading "Do not track me" exists
   inside the footer, click it, confirm the label flips to "Enable
   analytics" and `localStorage.getItem` for the consent key changes.
4. `curl -s http://localhost:<port>/ | grep -oE '"text-primary-400|bg-primary-400"'` —
   then separately confirm in dev tools that computed color for that
   element is `rgb(34, 211, 238)` (cyan-400), not the browser's `unset`
   fallback. This is the H2 check: if `globals.css` has not yet landed the
   `--color-primary-400` ramp, this element renders unstyled and the
   contrast table above does not describe what actually shipped.
5. `curl -s http://localhost:<port>/ | grep -o 'Built by Double Wired Creative'` —
   expect NO match (confirms `showBuilderCredit` really is unset, not
   defaulting true).
6. Count `<a href` occurrences inside the `<footer>` element specifically
   (view-source, isolate the footer tag) on `/` — expect 15, against the
   pre-port baseline's 10 on the same page (`git show
   18b4f25f:contractors-ir35/web/src/components/layout/SiteFooter.tsx` run
   through the old logic, or diff against port 3611's rendered `/`).
7. Confirm each new href resolves (not a 404): `curl -sI
   http://localhost:<port>/locations`, `/book`, `/calculators` — expect
   `200`.
8. Resize/inspect at 390px and 1440px — confirm the footer's `lg:grid-cols-
   [1.4fr_3fr]` doesn't overflow horizontally at 390 (page body must not
   scroll horizontally, §0.8).

## Receipt

- Ratios measured: 8 (table above), all hand-computed, self-tested method.
- Lowest ratio found: **6.96** (slate-400 on slate-900, four elements).
- Link-floor verdict: **PASS by construction** — before 9 unique/10 anchors,
  after 12 unique/15 anchors, per footer instance; nothing removed.
- Consent toggle: mount and prop-wiring verified statically; render/click
  behaviour **UNVERIFIED**, on this pass's verification list above.
- Wrong in the brief: nothing factually wrong. One gap the brief didn't flag:
  the kit's `wordmarkIcon`/`wordmarkTop`/`wordmarkBottom` are non-optional
  props and the wordmark lockup is an open owner BLOCKER in
  DESIGN_DELTA.md §8 — the brief's instructions (1-5) don't mention it, so I
  used the delta's own proposed values rather than leaving the component
  non-compiling, and flagged it above as a one-line revert point.
- Also flagged: `text-primary-400` depends on a `--color-primary-400` Tailwind
  theme token that a sibling agent's `globals.css` package is adding this
  wave, not yet confirmed present when this file was written.
