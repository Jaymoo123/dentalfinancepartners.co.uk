# UC receipt: standalone pages, funnel, legal, error

Package UC of `docs/pharmacies/_port/UPLIFT_PACKAGES.md`. No subagent, no git
command, no build, no server start/stop. Monorepo root, working tree only.

## What changed

1. **`app/error.tsx` (the one real paint defect, 0.6).** `text-[#0f3a4a]` with
   no focus ring on the "get in touch" link -> `text-primary-700` plus
   `focusRing` imported from `@/components/ui/layout-utils`. Same fix already
   shipped on `privacy-policy`, `terms`, `cookie-policy`.
2. **`app/contact/page.tsx`.** Was 0 eyebrow on 2 bands. Added
   `<Eyebrow onDark>Contact</Eyebrow>` to the hero band, reusing the published
   nav label (`niche.config.json` navigation[5]) — same pattern `/about`
   already uses with "About". Second band (`LeadCTAPanel`) stays `eyebrow=""`;
   its decline was already written and still holds (page publishes neither
   kit default). Added a written decline for `contact_pricing_link`: grepped,
   no pricing link exists on this route.
3. **`app/about/page.tsx`.** Already at 2/3 eyebrows with a written decline on
   the third (LeadCTAPanel, locked rule 9). No new eyebrow minted — nothing to
   add without authoring copy. Added `data-cta="about_hero_book"` /
   `data-cta-placement="about_body"` / `data-cta-goal="form"` to the existing
   "Get in touch" link.
4. **Both research pages** (`pharmacy-density-and-workload-index`,
   `pharmacy-openings-closures-index`). Each was 9 bands / 2 eyebrows (hero +
   `FaqSection`'s own default) / 0 glow.
   - `ScrollGlowGroup` adopted on the one card-grid band each page carries
     (the "on-funnel links" grid), same shape UB's `/services/[slug]` and
     `/for/[slug]` already use. 0 -> 1 glow mount per page.
   - `data-cta` added on existing hero links: the NHSBSA/ONS source
     citation(s) as `research_<slug>_hero_data`, the "Download CSV" link as
     `research_<slug>_csv`. `..._hero_book` is **declined in writing** at both
     call sites: neither hero publishes a booking link (only source
     citations and the CSV link); the closing `LeadCTAPanel` already carries
     the form and its own `lead_form_submit` id.
   - No new eyebrow minted on any other band: none of the remaining 7 bands
     per page publishes a short label (they carry full-sentence h2s), and
     rule 1 forbids minting one.
   - `PharmacyIndexCharts.tsx` untouched, per OFF LIMITS.
5. **`app/book/page.tsx`, `app/complete/page.tsx`, `app/thank-you/page.tsx`.**
   Already 2 bands with `SlimHero` + `PharmaciesBackdrop`, built that way in
   an earlier phase. Nothing to add.
6. **`W6_RECEIPT.md:378` (BookingPicker.tsx / DetailsForm.tsx).** Re-read
   against the current kit: both files already route every button and every
   focus ring through `@/components/ui/layout-utils` (`btnPrimary`,
   `focusRing`) — not a hand-roll of those two recipes. What remains
   hand-rolled is the **chip** toggle recipe (`chipBase`/`chipIdle`/
   `chipSelected` in `BookingPicker.tsx`) and the **input** recipe
   (`inputClass` in `DetailsForm.tsx`). Checked
   `packages/web-shared/design/layout-utils.ts` for either: it exports no
   `chip*` or `input*` recipe at all. **There is nothing to swap these to** —
   adopting a recipe that does not exist is not possible, and inventing one
   here is a kit change, out of UC's lease. Recorded as a KIT ASK for the
   manager, not shipped: `layout-utils.ts` needs a `chip*` and an `input*`
   export before this item can close. No geometry change made or needed.
7. **Legal pages** (`privacy-policy`, `cookie-policy`, `terms`). Re-read:
   each already carries an adopted `Eyebrow` (word lifted from its own h1)
   and zero raw hex (already fixed in an earlier phase, per 0.6). Nothing to
   do.
8. **`app/not-found.tsx`.** Checked for the same raw-hex-link shape `error.tsx`
   had. It carries none — its one link is `btnPrimary`. No change.

## Acceptance

```
# 1. zero raw hex paint left in tsx outside the 8 documented ones
grep -rnoE 'text-\[#|bg-\[#|border-\[#' pharmacies/web/src --include=*.tsx
-> 0 matches (PASS)

# cd pharmacies/web && npx tsc --noEmit
-> clean, no output (PASS)

# cd pharmacies/web && npx vitest run
-> 7 files / 72 tests passed, including src/tests/focus-ring.test.ts (3 tests,
   the ring guard) (PASS, matches baseline)
```

Not run by this package (needs the manager's single serialised build, section
4 of the plan):
- `npm test -- focus-ring` as its own invocation (covered by the full
  `vitest run` above, same file, same 3 tests, already green).
- Link floors (`/about` 10, `/contact` 10, `/privacy-policy` 10,
  `/cookie-policy` 10, `/terms` 10, `/research/pharmacy-openings-closures-index`
  18, `/research/pharmacy-density-and-workload-index` 14) — needs
  `sweep.mjs` against a running build.
- Booking flow POST `/api/leads/book` reaching a lead row — needs the local
  build running; manager verifies per the plan's acceptance 4 (below).
- Prose multiset diff across all 14 routes — needs the build.
- 390px horizontal-overflow check on `/book`, `/complete`, `/thank-you` —
  needs `browser_check.mjs` against a running build. Low risk: no geometry
  changed in those three files (item 5/6 above), and the only className
  edits elsewhere are additive (`Eyebrow`, `ScrollGlowGroup` wrapping an
  existing grid `div`, `data-cta` attributes, a Tailwind class swap on one
  link in `error.tsx`).

**How the manager verifies acceptance 4 (booking flow) without this package
running a server:** `BookingPicker.tsx` and `DetailsForm.tsx` are unchanged in
every prop, field name, `name=`, submit handler, API path, consent string and
redirect target — confirmed by re-reading both files end to end before and
after this receipt's edits (item 6: the only candidate change, the chip/input
recipe swap, was not made because no kit recipe exists to swap to). The
booking POST path (`/api/leads/book`) and its consent paragraph
(`src/config/site.ts`) are not in UC's diff at all. On the manager's one
serialised build, `POST /api/leads/book` reaching a lead row and the consent
paragraph being byte-identical to `src/config/site.ts` is therefore a
regression check on files this package did not touch, not a new risk this
package introduced.

## Files touched

- `pharmacies/web/src/app/error.tsx`
- `pharmacies/web/src/app/contact/page.tsx`
- `pharmacies/web/src/app/about/page.tsx`
- `pharmacies/web/src/app/research/pharmacy-density-and-workload-index/page.tsx`
- `pharmacies/web/src/app/research/pharmacy-openings-closures-index/page.tsx`

Not touched (re-read, no change needed or no kit recipe to adopt):
`app/book/page.tsx`, `app/complete/page.tsx`, `app/thank-you/page.tsx`,
`app/not-found.tsx`, `app/privacy-policy/page.tsx`, `app/cookie-policy/page.tsx`,
`app/terms/page.tsx`, `components/forms/BookingPicker.tsx`,
`components/forms/DetailsForm.tsx`.

## Known-and-accepted / carried forward

- KIT ASK for the manager: `layout-utils.ts` has no `chip*` or `input*`
  recipe, so `W6_RECEIPT.md:378` cannot fully close inside UC's lease.
- No new interruptive surface added. No wording changed, anywhere. No
  `packages/**` edit. No file outside UC's OWNS list touched.

Agents used: none beyond this one (no subagent launched, per the hard rule).
No CI or deploy noise: no build, no server, no git command run.
