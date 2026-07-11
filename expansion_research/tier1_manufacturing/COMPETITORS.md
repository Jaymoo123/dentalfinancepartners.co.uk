# Manufacturing & engineering accountancy — verified competitor field (R3)

Date: 2026-07-12. Method: 36-query SERP sweep (DDG-only, Serper out of credits — one probe
confirmed 400) → 204 surviving domains → 204 fetch-verified (`s2_verify_fetch.py`,
`raw/verify_evidence.json`) → Claude tier judgment (`s7_competitors_build.py` →
`competitors.json`). Live web search used only to recover bot-blocked domains and surface
rank-relevant rivals our DDG sweep missed.

## Headline

**1 DEDICATED + 37 SECTION = 38 verified rivals.** The dedicated tier is near-empty as R2
claimed — but the section tier is dense and institutional, which changes the verdict (see
DOSSIER.md). The adjacent layer (R&D-tax boutiques, capital-allowances valuers, M&A
brokers, CBAM software) owns most of the service long-tail.

## DEDICATED (whole brand = manufacturing/engineering accountancy): 1

| Domain | Evidence (quoted from fetch) |
|---|---|
| skynetaccounting.co.uk | Title "Accountants For Manufacturing & Engineering Business Owners"; H1 "Driving Manufacturing Profit"; services: Product Costing Accountant, Manufacturing Efficiency Audit, Virtual Finance Office for factory owners; service page H1 "Manufacturing Accountant For Factory Owners". 8 queries hit — the single genuinely dedicated brand found. |

No exact-match domains (manufacturingaccountants.co.uk-style) surfaced in the sweep or in
live search — unlike care (2 exact-match rivals) and pharmacy niches.

## SECTION (real firm with a manufacturing/engineering sector page): 37

Full evidence strings in `competitors.json`. Notable weight classes:

**National / large regional (institutional layer — the real fight):**
- mha.co.uk — top-15 national; "specialist teams of manufacturing and engineering accountants"
- azets.co.uk — top-10 SME firm; /who-we-help/sectors/engineering-and-manufacturing/
- pkf-francisclark.co.uk — "more than 300 manufacturing and engineering businesses" as clients
- bhp.co.uk, ensors.co.uk, duncantoplis.co.uk, streets.uk, hurst.co.uk ("specialist advisors... since 1982"), sumer.co.uk, aab.uk, eqaccountants.co.uk, forrester-boyd.co.uk

**Regional/local chartered with dedicated pages:** chandlerandpartners.co.uk (10 sweep hits),
rousepartners.co.uk, ac-accounts.co.uk, davidhoward.co.uk, cottonsgroup.com, parsons.co.uk,
bryden-johnson.co.uk, smithbutler.co.uk, ross-brooke.co.uk, rickardluckin.co.uk,
leesaccountants.co.uk, knowleswarwick.com, ctmp.co.uk, edwardsaccountants.co.uk,
mollan.co.uk, numericaccounting.co.uk, insight-sa.com, williamsoncroft.co.uk,
ljsaccountingservices.com, bsassociate.co.uk

**SEO-led online players:** strivex.co.uk, braant.co.uk, lanop.co.uk (engineers page + R&D),
auditox-accountancy.uk (multi-niche programmatic; also in care + hospitality sweeps),
pearllemonaccountants.co.uk (ranks a "Top 10 UK Manufacturing Accountants" listicle)

## Adjacent players (not accountancy rivals, but own the long-tail SERPs)

| Layer | Domains seen in sweep | What they own |
|---|---|---|
| R&D-tax boutiques | forrestbrown.co.uk, empowerrd.com, randduk.com, rck.partners, tbat.co.uk, momentumtaxgroup.com, rdtaxcredit.org.uk, innovationtax.co.uk, iptaxsolutions.co.uk, invocapital.co.uk, recoupcapital.co.uk | "r&d tax relief manufacturing" and calculator SERPs — dense, VC-backed, own tools |
| Capital-allowances valuers | lovellconsulting.com | plant & machinery CA advisory |
| M&A / brokers | theprecisionfirm.com ("Manufacturing M&A Advisors"), dexteritypartners.co.uk, entrepreneurshub.co.uk, business-sale.com, hiltonsmythe.com | buy/sell a manufacturing business |
| CBAM / carbon | carbonchain.com, emmasys.com, alupro.org.uk | CBAM queries — no accountant owns these yet |
| Software / MRP | statii.co.uk, sage.com, xero.com, erpresearch.com, netsuite.com | WIP/standard-costing/stock-valuation informational SERPs |
| Tool site | depreciationscalculator.co.uk (HMRC capital allowances calculator) | rival calculator precedent |
| Education | accountingcoach.com, learn-ict.org.uk | costing-theory definition queries (DIY/student intent) |

## Unverifiable candidates (excluded, not guessed at)

Fetch failed (403/202/0/SSRF) and live-search recovery not attempted or inconclusive:
crowe.com, pricebailey.co.uk, gravita.com, mitchellcharlesworth.co.uk, accountsandlegal.co.uk,
bluejayaccountants.co.uk, quilliammarr.co.uk, mhcandco.co.uk, hich.co.uk, jamesdixey.co.uk,
greenandco.com, kirkrice.co.uk, hamiltonwoodandco.co.uk, alexanderclifford.co.uk,
abgi-uk.com, granttree.co.uk, auditgroup.co.uk, groupams.co.uk, gorillaaccounting.com,
merrantiaccounting.com, hitingsllp.co.uk (SSRF-blocked), elliottsshah.co.uk (SSRF-blocked),
alkerthompson.co.uk (SSRF-blocked). Several are certainly real firms (Crowe, Price Bailey,
Mitchell Charlesworth are known nationals with manufacturing pages) — the true SECTION count
is therefore, if anything, HIGHER than 37, which strengthens the contested-field reading.

## Drop log (from s1)

- 2 estate domains dropped pre-verify (hollowaydavies.co.uk, propertytaxpartners.co.uk); hard
  assert confirmed zero estate leaks into survivors.
- 14 directory/info/gov domains dropped (list in `candidates.json`).
- Non-rival survivors judged out at s7: job boards (adzuna, michaelpage, castle-employment,
  theovalpartnership, morepeople), directories (gbrbusiness, theaccountingfactory,
  britishbusinessblog), trade bodies (makeuk-adjacent: madesmarter.uk, the-mtc.org,
  manufacturingni.org, aerospace.co.uk, blackcountrychamber, scottish-enterprise,
  nibusinessinfo), generic accountants with no mfg page (icsuk, qaccounting, accotax,
  mjkane, morriscook, hazlewoods, ymaconsultants, protaxaccountant, etc.), software/fintech
  (tide, gocardless, reai, tinytax, taxpipe, pie.tax), grant platforms (grantup, grantscom,
  grantmatch, swoopfunding, hicrafty), media/info (manufacturingdigital, business-money,
  rossmartin, legalclarity, businessguides, mepsinternational, accountingweb), misc
  (prosura insurance, pinsentmasons law, deloitte/bdo/rsm big-4-tier with no dedicated mfg
  accountancy landing in sweep evidence, cleartools, thedutyspecialists, etonvs,
  smebusinessvaluation, uk.meruaccounting, vjmglobal, aviaanaccounting, acobloom,
  accusolveaccountants, expandaccounts, fusiondiagnosticsolutions, sasaccountant*,
  sigmachartered*, bcaaccountants*, cadreadvisory*, dsburge*, doublepoint*,
  business-accounting.co.uk*, pulse-accountants*, championgroup*, djh*, hawsons*,
  bishopfleming*, kbmuk*, agileaccountants*, edwards CA-page-only cases).
  *Starred = firms whose sweep presence was an R&D/capital-allowances SERVICE page, not a
  manufacturing SECTOR page; they compete on the R&D long-tail, not the niche head terms.
