# Answer-pattern spec: the three service pages, 2026-10

Language-pass output for the three service pages (blueprint §12.1; method `REWRITE_PROGRAM.md` §9.11), written 2026-10-09 before any drafting. Writers work to it; §12.3 reviewers check against it, not taste. Numbers: `LANGUAGE_PROBE_2026-10-09.csv`. Winner quotes: teardown HTML of twelve top-3 pages read in full. Our quotes: the rendered `.next/server/app/services/*.html` of 9 Oct.

Headline: the winners say "we" twice as often as we do and cite statute never. Our sentences are already shorter and easier than theirs, so the instruction is not "simplify". It is: speak as the firm, leave the law to the guides.

## 1. Measured targets

| Measure | Top-3 median | Ours now (6 pages; 3 service pages) | Target | Reasoning |
|---|---|---|---|---|
| Body words, FAQ excluded | 1,249 | 2,675; 3,104 to 3,407 | 1,600 to 2,400 | §3.1. Above the winners because the extra is the 4 to 7 offer items mirroring `hasOfferCatalog` and the fees and how-it-works slots R7 requires; FAQ sits outside the count. Any paragraph not mapping to a §3.1 item is cut. |
| Sentence length | 21.6 | 19.4 | 17 to 22 | Already in line. Do not shorten. |
| Flesch | 43.6 | 49.3 | 45 to 55 | Already easier than the winners. Hold. |
| Question headings | 16.7% | 22% | 20 to 35% | FAQ H3s carry the questions; body H2s stay statements. |
| "you/your" per 1,000 | 31.9 | 29.3 | 28 to 40 | Hold at or above the winners. |
| "we/our" per 1,000 | 24.0 | 12.6; 8.1 to 10.6 | 20 to 30 | Double it. Supersedes the §12.1 interim 8 to 12. |
| Statute per 1,000 | 0 | 4.1; 1.3 to 2.7 | 0, ceiling 0.5 | The guides carry the depth; a service page cites by linking the guide. |
| Jargon per 1,000 | 0.48 | 2.7; 1.8 to 5.9 | 1.0 or below | Plain names; mechanisms live in the guides. |
| Numbers per 1,000 | 18.9 | 32 | 15 to 25 | In worked examples and FAQ answers only (pattern C). |
| Paragraphs over 80 words | not measured | not measured | none outside a worked example | Not in the probe; reviewer read until check 14 adds it. |

"Ours now" is the six-page median, then the three service pages where they differ.

## 2. Answer patterns

| Pattern | Winner (verbatim) | Ours, same point (verbatim) | Rewrite rule |
|---|---|---|---|
| A. Opening a section | "Our specialist property accountants work with property owners across the country." (djh.co.uk) | "A specialist property accountant closes that gap." (property-accountant) | First sentence under any heading answers it in the first person ("We do X for Y"); context second. The opening paragraph (§3.1 item 3) leads with one definition-shaped sentence, the shape AI overviews lift (teardown §d). |
| B. Question into heading | H3 "Do I need to hire a landlord tax accountant?" then "As a landlord you do not have to hire a property accountant by law." (andrewpasser.com) | H3 "Do I need an accountant for one rental property?" then "Not necessarily." (landlord-accountant) | FAQ H3 is the People Also Ask string verbatim; the answer's first five words settle it; the next sentence names what flips it. Ours already does this; keep it. Body H2s are plain labels carrying the phrase, never teasers like "Most people arrive here saying one of these". |
| C. Where the number goes | "A property bringing in £1,200 per month in rent may look attractive. That is £14,400 per year before costs." (fhpaccounting.co.uk) | "Dividend rates rose to 10.75%, 35.75% and 39.35% from 6 April 2026, which changes the salary and dividend mix that used to be automatic." (property-accountant) | One number per point, in a worked example or FAQ answer, tied to the reader's decision; rate sets link to `/property-tax-rates`. Our model, landlord page: "£50,000 of rent, £8,000 of running costs, £18,000 of mortgage interest." |
| D. Handling "it depends" | "Fees depend on the complexity of the matter. We provide a clear scope of work and fee proposal before commencing an engagement." (ctatax.uk.com) | "It depends entirely on the question." (property-tax-advice) | Name two to four variables in the same sentence, then a "we" sentence saying what we do with them. Our property-accountant fee FAQ ("It depends on how many properties you hold, whether they sit personally or in a company...") is the model. |
| E. Handing off to the call | "If you’re serious about protecting your property wealth and keeping your tax bill to a minimum, let’s talk." (uklandlordtax.co.uk) | "Not sure which of these you actually need? That is what the first call is for." (property-accountant) | At most one per section, after the answer, saying what the free call settles. No urgency, no guarantee. Ours is the better model. |
| F. What the winners leave out | "We’re experienced across all the key tax areas relevant to property, including:" followed by four tax names and nothing else (bhp.co.uk) | "Writing down allowances fall from 18% to 14%, a new 40% first year allowance applies, and the special rate pool stays at 6%." (property-tax-advice) | Name the tax, link the guide, stop. |

What the winners omit that our pages carry (cut, or leave to the guides):

- Statute by number: "incorporation relief under section 162", "checks the section 198 election on purchase", and a guide-card excerpt citing "Finance Act 2026 c.11 section 7" (card excerpts count as body text).
- Claim-deadline mechanics: "by the first anniversary of the 31 January following the tax year of the transfer", in two FAQs.
- Rate sets repeated on all three pages: 22/42/47%, dividend rates, 14/40/6% allowances, employer NI.
- Back-office nouns: CT600, intercompany balances, special rate pool.
- Persona quotes and comparison tables rendered twice in the HTML.

Their surplus over us (phone, reviews, named staff, fees) is the deferred facts, absent by ruling (R7).

## 3. Owner-voice examples

STATE.md 0.22a to 0.22c record design rulings, not copy, except the `/for-letting-agents` standfirst rewritten in 0.22b. The rest come from `/about` and the homepage.

| # | Sentence (verbatim) | Source | Why it is us |
|---|---|---|---|
| 1 | "We only work on landlord and property tax. Nothing else." | `app/about/page.tsx` | Scope stated as a limit, two flat sentences. The D3 wording. |
| 2 | "It also means the conversation is more efficient: you don't have to explain what Section 24 is." | `app/about/page.tsx` | Benefit seen from the reader's chair. |
| 3 | "A generalist accountant will work with what you give them, but that's not the same as understanding how a property portfolio actually operates." | `app/about/page.tsx` | Fair to the competitor, then the gap. No "best". |
| 4 | "Most accountants can't answer these questions off the top of their head because they don't see enough landlord clients." | `app/about/page.tsx` | Gives the reason, in spoken idiom. |
| 5 | "We don't wait for you to ask." | `app/about/page.tsx` | Six words, first person, a promise of behaviour. |
| 6 | "If incorporation would save you money, we'll model it." | `app/about/page.tsx` | Condition, then what we do. No outcome promised. |
| 7 | "Plain English explanations, not accounting jargon." | `app/about/page.tsx` | Says the register out loud. |
| 8 | "We do not serve restaurants, retailers or consultants." | `app/about/page.tsx` | Concrete exclusions instead of "specialist". |
| 9 | "If your situation changes mid-year, we will tell you before any additional fees apply." | `app/about/page.tsx` | A fee commitment with no figure. R7-safe. |
| 10 | "If your position is already right, we will say so." | `app/about/page.tsx` (`LeadCTAPanel` footnote) | Permission to not buy. |
| 11 | "Property tax sorted, your way, with ease." | `app/page.tsx` (hero) | The owner's own cadence; short, warm. |
| 12 | "Give them a straight answer at the desk, run the number in front of them, and forward a page that settles it." | `app/for-letting-agents/page.tsx` (0.22b rewrite) | Three verbs, the reader's task, no adjectives. |

Not to lift from those same files: "Your enquiry is not spread across a list." (`/about`) contradicts the privacy policy line "More than one firm may receive your enquiry."; "Every client is a landlord, investor, or developer." (`MarketingSections.tsx`) is an "every client" claim and names developers, which `entity.firm` does not.

## 4. Do-not-copy list

`house_positions.md` §13 is the general do-not-write list and applies in full. The service-page specifics:

| Habit | Winner doing it (verbatim) | Forbidden by |
|---|---|---|
| Fee figures | "As a benchmark, a single buy-to-let landlord typically pays between £200 and £450 per year." (gmprofessionalaccountants.co.uk; thepropertyaccountant.co.uk prints a per-property table) | R7; §3.1 item 8 |
| Response-time guarantee | "If you contact us with a query before 3pm on any working day, we will respond that very same day or we’ll issue you with a £50 compensation payment." (gorillaaccounting.com) | R7; §3.1 item 9; §12.1 part 4. Our "questions answered inside 24 hours" is not repeated in body copy. |
| "Every client" promise | "Therefore, we offer our clients their very own dedicated accountant." (gorillaaccounting.com) | §3.1 item 9; §12.1 part 4. Ours to remove: "Every client here is a landlord, investor or developer. Nothing else." and "Every client of this practice is a landlord, investor or property business." |
| Professional body claim | "RITA (Rental Income Tax Advisors) are a member practice of the Chartered Institute of Taxation (CIOT)." (nrla.org.uk) | R7 |
| Aggregate ratings | "GM Professional Accountants supports personal landlords, SPVs and serviced accommodation operators with fixed fee packages and 150+ five-star reviews." (gmprofessionalaccountants.co.uk); "Based on 110 reviews" (perrigoconsultants.co.uk) | §3.1 schema (no `aggregateRating`); §12.1 part 4 |
| "near me" strings | H3 "Need an Accountant in near you?" (andrewpasser.com) | R5. Ours to remove: H3 "Do I need a property accountant near me?" and H2 "Looking for a landlord accountant near you". |
| Local-pack bait | "Come and visit us at: Mayesbrook House, Lawnswood Business Park, LS16 6QY." (bhp.co.uk); a borough list ending "Greater London - UK - UK" (andrewpasser.com) | R8; R4; §3.1 item 13 |
| Superlatives | H3 "Our industry expertise is 2nd to none" (djh.co.uk); "The UK’s Most Trusted Accountancy Firm" (gorillaaccounting.com) | `house_positions.md` §13. Ours to remove: the "Most recommended" label on both comparison tables. |
| Sentences that exist for a query | "So if you’re looking for a property accountant, your search stops here." (gorillaaccounting.com) | R5 |
| Unbacked savings claims | "Proven tax-saving strategies, often saving clients more than the cost of our fees" (uklandlordtax.co.uk) | `standard_terms` §4 (every number re-derivable); R7 (no fee to compare against) |

## Writer's card

1. Say "we". One first-person sentence in most paragraphs; 20 to 30 per 1,000 words.
2. Answer the heading in the first sentence. Context comes second.
3. Name the tax, link the guide. No section numbers, no Finance Act citations.
4. One number per point, in a worked example or an FAQ answer. Rate sets live on `/property-tax-rates`.
5. "It depends" is followed by the variables and by what we do with them.
6. FAQ headings are the People Also Ask question word for word. Body H2s are plain statements.
7. One hand-off per section at most, after the answer, saying what the free call settles.
8. No fee figures, response times, "every client", professional bodies, ratings or "best".
9. No "near me", no stacked "UK". Cities appear only in the locations block.
10. Do not simplify. Cut repetition, not substance, and read each section against the twelve owner sentences.
