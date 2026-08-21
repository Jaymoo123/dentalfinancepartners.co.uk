# Property expansion proposal, 2026-08-21

Follow-up to `briefs/property/AUDIENCE_SCOPING_2026-08-21.md`. Three directions the
owner approved, turned into one build plan. No site content changed. Nothing committed.
No deploy or indexing action taken.

---

## Recommendation, in three lines

Build all three, none of them next. **Estate agents is the cheapest and the biggest
measured signal** (`renters rights act 2026` runs 86x our own core head term on identical
method, and the substance is already written), **developers is one page of structure over
23 posts we already own**, and **rural is a real cluster that belongs on Property, not a
new site**. Sequence them behind the live programme: agents after Phase C, developers
after Phase D, rural after Phase E. One action is available today and costs a single
boolean: `/embed` is listed in our sitemap and simultaneously told not to index.

---

## What the new data changed

| ID | Source | Pulled | What it is |
|---|---|---|---|
| N1 | `briefs/property/_competitor_devrural_keywords_2026-08-21.json` | 2026-08-21 | 80 rows, 68 unique keywords, 5 of the 7 tracked accountancy domains |
| N2 | `briefs/property/_competitor_ruralfirms_keywords_2026-08-21.json` | 2026-08-21 | 110 rows, saffery.com only. oldmillgroup returned zero rows |
| N3 | Bing `GetKeywordStats`, free, GB / en-GB | 2026-08-21 | Weekly Bing impression history, 24 seeds. Directional, see LIMITATIONS |
| N4 | Bing `GetRelatedKeywords`, free | 2026-08-21 | 90-day window. Different method from N3, **never compare the two numbers** |
| S1-S7 | As defined in the scoping report | 08-18 to 08-21 | Corpus grep, competitor harvests, fresh GSC, fresh Bing, competitor scout |

Three findings move the argument.

**1. The developer whitespace is confirmed, and it is whitespace with almost no volume
in it.** Seven tracked accountancy domains hold 68 unique developer and rural keywords
between them (N1). Splitting that file: 45 keywords are rural (30,280 combined volume),
23 are developer (2,310 combined volume). Only two developer keywords sit in anyone's
top 10, both ukpropertyaccountants: `accountants for property developers` (50/mo, p3)
and `gross development value` (260/mo, p5). This is a **correction to the scoping
report**, which saw 5 developer keywords and read the space as empty. It is not empty.
It is contested by one firm, at low volume, on commercial terms.

**2. Rural has an owner, and that owner is losing the half of the market that matters.**
Saffery's single article at `/insights/articles/agricultural-property-relief/` carries 48
of the 110 rows in N2, reaching 31,780 combined volume. Split by position band:

| Band | Keywords | Combined volume | Share of volume |
|---|---|---|---|
| Top 10 | 13 | 2,320 | 7% |
| p11 to p30 | 14 | 6,570 | 21% |
| p31 and worse | 21 | 22,890 | **72%** |

Saffery holds the **adviser register**: `apr and bpr` p2, `apr farming` p3, `farmers
averaging rules` p3, `changes to agricultural property relief` p3, `agricultural property
relief` (1,000/mo) p4, and every 140/mo IHT-agricultural-relief variant at p4. It does
not hold the **consumer register**: `farmers inheritance tax` (4,400/mo) p50,
`inheritance tax farmers` (4,400/mo) p51, `inheritance tax and farms` (2,900/mo) p28,
`inheritance tax farm` (2,900/mo) p31, `farming inheritance tax` (2,900/mo) p35,
`inheritance tax farmland` (2,900/mo) p36, `farm tax` (1,000/mo) p25. ukpropertyaccountants
occupies the same consumer family from p40 to p57 (N1). Neither tracked set puts anybody
in the top 10 for the 4,400/mo head.

That gap between the two registers is the whole opportunity, and the consumer register is
the one Property already writes in.

**3. The biggest measured demand signal in either report is on the estate-agent track,
and we already wrote the substance.** On `GetKeywordStats`, identical method and window
to the scoping report's numbers:

| Seed | Weeks of data | Median weekly Bing impressions | Max |
|---|---|---|---|
| `renters rights act 2026` | 26 | **774.5** | 3,911 |
| `renters rights act` | 26 | 352.0 | 722 |
| `renters rights act information sheet` | 22 | 98.5 | 532 |
| `business property relief` | 26 | 44.5 | 82 |
| `periodic tenancy` | 26 | 24.5 | 36 |
| `agricultural property relief` | 26 | 24.0 | 37 |
| `land remediation relief` | 15 | 18.0 | 27 |
| `landlord tax` (our core head, for scale) | 7 | 9.0 | 19 |

`renters rights act 2026` is 86x our own core head term and 32x the largest signal the
scoping report found. Every developer seed returned zero weeks of recorded history
(`property developer tax`, `property development company tax`, `accountant for property
developers`, `cis property developer`, `gross development value`, `property development
finance`). So did every agent-phrased seed (`letting agent landlord tax`, `renters rights
act letting agents`, `client money protection letting agents`, `what landlords need to
know 2026`). **The demand is not in the agent-phrased query. It is in the thing agents
have to explain.** That distinction shapes track 3 entirely.

The related-keyword tail off `renters rights act 2026` (N4, 90-day window) says what kind
of thing people want: `renters rights act information sheet` 1,403, `renters rights act
2026 information sheet` 1,111, `renters rights information sheet` 985, `renters rights
act information sheet 2026` 603, `new periodic tenancy rules and regulations` 608, `new
tenancy laws 2026` 312, `new tenancy agreement 2026` 288, `new landlord rules 2026` 243.
People are looking for a document to hand to somebody. Agents hand documents to landlords.

---

## Track 1. Rural and landed estates

### The pitch

Be the current-law authority while the market lags. Our locked position on the April 2026
cap is more accurate than gov.uk's own summary page and, per the scout (S7), more current
than either incumbent hub. `docs/property/house_positions.md` §15.4 locks it: from
6 April 2026 a **combined £2.5m rolling 7-year BPR + APR allowance** under IHTA 1984
s.124D as inserted by FA 2026 Sch 12 para 4, 100% relief below, **50% above** giving an
effective 20% IHT rate, **AIM shares at 50% as a separate sub-tier that does not consume
the allowance**, anti-forestalling on lifetime transfers from 30 October 2024, and trust
anti-fragmentation for same-settlor multi-trust structures settled on or after that date.
The gov.uk announcement summary still carries the stale £1m headline from October 2024 and
is a named do-not-cite (F-102, verified three ways 2026-05-27).

§22.1 locks the other edge: pure BTL fails BPR on the Pawson investment line. That is what
keeps the cluster honest, because it tells a landlord reader the answer is often no.

### Where it lives, and this is the decision

**Recommend: Property, under a new `/landed-estates` root pillar. Not a new site.**

The `umbrella_leverage_finding` memory measured propertytaxpartners.co.uk at 13 referring
domains, so a new domain forfeits almost no authority and the choice is a brand-fit call
rather than an equity one. On brand fit, Property wins on three counts that a new domain
would have to rebuild from zero:

1. The ground truth already exists here. §15.4, §22.1, §9 and the whole IHT lock family
   live in Property's `house_positions.md`. A new site starts with no verified corpus, and
   the §9 dossier pipeline cannot run without one. That is a multi-week prerequisite, not
   a setup cost.
2. Eight posts already sit here (`agricultural-property-relief-mixed-estate-1m-cap`,
   `iht-april-2026-bpr-apr-cap-property-impact`, `bpr-pure-btl-pawson-test-why-buy-to-let-fails-investment-line`,
   `iht-1m-bpr-apr-cap-mixed-trading-investing-landlord-allocation`,
   `agricultural-relief-for-inheritance-tax-key-benefits`, `farmland-supply-value-drops-is-iht-reform-to-blame`,
   `serviced-accommodation-bpr-eligibility-pawson-test`, `fic-iht-treatment-bpr-myth`).
   Splitting them across two domains creates the duplicate problem the estate has already
   been burned by.
3. The same memory's second finding binds here: brand names constrain harder than domains.
   "Property Tax Partners" credibly answers "how does the IHT cap hit my mixed estate". It
   does not credibly answer "what is my herd basis election". **The brand boundary and the
   scope boundary are the same line**, which is why bounding the scope also settles the
   site question.

**The reversible path.** The boundary below is permanent, so the two halves never overlap.
If the owner later wants the full farming vertical, it is built on the half Property never
wrote (herd basis, averaging, BPS and SFI, tenancy law, natural capital) on its own domain
per the construction-cis precedent, and Property keeps the tax half untouched. Zero content
overlap means zero redirects, which matters because collapsing pages and adding
`DUPLICATE_REDIRECTS` is a standing never. Revert cost if the pillar underperforms: the
pillar is one route file and the posts stay as blog posts. Blast radius: additive only,
nothing existing changes.

### The hard scope boundary

**In scope:** the s.124D combined allowance and its arithmetic, mixed-estate allocation
across farmland plus trading business plus BTL under one allowance, the Pawson line and
why BTL fails, APR qualifying conditions and the occupation tests, the AIM sub-tier,
anti-forestalling on lifetime gifts, trust anti-fragmentation, CGT and SDLT on agricultural
land where it is a property-tax question, succession-timing arithmetic.

**Out of scope, and we concede these deliberately:** herd basis, farmers' averaging (note
saffery holds `farmers averaging rules` at p3 and we are choosing not to contest it), BPS
and SFI payments, agricultural tenancy law under AHA 1986 and ATA 1995, natural capital
and biodiversity net gain, the agricultural flat rate scheme, farm budgeting. None of it is
covered by any house position and none of it is property tax. Writing it here would be
writing outside our verified corpus, which is the A* bar failing.

### Build plan

| Item | Count | Note |
|---|---|---|
| §9 dossier | 1 | Runs before any writing. Uncapped harvest on the APR/BPR family, three-source union, consensus map, reconciliation ledger, freeze |
| `/landed-estates` pillar | 1 route | Root-level, matching the `/leasehold` and `/landlord-compliance` convention. Carries the in-force table and the £2.5m arithmetic |
| Net-new posts | 8 to 10 | Consumer register, aimed at the p25-to-p51 band nobody holds. Dossier decides the final list |
| EXTEND on existing | 8 posts | The existing agri/BPR slugs, graded by the dossier |
| Calculator | 1 | Combined BPR + APR allowance calculator: allowance used, allowance remaining, 50% band above, effective 20%. Built as a `GenericTool` in `src/lib/calculators/tools/`, plus golden tests |

**Slug housekeeping, and the answer is do nothing.** The scoping report flagged three
slugs still reading `1m-cap`. Renaming them means redirects, which is a standing never.
The bodies are already correct (£2.5m dominates, every £1m mention is the explicit stale
gov.uk contrast). Leave them. The dossier decides whether new canonical pages carry the
£2.5m phrasing in their own slugs, which is the rewrite-not-collapse answer.

### Expected shape of return

Slow and compounding, not a spike. The volume is real (22,890 of combined volume sits at
p31 and worse across the two incumbents) but it is IHT-planning intent, which converts on
a long lag and via enquiry rather than tool use. Read at 90 days, not 28. Honest failure
trigger: if the consumer-register family has not moved inside p30 by the 90-day read, the
wedge thesis is wrong and the cluster stops at what is built.

---

## Track 2. Property developers

### What is actually missing

23 posts already carry this audience and they are technically deep: RPDT, land remediation
relief at both the 100% and 150% mechanics, the s.356OH and s.517H anti-fragmentation rule,
VAT on commercial-to-residential conversion at the 5% reduced rate, Schedule 10 paragraph 12
option-to-tax disapplication, condition C and condition D incorporation-relief denials,
non-resident developer scope under FA 2016, Sch 15 SDLT partnership interaction. What is
missing is not knowledge. It is a front door. `/services` carries landlord-accountant,
non-resident-landlord, property-accountant and property-tax-advice, and no developer
surface at all, while `public.sites` already names property developers in the registered
buyer persona.

Our own GSC says the intent already finds us: `accountant for property developers west
midlands`, 14 impressions, average position 11 (S5).

### The laziest structure that works

**One `/property-developers` root pillar. Not a pillar plus a service page.**

The commercial term `accountants for property developers` carries 50/mo and is held at p3
(N1). Building a separate `/services/property-developer` page to chase 50/mo, alongside a
pillar that has to exist anyway to bind 23 orphaned posts, is two surfaces competing for
one small intent. That is the cannibalisation shape the estate already polices. Put the
commercial answer inside the pillar as a "work with us" block, ship one surface, and skip
the second. If the pillar earns the commercial term and the owner then wants a dedicated
service page, that is a later additive decision with the data to justify it.

| Item | Count | Note |
|---|---|---|
| §9 dossier | 1 | Small. The harvest is thin by construction, so expect mostly EXTEND grades |
| `/property-developers` pillar | 1 route | Binds the 23 posts, carries the commercial block |
| Connective posts | 5 to 6 | The missing spine, not more technical depth. Candidates: a developer tax overview, sole trader vs company for a development, profit extraction from a development company, SDLT for developers, the investor-vs-developer decision as a standalone (currently only `are-you-a-property-investor-or-developer` and `property-development-tax-trading-vs-investment-income`) |
| Calculators | 0 | `development-finance-calculator.ts` and `capital-allowances-calculator.ts` already exist |

### CIS belongs on construction-cis, and it already is there

Checked rather than assumed. `construction-cis/web/content/blog/` already carries
`cis-for-property-developers.md` (titled "CIS for Property Developers: Deemed Contractor
Rules Explained", covering the £3m rolling 12-month threshold, de minimis, and the
new-build VAT zero-rating interaction), plus `deemed-contractors-explained.md`,
`cis-for-housebuilders.md`, `cis-contractor-registration-guide.md` and
`cis-for-labour-agencies.md`. Trade Tax Specialists is a separate live site with 82 posts.
Property holds three legacy generic CIS posts (`cis-templates`,
`cis-deduction-by-contractors-in-the-uk`, `beginners-guide-to-cis-verification-in-the-uk`).

**Recommendation: write no new CIS content on Property.** The pillar carries one paragraph
answering "does CIS bite me" (the £3m deemed-contractor threshold is a fact, not a cluster)
and stops there. Property answers whether it applies; construction-cis answers how to
operate it. No cross-site link is proposed, because that is a separate estate-level
question about linking between brands of the same opco and it is not needed to make this
work.

### Expected shape of return

Small and quick. This is a structure fix, not a demand play. Every developer seed returned
zero weeks of Bing history and the whole tracked competitor set holds 2,310 combined volume
across 23 keywords. The return is a navigable front door for 23 posts that currently have
none, plus a shot at a commercial query we already reach at p11. Honest expectation: single
digit clicks, not a traffic event. It is worth doing because it is cheap and because the
posts are already paid for.

---

## Track 3. Estate and letting agents as a relationship channel

### Reframed per the owner

Not a client-acquisition play. The owner's framing: *"not necessarily from a can-we-get-clients
perspective, but more from a relationship perspective. we are directly relevant in a different
way. if we just put the information out there for them to see us, that might bear fruit in
other ways we can't yet consider down the line."*

That reframe survives the scoping report's SKIP verdict, because the SKIP was about the
buyer. The scoping report was right that agency accountancy is a different buyer and would
dilute the brand. **This track does not sell agents anything.** It is a resource surface, so
the brand-dilution objection does not apply. That distinction has to be visible in the build
or we recreate exactly what the scoping report warned against: no service tier, no pricing,
no claim to do agency accounts, no client money account work.

### The demand is real, but it is not in the agent-phrased query

Every agent-phrased seed returned zero weeks of Bing history (N3), and
`GetRelatedKeywords` on those seeds returned Hunters, Connells and Huntress (N4), the same
brand-drift failure the scoping report documented. Meanwhile the thing agents have to
explain, `renters rights act 2026`, runs at 774.5 median weekly impressions.

So do not chase agent-phrased keywords. **Publish the landlord-law explainers in the
register an agent needs, and let agents find them by searching the same thing their
landlords are searching.**

### We already wrote the substance

12 posts already carry the RRA family (`renters-rights-act-2026-tax-implications-landlords`,
`renters-rights-act-section-21-abolition-landlord-operational-mechanics`,
`renters-rights-act-periodic-tenancy-switch-landlord-obligations`,
`renters-rights-act-possession-grounds-reform-section-8-landlords`,
`renters-rights-act-rent-increase-section-13-tribunal-route`,
`renters-rights-act-property-redress-scheme-mandatory-enrolment-landlords`,
`rra-2025-landlord-enforcement-civil-penalties-banning-orders-defence`,
`tenancy-agreement-template-rra-2025-compliant-clauses`,
`section-21-abolition-uk-landlord-possession-guide-2026`,
`periodic-tenancy-default-ast-conversion-mechanics`, `a-complete-guide-to-periodic-tenancy`,
`landlords-considering-selling-portfolio-rra-2025-tax-implications`), and 43 files mention
the Act. §20 of `house_positions.md` locks the whole regime across 13 subsections including
the commencement timeline at §20.12.

What is missing is the entry point and the register. These are written for landlords. An
agent needs the version that answers the question a landlord just asked them on the phone.

### The content shape

A `/for-letting-agents` hub plus 4 to 6 explainers. The estate precedent is the Solicitors
site's four `/for-<audience>` hubs. Register: "what your landlords will ask you this year",
never "accountancy for letting agents".

Candidate explainers, all inside existing locks:

1. **RRA 2026 commencements: what is in force and what is not.** The single highest-signal
   topic we have measured. §20.12 locks the timeline.
2. **The periodic-tenancy switch, in the order it actually happens.** `periodic tenancy`
   itself runs at 24.5 median weekly, matching `agricultural property relief`.
3. **MEES: what is law today versus what your landlords think is law.** §26.3 is a critical
   do-not-write that forbids asserting EPC C 2030 as enacted. **Turn the constraint into the
   hook.** The enacted position is the EPC E floor under SI 2015/962 and the £3,500 cap in
   reg 24; EPC C 2030 is policy aspiration with no SI laid. Agents field the wrong version
   daily. Being the page that says so correctly is the entire value.
4. **MTD for ITSA for a managed portfolio: who files what.** §19.13 already locks the
   letting-agent managed-portfolio position, and `mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly`
   already exists to extend from.
5. **Deposit and client-money tax edges**, scoped strictly to the landlord's tax treatment.
   Not CMP compliance, which is the agent's own regulated obligation and outside our
   competence.
6. **The landlord database and redress scheme enrolment**, §26.5 and §26.6.

### The embeddable asset angle, and the one thing available today

`/embed` already exists, already renders one-line iframe snippets for every tool in the
registry via `/embed/[slug]`, and its own hero copy already names the audience: *"Built for
mortgage brokers, conveyancers, letting and estate agents, and buy-to-let blogs."* Five
tools have hand-built embed routes (stamp-duty, section-24, incorporation-cost, mtd-checker,
portfolio-profitability) and 19 tools exist in the registry overall.

**The problem: `/embed` is listed in `src/app/sitemap.ts` line 25 and simultaneously set to
`robots: { index: false, follow: true }` in `src/app/embed/page.tsx`.** We advertise the
page in the sitemap and tell crawlers not to index it. An agent searching for a free stamp
duty calculator to put on their own site cannot find the page we built for them.

The per-calculator embed routes being noindexed is correct and should stay, because the
canonical indexable version lives at `/calculators/<slug>`. The gallery page is different:
it is the only surface that exists to be found by the person doing the embedding.

**Recommend flipping `/embed` to indexable.** Blast radius: one page becomes eligible for
indexing, no existing URL changes, no redirect. Revert: flip the boolean back. This needs
no dossier, no writing and no wave, and it can be batched into the next owner-triggered
deploy whenever that happens.

Which calculators would an agent actually embed or link, on the evidence: **stamp-duty-calculator**
(the single most common question an agent fields from a buyer), **rental-yield-calculator**
(the landlord-acquisition conversation), **section-24-calculator** and **rental-income-tax-calculator**
(the "is it still worth it" conversation), and **mtd-checker** (the question every landlord
will ask an agent through 2026 and 2027). The first, third and fifth already have dedicated
embed routes; the other two are already reachable through the generic `/embed/[slug]` route.
**Zero new tools are needed for this track.**

### How it compounds, without any outreach machinery

An agent who finds a correct RRA explainer forwards it to their landlord clients, because
answering the same question forty times is the agent's actual daily problem. The landlord
arrives on a Property Tax Partners page already framed by someone they trust. An agent who
embeds a calculator puts a persistent "Powered by Property Tax Partners" line on their own
site, which the existing `EmbedAttribution` component already renders. Both are referral
surfaces that run without anyone being contacted.

**Explicitly not proposed, and these are standing rules not preferences:** no outreach
email, no contact-form outreach, no partner or affiliate machinery, no new notification,
digest, alert, cron or monitor, no gated asset, no expert-dependent or quote-based PR (the
owner is not a qualified accountant and off-site authority must stay faceless), and no
partner outreach at all while the site is under the 5 leads per month precedent. This is
publish-and-be-found only. If it works we will see it in referral traffic and embed
attribution, not in a pipeline.

### Expected shape of return

Genuinely unpredictable, which is the owner's own framing and the honest answer. The
measurable part is the RRA family itself, which is landlord traffic we would want anyway
and which the 774.5 weekly figure says is the largest single demand pool either report
found. The relationship part is unmeasurable in advance. Treat the landlord traffic as the
return that justifies the spend and the agent relationship as the option on top, rather
than the other way round.

---

## Sequencing against the live programme

The live plan is `docs/property/HANDOFF_2026-08-20.md`: Phase A (Wave 11 wrap and deploy,
19 pages already written and unshipped), Phase B (tools family, 102,070/mo, ungated GO),
Phase C (rental-income cluster, 12,020/mo), Phase D (incorporation, conditional on the
cannibalisation check), Phase E (Wave 12 cost-of-selling, ~45,850/mo, approved for Property).
The scoping report separately ranked Airbnb and holiday lets as its number one.

**Nothing here displaces Phases A, B or C.** Phase A is built and unshipped, which is the
best return per hour available anywhere on the site. Phase B is the largest measured prize
in the programme. Phase C is scheduled and mostly EXTEND work.

| Slot | Work | Why here |
|---|---|---|
| **Today, no dependency** | Flip `/embed` to indexable | No dossier, no writing, no wave. Batches into whatever deploy happens next |
| After Phase C | **Track 3, agents** | Cheapest of the three, the substance is already written, and it does not touch any page inside an active `monitored_pages` window |
| After Phase D | **Track 2, developers** | Must follow D, not precede it. `condition-c-trading-stock-section-162-incorporation-relief-denial-developers` and `condition-d-development-main-purpose-convert-and-flip-trap-landlord-developers` are incorporation-relief pages. Running developers first would create exactly the cannibalisation Phase D exists to check for |
| After Phase E | **Track 1, rural** | Largest build, needs its own full §9 dossier, and it is the only one of the three whose payoff is a 90-day read rather than 28. Start it when the queue is clear rather than interleaved |

Two sequencing notes. First, the scoping report's number one (Airbnb and holiday lets) is
not in this proposal because the owner did not approve it in this round; it remains a live
recommendation and it is cheaper than all three of these. Second, the one-change-per-page-
per-measurement-window rule (§9.3) applies to every track: any page inside an active SDLT,
CGT or Wave 11 monitored window is frozen, and each dossier buckets its keywords to the
existing work rather than to a new edit.

## Effort estimate

| Track | Dossiers | Pillars/hubs | Net-new posts | EXTEND posts | Tools | Config |
|---|---|---|---|---|---|---|
| 1. Rural | 1 | 1 | 8 to 10 | 8 | 1 | 0 |
| 2. Developers | 1 | 1 | 5 to 6 | 0 | 0 | 0 |
| 3. Agents | 1 | 1 | 4 to 6 | 1 | 0 | 1 boolean |
| **Total** | **3** | **3** | **17 to 22** | **9** | **1** | **1** |

Roughly 20 to 25 new pages, 3 pillars, 1 calculator. Every cluster runs the §9 dossier
before a word is written, every page is Opus-written against a pack, both QA tracks run,
and the deterministic gates and `qa_verdict` recording happen before any deploy is offered.

---

## DECISIONS FOR OWNER

1. **Rural on Property, bounded.** Build the APR/BPR cluster under a `/landed-estates`
   pillar on Property rather than a new site, scope frozen at the tax half (the £2.5m
   combined allowance, mixed-estate allocation, the Pawson line) and explicitly conceding
   herd basis, farmers' averaging, BPS and SFI, and agricultural tenancy law. Approve?

2. **Developers, one surface not two.** A single `/property-developers` pillar carrying the
   commercial answer inside it, no separate `/services/property-developer` page, and no new
   CIS content on Property because construction-cis already holds it. Approve?

3. **Agents as a resource surface.** A `/for-letting-agents` hub plus 4 to 6 explainers,
   no service offering, no outreach or partner machinery of any kind, and flip `/embed`
   from noindex to indexable so the calculator gallery we built for agents can actually be
   found. Approve?

4. **Sequencing.** All three land behind the live programme: agents after Phase C,
   developers after Phase D, rural after Phase E, with the `/embed` flip available for the
   next deploy whenever one happens. Accept, or pull one forward?

---

## LIMITATIONS

1. **N3 and N4 are different methods and must never be compared.** `GetKeywordStats`
   returns weekly Bing impression history; `GetRelatedKeywords` returns totals over a
   90-day window. Every comparison in this document is within a single method. The 774.5
   versus 24 versus 9 comparison is valid because all three are `GetKeywordStats` medians
   on the same day.
2. **All Bing volumes are directional, not market volume.** They are Bing's own impressions
   on Bing. Useful for ranking seeds against each other on identical method, useless as
   absolute demand.
3. **Zero weeks means no recorded history, not zero demand.** Fourteen of the 24 seeds
   returned zero weeks. That is a limit of the free API on niche B2B phrasing, not evidence
   the terms are dead.
4. **`GetKeywordIdeas` is not available.** All nine calls returned HTTP 404 from the BWT
   endpoint. The client already treats it as best-effort and it contributed nothing.
5. **oldmillgroup returned zero rows in N2.** Recorded as a keyword-data-only limitation:
   the tool found no ranked keywords for the domain, which is not the same as the firm
   having no presence. The scout (S7) confirmed Old Mill runs a farming and rural hub. The
   rural competitive picture in this document therefore rests on saffery.com plus
   ukpropertyaccountants alone.
6. **No live SERP.** Serper is still out of credits. Every competitor position here is a
   stored harvest value as at its pull date, never a live check.
7. **The 08-18 harvest is still capped at 1,000 rows per domain.** N1 and N2 were pulled
   specifically to test the two build candidates against that cap, and N1 raised the
   developer count from 5 keywords to 23. Treat "nobody competes here" as "nobody competes
   here in what we can see".
8. **The `renters rights act 2026` signal is Bing-only.** No GSC figure was pulled for it in
   this round. Before Track 3 is written, its dossier should pull the live GSC query set for
   the 12 existing RRA pages, because we may already be earning this and simply not
   converting, which would change the shape of the work from net-new to EXTEND.
9. **`business property relief` at 44.5 weekly is nearly double `agricultural property
   relief` at 24.** Track 1 is framed as APR-led because that is where the competitor
   whitespace is, but the dossier should test whether BPR deserves equal billing in the
   pillar.

---

*Prepared 2026-08-21 as a follow-up to `AUDIENCE_SCOPING_2026-08-21.md`. No site content
changed, nothing committed, no deploy or indexing action taken. Scratch scripts used for the
Bing pulls were written to the session scratchpad and removed.*
