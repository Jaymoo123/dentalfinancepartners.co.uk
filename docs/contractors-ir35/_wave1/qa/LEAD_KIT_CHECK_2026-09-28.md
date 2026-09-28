# contractors-ir35 lead-kit check (2026-09-28)

Independent second-pass check of the full lead kit on the LIVE site
(https://www.contractortaxaccountants.co.uk), deployed from `a796de63`. Read as a visitor and as
an assistant would read it. This is a report. Nothing was fixed, nothing deployed, nothing pushed.

Method: 41 live routes inventoried (all HTTP 200), rendered text dumps read in full, screenshots
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

The bodies are excellent and the machine layer is clean. The lead kit bolted on top is still the
pre-referral accountancy-practice voice, and the site now contradicts its own entity block on
nearly every route.

Commit `7ec4dd0f` fixed nine rows but missed the shared config, so the sentence it was meant to
kill is live on all 62 blog posts.

## 2. Layer table

| Layer | Coverage | Grade | Deciding point |
|---|---|---|---|
| Foot lead form | 24 pages | BLOCKER (copy) | button "Book your free call" |
| Mini captures | 5 surfaces on blog posts and calculators | FIX | two near-duplicate panels stacked |
| Calculator result form | one under the result, browser-verified | PASS | client-rendered, counted in the browser |
| Sticky and hero CTAs | "Book a free call" in header nav on all 41 | BLOCKER | finding 1 |
| Entity block | 18 of 41 pages | FIX (placement) | absent on all 62 blog posts, all calculators, all research |
| Consent and disclosure | verbatim, unmodified | PASS | |
| Post-submit | `/book`, `/complete` | PASS | not a dead end without a token |
| Nurture | 8 steps | BLOCKER (delays) | runs 25 days, not 11; see engine report |
| Blog CTAs | `ctaCopyForCategory` | FIX | dead code on all 62 articles |
| Machine layer | one Organization node, correct description, no slogan, no priceRange | PASS | footer strapline is the exception, finding 3 |

### Entity block placement (requested for the relocation decision)

| Page type | Position vs FAQ | Position vs lead panel |
|---|---|---|
| `/` | above the FAQ | BELOW the lead panel (the only page that does this) |
| `/about`, `/services`, 14 `/for/*` | above the FAQ | above the lead panel |
| 62 blog posts, calculators, research, `/book`, `/complete`, `/thank-you` | absent | absent |

## 3. Blockers

**1. Free-call claim, all 41 routes.** The same class as Medical: promising the partner firm's
first call is free quotes their fee at zero.

| Surface | Pages | Now | Replace with |
|---|---:|---|---|
| Header nav | 41 | "Book a free call" | "Send an enquiry" |
| Foot panel button | 24 | "Book your free call" | "Send your enquiry" |
| Foot panel eyebrow | 16 | "Free call" | "Enquiry" |
| Blog panel and button | 62 | "Book a free call with a specialist contractor accountant." | "Send your situation to us and we will match it to a firm in our specialist partner network." |

Plus `/contact` step 03 ("Free introductory call... If we are the right fit, we will explain how we
work together."), the `/contact` title "Book a Free Contractor Accountant Call", the `/book` h1
"Book your free IR35 review call", `/complete` ("your free IR35 review") and `/research` ("on a
free call, with no obligation").

**2. "We review your contract" survived on 62 pages.** `niche.config.json` `blog.cta_body` was
never touched by `7ec4dd0f`. Live: "We will review your contract, your working practices and your
current structure. Plain English, no jargon." `llms.txt` on the same domain says "it does not
review contracts."
Replace with: "The firm reads your contract and your working practices against substitution,
control and mutuality, and puts the position in writing."
One other survivor, `/research`: "we will review your IR35 position". Calculators and `/for` pages
are clean.

**3. Footer strapline, all 41 pages.** "Contractor Tax Accountants. Specialist accountants for UK
contractors, PSC directors and IR35-affected workers. IR35 status advice, limited company tax,
umbrella vs Ltd comparisons, expenses, dividends and pension planning. Plain English, no jargon."
Three defects in one sentence: a practice claim, advice in our own voice, and "vs Ltd". It sits
directly above the correct legal line. care and charities already use a purely descriptive footer;
copy that shape.

**4. `/services` is entirely the old voice** and contradicts its own entity block five times.
Worst: "We give you a written opinion on your status and, if the position is borderline, we tell
you what would need to change."
Replace with: "The firm gives you the position in writing, including what would need to change
where it is borderline."

## 4. Fixes

- **Blog category CTAs are dead code, and this is the highest-leverage fix on the site.**
  `BlogPostRenderer.tsx:373-379` renders `niche.blog.cta_*`. `ctaCopyForCategory` is imported only
  by `blog/[category]/page.tsx:10,63`, the hub route. The renderer already receives `categorySlug`
  (line 28) and does not use it. `blog-categories.ts:15` asserts in its own comment that both
  consumers read the map; that is false. `blog-categories.test.ts` is green because it tests the
  map and never the render. Eight well-written category CTAs reach 7 hub pages and none of the 62
  articles. **Fixing this one line retires blockers 1 (blog rows) and 2 at the same time.**
- **Home stat band: three of four figures trace to nothing** in `house_positions.md`.
  "~£2k modelled annual saving" and "~2M contractors affected" are unsourced. "6 years HMRC can
  investigate" is wrong as a flat claim (4, 6 or 20 years by behaviour). Only "45 days" traces
  (s.61T).
- **All 14 `/for` pages share one foot-panel sentence** with the audience noun swapped, and none
  carries a liftable what-happens-next line near the form.
- **All 14 `/for` pages head a section "How we help / What we do for X"** directly above "it does
  not review contracts or file returns itself". Change the heading to "What the firm does for X".
- **Over-capture:** five surfaces on blog posts and calculators, two near-duplicate panels stacked.
- **`/book`** shows "Pick a day and a time window" above a fallback with no picker.

## 5. Owner calls

- **Widget auto-open** covering the entity block on `/about` and hero copy on `/for/it-contractors`
  at both widths. Reserved call; evidence logged, no removal proposed.
- **"Accountants for"** in 14 h1s, titles and the tagline. Reserved ranking call, already open.
- **New one: the home hero** carries the correct referral sentence but 200 words later says "Most
  contractors who call us have never had anyone sit down and model both scenarios... We do that."
  Whether home carries any first-person service claim is positioning, not a copy defect.
- **`/for/it-contractors`** is the known reader-voice page. Its body and opener are strong; only
  the closer fails. Half the reported defect, not all of it.

## 6. Withdrawn after checking (do not act on these)

- **No layout defect at 390.** The clipping in the first screenshot pass was a capture artifact
  (Edge headless does not emulate a mobile viewport; the same command clips gov.uk). contractors'
  homepage has zero overflowing elements at a true 390 viewport.
- **STILL VALID and unaffected:** the four-stat band stacks to ONE column at 390 because
  `sm:grid-cols-2` starts at 640. That is a CSS breakpoint fact, not a screenshot reading. Property
  uses `grid-cols-2`; copy it if two-up is wanted on phones.
- **Post-submit is not a dead end.** An untokened visitor gets "This page needs the personal link
  from your email or text message. If you cannot find it, use the contact form and we will arrange
  your review." plus a button to `/contact`.

## 7. Genuinely good, do not touch

The bodies across the 14 audience pages are strong and well differentiated. The machine layer
passes cleanly: one Organization node, correct referral description, no slogan, no priceRange, and
a clean legal line. The response-time test passes: nothing on the site states or implies one.
Calculators and `/for` pages are free of the old contract-review voice. Zero em-dashes, zero US
spellings.
