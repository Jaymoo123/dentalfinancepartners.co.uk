# Leads to 250 a month: the programme (2026-09-27)

Owner decision 2026-09-27: "chuck some serious resource behind the AI theory", "100% to
grow the sites that convert higher", commercial Google becomes "the long tail we can get a
slice of as we age". This document is the plan. It supersedes the lever ranking in
`LEAD_LEVERS_2026-09-26.md` and absorbs the still-relevant parts of
`AI_SEARCH_GEO_PROGRAM.md` (June 2026, designed, mostly unapplied). One living doc; update
in place, no per-session handoffs.

Data in this document: leads table (test rows excluded), `web_sessions` UK humans with the
bot gate applied, fresh Search Console pull through 2026-09-24, live UK Google and Bing
SERPs pulled 2026-09-27, Nominet and RDAP registration dates pulled 2026-09-27.

---

## 0. Where we are

| | Jun | Jul | Aug | Sep (27 days) |
|---|---:|---:|---:|---:|
| Estate leads | 40 | 83 | 112 | 88 (about 98 pro rata) |
| Property leads | 34 | 62 | 76 | 60 |
| Property UK humans | 1,734 | 3,162 | 3,959 | 4,023 |
| Property leads per 1,000 humans | 19.6 | 19.6 | 19.2 | 14.9 |
| Estate AI-referred sessions | 192 | 273 | 371 | 302 |
| Estate AI-referred leads | 8 | 24 | 23 | 31 |

- Leads have sat at 17 to 31 a week since mid-July. Traffic doubled in the same window.
  The plateau is a conversion story, not a traffic story.
- 97% of Property visitors land on a blog post and convert at about 0.7%. The 70 a month
  who land on the homepage convert at about 25%. Services pages: 18 visitors in 90 days,
  4 leads.
- Since 1 July ChatGPT sent 211 people to the Property homepage; 59 became leads (28%).
  Medical: 23 homepage arrivals from ChatGPT, 11 leads. These people asked an assistant
  "who should I use" and it named us. AI referrals were a third of September's leads.
- Commercial Google is closed to us for now. Across 8 buyer queries and 75 top-10 slots,
  propertytaxpartners.co.uk (registered 29 March 2026) appears nowhere. 69 of 75 slots are
  held by domains 4 years or older; the youngest domain in any top 3 is 6.9 years old.
  Commercial queries earned 6 Google clicks in 28 days on 3,138 impressions.
- Conversion by site, last 90 days, UK humans: contractors-ir35 72 per 1,000, care 45,
  medical 32, ecommerce 22, crypto 29 (tiny bases), charities 17, Property 18, dentists 7,
  generalist 5, solicitors 2.
- Conversion by Property topic, since 1 July: property-accountant-services 37 per 1,000,
  incorporation 20, MTD 9, CGT 8, landlord essentials 6, Section 24 4, property types 3,
  non-resident 3. The single best post (transfer property into a limited company) made 14
  leads from 470 visitors.

## 1. The theory in one paragraph

Two kinds of visitor arrive. Readers are looking up a rule ("are mortgage arrangement fees
deductible"). Deciders are about to do something (transfer, sell, gift, incorporate, hire).
Leads come from deciders. Deciders reach us three ways today: an assistant names us as a
firm and they land on the homepage (converts 25 to 28%); a decision-stage article (2 to 4%);
or they come back directly. Commercial Google would be the fourth way and it is locked by
authority, for which domain age is a fair proxy. So the programme is: be the firm assistants
name, on the sites whose deciders are individuals with a personal tax decision; grow those
sites' content so they are credible entities with decision-stage depth; point Property's
content at decisions rather than rules; and stop feeding readers on sites where deciders do
not arrive. Commercial Google is watched, not chased.

## 2. Workstream A: be the firm the assistants recommend

### What it does, practically

When someone asks ChatGPT "recommend a UK accountant for landlords transferring property into
a company", ChatGPT runs a web search (Bing-backed), reads the pages it finds, and writes a
short list of firms with a line on each. To be on that list a site needs four things, and we
control all four:

1. **Have a page for each buyer's exact situation.** The baseline (section 8) shows how
   ChatGPT actually picks: its search pulls pages that match the specific need, not the
   head term. Medical came 1st for "locum doctors" because `/for-locum-doctors` exists; it
   came 9th for "NHS doctors and GP partners". Contractors was named for "IR35 and setting
   up a company" and missed entirely for "IT contractors", which has no page. Property
   missed "CGT on selling a buy to let", which has no service page. None of our domains sit
   in the Bing or Google top 20 for any of 12 head terms, and ChatGPT names us anyway. So
   the lever is one honest, specific page per buyer segment on each site ("for landlords
   moving property into a company", "for GP partners", "for IT contractors", "selling a
   buy to let"), not head-term rank.
2. **Say who we are in a form a machine can lift.** What the service is, who it is for,
   where, how it works, what happens after the form, and what it is not. Today every site
   passes "what" and "who" but the six thin sites are only partial on "where", nobody says
   "how it works" in one quotable block, and Property's homepage schema is hand-rolled and
   off the shared library the other 14 use.
3. **Be the same entity everywhere.** Ashfield Trading Ltd (16358723) as the operating
   company on every site, the parent site live (ashfieldtrading.co.uk currently does not
   resolve: NXDOMAIN), `sameAs` links between the 15 brands and the parent, llms.txt written
   firm-first on every site (six are posts-only headers), dated facts so nothing reads stale.
4. **Have things said about us that are not our own words.** The 44 research pages and 15
   calculator fleets have earned zero links and zero embeds because no outreach was ever
   sent. Faceless data-PR is the one off-site route the standing rules allow.

And one thing we must do to know whether any of it works:

5. **Measure it monthly.** Nine buyer prompts to ChatGPT (and Perplexity, Copilot) through
   DataForSEO's LLM Responses endpoint ($0.0006 a call plus tokens), 12 buyer queries on Bing
   and Google, AI sessions and leads per site and per engine in the console. Baseline pulled
   2026-09-27, see section 8.

### The tasks

| # | Task | Sites | Where it lives | Shared or per site |
|---|---|---|---|---|
| A0 | Baseline and monthly read: LLM prompt set, Bing and Google buyer-query ranks, AI sessions and leads per engine. Fix attribution: per-engine channel split, first-touch referrer, `.ai` whitelist, `sydney.bing.com` to copilot, `utm_source` on every link inside llms.txt and research CSVs (dark-traffic recovery) | all | `scripts/` new runner; SQL view migrations from `AI_SEARCH_GEO_PROGRAM.md` §B; console AI panel | shared |
| A1 | Entity block on homepage, /about and /services: firm, who for, where, how it works, what happens next, what we are not. One shared component, per-site copy. Put Property's JSON-LD on the shared schema lib. Fill gaps: Solicitors no FAQPage and self-describes as a connector; ecommerce no address, no WebSite | property, medical, contractors-ir35, care, charities first; rest after | `packages/web-shared/schema/`, `Property/web/src/lib/organization-schema.ts`, each `page.tsx` | shared component, per-site copy |
| A2 | llms.txt generated, not hand-kept, firm-first on all 15; Property onto the shared `buildLlmsFullRoute`; UTM-tag every link | all | `packages/web-shared/content/llmsFull.ts`, `<site>/web/public/llms.txt` | shared |
| A3 | Segment pages: one page per buyer situation per site, built from the lead messages we already hold (42% of Property leads are the incorporation decision; medical is clinicians going limited and pension allowance; contractors is IR35 and going limited). Property has 4 services pages and 63 service-search posts; the small sites have one services page and one to four "for" hubs. Target 6 to 10 segment pages per priority site, each answering the buyer prompt in the first 150 words, with the entity block, indexed on Bing and Google via IndexNow and inspection | priority five | per-site `services/` and `for/` routes, `packages/web-shared` entity block | per site copy, shared component |
| A4 | Fire the authority work: outreach for the 44 research assets and calculator embeds, faceless data-PR only, one wave per asset class; embed backlink fixed on the shared tools variant | all | `docs/_engines/` outreach kit already built; `packages/web-shared/tools` | shared engine |
| A5 | Answer-box (BLUF) and schema on the decision-stage posts only, roughly 150 across sites, not corpus-wide. A cited blog post converts at 3%, a named firm at 28%; this is second tier inside A | priority five | `AI_SEARCH_GEO_PROGRAM.md` §C.2-3, `optimisation_engine/apply/_schema_generator.py` | shared engine, not yet run |
| A6 | Keep the homepage lead path that works (the "Situation:" specialist widget converts AI arrivals at 28%; 80 of 125 are mobile). Check the form sits above the fold on mobile on all five | priority five | `packages/web-shared/leads/` | shared |
| A7 | Ashfield parent site deployed and resolving, listing the 15 brands, Companies House number, and the same entity facts | parent | `ashfield/` (built `aee192be`, owner GO'd; DB migration, Vercel project, domain open) | one site |

### Not in A, and why

- Google Business Profile: banned, suspension risk. Bing Places is the same class of risk;
  not proposed unless the owner wants it (decision 3).
- Directory listings that describe a site as an accountancy firm: the sites are referral
  networks, not practices. A listing that says otherwise is a false claim
  (see `ESTATE_CLAIMS_INTEGRITY`). Not doing.
- Reviews or ratings schema: no real reviews exist. Not doing.
- Robots and bot access: audited live 2026-09-27, all AI crawlers allowed on all 15 sites,
  bot user-agents get identical HTML. Nothing to fix; robots.txt is hand-copied per site
  and drifting, a shared template is hygiene, not a lever.

## 3. Workstream B: grow the sites whose readers convert

### The four sites and their real blockers

| Site | Posts | Indexed / sitemap | UK humans 90d | Leads 90d | Per 1,000 | What blocks growth |
|---|---:|---|---:|---:|---:|---|
| medical | 88 | 20 / 138 (14%) | 801 | 26 | 32 | Google knows the pages exist but will not index them: 52% never crawled, 32% discovered-not-indexed. Improved from 87% unknown in August; the newer wall has no fix shipped. Bing carries the site (412 of 638 blog humans) |
| contractors-ir35 | 62 | 73 / 154 (47%) | 111 | 8 | 72 | `/for` and `/services` canonical to homepage (13 URLs, shared template defect on six small sites); not in `gsc_config.py`; 4 posts in 60 days |
| care | 19 | 48 / 55 (87%) | 111 | 5 | 45 | No post in 60+ days; not in `gsc_config.py`; small canonical bug. Indexing is fine, the site is simply tiny |
| charities | 24 | 60 / 66 (91%) | 362 | 6 | 17 | Blog pages carry no lead form (confirmed in code); no post in 60+ days; not in `gsc_config.py`; small canonical bug |

Who these leads are (40 most recent, read): medical = NHS clinicians asking about
incorporating for private or locum work, pension annual allowance, first self assessment.
contractors = engineers and consultants going limited or restructuring for IR35. care = new
care and supported-living operators, CQC-facing. charities = trustees and CIC founders on
Gift Aid, VAT and annual returns. Every one is a person with a decision, which is why the
rates are what they are.

### What growth costs, honestly

Property's corpus earns about 5 UK humans per post per month at six months old. Medical earns
3.5, care 2, contractors 0.6 (half its pages unindexed). To add 1,000 UK humans a month to a
site by content alone takes 200 to 300 posts. At the standing quality bar (Opus or Fable
writer, two Opus QA tracks) that is roughly three agent runs per post. Property shipped 115
posts in the last 60 days, so 200 posts across four sites in a quarter is the established
pace, not a stretch, but it is the single biggest spend line in this plan and it is priced
in section 9.

The homepage route is far cheaper per lead. Medical's homepage took 49 UK humans in 90 days
and made 14 leads. Two hundred homepage arrivals a month from assistants and Bing would be
50 leads on medical alone. So B is not "make four more Propertys". It is: enough content
that each site is a credible, indexed entity with decision-stage depth (100 to 150 posts
each), plus Workstream A pointed at them.

### The tasks

| # | Task | Sites | Notes |
|---|---|---|---|
| B0 | Fix the shared canonical-hub defect (`/services`, `/for` canonical to homepage) on all six affected small sites in one change; ecommerce's fix `286365a8` is already on main, undeployed | contractors-ir35, care, charities, ecommerce, + 2 | shared template, one PR, one deploy |
| B1 | Register contractors-ir35, care, charities in `agents/config/gsc_config.py` so the engine's gap discovery and index tooling see them | three sites | mechanical |
| B2 | Medical index diagnosis, round two: why 44 discovered pages are not indexed. Candidates from the July diagnosis: crawl budget on a young domain, thin internal linking on a flat `/blog/[slug]` structure, sameness across posts. One Opus diagnosis agent, then the fix | medical | gated on the diagnosis |
| B3 | Blog capture kit on the seven sites whose blog posts render no form at all (verified live 09-27: charities, care, hospitality, pharmacies, startups-tech, ecommerce, crypto, plus agency). The design port ran on these; the capture stack (`BlogPostRenderer` + `LeadForm` + `MiniCapture` + `InlineMini`) was only wired on contractors-ir35 and construction-cis. Port contractors' blog template to the seven. Decision 1 | seven sites | shared kit, per-site template |
| B4 | Content waves, batch size 1, decision-stage topics first from each site's pool (contractors 1,257 rows, care 652, charities 1,660, medical 62 and needs a refill). Quarter target: medical 40, contractors 60, care 50, charities 50 = 200 posts | four sites | Opus/Fable writers, two Opus QA tracks each |
| B5 | Services and location pages on each (A3 overlap); the "who we are" entity block (A1) | four sites | |
| B6 | Bing coverage check per site after each wave (IndexNow on write is wired; confirm the drain runs at deploy) | four sites | |

### Targets, from current rates

| Site | UK humans a month now | Target month 6 | Per 1,000 (hold) | Leads a month now | Target month 6 |
|---|---:|---:|---:|---:|---:|
| medical | 311 | 1,200 | 30 | 6 to 11 | 35 |
| contractors-ir35 | 40 | 400 | 60 | 3 | 20 |
| care | 40 | 300 | 40 | 2 | 12 |
| charities | 120 | 400 | 20 | 2 | 8 |

The rates will fall as traffic broadens (Property's fell from 20 to 15 as readers grew),
so the month-6 lead targets assume the hold rates above, which are already below today's.

## 4. Workstream C: point Property at decisions

| # | Task | Evidence |
|---|---|---|
| C1 | Next Property waves draw only from decision-stage and service pools: incorporation (48 unpublished rows), CGT decisions (40), portfolio (43), tax planning (14), property-accountant-services (41), location (54). Explainer pools (landlord essentials 34, property types 23, employment 23, Section 24 49) paused | property-accountant-services converts at 37 per 1,000 and got 0 new posts in 90 days; property types got 31 new posts and converts at 3 |
| C2 | Inline, contextual calculator links inside the body of decision posts, not just the end block | every top-8 converter has one; none of the top-8 zero-lead posts do |
| C3 | **Owner ruling 2026-09-27: remove the calculator result gate, render the plain lead form directly beneath every calculator result, no popup of any kind.** Judge the form against the gate's own 90-day record: 32 leads (11 contactable), about 50 starts a week, 40 refused, 0 to 6 submits. Read at 4 weeks on the same three numbers per week. Paid-PDF day-14 read (09-28) is taken from data to 09-27 before this ships | 741 of 900 form errors since July are the gate's message box; 16 of 457 blocked sessions touched a contact field |
| C4 | Services pages (4 exist) and location pages onto Bing for buyer queries (A3) | 18 humans, 4 leads in 90 days |
| C5 | Refill the Property topic pool with decision-stage briefs; `pillar_topic` is empty on 483 of 500 rows so classification is by category only | |

Target: Property from 60 to 76 a month to 90 to 100 by month 6, on the same traffic.

## 5. Workstream D: commercial Google, the long tail

Nothing is built for this beyond A3 and A4, which serve it anyway. Watch, do not chase:

- Monthly: commercial-query impressions and average position from Search Console
  (baseline 3,138 impressions at position 25.6 in the 28 days to 24 Sep), and the 8-query
  top-10 check (baseline 0 of 75 slots).
- The nearest wins are local variants already at positions 11 to 22 (Leeds, Manchester,
  Headingley, Birmingham), not the head terms at 30 to 66. Location pages (C1, A3) are
  the only content built for this.
- Authority arrives through A4. Age arrives on its own.

## 6. What stops, what changes, what opens up

### Stopped or paused

| Item | Why |
|---|---|
| Net-new content on solicitors, generalist, agency | 2, 5 and 6 leads per 1,000. Readers are legal cashiers, payroll clerks, students. Factual maintenance only; no waves |
| Ecommerce blog expansion (49 assets, 21 extends) | 46 UK humans in 90 days; the site is crawl-starved and its canonical fix is undeployed. Deploy the fix, wait a quarter, then decide |
| High-street mechanic wave 3 (generalist trades) | Feeds the generalist reader pool |
| Message-rule relaxation | Dropped 2026-09-27. Blocked sessions are real people but 441 of 457 never touched a contact field |
| Judging Bing on its own leads | Bing is the index ChatGPT searches. Its value is the recommendation channel it feeds |
| Corpus-wide BLUF rollout | Narrowed to decision-stage posts (A5) |

### Changed

| Was | Now |
|---|---|
| Traffic as the growth metric | Homepage and services arrivals, AI-referred sessions, and leads per 1,000 as the metrics |
| Waves chosen by keyword volume and gap | Waves chosen by decision-stage intent first, on five sites only |
| One site (Property) carrying 70% of leads | Five sites each with an entity page, services pages, and a decision-stage corpus |
| AI work framed as citations for blog answers | AI work framed as being named as a firm; citations second |
| Off-site authority designed, never sent | Outreach fired, faceless, per asset class |

### Opens up

- A repeatable spin-up for any future niche: entity block, services pages, llms.txt, 100
  decision-stage posts, Bing-first, measured against the same nine-prompt test.
- A monthly answer to "did ChatGPT name us" that costs pennies, so the theory is tested
  rather than believed.
- Commercial Google positions that improve as a by-product, with a monthly read that will
  show when the head terms start moving.

### Added

- The measurement runner and console per-engine view (A0).
- Entity block component and unified schema (A1).
- Generated llms.txt (A2).
- Charities blog form (B3, decision).
- Services and location pages on four small sites (B5).
- 200 decision-stage posts on four sites plus Property's decision-stage waves.

### Removed

- Nothing live is removed. Explainer pools are paused, not deleted. Legacy per-site
  IndexNow copies (four dead scripts) are deleted as hygiene.

## 7. Sequence

**Phase 0, week 1 (mechanical, no owner input beyond the decisions in section 10).**
Baseline measurement run (done 2026-09-27, section 8). Canonical-hub fix on six sites.
GSC registration for three sites. Ashfield parent DNS and deploy. Medical index diagnosis.
Day-14 PDF read (2026-09-28). Charities form if approved.

**Phase 1, weeks 2 to 4.** Entity blocks, unified schema, generated llms.txt, services
pages on the five priority sites. Attribution migrations and console panel. First waves:
care 15, charities 15, contractors 15 posts, Property 15 decision-stage posts. Outreach
wave 1 for the research assets.

**Phase 2, months 2 to 3.** Medical fix shipped, medical wave 40. Second waves on care,
charities, contractors to reach the quarter totals. BLUF and schema on the decision-stage
posts. Location pages. Monthly read 1 and 2.

**Phase 3, months 4 to 6.** Waves continue at whatever the monthly read supports. Second
outreach wave. Month-6 read against the targets in section 9.

Every phase ends with one plain-language readout, not a stream. Deploys are owner-triggered
and batched per phase. Nothing in this plan creates a monitor, alert, cron or email; the
monthly read is a report the owner opens. If a scheduled gate-check is wanted (so nobody
has to remember the date), that is decision 5.

## 8. Baseline, pulled 2026-09-27

Nine buyer prompts to ChatGPT (gpt-5, web search on, one run each) through DataForSEO LLM
Responses; 12 head-term buyer queries on Bing and Google organic, UK, top 20. Spend $0.47.

| Site | Prompt | Named | Position | Named alongside |
|---|---|---|---|---|
| property | UK accountant specialising in landlords and buy to let | yes | 3rd of 7 | RITA4Rent, Provestor, Landlords Tax Services, Optimise, GoForma, Brathwaite |
| property | best for transferring rentals into a limited company | yes | 3rd of 6 | RITA4Rent, UK Property Accountants, Provestor, Alexander & Co, Fylde Tax |
| property | CGT specialist for selling a buy to let | no | | CIOT and ICAEW directories, RITA4Rent, Blick Rothenberg, TaxScouts |
| medical | accountant for NHS doctors and GP partners | yes | 9th of 9 | BW Medical, Sigma, Taxwise, Medical Tax Accountants and others |
| medical | specialist for locum doctors | yes | 1st | Taxwise, Larking Gowen, Yorkshire Medical Accountants, Sigma |
| contractors-ir35 | contractor accountant for IR35 and a new company | yes | 5th of 6 | Brookson, QAccounting, GoForma, Crunch, Honest Accounting |
| contractors-ir35 | best accountants for IT contractors | no | | Clever Accounts, Workwell, GoForma, Aardvark, Tech Accounting |
| care | accountant specialising in care homes | yes | 6th of 6 | Menzies, Bishop Fleming, Hawsons, LOYALS, The Care Home Accountants |
| charities | accountant for charities and CICs, Gift Aid | yes | 2nd of 6 | Social Sector Accountants, Taxwise, CIC Accountants, BFS Associates |

Named on 7 of 9. In the top 3 on 4 of 9. The two misses are the two prompts with no
matching page on our side. The citations ChatGPT showed were segment pages
(`medicalaccounts.co.uk/for-locum-doctors`), not homepages ranking for head terms.

Head-term rank: none of the five domains appear in the Bing or Google top 20 for any of the
12 queries. Several of the Bing result sets came back empty or off-topic (NHS pages for
"property tax accountant"), so the Bing pull is suspect and is not evidence about Bing rank
either way; it is re-run with a corrected request in the first monthly read. The Google
result agrees with the 8-query domain-age test.

What this changes in the plan: the "named at all" question is already mostly won. The work
is position (mid-list to top 3), coverage (every buyer situation has a page), consistency
(one run is one sample; the monthly read uses three runs per prompt and a 30-prompt set),
and volume (302 AI sessions a month while named 7 of 9 says the constraint is how many
people ask and how often we are the one they click).

## 9. Cost and agents

| Phase | Agents | Model tier |
|---|---:|---|
| Phase 0 | 6 to 8 (diagnosis, canonical fix, GSC config, entity copy audit, measurement runner) | Sonnet for mechanical, Opus for the medical diagnosis |
| Phase 1 | 60 writer runs + 120 QA runs for 60 posts, plus 10 to 12 for entity, schema, llms.txt, attribution | Opus or Fable writers, Opus QA |
| Phase 2 | 140 writer runs + 280 QA runs, plus 8 to 10 for BLUF, locations, outreach | same |
| Monthly read | 1 agent, about $2 of DataForSEO (30 prompts x 3 runs at $0.04, plus 24 SERPs) | Sonnet |

The waves are the spend. 200 posts at three runs each is 600 Opus-tier runs over a quarter,
the same pace Property ran in July and August. The owner approves each wave's size before it
launches (standing rule), and re-grading existing evidence is always preferred to a fresh
test wave.

## 10. Decisions needed (state as of 2026-09-27 evening)

1. **Blog capture kit on the seven sites with no blog form.** DONE, owner go 09-27
   (`c810c3ff`, `1aca7e5e`). Not deployed.
2. **Calculator gate.** DECIDED 09-27: gate and paid-PDF offer removed, one form directly
   under every calculator, no popup. BUILT and VERIFIED (`6f20d7d0`, `5b6c2cff`, S1a). Not
   deployed.
3. **Bing Places listings.** Recommend no for now. OPEN, default no.
4. **Phase 1 wave size.** APPROVED in principle 09-27, conditional on the coverage maps,
   which are now written (`919a67c9`). Wave 1 is 15 rows per site; see decisions 7 and 8.
5. **Monthly emailed gate-check.** DECLINED 09-27. The monthly read is a report.
6. **Week-1 fixes.** DONE: canonical-hub fix on care, hospitality, startups-tech,
   construction-cis (`bb297ab2`); GSC registration (`01f2f4b1`); prior-session Property
   tree committed as found (`b226ff38`). Deploy itself waits for the owner's word. Ashfield
   parent is a launch, not a fix, and is not bundled.
7. **Build below the keyword-volume rule (all five maps raise it).** NETNEW §8.2 rule 3
   wants 100 to 5,000 searches a month per subject. Medical: 2 of 113 priced subjects clear
   it. Care: 1 of 54. Charities: 12 of 53 missing cells. Contractors: 4 of 60, all
   calculators we already have. Property: almost none of the situation-shaped queries. The
   same sites convert at 32 to 72 per 1,000, Bing ranks them top 10 on conversational
   queries Google Ads prices at zero, and ChatGPT names them. The maps keep every failed
   rule on the row. Proposed: on these five sites, selection is by buyer situation, judged on
   leads per 1,000, Bing at 28 days and assistant naming, not Google impressions at 90 days.
   DECIDED YES 09-27 (owner: "yes to all three"). NETNEW §8.2 rule 3 and the 200-impression
   kill criterion are suspended for these five sites; the read is leads per 1,000 UK humans,
   Bing impressions and clicks at 28 days, and the monthly assistant-naming run.
8. **Wave 1 shape.** Every map puts segment pages first (Property: all 15 Wave 1 rows;
   charities 7 of 15; contractors 6; medical 5; care first). That is page-template and
   schema work at 800 to 1,200 words, not 3,000-word posts, and it pays off on assistant
   naming and Bing rather than Google position. Approve that shape, or keep Wave 1 as blog
   posts with the segment pages after. DECIDED 09-27: segment pages first.
9. **Specialist chat widget on calculator pages.** It still auto-opens top-right on the
   calculator pages. It is the estate-wide widget, not the gate, and was out of scope.
   Leave it for the 4-week read (one variable at a time), or turn off auto-open there?
   DECIDED 09-27: leave it.
10. **Deploy.** Everything above is committed locally and not pushed (20 commits since
    `d41835bd`). Say "deploy" and the order is: push, dependency-closure check, clean
    worktree at the pushed SHA, Property first (gate removal, one-form rule, 15 audience
    pages, with the `calc_pdf_offer` flag set off in prod the same day and the PDF day-14
    read recorded first), then the seven blog-kit sites, the four canonical-fix sites and
    the entity block on contractors, care, charities and Medical.
    **Owner ruled 2026-09-27 late: deploy everything tonight, then reversed the same night:
    "hold off on the deploy once everything is done".** Nothing pushed or deployed; all work
    is committed locally on main and waits for a fresh go. When it comes, the order is
    Property, Medical, contractors, care, charities, then Dentists and generalist for the
    s.464ZA patches; runbook = clean worktree at the pushed SHA, `vercel deploy --prod`
    per project (IDs in memory `vercel_cli_deploy_workflow`), then `calc_pdf_offer` off in
    prod `site_flags`, then live checks. IndexNow only if asked.
11. **Wave 1 on the four small sites.** DECIDED GO 09-27 ("go on the four sites"). Manifest
    composition: 20 segment pages (medical 5, contractors 5 plus a services-page rewrite held
    back, care 2, charities 7) through the S4a chain now, and 40 decision, question and number
    rows that are blog posts on those sites, through the S4b chain (spec below) once the four
    sites' post conventions are documented. About 184 agent runs in total.

## 11. Targets and the monthly read

| Metric | Now | Month 3 | Month 6 |
|---|---:|---:|---:|
| Estate leads a month | 100 | 150 | 210 to 250 |
| AI-referred sessions a month | 302 | 500 | 900 |
| AI-referred leads a month | 31 | 50 | 80 |
| Buyer prompts where ChatGPT names us (of 9, 3 runs each from month 1) | 7 | 8 | 9 |
| Buyer prompts where we are in the top 3 (of 9) | 4 | 6 | 7 |
| Prompt set widened to 30 buyer situations, share named | set in month 1 | 60% | 80% |
| Four small sites, leads a month combined | 13 to 18 | 35 | 75 |
| Property leads a month | 60 to 76 | 80 | 90 to 100 |
| Commercial Google, our slots in 75 | 0 | 0 to 2 | watch |

If month 3 lands under 130 the plan is wrong somewhere and the read says where: AI
sessions flat means A is not working; small-site humans flat means B is not; Property
flat on more decision-stage supply means C is not.

## 12. Risks

- **Truthfulness.** Every entity block says "specialist partner network", names Ashfield
  Trading Ltd, never "chartered", never a named accountant. Claims sweep by rule before
  any deploy (see `ESTATE_CLAIMS_INTEGRITY`).
- **Medical may resist.** The discovered-not-indexed wall could be a quality verdict on
  the corpus. If the diagnosis says so, medical's wave waits and its budget moves to
  contractors and care.
- **AI attribution is a floor.** In-app and mobile assistants strip the referrer; real AI
  arrivals are higher than measured. A0's UTM tagging narrows the gap.
- **Rates fall as traffic broadens.** Targets already assume lower rates than today.
- **Spend.** 600 Opus-tier runs in a quarter. Owner sees the count before each wave.

## Agents used to write this plan

Six agents 2026-09-27 (GSC pull, SERP and domain age, AI-readiness audit, small-site
state, Property inventory, baseline measurement). Paid spend $0.47 on DataForSEO. No repo
changes other than this document. Scratch files deleted.

## 13. Build and research specs (the reference every agent works from)

Owner 2026-09-27: "I need to know it's been planned, documented etc before you start building
anything, something to reference to avoid drift." These specs are that reference. An agent
prompt may summarise a spec but must point at this section; if the two disagree, this section
wins and the disagreement is reported, not resolved silently.

### S1. Property: remove the calculator result gate and the paid-PDF offer (BUILD)

Decision (owner, 09-27): no popup of any kind on the calculators; the result always shows;
the capture form renders directly beneath the result; the paid-PDF offer is removed and the
slot reverts to the plain `Workings` block it replaced on 09-14.

Invariant: exactly one variable changes for the comparison, held result versus shown result.
Same `MiniCapture` component, same fields, same validation, same submit path, same copy source.
New form id `calc_result_form` so the two surfaces never share a row.

Files: `Property/web/src/components/calculators/ResultGate.tsx` (always render children, inline
form beneath when `enabled`), `premium/PremiumCalculator.tsx` (`showResult` always true, gate
branch and `PdfOffer` removed, `Workings` restored, inline form beneath when
`placement !== "embed"`), delete `HeldResult.tsx`, `resultGateStorage.ts`, the Property
`ResultGateModal.tsx` wrapper, `lib/calculators/premium/pdfRequest.ts` and `PdfOffer` if
unreferenced; the shared `packages/web-shared/leads/ResultGateModal.tsx` only if Property was
its sole consumer. Analytics: add `calc_result_form` to `deploy-watch.ts` `MINIFORM_FORM_IDS`,
`value-score.ts`, `role-labels.ts`; keep `calc_result_gate` on the read side (historic leads);
rebaseline `BASELINE_MINIFORM_LEADS_28D` as commit `5a5cacb63` did so the deploy watch does not
mail a false ACTION-NEEDED. Untouched: `GateOrForm`, `CalculatorPageResources.tsx`,
`BlogPostRenderer.tsx`, `MobileToolSlot`, `SpecialistWidget`, `capture-steps.ts`, every other
site, the database.

At deploy (manager, owner-triggered): set the prod `site_flags` row `calc_pdf_offer` to
`enabled: false` the same day as the code, so the PDF test ends on one date. Its day-14 read
is taken from data to 09-27 first and recorded in `docs/property/STATE.md`.

Comparison read, 4 weeks after deploy, weekly, Property, UK humans, bot gate on:

| Surface | Weeks | Starts/wk | Refused/wk | Submits/wk | Leads (90d) | Contactable |
|---|---|---:|---:|---:|---:|---:|
| `calc_result_gate` (record, 06-29 to 09-27) | 13 | 37 to 68 | 26 to 49 | 0 to 6 | 32 | 11 |
| `calc_result_form` (new) | 4 | | | | | |

Verdict rule: more submits per week AND contactable share not worse means keep; fewer submits
means revert to the gate (one commit revert, the deleted files come back from git).

Checks before commit: typecheck, unit tests (three pre-existing failures allowed:
calculator-goldens fleet count, inbound-email ack, lead-dossier ack), production build,
rendered HTML of one calculator page contains `calc_result_form` and no held-result copy.

**S1a. One form under a calculator (owner, 09-27: "make sure we don't put 2 forms under a
calc now instead of 1").** After the gate removal the five dedicated calculator pages carried
three asks (the primary calculator's inline form, the premium tool's inline form, and the
`resource_block` mini form restored on 09-26) and premium blog posts carried two stacked (the
tool's form, then `resource_block`). Rule, every viewport: exactly one capture form directly
beneath a calculator result.

- Calculator pages (`/calculators/<five dedicated>` and `/calculators/[slug]` generic): the
  one form is the primary calculator's `calc_result_form`. Generic tools get it through the
  shared `Calculator` component's result slot (`resultCta`), `campaign = slug`, page variant
  only, never embed. The premium tool below renders results and `Workings` with no form
  (`ResultCaptureForm` only when `placement === "blog"`). `CalculatorPageResources` drops
  `GateOrForm`; its 09-26 justification ("only capture surface on a calculator page") no longer
  holds. The site-wide foot panel (`LeadCTAPanel`) is the page footer, not a form under the
  calculator, and is unchanged.
- Blog posts: when the post has a premium tool, the tool carries the ask (desktop inline
  `calc_result_form`, mobile `MobileToolSlot`), and `GateOrForm` is not rendered. Posts with
  a resource but no premium tool keep `GateOrForm` as today. Posts with neither keep
  `InlineMiniLeadForm`. The end-of-post `LeadForm` is unchanged everywhere.
- Consequence for the comparison read: `resource_block` exposure falls on calculator pages and
  premium posts, so the 4-week read compares `calc_result_form + resource_block` against
  `calc_result_gate + resource_block` on those surfaces, not the result form alone.
- Verification, rendered HTML after build: section-24 page exactly one `calc_result_form`, zero
  `resource_block`; one generic calculator page exactly one `calc_result_form`; the
  transfer-into-company post has `calc_result_form` and `lead_form` and no `resource_block`; a
  post with a resource and no premium tool still has `resource_block`. Then a browser check of
  the same four pages at desktop and 390px width, counting visible forms.

**S1a VERIFIED 2026-09-27 (commits `6f20d7d0`, `5b6c2cff`).** Headless Chromium against the
production build on localhost, four pages, 1280px and 390px, visible forms counted and
located: section-24 page and the generic CGT page each show the result at once, one
`calc_result_form` directly beneath it, the premium tool below with Workings and no form, and
the page-foot "Book your free consultation" panel 2,100px lower (pre-existing, page-level).
The transfer-into-company post and a landlord-essentials post each show one form under the
tool (desktop `calc_result_form`, mobile `mobile_tool`) and the end-of-post enquiry form
8,600px lower. No held-result copy, no PDF offer on any page. Note for the owner: the
specialist chat widget still auto-opens top-right on calculator pages; it is the estate-wide
widget, not the gate, and was not in scope. Two facts learned: the premium tool is
client-rendered (`ssr: false`), so static HTML cannot show its form and the browser check is
the only valid one; and no Property post today has a resource without a premium tool, so the
`GateOrForm` fallback branch is currently unreachable.

**Corrections to this document from the S3 maps (09-27).** Section 2 A3 said contractors had
no IT-contractors page; `/for/it-contractors` exists and ChatGPT still did not name it, so the
lever is the page's content, not its existence. Section 3 B0 listed contractors-ir35 among the
canonical-bug sites; its `/for` and `/services` were already self-canonical before the 09-16
deploy, and the live defect was on care, hospitality, startups-tech, construction-cis and
ecommerce (fixed `bb297ab2`, ecommerce `286365a8`). Inventory in section 3: care has six
services pages and five `for` hubs, not two; charities has five services pages, eight guides
and two `for` hubs, not two services and one guide; charities took 449 UK human sessions in 90
days, not 362. The medical map quoted 12 leads in 90 days; the leads table holds 26 (verified
`select count(*) ... source='medical' ... created_at >= now() - interval '90 days'`), the
map's figure was a filter error and its situations are unaffected. The B4 pool counts
overstate what the pools can feed: contractors' 1,257 rows are 1,117 used and 140 zero-volume
jargon, medical's 62 are all published, charities' 1,660 are a raw keyword scrape with no
category or intent on any row. Every Wave 1 brief on the four small sites is written fresh
from the map, not sliced from the pool; Property's pool still has decision-stage rows.

### S2. Blog capture kit on the seven sites whose posts render no form (BUILD)

Fact (live check 09-27): a blog post on charities, care, hospitality, pharmacies,
startups-tech, ecommerce and crypto renders zero form fields; the only lead path is the
"Book a call" sidebar link. Agency also lacks it but has none of the kit's dependencies and is
a paused site; excluded. Contractors-ir35 and construction-cis render three forms per post and
convert at 72 and 10 per 1,000.

Reference: `contractors-ir35/web/src/components/blog/BlogPostRenderer.tsx` and its
`blog/[category]/[slug]/page.tsx`. The seven sites already have `components/forms/LeadForm.tsx`,
`MiniCapture` wiring and the full `lib/leads/` stack (22 files), so this is adding surfaces,
not building forms.

Change per site, minimal: keep the site's existing post template (its design-kit sidebar,
reading progress, table of contents, schema all stay). Add two capture surfaces with the
estate's standard ids so analytics line up: (1) the site's `LeadForm` after the article body,
before related articles, `form_id = lead_form`, replacing the static "Book a call" text block
where one exists; (2) `InlineMiniLeadForm` (port from contractors if the site lacks it) after
the second H2, `form_id = inline_mini`. Do not add `ToolIsland`, `PremiumUpgrade`,
`NextStepOffer` or any calculator surface unless the site already has the registry they read.
Consent wording comes from the site's existing `LeadForm` config (estate LI notice), never
retyped. No copy invention: headings and body text for the form block come from the site's
existing `BLOG_CTA` constants.

Checks per site: typecheck; the site's unit and design tests (`cta-attribute-diff`,
consent-anchor tests where present); one production build per batch; rendered HTML of one post
contains two `<form>` elements with the two ids; the claims sweep on the changed files
(no firm claims introduced). Deploy batched with the canonical fix, owner-triggered.

Read: at 4 weeks, blog-entry leads per 1,000 UK humans per site versus the 90-day record
(charities 2 leads on 232 blog humans, care 0 on 51).

### S3. Coverage maps for medical, contractors-ir35, care, charities and Property (RESEARCH)

Purpose: make the waves comprehensive. The map is the complete statement of what a buyer on
each site needs to find, diffed against what exists, so the wave list has nothing missing and
nothing duplicated. No content is written in this step.

One Opus agent per site. Output: `docs/<site>/COVERAGE_MAP_2026-09.md` (human, one summary
page first) and `docs/<site>/coverage_map_2026-09.json` (machine, one row per cell). Budget:
DataForSEO under $2 per agent, keyword volume and peer-rank checks only.

Method, in order:

1. **Buyer situations.** From the site's real lead messages (`leads` where `source = <site>`,
   test rows out, read for meaning, never quote names, emails or phones), the site's `for/`
   hubs and services pages, and the AI baseline prompts in section 8. Each situation is a
   person and a moment ("GP partner taking on private work", "landlord with two BTLs moving
   them into a company", "trustee filing the first annual return").
2. **What each situation needs.** The decision they face; the questions on the way to it; the
   number they need (calculator, existing or missing); the proof they look for (research or
   data page); and the page that should answer "recommend an accountant for this" (the
   segment page, Workstream A3).
3. **Inventory diff.** Every existing blog post (frontmatter title and category), services,
   `for`, calculator and research page, and every row in the site's topic pool (`blog_topics`
   where `site_key = <site>`). Mark every cell COVERED (a page is the subject), PARTIAL (a page
   touches it, extend), or MISSING (pool row exists / brief needed). Subject match, not slug
   tokens (NETNEW §8.2 rule 4).
4. **Demand and eligibility on MISSING cells** (NETNEW §8.2): we earn zero impressions on it
   (GSC now registered for all five, Bing via the query client), a peer specialist ranks top
   20, monthly demand between 100 and 5,000. Cells failing a rule are kept in the map with the
   reason, never dropped.
5. **Manifest.** Ordered list of pages to produce: segment pages first, then decision pages,
   then supporting pages; each with working title in the buyer's words, intent type, target
   query, word band per NETNEW §8.3 (800 to 1,200 for coverage pages), calculator or embed to
   include, and the house-positions anchors the brief will need. The manifest is the full
   need, not a wave size; the first 15 are marked Wave 1.
6. **Ground truth.** `docs/<site>/house_positions.md` is the tie-breaker. No figures are
   asserted in the map that are not already in it or in primary legislation. No claims about
   the firm anywhere (see `ESTATE_CLAIMS_INTEGRITY`).

Sign-off gate: the owner reads the five one-page summaries; wave slices come from the
manifests only. Then S4.

### S4. Content waves on the four small sites and Property (BUILD, after S3 sign-off)

The existing net-new engine, unchanged (`NETNEW_PROGRAM.md`): PREP with the cannibalisation
audit and house-positions lock, RUN with one Opus or Fable writer per page, WRAP with the two
Opus QA tracks, deploy on the owner's word. Batch size 1. Picks come from the S3 manifest in
manifest order. Coverage page spec §8.3 applies (length floor withdrawn). Wave 1 per site is
the first 15 manifest rows; the owner approves each wave's size before launch and sees the
agent count (roughly three runs per page).

### S4a. Wave 1 segment pages: template, entity block, QA, writers (BUILD, decided 09-27)

Owner rulings 09-27: segment pages first; selection by buyer situation, volume rule suspended
on the five sites; planned and documented before building. This is the plan for the pages.

**Where the pages live (from the 09-27 route trace).**

| Site | Route | Driven by | New page = |
|---|---|---|---|
| contractors-ir35 | `/for/[slug]` | `src/data/contractor-types.ts` (`ContractorType[]`) | one object appended; route and sitemap fall out |
| care | `/for/[slug]` | `src/data/care-hubs.ts` | one object appended |
| charities | `/for/[slug]` | `src/data/charity-types.ts` | one object appended |
| medical | `/for-<slug>` | one `page.tsx` per page, `AudienceStage` object rendered by the site's `AudienceStageLayout` | one file in the existing pattern, plus a line in `sitemap.ts` |
| Property | none data-driven today | build `/for/[slug]` + `src/data/audiences.ts` (T1) | one object appended once T1 exists |

**Row shape, identical on every site, so writers produce one shape** (contractors'
`ContractorType`, already the shape on care and charities): `slug, title, headline, metaTitle
(≤ 60 chars), metaDescription (≤ 160 chars), intro, stats[{value,label}], challenges[{title,body}],
howWeHelp[{title,body}], faqs[{question,answer}]`. No `testimonial` (no real ones exist). Medical's
`AudienceStage` is mapped from this shape by the integrator, not authored separately. Word band
800 to 1,200 across intro, challenges, howWeHelp and faqs. The buyer's situation is answered in
the first 150 words of `intro`. Stats only from `house_positions.md` or primary sources, each
with its source in a trailing `sources` array the template does not render.

**T1, Property route (Sonnet).** `Property/web/src/app/for/[slug]/page.tsx` reading
`src/data/audiences.ts` (exported `Audience` type = the row shape above, empty array to start).
Renders with the site's existing `TopicHero`/`TopicSection` blocks, breadcrumb, `EntityBlock`
(T2) before the FAQ, FAQ, `LeadCTAPanel`. JSON-LD from the shared builders in
`packages/web-shared/schema/`: `Service`, `FAQPage`, `BreadcrumbList`. `generateStaticParams`
from the array; `sitemap.ts` maps the array (Property's sitemap is a static list today).
`/for-letting-agents` stays as it is. `metadata` with self-canonical.

**T2, shared entity block (Sonnet build, Opus copy).**
`packages/web-shared/design/marketing/EntityBlock.tsx` (the kit's marketing blocks live there).
Props: `{ firm, serves, where, howItWorks: string[3-4], next, notWhatWeAre }`, all plain strings
from each site's `niche.config.json` under a new `entity` key. Renders one labelled section
("Who we are", "Who this is for", "Where", "How it works", "What happens next", "What we are
not") as semantic HTML a model can lift, no card styling beyond the kit's section primitives.
Exports `PARTNER_NETWORK_SENTENCE` = the live consent wording verbatim from
`Property/web/src/config/site.ts:39` ("To answer your enquiry, your details may be shared with a
firm from our specialist partner network who will contact you. If that firm is unable to help,
your details may be passed to another firm in the network for the same purpose."). Wired into
the `for/[slug]` template on contractors, care, charities, into Medical's `AudienceStageLayout`,
and into T1. Homepages later (A1). The copy for the five `entity` objects is written by one Opus
agent from three sources only: that consent sentence, each site's live homepage and about copy,
and `ESTATE_CLAIMS_INTEGRITY` rules (never "chartered", never a named accountant, never "our
accountants", Ashfield Trading Ltd 16358723 as the operator, "introductions" not "advice").

**T3, QA coverage (Sonnet).** These routes have no automated checks today. One script
`scripts/check_audience_pages.py` over `**/web/src/data/{audiences,contractor-types,care-hubs,
charity-types}.ts` and `Medical/web/src/app/for-*/page.tsx`: no em-dash, `metaTitle` ≤ 60,
`metaDescription` ≤ 160, unique slugs, banned claim strings (chartered, ICAEW, ACCA, CIOT, "our
accountants", "we are accountants", "our team of", any personal name pattern from the claims
ledger), every FAQ answer non-empty. Exit non-zero only on a verified defect (a red run emails
the owner). Add `**/web/src/data/**`, `**/web/src/app/for/**`, `Medical/web/src/app/for-*/**`
to the `content-quality-check.yml` path globs and call the script there. Also: contractors'
`for/[slug]` emits no JSON-LD; add `FAQPage` + `Service` from the shared builders.

**Writers (Opus or Fable, one per page, batch size 1).** Input: the map row (`docs/<site>/
coverage_map_2026-09.json`, `wave = 1`), the site's `house_positions.md`, the site's existing
`for` rows as the voice sample, the row shape above, NETNEW §5.2 checks that still apply (no
em-dash, question-shaped headings, one current tax year leads, direct address, statute
references sparse). Output: one JSON file per page at `docs/<site>/_wave1/<slug>.json` matching
the row shape plus `sources`. No firm claims, no pricing, no named people. Never the phrase "we
advise"; the page describes the situation and what a specialist reviews.

**QA (Opus, two per page).** Track A factual: every figure and rule against `house_positions.md`
and primary law, verdict per figure. Track B editorial and claims: sameness across the site's
15, AI tells, thin sections, the banned-claims list, meta lengths, the 150-word rule. A page
ships only with both PASS; a FAIL goes back to its writer once, then to the manager.

**Integrator (Sonnet, one per site).** Appends PASS rows to the data file (Medical: writes
the page files + sitemap lines), runs `check_audience_pages.py`, typecheck, the site's tests,
`npm run build`, and greps one rendered page for the entity block, one `<form>`, `FAQPage`
JSON-LD and the self-canonical. Manager commits. Deploy on the owner's word.

**Order and count.** T1, T2, T3 and the entity copy run first (4 agents). Property's 15 pages
run as the pilot of the whole chain (15 writers + 30 QA + 1 integrator = 46 runs), rendered and
checked before the other four sites start (60 writers + 120 QA + 4 integrators = 184 runs).
Total Wave 1: about 234 agent runs, approved in principle 09-27 (decision 4).

**S4a STATUS 2026-09-27, late.** Property Wave 1 is BUILT and VERIFIED locally, not deployed.
Chain run end to end: 15 Opus writers, 15 Opus factual reviews (three pages needed substantive
corrections: para 17A misapplied and the six-dwellings rule on portfolio, the CIHC letting
carve-out on SPV and on profit extraction, NRL withholding timing and rebasing dates on
non-resident), 15 Opus editorial reviews, one cross-page sweep (intro closers varied, consent
sentence removed from row bodies, openers thinned, all links as anchors, sameness scan clean),
one Sonnet integrator. All 15 rows in `Property/web/src/data/audiences.ts`, live at
`/for/<slug>`, in the sitemap, with Service + FAQPage JSON-LD, the entity block and one form.
QA gate 0 findings, typecheck clean, 1640 tests, build green, headless render at 1280 and 390
clean. Commits `71c32445`, `efcb0694`. Reviews and sweep: `docs/property/_wave1/qa/`.
Template and entity block: `89e982ac`. Agent runs for the Property pilot: 47 plus 4 template
and QA-gate builders and 1 entity-copy writer.

Learned for the four small sites: writers must be told links are `<a href>` anchors from the
start; stats are strings; the consent sentence belongs to the template not the row; the
word-band count must include section titles and questions (two pages slipped over on the
stricter count); the topic pools do not feed these pages, the maps do.

NEXT: the same chain on medical (5 segment pages as files in the existing pattern plus 10
decision posts via the blog engine), contractors-ir35, care and charities (15 rows each into
their data arrays). Owner approves the count before launch: about 184 runs.

**Read.** Bing impressions and clicks per page at 28 days, `/for/*` entry leads per 1,000 at 4
weeks, and the monthly assistant-naming run with the 30-prompt set widened to name each new
page's situation.

**S4a/S4b STATUS 2026-09-27, late night (for whoever resumes).** All committed, nothing
pushed or deployed; deploy of Property, Medical, contractors, care, charities, Dentists and
generalist happens tonight per decision 10.

Segment pages, all committed: Property 15 `/for/<slug>` (`efcb0694`), care +2 hubs
(`d774ad28`), contractors +4 types with `it-contractors` replaced (`71eb6b30`), charities 5
types incl. the `cics` replacement + 2 services (`72c3cb9e`), Medical 5 `for-*` pages +
sitemap + the shared `html` prop on `CoverageCards`/`ProcessTimeline`/`FaqSection`
(`52e49278`).

Posts, all committed except charities integrating now: Medical 10 (5 new, 5 overhauls,
`c6696b13`), contractors 8 (5 new incl. `winding-up-taar-contractor-same-trade` as a new
slug rather than overwriting the live closing guide, 3 overhauls: fees, first-contract
checklist, pension carry-forward; `68753d98`), care 13 all new (`99389fb6`), charities 8 all
new (integrating now, commit to follow). Every post: Opus writer, Opus factual Track A, Opus
editorial Track B, per-site sweep, Sonnet integrator; reviews in
`docs/<site>/_wave1/qa/posts/`, sweeps in `_wave_sweep.md` there; shared QA brief
`docs/_engines/WAVE1_POST_QA_BRIEF.md`; writer briefs `docs/care/_wave1/POST_BRIEF.md`,
`docs/charities/_wave1/POST_BRIEF.md`.

Recital ownership rule adopted in the sweeps: one owner post per statutory recital, siblings
cut to a clause and link; prose attribution in FAQs, no "Source: url" tails; author key is
RSS-only on care and unrendered on charities.

Live factual defects found and fixed: charities electricity 0% 1 Oct 2026 to 31 Mar 2027
(SI 2026/987) on two live posts (`cf41ecf3`); care Ofsted-registered children's homes are
state-regulated for the welfare exemption, banned "advice" phrasing removed on two live
posts (`4687f500`); RCB 2/2025 "where necessary, refuse" qualifier on the live care
edge-cases post (`99389fb6`); CTA 2010 s.464C omitted 30 Oct 2024 and re-enacted as s.464ZA:
14 live posts (10 Property, 1 Dentists, 3 generalist) said the rules were repealed outright,
being corrected now with a factual QA pass; generalist service-charge post wrongly said
charitable fuel and power is zero-rated.

House positions updated: contractors §14 (TAAR scope on strike-off, s.464ZA), charities 20
(electricity addendum) and 22 (CAICE 2004 s.26(3) anchor), care sections E and F (BADR
£1m s.169N, AEA £3,000, Ofsted block).

Schema/llms parity tonight: charities for/services Service+FAQPage+BreadcrumbList from the
shared lib, contractors breadcrumb (`8a520b16`); Medical audience FAQPage answers stripped
of anchors; llms.txt back-filled on contractors and Property (`99389fb6`), Medical/care/
charities in progress; care blog template gaining a FAQ section + FAQPage (all care posts
previously emitted none); care for/services Service+Breadcrumb in progress.

Deferred to next session: EntityBlock on homepage/about/services for all five sites (plan
task A1, entity copy already in `niche.config`), migrating five hand-rolled organisation
schema builders onto the shared library, Property onto `buildLlmsFullRoute` (its llms files
are static and drift).

Property PDF test: day-13 read recorded in `docs/property/STATE.md` (111 exposures, 0 paid);
gate + PDF removal deploy tonight; `calc_pdf_offer` flag to be set off in prod after the
deploy.

Lessons (retained from the build): the site loaders read `updatedDate` (set it alongside
`dateModified`); the `for/[slug]` templates on contractors and care rendered bodies as text
(fixed); house positions on contractors has no settlements section and on medical none on
disclosure or residence (posts used primary law, flagged).

### S4b. Wave 1 decision, question and number pages on the four small sites (BUILD, 09-27)

The 40 non-segment Wave 1 rows (medical 10, contractors 9, care 13, charities 8) are blog
posts on those sites. Conventions traced 09-27 (loader `<site>/web/src/lib/blog.ts`,
`packages/web-shared/lib/frontmatter.ts`, `scripts/validate_blog_content.py`):

- **File** `<site>/web/content/blog/<slug>.md`. Writers deliver to `docs/<site>/_wave1/posts/
  <slug>.md`; the integrator moves PASS files into `content/blog/` after QA.
- **Frontmatter, required or the build throws:** `slug`, `title`, `date`, `category`,
  `metaDescription`. **Also required by the validator and this wave:** `metaTitle` (≤ 60),
  `metaDescription` (≤ 155), `h1`, `summary` (40 to 60 words, the answer), `author` (the
  site's editorial-team string, copied from the newest existing post), `canonical` (Medical
  `<site url>/blog/<slug>`; the other three `<site url>/blog/<category-slug>/<slug>` where the
  category slug is the site's `slugifyCategory` of the label: lowercase, `&` to `and`,
  spaces to hyphens, brackets and commas stripped), `dateModified` (= `date` on a new post;
  bumped on an extended one), `faqs` (4 to 6 `{question, answer}`), `keyTakeaways` (3 to 5
  one-sentence strings). `generator: claude-opus` or `claude-fable` as the writer's model.
- **Category** must be one of the site's existing labels, verbatim: Medical: GP Accountant
  Services, GP Practice Management, GP Tax & Accounts, Incorporation & Company Structures,
  Locum Tax, Medical Expenses, NHS Pension Planning, Private Practice. Contractors: IR35
  Status, Umbrella vs Limited Company, MTD and Compliance, Contractor Accounting Basics,
  Limited Company Tax, Pension and Dividends, Expenses and Deductions. Care: Business
  Structure and Acquisition, CQC and Financial Compliance, Care Home Accounts and Funding,
  Fees, FNC and Local Authority Rates, Payroll and Workforce Costs, VAT and Welfare
  Exemption. Charities: Charity Finance, Charity Accounts and SORP, Charity Governance,
  Charity VAT, Gift Aid, Independent Examination and Audit, Trustee Compliance, CICs and
  Social Enterprises.
- **Body is raw HTML**, never markdown: `<p>`, `<h2>`, `<h3>`, `<ul>`/`<ol>`, `<table>`,
  `<strong>`. Internal links `<a href="/blog/...">` (Medical flat, others with the category
  slug) and `<a href="/calculators/...">`, at most five, each verified on disk. No
  shortcodes, no CTA markup (the template injects CTAs by category).
- **Shape (NETNEW §8.3 coverage page):** 800 to 1,200 words in the body; the subject is the
  title in the words people search; the first paragraph answers the question with the
  number; question-shaped H2s with the answer in the first sentence under each; one current
  tax year leads; direct address; statute references sparse; no em-dashes; British English;
  no pricing; no named people; no firm claims; "a specialist reviews", never "we advise".
- **PARTIAL rows** (an existing post is the subject): EXTEND that post in place. Keep slug,
  canonical, date and category; rewrite the body to the shape above with the missing
  decision or answer added; bump `dateModified`; deliver the full replacement file under the
  existing slug.
- **QA** as S4a: Track A factual against `docs/<site>/house_positions.md` and primary law,
  Track B editorial and claims plus the validator's rules, then one per-site sweep. Integrator
  moves files, runs `scripts/validate_blog_content.py --site <site>` (extended 09-27 to cover
  contractors-ir35, care and charities, T4), typecheck, tests, build, and greps one rendered
  post per site for the FAQ JSON-LD, the canonical and the category route.
- **Read:** Bing impressions and clicks per post at 28 days; leads per 1,000 on blog entries
  per site at 4 weeks against the 90-day record.
