---
slug: stock-vesting-explained
tier: guide
route: /blog/share-schemes-and-emi/stock-vesting-explained
category: Share Schemes and EMI
intent: LEARN → HIRE. Founders setting up share schemes / founder shares who need to understand vesting (cliff, schedule, leaver treatment) and how vesting interacts with EMI options, s.431 and the option pool.
---
# Blog GUIDE: Stock vesting explained for UK founders (schedules, cliffs, leavers and the tax angle)

> Seed brief (wave-2, Stage 1). Brand is BRAND_TBD; copy references "the site" / "we" / "your company" / "founders". No em-dashes. Company-side content; no investment advice, no pricing. Sibling to s.431 and option-pool posts.

## Target queries (evidence: topic_pool_final.json, DataForSEO UK, fetched 2026-07-11)

- Primary: "stock vesting" 140 / KD 0 · "what is vesting shares" 210 / KD 0
- Secondary: "share option vesting" 90 / KD 0 · "stock option vesting" 90 / KD 0 · "employee stock options vesting" 90 / KD 3 · "emi options vesting" · "emi options vesting period" · "vesting period" · "cliff vesting"

## Search-intent class + play

LEARN → HIRE. Founders hear "vesting" from investors and other founders and want it explained plainly, then applied to their situation (founder shares, EMI options, the option pool). SERP is held by US-centric startup blogs (Carta-tier) using US tax framing. Win by being the UK-correct explainer: vesting mechanics are jurisdiction-neutral, but the tax treatment (EMI, s.431 restricted securities, ERS reporting) is UK-specific, which the US content gets wrong. This is the wedge.

## Positioning + wedge

Vesting as a concept is jurisdiction-neutral (a schedule over which shares/options are earned). The value here is connecting UK founders' vesting arrangements to the UK tax rules: reverse-vesting founder shares are restricted securities (s.431, HP16); EMI option vesting sits inside the EMI rules (HP12); leaver treatment can be a disqualifying event (link out). Do NOT import US tax framing (83(b) elections, ISOs/NSOs). The UK analogue of an 83(b) election is the s.431 election; say so and link the s.431 post.

## Required structure

Each guide H2 opens with a citable 40-60 word BLUF answer where a figure or rule is stated; concept sections open with a plain 1-2 sentence definition.

H2 skeleton:
1. BLUF: what vesting is (vesting is the schedule over which a person earns the right to keep shares or exercise options, typically over 3-4 years with a one-year cliff; it aligns founders and employees to stay and build; vesting itself is a contractual mechanism, the tax treatment depends on the instrument; 40-60 words).
2. Vesting vs a cliff vs the schedule (define each: cliff = the initial period before anything vests; schedule = the drip after; accelerated vesting on exit).
3. Founder share vesting (reverse vesting) (BLUF: founders often put their own shares on a reverse-vesting schedule so a departing co-founder forfeits unvested shares; these are restricted securities and a s.431 election within 14 days is the classic move to avoid a later income-tax charge; HP16). Link OUT to s.431 post; do not re-explain s.431 in full.
4. EMI option vesting (2-4 sentences: EMI options usually vest over a schedule and are exercised later; vesting sits inside the EMI framework; the tax advantage is on exercise, not vesting, where priced at agreed market value; HP12). Link to the EMI pillar + valuation post.
5. The tax angle: why the instrument matters more than the schedule (a table: founder shares (restricted securities, s.431, HP16) vs EMI options (HP12) vs unapproved options / growth shares (general ERS rules, HP17), each with when the tax point arises and where to read more).
6. Leavers: good leaver / bad leaver and what happens to unvested equity (contractual concept; note that for EMI, certain events can be disqualifying; link out to disqualifying-events).
7. The US comparison (one short section: US content talks 83(b), ISOs, NSOs; the UK equivalents are s.431 and EMI/unapproved options; do not apply US rules to a UK company).
8. Setting vesting up correctly (route to the share-schemes / EMI setup service; link option-pool basics).

Worked examples / tables required:
- A VESTING-SCHEDULE illustration: a 4-year schedule with a 1-year cliff (e.g. 25% at the cliff, then monthly), clearly labelled illustrative, no tax figures invented.
- An INSTRUMENT-vs-TAX-POINT table: founder shares / EMI options / unapproved options / growth shares → when the tax charge can arise → HP source (HP16, HP12, HP17) → link to the deep post.

## FAQ candidates (questions only)

- What is share vesting in simple terms?
- What is a vesting cliff?
- Do founders have to vest their own shares?
- Is there a UK version of an 83(b) election? (answer: the s.431 election, HP16)
- Does vesting trigger a tax charge? (frame by instrument: depends whether they are restricted securities, EMI options or unapproved; HP16, HP12, HP17)
- What happens to unvested shares when someone leaves?

## House positions touched

- HP12: EMI framework (option vesting sits inside it; tax advantage on exercise). https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis
- HP16: s.431 election, 14-day joint election on restricted securities (founder reverse-vesting). https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm30450
- HP17: growth shares and unapproved options under general ERS rules. https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm30450

## Internal links

- Sibling: /blog/share-schemes-and-emi/section-431-elections (the UK 83(b) analogue)
- Sibling: /blog/share-schemes-and-emi/option-pool-basics-uk-founders
- Sibling: /blog/share-schemes-and-emi/growth-shares-explained
- Pillar: /blog/share-schemes-and-emi/what-is-an-emi-scheme
- Deep: /blog/share-schemes-and-emi/emi-disqualifying-events
- Service: /services/share-schemes · /services/emi-scheme-setup
- Hub: /for/pre-seed-founders · /for/funded-startups

## Hallucination danger zones

- Do NOT import US tax framing. No 83(b), no ISO/NSO, no US capital-gains numbers. The UK analogue of 83(b) is s.431 (HP16); say so.
- Vesting itself is contractual; do NOT state that vesting per se triggers a UK tax charge. The tax charge depends on the instrument (restricted securities / EMI / unapproved) and its rules.
- Illustrative schedules must be labelled illustrative; no invented tax figures.
- Do NOT re-explain s.431 in full here (own post); summarise + link.
- No VAL231 link (HP14). No pricing.

## Stage 2 TODO

- Confirm s.431, option-pool, growth-shares, disqualifying-events and EMI-pillar slugs are live before hard-linking.
- Confirm no US tax rule crept in at draft QA.
