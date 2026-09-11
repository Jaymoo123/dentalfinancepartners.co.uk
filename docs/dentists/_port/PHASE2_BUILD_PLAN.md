# DENTISTS PORT — PHASE 2 BUILD PLAN: CHROME ADOPTION

Site: `Dentists/web`. Kit: `packages/web-shared/design/chrome/`.
Written 2026-09-11 against the working tree as it stands, not against any commit diff.
Read-only survey; nothing built by this plan's author.

**Predecessors, already landed. Do not redo them.**
- Phase 0 survey: `docs/dentists/_port/DISPOSITION_SLICE1.md` §A (re-verified below).
- Phase 1 brand layer: commit `f1197d7a`, plus the gap-fix that a sibling's repo-wide
  `git add` swept into `f75438bf` (field notes §8). Working tree for `Dentists/` is clean.
- Brand contract: `docs/dentists/DESIGN_DELTA.md`, owner decisions in §4, all four TAKEN.

**Three premises in the phase-2 brief are out of date. Corrections, in full, in §9.**
The headline one: `showBuilderCredit` is NOT an open owner gate. The owner ruled on
2026-09-11 (commit `6966c1f1`) that the Double Wired Creative credit appears estate-wide.
Pass nothing; the kit default `true` is now correct. Do not pass `false`.

---

## 1. REALITY CHECK, per surface

What phase 1 already did, so nobody rebuilds it:

| Surface | State after phase 1 | Phase 2 work |
|---|---|---|
| `primary-*` ramp | **DONE.** Navy ramp written into `Dentists/web/src/app/globals.css:152-162`, `primary-900 = #001b3d` exactly. Kit `primary-*` classes render correctly today. | none |
| `btnPrimary` / `btnSecondary` / `focusRing` | **DONE.** `Dentists/web/src/components/ui/layout-utils.ts` is a kit re-export plus a `dentalRing()` string swap (`:35-39`) and a local `focusRing` on `primary-400` (`:48-49`). | none, but see the trap in §4 WP2 |
| `btnGold` | **DONE.** `layout-utils.ts:55-56`, gold ground, navy label, 6.23. | Phase 2 uses it nowhere. Chrome is white-ground and dark-ground-footer only. See §4 WP2 note. |
| Warning ladder D-W1 | **DONE** (tokens). Chrome renders no warning colour. | none |
| Font transitional no-op | **DONE.** `--font-serif` maps to the surviving family. | Phase 2 deletes `font-serif` classes only in files it owns, which is none. |
| Wordmark lockup | Local `BrandWordmarkHomeLink.tsx` is already the two-line typographic lockup the standard wants. It does **not** export `WORDMARK_TOP` / `WORDMARK_BOTTOM`. | WP1 adds the exports; WP2 retires the component. |
| Wordmark icon | **Does not exist.** Dentists has never had one. | WP1 builds a local inline SVG. |
| Backdrop motif | `.hero-brand` + `::before` + `::after` exist at `globals.css:193-222` as CSS only. No component. | WP3 wraps it as a component. |
| `/embed/` chrome bypass | **Still a live defect.** `PageShell.tsx` has no bypass; 13 `/embed/[slug]` widgets ship full chrome inside partner iframes. | fixed for free by WP2 (kit shell bypasses at `chrome/PageShell.tsx:29-31`). |
| Header secondary CTA | Markup exists but **renders nothing**: the live `leadgen` variant defines only `header_primary` (`Dentists/niche.config.json:180-184`). | WP2 still passes `ctaSecondary`; it stays undefined and nothing renders. |

---

## 2. THE SMALLEST EDIT POINT

Chrome renders on all 309 routes from **one mount**: `app/layout.tsx:97` renders
`<PageShell>{children}</PageShell>`, and `PageShell.tsx:21-26` renders `SiteHeader`,
`SiteFooter` and `StickyCTA`.

The whole phase touches **8 files**, 3 of them new, 3 of them deletions:

```
NEW      Dentists/web/src/components/brand/DentalMark.tsx          (inline SVG icon)
NEW      Dentists/web/src/lib/nav.ts                               (server-side nav derivation)
NEW      Dentists/web/src/components/layout/DentistsBackdrop.tsx   (from .hero-brand)
NEW      Dentists/web/src/components/layout/SisterSites.tsx        (local carve-out)
EDIT     Dentists/web/src/components/brand/BrandWordmarkHomeLink.tsx  (add 2 exports)
REWRITE  Dentists/web/src/components/layout/PageShell.tsx          (29 lines -> kit wiring)
EDIT     Dentists/web/src/app/layout.tsx                           (2 lines: import + nav prop)
EDIT     Dentists/web/src/app/page.tsx                             (1 line: mount StickyCTA)
DELETE   Dentists/web/src/components/layout/SiteHeader.tsx         (208 lines)
DELETE   Dentists/web/src/components/layout/SiteFooter.tsx         (75 lines)
DELETE   Dentists/web/src/components/brand/BrandWordmarkHomeLink.tsx (after WP2 lands; see WP2)
```

Nothing else. No page file is touched. Do **not** propose a sweep across 309 routes.

---

## 3. LOCKED VALUES — copy these verbatim into the code

```tsx
ctaContactGoal: "contact",          // kit default is "form". Playbook T22.
ctaMobilePlacement: "header_mobile", // kit default is "mobile_menu". Playbook T22.
ctaIds: {
  primary: "header-nav-cta",        // hyphens
  mobilePrimary: "header-mobile-cta", // hyphens
  secondary: "header_nav_secondary",  // underscores
},
```

The hyphen-vs-underscore mix is Dentists' own live `vw_cta_performance` segmentation.
**Do not tidy it.** Verified in the current source at
`Dentists/web/src/components/layout/SiteHeader.tsx:104`, `:185`, `:95`.

`showBuilderCredit`: **pass nothing.** Owner decision 2026-09-11, commit `6966c1f1`,
recorded in playbook §8 item 11 and in `PORT_FIELD_NOTES.md` §2 (the old `false` rule is
struck through there). The kit default is `true` and is now correct.

`wordmarkAccentColor`: **pass nothing.** This prop (added `6966c1f1`) defaults to the
`primary-600` ramp step, which on Dentists is navy `#2d4a6f`. Dentists' brand navy IS the
ramp (`primary-900 = #001b3d`), so there is no two-reds problem to solve. Gold is barred from
this slot: the header wordmark sits on white, where gold measures 2.75 and gold-strong 3.76,
both under the 3:1 graphics floor (DESIGN_DELTA §2).

---

## 4. WORK PACKAGES

Five packages. Each is one builder. Every package's acceptance tests include, without
exception:

```
cd Dentists/web && npx tsc --noEmit
python scripts/check_dependency_closure.py      # playbook T24, EVERY brief
```

and the concurrency discipline from field notes §8: **stage and commit as ONE command**
(`git add <explicit paths> && git commit`), then verify with
`git show --name-only --format="" HEAD | grep -c "^Dentists/"`. Never a repo-wide `git add`.
Four ports are live in this checkout. Never rewrite history.

---

### WP1 — Brand marks and nav derivation

**Files (owned exclusively):**
- NEW `Dentists/web/src/components/brand/DentalMark.tsx`
- EDIT `Dentists/web/src/components/brand/BrandWordmarkHomeLink.tsx` (add two exports only)
- NEW `Dentists/web/src/lib/nav.ts`
- NEW `Dentists/web/src/tests/design/nav-derivation.test.ts` (or the site's existing test dir)

**Reference to port from:**
- `generalist/web/src/lib/nav.ts` — the whole file, 40 lines. It is the exact shape:
  `calculatorNavGroups()` over `allTools()` + `toolPath()`, then `buildPrimaryNav()`
  delegating to the kit's `buildPrimaryNav` at
  `packages/web-shared/design/chrome/nav.ts:39-41`.
- `generalist/web/src/components/brand/BrandWordmarkHomeLink.tsx:15-16` for the
  `WORDMARK_TOP` / `WORDMARK_BOTTOM` export shape.

**Build:**

1. `DentalMark.tsx` — a local inline SVG component, no dependency. It must satisfy the kit's
   `WordmarkIcon` structural type at `packages/web-shared/design/chrome/SiteHeader.tsx:14-20`,
   which is `ComponentType<{ className?, strokeWidth?, "aria-hidden"?, style? }>`. All four
   props optional; forward all four to the `<svg>`. Use `stroke="currentColor"`,
   `fill="none"`, `viewBox="0 0 24 24"`, so `text-primary-600` / `text-primary-400` colour it
   the way lucide does on the siblings.

   **DO NOT ADD `lucide-react`.** It is undeclared in `Dentists/web/package.json` (7 runtime
   deps: `@accounting-network/web-shared`, `gray-matter`, `next`, `react`, `react-dom`,
   `recharts`, `resend`). It resolves today only by sibling hoisting (generalist `^1.7.0`,
   Solicitors `^1.17.0`). That is the exact shape that made the estate undeployable for nine
   days (playbook T24). Phase 1 deliberately shipped no new dependency; phase 2 keeps that.

   The mark is a **placeholder pending owner sign-off at the walk.** Put that in a comment
   with the date. A simple geometric tooth or shield outline; not a literal clinical icon.

2. Add to `BrandWordmarkHomeLink.tsx`:
   ```ts
   export const WORDMARK_TOP = "Dental Finance";
   export const WORDMARK_BOTTOM = "Partners";
   ```
   Sentence case, matching the current visible text at `:27` and `:36`. The kit uppercases in
   CSS (`SiteHeader.tsx:140`, `:148`). Sentence case also gives the correct accessible name,
   `"Dental Finance Partners, home"`, rather than a shouted one. Do not change anything else
   in this file; WP2 deletes it.

3. `src/lib/nav.ts`. Server-side only by construction — it imports the tool registry, whose
   compute functions must never reach a client bundle. Three jobs:

   a. `calculatorNavGroups()` from `allTools()` / `toolPath()`
      (`Dentists/web/src/lib/tools/registry.ts:40`). Registry order, first appearance wins,
      exactly as generalist does. 13 tools across 4 categories today:
      Associate tax, Practice accounting, NHS Pension, NHS contracts.

   b. **Attach `children` to `/services` and `/dental-guides`.** This is the part generalist
      did not need and Dentists does, and it is load-bearing for the footer: the kit footer
      derives its Services and Resources columns from `nav[].children`
      (`SiteFooter.tsx:97`, `:106-107`) and **drops any column with zero items**
      (`:113`). Dentists' `niche.navigation` is entirely flat
      (`Dentists/niche.config.json:36-66`), so without this the footer renders TWO columns,
      not four.

      Hand-list the two child sets as consts in this file, each with a short nav label, each
      keeping the self-referential first child (the kit comment at `SiteFooter.tsx:94-96`
      explains why: the column headings are not links, so dropping it leaves the hub with no
      footer entry at all):
      - `/services`: "All services" -> `/services`, then the 5 sub-pages. Slugs are
        `dental-accountants`, `practice-accounting`, `associate-tax`, `practice-valuation`,
        `locum-dentist-tax` (`Dentists/web/src/app/services/[slug]/data.ts:38-507`,
        `SERVICE_SLUGS` at `:507`). The `title` fields are long SEO titles and are wrong as
        nav labels; write short ones.
      - `/dental-guides`: "All guides" -> `/dental-guides`, then the 6 guides. Slugs from
        `Dentists/web/content/dental-guides/*.md` via `getGuideSlugs()`
        (`Dentists/web/src/lib/dental-guides.ts:76`).

      ponytail: hand-listed labels, not a data-model change, because neither `ServiceSubPage`
      nor `GuideFrontmatter` carries a short nav-label field and adding one would touch 11
      content files for nothing. The guard test below is what stops it drifting.

   c. `buildPrimaryNav()` returning `NavItem[]`, calling the kit's `buildPrimaryNav` for the
      Calculators groups and merging in (b).

4. Guard test. Three assertions, all cheap:
   - every href in the `/services` children set (minus the self-referential one) is in
     `SERVICE_SLUGS`, and every `SERVICE_SLUGS` entry appears in the children set;
   - same both-ways check for `/dental-guides` against `getGuideSlugs()`;
   - `buildPrimaryNav()` returns a `/calculators` item whose `groups` flatten to exactly 13
     items, and every top-level item has a non-empty `label` and an href starting `/`.

**Acceptance tests:** the four above, plus `tsc`, plus the closure check, plus
`grep -rn "lucide" Dentists/web/src Dentists/web/package.json` returning **zero rows**.

**OFF LIMITS:** `components/layout/*` (WP2, WP3, WP4), `app/layout.tsx` (WP2),
`app/page.tsx` (WP2), `app/globals.css` (WP3), anything under `packages/`, anything outside
`Dentists/`.

---

### WP2 — The shell swap (the phase's only risky package)

**Depends on WP1, WP3 and WP4 being merged first.** It imports all three.

**Files (owned exclusively):**
- REWRITE `Dentists/web/src/components/layout/PageShell.tsx`
- EDIT `Dentists/web/src/app/layout.tsx` (two lines)
- EDIT `Dentists/web/src/app/page.tsx` (one line)
- DELETE `Dentists/web/src/components/layout/SiteHeader.tsx`
- DELETE `Dentists/web/src/components/layout/SiteFooter.tsx`
- DELETE `Dentists/web/src/components/brand/BrandWordmarkHomeLink.tsx`

**Reference to port from — read these files as they are NOW:**
- `generalist/web/src/components/layout/PageShell.tsx`, 104 lines. The canonical shape:
  `"use client"` (`:1`), `const activeCta = getActiveCta(niche)` (`:15`), the `header={{...}}`
  block (`:34-58`), the `footer={{...}}` block (`:59-99`).
- `Solicitors/web/src/components/layout/PageShell.tsx`, 118 lines. Read it for two things
  Dentists also needs: the shared `wordmark` const (`:19-30`) so header and footer cannot
  drift, and the site-wide `StickyCTA` re-mount reasoning (`:106-116`) — which Dentists
  **rejects**, see step 4.
- `generalist/web/src/app/layout.tsx:5-6`, `:120` for the nav wiring.

**Build:**

1. `PageShell.tsx` becomes `"use client"` per-site wiring only, no chrome markup. Signature
   `({ children, nav }: { children: ReactNode; nav?: NavItem[] })`, rendering
   `<KitPageShell nav={nav} header={{...}} footer={{...}}>`.

   Header props, complete:
   ```tsx
   ctaPrimary: activeCta.header_primary,
   ctaSecondary: activeCta.header_secondary,   // undefined under the live leadgen variant
   ctaVariant: niche.cta.variant,
   ctaIds: { primary: "header-nav-cta", mobilePrimary: "header-mobile-cta",
             secondary: "header_nav_secondary" },
   ctaContactGoal: "contact",
   ctaMobilePlacement: "header_mobile",
   wordmarkIcon: DentalMark,
   wordmarkTop: WORDMARK_TOP,
   wordmarkBottom: WORDMARK_BOTTOM,
   ```
   No `wordmarkAccentColor`. See §3.

   Footer props, complete:
   ```tsx
   description: siteConfig.description,
   footerLinks: <the 4 niche footer_links MINUS /locations>,  // see §5
   legalDisclosure: `${siteConfig.company.legalDisclosure} Website: ${siteConfig.domain}.`,
   legalName: siteConfig.company.legalName,
   tradingName: siteConfig.company.tradingName,
   wordmarkIcon: DentalMark, wordmarkTop: WORDMARK_TOP, wordmarkBottom: WORDMARK_BOTTOM,
   backdrop: <DentistsBackdrop tone="navy" />,
   consentToggle: <ConsentToggle className="inline-block py-1 text-xs text-slate-400 underline hover:text-white hover:no-underline" />,
   resourcesHref: "/dental-guides",
   companyItems: [ {About,/about}, {Contact,/contact}, {Locations,/locations},
                   {Research,/research} ],
   newsletterSlot: <SisterSites />,
   // showBuilderCredit deliberately omitted: kit default true, owner decision 2026-09-11.
   ```
   The `legalDisclosure` fold-in is the Solicitors pattern (`:79`): the old Dentists footer
   printed the domain under the copyright line (`SiteFooter.tsx:62`) and the kit footer has
   no domain slot, so it folds in rather than being dropped.

   `companyItems` MUST be passed. The kit default
   (`SiteFooter.tsx:81-86`) includes `/book`, which on Dentists is
   `robots: noindex,nofollow` and must never be a public footer destination. `/research` takes
   its place: it is a real hub with 4 children and no other chrome presence.

2. `app/layout.tsx`: add `import { buildPrimaryNav } from "@/lib/nav";` and change `:97` to
   `<PageShell nav={buildPrimaryNav()}>{children}</PageShell>`. Change **nothing else in this
   file.** `ConsentProvider`, `AnalyticsProvider` (`storagePrefix="dfp"` FROZEN),
   `ConsentedScripts`, `IntentProvider`, `ReturningBar`, `DeepScrollModal`, `SpecialistWidget`
   all stay exactly as they are, same order, same triggers, same timing, same audience
   (standard terms §7).

3. Do **not** use the kit's `fallbackNav`. It is the unfiltered, group-less list; taking it
   would silently drop the Calculators groups and 13 links. Solicitors records the same
   decision at `PageShell.tsx:38-42`.

4. `StickyCTA` moves off the shell. The kit shell mounts none. Mount it in
   `Dentists/web/src/app/page.tsx` only, matching Property and generalist.
   **This is a deliberate cadence narrowing and it needs to be called out in the receipt**,
   because Solicitors made the opposite call (`PageShell.tsx:106-116`) on the grounds that
   narrowing a capture surface mid-port makes the before/after conversion unreadable. The
   recommendation here is still homepage-only, for one reason: Dentists' `StickyCTA` is
   intent-personalised and the site already carries three other interruptive surfaces
   (`ReturningBar`, `DeepScrollModal`, `SpecialistWidget`), all of which stay. **If the
   builder is not comfortable making that call, mount it site-wide as Solicitors did and put
   it to the owner at the walk. Do not silently drop it.** Its own guard already suppresses
   `/admin`, `/embed` and packages-mode `/pricing` (`StickyCTA.tsx:91-93`), so the
   chrome-free embed routes stay chrome-free either way.

5. Delete the three retired files last, in the same commit, after the build is green.

**Two traps specific to this package:**

- **The kit header does not use Dentists' `btnPrimary`.** `chrome/SiteHeader.tsx:7` imports
  `btnPrimary` from the KIT's `../layout-utils`, so the `dentalRing()` swap in
  `Dentists/web/src/components/ui/layout-utils.ts:35-39` never reaches the header CTA. The
  header ring will be `outline-primary-600` (`#2d4a6f`). That is acceptable *only* because
  the header is a white ground, where `#2d4a6f` clears the 3:1 floor comfortably. It would
  NOT be acceptable on a navy ground. Verify the rendered ring on the header at the walk; do
  not "fix" it by editing the kit.
- **`btnGold` appears nowhere in chrome.** Dark-ground primary CTAs use `btnGold` (navy label
  on gold, 6.23); light-ground use navy `btnPrimary` (17.15). The header CTA is light-ground,
  so `btnPrimary` is correct. The footer renders no button. Phase 1 learned this the hard way:
  navy-on-navy measured 1.00 and made the hero CTA invisible.

**Acceptance tests:**
- `cd Dentists/web && npm run build` — a real production build, not just `tsc`. Page count
  must be **321 static pages, exit 0**, identical to the phase-1 verified figure. Only a real
  build catches a server/client boundary error (field notes §3).
- Full test suite green (phase 1 baseline: 434/434).
- `curl` or fetch the built `/embed/<any-slug>` and assert **no `<header`, no `<footer`** in
  the HTML. This is the live defect the port fixes.
- Link floor, full sweep, per §6.
- `data-cta` diff per §6, **including the drawer**, read out of the shipped client bundle.
- Closure check.

**OFF LIMITS:** `src/lib/nav.ts` and `components/brand/DentalMark.tsx` (WP1 — consume, do not
edit), `components/layout/DentistsBackdrop.tsx` (WP3), `components/layout/SisterSites.tsx`
(WP4), `app/globals.css` (WP3), `components/ui/layout-utils.ts` (phase 1, frozen),
`packages/web-shared/**` (the kit, frozen for this phase — see §8), every page file, every
other site.

---

### WP3 — `DentistsBackdrop`

**Files (owned exclusively):**
- NEW `Dentists/web/src/components/layout/DentistsBackdrop.tsx`
- EDIT `Dentists/web/src/app/globals.css` — **only** the `.hero-brand` block at `:193-222`

**Reference to port from:** `generalist/web/src/components/layout/GeneralistBackdrop.tsx` and
`Solicitors/web/src/components/layout/SolicitorsBackdrop.tsx`. Both take
`tone="navy" | "light"` and are consumed by the kit footer's `backdrop` slot
(`chrome/SiteFooter.tsx:34`, rendered at `:139` inside a `relative overflow-hidden bg-slate-900`
footer).

**Build:** Dentists' motif is `.hero-brand` — navy gradient, two radial glows (one of them
`var(--gold-soft)` at `globals.css:206`), and a 56px grid SVG. Lift it into the component as
`aria-hidden` absolutely-positioned layers. Keep `.hero-brand` itself in `globals.css` for
now: `app/page.tsx` and the five `research/*` pages still consume the class and those files
belong to later phases (T26 discipline — never leave a visible regression in the tree because
the tidy-up belongs to someone else).

**One thing to check and report, do not guess:** the kit footer ground is `bg-slate-900`
(`SiteFooter.tsx:138`), not Dentists' navy `#001b3d`. DESIGN_DELTA §3 sanctions navy as the
dark ground. Either the backdrop paints navy over the slate-900 at full opacity, or the footer
reads as slate. Measure the result; white on navy is 17.15 and white on slate-900 is 17.85, so
either passes contrast, but they are visibly different colours and the site should pick one.
Recommend: the backdrop paints navy, so the footer matches the rest of the brand.

**Acceptance tests:** `tsc`; the component renders with `tone="navy"` and `tone="light"`
without a layout shift; no `aria` regression (every layer `aria-hidden`); `.hero-brand`
still renders identically on `/` and the five `/research/*` pages (screenshot or DOM diff).

**OFF LIMITS:** every file in WP1, WP2 and WP4; every part of `globals.css` outside
`:193-222`; the `primary-*` ramp at `:152-162` (phase 1, frozen).

---

### WP4 — Sister-site block, local mirror

**Files (owned exclusively):**
- NEW `Dentists/web/src/components/layout/SisterSites.tsx`

**Reference to port from:** the block being retired, at
`Dentists/web/src/components/layout/SiteFooter.tsx:12-35` — the heading "Our Specialist
Accounting Services" and two cards linking to `accountsforlawyers.co.uk` and
`medicalaccounts.co.uk`.

**Build:** extract it verbatim in content, restyled for the kit's navy/slate-900 ground, as a
standalone component taking no props. It goes into the kit footer's `newsletterSlot`
(`chrome/SiteFooter.tsx:43`), which is the only free `ReactNode` slot — the slot is documented
as "passed already styled for the navy ground; nothing here restyles it", so the component
owns its own colours. It renders in the brand column under the description, so keep it to a
compact two-item stack rather than the current 3-column grid.

**Do NOT add a `crossSiteSlot` prop to the kit.** `newsletterSlot` already does the job; a
second slot with the same semantics is a kit edit for nothing, and the kit is frozen for this
phase (§8).

**These are external, absolute links, and that matters twice:**
1. They are **not** in the 5,537 internal-link baseline (proof in §6), so dropping them would
   not breach the link floor. SLICE1 §A.2 row 6 called them "2 unique internal-to-estate
   links"; they are internal to the *estate*, external to the *site*. Corrected in §7.
2. They are followed outbound links on every page (no `rel="nofollow"` today, only
   `noopener noreferrer`). Keep that exactly as-is. Changing `rel` on a cross-estate link is
   an SEO decision nobody has asked for.

**Owner gate:** SLICE1 §I gate 2 (keep or drop the block) is still open. **Recommend keep.**
The plain-English version is in §10.

**Acceptance tests:** `tsc`; the two hrefs are byte-identical to the retired block; `rel` and
`target` unchanged; text contrast on the navy ground measured and recorded (the current cards
use `text-white/70` on `bg-white/10` over navy — re-measure, `white/70` on a lightened navy is
the kind of thing that sits just under 4.5).

**OFF LIMITS:** every file in WP1, WP2 and WP3; `packages/web-shared/**`.

---

### WP5 — Verification and receipt

**Files owned:** `docs/dentists/STATE.md` only. **Touches no application code.**

Runs after WP2 is merged. Produces the numbers the owner walk needs:
- the link-floor sweep and its per-family deltas (§6);
- the full `data-cta` attribute diff, id AND placement AND goal, rendered against the
  pre-port rendered baseline, **including the drawer read out of the client bundle** (§6);
- build page count, test count, closure check;
- the open owner questions (§10), bundled into one message, plain English, no file paths.

**OFF LIMITS:** all application code. If WP5 finds a defect it reports it; the owning package
fixes it.

---

## 5. NAV IA

### 5.1 Header nav

| Slot | Dentists today | file:line (verified) | What the kit renders |
|---|---|---|---|
| Source | `siteConfig.nav`, read CLIENT-side | `SiteHeader.tsx:72` | `nav` prop, built server-side, registry never reaches the client |
| Items | Services, Pillar Guides, Calculators, Health Check, Blog, Contact (6, flat) | `niche.config.json:36-66` | same 6, with `/calculators` carrying 4 category groups / 13 tools, and `/services` + `/dental-guides` carrying `children` dropdowns |
| Nav visible from | `md:` (768px) | `SiteHeader.tsx:70` | `lg:` (1024px) — `chrome/SiteHeader.tsx:410` |
| Burger hidden from | `md:` | `SiteHeader.tsx:113` | `lg:` — `chrome/SiteHeader.tsx:476` |
| Primary CTA visible from | `sm:` (640px) | `SiteHeader.tsx:103` | `lg:` — `chrome/SiteHeader.tsx:469` |
| Secondary CTA | markup at `:91-100`, **never renders** (no `header_secondary` in the live `leadgen` variant) | `niche.config.json:180-184` | `xl:` only — `chrome/SiteHeader.tsx:441`. Still never renders. |
| Active state | prefix match on both levels | `SiteHeader.tsx:73`, `:163` | top-level PREFIX (`:192-194`), children EXACT (`:208-210`) |
| Container | `siteContainer` (max-w-5xl) | `SiteHeader.tsx:64` | `siteContainerXl` (max-w-7xl) — `chrome/SiteHeader.tsx:387`. The header bar gets wider. |
| Bar treatment | translucent + `backdrop-blur-xl` | `SiteHeader.tsx:58` | opaque `bg-white shadow-sm` — `chrome/SiteHeader.tsx:381`. The blur goes. |
| "Menu" eyebrow | `:147-149` | | kit keeps a `Menu` title (`chrome/SiteHeader.tsx:510-512`) but at `text-xs uppercase tracking-wider`. Not retired, restyled. |

### 5.2 Mobile drawer

| Slot | Dentists today | file:line | Kit |
|---|---|---|---|
| Trigger | `h-12 w-12 rounded-lg border`, `md:hidden` | `SiteHeader.tsx:111-120` | `rounded-xl border-2`, `lg:hidden` — `chrome/:474-483` |
| Scrim | `bg-[var(--navy)]/50 backdrop-blur-[2px]` | `:133` | `bg-slate-900/50 backdrop-blur-[2px]` — `chrome/:496` |
| Panel | `w-[min(20rem,92vw)]`, plain `border-l` | `:139` | same width, `border-l-4 border-primary-600` brand edge — `chrome/:502` |
| Items | flat, `rounded-xl` pills | `:161-179` | `border-l-4` rows, children indented under `text-[11px] uppercase` group labels — `chrome/:529-603` |
| Drawer CTA | `header-mobile-cta` / `header_mobile` | `:185` | same ids, via `ctaIds.mobilePrimary` + `ctaMobilePlacement` — `chrome/:604-616` |
| Drawer secondary | `header_mobile_secondary` | `:196` | **no slot in the kit.** Dead today anyway (never renders). Record the id as orphaned in STATE.md. |

### 5.3 Footer columns

| Dentists today | file:line | Kit will render |
|---|---|---|
| Sister-site block, 2 external cards | `SiteFooter.tsx:12-35` | no slot → **WP4 local mirror into `newsletterSlot`** |
| White tile holding the footer wordmark | `:39-41` | RETIRED. Kit renders the lockup directly on the dark ground (`chrome/SiteFooter.tsx:144-160`). |
| `siteConfig.description` | `:42` | same, brand column |
| ONE flat list of 4 `footer_links` | `:45-56`, `niche.config.json:68-87` | split: `/locations` moves into `companyItems`; the 3 legal links stay as `footerLinks` in the `border-t border-white/10` row (`chrome/:198-208`) |
| — | | **Services** column, from `nav` children of `/services` (WP1) |
| — | | **Resources** column, from `nav` children of `resourcesHref` = `/dental-guides` (WP1) |
| — | | **Calculators** column: one lead tool per category (max 5) + "All calculators" (`chrome/:103`, `:110`) |
| — | | **Company** column: About / Contact / Locations / Research (override) |
| legalDisclosure + © + domain + ConsentToggle | `:57-69` | same row; domain folds into `legalDisclosure` |

**Two kit defaults that MUST be overridden, or the footer breaks:**
- `resourcesHref` defaults to Property's `/landlord-tax` (`chrome/SiteFooter.tsx:80`). On any
  other site that href is not in the nav, `childrenOf()` returns `[]`, and the column is
  dropped by the `.filter()` at `:113`. Pass `"/dental-guides"`.
- `companyItems` defaults to Property's list including `/book` (`chrome/:81-86`). Dentists'
  `/book` is `noindex,nofollow`. Pass an explicit list.

**And one silent failure mode:** because `Dentists/niche.navigation` is flat, the Services and
Resources columns are BOTH empty until WP1 attaches `children`. The footer then renders two
columns instead of four and nobody sees an error. This is why WP1 must land before WP2.

---

## 6. THE LINK-FLOOR RISK

Chrome links appear on every page, so a chrome change is the single biggest link-floor risk in
the port.

**Baseline:** `docs/dentists/_port/sweep_baseline.json`, production SHA
`18b4f25f39cd0c4aa084e582d69a87c8a10710ac`. **283 URLs, 5,537 unique internal links, 808
`data-cta` attributes.** Any decrease in the first two is a blocker (DESIGN_DELTA §5).

Per-route-family floors, derived from that file:

| Family | Routes | min | median | max | sum |
|---|---|---|---|---|---|
| `/blog/[category]/[slug]` | 223 | **17** | 20 | 35 | 4,507 |
| static pages (`/about`, `/contact`, `/research/*`, `/for-*`, legal, …) | 15 | **11** | 14 | 15 | 202 |
| `/calculators/[slug]` | 13 | **11** | 11 | 11 | 143 |
| `/blog/[category]` (5 static + 7 derived hubs) | 12 | **20** | 30 | 50 | 385 |
| `/dental-guides/[slug]` | 6 | **14** | 14 | 14 | 84 |
| `/resources/[topic]` | 6 | **11** | 12 | 12 | 71 |
| `/locations` + 2 children | 3 | **13** | 14 | 14 | 41 |
| `/` | 1 | 13 | — | — | 13 |
| `/services` | 1 | 15 | — | — | 15 |
| `/blog` | 1 | 35 | — | — | 35 |
| `/calculators` | 1 | 24 | — | — | 24 |
| `/dental-guides` | 1 | 17 | — | — | 17 |

**The chrome is exactly 11 of those links, everywhere.** Header: `/` (wordmark), the 6 nav
items, `/contact` (CTA, a duplicate of the nav item so it adds nothing). Footer: `/` again
(duplicate), `/locations`, `/privacy-policy`, `/terms`, `/cookie-policy`. Unique total = 11.
That is confirmed by the data, not asserted: `/calculators/[slug]` and the lowest
`/resources/[topic]` both sit at **exactly 11**, meaning those pages carry zero internal links
in their own body. Their entire floor is chrome. **Break the chrome and those 19 routes go to
near zero.**

The two sister-site cards are absolute external URLs and are NOT in the 5,537.

**Expected delta after WP1 + WP2, and it is strongly positive.** New unique destinations the
kit chrome adds to every page: 13 calculator tools (header dropdown), 5 service sub-pages
(footer Services column), 6 dental guides (footer Resources column), `/about`, `/research`.
**+26 unique per route**, floors moving 11 → ~37 and 17 → ~43.

**Playbook T14, and it applies to the plus side too.** A link to a destination already in the
chrome adds ZERO unique links. So: `/contact` in the header CTA adds nothing (it is already a
nav item); the footer Calculators column's 5 category leads add nothing (they are already in
the header dropdown); `/locations` moving from `footerLinks` to `companyItems` adds nothing
and costs nothing. Do not count any of those as a gain, and do not "improve" the footer by
adding more links to destinations the header already carries.

**The sweep is a WP5 acceptance gate, not a nice-to-have.** Same instrument and same command
that produced `sweep_baseline.json` (its `sha_deriving_command` field records it). Expected
result: **0 routes below baseline.** Any single route below its baseline count is a blocker,
even if the total rises.

**`data-cta` is the second gate, and it is the one that silently breaks.** 808 attributes at
baseline. Diff the FULL attribute set, `data-cta` AND `data-cta-placement` AND
`data-cta-goal`, rendered against rendered. An id-only diff passes T22 straight through. The
drawer CTA renders only when the menu is open, so no SSR crawl and no page-source review will
ever see `header-mobile-cta` / `header_mobile` — **read the shipped client bundle.**

---

## 7. THE BREAKPOINT BAND

SLICE1's claim is **VERIFIED**, at slightly different line numbers (see §9).

| | Dentists today | Kit |
|---|---|---|
| Desktop nav appears | `md:flex` = 768px (`SiteHeader.tsx:70`) | `lg:flex` = 1024px (`chrome/:410`) |
| Burger hides | `md:hidden` = 768px (`SiteHeader.tsx:113`) | `lg:hidden` = 1024px (`chrome/:476`) |
| Primary CTA appears | `sm:inline-flex` = 640px (`SiteHeader.tsx:103`) | `lg:inline-flex` = 1024px (`chrome/:469`) |
| Secondary CTA appears | `md:inline-flex` (`SiteHeader.tsx:94`) — never renders | `xl:inline-flex` (`chrome/:441`) — still never renders |

**What changes visually:**

- **640px to 767px:** today the "Book a call" button sits in the bar alongside the burger and
  the wordmark. After the port it is gone from the bar and lives in the drawer only. This is
  the exact 08-23 incident band: a ~180px button plus a 48px burger next to a wordmark whose
  own `max-w` cap lifts to `max-w-none` at the same 640px breakpoint. Three elements fought
  for the bar and the wordmark lost. The kit comment at `chrome/SiteHeader.tsx:450-462` is the
  record of that decision.
- **768px to 1023px:** today the full 6-item nav renders and the burger is gone. After the
  port the nav is gone and the burger is back. On a 6-item nav at 768px this is a real
  improvement, but it is the most visible change in the phase and the owner should see it at
  the walk on a tablet width, not just at 390 and 1440.
- **1024px and up:** nav, primary CTA and burger-free bar, as today but wider
  (`max-w-5xl` → `max-w-7xl`) and opaque rather than blurred.

**Analytics consequence, deliberate and already precedented.** `header-nav-cta` fires from
640px today and will fire from 1024px up; tablet volume moves to the `header-mobile-cta` row
in `vw_cta_performance`. Both rows already exist, the total is unchanged, and the split gets
truer. **State this in the receipt** so the first post-deploy read does not report it as a
drop.

---

## 8. DEPENDENCIES AND SEQUENCING

```
WP1 (marks + nav)  ─┐
WP3 (backdrop)     ─┼──> WP2 (shell swap) ──> WP5 (verification)
WP4 (sister sites) ─┘
```

- **WP1, WP3 and WP4 run CONCURRENTLY.** Disjoint file sets, no shared imports, no shared
  edit points. WP3's only shared file is `globals.css` and it touches one block that no other
  package reads.
- **WP2 is SERIAL and last of the build packages.** It imports all three. It is also the only
  package that can break a live surface, so it gets the full verification suite.
- **WP5 is SERIAL after WP2.** It writes no code.
- **The kit is FROZEN for this phase.** No package edits `packages/web-shared/**`. Sibling
  ports have been editing that directory today (§9) and a fourth agent writing into it turns a
  contained port into an estate incident. If a builder finds the kit genuinely blocking, the
  answer is a local mirror (playbook T12), and the escalation goes to the manager, never to an
  edit.

---

## 9. RE-VERIFICATION, AND THREE CORRECTIONS

### 9.1 What changed in the kit chrome today

`git log --oneline -8 -- packages/web-shared/design/chrome/`:

```
6966c1f1 feat(chrome): owner decisions - studio credit estate-wide, one red in the header
0f4de663 fix(chrome): restore pre-port cta placement and goal on both kit consumers
cb041c9d fix(solicitors): phase 1 fidelity gaps - cta goal, designer credit, anchors, dead tokens
f4026125 feat(generalist): phase 2 chrome - kit header/footer/shell, typographic wordmark, nav derivation
394471eb feat(web-shared): O.6 design/chrome
```

`6966c1f1` landed **today, 10:42**, and it changes this plan in two ways:

1. **`showBuilderCredit` is settled, not open.** The owner ruled that the Double Wired
   Creative credit appears estate-wide. Both consumers now pass `true` explicitly
   (`generalist/.../PageShell.tsx:76`, `Solicitors/.../PageShell.tsx:101`); the kit default is
   `true`; the playbook note and the field-notes entry were rewritten in the same commit.
   **Dentists passes nothing and inherits `true`.**
2. **`wordmarkAccentColor` is new** and its default is `undefined` = the `primary-600` ramp
   step. Dentists does not pass it (§3).

**Prop defaults still in flux:** none that affect this plan. All five per-site props
(`ctaIds`, `ctaContactGoal`, `ctaMobilePlacement`, `wordmarkAccentColor`,
`showBuilderCredit`) default to Property's exact behaviour by the standing additive rule, and
this plan passes explicit values for every one it depends on except the two it deliberately
inherits. **But re-run the `git log` above immediately before WP2 starts.** Three sibling
ports are live in this tree.

### 9.2 SLICE1 §A claims RE-VERIFIED as TRUE

| Claim | Verified |
|---|---|
| Dentists imports nothing from `web-shared/design` in its chrome | TRUE — the local header/footer import only `@/` paths and `web-shared/lib/niche-config` |
| Kit chrome's only consumers are generalist and Solicitors | TRUE |
| Header renders in the stated order, `SiteHeader.tsx` is 208 lines | TRUE |
| `ctaIds` are `header-nav-cta` / `header-mobile-cta` / `header_nav_secondary`, mixed convention | TRUE |
| `data-cta-goal="contact"`, ternary on the `/contact` prefix | TRUE |
| `data-cta-placement="header_mobile"` on the drawer CTA | TRUE |
| Secondary CTA renders nothing under the live `leadgen` variant | TRUE — `niche.config.json` `leadgen` defines `header_primary` only |
| `header_nav_secondary` and `header_mobile_secondary` have never fired | TRUE, by the same evidence |
| Breakpoint band md/md/sm vs kit lg/lg/lg | TRUE (§7) |
| Nav read client-side from `siteConfig.nav` | TRUE |
| Wordmark has no icon; kit requires one | TRUE — `WordmarkIcon` is non-optional at `chrome/SiteHeader.tsx:88` |
| Wordmark accessible name is visible text + off-screen `, {tagline}`, failing WCAG 2.5.3 | TRUE — `BrandWordmarkHomeLink.tsx:38` |
| PageShell has no `/embed/` bypass; 13 embed widgets ship full chrome | TRUE |
| `StickyCTA` already self-excludes `/embed` | TRUE — `StickyCTA.tsx:91-93` |
| Kit footer `resourcesHref` defaults to `/landlord-tax` and empties the column | TRUE — `chrome/SiteFooter.tsx:80`, `:107`, `:113` |
| Kit footer default `companyItems` includes `/book` | TRUE — `chrome/SiteFooter.tsx:85` |
| Kit drawer has no secondary-link slot | TRUE |
| `lucide-react` undeclared in `Dentists/web/package.json` | TRUE — 7 deps, none of them lucide |
| Phase 1 already shipped the navy `primary-*` ramp | TRUE — `globals.css:152-162` |

### 9.3 SLICE1 §A claims found FALSE or imprecise

1. **Every line anchor in the §A adaptation table is stale, by 1 to 16 lines.** SLICE1 cites
   `:101/:169/:92/:102/:69/:110/:99/:180/:151-153`; the true values are
   `:104/:185/:95/:105/:70/:113/:103/:196/:147-149`. The *substance* of every row is correct;
   only the anchors drifted. **This plan's anchors are the true ones.** A builder following
   SLICE1's line numbers literally will edit the wrong line.
2. **SLICE1 §A.2 row 6 calls the sister-site cards "2 unique internal-to-estate links x 292
   pages" and implies a link-floor cost.** They are absolute external URLs
   (`accountsforlawyers.co.uk`, `medicalaccounts.co.uk`) and are **not** in the 5,537 internal
   baseline — proven by the `/calculators/[slug]` floor sitting at exactly 11, the count of
   internal chrome links. Dropping the block would cost zero internal links. It should still
   be kept, for the reason in §10, but not for that reason.
3. **SLICE1 §A.2 row 5 was already corrected in-place** and now reads "pass nothing, the
   default `true` is correct" — it is consistent with `6966c1f1`. It is the phase-2 *brief*
   that is stale on this point, not SLICE1. Flagging it because the brief instructed a
   recommendation of `false` and a 309-route blast-radius statement; that instruction is
   superseded by an owner decision taken the same day.
4. **SLICE1 §A.1 row 11 says the "Menu" eyebrow is RETIRED.** The kit still renders a "Menu"
   title in the drawer (`chrome/SiteHeader.tsx:510-512`). It is restyled, not retired. No
   action either way, but do not go looking for a removal that the kit does not make.
5. **SLICE1 §A.5 proposes `WORDMARK_TOP = "DENTAL FINANCE"` in capitals.** The kit uppercases
   in CSS, so capitals would produce a shouted accessible name
   (`"DENTAL FINANCE PARTNERS, home"`). Both sibling sites use sentence case. This plan
   specifies sentence case.
6. **SLICE1 §0 says 309 addressable routes; the link baseline covers 283.** Not a
   contradiction, but the 26-route gap is undocumented and a builder will trip on it. The
   missing ones are the 13 `/embed/*`, the 5 `/services/[slug]`, and `/book`, `/thank-you`,
   `/complete` and the `/admin` set. **`/services/[slug]` has no link-floor baseline at all**,
   so the sweep cannot prove those 5 routes did not regress. Accept it and note it; do not
   invent a baseline for them.

---

## 10. RISKS, AMBIGUITIES, AND OWNER QUESTIONS

### 10.1 Risks with a recommended resolution

| # | Risk | Recommended resolution |
|---|---|---|
| 1 | Footer renders 2 columns instead of 4 because the flat nav has no `children`, and nothing errors | Hard-sequence WP1 before WP2, and make "footer renders exactly 4 columns" a WP2 acceptance test |
| 2 | A sibling port edits the kit chrome mid-build and WP2 is written against a stale file | Re-run `git log --oneline -8 -- packages/web-shared/design/chrome/` immediately before WP2, and again before its commit |
| 3 | A sibling's repo-wide `git add` sweeps Dentists files into another site's commit (it happened today, `f75438bf`) | Stage and commit as ONE command; verify with `git show --name-only --format="" HEAD \| grep -c "^Dentists/"`; never rewrite history |
| 4 | The drawer `data-cta` flip passes every SSR check | Read the shipped client bundle. It is a named WP2 acceptance test, not a code review step |
| 5 | The kit header's focus ring is `primary-600`, not Dentists' `primary-400` override | Accept: the header is a white ground where `#2d4a6f` clears 3:1 easily. Verify at the walk. Do not edit the kit |
| 6 | Footer ground becomes slate-900 rather than brand navy | WP3's backdrop paints navy. Measure and report |
| 7 | Tablet users (768-1023px) lose the visible nav | Accept, it is the kit standard and a 6-item nav at 768px is cramped. Show the owner a tablet-width screenshot at the walk |
| 8 | `header-nav-cta` volume shifts to `header-mobile-cta` at the 640-1023px band | Accept and pre-announce in the receipt so the first post-deploy read is not misread as a drop |
| 9 | `StickyCTA` narrowing to the homepage is a capture-surface cadence change mid-port | Recommend homepage-only (matches Property and generalist). If the builder is unsure, ship site-wide as Solicitors did and put it to the owner. Never drop it silently |
| 10 | `/services/[slug]` has no link-floor baseline | Note it in STATE.md. Do not fabricate a baseline |
| 11 | The placeholder wordmark icon ships to the walk | Label it a placeholder in the receipt and in a code comment, and put it to the owner (§10.2 Q1) |

### 10.2 Owner questions, plain English, to be bundled into ONE message at the walk

**Q1. The header logo now needs a small picture next to the name.**
Right now the Dental Finance Partners logo is text only. The new shared header design expects
a small symbol beside it, the way the other sites have one. We have drawn a simple placeholder
so nothing is blank. Options: keep the placeholder for now and decide later; pick a different
simple symbol; or have one properly designed. **Recommendation: keep the placeholder, decide
at a later phase.** It is one file to change and costs nothing to revisit.

**Q2. The two links to our other accounting sites at the bottom of every page.**
The footer currently has a small block, "Our Specialist Accounting Services", linking to
Accounts for Lawyers and Medical Accountants. The new footer design has no built-in place for
it, so we have rebuilt it by hand to sit in the same spot. Options: keep it, or drop it.
**Recommendation: keep it.** It sends visitors between our own businesses at no cost, and
dropping it would remove something we put there on purpose.

**Q3. On tablets, the menu will look different.**
On a tablet held sideways (roughly 768 to 1023 pixels wide), the site currently shows the full
row of menu links. After this change it will show the tap-to-open menu button instead, the
same as on a phone. Every link is still reachable, just one tap away. **Recommendation:
accept.** It is the standard used across the ported sites and it stops the logo getting
squeezed. Worth a look on a tablet before we deploy.

**Q4. The "Book a call" button disappears from the bar on medium phones and small tablets.**
Between roughly 640 and 1023 pixels wide it moves inside the menu rather than sitting in the
top bar. This is deliberate: at those widths the button, the menu icon and the logo were
fighting for space and the logo lost. The button is still there, one tap in.
**Recommendation: accept.** Also worth knowing: our reporting will show some button clicks
moving from the "header" row to the "mobile menu" row. The total does not change; the split
just gets more accurate.

**Already decided, listed so nobody re-asks:** the designer credit in the footer (estate-wide,
decided 2026-09-11), the brand colours (navy for buttons and links, gold as decoration,
decided 2026-09-11), and the warning colour ladder (decided the same day).

---

## 11. WHAT THIS PLAN COULD NOT VERIFY

1. **The rendered result of anything.** This is a read-only plan; no build was run, no
   `next dev`, no browser. Every visual claim is derived from source and from the phase-1
   commit's verified figures, not observed.
2. **That the 5 `/services/[slug]` routes did not already regress**, because
   `sweep_baseline.json` has no rows for them.
3. **The live `vw_cta_performance` volumes** behind `header-nav-cta` and `header-mobile-cta`.
   The ids are verified from source; the traffic split across the 640-1023px band is asserted
   from the breakpoint change, not measured. If the owner wants the real number before the
   cutover, it is a Supabase read, not a code change.
4. **Whether any of the 13 `/embed/[slug]` widgets is actually embedded on a partner site
   today.** The chrome-in-iframe defect is real in the code; its live blast radius is unknown.
