# Medical lead-kit check (2026-09-28)

Independent second-pass check of the full lead kit on the LIVE site
(https://www.medicalaccounts.co.uk), deployed from `32981977`. Read as a visitor and as an
assistant would read it. This is a report. Nothing was fixed, nothing deployed, nothing pushed.

Method: 66 live routes inventoried (all HTTP 200), rendered text dumps read in full, screenshots
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

Medical has the best writing in the estate and the worst promise in the estate. The
`/free-practice-health-check` page describes a follow-up the code does not implement and denies a
drip the code does enrol into. Four blockers, all false claims, two of them live on all 66 pages.

Everything else is tidy: one form per page, consent notice everywhere, all 14 blog posts on a
correctly mapped CTA, no em-dashes, and every figure traced back to `house_positions.md`.

## 2. Layer table

| Layer | Coverage | Grade | Deciding point |
|---|---|---|---|
| Foot lead form | `enquiry_ref` on 55 pages | PASS | one per page, consent verbatim |
| Mini captures | `mobile_tool-role`, `inline_mini-role` on 15 blog posts | FIX | six interruption surfaces per post, two are the same offer twice |
| Calculator result form | exactly one, browser-verified | PASS | client-rendered; counted in the browser, not curl |
| Sticky and hero CTAs | "Free consultation" / "Book your free consultation" on 37 pages | BLOCKER | finding 2 |
| Entity block | 13 of 66 pages | FIX (placement) | above the FAQ on ten pages, below on `/services` |
| Consent and disclosure | verbatim, unmodified | PASS | |
| Post-submit | `/thank-you`, `/complete`, `/book` | PASS | |
| Nurture | 8 steps | BLOCKER (delays) | runs 25 days, not 11; see engine report |
| Blog CTAs | `lib/blog-cta.ts` | FIX | three category mismatches |
| Machine layer | one Organization node per page | BLOCKER | `slogan` and footer strapline, findings 3 and 4 |

### Entity block placement (requested for the relocation decision)

| Page type | Position vs FAQ | Position vs foot form |
|---|---|---|
| `/`, `/about`, 9 `/for-*` | ABOVE the FAQ | above the foot form |
| `/services` | BELOW the FAQ | above the foot form |
| blog, calculators, guides, resources, locations | absent | absent |

`/services` is the correct outlier and already shows the shape the owner wants. Ten pages need
moving to match it.

## 3. Blockers

**1. `/free-practice-health-check` describes a follow-up that does not exist and denies one that
does.** Traced: wizard to `submitMedicalLead` to `/api/leads/submit` line 138 `enrollLead`. No
exemption exists for the wizard; the only exemption (`enroll.ts` line 75) is for
`role === "resource"`. Because the wizard sends `phone: ""`, `routePrimarySequence` routes it to
`medical_detail_capture`, four emails over seven days, whose day-1 opens "A quick nudge on the
message you sent us yesterday" and day-7 opens "We have asked a couple of times now, so we will
stop the reminders."

The page says, in the hero: "with no PDF wall and no sales sequences", and in the FAQ:
"We follow up once by email with the full report and an offer of a 30-minute scoping call. If you
do not reply, we do not chase. No drip campaigns, no remarketing, no list-selling."

Both possible states make the page false. Armed, it chases four times while saying it does not
chase. Unarmed, it sends nothing while saying it follows up once. Separately, NOTHING anywhere
emails the report: the findings render on screen and are discarded (grepped `src/lib` and
`src/app/api`).

Two routes out, and this one is the owner's call: change the three sentences, or change the code
by exempting health-check leads the way resource leads already are. The three sentences to change are the hero's "no sales sequences", the
FAQ's "we do not chase" and the FAQ's "We follow up once by email with the full report".

**2. "Free consultation" eyebrow and "Book your free consultation" button, live on 37 pages.**
`/services` says a few lines above its own instance: "Medical Accountants UK is not an accountancy
practice and does not give advice, and it does not file returns or quote fees." Calling the first
call free quotes that firm's fee at zero. STATE.md batch 3 swept exactly this class and missed the
eyebrow and the button.
Replace with "No obligation" and "Send your enquiry", both already true and already on the same
pages.

**3. Organization JSON-LD `slogan`, all 66 pages:** "Specialist accountants for UK medical
professionals", sitting one property above a description that correctly says we are not
accountants. Note: the tagline feeding `slogan` is part of the reserved ranking call (prelive
decision 3), so this is listed there too; dropping `tagline` from the Organization node is one
line and does not touch any ranking surface.

**4. Footer strapline, all 66 pages:** "Expert accounting for GPs, consultants and medical
practices. NHS pension advice, locum tax planning, private practice incorporation and expense
claims."
Two violations in one sentence: we do accounting, and advice in our own voice. care and charities
already use a purely descriptive footer with no practice claim and no advice; copy that shape.

## 4. Fixes

- **Three blog CTA mismatches**, worst being a post about CLOSING a company asking "Thinking about
  incorporating the private side?"
- **`/research` has zero capture** on the strongest authority page on the site.
- **Six interruption surfaces per blog post**, two of them the same offer twice. Drop one.
- **Entity block above the FAQ on ten pages**, below on `/services`. `/services` is correct.
- **`/for-gps` links neither sibling** (`/for-salaried-gps`, `/for-gp-partners`).
- **All nine audience pages end post-submit on "We store your details securely"** instead of the
  next-step sentence that `/contact` already has. Use the `/contact` sentence.
- **The nine audience pages share five byte-identical trust tiles.**

## 5. Owner calls

- **Widget behaviour.** Verified covering a primary CTA at 390 on `/for-gps`, a secondary CTA at
  390 on `/about`, and the only lead form on the locum calculator at 1280. I also captured it
  covering FAQ answer text on `/free-practice-health-check` at 1280. Reserved call; evidence
  logged, no removal proposed.
- **"Regulated firm"**, 40 occurrences on 30 pages. Known open decision, not re-argued.
- **Response time:** confirmed genuinely absent site-wide, unlike Property and care. Estate
  posture decision sits in the engine report.
- **Home h1 and title**, same accountants tension as blocker 3. Reserved ranking call.

## 6. Withdrawn after checking (do not act on these)

- **`/free-practice-health-check` is NOT missing a capture surface.** It carries a six-step wizard
  that is client-rendered and invisible to curl. An earlier "no form" reading was wrong.
- **No layout defect at 390.** The clipping in the first screenshot pass was a capture artifact
  (Edge headless does not emulate a mobile viewport; the same command clips gov.uk). Medical's
  homepage has zero overflowing elements at a true 390 viewport.
- **"NHS pension optimization"** (US spelling) sits in a `homepage_description` key in
  `niche.config.json` that is NOT rendering. The live meta description is different and clean.
  Dead config, not a live defect, but worth deleting so it cannot surface later; it also carries a
  "Free consultation" claim.
- **Stat tiles** must be judged from the markup, not mid-animation screenshots.

## 7. Could not verify, not asserted

- The production value of `LEAD_NURTURE_ENABLED`. If Medical is unarmed, a lead receives nothing at
  all, including the instant acknowledgement. This is a question for the owner, not a finding.
- The "BMA List 3 relief restricted to 85%" claim on `/for-nhs-doctors` could not be found in
  `house_positions.md`. Either add the house position or check the figure.

## 8. Genuinely good, do not touch

The writing is the best of the five. Every figure traced. One form per page, consent notice
everywhere, all 14 blog posts on a correctly mapped CTA. `/services` already places the entity
block where the owner wants it. Zero em-dashes, zero live US spellings, no banned voice phrases in
the bodies.
