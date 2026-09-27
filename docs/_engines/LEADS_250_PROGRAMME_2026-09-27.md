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
   Recommend yes. OPEN.
8. **Wave 1 shape.** Every map puts segment pages first (Property: all 15 Wave 1 rows;
   charities 7 of 15; contractors 6; medical 5; care first). That is page-template and
   schema work at 800 to 1,200 words, not 3,000-word posts, and it pays off on assistant
   naming and Bing rather than Google position. Approve that shape, or keep Wave 1 as blog
   posts with the segment pages after. Recommend segment pages first. OPEN.
9. **Specialist chat widget on calculator pages.** It still auto-opens top-right on the
   calculator pages. It is the estate-wide widget, not the gate, and was out of scope.
   Leave it for the 4-week read (one variable at a time), or turn off auto-open there?
   Recommend leave. OPEN.
10. **Deploy.** Everything above is committed locally and not pushed. Say "deploy" and the
    order is: push, dependency-closure check, clean worktree at the pushed SHA, Property
    first (with the `calc_pdf_offer` flag set off in prod the same day and the PDF day-14
    read recorded first), then the seven blog-kit sites and the four canonical-fix sites.

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
