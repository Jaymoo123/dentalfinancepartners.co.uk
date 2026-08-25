# PACK for-letting-agents (H, agents1 cluster hub)

Net-new **route page** pack, assembled 2026-08-21 from `briefs/property/agents/DOSSIER.md` (FROZEN
2026-08-21) and its named source files. Follows `docs/_engines/REWRITE_PROGRAM.md` §9.5, eight
sections in reading order, same format as `briefs/property/rural-estates/packs/`.

**This pack is the writer's whole world.** Nothing outside it is in scope. Anything you discover that
looks like it should be in the page but is not in this pack goes back as a delta to
`briefs/property/agents/notes/delta.md`, never into the page. The dossier is frozen (§12).

---

## 1. Target and permission level

- **Page:** `Property/web/src/app/for-letting-agents/page.tsx`
- **Type:** NET-NEW **route page** (not a blog post). Public path: /for-letting-agents (fixed, do not vary).
- **Category:** n/a. This is an app route, not blog content.
- **No middleware entry.** `SLUG_TO_CATEGORY_MAP` in `Property/web/src/middleware.ts` is for blog
  slugs only. Do **not** add this path to it.
- **Grade:** HUB. Zero equity, zero measured keywords (§2, §3).

### 1.1 The wiring job, stated exactly

The freshest precedent is `/landed-estates`, wired on 2026-08-21. **Locate every place
`landed-estates` is referenced and mirror it.** Run this first, from the repo root:

```
grep -rn "landed-estates" Property/ --include="*.ts" --include="*.tsx" --include="*.json" \
  | grep -v "\.next/" | grep -v "content/blog/"
```

As measured 2026-08-21 that returns exactly four non-content hits, and the builder must produce the
equivalent four for `/for-letting-agents`:

| File | What landed-estates has | What to add |
|---|---|---|
| `Property/web/src/app/landed-estates/page.tsx` | `const PAGE_PATH = "/landed-estates";` | the new route file at `src/app/for-letting-agents/page.tsx` with `const PAGE_PATH = "/for-letting-agents";` |
| `Property/web/src/app/sitemap.ts` | `"/landed-estates",` in `staticPaths` (line 20) | add `"/for-letting-agents",` to the same array |
| `Property/niche.config.json` | nav `Resources` children entry `{ "label": "Landed estates", "href": "/landed-estates" }` (~line 85) | add `{ "label": "For letting agents", "href": "/for-letting-agents" }` in the same children array |
| `Property/niche.config.json` | `footer_links` entry `{ "label": "Landed estates", "href": "/landed-estates" }` (~line 145) | add `{ "label": "For letting agents", "href": "/for-letting-agents" }` in `footer_links` |

Nav and footer are driven by `Property/niche.config.json` through
`src/config/niche-loader.ts` → `siteConfig.nav`. There is no hard-coded link list in
`src/components/layout/SiteHeader.tsx` or `SiteFooter.tsx`; do not edit those files.
**Re-run the grep after the edits.** If it returns a hit class this table does not cover, that hit is
a delta, not a licence to improvise.

### 1.2 Fixed constraints (owner rulings, EXPANSION_PROPOSAL_2026-08-21, do not re-litigate)

Copied from DOSSIER.md preamble. Every one of these is a hard fail if breached:

- **Pure resource surface.** No service tier. No pricing. No claim that we do agency accounts. No
  client-money compliance advice. No outreach machinery of any kind. No new monitor, alert or
  notification. Publish-and-be-found only.
- **Therefore this route diverges from the `/landed-estates` template in three deliberate places,
  and this is the single most important instruction in this pack:**
  1. **No `CTASection`.** Do not import it, do not render it. `/landed-estates` closes on
     `<CTASection title="Find out where your estate sits against the allowance" ... primaryLabel="Book free consultation" />`. That is a service offer and it is banned here.
  2. **No consultation button in the hero.** `/landed-estates` runs a `/contact` primary button
     ("Talk to a property tax specialist"). Replace both hero actions with resource actions: the
     calculators and the embed gallery.
  3. **No FAQ block and no `buildFaqPageJsonLd`.** `_language_spec.md` §3, hub row: "no FAQ; the hub
     is a routing page not a guide". `/landed-estates` carries six FAQs and the FAQPage JSON-LD; the
     hub carries neither. Keep the `Article` and `BreadcrumbList` JSON-LD only.
- **The banned CTA sentence is physically present in the model file.**
  `src/app/landed-estates/page.tsx` line 460 reads "We can produce a written view of your allowance
  position". That is the banned template `We can produce a written {noun} for/on your {noun}`. It
  must not appear in this page in any form, and no sibling page in this batch may share a CTA
  template with it or with each other.
- Zero em-dashes. UK English. No pricing anywhere on the page.

**What to copy from `/landed-estates` structurally** (structure only, never its copy): the
`Metadata` export shape with `alternates.canonical`, `openGraph` and `twitter`; the `Breadcrumb`
usage; the dark hero `<section className="bg-slate-900 ...">` with H1 and standfirst; the local
`Section({ id, title, children, links })` helper with its `links` array rendering
`text-emerald-700` arrows; the `siteContainerLg` wrapper; the category-prefix constants pattern
(`const LTE = "/blog/landlord-tax-essentials";`) with its comment that category prefixes are resolved
from frontmatter by `slugifyCategory()` and must not be guessed.

---

## 2. Equity register

**ZERO.** Net-new route, no prior Google or Bing equity, nothing to protect.

Measured context, from DOSSIER.md §2 (pulled 2026-08-21, so the writer knows this is a genuine entry
gap and not an under-converting ranking): across all twelve existing RRA pages, GSC returned exactly
**one** query row in 90 days. Bing per-page: section 13 page 46 impressions / 40 rows, redress page 28
impressions / 9 rows, complete-guide-to-periodic-tenancy 15, tax-implications 1, the other eight zero.

---

## 3. The market's keyword set

Source: `briefs/property/agents/ledger.csv` (39 rows, cluster ledger). The three rows bucketed `hub`
are reproduced below with their ledger figures; nothing here contradicts the ledger's bucket
assignments. DOSSIER.md §7 row H: "none measured (agent-phrased = no volume); job = entry point".

| keyword | vol/mo | best peer pos | peer domain | in our copy |
|---|---|---|---|---|
| letting agent resources | 0 | n/a | n/a | yes, register only |
| renters rights act letting agents | 0 | n/a | n/a | yes, register only |
| questions landlords ask letting agents | 0 | n/a | n/a | yes, register only |

All three are zero-volume in Google Ads UK and have zero recorded history in Bing `GetKeywordStats`,
so none is gate-enforced and none is a ranking target. They describe the register, not a head to
chase.

**Do not invent tail keywords for this page and do not optimise it for a head term.** DOSSIER.md §4,
final row: "The demand is in what agents must EXPLAIN, not agent-phrased queries." The hub's measured
job is to be an entry point and a link surface. Its return read is referral traffic and embed
attribution, not rankings (§10).

Bing `GetKeywordStats` weekly-impression medians and Google Ads monthly volumes are different methods
and are **never compared to each other** (DOSSIER.md §11.3). Do not put both on the page. Do not put
either on the page.

---

## 4. Competitor teardown extracts

Source: `_language_spec.md` §1 measured table (2026-08-21, DuckDuckGo top-10 across six queries;
positions are DDG, not Google, per §6 and DOSSIER.md §11.1).

**W1 gov.uk `/guidance/renters-rights-act-an-overview-for-landlords` is the shape model for this
page.** Measured: **868 words**, mean sentence 17.4, **Flesch 61.2** (second-highest in the set),
question headings 2 of 7, **"you" 86.4 per 1,000**, "we" 0.0, **citations 0.0**, notice-names 5.8,
jargon 1.2, **0 tables, 0 FAQ, 0 pound figures, 0 em-dashes**. gov.uk holds four top-10 slots across
three of the six queries.

Its first sentence, quoted in `_language_spec.md` P1: *"You must follow the correct processes when
renting out your property."* Second person, present tense, duty first, no scope-setting. Seven
noun-phrase section labels, each a topic, no essay titles.

**What we take from W1:** the shortness, the noun-phrase section labels (hard rule 7 explicitly
exempts the hub from question headings: "The hub is exempt: W1, the officialdom model, uses
noun-phrase section labels"), the zero-furniture close, the zero citations.

**What we change:** W1 addresses the **landlord** as "you". This page addresses the **agent** as
"you" and makes the landlord the third party who asks. `_language_spec.md` §3: "The unoccupied
position is the agent as 'you' and the landlord as the third party asking the question. One sentence
in the tracked set occupies it." That sentence is W8 heybrb's *"your landlord client"*.

**W3 nrla.org.uk `/resources/renters-rights` is the nearest thing to a competing hub and is on the
do-not-copy list.** 2,955 words, four slots across four of the six queries (widest spread of any
non-government domain), 28 headings, 8 question-shaped, **"we" 8.8 per 1,000 (highest first-person
rate in the set)**. `_language_spec.md` §4: take its question-heading discipline and its
one-topic-per-H2 layout; do **not** take its membership frame ("Here at the NRLA", "Not already a
member?", routing into gated guides), and do **not** take its numbers, which include the typo
"£7,000 and £40,00,0" in a headline penalty figure and "Prevening discrimination" in an H2.

**W6 goodlord and W7 nolettinggo are the third-person trap.** Both write *about* letting agents:
W6 "you" at 2.8 per 1,000 with essay-title headings ("A structural shift, not an incremental
change"), W7 "you" at 3.6 with the heading "What This Means for Letting Agents" and an in-body vendor
insert "How No Letting Go Helps You Prepare". Both sit p8 and p9. Do not copy either.

---

## 5. Ours, side by side

No existing hub for this audience. The estate precedent is the Solicitors `/for-<audience>` hubs;
the freshest wiring precedent is `/landed-estates` (§1.1).

The four measured RRA pages, for contrast (`_language_spec.md` §1, "Our median" row): **2,628 words,
mean sentence 19.6, Flesch 28.1, "you" 0.0 per 1,000, citations 11.6 per 1,000, notice-names 7.3**.
Three of the four use the word "you" **zero times across 8,155 words**. Every one of the eleven
winners is easier to read than every one of our four pages, by roughly 21 Flesch points at the median.

This page is the opposite of that median in every column. If a draft reads like those four pages, it
is wrong.

---

## 6. Whitespace and content mandate

The hub is a routing surface with a named audience. Its whole job is: name the reader, say what
changed this year in one screen, and route to the five explainers, the five calculators and the embed
gallery. It explains nothing in depth. Every topic gets a short section that ends in links.

### 6.1 Hero

- **H1 names the audience.** Agent-facing, in the agent register.
- **Standfirst is the audience-naming line the dossier specifies:** the register is *what your
  landlords will ask you this year*. That phrase, or a natural variant of it, is the page's whole
  positioning and belongs in the first two sentences.
- **Two hero actions, both resources:** one to `/calculators`, one to `/embed`. No `/contact`
  button, no "book" language, no "talk to a specialist" (§1.2).

### 6.2 Sections, in order

Each is a short H2 with a noun-phrase label and a `links` array. Target two to four short paragraphs
each. No section explains a rule in full; the explainer does that.

1. **What changed on 1 May 2026, and who it applies to.** The Renters' Rights Act 2025 tenancy
   reforms are in force from **1 May 2026 for private assured tenancies that are not social-housing
   assured tenancies**. Section 21 is gone, tenancies are periodic, rent rises go through Section 13.
   Two or three sentences, then link explainer 1. Do not restate the commencement table here; it
   belongs to explainer 1.
2. **What is not in force yet.** The landlord database and the landlord redress scheme are in the Act
   and are not yet operating. Conditional grammar only ("when the database opens, you will need to
   register"), never "you must register now". Link explainer 5 and the frozen redress page.
3. **The periodic switch, and the two questions it generates.** One short paragraph, then link the
   two existing periodic pages. Do not re-explain the conversion.
4. **What your landlords believe about EPC and what the law actually says.** One paragraph: the
   enacted floor is EPC E with a £3,500 cost cap; EPC C by 2030 is government policy, not enacted
   regulations. Link explainer 2 and the two frozen MEES siblings.
5. **Who files what under Making Tax Digital.** One paragraph naming the split (the landlord is the
   filer; your statement feeds their categories). Link explainer 3.
6. **Deposits and the landlord's tax position.** One paragraph. Link explainer 4. **No client-money
   regulatory advice of any kind** (owner ruling, §1.2); the agent's own client-money regime is out
   of scope and is not discussed, hedged or summarised.
7. **Calculators you can point a landlord at.** The five agent-relevant tools, all verified present in
   `src/lib/calculators/registry.ts` on 2026-08-21, each at `/calculators/<slug>`:
   - `/calculators/stamp-duty-calculator`
   - `/calculators/rental-yield-calculator`
   - `/calculators/section-24-calculator`
   - `/calculators/rental-income-tax-calculator`
   - `/calculators/mtd-checker`
   One line each saying what question it answers for a landlord. No pricing, no gating, no lead form.
8. **Put the calculators on your own site.** The `/embed` gallery is indexable as of the 2026-08-21
   deploy (`src/app/embed/page.tsx`, `robots: { index: true, follow: true }`; the per-calculator
   `/embed/[slug]` iframe routes stay noindexed). The pitch is one line: **the calculators embed in a
   single line of HTML, they are free, and we keep them current**. The only condition already stated
   on `/embed` is that the "Powered by Property Tax Partners" line stays in place; state that once,
   plainly, and link `/embed`. Do not reproduce the iframe snippet on this page.
9. **Forward this to your landlords.** This is where that line lives naturally and it is the page's
   close. Frame it as the reader's next action, in the agent's own terms: these pages are written to
   be sent to a landlord who has asked the question, so send them. **No CTA template, no service
   offer, no form, no "we can produce a written ...".** Close on the reader's next action and stop.

### 6.3 The five cluster posts this hub routes to

Four slugs are fixed. Category prefix for all four blog links resolves from frontmatter via
`slugifyCategory()`; the values below were verified against the live content files on 2026-08-21.

| # | Link | Where it belongs |
|---|---|---|
| 1 | `/blog/landlord-tax-essentials/rra-2026-whats-in-force-letting-agents` | sections 1 and 3 |
| 2 | `/blog/landlord-tax-essentials/mees-epc-rules-what-your-landlords-think` | section 4 |
| 3 | `/blog/making-tax-digital-mtd/mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly` | section 5 (category is "Making Tax Digital (MTD)", slug `making-tax-digital-mtd`) |
| 4 | `/blog/landlord-tax-essentials/tenancy-deposits-landlord-tax-position` | section 6. Slug taken from `packs/PACK_tenancy-deposits-landlord-tax-position.md` §1 in this same batch. **Re-check that pack's Page line before building and use whatever it says verbatim; never invent it.** |
| 5 | `/blog/landlord-tax-essentials/prs-database-landlord-ombudsman-registration-requirements` | section 2 |

### 6.4 Frozen pages this hub links and must never edit

DOSSIER.md §3 blanket rule: **no edit to ANY existing page except the two EXTEND targets** (pages 3
and 5). Everything else is linked, never modified. All are under `/blog/landlord-tax-essentials/`:

- `a-complete-guide-to-periodic-tenancy` (armed to 2026-11-16, owns `periodic tenancy` 2,400/mo)
- `renters-rights-act-periodic-tenancy-switch-landlord-obligations`
- `renters-rights-act-property-redress-scheme-mandatory-enrolment-landlords` (owns `property redress scheme` 27,100/mo, Bing pos 4-10)
- `renters-rights-act-rent-increase-section-13-tribunal-route` (our only visible page, both engines)
- `renters-rights-act-2026-tax-implications-landlords`
- `mees-regulations-landlords` (armed to 2026-11-19, owns `mees regulations` 720/mo)
- `energy-performance-certificates-epc`
- `epc-c-2030-minimum-energy-efficiency-landlord-spending-cap`

### 6.5 Locked figures the hub is allowed to state

Only these, exactly as written, from `docs/property/house_positions.md` as patched 2026-08-21.
Anything else is stated by the explainer, not the hub.

- The Act is the **Renters' Rights Act 2025 (2025 c. 26)**, Royal Assent **27 October 2025** (§20.1,
  §26.1). "2026" is commencement context only.
- Tenancy reforms in force **1 May 2026**, for **private (non-social-housing) assured tenancies**
  only (§20.12, SI 2026/421 reg 2 carve-out; social housing is Phase 2, roadmap expectation 2027).
- The **landlord database is not in force**; s.75 is Prospective, no commencement order, **no fee
  figure exists in law** (§20.12, §26.6).
- **No landlord redress scheme instrument exists at all**; membership expected 2028 is an
  expectation (§20.12, §26.5). The regime is a **plural approved-scheme regime**, never "the single
  statutory ombudsman" (§26.5, §26.8).
- MEES enacted floor: **EPC E**, landlord cost cap **£3,500 including VAT** (§26.3). **EPC C by 2030
  is not enacted**, no instrument laid, and the £10,000 cap is consulted-on only (§26.3, §26.8).

### 6.6 Do-not-write, quoted (house_positions §20.13 and §26.8)

- "The Renters' Rights Bill is in passage"
- "The Act is the Renters' Rights Act 2026"
- "Section 21 is still available"
- "Fixed-term ASTs continue"
- "Landlords must register on the PRS Database from 1 May 2026"
- "Database registration costs £X" (no fee regulations made under s.77; any circulating figure is invented)
- "There is a single statutory ombudsman for landlords"
- "Compensation under the new landlord ombudsman is capped at £25,000"
- "EPC C 2030 / 2028 is now law"
- "The landlord cap is now £10,000"
- "The Decent Homes Standard for PRS is in force"
- "Letting agents joined the redress scheme regime under RRA 2025" (agents have been in an approved
  redress scheme since 1 October 2014 under a separate 2014 instrument; never conflate the two)

---

## 7. Acceptance criteria

**Writer: Opus. Batch size 1. This pack is the writer's whole world.** Additive scope goes back as a
delta to `briefs/property/agents/notes/delta.md`, never into the page.

1. **Register, per `_language_spec.md` §3, the `/for-letting-agents` hub row, quoted verbatim:**
   register **Agent-as-you**; **"you" at 15 or above per 1,000 words**; **citation-style references
   0**; **notice-names 10 to 15 per 1,000**; **Flesch 48 or above**; **900 to 1,600 words**; shape =
   "W1 shape, short H2 per topic, each linking one explainer; no FAQ; the hub is a routing page not a
   guide". Mean sentence at or below 18 words (§5 hard rule 2).
2. **"You" is the agent** (§5 hard rule 3). The landlord is "your landlord", "the landlord you act
   for", "your landlord client". The tenant is "the tenant".
3. **Zero citation-style statute references** (§5 hard rule 1). Write "Section 21", "Section 13",
   "Section 8", "the Renters' Rights Act 2025", "the Housing Act 1988". Never `s.13`, `ss.64-74`,
   `SI 2026/421`, `reg.3`, `Sch 8`. The hub's target is **0**, and the batch ceiling of one
   citation-style reference per 1,000 words is a ceiling for the explainers, not a licence here.
   **No statute reference in any heading, ever** (§5 hard rule 8). Where an instrument genuinely has
   to be identified, it goes in one reference line at the foot of the page, never in prose. The hub
   should not need one.
4. **Noun-phrase section labels, not question headings** (§5 hard rule 7 hub exemption).
5. **No FAQ, no FAQPage JSON-LD, no `CTASection`, no `/contact` button** (§1.2). Article and
   BreadcrumbList JSON-LD only.
6. **All required links present and resolving:** the five cluster posts per §6.3 (four fixed slugs
   plus page 4's slug taken from its own pack), the five calculators per §6.2 item 7, `/embed`, and
   the frozen pages named in §6.4 wherever the section calls for them.
7. **Wiring complete per §1.1:** route file, `sitemap.ts` `staticPaths`, `niche.config.json` nav
   children, `niche.config.json` `footer_links`. Re-run the grep and confirm four mirrored hits.
8. **Figures:** only those in §6.5, matching house_positions as patched 2026-08-21. Anything not
   locked there is declined, not guessed. Nothing on the page may be datable to a week (§5 hard rule
   11): dated statements name the date they are true from, never the date the page was written.
9. **No named worked-example persona.** None anywhere in this cluster. Agent-facing second person
   does the work.
10. **No shared CTA template with any other page in this batch.** The banned template
    `We can produce a written {noun} for/on your {noun}` must not appear. Close on the reader's next
    action.
11. **Owner rulings held:** no service tier, no pricing, no claim to do agency accounts, no
    client-money compliance advice, no outreach machinery, no new monitor or notification.
12. **Zero em-dashes, UK English.**
13. **Coverage note written**, at exactly this path and filename (equity-gate parser convention: the
    last path segment of the Page line in §1, plus `_coverage.md`):
    **`briefs/property/agents/notes/page.tsx_coverage.md`**.
    It lists the three §3 keywords as register-only placements, and names every keyword declined by
    this page together with the page that holds it: `property redress scheme` (27100) to the frozen
    redress page, `periodic tenancy` (2400) to `a-complete-guide-to-periodic-tenancy`,
    `mees regulations` (720) and `epc requirements for landlords` (720) to
    `mees-regulations-landlords` and `energy-performance-certificates-epc`,
    `making tax digital landlords` (590) to the MTD cluster pillar pages,
    `private rented sector database` (1000), `landlord ombudsman` (480), `landlord database` (320),
    `landlord redress scheme` (140) and `prs database registration` (70) to page 5. Every figure and
    bucket must match `briefs/property/agents/ledger.csv`.
14. **Build clean.** `npm run build` in `Property/web` passes and `/for-letting-agents` appears in
    the generated sitemap.

---

## 8. Expectation and failure trigger

Per DOSSIER.md §10, stated before the work.

- **Read at 90 days.** No new monitor, cron, alert or notification of any kind. Monitoring is
  standard `monitored_pages` registration at deploy inside the existing weekly detector, nothing else.
- **What success looks like.** The hub carries no measured keywords, so it is not judged on
  rankings. Success is (a) the route appearing in GSC at all on agent-phrased or brand-adjacent
  queries, and (b) referral traffic and embed attribution, which is the return read the owner
  specified for this cluster. Agent relationship value is explicitly unmeasurable in advance
  (owner's own framing) and is not counted as success or failure.
- **Page-level failure trigger.** If at the 90-day read the hub shows zero GSC impressions **and**
  zero referral or embed attribution, the hub failed as a surface. It is then a purely internal
  routing page, and that finding blocks building further audience hubs on this evidence base.
- **Cluster-level failure trigger, which this page shares.** Zero Bing rows **and** zero GSC
  impressions across the whole agents1 cluster at the 90-day read means the register thesis is
  wrong. In that case: do not build Track 2-style audience surfaces on this evidence base.
- **Known limitation carried forward.** SERP positions behind this pack are DuckDuckGo, not Google
  (DOSSIER.md §11.1). No Google position is asserted anywhere. The keyword universe is seed-listed,
  not exhaustive (§11.2); a delta list is expected at the 90-day read.
