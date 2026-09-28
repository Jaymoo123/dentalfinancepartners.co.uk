# Property lead-kit check (2026-09-28)

Independent second-pass check of the full lead kit on the LIVE site
(https://www.propertytaxpartners.co.uk), deployed from `32981977`. Read as a visitor and as an
assistant would read it. This is a report. Nothing was fixed, nothing deployed, nothing pushed.

Method: 40 live routes inventoried (all HTTP 200), rendered text dumps read in full, screenshots
at 1280 and at a true 390 viewport. Entity block WORDING was out of scope by owner direction
(it is being rewritten); its PLACEMENT was recorded and is reported below.

> **CAVEAT, read with section 0 of the cross-site report.** While this check ran, 77 source files
> across the five sites were modified in the shared working tree and left uncommitted, reversing the
> positioning from referral network to accountancy practice (86 referral-voice lines removed, 92
> practice-voice lines added), marked in code as "owner ruling 2026-09-28". I did not revert or touch
> them. Everything below was graded from the LIVE production site, so it describes what visitors see
> today. But every finding here that turns on "this claims to be a practice" is PENDING the owner
> confirming that ruling; the mechanical, capture-surface and sameness findings stand either way.

## 1. Verdict in three lines

The audience-page bodies deserve their reputation and the post-submit layer is the best in the
estate. The kit bolted on top still speaks in the pre-referral accountancy-practice voice: a
free-consultation promise on 30 of 40 routes, a "fixed fee in writing" promise on the footer of
all 40, and two pages that call us a specialist property accountancy firm about 160 lines above
the block saying we are not one.

Three blockers, all the same class: the site promises things a referral network cannot promise.

## 2. Layer table

| Layer | Coverage | Grade | Deciding point |
|---|---|---|---|
| Foot lead form | present on every page that should carry one | PASS | consent sentence verbatim estate-wide, unmodified |
| Mini captures | 5 capture surfaces on a single blog post | FIX | the inline mini's own copy says "The form is just below" |
| Calculator result form | one form under the result, browser-verified | PASS | client-rendered, invisible to curl, counted in the browser |
| Sticky and hero CTAs | free-consultation copy on every page | BLOCKER | see finding 1 |
| Entity block | present on 19 of 40 routes | OWNER CALL | absent from all 4 service pages, all 4 calculators, every blog post |
| Consent and disclosure | verbatim, unmodified | PASS | not retyped anywhere |
| Post-submit | `/thank-you`, `/complete`, `/book` | PASS | best in the estate; no dead end without a token |
| Nurture | 8 steps, delays correct | PASS (delays) | Property is the ONLY site with correct increments, see engine report |
| Blog CTAs | `CTA_BY_CATEGORY` in `BlogPostRenderer` | PASS | resolves correctly, unlike contractors |
| Machine layer | one Organization node per page | FIX | a `Service` node sets `serviceType: "Property accountancy and landlord tax services"` |

### Entity block placement (requested for the relocation decision)

| Page type | Position vs FAQ | Position vs foot form | Width / size |
|---|---|---|---|
| `/` | above FAQ | below the foot form | full-bleed `py-12/16/20`, six-heading grid, roughly one viewport tall at 1280 |
| 15 `/for/*` | above FAQ | above the foot form | same |
| 4 `/services/*` | absent | absent | n/a |
| calculators, blog | absent | absent | n/a |

Nothing covers the block at either width on Property. The owner's intent (move below the FAQs,
make it smaller) is a change on the homepage and the 15 audience pages only.

## 3. Blockers

**1. Free consultation, 30 of 40 routes.** Sticky bar on every page, all 15 `/for/*`, all four
`/services/*`, home, about, calculators, blog, `/book`, `/thank-you`, `/complete`.
Promising that the partner firm's first call is free quotes that firm's fee at zero, on a site
that says it does not quote fees. Most instances come from one place, the `leadgen` CTA variant
in `Property/niche.config.json` (`hero_primary` "Book free consultation", `sticky.secondary`
"Book a free consultation with a property specialist", `home_cta` "Book a free consultation."),
so one config edit removes a large share.
Replacement pattern: "Tell us your situation and a property specialist will call you back".

**2. "Fixed fee in writing".** On `/about`, all four `/services/*`, `/services`, `/book`,
`/complete`, `/thank-you`, the footer of all 40 pages, and inside the FAQPage JSON-LD.
Worst instance, `/services/property-accountant` hero:
"a free consultation shows you what your current setup is costing you and quotes a fixed fee in
writing to fix it."
Replace with: "send us the situation and a property specialist will tell you what your current
setup is costing you and what it would take to fix."
The FAQ schema separately tells Google "We quote fixed fees up front so there are no surprises".

**3. We call ourselves an accountancy practice.** Rendered on `/` and `/contact`:
"Property Tax Partners is a specialist property accountancy firm for UK landlords, buy-to-let
investors, and developers."
Also in the machine layer: a `Service` node sets `serviceType: "Property accountancy and landlord
tax services"` with `provider` pointing at the same Organization node whose description correctly
says we introduce enquiries to a partner network. Drop or repoint the Service node.

The footer strapline carries the same class: "Specialist property accountants for UK landlords.
Section 24 planning, MTD compliance, incorporation analysis. Fixed fees, 24hr response." care and
charities already use a purely descriptive footer with no practice claim; copy that shape.

## 4. Fixes

- **24 hours.** Promised on seven surface types plus the footer, and mentioned in ZERO Property
  nurture emails. `/thank-you` says "within one working day" instead. Pick one wording, use it in
  both, and put it in the first nurture email. If the partner SLA is not actually one working day,
  this escalates to an owner call.
- **All 15 audience pages close identically**, all three lines: eyebrow "Free consultation",
  heading "Talk to a specialist about your situation", body "Book a free consultation. No
  obligation, no hard sell." The bodies above are well differentiated and the close throws that
  away at the decision point. One differentiated sentence per page.
- **Over-capture on blog posts:** five capture surfaces on one post, and the inline mini's own copy
  says "The form is just below". Drop the inline mini on blog posts; keep the mobile calculator
  gate and the foot form.
- **Foot `LeadForm` carries no explicit `form_id`** (it is identified by absence). One-line
  follow-up; attribution otherwise works.

## 5. Owner calls

- **Couples page three-year cap.** Still live and in TWO places, not one: the FAQ 4 answer and its
  JSON-LD copy, plus a stat band tile "3 tax years / Window for no-gain-no-loss treatment after a
  couple separates" that the original report did not name. Already open, not re-argued.
- **Entity block absent from 21 of 40 routes**, including all four service pages, which carry the
  strongest "we do the work" claims with no disclosure at all.
- **`llms-full.txt` about 17 MB** against the 19.07 MB ISR ceiling. Already open.
- **"Chartered Tax Advisers"** describing Aswatax on `/thank-you`. Post-submit and reads compliant;
  confirm it stays.
- Orphan `/for` pages reachable only from the sitemap and llms.txt. Already open.

## 6. Withdrawn after checking (do not act on these)

- **No layout defect at 390 anywhere.** Document `scrollWidth` is exactly 390 on every page probed.
  The clipping seen in the first screenshot pass was a capture artifact: Edge headless
  `--window-size=390,844` does not emulate a mobile viewport and crops a wider layout. The same
  command clips gov.uk identically. Do not act on any 390 clipping report.
- **Form-identifier concern withdrawn.** Attribution works, via `extras.form_id` and
  `${formId}-role` field ids from the shared MiniCapture, plus `source_url` on every submit.
- **Homepage stat tiles.** The dumps caught 120+/14hr/168+/60% mid-animation. Repo truth is
  200+/24hr/280+/100%, derived in `src/lib/site-stats.ts`. Not a contradiction.
- **The returning-visitor panel could not be observed.** A headless first visit cannot trigger it.
  Nothing is asserted about it either way.

## 7. Genuinely good, do not touch

The 15 audience-page bodies open on a named action and a real cost and are the strongest segment
set in the estate. The post-submit layer is the best of the five: neither `/book` nor `/complete`
is a dead end without a token. The consent sentence is verbatim and untouched. Blog CTAs resolve
correctly by category, which is more than contractors can say. Zero em-dashes, zero US spellings.
