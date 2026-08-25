# C2: Placement, where each of the 89 niches lives

Date 2026-08-25. Leg C2 of the niche-map redefinition, run under the strategic
correction in `docs/_engines/PROPERTY_STANDARD_ROLLOUT.md` §6.3: **coverage is the
strategy, demand and commercial value no longer gate, and the only substantive
question left per niche is which site hosts it.**

**Zero paid API calls.** No DataForSEO request was made, `DATAFORSEO_ABORT_AT` was not
read or raised. Every measurement below comes from Google Search Console and Bing
Webmaster Tools (our own free APIs) or from files already on disk.

`expansion_research/R2C_OVERLAP.md` is untouched. It remains the historical record of
the 2026-07-11 run.

---

## 0. Commands and data-through dates (trap 5: a value without its deriving command is inadmissible)

### 0.1 The corpus pull

| What | Value |
|---|---|
| GSC window requested | **2026-05-27 to 2026-08-25** (90 days) |
| GSC data-through, every site | **2026-08-23** (Google's standard 2-day lag; verified per site by a `dimensions:["date"]` probe, `max(date)`) |
| GSC method | `searchanalytics().query(siteUrl=<site.gsc_property_url>, body={"startDate":"2026-05-27","endDate":"2026-08-25","dimensions":["query"],"rowLimit":25000})` via `agents.utils.gsc_client_oauth.GSCClient` |
| Bing pull | `BingQueryFetcher(site_key).client.get_query_stats(site_url)` (`optimisation_engine/clients/bing_query_client.py:127`), pulled **2026-08-25** |
| Bing caveat, stated not buried | `GetQueryStats` returns a **rolling provider-side snapshot**, not a window we choose. It is not a 90-day slice and cannot be made into one. It is unioned into the corpus as a second free signal, exactly as the July run did |
| Sites pulled | **15 live** (`optimisation_engine.config.get_sites(active_only=False)`, minus the two internal `niche_screener*` rows which have no `gsc_property_url` and no BWT site) |
| Not pulled, and why | `wills-probate` and `divorce-finances` have `sites/` configs and built corpora but **no row in the prod `sites` table**, so no GSC property and no Bing site exist for them. They are not live and cannot host anything. Flagged, not guessed |
| Stored snapshots used | **None.** `gsc_query_data` was never read and never summed (`standard_terms` §5: ~20x undercount) |

Scratchpad script that ran it (session-ephemeral):
`<scratchpad>/nichemap/pull_90d.py` -> `<scratchpad>/nichemap/corpora/<site>_queries.csv` + `pull_meta.json`.

**Corpus actually built, per site** (90d GSC unioned with the Bing snapshot, deduped on normalised query):

| Site | GSC queries | GSC clicks | GSC impressions | Bing queries | Bing clicks | Bing impressions | Unique queries in corpus |
|---|---|---|---|---|---|---|---|
| property | 5,927 | 104 | 46,417 | 1,400 | 897 | 9,631 | **6,998** |
| generalist | 2,182 | 2 | 24,782 | 1,202 | 410 | 15,607 | **3,138** |
| solicitors | 876 | 9 | 8,561 | 1,221 | 419 | 5,573 | **1,939** |
| dentists | 580 | 10 | 8,782 | 718 | 217 | 2,650 | **1,208** |
| medical | 217 | 3 | 4,488 | 648 | 217 | 1,095 | **830** |
| agency | 274 | 0 | 2,391 | 381 | 64 | 651 | **632** |
| construction-cis | 384 | 2 | 3,895 | 236 | 50 | 461 | **597** |
| charities | 529 | 2 | 4,667 | 63 | 24 | 115 | **587** |
| startups-tech | 449 | 1 | 2,450 | 15 | 1 | 15 | **464** |
| ecommerce | 202 | 0 | 1,463 | 65 | 1 | 80 | **266** |
| contractors-ir35 | 149 | 0 | 1,236 | 109 | 8 | 186 | **253** |
| hospitality | 107 | 0 | 444 | 85 | 7 | 178 | **185** |
| care | 94 | 0 | 1,495 | 32 | 5 | 46 | **125** |
| crypto | 47 | 0 | 174 | 8 | 0 | 11 | **55** |
| pharmacies | 42 | 0 | 260 | 10 | 0 | 11 | **52** |

Property's 90-day corpus is 6,998 unique queries against the **7,483** rows in the July
file (`wc -l expansion_research/corpora/property_queries.csv`), and solicitors is 1,939
against 2,048. **Corpus size did not grow uniformly and containment is not monotonic in
window length**, because the Bing half is a rolling provider snapshot rather than a
fixed window. Three rows fell to zero as a result (§7.3). The July corpora files are
still on disk at `expansion_research/corpora/` and were not overwritten; the new ones
were written to the scratchpad.

### 0.2 The containment re-run

`expansion_research/r2_overlap.py` was **hardcoded to 8 sites** at lines 20-21 while
`sites/` carries 17 configs. Rather than fork it into the scratchpad, three additive
lines were added so a re-run never has to fork it again. **Reported as instructed;
uncommitted; nothing else in the file changed** (scoring, thresholds, GENERIC/INTENT
sets, calibration pairs and judgment overrides are byte-identical):

```
SITES   = os.environ.get("R2_SITES", ",".join(SITES)).split(",")
CORPORA = Path(os.environ.get("R2_CORPORA", HERE / "corpora"))
OUT     = Path(os.environ.get("R2_OUT", HERE))
```
plus the three call sites that consumed `HERE / "corpora"` and `HERE / "R2C_OVERLAP.md"`
now read `CORPORA` and `OUT`. **Defaults are unchanged**, so `python r2_overlap.py` with
no environment still reproduces the July behaviour exactly.

The run:

```
cd expansion_research
R2_SITES="property,dentists,solicitors,medical,generalist,agency,contractors-ir35,\
construction-cis,crypto,care,charities,ecommerce,hospitality,pharmacies,startups-tech" \
R2_CORPORA=<scratchpad>/nichemap/corpora \
R2_OUT=<scratchpad>/nichemap/repro \
python r2_overlap.py
```

Verified: the patched repo script reproduces the scratchpad run with **0 containment
mismatches across all 89 rows**.

**Calibration re-checked on the new corpus before any verdict was read** (the known
pairs the script ships with):

| Pair | Expected | 90d containment | Support |
|---|---|---|---|
| #1 landlords vs property | overlap | 0.97 | 407 |
| #28 solicitors vs solicitors | overlap | 1.00 | 242 |
| #17 locum doctors vs medical | overlap | 1.00 | 39 |
| #15 dentists vs dentists | overlap | 0.67 | 119 |
| #2 property investors vs property | overlap | 0.57 | 24 |
| #30 IT contractors vs contractors-ir35 | overlap | 0.48 | 8 |
| #48 marketing agencies vs agency | overlap | **0.32** | **1** | 
| #68 farmers vs dentists | clean | 0.00 | 0 |
| #37 content creators vs solicitors | clean | 0.00 | 0 |
| #53 restaurants vs contractors-ir35 | clean | 0.00 | 0 |
| #46 photographers vs medical | clean | 0.00 | 0 |

Separation holds (overlap >= 0.48 except one, clean = 0.00), so the calibrated
thresholds carry over unchanged: **EXCLUDE >= 0.45, CAUTION 0.20-0.44, CLEAR < 0.20**.
The one soft pair is #48, which is the same corpus blind spot the July run wrote a
judgment override for: the agency site IS "accountants for agencies", its corpus just
does not carry that phrasing. Site scope is ground truth there, not the corpus.

### 0.3 Host-fit tests (a) and (b)

Per §6.3.7, C2 selects **candidate** hosts; the host is chosen by three tests.

| Test | Instrument | Command |
|---|---|---|
| (a) ground truth | keyword-mention count over `docs/<site>/house_positions.md`, all 15 sites | `<scratchpad>/nichemap/binding_mass.py` -> `binding_mass.json`, field `gt_mentions` |
| (b) binding mass | pages on the host whose **URL path** matches the niche family, counted from that site's own live `sitemap.xml` (recursively resolving sitemap indexes), pulled 2026-08-25 | same script, field `mass`; raw inventory in `sitemap_inventory.json` |
| (c) brand fit | judgment against §6.3.1 point 5 (every estate brand is an ACCOUNTING brand; a niche whose buyer is not buying accountancy from that brand cannot be absorbed by it at any containment score) | recorded per row in the table below |

Live page counts the binding-mass pull measured (sitemap URL counts, 2026-08-25):
property 848, generalist 729, agency 436, dentists 283, solicitors 274,
construction-cis 246, contractors-ir35 157, medical 130, startups-tech 68,
charities 66, care 55, hospitality 55, pharmacies 55, crypto 51, ecommerce 51.

**Three honest limitations on the host-fit instruments, stated rather than papered over.**

1. **Binding mass is counted on the URL path, not the whole URL.** A first pass matched
   the full URL and every site's own domain scored against itself (`pharmacytax` contains
   `pharma`, `contractortaxaccountants` contains `contractor`, `agencyfounderfinance`
   contains both `agency` and `founder`), inflating six niches to a site's entire page
   count. Fixed before any verdict was read.
2. **Ground-truth mention counts carry substring noise** (`statutory` contains `tutor`,
   `published` contains `publish`). They are used **directionally only**, never as the
   deciding number, and any row where `gt` was the swing factor says so in its note.
3. **Binding mass of 0 is not, on its own, a host-fit failure.** The farming precedent
   counted 8 exact-slug posts and the dossier then widened it to 61 in-scope pages by
   `slug/title match UNION 5+ body mentions`. Where a host's whole corpus is the adjacent
   family (medical's 130 private-practice pages for opticians), the cluster binds even
   with an exact-token count of zero. Rows in that position say so.

### 0.4 Sizing input

`expansion_research/nichemap_2026-08-25/C3_DEMAND.md` deduplicated volume column, read
as a **sizing input only**. Under §6.3 a low number sizes a smaller cluster; it can
never produce a NO-BUILD. Shapes used: `section + 1-2 pages` / `cluster 3-5` /
`hub 12-15 + supporting` (one cohort, `NETNEW_PROGRAM.md:233`) / `site`.

---

## 1. The answer, in four numbers

| Verdict | Count |
|---|---|
| **ABSORBED-ALREADY** (a live site covers it today) | **32** |
| **ABSORB into a named live site** | **54** |
| **STANDALONE** (needs its own site) | **2** |
| **NO-BUILD** (C1 BLOCKED) | **1** |
| **Total** | **89** |

**With 15 sites live, the estate already owns a host for 87 of 89 niches.** That is the
headline. The July table's premise, that this exercise would produce a queue of new
domains, is wrong: it produces a queue of clusters on sites that already exist, already
convert and already have a running domain-trust clock.

### ABSORB, by receiving site

| Host | New niches | Also already hosts |
|---|---|---|
| `generalist` (Holloway Davies) | **23** | 0 |
| `agency` (Agency Founder Finance) | **8** | 1 |
| `hospitality` (Hospitality Tax) | **5** | 3 |
| `construction-cis` (Trade Tax Specialists) | **4** | 3 |
| `medical` (Medical Accounts) | **4** | 2 |
| `charities` (Trustee Tax) | **3** | 2 |
| `property` (Property Tax Partners) | **2** | 8 |
| `contractors-ir35` (Contractor Tax Accountants) | **2** | 2 |
| `care` (Care Home Tax) | **1** | 1 |
| `solicitors` (Accounts for Lawyers) | **1** | 1 |
| `startups-tech` (Founder Tax Partners) | **1** | 2 |
| `crypto`, `dentists`, `ecommerce`, `pharmacies` | **0** | 2 / 1 / 2 / 2 |

**The generalist load is the single most important operational finding.** 23 of the 54
absorbs route to one site, because 23 niches have no estate brand that names their
audience and generalist is the estate's designed catch-all (§6.1's own precedent: retail
became a generalist cluster). That is a sequencing problem, not a placement error, but
it means generalist becomes the busiest build queue in the estate and its 448-page
corpus converts at 3.3 leads per 100 pages against medical's 25.6 (§6.3.0). Worth an
owner decision on order, not on placement.

---

## 2. STANDALONE, in full. These are the only two that imply a new site

### #43 Film & TV production: all three host-fit tests fail on the best candidate

| Test | Best candidate = `agency` | Result |
|---|---|---|
| (a) ground truth | creative-sector reliefs (AVEC, VGEC, theatre, orchestra) appear in **no** `house_positions.md` on any of the 15 sites | **FAIL** |
| (b) binding mass | **0 pages** across all 15 sitemaps | **FAIL** |
| (c) brand fit | "Agency Founder Finance" sells to marketing and creative agency founders. It does not credibly answer "what is my audio-visual expenditure credit on a £2m production" | **FAIL** |
| C2 containment | **0.00 against all 15 sites** | CLEAR |

C1: **CLEAR**. C3: **1,710/mo deduplicated, the largest single head term in the whole
89-row universe** (`film accountant`, 1,600/mo, 1.00x inflation, so the number is not a
close-variant artefact). Demand does not gate under §6.3, but it does size: this is a
hub-and-cohort shape, not a section.

**Caveat the owner should hear: the shape has never been measured at R3 depth.** C4 for
this row is a screen only, and farming is the standing warning that a shallow field read
can be wrong by a factor of fifty. Before a domain is bought, run the
`tier2_farmers/s1_serp_collect.py` -> `s2_verify_fetch.py` pair on it.

### #38 OnlyFans creators: brand fit fails everywhere, and C1 says so itself

C1 is CONDITIONAL and its safe form **specifies a separate domain**: "separate domain,
tax copy only, no adult imagery, no links to creator content, no dependence on paid
search". No regulatory regime bites; the constraint is ad-platform, payment-rail and
brand-safety. Containment 0.50 against generalist on **support 1** (one stray query), so
the metric host is noise. Binding mass 1 page. C3: 160/mo, 1.00x.

This one is a STANDALONE **by constraint, not by opportunity**. It is the smallest kind
of standalone: a site that exists so the content does not sit next to the estate's other
brands. It is also the one row where an owner may reasonably say "not at all", and that
would be an explicit veto, which §6.3 allows and this table does not pre-empt.

---

## 3. NO-BUILD: one row

**#52 Financial advisers / FCA-regulated firms.** C1 **BLOCKED**. The valuable services
(CASS audits, safeguarding audits, statutory audits, anything opined to the FCA) legally
require a registered auditor, which the estate is not and cannot become by publishing
content (Companies Act 2006 Part 42; `expansion_research/tier2_fca/VERDICT.md`).
Containment 0.23 with support 8 against property, which is noise from ordinary
"financial" tokens, not evidence of coverage. Nothing else on the 89 reaches NO-BUILD.

---

## 4. The disagreements: max-overlap host vs host-fit host

This is the section §6.3.7 asked for, because it is where the method failed on farming.
**20 of 89 rows disagree.** Containment measures what a corpus already covers, which is
close to the inverse of what makes a good host for a gap, and the generalist site's
3,138-query corpus wins on containment for anything generic.

| # | Niche | Max-overlap host (containment) | Host-fit host | Why the metric is wrong |
|---|---|---|---|---|
| 8 | CIS subcontractors | generalist 1.00 / s72 | `construction-cis` | generalist ranks for CIS queries; construction-cis IS the CIS site (0.90 / s21, 110 pages) |
| 9 | Builders | generalist 0.68 | `construction-cis` | same shape; 19 pages already on the trade site |
| 21 | Vets | generalist 0.32 | `medical` | see §5, this is the weakest host call in the table |
| 23 | Nurses | generalist 0.35 = medical 0.35 | `medical` | exact tie; brand decides |
| 24 | **Care homes** | generalist 0.53 = medical 0.53 | `care` (0.35 / **s22**) | the dedicated site loses on containment and wins on support 22 vs 5. A pure C2 read would have moved care-home content off carehometax.co.uk |
| 30 | IT contractors | generalist 0.56 | `contractors-ir35` (0.48) | same failure the July run wrote a judgment override for |
| 31 | Freelancers | generalist 1.00 = agency 1.00 | `contractors-ir35` | ditto |
| 33 | **Startups** | generalist 0.64 | `startups-tech` (**0.00**) | the host scores ZERO and is still obviously right: 23 pages, 118 ground-truth mentions, brand names founders |
| 35 | Ecommerce sellers | generalist 0.54 / s106 | `ecommerce` (0.40 / s57) | dedicated site loses to the catch-all |
| 37 | Content creators | generalist 0.24 / s1 | `agency` | support 1 is noise |
| 40 | Day / forex traders | generalist 1.00 / s29 | `crypto` (0.52) | **crypto-relevant, see §6** |
| 44 | Artists / creatives | generalist 0.48 / s1 | `agency` (0.24 / s6) | support 1 vs 6; the lower-containment host has the real evidence |
| 51 | Engineers | 3-way tie at 0.50 | `contractors-ir35` | metric cannot break the tie at all |
| 53 | **Restaurants** | **property 0.73** / s1 | `hospitality` (0.68 / s11) | the worst single row in the table: property "wins" a restaurant niche on one query |
| 58 | Event caterers | agency 0.54 / s3 = charities 0.54 / s2 | `hospitality` | both metric hosts are nonsense for caterers |
| 76 | Churches | generalist 0.54 | `charities` | trustee brand vs catch-all |
| 77 | Schools & academies | generalist 0.95 / s4 | `charities` | 0.95 on 4 supporting queries |
| 81 | HNW individuals | generalist 0.38 / s1 | `property` | support 1 |
| 85 | Energy & renewables | construction-cis 0.25 / s1 | `generalist` | support 1 |
| 89 | Cleaning businesses | dentists 0.50 / s1 = property 0.50 / s1 | `generalist` | identical to the stray-VAT-query artefact the July run overrode for this exact row |

**The generalisable rule this produces, and it should go into §6.3.7:** containment
without **support >= 3** is not evidence. Eight of the twenty disagreements above rest on
a max-overlap site with support of 1 or 2. `r2_overlap.py` already carries
`MIN_SUPPORT = 3` but applies it only to downgrade an EXCLUDE verdict, not to disqualify
a host. **Applying it to host selection would have removed 8 of these 20 disagreements
mechanically.**

---

## 5. Rows where the host call is genuinely marginal (the owner-decision bundle)

Per §6.3.2's tie-breaker rule the default is ABSORB and the case goes to the owner as one
bundled question. Four rows, and only four:

1. **#21 Vets -> `medical`.** Brand fit is the weak leg: "Medical Accounts" is human
   medicine. The case for it is that a veterinary practice's tax shape (practice
   ownership, associate vs principal, private fees) is identical to medical's corpus.
   Runner-up: `generalist`. 120/mo.
2. **#43 Film & TV -> STANDALONE.** The alternative is ABSORB into `agency` as a hub,
   which is reversible; a domain is not. 1,710/mo makes it the largest thing in the
   table.
3. **#85 Energy & renewables -> `generalist`**, but it genuinely splits three ways: the
   installer slice binds `construction-cis` (containment 0.25), the landlord solar and
   EV-charging slice **already sits on property** (3 pages, 39 ground-truth mentions), and
   only the energy-company slice is homeless. 440/mo.
4. **#81 HNW individuals -> `property`**, property-owning slice only. Non-property HNW
   has no brand anywhere, and this is a §6.3.7 point 3 (C4b) shape: the buying process
   almost certainly cannot complete through a faceless web form.

**#63 Footballers / sports professionals** is the fifth in kind but is not marginal on
the rule: brand fit fails on all 15, yet §6.3.7 point 3 is explicit that a niche a
faceless form cannot convert is a **cluster on a working host, never a site**. It goes to
`generalist` as content coverage and nothing more.

---

## 6. What lands on crypto (the live pilot)

**Nothing new.** Crypto's recorded scope wall is crypto, day trading and forex, and this
pass places exactly those two rows on it and nothing else:

| # | Niche | Containment on crypto | Pages on crypto today | Verdict |
|---|---|---|---|---|
| 39 | Crypto traders / investors | **0.56 / support 22** | 30 | ABSORBED-ALREADY |
| 40 | Day / forex traders | **0.52 / support 3** | 5 | ABSORBED-ALREADY, thin |

Three things the owner should know about the pilot from this pass:

1. **The scope wall is confirmed by the data and needs no widening.** No other niche in
   the 89 has crypto as a plausible host. The nearest neighbour is #37 content creators
   (1 crypto page, containment 0.00), and it goes to `agency`.
2. **#40 is the disagreement that matters here.** Max-overlap says `generalist` at
   **1.00 on support 29**, against crypto at 0.52 on support 3. Read literally, C2 would
   move day-trading and forex OFF the pilot site and onto Holloway Davies. That is
   exactly the farming failure shape, and host-fit overrules it: "Crypto Tax Partners"
   names the trader audience, holds 30 pages of the adjacent family and 176 ground-truth
   mentions. **But it is a real signal that generalist is currently out-ranking the
   pilot on trader queries**, on 29 supporting queries to crypto's 3.
3. **The pilot's corpus is the smallest live corpus in the estate**: 55 unique queries
   over 90 days, 0 clicks on GSC, 0 clicks on Bing, 174 GSC impressions. Against §6.3.6's
   own finding that crypto's binding constraint is the corpus floor rather than cluster
   coverage, this pull is direct confirmation. It is not a problem with the placement.

---

## 7. Biggest movers against the July table

The July run (2026-07-11, 28-day corpus, 8 sites) returned **42 of 89 rows at exactly
0.00** and admitted in its own override notes that this was thinness, not cleanliness.
The 90-day, 15-site run returns **28 zeros**. Verdict distribution moved from
**13 EXCLUDE / 29 CAUTION / 47 CLEAR** to **41 EXCLUDE / 18 CAUTION / 30 CLEAR** on the
raw calibrated bands, and **54 of 89 rows changed their max-overlap site**.

### 7.1 The one that matters most: farming

| Row | July (28d, 8 sites) | August (90d, 15 sites) |
|---|---|---|
| #68 Farmers / agriculture | 0.35, max host **generalist**, CAUTION | **0.65, max host `property`**, EXCLUDE, support 8 |
| #7 Landed estates / rural | 0.00, max host **construction-cis**, CLEAR | **0.00, all 15 sites**, CLEAR |

**Half of the farming defect is fixed by the data and half is structural.** Row 68 now
picks the host the estate actually chose, unprompted, and `r2_overlap.py` flags it in its
own output ("metric says EXCLUDE but R1 saw no overlap", site property, cont 0.6471). So
the *corpus staleness* really was doing damage. But row 7 still returns 0.00 against
every site **including the site that shipped its cluster four days ago**, because
containment is measured against the query corpus, and eleven pages deployed on
2026-08-21 have barely begun earning impressions. **That is the structural half, and it
is unfixable by re-running: a just-shipped cluster is invisible to C2 for a quarter.**
Anyone re-running C2 within 90 days of an absorb must expect the absorbed niche to still
read CLEAR.

### 7.2 Biggest risers (all previously 0.00, all now landing on a site that did not exist in the July run)

| # | Niche | July | August | What changed |
|---|---|---|---|---|
| 75 | CICs / social enterprises | 0.00 (contractors-ir35) | **1.00 / s18 (`charities`)** | charities site was not in the 8 |
| 18 | Locum pharmacists | 0.00 (dentists) | **1.00 / s6 (`pharmacies`)** | pharmacies site was not in the 8 |
| 25 | Domiciliary care agencies | 0.00 (contractors-ir35) | **0.50 / s22 (`care`)** | care site was not in the 8 |
| 54 | Takeaways | 0.00 (generalist) | **0.50 / s13 (`hospitality`)** | hospitality site was not in the 8 |
| 36 | Amazon FBA sellers | 0.00 (generalist) | **0.50 / s2 (`ecommerce`)** | ecommerce site was not in the 8 |
| 74 | Charities / non-profits | 0.00 (agency) | **0.42 / s142 (`charities`)** | **support 142**, the second-highest in the table |
| 11 | Electricians | 0.00 (property) | **1.00 / s3 (`construction-cis`)** | 90d corpus |
| 49 | Recruitment agencies | 0.00 (construction-cis) | **0.54 / s3 (`agency`)** | 90d corpus |
| 13 | Landscapers / gardeners | 0.00 (contractors-ir35) | **0.48 / s1 (`construction-cis`)** | 90d corpus (support 1, treat with care) |
| 76 | Churches | 0.00 (medical) | **0.54 / s2 (`generalist`)** | 90d corpus (support 2) |
| 40 | Day / forex traders | 0.43 (generalist) | **1.00 / s29 (generalist)** | 90d corpus; see §6 |
| 65 | Couriers / delivery drivers | 0.41 (generalist) | **0.85 / s3 (generalist)** | 90d corpus |
| 4 | Property developers | 0.33 (generalist) | **0.67 / s3 (`property`)** | 90d corpus; host corrected |

**Six of the thirteen biggest risers moved because the defect was the hardcoded 8-site
list, not the 28-day window.** Containment against crypto, care, charities, ecommerce,
hospitality, pharmacies and startups-tech had never been computed at all.

### 7.3 Three rows FELL to 0.00, and the honest reading

| # | Niche | July | August |
|---|---|---|---|
| 5 | Property management companies | 0.50 (property) | **0.00, all sites** |
| 20 | Opticians / optometrists | 0.32 (medical) | **0.00, all sites** |
| 22 | Therapists & allied health | 0.13 (medical) | **0.00, all sites** |

A longer window returning a *lower* containment means the corpus composition changed,
not that coverage was lost: `GetQueryStats` is a rolling provider-side snapshot and the
Bing rows present in the July file are not necessarily present today. **Containment is
therefore NOT monotonic in window length and must never be read as a trend.** All three
rows are placed on host-fit, which is unaffected: #5 -> property (3 pages, 28
ground-truth mentions), #20 and #22 -> medical.

---

## 8. Gates carried forward from C1 (these bind the build, not the placement)

| # | Niche | Verdict | Gate |
|---|---|---|---|
| 5 | Property management companies | ABSORB -> property | **C1 NEEDS-REVIEW.** Service-charge certification is restricted to a statutorily defined "qualified accountant" and the regime is mid-reform. Position doc before any page ships |
| 28 | Solicitors / law firms | ABSORBED-ALREADY | **C1 NEEDS-REVIEW on a LIVE site.** Audit accountsforlawyers.co.uk wording against SRA Accounts Rules r.12. Wording risk, not a build gate |
| 77 | Schools & academies | ABSORB -> charities | **C1 NEEDS-REVIEW.** The position doc must separate audit-locked academy trusts from independent schools and the tutor side before the cluster is scoped |
| 39 | Crypto | ABSORBED-ALREADY | **C1 CONDITIONAL, §6.2 doc still missing.** `docs/crypto/REGULATORY_POSITION_*.md` does not exist |
| 24 CONDITIONAL rows | various | ABSORB / ABSORBED-ALREADY | Each carries a named wording or monetisation fence from C1. None blocks placement; each binds copy |

---

## 9. Coverage gaps this pass surfaces that are NOT niche rows

Recorded because the coverage strategy makes them real, and none is invented:

1. **The conceded half of farming.** §6.3.7 step 2 cut farming on a permanent line and
   deliberately did not write the operations half (herd basis, farmers' averaging, BPS
   and SFI, AHA 1986 / ATA 1995 tenancies, natural capital, agricultural flat rate
   scheme, farm budgeting). It is covered **nowhere in the estate** and no house position
   exists for any of it. Under a coverage strategy this is now an explicit open item, and
   the reason it stays conceded is A* bar, not preference. **Decision needed, not
   assumed.**
2. **The non-landlord expat slice (#80).** Property covers NRL and property-owning
   expats with 62 pages. Employment-income SRT, split-year and double-tax for expats who
   own no UK property is thinner and has no other host.
3. **`wills-probate` and `divorce-finances` are content-complete but not live**, so they
   have no GSC property, no Bing site, no sitemap and no containment. They could not be
   scored and cannot host anything until Phase 6 externals land.

---

## 10. The full placement table, all 89 rows

Columns: `C1` from `C1_REGULATORY.md`. `Cont` / `Sup` / `Band` = 90-day containment,
distinct supporting queries, and calibrated band against the best-scoring of 15 sites.
`Candidate hosts` = every site with containment above zero (C2's actual job).
`Verdict` and `Shape` = the host-fit answer. `Dedup vol/mo` = C3 sizing input, never a
gate. `Jul-11` = the superseded 28-day figure for comparison. `Max-overlap != host` marks
the §4 disagreements.

| # | Niche | C1 | Cont | Sup | Band | Candidate hosts (containment > 0) | Verdict | Shape | Dedup vol/mo | Jul-11 (28d) | Max-overlap != host | Host-fit note |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Landlords (buy-to-let) | CONDITIONAL | 0.97 | 407 | EXCLUDE | property 0.97 / generalist 0.45 | **ABSORBED-ALREADY** -> `property` | live: 383 pages | - | 0.94 (property) |  | core audience of the host brand |
| 2 | Property investors | CONDITIONAL | 0.57 | 24 | EXCLUDE | property 0.57 | **ABSORBED-ALREADY** -> `property` | live: 22 pages | - | 0.57 (property) |  | core audience |
| 3 | Airbnb / holiday-let hosts | CLEAR | 0.41 | 13 | CAUTION | property 0.41 | **ABSORBED-ALREADY** -> `property` | live: 20 pages (FHL abolition corpus) | - | 0.59 (property) |  | GT house_positions FHL/holiday-let; brand fits |
| 4 | Property developers | CONDITIONAL | 0.67 | 3 | EXCLUDE | property 0.67 / generalist 0.33 | **ABSORBED-ALREADY** -> `property` | live: 12 pages | 160 | 0.33 (generalist) |  | GT §developer; brand fits |
| 5 | Property management companies | NEEDS-REVIEW | 0.00 | 0 | CLEAR | all sites 0.00 | **ABSORB** -> `property` | cluster 3-5 | 20 | 0.50 (property) |  | GT 28 service-charge mentions; mass 3 pages; brand fits. GATED on C1 NEEDS-REVIEW |
| 6 | Estate & letting agents | CONDITIONAL | 0.35 | 1 | CAUTION | property 0.35 | **ABSORBED-ALREADY** -> `property` | live: 16 pages (agents1 + wave12) | 70 | 0.35 (property) |  | shipped 2026-08-21 |
| 7 | Landed estates / rural estates | CONDITIONAL | 0.00 | 0 | CLEAR | all sites 0.00 | **ABSORBED-ALREADY** -> `property` | live: 18 pages (/landed-estates) | 50 | 0.00 (construction-cis) |  | shipped 2026-08-21; property half only |
| 8 | Construction / CIS subcontractors | CLEAR | 1.00 | 72 | EXCLUDE | generalist 1.00 / construction-cis 0.90 / contractors-ir35 0.35 | **ABSORBED-ALREADY** -> `construction-cis` | live: 110 pages | - | 1.00 (generalist) | yes | core audience |
| 9 | Builders | CLEAR | 0.68 | 11 | EXCLUDE | generalist 0.68 / construction-cis 0.32 / property 0.32 | **ABSORBED-ALREADY** -> `construction-cis` | live: 19 pages | - | 0.68 (generalist) | yes | core audience |
| 10 | Plumbers / heating engineers | CLEAR | 0.46 | 2 | EXCLUDE | construction-cis 0.46 / generalist 0.23 / property 0.23 | **ABSORB** -> `construction-cis` | cluster 3-5 | 10 | 0.23 (generalist) |  | GT 0 but trade CIS/VAT positions carry it; mass 2; brand names trades |
| 11 | Electricians | CLEAR | 1.00 | 3 | EXCLUDE | construction-cis 1.00 | **ABSORB** -> `construction-cis` | cluster 3-5 | 80 | 0.00 (property) |  | mass 4; cont 1.00 on host; brand names trades |
| 12 | Painters & decorators | CLEAR | 0.00 | 0 | CLEAR | all sites 0.00 | **ABSORB** -> `construction-cis` | section + 1-2 pages | null | 0.00 (property) |  | mass 1; brand names trades |
| 13 | Landscapers / gardeners | CLEAR | 0.48 | 1 | EXCLUDE | construction-cis 0.48 | **ABSORB** -> `construction-cis` | section + 1-2 pages | null | 0.00 (contractors-ir35) |  | mass 2; brand names trades |
| 14 | Tradespeople (family) | CLEAR | 0.61 | 12 | EXCLUDE | construction-cis 0.61 / generalist 0.42 / property 0.23 | **ABSORBED-ALREADY** -> `construction-cis` | live: 9 pages | 90 | 0.39 (construction-cis) |  | core audience |
| 15 | Dentists | CONDITIONAL | 0.67 | 119 | EXCLUDE | dentists 0.67 / generalist 0.67 / medical 0.38 | **ABSORBED-ALREADY** -> `dentists` | live: 218 pages | - | 0.67 (dentists) |  | core audience |
| 16 | Doctors / GPs | CLEAR | 0.97 | 74 | EXCLUDE | medical 0.97 / dentists 0.28 / generalist 0.28 | **ABSORBED-ALREADY** -> `medical` | live: 77 pages | - | 0.61 (medical) |  | core audience |
| 17 | Locum doctors | CLEAR | 1.00 | 39 | EXCLUDE | medical 1.00 / pharmacies 0.50 / dentists 0.50 | **ABSORBED-ALREADY** -> `medical` | live: 13 pages (+17 on dentists) | - | 1.00 (medical) |  | core audience |
| 18 | Locum pharmacists | CLEAR | 1.00 | 6 | EXCLUDE | pharmacies 1.00 | **ABSORBED-ALREADY** -> `pharmacies` | live: 5 pages | 10 | 0.00 (dentists) |  | core audience |
| 19 | Pharmacies | CLEAR | 1.00 | 4 | EXCLUDE | pharmacies 1.00 / generalist 1.00 | **ABSORBED-ALREADY** -> `pharmacies` | live: 36 pages | 300 | 1.00 (generalist) |  | core audience |
| 20 | Opticians / optometrists | CLEAR | 0.00 | 0 | CLEAR | all sites 0.00 | **ABSORB** -> `medical` | cluster 3-5 | 50 | 0.32 (medical) |  | mass 0 exact; binds medical's 130-page private-practice corpus; brand = healthcare practice |
| 21 | Vets | CLEAR | 0.32 | 5 | CAUTION | generalist 0.32 | **ABSORB** -> `medical` | cluster 3-5 | 120 | 0.00 (dentists) | yes | brand-fit is the WEAK leg (human medicine vs veterinary); runner-up generalist. FLAGGED |
| 22 | Therapists & allied health | CLEAR | 0.00 | 0 | CLEAR | all sites 0.00 | **ABSORB** -> `medical` | cluster 3-5 | 50 | 0.13 (medical) |  | GT 8 mentions on dentists/medical; private-practice shape identical; brand fits |
| 23 | Nurses / healthcare professionals | CONDITIONAL | 0.35 | 5 | CAUTION | generalist 0.35 / medical 0.35 | **ABSORB** -> `medical` | section + 1-2 pages | 40 | 0.35 (medical) | yes | GT 26 mentions on care; brand fits. C1 CONDITIONAL: no refund/rebate route |
| 24 | Care homes | CLEAR | 0.53 | 5 | EXCLUDE | generalist 0.53 / medical 0.53 / care 0.35 | **ABSORBED-ALREADY** -> `care` | live: 10 pages | 100 | 0.53 (medical) | yes | core audience |
| 25 | Domiciliary care agencies | CLEAR | 0.50 | 22 | EXCLUDE | care 0.50 | **ABSORB** -> `care` | cluster 3-5 (deepen) | null | 0.00 (contractors-ir35) |  | mass 2, cont 0.50/s22 on host; brand adjacent and already ranking |
| 26 | Childminders / nurseries | CLEAR | 0.00 | 0 | CLEAR | all sites 0.00 | **ABSORB** -> `generalist` | cluster 3-5 | 110 | 0.00 (agency) |  | no niche brand names childcare; generalist is the estate's designed catch-all (§6.1 retail precedent) |
| 27 | Foster carers | CLEAR | 0.00 | 0 | CLEAR | all sites 0.00 | **ABSORB** -> `generalist` | cluster 3-5 | 70 | 0.00 (property) |  | qualifying care relief = individual SA; generalist brand carries it |
| 28 | Solicitors / law firms | NEEDS-REVIEW | 1.00 | 242 | EXCLUDE | solicitors 1.00 / generalist 0.43 / hospitality 0.27 | **ABSORBED-ALREADY** -> `solicitors` | live: 181 pages | - | 0.81 (solicitors) |  | core audience. C1 NEEDS-REVIEW = wording audit on a LIVE site |
| 29 | Barristers | CLEAR | 1.00 | 9 | EXCLUDE | solicitors 1.00 / generalist 1.00 | **ABSORB** -> `solicitors` | cluster 3-5 | - | 1.00 (solicitors) |  | cont 1.00/s9 on host; mass 1; brand names the audience |
| 30 | IT contractors | CONDITIONAL | 0.56 | 6 | EXCLUDE | generalist 0.56 / contractors-ir35 0.48 / medical 0.22 | **ABSORBED-ALREADY** -> `contractors-ir35` | live: 84 pages | - | 0.56 (generalist) | yes | core audience |
| 31 | Freelancers | CONDITIONAL | 1.00 | 5 | EXCLUDE | generalist 1.00 / agency 1.00 | **ABSORBED-ALREADY** -> `contractors-ir35` | live (GT 8 mentions) + generalist | - | 1.00 (generalist) | yes | core audience of the contractor brand |
| 32 | Management consultants | CLEAR | 0.46 | 2 | EXCLUDE | contractors-ir35 0.46 / property 0.25 / medical 0.25 | **ABSORB** -> `contractors-ir35` | cluster 3-5 | 360 | 0.46 (contractors-ir35) |  | cont 0.46 on host; consultants bill through PSCs = IR35 shape; brand fits |
| 33 | Startups | CONDITIONAL | 0.64 | 6 | EXCLUDE | generalist 0.64 | **ABSORBED-ALREADY** -> `startups-tech` | live: 23 pages | 890 | 0.36 (generalist) | yes | core audience |
| 34 | Tech / SaaS companies | CONDITIONAL | 0.32 | 2 | CAUTION | startups-tech 0.32 / generalist 0.16 | **ABSORBED-ALREADY** -> `startups-tech` | live: 16 pages (thin, deepen) | 530 | 0.16 (generalist) |  | core audience; cont 0.32 on host |
| 35 | Ecommerce sellers | CLEAR | 0.54 | 106 | EXCLUDE | generalist 0.54 / ecommerce 0.40 / agency 0.27 | **ABSORBED-ALREADY** -> `ecommerce` | live: 16 pages | 980 | 0.42 (generalist) | yes | core audience |
| 36 | Amazon FBA sellers | CLEAR | 0.50 | 2 | EXCLUDE | ecommerce 0.50 | **ABSORBED-ALREADY** -> `ecommerce` | live: 5 pages | 300 | 0.00 (generalist) |  | core audience; cont 0.50 on host |
| 37 | Content creators / influencers | CLEAR | 0.24 | 1 | CAUTION | generalist 0.24 | **ABSORB** -> `agency` | cluster 3-5 | 310 | 0.00 (construction-cis) | yes | agency = the estate's creative-sector brand, 23 creative pages; GT 0, so lock positions first |
| 38 | OnlyFans creators | CONDITIONAL | 0.50 | 1 | EXCLUDE | generalist 0.50 | **STANDALONE** | site | 160 | 0.00 (dentists) |  | BRAND FIT fails on every live brand; C1 itself specifies a separate domain, no adult imagery, no paid search |
| 39 | Crypto traders / investors | CONDITIONAL | 0.56 | 22 | EXCLUDE | crypto 0.56 / property 0.30 | **ABSORBED-ALREADY** -> `crypto` | live: 30 pages | 1,360 | 0.30 (property) |  | core audience; pilot site |
| 40 | Day / forex traders | CONDITIONAL | 1.00 | 29 | EXCLUDE | generalist 1.00 / crypto 0.52 / construction-cis 0.43 | **ABSORBED-ALREADY** -> `crypto` | live: 5 pages (thin, deepen) | 130 | 0.43 (generalist) | yes | inside crypto's recorded scope wall (crypto, day trading, forex) |
| 41 | Musicians | CLEAR | 0.00 | 0 | CLEAR | all sites 0.00 | **ABSORB** -> `agency` | cluster 3-5 | 50 | 0.00 (property) |  | creative-sector host; mass 1 on generalist; brand = creative businesses |
| 42 | Actors / entertainment industry | CLEAR | 0.44 | 10 | CAUTION | agency 0.44 / generalist 0.22 | **ABSORB** -> `agency` | cluster 3-5 | 200 | 0.22 (agency) |  | cont 0.44/s10 on host; mass 23 creative pages; brand fits |
| 43 | Film & TV production | CLEAR | 0.00 | 0 | CLEAR | all sites 0.00 | **STANDALONE** | site | 1,710 | 0.00 (construction-cis) |  | ALL THREE fail on the best candidate (agency): GT 0 creative-sector relief positions anywhere, mass 0 pages, brand does not name production companies |
| 44 | Artists / creatives | CLEAR | 0.48 | 1 | EXCLUDE | generalist 0.48 / agency 0.24 | **ABSORB** -> `agency` | cluster 3-5 | 220 | 0.48 (generalist) | yes | mass 8; cont 0.24/s6 on host; brand fits |
| 45 | Authors / writers | CLEAR | 0.00 | 0 | CLEAR | all sites 0.00 | **ABSORB** -> `agency` | section + 1-2 pages | 20 | 0.00 (solicitors) |  | mass 2; brand fits (creative sole traders) |
| 46 | Photographers | CLEAR | 0.00 | 0 | CLEAR | all sites 0.00 | **ABSORB** -> `agency` | cluster 3-5 | 50 | 0.00 (property) |  | creative-sector host; brand fits |
| 47 | Interior designers | CLEAR | 0.00 | 0 | CLEAR | all sites 0.00 | **ABSORB** -> `agency` | cluster 3-5 | 40 | 0.00 (solicitors) |  | design services = agency-shaped business; brand fits |
| 48 | Marketing agencies | CLEAR | 0.32 | 1 | CAUTION | agency 0.32 | **ABSORBED-ALREADY** -> `agency` | live: 239 pages | - | 0.00 (construction-cis) |  | core audience |
| 49 | Recruitment agencies | CLEAR | 0.54 | 3 | EXCLUDE | agency 0.54 | **ABSORB** -> `agency` | hub 12-15 + supporting | 1,150 | 0.00 (construction-cis) |  | cont 0.54/s3 on host; mass 6; brand literally names agencies. Largest ABSORB by demand (1,150/mo) |
| 50 | Architects | CLEAR | 1.00 | 3 | EXCLUDE | generalist 1.00 | **ABSORB** -> `generalist` | cluster 3-5 | 40 | 1.00 (generalist) |  | no niche brand for professional design practices; surveyor sub-slice already lives on property (GT 166) |
| 51 | Engineers / engineering consultants | CLEAR | 0.50 | 6 | EXCLUDE | construction-cis 0.50 / generalist 0.50 / contractors-ir35 0.50 | **ABSORB** -> `contractors-ir35` | cluster 3-5 | 80 | 0.50 (generalist) | yes | cont 0.50 tie across 3 sites; engineering contractors are a core PSC/IR35 audience; brand fits |
| 52 | Financial advisers / FCA-regulated firms | BLOCKED | 0.23 | 8 | CAUTION | property 0.23 / solicitors 0.23 / medical 0.23 | **NO-BUILD**  | n/a | 170 | 0.23 (property) |  | C1 BLOCKED: registered-auditor lock (Companies Act 2006 Pt 42) + estate lock on file |
| 53 | Restaurants | CLEAR | 0.73 | 1 | EXCLUDE | property 0.73 / hospitality 0.68 / generalist 0.41 | **ABSORBED-ALREADY** -> `hospitality` | live: 4 pages | 200 | 0.41 (generalist) | yes | core audience |
| 54 | Takeaways | CLEAR | 0.50 | 13 | EXCLUDE | hospitality 0.50 | **ABSORBED-ALREADY** -> `hospitality` | live: 2 pages | 10 | 0.00 (generalist) |  | core audience; cont 0.50/s13 on host |
| 55 | Pubs & bars | CLEAR | 0.00 | 0 | CLEAR | all sites 0.00 | **ABSORB** -> `hospitality` | cluster 3-5 | 170 | 0.00 (medical) |  | mass 1; GT 28 mentions; brand names the audience |
| 56 | Hotels & guesthouses | CLEAR | 0.00 | 0 | CLEAR | all sites 0.00 | **ABSORB** -> `hospitality` | cluster 3-5 | 110 | 0.00 (medical) |  | mass 2; GT 14 mentions; brand names the audience |
| 57 | Hospitality (family) | CLEAR | 0.31 | 5 | CAUTION | hospitality 0.31 / generalist 0.31 | **ABSORBED-ALREADY** -> `hospitality` | live: 19 pages | 460 | 0.31 (generalist) |  | core audience |
| 58 | Event caterers | CLEAR | 0.54 | 3 | EXCLUDE | agency 0.54 / charities 0.54 | **ABSORB** -> `hospitality` | section + 1-2 pages | 10 | 0.54 (agency) | yes | mass 1; GT 14 mentions; brand fits |
| 59 | Travel agents / tour operators | CLEAR | 0.33 | 2 | CAUTION | hospitality 0.33 | **ABSORB** -> `hospitality` | cluster 3-5 (TOMS VAT) | 10* | 0.00 (agency) |  | cont 0.33 on host; GT 9 mentions; brand fits |
| 60 | Hairdressers / barbers / beauty | CLEAR | 0.13 | 3 | CLEAR | generalist 0.13 | **ABSORB** -> `generalist` | cluster 3-5 | 40 | 0.13 (generalist) |  | mass 2, cont 0.13/s3; no niche brand; chair-rental status is generalist SA work |
| 61 | Gyms / fitness / personal trainers | CLEAR | 0.24 | 1 | CAUTION | generalist 0.24 | **ABSORB** -> `generalist` | cluster 3-5 | 30 | 0.24 (generalist) |  | mass 1; no niche brand |
| 62 | Sports clubs | CLEAR | 0.00 | 0 | CLEAR | all sites 0.00 | **ABSORB** -> `charities` | cluster 3-5 | null | 0.00 (property) |  | CASC sits beside charity registration; GT 7 on host; brand (Trustee Tax) names the buyer |
| 63 | Footballers / sports professionals | CONDITIONAL | 0.00 | 0 | CLEAR | all sites 0.00 | **ABSORB** -> `generalist` | cluster 3-5 | 50 | 0.00 (medical) |  | brand fit FAILS everywhere; kept ABSORB per §6.3.7 point 3 (C4b): a faceless form cannot convert this buying process, so it is a cluster, never a site. FLAGGED |
| 64 | Taxi & private-hire drivers | CLEAR | 0.62 | 1 | EXCLUDE | generalist 0.62 | **ABSORB** -> `generalist` | hub 12-15 + supporting | 310 | 0.62 (generalist) |  | cont 0.62 on host; 310/mo; no niche brand; generalist carries sole-trader SA |
| 65 | Couriers / delivery drivers | CLEAR | 0.85 | 3 | EXCLUDE | generalist 0.85 | **ABSORB** -> `generalist` | cluster 3-5 | 20 | 0.41 (generalist) |  | cont 0.85/s3 on host; gig-status is generalist SA work |
| 66 | Hauliers / trucking | CLEAR | 0.00 | 0 | CLEAR | all sites 0.00 | **ABSORB** -> `generalist` | cluster 3-5 | 140 | 0.00 (contractors-ir35) |  | mass 1; no niche brand; 140/mo |
| 67 | Pilots / aviation | CONDITIONAL | 0.00 | 0 | CLEAR | all sites 0.00 | **ABSORB** -> `generalist` | section + 1-2 pages | 10 | 0.00 (contractors-ir35) |  | no niche brand; C1 CONDITIONAL: no rebate service, no assignment |
| 68 | Farmers / agriculture | CONDITIONAL | 0.65 | 8 | EXCLUDE | property 0.65 / generalist 0.35 | **ABSORBED-ALREADY** -> `property` | live: 5+18 pages (/landed-estates) | 350 | 0.35 (generalist) |  | property half shipped; OPERATIONS half deliberately conceded and still uncovered estate-wide |
| 69 | Retail / independent shops | CLEAR | 0.13 | 4 | CLEAR | generalist 0.13 | **ABSORB** -> `generalist` | cluster 3-5 (deepen) | 250 | 0.13 (generalist) |  | mass 4; §6.1 already records retail as a generalist cluster |
| 70 | Used car dealers / automotive | CONDITIONAL | 0.00 | 0 | CLEAR | all sites 0.00 | **ABSORB** -> `generalist` | cluster 3-5 | 80 | 0.00 (agency) |  | margin-scheme VAT; C1 CONDITIONAL: no motor-finance claim content or referral |
| 71 | Jewellers | CLEAR | 0.00 | 0 | CLEAR | all sites 0.00 | **ABSORB** -> `generalist` | section + 1-2 pages | null | 0.00 (property) |  | no niche brand; MLR HVD content is generalist compliance |
| 72 | Cake makers / food producers | CLEAR | 0.33 | 3 | CAUTION | hospitality 0.33 | **ABSORB** -> `hospitality` | cluster 3-5 | null | 0.00 (generalist) |  | cont 0.33/s3 on host; food business = hospitality brand |
| 73 | Manufacturing | CLEAR | 0.32 | 3 | CAUTION | generalist 0.32 | **ABSORB** -> `generalist` | hub 12-15 + supporting | 260 | 0.32 (generalist) |  | mass 4, cont 0.32/s3; 260/mo; tier1_manufacturing research already on file |
| 74 | Charities / non-profits | CONDITIONAL | 0.42 | 142 | CAUTION | charities 0.42 / generalist 0.22 | **ABSORBED-ALREADY** -> `charities` | live: 39 pages | 800 | 0.00 (agency) |  | core audience |
| 75 | CICs / social enterprises | CLEAR | 1.00 | 18 | EXCLUDE | charities 1.00 | **ABSORBED-ALREADY** -> `charities` | live: 8 pages | 90 | 0.00 (contractors-ir35) |  | core audience; cont 1.00/s18 on host |
| 76 | Churches / religious organisations | CONDITIONAL | 0.54 | 2 | EXCLUDE | generalist 0.54 | **ABSORB** -> `charities` | cluster 3-5 | 10 | 0.00 (medical) | yes | GT 4 on host; excepted-charity shape; brand names trustees |
| 77 | Schools & academies | NEEDS-REVIEW | 0.95 | 4 | EXCLUDE | generalist 0.95 | **ABSORB** -> `charities` | cluster 3-5 | 30 | 0.95 (generalist) | yes | brand names trustees/governance. GATED on C1 NEEDS-REVIEW, which must split audit-locked academy trusts from independent schools and tutors |
| 78 | Tutors / private teachers | CLEAR | 0.00 | 0 | CLEAR | all sites 0.00 | **ABSORB** -> `generalist` | section + 1-2 pages | 10 | 0.00 (contractors-ir35) |  | no niche brand; §6.1's tutoring lock is COMMERCIAL not regulatory (C1 contradiction 1) |
| 79 | Driving instructors | CLEAR | 0.00 | 0 | CLEAR | all sites 0.00 | **ABSORB** -> `generalist` | cluster 3-5 | 60 | 0.00 (generalist) |  | no niche brand; 60/mo sole-trader SA |
| 80 | Expats / non-residents | CONDITIONAL | 0.38 | 42 | CAUTION | property 0.38 / generalist 0.12 / agency 0.12 | **ABSORBED-ALREADY** -> `property` | live: 62 pages (NRL/expat waves) | 210 | 0.25 (property) |  | property/NRL slice covered; non-landlord expat employment slice is thinner |
| 81 | High-net-worth individuals | CONDITIONAL | 0.38 | 1 | CAUTION | generalist 0.38 | **ABSORB** -> `property` | section on existing IHT/CGT hub | 90 | 0.38 (generalist) | yes | property-owning HNW only; brand fit is the WEAK leg for non-property HNW. C4b shape. FLAGGED |
| 82 | Franchisees | CLEAR | 0.00 | 0 | CLEAR | all sites 0.00 | **ABSORB** -> `generalist` | cluster 3-5 | 160 | 0.00 (agency) |  | no niche brand; 160/mo |
| 83 | Virtual assistants | CLEAR | 0.00 | 0 | CLEAR | all sites 0.00 | **ABSORB** -> `generalist` | section + 1-2 pages | 20 | 0.00 (property) |  | no niche brand; 20/mo |
| 84 | Neurodivergent business owners | CONDITIONAL | 0.00 | 0 | CLEAR | all sites 0.00 | **ABSORB** -> `generalist` | cluster 3-5 | 40 | 0.00 (contractors-ir35) |  | no niche brand; C1 CONDITIONAL: no diagnostic framing, no benefits-claim content |
| 85 | Energy & renewables | CONDITIONAL | 0.25 | 1 | CAUTION | construction-cis 0.25 | **ABSORB** -> `generalist` | hub 12-15 + supporting | 440 | 0.00 (contractors-ir35) | yes | 440/mo. Installer slice binds construction-cis (cont 0.25); landlord solar/EV already on property (GT 39). FLAGGED: 3-way split |
| 86 | Life sciences / pharma | CLEAR | 0.00 | 0 | CLEAR | all sites 0.00 | **ABSORB** -> `startups-tech` | cluster 3-5 | 10 | 0.00 (generalist) |  | GT R&D relief is the host's own ground truth; brand (Founder Tax Partners) fits R&D-heavy biotech |
| 87 | Maritime | CLEAR | 0.00 | 0 | CLEAR | all sites 0.00 | **ABSORB** -> `generalist` | hub 12-15 + supporting | 440 | 0.00 (property) |  | 440/mo SED; no niche brand; C1 clear but must not become rebate-shaped |
| 88 | Security firms | CLEAR | 0.00 | 0 | CLEAR | all sites 0.00 | **ABSORB** -> `generalist` | cluster 3-5 | null | 0.00 (solicitors) |  | mass 1; no niche brand |
| 89 | Cleaning businesses | CLEAR | 0.50 | 1 | EXCLUDE | dentists 0.50 / property 0.50 | **ABSORB** -> `generalist` | cluster 3-5 | 10 | 0.50 (property) | yes | no niche brand; max-overlap (dentists/property 0.50, support 1 each) is pure noise |

---

## 11. Reproducing this

1. Pull the corpora: `<scratchpad>/nichemap/pull_90d.py` (GSC `dimensions:["query"]`, 90d, plus `BingQueryFetcher.get_query_stats`, 15 live sites, written to `corpora/<site>_queries.csv`).
2. Score containment: the `R2_SITES` / `R2_CORPORA` / `R2_OUT` invocation in §0.2. Defaults unchanged, so the July behaviour still reproduces with no environment set.
3. Host-fit (a) and (b): `<scratchpad>/nichemap/binding_mass.py` (live sitemaps + `docs/<site>/house_positions.md`).
4. Join and emit: `<scratchpad>/nichemap/assemble.py` and `emit_table.py`.

The scratchpad is session-ephemeral by house rule (`standard_terms` §8: scratch scripts never go in the repo). The repo-side reproduction that survives is step 2, which is why `r2_overlap.py` was parameterised rather than forked.

**Nothing in this pass was committed and nothing was deployed.**
