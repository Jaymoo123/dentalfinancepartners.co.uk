# R1 — adversarial review, startups-tech design port, phase 1 (tokens + chrome)

Reviewed 2026-09-29 against the running phase-1 build on `http://localhost:3201`
(title "Founder Tax Partners | Accountants for Funded and Scaling UK Startups"),
the served CSS `/_next/static/css/feb1ead5ec9c663a.css`, the shipped client chunk
`startups-tech/web/.next/static/chunks/app/layout-20d2f0863ecbd7a0.js`, and the
working-tree source. Chromium 1223, headless, `--force-color-profile=srgb`.

## VERDICT: PASS WITH GAP-FIX

One blocker, four serious, seven minor. The blocker is one rule. Everything the
receipts claimed about tokens, nav data, landmarks, hrefs and the embed bypass is
true and measured. What the builders and the manager did not measure is the ground
their own footer paints.

---

## BLOCKER

**B1. Every focusable element in the footer rings at 2.84:1. Floor is 3:1.**
Route: all 30 routes, all widths (measured `/` and `/about` at 1280). Measured by
tab-walking the real `:focus-visible` state with a 320ms settle: **31 consecutive
tab stops**, ring `#4f46e5` (primary-600) composited on the footer ground
`#0f172b` (`bg-slate-900`) = **2.84**. Affected: the footer wordmark home link,
all 20 column links, all 9 legal links, the builder credit, and the
`ConsentToggle`. The two-valued mechanism that exists to prevent exactly this is
never applied to the footer: `.ground-dark` (`startups-tech/web/src/app/globals.css:153`)
has **zero consumers** in the whole site (`grep -rn ground-dark` = 1 hit, the
declaration). The tokens builder measured the homepage hero and missed the dark
ground phase 1 itself built.
Fix: rebind both tokens for the footer subtree — add `.ground-dark` to the kit
footer host, or declare `footer { --focus-ring: var(--focus-ring-on-brand);
--kit-focus-ring: var(--focus-ring-on-brand); }` inside `@layer components`.

---

## SERIOUS

**S2. `.ground-dark` is dead code, and the fails it was written for are live now.**
`/` at 1280, tab-walked: hero CTA "R&D tax claims" ring **1.89:1** on the
composited hero ground `rgb(53,50,93)` (`src/app/page.tsx:404-405`); the four
gov.uk stat links in the `#312e81` key-figures band (`:445`) carry **no ring
recipe at all** and fall back to the UA ring at **1.67:1**. The builder deferred
wiring the class to phase 5 and wrote the reason (`globals.css:139-143`), which is
legitimate, but phase 1 closes with the site shipping four sub-2:1 rings.
Fix: phase 5 must not close without `.ground-dark` on both sections and the four
stat links routed through `focusRing`.

**S3. The ring guard asserts something false and cannot see the real bypasses.**
`startups-tech/web/src/tests/focus-ring.test.ts:48-50` states "no .tsx here
hand-writes the ring literal — every ring is composed from the
`btnPrimary`/`focusRing` recipes". Four do, each bypassing `--focus-ring` and so
the `.ground-dark` rebind: `components/forms/BookingPicker.tsx:23`
(`focus-visible:outline-[#4f46e5]`), `components/forms/LeadForm.tsx:14`,
`components/forms/DetailsForm.tsx:19`, `components/calculators/MiniCapture.tsx:12`
(all `focus-visible:outline-[var(--brand-primary)]`). The walk is real and
guards-the-guard (5 tests pass), but it only bans `focus-visible:outline-primary-`.
Fix: ban any `focus-visible:outline-[` whose value is not `var(--focus-ring)`, and
delete the false sentence.

**S4. Phase 1 is uncommitted, and half of it is invisible to the review command.**
`git status` shows 17 modified files plus three untracked directories/files.
`PageShell.tsx`, `StartupsBackdrop.tsx`, `ConsentToggle.tsx` and
`focus-ring.test.ts` are **untracked**, so `git diff port-startups-tech-phase0 --
startups-tech/` shows none of them. There is no phase-1 commit or tag, so nothing
pins this review to a SHA.
Fix: commit and tag `port-startups-tech-phase1` before the gap-fix pass.

**S5. The mobile drawer does not trap focus, while claiming `aria-modal="true"`.**
390x844, drawer opened by clicking "Open menu": 40 Tab presses recorded. Focus is
not moved into the panel on open (it stays on the burger); after the last drawer
stop, **Tab 20 onward leaves the dialog** onto the page content behind it
(measured `in: false` on hero links "R&D tax claims", "20%", "£250k"). Escape does
close it and restores `html { overflow }` (measured `visible`), but focus is not
returned to the burger. Kit defect at
`packages/web-shared/design/chrome/SiteHeader.tsx:491-620`, shared by every ported
site, so the fix is trap 12 → owner decision, not a startups-tech edit.

---

## MINOR (7)

1. `globals.css:150-152` claims the file "has zero unlayered rules by design". A
   character-stream walk of the served CSS finds one site-authored unlayered rule:
   `.prose table` (`globals.css:14`). Deliberate and pre-existing; the sentence is
   wrong.
2. The four dropdown triggers carry `aria-haspopup="true"` with no `aria-controls`
   (kit, `SiteHeader.tsx:257`).
3. Escape closes the drawer but does not return focus to the burger (kit).
4. The drawer CTA emits no `data-cta-variant` (`ctaVariant` not passed).
   `niche.config.json` declares no `cta.variant`, so acceptable — record it.
5. All five `LeadCTAPanel` call sites pass `proofPoints={[]}`, so the one adopted
   kit marketing component renders its left column hollow. Gate row 2 =
   **1 distinct / 5 call sites**.
6. Site `btnPrimary` gained `rounded-xl min-w-[10rem] px-8 text-base font-bold`
   across 30 call sites (`components/ui/layout-utils.ts:78`). That is a visible
   shape change on every button on the site, shipped inside a "tokens" phase and
   not declared as one.
7. Out of scope but live: `/thank-you` still reads "A specialist firm from our
   partner network will contact you" (`src/app/thank-you/page.tsx:52`), against
   the 2026-09-28 estate-claims reversal.

---

## CHECKS THAT PASSED, with the number measured

| check | measured |
|---|---|
| `--color-primary-600` in served CSS | `#4f46e5` @ byte 7380 |
| button ground = 700 step | `--btn-ground:#4338ca` @ 11116; hover `#3730a3`, active `#312e81` |
| two-valued ring declared | `--focus-ring-on-light`/`-on-brand:#fff` @ 11192; `.ground-dark` @ 14382, inside `@layer components` |
| field-note §11 cascade race | NOT present: kit `btnPrimaryBase` no longer opens `inline-flex` (`layout-utils.ts:66`); `.hidden` @17679 vs `.lg\:inline-flex` @75498 |
| header CTA hide | display `none` at 390/768/1023, `flex 131x40` at 1024/1280; burger the inverse |
| horizontal overflow | `scrollWidth == clientWidth` at 390/768/1023/1024/1280 |
| drawer CTA in shipped bundle | `header_book_mobile` and `mobile_menu` both in `app/layout-20d2f0863ecbd7a0.js` |
| drawer CTA attributes | `data-cta=header_book_mobile` `goal=form` `placement=mobile_menu` `href=/contact`, white on `#4338ca` = **7.90** |
| drawer reachability | 29 links = 7 parents + 21 children + CTA + wordmark; every `href` 200 |
| drawer Escape | dialog removed, `html overflow` restored to `visible` |
| desktop dropdowns @1280 | 4 triggers; click, Enter and Space all set `aria-expanded=true`; 7/6/5/6 children all visible; Escape closes all four |
| chrome hrefs | 31 unique, **all 200**; trailing-slash variants all 308; canonicals all non-slash and self-consistent |
| landmarks | 10 routes sampled: exactly one `<main id="main">`, one skip link, one `<header>`, one `<footer>` each |
| `/embed/[slug]` | `/embed/rd-relief-estimator` 200 with header=0 footer=0 main=0 skip=0; `/embed` gallery keeps full chrome |
| `<main>`→`<div>` swaps | 15 swaps across 13 files, `git diff -U0`: every class and attribute byte-identical |
| providers + JSON-LD | `ConsentProvider`, `AnalyticsProvider`, `ConsentedScripts` all still mounted; `metadata`/`viewport` objects and the `head` JSON-LD script untouched in the diff |
| Geist | `<html class="__variable_245d8d">`; one woff2 requested; `document.fonts` reports `GeistSans: loaded`; body family `GeistSans, …` |
| deleted exports | `siteContainer`, `btnSecondary`, `linkArrow`, `btnOnTeal`, `btnOnDark`, `btnPrimaryBase`: zero consumers, only the 4 comment lines in `layout-utils.ts:10-13` |
| `.prose table` override | survives, byte 12747 of served CSS |
| ring guard | `readdirSync` walk, `corpus.length > 30`, admin excluded, guards-the-guard present; 5/5 tests pass |
| gate rows | 1 layout-utils=6, 2 adopted=1/5, 4 backdrop=1, 8 walks=1 gtg=1 |
| footer text on slate-900 | worst 12px text **6.78** (slate-400); column headings `#818cf8` **5.98**; builder credit gradient **5.98–8.0** |
| backdrop behind footer text | mounted inside `<footer>`; worst text node over the composited `#1b2333` = **5.96** (slate-400); `hidden sm:block` so it cannot overflow at 390 |
| consent toggle | writes `ffp_consent` via the shared `setConsent`, read live by `isTrackingAllowed()`; persists in localStorage; no `ConsentBanner` mounted anywhere (posture `opt-out`), so no conflict; label "Do not track me" / "Enable analytics" is honest |
| PageShell props vs ecommerce | identical set plus `backdrop`; no phone number, no `ctaSecondary`, no `newsletterSlot`, no sticky CTA — nothing the owner rulings forbid |
| em-dashes / spelling | 0 rendered em-dashes on 10 routes; kit `—` are in comments only; no US spellings in any chrome label |

---

## FALSE PREMISES IN THE BRIEF / RECEIPTS

1. "`git diff port-startups-tech-phase0 -- startups-tech/` (the whole phase 1
   diff)". It is not the whole diff. Four of the named files are untracked and
   appear in no diff. See S4.
2. The brief says "13 page files where `<main>` became `<div>`" and later "the 15
   `<main>` to `<div>` swaps". Both are right and they are different counts: 13
   files, 15 swaps. Not a contradiction to chase.
3. Manager's receipt: the header CTA is "absent from rendered DOM at 390/768/1023".
   It is **present** in the DOM at all three widths with `display:none`. The
   behaviour is correct; the measurement claim is not, and it is the claim that
   would have hidden a cascade-race regression if one existed.
4. "the LeadCTAPanel badge on `/about` now renders coloured (it was uncoloured
   pre-phase 1)". No badge renders on `/about` or anywhere else: all five call
   sites pass `proofPoints={[]}`, and the badge is inside that branch. The claim
   is unverifiable because the surface does not exist.
5. The tokens receipt's "2.03 on the OLD hero gradient". Current measured worst on
   the live hero is **1.89**, on `rgb(53,50,93)`. Lower, not the same number.
6. Field notes §11's header-CTA cascade race is presented as a thing to hunt. It
   is closed in the kit and cannot reproduce here; the derivation is in the table
   above. Do not re-open it.

## MEASUREMENT TRAPS THE NEXT REVIEWER WILL HIT

- `transition-colors` / `transition-all` animate `outline-color`. Reading
  `getComputedStyle` immediately after Tab returns a **mid-transition** value:
  29 of the 31 footer stops first read as 6.78–12 and only settle at 2.84 after
  ~320ms. Wait, or the blocker above reads as a pass.
- `outline-offset-2` paints the ring on the **parent's** ground. A walk that
  returns the element's own background reports the header CTA at 1.26 when the
  true figure is 6.29 on the header's white.
- The builder credit is `bg-clip-text` + `text-transparent`. A computed-colour
  read returns 1.00:1 and is wrong; the visible colours are `#818cf8`→`#fb923c`.
- Tailwind v4 returns `oklab(...)` from `getComputedStyle`. A `rgba?\(` regex
  silently yields the wrong ground; composite through a 1x1 canvas instead.
