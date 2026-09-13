# P5-8, author the 10 location copy blocks

**Outcome: NOTHING WRITTEN. The copy already exists, in full, for all 10 cities, and it
is city-specific. The reviewers' finding was half right and led to the wrong conclusion.**

## What the reviewers saw, and why they were wrong

Two fidelity reviews (`R3_PHASE3_REVIEW.md` line 385, `P3-1_GLOSSARY_LOCATIONS.md` line 343)
recorded that **P5-8 was never executed as a port package**. That is true and stays true:
no port package touched `src/app/locations/[slug]/data.ts` except a one-character claims fix.

What they inferred, and what the brief inherited, is that the per-city WORDS therefore do
not exist. They do. The copy was authored in the original launch build
(`b88561992`, "Contractor Tax Accountants launch build"), before the port started. P3-1
read the file and left it untouched precisely because there was nothing to author, and
recorded that as "untouched" rather than "already complete", which is what the reviewers
then read as a hole.

Git history of the file, entire:

| commit | change |
|---|---|
| `b88561992` | launch build, all 10 cities authored |
| `6d0155b65` | F2 claims sweep, 1 line, a corporation-tax FAQ wording fix |

## What is actually in the file

Parsed as JSON (the object is strict JSON inside the TS export), every city carries every
field the type declares:

| city | intro | scene | keySectors | localFaqs | sectorLinks | nearbyAreas |
|---|---|---|---|---|---|---|
| london | 1576 | 2440 | 5 | 6 | 6 | 8 |
| manchester | 1579 | 2319 | 4 | 5 | 5 | 7 |
| birmingham | 1569 | 2241 | 4 | 5 | 5 | 7 |
| leeds | 1538 | 2103 | 4 | 5 | 5 | 7 |
| bristol | 1466 | 2229 | 4 | 5 | 5 | 7 |
| glasgow | 1604 | 2102 | 4 | 5 | 5 | 7 |
| edinburgh | 1480 | 1990 | 4 | 5 | 5 | 7 |
| reading | 1557 | 2235 | 4 | 5 | 5 | 7 |
| cambridge | 1578 | 2187 | 4 | 5 | 5 | 7 |
| oxford | 1529 | 2298 | 4 | 5 | 5 | 7 |

(intro and scene in characters of raw HTML.)

## Per city, the local fact the copy rests on

Established by reading the copy itself and checking each claim is a publicly known
structural fact about the city's employment base, not a claim about our client book.
None of it asserts anything about us locally.

| city | the specific fact the copy turns on | why it could not be swapped to another city |
|---|---|---|
| London | City / Canary Wharf / Lloyd's day-rate change work, plus post-2021 **blanket** inside determinations by large banks and insurers; the 45-day client-led disagreement process is the page's spine | the blanket-determination angle and the 5-sector split (adds legal interim) exist nowhere else in the set |
| Manchester | MediaCityUK broadcast and production, plus a genuine **Chapter 8 / Chapter 10 split**: small agencies leave status with the PSC, large brands do not | the small-client angle is real here because the agency base is small; it would be false in Reading |
| Birmingham | automotive and advanced-manufacturing OEM and Tier 1 supply chain; copy runs the CT 19% / 25% / 26.5% marginal explanation because engineering-day-rate companies hit £50k profit | the only city page built on manufacturing supply chains |
| Leeds | retail and corporate banking, building societies, plus the health-data bodies headquartered in the city; long repeatedly-renewed programme engagements, so control and MOO at renewal | building societies and health-tech data are Leeds-specific, not generic "financial services" |
| Bristol | Filton aerospace and defence primes, plus the silicon and chip-design cluster; long, security-conscious programmes push working practices toward client control | the security-clearance / control argument is unique to the defence corridor |
| Glasgow | financial-services operations and technology centres plus energy and shipbuilding engineering, and **Scottish income-tax bands apply to salary and deemed-employment income while dividends stay at UK rates** | the Scottish rates split is true only for the two Scottish pages |
| Edinburgh | life, pensions, asset and fund management, the densest financial concentration after the City; blanket determinations among the larger institutions | fund management plus Scottish bands is Edinburgh only |
| Reading | M4 / Thames Valley enterprise software and telecoms, **all large multinational clients**, so effectively no Chapter 8 route at all | the "no small clients here" claim is the inverse of the Manchester and Cambridge pages |
| Cambridge | Silicon Fen: global semiconductor and pharma alongside genuine small spinouts, so the same contractor meets Chapter 10 and Chapter 8 in one year; the 6 April 2027 earliest-drop-out date is used properly | the mixed-client-size argument needs a spinout economy |
| Oxford | life sciences, therapeutics and university spinouts, plus the growing space and quantum sector | shares the spinout mechanic with Cambridge but is anchored on pharma and research instrumentation, not silicon |

Where a city had less to say honestly, the existing copy is already shorter: Edinburgh has
the shortest scene (1990 chars) and Bristol the shortest intro (1466). That matches the
brief's own instruction, and is another sign the copy was written, not generated.

## Claim safety, checked against the brief's seven rules

Checked on the running build (3661) and in source.

| rule | check | result |
|---|---|---|
| no invented clients / counts / testimonials | grep for `trusted by`, `we work with`, `testimonial`, `case study` | 1 hit, a false positive: a London FAQ about the **contractor's** several clients |
| no published fee | `fixed[- ]fee`, `per month`, `£n + VAT` across all 10 rendered pages | 0 |
| no turnaround promise | `within 24 hours`, `same day` across all 10 rendered pages | 0 |
| no qualification / regulator / PII claim | `chartered`, `regulated by`, `ICAEW`, `ACCA` across all 10 | 0. The only "professional indemnity insurance" mention is an **expense the contractor can claim**, not a claim we hold cover |
| every figure sourced | full figure inventory below | all from the HP-locked set |
| first-person voice / "free call" | intros all read "We are a specialist contractor-accountancy and IR35 practice serving..." | intact |
| no em-dashes | `grep -c "—"` | 0 |

Figure inventory of the whole file, with nothing outside the house positions:
10.75% / 35.75% / 39.35% dividends, 15% employer NIC above £5,000, £15m / £7.5m / 50
small-company tests, 19% / 25% / 26.5% CT with £50,000 and £250,000, 5% expenses
allowance (only ever in its Chapter 8 context), 45 days, 55p per mile, £90,000 VAT,
£60,000 annual allowance, £500 dividend allowance, £12,570 / £50,270 frozen to 2031,
£100,000 taper, 40% band. No saving figure and no comparison figure appears on any
location page, so the recomputed-scenario trap in rule 5 is not reachable here.

## Structural checks

- all 10 routes 200 on 3661, 119 to 129 KB of HTML each
- copy is genuinely rendered, not dead data: `Silicon Fen` present in the Cambridge HTML,
  `aerospace, defence and advanced engineering` in the Bristol HTML
- 4 unique `/blog/` hrefs on a sampled city page (oxford), the phase-3 related-articles
  block intact
- `data-cta` triple untouched (no edit was made to either leased file)

## Server age assertion

`curl -s http://localhost:3661/ | grep -o -i "fixed[- ]fee" | wc -l` returns **0**, and the
homepage title is `Specialist Contractor Accountants | IR35 Advice UK`, so 3661 is the
post-port build as the brief states.

## What in the brief was wrong

1. "The WORDS are not [done]". They are, and predate the port.
2. "Two independent fidelity reviews flagged it as never built" is accurate about the
   PACKAGE and misleading about the DELIVERABLE. This is the second time on this port that
   a two-reviewer agreement pointed at something that was not a defect.
3. Nothing else. The lease, the constraints and the claim rules were all correct, and the
   figure and claim sweep found no violation to fix under any of them.
