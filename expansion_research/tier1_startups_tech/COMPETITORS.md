# Verified competitor field — Startups & tech/SaaS (R3, Tier-1 #4)

Date: 2026-07-11. Method: 35 UK SERP queries (Serper gl=gb + DDG uk-en, `raw/serp_raw.json`),
200 domains seen → estate filter (0 estate leaks, hard-assert passed) + directory filter →
195 survivors → **every survivor fetch-verified** (`raw/verify_evidence.json`; 149 fetched OK,
46 blocked/failed, 16 of the highest-value blocked domains retried with browser UA in
`raw/verify_retry.json`, 9 recovered). Structured output: `competitors.json`.

R2 lesson applied: no US players survived into the competitive set (pilot.com/bench/kruze never
ranked on UK SERPs; softwarestrategiesblog.com and pearllemonaccountants.com dropped on US
signals). The redteam's finding that "SaaS specialists are real UK firms" is confirmed again.

## Tier 1 — Specialist startup/tech accountants (the fight we're actually in) — 15 verified

| Domain | SERP hits | Evidence (fetched 2026-07-11) |
|---|---|---|
| accountancycloud.com | 1 | "#1 Founder's Choice for Startup Accounting"; dedicated R&D service page (/what-you-get/r-and-d). The category leader; 863-URL sitemap, 500+ ranked keywords pulled |
| barnesandscott.com | 4 | "chartered accountants for Tech, Fintech & Start-ups"; UK-expansion-for-startups service page |
| onthegoaccountants.co.uk | 4 | "Tech Startup & High Growth Accountants"; who-we-help incl. Tech Startups, US & EU Startups |
| standardledger.co | 4 | "Startup Accounting & CFO Services \| Standard Ledger UK"; R&D, SEIS/EIS advance assurance, valuations. AUS-origin with real UK arm — kept, flagged |
| finerva.com | 2 | services nav = "SEIS Advance Assurance, EIS Advice & Support, Share Schemes, Fractional CFO" — the closest model to our positioning |
| startupaccountancy.com | 6 | "Startup Accountants UK \| Fixed Monthly Pricing" — £345/mo and £675/mo tiers (mid-market, NOT £10-commodity) |
| chacc.co.uk | 10 (highest) | retry-verified 200, 35 topic mentions; ranks broadly across startup/tech/funded-startup queries |
| quilliammarr.co.uk | 5 | retry-verified 200, 40 mentions; SaaS/revenue-recognition queries |
| acctek.co.uk | 4 | who-we-help/startup-accountant-uk page; runs guides/checklists/calculators hubs (closest to estate playbook) |
| trtaxadvisers.com | 1 | "Startup Accountants For Tech Companies, London \| Tech Relief" |
| mtatarandassociates.co.uk | 1 | "Tech Accountants in London \| Accountant for Startups" |
| nuvem9.co.uk | 1 | "Accounting for SaaS companies" service page |
| chartaccountancy.com | 3 | retry-verified 200: "Accounting for Tech Businesses \| Simple, Fast & Scalable" |
| saasaccountants.co.uk | 4 | exact-match domain "SAAS ACCOUNTANTS"; thin brochure (6 mentions, 113-URL sitemap) — owns the head term on domain match, beatable on depth |
| reflexaccounting.co.uk | 3 | "Specialist SaaS Accountants" who-we-serve page — **⚠ this is the estate's lead-buying partner (Reflex/Ahmad). Direct positioning collision — owner decision needed** |

## Tier 2 — R&D-tax vertical specialists (compete on the R&D cluster only) — 10

forrestbrown.co.uk (the category authority), randduk.com (merged/ERIS explainer + calculator),
randdtax.co.uk, taxcloud.co.uk (software+expert hybrid), swansonreed.co.uk, rdrelief.co.uk,
randdtaxcreditspecialists.co.uk; Cloudflare-blocked but SERP-verified with startup/R&D titles+
snippets: alexanderclifford.co.uk, sourceadvisors.co.uk, granttree.co.uk. This tier owns the
"r&d tax credits" head (KD 24-37); we attack the startup-context long tail, not the head.

## Tier 3 — Equity/legal platforms (own SEIS/EIS/EMI SERPs; not accountants) — 6

vestd.com (5 hits — dominates EMI queries), seedlegals.com (blocked, SERP-verified), advanceassured.co.uk,
seisadvanceassurance.co.uk, millconsultancy.co.uk (EMI consultancy), sapphirecapitalpartners.co.uk.
These win informational SERPs with product content; an accountant-voiced tax-consequences angle
is the flank (they can't give the salary/dividend/BADR full picture).

## Tier 4 — Fractional CFO firms — 8

startup-cfo.co.uk, thrivegrowth.co.uk, scalewithcfo.com, emergeone.co.uk (VC-backed focus),
aiaccounts.co.uk, growthcfo.co.uk, gocfo.co.uk, fdcapital.co.uk. Adjacent service line;
relevant because "startup cfo services" queries return them, and our /for/funded-startups page
competes here.

## Commodity online tier (the R2 caveat made flesh) — 12 verified

sleek.com (8 hits — broadest commodity footprint), goforma.com (£14-£126/mo menu),
a-wise.co.uk (from £10/mo), 123financials.com (£37.99/mo), eternityaccountants.co.uk
(£7.50-£84.50/mo), rsbc.uk (£15-£45/mo), business-accounting.co.uk, accotax.co.uk,
theaccountancy.co.uk (blocked; £23.70/mo per R2 redteam), zatrsaccounting.com, tax-wise.co.uk,
fusionaccountants.co.uk. **Confirmed: the "accountants for startups" head-term SERP is a
£10-38/mo price war. We do not enter it.** Positioning per R2: funded/scaling companies —
R&D, SEIS/EIS, share schemes — where the evidence above shows specialist pricing at £345-675/mo
(startupaccountancy.com) and CPCs of £27-59.

## Also seen

- Generalist chartered firms with a tech page (Hurst, Hazlewoods, BDO, BHP, Plus Accounting,
  UHY Ross Brooke, Hawsons, Unicorn, CIGMA, Haslers, Clarkwell) — regional/mid-market, strong
  domains but non-specialist; beatable on topical depth per estate playbook.
- startupaccountants.uk — a lead-gen matching directory ranking well on the head cluster
  (m=173): evidence that lead-marketplace economics work in this niche.

## Dropped

- Non-UK/info/out-of-scope: softwarestrategiesblog.com (US blog), pearllemonaccountants.com
  ("International"), equidam.com (valuation SaaS, NL), ventsmagazine.co.uk, legalfoundations.org.uk,
  zelt.app (HR SaaS), swoopfunding.com, harperjames.co.uk + buckworths.com + sprintlaw.co.uk
  (law firms), smebusinessvaluation.com.
- Estate: 0 leaks (hard assert in s1 passed).
- Directories: startups.co.uk, unbiased, bark, clutch etc. filtered by list.
