# P1-4 -- PageShell adoption

File lease: `contractors-ir35/web/src/components/layout/PageShell.tsx` (only file touched).

## 1. Mounted surfaces, derived from imports/call sites, not from the brief's count

**Before (git blob, same file), 4 global mounts, all present, one edit only touches `#main`'s className:**

| Surface | Mount site | Line |
|---|---|---|
| `SiteHeader` | `PageShell.tsx` | 20 |
| `SiteFooter` | `PageShell.tsx` | 24 |
| `StickyCTA` | `PageShell.tsx` | 25 |
| `SpecialistWidget` | `PageShell.tsx` | 26 |

Root layout (`src/app/layout.tsx:97`) mounts `<PageShell>{children}</PageShell>` once, inside `IntentProvider`, and that's the only place `PageShell` is called. `ReturningBar` and `DeepScrollModal` sit as siblings of `PageShell` in `layout.tsx` (lines 98-99), not inside it and not touched by this package -- they are not part of this file's mount set, named here only so the brief's "the two root-layout surfaces" phrase is checked against source: those two ARE the root-layout surfaces, and they are unchanged, untouched, outside my lease.

Confirmed dead per the brief's own worked example: `blog/ExitIntentModal.tsx` has a comment referencing `SpecialistWidget` (line 72) but grepping for its own import/JSX call site (`grep -rn "ExitIntentModal" src`) returns zero mounts anywhere -- consistent with the brief, not re-litigated here since it's outside PageShell.

**After: identical 4, identical mount sites, identical line numbers (20/24/25/26).** No surface added, none removed, none moved.

## 2. Why there is (almost) no diff

The kit `PageShell` (`packages/web-shared/design/chrome/PageShell.tsx`, read-only) is a client component (`"use client"`, uses `usePathname`) that takes typed `nav`/`header`/`footer` props and forwards them to the kit's own `SiteHeader`/`SiteFooter`. It does **not** mount `StickyCTA` or `SpecialistWidget` at all -- neither exists anywhere in that file. Importing it as-is would silently drop both capture surfaces (rule 1 violation) and would also require this site's call site (`layout.tsx:97`, `<PageShell>{children}</PageShell>`, zero props) to start threading `nav`/`header`/`footer` -- a call-site change nothing in this wave asked for.

That import was never made. Wave 1 already did the real adoption work one layer down: P1-2 and P1-3 turned this site's own `SiteHeader`/`SiteFooter` into zero-prop wrappers around the kit components (`src/components/layout/SiteHeader.tsx`, `SiteFooter.tsx`), each baking its own props from `siteConfig`/niche literals so the existing `<SiteHeader />` / `<SiteFooter />` call sites in `PageShell.tsx` keep compiling untouched -- P1-2's own comment says so explicitly ("PageShell keeps calling `<SiteHeader />` with no props ... P1-4 owns PageShell and has not landed yet"). So by the time this package ran, `PageShell.tsx` was already composing the kit chrome; there was no header/footer markup left in this file to port.

Comparing this file's markup against the kit shell's own wrapper `<div>`/skip-link/`<main>` structure line for line: `flex min-h-dvh min-w-0 flex-col overflow-x-clip bg-white` -- identical. Skip-link mechanics (`sr-only focus:not-sr-only focus:absolute ...`) -- identical except the focus ground colour, which the kit hardcodes to `primary-600` (this site's failing 3.68:1 step per `DESIGN_DELTA.md` §2) and this file already had bound to `cyan-700` (5.36:1, the correct step per the delta's binding-step rule) before this package touched it. No colour change made -- it was already correct.

**Net edit: one Tailwind class added to `<main id="main">`, described in §4. Nothing else changed.**

## 3. Inherited visual changes

None from this file. The page ground (`bg-white`), skip-link mechanics, and structural wrapper were already identical to the kit shell before this edit (inherited in substance at P1-2/P1-3 time when the header/footer swapped their own grounds -- see `P1-2_HEADER.md` item 2, header ground `#fafaf7`/95-blur -> `bg-white`, already reported there, not re-reported as new here). This package introduces zero additional visual change beyond the `#main` scroll offset (accessibility, not visual).

Max width: the kit shell sets none at the shell level (container widths are owned by header/footer/page-body components individually, e.g. `siteContainerXl` inside `SiteHeader`), matching this file's pre-existing behaviour of setting no max width either. No change, no delta to report.

## 4. `#main` and scroll offset -- FIXED here, in lease

`P0D_CSS_A11Y.md` §5: 0 of 6 anchor-target route families carry `scroll-mt-*`, `#main` (the global PageShell target) among them, because the header is `sticky` (`packages/web-shared/design/chrome/SiteHeader.tsx:385`, `sticky top-0 z-40`) and nothing offsets the jump target underneath it.

This file owns `#main` (`<main id="main">`, line 21), so the fix landed here rather than being punted to the `globals.css` agent (P1-7): added `scroll-mt-24` (6rem) to that element. Header height is `min-h-16` (4rem) at `sm:` and up plus `py-3` (1.5rem total) plus a 1px border, and `min-h-[3.25rem]` (3.25rem) plus the same padding below `sm:`; `scroll-mt-24` clears the taller (`sm:`+) case with a small margin and comfortably clears the smaller mobile case. This closes the global-mount slice of the P0D gap (1 of 6 route families -- the other 5, the research/services/calculators in-page anchors, are page-level `id=` targets outside this file and outside this package's lease; not fixed here, still open).

**Verdict: fixed at shell level, in-lease, no `globals.css` edit.** Nothing reported to the P1-7 agent as a dependency -- this fix does not touch `globals.css` and does not conflict with anything a CSS-only agent would do to the same selector.

## 5. Kit hazards checked

- `FaqSection` (Radix, no `forceMount`): not imported anywhere in this file, and `PageShell` has no FAQ-rendering responsibility at all -- not applicable to this file, correctly not pulled in.
- Embed-chrome bypass: the kit `PageShell` special-cases `pathname?.startsWith("/embed/")` to render `<>{children}</>` with no header/footer at all (for iframe-embedded widgets). This site HAS `/embed` routes (`src/app/embed/page.tsx`, `src/app/embed/[slug]/page.tsx`) and currently has NO such bypass -- every embed page renders with full site chrome (header, footer, sticky CTA, specialist widget) today. Deliberately NOT adopted: doing so would (a) require `usePathname` and a `"use client"` conversion of this file, a component-type change nothing in this wave asked for, and (b) strip the footer's ~15 links from every `/embed/[slug]` page, which is exactly the kind of link-floor-affecting change the brief says needs an explicit owner yes, not a name-matched port of kit behaviour. Flagged here as an open question for the owner/next package, not actioned.

## 6. Link floor

`sweep_baseline.json`: 157 URLs, 2755 internal links. This file renders on every route (it's the sole `PageShell` mount, from root `layout.tsx`), so a link lost here is lost site-wide -- but this edit touches no `<a>` element and no nav/footer wiring at all; it only adds a Tailwind utility class to `<main>`. **Link count effect: zero, provably** -- there is no anchor tag anywhere in the diff.

## 7. Brief items checked against source

1. Brief's four named mounts (`StickyCTA`, `SpecialistWidget`, "two root-layout surfaces") -- confirmed correct: the two root-layout surfaces are `ReturningBar` and `DeepScrollModal`, both siblings of `PageShell` in `layout.tsx`, not inside it. Everything the brief named is accounted for.
2. Point 4 ("look for the equivalent [ground/max-width/rhythm] change at shell level"): checked, found none beyond what P1-2/P1-3 already reported (header ground swap, reported there not here) -- see §3.
3. Nothing in the brief was factually wrong. One gap: the brief's framing implies a bigger adoption job ("adopt the kit `PageShell`") than what remained to do once P1-2/P1-3 already collapsed the header/footer into zero-prop wrappers -- worth the coordinator knowing the wave-1 sequencing left this package with a near-empty diff, not a missed instruction.

## Verification list for the coordinator's serialised build

Run against `next start` (never `next dev`), a port other than 3611, kill the server after.

1. `curl -s http://localhost:<port>/ | grep -o "<title>[^<]*</title>"` -- expect the real Contractor Tax Accountants title, confirming this is the right build before trusting anything below.
2. `curl -s http://localhost:<port>/ | grep -o 'scroll-mt-24'` -- expect 1+ hits (confirms the class made it into the server HTML on `<main id="main">`).
3. In a real browser: click the skip link ("Skip to content") on any page, or jump to any in-page `id=` anchor target that sits inside `<main>`. Expect the target heading to land clear of the sticky header, not hidden underneath it -- this is the actual behavioural proof, `curl` only proves the class shipped, not that it renders correctly against the sticky header's real height. UNVERIFIED until a browser check is run.
4. `curl -s http://localhost:<port>/ | grep -oE '<footer|StickyCTA|specialist'` style checks are redundant with P1-2/P1-3/P1-5's own verification lists (unchanged mounts) -- not re-run here; rely on those receipts for header/footer/sticky-specific checks.
5. Visit `/embed` and `/embed/<a-real-slug>`: confirm BOTH still render full site chrome (header, footer, sticky CTA, specialist widget) exactly as before this package -- since no embed bypass was added, this should be unchanged from pre-port behaviour. If either page renders chrome-free, something outside this diff changed it; investigate before shipping.
6. Resize to 390px and 1440px on any page: confirm no new horizontal scroll was introduced (this edit adds no width-affecting class, but confirm as a matter of course since it touches the shell).

## Receipt

- Mounts before: `SiteHeader`, `SiteFooter`, `StickyCTA`, `SpecialistWidget` (all in `PageShell.tsx`, lines 20/24/25/26).
- Mounts after: identical, same 4, same lines. Root-layout surfaces (`ReturningBar`, `DeepScrollModal`) confirmed as siblings, not inside `PageShell`, unchanged.
- Inherited visual changes from this file: none new (page ground / skip-link colour / structure already matched the kit shell before this package, via P1-2/P1-3's earlier work).
- `#main` verdict: FIXED in this file, `scroll-mt-24` added, no `globals.css` touch, no dependency on P1-7.
- Link floor: unaffected, zero anchor tags in the diff.
- Kit hazard found and deliberately NOT adopted: the kit shell's `/embed/` chrome-free bypass. Flagging for the owner/coordinator as an open question, not actioned.
- Brief accuracy: correct throughout; the only note is that wave-1 sequencing (P1-2/P1-3 already wrapping the kit header/footer as zero-prop components) left this package with a near-empty diff rather than a full shell replacement.
