# care lead-kit check (2026-09-28)

Independent second-pass check of the full lead kit on the LIVE site
(https://www.carehometax.co.uk), deployed from `a796de63`. Read as a visitor and as an assistant
would read it. This is a report. Nothing was fixed, nothing deployed, nothing pushed.

Method: 52 live routes inventoried (all HTTP 200), rendered text dumps read in full, screenshots
at 1280 and at a true 390 viewport. Entity block WORDING was out of scope by owner direction
(it is being rewritten); its PLACEMENT was recorded and is reported below, and it matters here.

> **CAVEAT, read with section 0 of the cross-site report.** While this check ran, 77 source files
> across the five sites were modified in the shared working tree and left uncommitted, reversing the
> positioning from referral network to accountancy practice (86 referral-voice lines removed, 92
> practice-voice lines added), marked in code as "owner ruling 2026-09-28". I did not revert or touch
> them. Everything below was graded from the LIVE production site, so it describes what visitors see
> today. But every finding here that turns on "this claims to be a practice" is PENDING the owner
> confirming that ruling; the mechanical, capture-surface and sameness findings stand either way.

## 1. Verdict in three lines

care is the best-written site in the kit and the worst-disclosed at the point of sale. The prose,
figures and form questions are A* and trace cleanly to `docs/care/house_positions.md`, but the home
page asks for the enquiry before it says who is asking, and 16 surfaces price a partner firm's call
at zero.

Nothing about the writing needs rewriting. The blockers are placement, one machine file and one
word.

## 2. Layer table

| Layer | Coverage | Grade | Deciding point |
|---|---|---|---|
| Foot lead form | every page that should carry one | PASS | no page missing a form |
| Mini captures | 2 on calculators and blog posts | FIX | fixed CTA plus a mid-body panel saying the same thing |
| Calculator result form | one under the result | PASS | browser-verified |
| Sticky and hero CTAs | no sticky CTA renders | PASS | `cta.sticky_*` keys are dead config, see owner call |
| Entity block | present on all core, audience and service pages | BLOCKER (placement) | finding 5 |
| Consent and disclosure | verbatim, unmodified | PASS | |
| Post-submit | `/thank-you`, `/complete`, `/book` | BLOCKER (copy) | findings 2 and 3 |
| Nurture | 8 steps | BLOCKER (delays) | runs 25 days, not 11; see engine report |
| Blog CTAs | one fixed CTA, no category map | FIX | same promise twice on one page, across five different decisions |
| Machine layer | one Organization node per page | BLOCKER | `llms-full.txt` contradicts `llms.txt`, finding 4 |

### Entity block placement (requested for the relocation decision)

| Page type | Position vs FAQ | Position vs foot form |
|---|---|---|
| `/` | BELOW the FAQ (line 120) | BELOW the foot form (line 152); block at line 167 of 196 |
| `/about`, all 7 `/for/*`, all 6 `/services/*` | above the FAQ | above the foot form |
| `/contact` | absent | n/a |

Home is the only page in the kit where a visitor can submit without ever having been told the
enquiry goes to a third party. See the caution in the engine report: this is what "below the FAQs"
looks like in practice when the foot form sits above the block.

## 3. Blockers

**1. "Free call" eyebrow, 14 pages** (`/about`, all 7 `/for/*`, all 6 `/services/*`). The same
class as Medical: the partner firm's call is not ours to price at zero, on pages that also say
"Care Home Tax is not an accountancy practice... the partner firm does the work."
Replace with "No obligation".

**2. `/book`:** h1 "Book your free review call" and title "Book your free review | Care Home Tax".
Replace both with "Book your call". The body line "no obligation" is already correct; keep it.

**3. `/complete`:** "...to arrange your free care business finance review, no obligation".
Drop the word "free".

**4. `/llms-full.txt` line 3** says "Specialist UK accountants for care providers".
`llms.txt` on the same domain already says it correctly, so the two machine files currently
disagree about what the business is.
Replace with: "A referral service for UK care providers: we publish finance and compliance research
and introduce enquiries to a specialist accountancy firm in our partner network."

**5. Home entity block sits below both the FAQ and the lead form.** Every other page puts it above
both. Move it above the foot form. No copy change, one reorder.

**6. The 24 hour promise is not backed.** Stated about 55 times on the live site. No nurture email
or SMS mentions 24 hours at any step, and both T0 messages make everything contingent on the lead
replying ("Reply YES and one of our specialists will call you").
Either the T0 email states the promise ("A specialist will be in touch within 24 hours. If you want
to pick the slot yourself, reply with a time"), or the site drops to "the same working day".
Recommend the former.

## 4. Fixes

- **All five calculator pages** say "we reply within one working day" while everything else says
  24 hours. Use one unit everywhere.
- **`/for/self-employed-carers-and-personal-assistants`:** "Tell us about your self-employed carers
  and personal assistants situation" is a slug-injection artefact and is ungrammatical, because the
  reader IS the carer. Replace with "Tell us what you are paid for and how, and we will reply within
  24 hours." `/for/childrens-homes` has the same shape. All six service pages share one identical
  "Tell us about your situation".
- **Wave 1 closers: the "a specialist reviews X, Y and Z" formula is live on 11 of 13 posts**, not
  the nine previously reported. Delete it from at least eight of the eleven. The eleven are
  identifiable by the closing sentence of the BODY, not of the page; list them in the fix round.
- **Home, BADR:** "at 18% from 6 April 2026 (down from 24% standard CGT rate)" reads as if BADR was
  24% and fell. It was 10%, then 14%, now 18%. Replace with "...at 18% from 6 April 2026, against a
  standard higher-rate CGT rate of 24%".
- **`/services` index body copy:** "move to advisory for acquisitions and exits" to "bring in deal
  support for".
- **`care-home-vat-exemption-edge-cases`:** "Get specialist advice before any major construction or
  fit-out project."
- **`/contact` has no entity block**, and **`/services` index and
  `/research/care-provider-business-index` have no form at all.** The Business Index is 325 lines
  and is the asset the home page links by name.
- **Blog CTA sameness:** one fixed CTA across 20 posts, plus a mid-body panel saying a
  near-identical thing, across five categories that map to five different decisions.

## 5. Owner calls (already open)

Nine page titles and eight h1s call the site accountants ("Care home accountants", "Accountants for
UK care providers.", "About | Specialist UK Care Sector Accountants"), and the blog CTA h2 on all
20 posts reads "Need specialist care sector finance advice?" while the entity block says the site
does not give advice.

Recommendation: leave the titles and h1s, which are the reserved ranking call. Change only the blog
h2 to "Want this checked by a care sector specialist?" It is the only one of the four that promises
WE supply the advice, in first person, directly above a form.

Also: `cta.sticky_*` in `niche.config.json` is dead config, but `sticky_secondary` reads "Free,
no-obligation reply within 24 hours". It becomes a free-claim on every page the day someone wires
that component up. Delete it rather than leave it armed.

## 6. Corrected during this check

- **The "a specialist reviews" closer was nearly cleared in error.** The inventory pass read the
  last sentence ON THE PAGE, which is always an FAQ answer, instead of the last sentence of the
  BODY, where the formula sits. Count is 11 of 13, and the defect is live.
- **The "seek advice" flag was on the wrong post.** `fnc-chc-la-fee-mix-accounting` is clean; the
  live instance is `care-home-vat-exemption-edge-cases`.
- **No layout defect at 390, and there is a mobile nav.** The first screenshot pass reported
  site-wide clipping and a missing hamburger as verified. Both were a capture artifact: Edge
  headless `--window-size=390,844` does not emulate a mobile viewport and crops a wider layout. The
  same command clips gov.uk. At a true 390 viewport, care home and `/about` have ZERO overflowing
  elements and document `scrollWidth` is exactly 390. Do not act on any of it.
- **The repeated registered-office sentence is not real.** Raw grep counts of 6 to 8 were a Next.js
  JSON payload artefact; only the entity-block and footer pair is visible text.
- **Service pages no longer print raw HTML.** Confirmed on two service page dumps; the fix held.

## 7. Genuinely good, do not touch

The prose is the best of the five sites and every figure traces to `house_positions.md`. The form
questions are specific and well chosen. No chat widget, sticky CTA, modal or banner renders at
either width, verified over 8 seconds: care is the cleanest site in the estate for interruption.
The footer strapline is purely descriptive with no practice claim and no advice, and is the shape
the other three sites should copy. Zero em-dashes, zero US spellings.
