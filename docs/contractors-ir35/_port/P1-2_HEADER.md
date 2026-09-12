# P1-2 — SiteHeader kit adoption, receipt

File lease: `contractors-ir35/web/src/components/layout/SiteHeader.tsx` (only file touched).

Status: edits complete. **Rendered-DOM verification NOT YET DONE** — the wave
coordinator stopped all `next build`/`next start` in `contractors-ir35/web` mid-package
because 4 concurrent agents share one `.next` directory (an `ENOENT
build-manifest.json` / `.next/export/500.html` race was hit twice on retry, not a
real defect). Coordinator will run one serialised build at wave close and execute
every package's verification list against it. Everything below marked
**UNVERIFIED** stands on source-reading and hand-computed contrast only, per
"verify, then claim" — not stated as fact.

## What changed

`SiteHeader.tsx` no longer contains its own header markup. It is now a thin wrapper
around `@accounting-network/web-shared/design/chrome/SiteHeader`, called exactly as
before (`<SiteHeader />`, no external props — `PageShell.tsx` is P1-4's lease, not
touched here, so the call site is unchanged). All kit props are supplied inside the
wrapper from `siteConfig` / niche literals.

## Props passed, and why (all explicit, nothing left to kit default)

| Prop | Value | Why |
|---|---|---|
| `nav` | `siteConfig.nav` (= `niche.navigation`, 5 items: Services, IR35 Status, Who we help, Blog, Contact) cast to kit `NavItem[]` | Same shape (`{label, href}`, no `children`/`groups`), same source as pre-port. No IA change in this package — §5 of the brief is phase-2/owner-gated, not adopted here. |
| `ctaPrimary` | `{ label: "Book a free call", href: "/contact" }` | Same label/target as the pre-port header and drawer CTA (verbatim, both were "Book a free call" → `/contact`). |
| `ctaContactGoal` | `"contact"` | **Passed explicitly, never left to kit default `"form"`.** Verified `grep -rhoE 'data-cta-goal="[^"]*"' src` = 0 hits pre-port, so there is no existing header goal to preserve — this is a **new** series, not a restore. Chose `"contact"` (matches the goal generalist and other sibling ports use for a `/contact`-bound CTA) rather than accept Property's `"form"` by accident. |
| `ctaMobilePlacement` | `"header_mobile"` | **Passed explicitly**, never left to kit default `"mobile_menu"`. Verified `grep -rhoE 'data-cta-placement="[^"]*"' src` = 1 hit, `"sticky"` (belongs to `StickyCTA`, a different package/lease). Zero pre-port header placement value exists, so `"header_mobile"` is a deliberate choice for the new series, matching the sibling convention, not a Property-default inherit. |
| `wordmarkAccentColor` | `"#0e7490"` | **Mandatory, passed explicitly.** Kit default is `primary-600` = cyan-600 `#0891b2`, measured 3.68:1 both as text-on-white and as a ground-under-white-label (fails 4.5:1 both ways — see DESIGN_DELTA.md §2 measured table). This site's live brand hex `#0e7490` is cyan-700 exactly, measuring 5.36:1 in both roles. Unset, the header would ship the wordmark in a colour that both fails contrast and visibly mismatches the CTA button next to it — the exact defect DESIGN_DELTA.md names as already shipped once (Solicitors). |
| `wordmarkIcon` | `FileBadge` (lucide-react, already a dependency, `^1.7.0`) | DESIGN_DELTA.md §1 proposal: "a contract with a mark on it" — this site sells IR35 status determination, literally a contract review. Confirmed `FileBadge` exists in the installed lucide-react package (`node -e "require('lucide-react')"` check). Fallback `Briefcase` also confirmed present, not used since `FileBadge` resolved. |
| `wordmarkTop` | `"CONTRACTOR TAX"` | DESIGN_DELTA.md §1 literal proposal. |
| `wordmarkBottom` | `"ACCOUNTANTS · IR35 SPECIALISTS"` | DESIGN_DELTA.md §1 literal proposal. |
| `ctaIds` | not passed (kit default: `header_book` / `header_book_mobile` / `header_contact`) | No pre-port `data-cta` id to preserve either (0 hits), so there is no collision risk in accepting the kit's own id strings — unlike `ctaContactGoal`/`ctaMobilePlacement`, the id itself is not a segmentation value this site already reports under a different name. `ctaSecondary` is not passed (this site has one CTA, not two), so `header_contact` is never emitted. |
| `fallbackNav`, `ctaSecondary`, `ctaVariant` | omitted | No second CTA on this site; no `niche.cta.variant` field consumed by the pre-port header. |

## Breakpoint contract (brief point 4 / DESIGN_SYSTEM.md §7a)

| Control | Before (local markup) | After (kit) | DESIGN_SYSTEM §7a target |
|---|---|---|---|
| Desktop nav | `md:flex` (768px) | `lg:flex` (1024px) | `lg:` |
| Primary CTA (bar) | `sm:inline-flex` (640px) | `lg:inline-flex` (1024px) | `lg:` |
| Burger button | `md:hidden` (768px) | `lg:hidden` (1024px) | `lg:` |
| Drawer overlay | `md:hidden` (768px) | `lg:hidden` (1024px) | `lg:` |

Before: nav/burger/drawer agreed at `md` (768px) but the CTA broke off at `sm`
(640px), producing the 640–767px dead zone named in `P0D_CSS_A11Y.md` (CTA and
burger both visible, competing for the bar). After: all four controls sit at the
kit's `lg:` (1024px), matching §7a's table exactly (`below lg: wordmark + burger`,
`lg: and up: wordmark + nav + CTA, no burger`). This is the component doing its own
half of the fix; P1-7 (globals.css, wave 2) is the CSS-side half and is a separate
lease.

Note P1-7's own analytics consequence applies here identically to how §7a's
2026-08-23 incident note describes it: `header_book` volume that used to fire from
640px up (in the old local header) now fires only from 1024px up; 640–1023px volume
moves to `header_book_mobile`. Recorded here so it is not read as a phantom
regression later — though as established above, this site had **no pre-port
`header_book` series at all**, so there is no "before" total to compare against;
this is the first day either row exists.

## New `data-cta` ids introduced (site-wide count will rise above the 219 baseline — expected, per PHASE_PLAN §B.3)

- `data-cta="header_book"` — desktop bar, `data-cta-placement="header"`, `data-cta-goal="contact"`
- `data-cta="header_book_mobile"` — drawer, `data-cta-placement="header_mobile"`, `data-cta-goal="contact"`

`header_contact` (secondary) is NOT introduced — `ctaSecondary` is not passed.

## Contrast (hand-computed, WCAG relative luminance, sRGB→linear, `(L1+0.05)/(L2+0.05)`)

CTA label: white `#ffffff` text on `--brand-primary` ground `#0e7490` (kit's `btnPrimary`
resolves to `bg-primary-600`, i.e. this site's bound `primary` token, cyan-700, per
DESIGN_DELTA.md §1's binding). This reproduces the delta's own published row exactly:
**5.36:1**, passes the 4.5:1 floor for a button ground. Source: DESIGN_DELTA.md §2 measured
table row "cyan-700 `#0e7490` | ground under white label | 5.36 | PASS" — not independently
re-derived here since the same two colours (`#ffffff` on `#0e7490`) are involved; re-deriving
would just reproduce the delta's own script (`c.py`), which already self-tests against
published anchors.

Wordmark: icon + rule now render at `#0e7490` (explicit `wordmarkAccentColor`) against the
header's white ground (`bg-white` in the kit header, not this site's old `#fafaf7`/95 — see
below), measuring 5.36:1, same figure, PASS.

## Brief items that were wrong, or needed correction against source

1. **Point 4's "burger and drawer already agree at `md`" framing** is right about the
   *old local header*, but the fix target is `lg:` (1024px), not `md:` — confirmed by
   reading the kit component directly (`nav`/CTA/burger/drawer all `lg:*`, lines
   391–493 of `packages/web-shared/design/chrome/SiteHeader.tsx`) and by
   DESIGN_SYSTEM.md §7a's own table, which names `lg:` explicitly, not `md:`. The brief
   never states a wrong target breakpoint itself (it says "diff all four values", which
   is what's tabulated above), so nothing to correct there — flagging only because it's
   easy to misread "agree at md" as the fix target rather than the pre-port state.
2. **Header ground colour changes as a side effect, not stated in the brief**: the old
   local header was `bg-[#fafaf7]/95 backdrop-blur`, matching this site's warm-cream
   `--surface`. The kit header is `bg-white shadow-sm`, no blur. This is Property's
   `SiteHeader` recipe verbatim (`packages/web-shared` is AS-IS per T4/appendix B, not
   mine to fork), so it is correct port behaviour, but it IS a visible change beyond
   what the brief's five numbered points named. Flagging per "if adopting the kit header
   changes what the nav renders, say exactly what changed" (brief point 5's instruction,
   applied here to chrome ground rather than nav items).
3. Everything else in the brief (props list, contrast numbers, breakpoint dead-zone
   diagnosis, nav-coverage instruction) checked out against source exactly as stated.

## Verification list for the coordinator's serialised build

Run against `next start` on a port other than 3611 (which must keep serving the
pre-port baseline). Suggested: `PORT=3612 npx next start` from
`contractors-ir35/web`, read the bound port from the log line
(`- Local: http://localhost:XXXX`) before trusting anything below.

1. **Page loads at all**: `curl -s http://localhost:<port>/ | grep -o "<title>[^<]*</title>"` —
   expect a real `<title>` (not an error page), confirms the build is serving this
   site, not a stale/adjacent one.
2. **Wordmark text present and colour applied**:
   `curl -s http://localhost:<port>/ | grep -o 'CONTRACTOR TAX'` — expect 1+ hits.
   Then in a real browser (or `read_page`/DOM inspection) confirm the icon `<svg>` and
   the rule `<span>` under "CONTRACTOR TAX" both compute `color`/`background-color:
   rgb(14, 116, 144)` (`#0e7490`), not the kit's default `primary-600` teal.
3. **Two new `data-cta` ids exist and carry the right values**:
   `curl -s http://localhost:<port>/ | grep -o 'data-cta="header_book"[^>]*'` and
   `grep -o 'data-cta-goal="[^"]*"'` on that same line — expect
   `data-cta-goal="contact"` and `data-cta-placement="header"` on the desktop button.
   The drawer's `header_book_mobile` only renders client-side on open, so check it via
   a headless click (`computer`/`javascript_tool`), not `curl`: expect
   `data-cta-placement="header_mobile"` there.
4. **Breakpoint agreement, resized viewport** (768px, 1023px, 1024px, 1280px):
   at 768 and 1023 the bar shows wordmark + burger only, no visible CTA, no visible
   nav links; at 1024 the burger disappears and nav + CTA both appear together, in
   the same frame. This is the P0D dead-zone fix; a screenshot at 1000px showing
   simultaneous CTA-and-burger would mean the kit's `lg:` classes did not take effect
   (e.g. a Tailwind content-scan miss on the workspace package).
5. **Nav renders the same 5 links, no more, no fewer**: `curl -s
   http://localhost:<port>/ | grep -oE 'href="/(services|ir35-status|for|blog|contact)"'`
   — expect all 5, and no `/calculators`, `/glossary`, `/locations`, `/research` or
   `/resources` link newly appearing in the header (those are out of this package's
   scope; their absence should be unchanged, not newly introduced by this edit).
6. **Contrast, measured not assumed**: run the estate's own contrast tool (or
   `browser_check.mjs`, noted in DESIGN_DELTA.md §2 as unable to resolve `var()` chains
   but able to resolve a literal hex, which `wordmarkAccentColor` now is) against the
   rendered wordmark and the CTA button; expect ≥4.5:1 on both, target 5.36:1.
7. **No accidental import breakage**: `grep -rn "BrandWordmarkHomeLink" src/components/layout/SiteHeader.tsx`
   should return nothing (the wrapper no longer imports it) — confirms no dead import
   left behind; already true in the current source.
