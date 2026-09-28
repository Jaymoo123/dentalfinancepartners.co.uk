# charities lead-kit check (2026-09-28)

Independent second-pass check of the full lead kit on the LIVE site
(https://www.trusteetax.co.uk), deployed from `a796de63`. Read as a visitor and as an assistant
would read it. This is a report. Nothing was fixed, nothing deployed, nothing pushed.

Method: 39 live routes inventoried (all HTTP 200), rendered text dumps read in full, screenshots
at 1280 and at a true 390 viewport. The two-step form was driven in a real browser, not inferred
from HTML. Entity block WORDING was out of scope by owner direction (it is being rewritten); its
PLACEMENT was recorded.

Coverage limit to note: the screenshot set was trimmed for time (no `/complete`, one `/services/*`
page, fewer calculators), and `/terms` was not among the 39 routes.

> **CAVEAT, read with section 0 of the cross-site report.** While this check ran, 77 source files
> across the five sites were modified in the shared working tree and left uncommitted, reversing the
> positioning from referral network to accountancy practice (86 referral-voice lines removed, 92
> practice-voice lines added), marked in code as "owner ruling 2026-09-28". I did not revert or touch
> them. Everything below was graded from the LIVE production site, so it describes what visitors see
> today. But every finding here that turns on "this claims to be a practice" is PENDING the owner
> confirming that ruling; the mechanical, capture-surface and sameness findings stand either way.

## 1. Verdict in three lines

charities has the best prose and the cleanest machine layer in the estate: no em-dashes, no US
spellings, one AI tell across 39 pages, and an `llms.txt` that is the model the other four sites
should copy.

It is let down by its plumbing, not its writing: `/about` captures nothing, the footer CTA on all
39 pages lands on a token-gated dead end, and the free-consultation class is live on 43 surfaces.

## 2. Layer table

| Layer | Coverage | Grade | Deciding point |
|---|---|---|---|
| Foot lead form | all 6 audience and 7 service pages | PASS | two-step panel; step 2 carries the full data-sharing disclosure |
| Mini captures | blog posts | FIX | "Free, no obligation. The form is just below." |
| Calculator result form | one under the result | PASS | the calculator "free" claims are genuine and were left alone |
| Sticky and hero CTAs | none render | PASS | `cta.sticky_secondary` is dead config carrying a free-claim |
| Entity block | core, audience and service pages | PASS (placement) | on white over a slate FAQ |
| Consent and disclosure | verbatim, verified in-browser at step 2 | PASS | |
| Post-submit | `/thank-you`, `/complete`, `/book` | BLOCKER | findings 2 and 3 |
| Nurture | 8 steps | BLOCKER (delays) | runs 25 days, not 11; see engine report |
| Blog CTAs | `BLOG_CTA` | BLOCKER | finding 5; the per-category map was never built |
| Machine layer | one Organization node, clean `llms.txt` | PASS | the best of the five |

## 3. Blockers

**1. `/about` has zero forms.** Confirmed in raw HTML and in a real browser at 1280: no `<form>`
tag. The page's last element is a bare `<a href="/contact">Get in touch</a>`, immediately after the
entity block's closing sentence "The partner firm does the work." The button sends the visitor to
`/contact` to start again. Every other site's about page captures.
Fix: append the same two-step panel `/for/*` uses, titled "Tell us what your charity needs", lead
"Send us your structure, your income level and your year end. We match it to a firm in our partner
network that works only with charities, and they contact you to scope the work."

**2. Free-consultation class, six instances across 43 live surfaces.**

| Surface | Now | Replace with |
|---|---|---|
| `/thank-you` | "arrange your free charity finance review" | "arrange your introductory call" |
| `/complete` | "will be in touch to arrange your free charity finance review, no obligation" | "will be in touch to arrange your introductory call. Anything you agree after that is between you and them." |
| `/book` h1 | "Book your free review call" | "Book your introductory call" |
| Home | "Book your free, no-obligation call today." | "Tell us about your organisation and we will arrange a short introductory call, with no obligation." |
| All 40 blog posts | "Free, no obligation. The form is just below." | "No obligation. The form is just below." |

Plus a dormant `cta.sticky_secondary` in config carrying the same string: live nowhere, one
template change from shipping. Delete it.

**3. The footer link "Book a consultation" points at `/book`, on all 39 pages.** `/book` without a
token renders zero forms and says "This page needs the personal link from your email or text
message", directly under an h1 promising "Book your free review call. Pick a day and a time window
that suits you." It is the only footer CTA and it fails for every visitor who has not already been
sent a link.
Fix: change it to "Send an enquiry" pointing at `/contact`.
Note: Property and contractors carry the identical footer link with the identical untokened
behaviour. See the engine report; this is a three-site item.

**4. `/for/social-enterprises` first line: "Accounts and tax advice for social enterprises"** on a
page that also says the site does not give advice.
Fix: "Accounts and tax for social enterprises", the construction the other five `/for/` pages
already use. Same page, panel heading "Structure and tax advice" to "Structure and tax".

**5. The blog CTA calls a CIC reader's accounts "your charity's accounts"** on both CIC posts,
against house position 22 and against the post's own sentence "A CIC is not a charity".
Fix: per-category heading "Need help with your CIC's accounts and CIC34?"
Root cause: `src/data/blog-cta-copy.ts`, the per-category CTA map, was never built.
`blog_cta.txt` says so in its own header. That is also the source of five poor-fit CTA rows.

## 4. Fixes

- **Six audience pages ship a pipeline artefact:** "Tell us about your community interest
  companies", "Tell us about your small charities", "Tell us about your charity trustees and
  treasurers". A plural page title substituted into a singular slot. The singular replacement is the
  page's own subject in the singular; apply per page in the fix round.
- **Wave 1 sameness, quantified:** 8 of 8 posts at exactly 6 FAQs and 5 takeaways, against a
  0/6/8/8/10 spread in the older set. The takeaways share a shape too (a rule sentence to open, a
  classification caveat to close). Post-by-post targets (endowment up to 9 FAQs,
  VAT certificate down to 4, consolidation down to 5 FAQs and 3 takeaways), producing a 4-to-9
  spread.
- **All 13 audience and service pages close on one identical sentence:** "We will explain what your
  organisation needs, in plain English, with no obligation." It also fails the decider test, because
  that is not what happens next. Each needs its own next-step sentence, written in the fix round.
- **`/services`, `/research` and `/calculators` index pages have no capture at all.**
- **"Get a quick reply" on the blog form** is a speed promise nothing backs; the site otherwise
  states no response time (verified: zero hits for 24 hours, same day or one working day across all
  39 dumps). Replace with "Send enquiry", already used at step 2.
- **"unlock" on the home page**, the only marketing verb on the site.

## 5. Owner calls (already open as decision 3 or adjacent)

- **Home h1 "Specialist accountants for UK charities and social enterprises."** Graded against the
  site's other surfaces: `llms.txt`, the Organization JSON-LD description and the footer legal line
  on all 39 pages all describe a publisher and introducer. Three surfaces to one. `/terms` was not
  read, so that leg is missing.
- **"specialist charity accountants" is confirmed gone from the footer on all 39 pages.** The fix
  held. It survives only in two titles: home "Specialist Charity Accountants UK" and `/about`
  "About | Specialist Charity Accountants | Trustee Tax".
- **`/services/charity-vat` title "Charity VAT Advice and Compliance"** is a banned-word case rather
  than a positioning one, but it is a title, so reserved.

## 6. Follow-ups

- **All four endowment figures are CORRECT** against Charities Act 2011 ss.281-284D: £25,000 (the
  s.281/282 boundary, tested on the whole fund), 60 days (s.282 notification, and the post correctly
  notes it extends on public notice or further information), 25% and 20 years (s.284A borrowing).
  House positions run 1 to 28 and **position 29 does not exist**; permanent endowment is mentioned
  only in passing at position 8. Open it.
- Build `src/data/blog-cta-copy.ts`, the root cause of blocker 5.

## 7. Withdrawn after checking (do not act on this)

**No layout defect at 390.** The inventory pass reported headings and body text clipping at the
right edge and called it "not a capture artifact". It was one: Edge headless
`--window-size=390,844` does not emulate a mobile viewport and crops a wider layout. The same
command clips gov.uk identically. Re-tested at a true 390 viewport on four pages: `scrollWidth`
exactly 390, zero overflowing elements.
The two tables that extend past 390 (512px and 448px) sit inside `overflow-x: auto` wrappers that
genuinely scroll, which is correct responsive practice, not a defect.

## 8. Genuinely good, do not touch

The prose is the best in the estate and the machine layer is the cleanest: one Organization node,
a correct referral description, and an `llms.txt` the other four sites should be ported to. The
two-step form carries the full data-sharing disclosure before submit, verified by driving it in a
real browser rather than reading the HTML, where it is absent. No chat widget, sticky CTA, modal or
banner renders at either width. Zero em-dashes, zero US spellings, one AI tell in 39 pages.
