# Wave 11 handoff — landlord compliance, leasehold, commercial

**Written:** 2026-08-08 · **Status:** ready to start, nothing built
**For:** a fresh agent picking this up cold
**Start with:** `/run-wave 11`

---

## 0. What this is

The buyer-demand and lead-gen research (2026-08-08, `expansion_research/buyer_demand/`) produced a
37-page plan for the Property site. This handoff turns the first tranche into a runnable wave.

**Do not re-derive the research.** It is committed and settled:
- `expansion_research/buyer_demand/PROPERTY_PAGE_PLAN.md` — the full 37-page plan, all four clusters
- `expansion_research/buyer_demand/LEADGEN_NICHE_SWEEP.md` — how the niches were chosen
- `expansion_research/buyer_demand/UMBRELLA_LEVERAGE.md` — why these clusters go on Property
- `expansion_research/buyer_demand/BMV_FACTS.md` — **required reading before any leasehold page**

**This wave = 19 blog spokes.** The 3 pillars and 2 calculators are a separate workstream (§6) —
the wave machinery does not build them.

---

## 1. Read first

The system is mature and documented. Read these before touching anything:

1. `.claude/commands/run-wave.md` — the conductor skill you are running (Stages 0-14).
   It is a **slash command, not a SKILL.md**. No SKILL.md exists in this repo.
2. `docs/_engines/NETNEW_PROGRAM.md` — the site-agnostic engine (phases, artefacts, quality gates,
   drift patterns). §5.2 six-check floor and §5.3 Bill-vs-enacted-Act discipline are non-negotiable.
3. `docs/property/STATE.md` — current Property state (the WHAT for this site)
4. `docs/property/_archive/NETNEW_PROGRAM.md` — **the §16.x lessons the skill cites live here now**
5. `docs/property/house_positions.md` — the tie-breaker doc; this wave adds to it
6. `sites/property.json` — paths, wave sizing, voice config

### DEAD PATH WARNING — you will hit this in the first five minutes

`docs/property/NETNEW_PROGRAM.md` **no longer exists.** Commit `9c7a84ac` archived it to
`docs/property/_archive/NETNEW_PROGRAM.md` and split it into `docs/_engines/NETNEW_PROGRAM.md`
(the HOW) plus `docs/property/STATE.md` (the WHAT).

**Two places still point at the dead path** and neither has been fixed:
- `run-wave.md`'s read-first list, item 1
- `sites/property.json` → `paths.netnewProgram`

When the skill tells you to read `docs/property/NETNEW_PROGRAM.md` §16 lessons, read
`docs/property/_archive/NETNEW_PROGRAM.md` instead. Same for the Stage 14 heartbeat update — the
heartbeat now lives in `docs/property/STATE.md`.

Do not silently repoint `paths.netnewProgram` in the site config; other `-Site` scripts read it and
the correct target is a judgment call. Raise it with the owner as a separate fix.

---

## 2. Config discrepancy — read this or you will scaffold the wrong shape

`.claude/commands/run-wave.md` still describes **three buckets (A/B/C)** and "3 wt tabs spawn".
**That is stale.** `sites/property.json` carries an owner ruling dated 2026-07-08:

```json
"wave": { "buckets": ["a"], "megaWaveSize": 60, "batchSize": 1, "waveKind": "wave" }
```

> "Owner ruling 2026-07-08: no A/B/C lanes; batchSize 1 = one sub-agent per topic, parallel.
> Single bucket retained for path/naming compatibility."

Wave 10 confirms it — `docs/property/` contains only `wave10_questions_session_A.md` and
`wave10_discovery_log_session_A.md`, no B or C.

**So: single bucket `a`, one sub-agent per topic, run in parallel.** Where the skill says "3 tabs",
read "one per pick". Everything else in the skill holds.

---

## 3. Stage 0 design — this is your PAUSE input, already decided

`/run-wave 11` pauses at Stage 0 for topic clusters and pick count. Here it is. Write this to
`briefs/property/wave11/picks.yaml`.

**Categories are deliberately existing ones** so the Bug #4 category validation in
`prepare-wave.ps1` passes without creating new blog routes.

```yaml
wave: 11
buckets:
  A:
    label: "Bucket A — landlord compliance, leasehold, commercial"
    picks:
      # --- Cluster B: landlord compliance (category: Landlord Tax Essentials) ---
      - { id: A1,  slug: "eicr-certificate-cost-landlords",            label: "EICR certificate cost + duty cycle for landlords" }
      - { id: A2,  slug: "landlord-electrical-safety-certificate",      label: "Landlord electrical safety certificate (EICR) obligations" }
      - { id: A3,  slug: "fire-risk-assessment-cost",                   label: "Fire risk assessment cost + when a landlord needs one" }
      - { id: A4,  slug: "landlord-licensing-explained",                label: "Landlord licensing: mandatory, additional, selective" }
      - { id: A5,  slug: "gas-safety-certificate-cost",                 label: "Gas safety certificate cost (CP12) - cost-led angle" }
      - { id: A6,  slug: "epc-certificate-cost-uk",                     label: "EPC certificate cost UK" }
      - { id: A7,  slug: "how-to-book-an-epc",                          label: "How to book an EPC (process, timing, who to use)" }
      - { id: A8,  slug: "mees-regulations-landlords",                  label: "MEES minimum energy efficiency standard for landlords" }
      # --- Cluster C: leasehold (category: Property Types & Specialist Tax) ---
      - { id: A9,  slug: "lease-extension-cost-uk",                     label: "Lease extension cost UK incl. marriage value" }
      - { id: A10, slug: "lease-extension-solicitor-what-they-do",      label: "What a lease extension solicitor does + fees" }
      - { id: A11, slug: "right-to-manage-explained",                   label: "Right to Manage explained" }
      - { id: A12, slug: "right-to-manage-company-setup",               label: "Setting up an RTM company" }
      - { id: A13, slug: "right-to-manage-process-steps",               label: "RTM process step by step" }
      - { id: A14, slug: "service-charge-disputes-leaseholders",        label: "Service charge disputes and challenges" }
      - { id: A15, slug: "ground-rent-rules-uk",                        label: "Ground rent rules UK" }
      - { id: A16, slug: "leasehold-reform-act-2024-what-is-in-force",  label: "LAFRA 2024: what is actually in force (correction of record)" }
      # --- Cluster D: commercial (category: Property Types & Specialist Tax) ---
      - { id: A17, slug: "commercial-epc-requirements",                 label: "Commercial EPC requirements" }
      - { id: A18, slug: "commercial-energy-performance-certificate-cost", label: "Commercial EPC cost" }
      - { id: A19, slug: "commercial-property-mees-compliance",         label: "Commercial property MEES compliance" }
```

### Target keywords per pick (feed into Stage 2 briefs)

| Pick | Primary target | Vol/mo | KD | CPC |
|---|---|---|---|---|
| A1 | `eicr certificates` | 18,100 | — | £5.84 |
| A2 | `landlords electrical certificate` | 1,600 | 31 | £9.16 |
| A3 | `fire risk assessment cost` / `price` | 720 | **0** | £16.20 |
| A4 | `landlord licensing` | 1,600 | 11 | £7.35 |
| A5 | `landlords certificate gas`, `gas electric safety certificate` 320 | 480 | 25 | £7.67 |
| A6 | `epc certificate cost` (+6 variants) | 3,600 | 16 | £3.14 |
| A7 | `epc booking` | **14,800** | **1** | £3.88 |
| A8 | MEES / minimum energy efficiency | — | — | — |
| A9 | `lease extension lawyers`, `leasehold extension solicitors` | 1,000 | **0** | £9.25 |
| A10 | `lease extension solicitor` + `...near me` 320 | 1,000 | 11 | £9.25 |
| A11 | `right to manage` | 1,000 | **1** | £7.55 |
| A12 | `right to manage company` | 390 | **1** | £9.76 |
| A13 | `right to manage process` | 170 | **1** | £7.49 |
| A14 | service charge cluster (83 mentions, 1 slug) | — | — | — |
| A15 | ground rent cluster (73 mentions, **0 slugs**) | — | — | — |
| A16 | LAFRA commencement — authority play, not volume | — | — | — |
| A17 | `commercial epc` | 1,300 | **0** | £20.45 |
| A18 | `commercial energy performance certificate` | 1,300 | 10 | £20.45 |
| A19 | commercial MEES | — | — | — |

---

## 4. Cannibalisation — known overlaps, decide at Stage 2

`check-cannib.ps1` will flag these. Pre-judged, but confirm against current `main`:

| Pick | Existing page | Ruling |
|---|---|---|
| A5 | `gas-safety-certificates.md` | **Partial.** Existing is the full regulatory guide. New page is cost-led (`landlords certificate gas`). Differentiate hard or drop A5. |
| A6 | `energy-performance-certificates-epc.md` | **Partial.** Existing is the general guide; new is cost-specific. |
| A8 | `epc-c-2030-minimum-energy-efficiency-landlord-spending-cap.md` | **Partial.** Existing covers the 2030 cap; new is MEES mechanics broadly. |
| A4 | `hmo-selective-licensing-compliance-housing-act-2004-...` | **Partial.** Existing is HMO/selective specifics; new is the licensing-types overview. |
| A9/A10 | `lease-extensions-in-the-uk-surrender-and-regrant`, `lease-extension-vs-freehold-purchase` | **Partial.** Both existing are tax-angled. New pages are cost and process. Forward-link, do not restate. |

A1, A2, A3, A7, A11-A16, A17-A19 should come back **net-new** — the research found 0 slugs for each
despite heavy incidental mention (EICR 34 mentions/0 slugs, fire risk 6/0, ground rent 73/0,
right to manage 2/0).

---

## 5. Wave-specific traps — these must land in `house_positions.md` at Stage 1b

### 5.1 Marriage value — the big one

**Most published 2026 content is wrong about this, including sources a sub-agent will find.**

The Leasehold and Freehold Reform Act 2024 abolishes marriage value **on the statute book**, but
**that provision is NOT in force. Marriage value remains payable as at August 2026.**

Lock these positions before Stage 2 (full detail + sources in
`expansion_research/buyer_demand/BMV_FACTS.md`):

- Marriage value still payable where the unexpired term is under 80 years (LRHUDA 1993), split 50/50
- **In force:** two-year ownership rule abolished (Jan 2025); Right to Manage reforms (Mar 2025,
  non-residential threshold 25%→50%, freeholder costs no longer recoverable)
- **NOT in force:** marriage value abolition; 990-year extensions at zero ground rent
- Freeholders' judicial review dismissed by the High Court Oct 2025 — reforms survived, but that did
  not commence them
- Valuation reforms need secondary legislation setting deferment and capitalisation rates;
  that consultation **closes 23 September 2026**
- Commonhold and Leasehold Reform Bill committed to in the May 2026 King's Speech; the £250 ground
  rent cap is draft, not law
- Realistic commencement 2027-28 at the earliest — **treat any specific date as unreliable**

This is exactly the §5.3 Bill-vs-enacted-Act pattern the engine is built to catch. A16 is the page
that states it explicitly and is the citation magnet; A9-A15 must all be consistent with it.

**A16 needs a "last verified" date in the body and a re-check scheduled for after 23 Sep 2026.**

### 5.2 Statutory anchors to verify at Stage 1b
- EICR: Electrical Safety Standards in the Private Rented Sector (England) Regs 2020 (SI 2020/312)
- Gas: GSIUR 1998 (SI 1998/2451) reg.36 — already locked, see `gas-safety-certificates.md`
- Fire: Regulatory Reform (Fire Safety) Order 2005; Fire Safety (England) Regs 2022
- Licensing: Housing Act 2004 Parts 2 and 3
- MEES: Energy Efficiency (Private Rented Property) (England and Wales) Regs 2015
- RTM: Commonhold and Leasehold Reform Act 2002 Part 2 Ch.1, **as amended by LAFRA 2024 Mar 2025**
- Service charges: Landlord and Tenant Act 1985 ss.18-30; s.20 consultation

### 5.3 Devolution
EICR, MEES, licensing and RTM all differ in Scotland, Wales and NI. Every compliance page must state
its jurisdiction in the first screen. Property's audience is UK-wide.

### 5.4 A7 is top-of-funnel, not a lead page
`epc booking` at KD 1 / 14,800 a month is the cheapest traffic in the whole research, but £3.88 CPC
means it is a fulfilment query. Build it to route into A6/A8 and the compliance pillar. Do not
contort it into a lead page.

---

## 6. Out-of-band workstream — pillars and calculators

**The wave machinery does not build these.** They are route pages and registry entries, not blog
posts. Conductor builds them directly, after the wave merges.

### 6.1 Pillars (root-level route folders)
Property convention: pillars sit at root (`/section-24`, `/landlord-tax`), **not** under `/services`,
because `Property/web/src/app/services/` is four hardcoded folders, not `[slug]`.

- `/landlord-compliance` — hub for A1-A8, plus the existing scattered compliance posts
- `/leasehold` — hub for A9-A16, including the maintained LAFRA in-force table

(The third pillar, `/cost-of-selling-a-property`, belongs to Wave 12 — see §7.)

### 6.2 Calculator — `lease-extension-premium-calculator`
Estimates the premium **including marriage value where the term is under 80 years**. Nothing accurate
exists free, and stating that marriage value still applies is the differentiator.

Adding a generic tool is two steps: create
`Property/web/src/lib/calculators/tools/lease-extension-premium-calculator.ts` exporting a
`GenericTool`, then import it in `registry.ts` and append to the `GENERIC: GenericTool[]` array.
Nothing else — the gallery, sitemap, nav and dynamic `/calculators/[slug]` route all read `TOOLS`.

```ts
import type { GenericTool } from "../types";
import { gbp } from "../format";

export const leaseExtensionPremiumCalculator: GenericTool = {
  kind: "generic",
  slug: "lease-extension-premium-calculator",   // = /calculators/<slug>
  name: "…", category: "…", oneLiner: "…", embedHeight: 640,
  metaTitle: "…", metaDescription: "…", intro: "…",
  fields: [ { id: "…", label: "…", type: "currency", default: 0, step: 1000 } ],
  //   type: "currency" | "number" | "select" | "toggle"
  //   optional: options[{value,label}], help, step, min, max, advanced, suffix
  compute: (v) => ({
    headline: { label: "…", value: gbp(x) },     // + optional sub, tone: "default"|"warn"|"good"
    rows: [{ label: "…", value: gbp(y), strong: true }],
    note: "…",                                   // honest disclaimer, required by the house bar
  }),
  explainer: { heading: "…", paragraphs: ["…"] },
  faqs: [], related: [], workedExamples: [],
};
```

Registry quality bar: every figure traces to `docs/property/house_positions.md` or HMRC, no pricing
or fees on-page, honest `note` on each tool. The 5 bespoke tools (stamp-duty, section-24,
incorporation-cost, mtd-checker, portfolio-profitability) have hand-built pages but still register a
`{ kind: "bespoke", … }` stub.

### 6.3 Resource hubs
Add `content/resources/landlord-compliance.md` and `content/resources/leasehold.md` to match the
existing 6 (capital-gains, incorporation, landlord-essentials, mtd, section-24, stamp-duty).

### 6.4 Internal-link back-patch
~50 existing posts mention these topics without targeting them (EICR 34, ground rent 73, service
charge 83, HMO licensing 71). Run as a Stage 11 post-merge sweep. Per the engine's §6 guidance,
give this to a sub-agent told **not to commit** and **not to touch newly-merged pages**.

---

## 7. Wave 12 — Cluster A, gated on a decision

The remaining 13 pages are the cost-of-selling cluster (`estate agent fees uk` 1,600,
`estate agent fees england` 4,400, `how much do estate agents charge` 1,600,
`sell house without estate agent` 390 @ £13.46, plus auction / part-exchange / probate-sale
alternatives). Corpus ~45,850/mo, and Property has **zero** coverage.

**Do not start it without an owner decision on brand fit.** Property Tax Partners is a *tax* brand,
and a vendor searching estate agent fees is not looking for an accountant. It only coheres if every
page carries the tax hook: selling costs are CGT-deductible and the CGT bill is the part nobody else
prices. Category should be `Capital Gains Tax` for exactly that reason.

If the owner declines the framing, Cluster A moves to its own site instead. Flagged in
`PROPERTY_PAGE_PLAN.md`; not a decision for the conductor to make alone.

Wave 12 also carries `/cost-of-selling-a-property` and the `cost-of-selling-calculator`
(direct target `estate agent fees calculator uk`, 720/mo). That calculator must **feed**
`capital-gains-tax-calculator.ts:24`, which already takes a combined
"buying, selling & improvement costs" input — chain, do not duplicate.

---

## 8. Standing rules that apply to every page

From the engine and the estate-wide conventions. A sub-agent prompt that omits these will drift.

- **Six-check floor** (§5.2): 0 em-dashes; 0 utility CSS classes (semantic HTML only); FAQ schema
  count in built HTML == frontmatter `faqs:` length (10-14 FAQs); metaTitle ≤62 chars;
  metaDescription ≤158 chars; every internal link resolves. Body 2,800-3,500 words non-pillar.
- **Body is raw HTML directly after the frontmatter**, not markdown. `<p>`, `<h2>`, `<ul>/<li>`;
  internal links `<a href="/blog/<category-slug>/<slug>">`; external
  `<a href="…" rel="nofollow noopener" target="_blank">`.
- **Required frontmatter**, all values double-quoted (an unquoted `colon-space` breaks the build):
  `title` · `slug` · `canonical` · `date` · `generator` · `author` · `reviewedBy` ·
  `reviewerCredentials` · `reviewedAt` · `category` · `metaTitle` (≤62) · `metaDescription` (≤158) ·
  `altText` · `image` (may be `""`) · `h1` · `summary` · `schema` (may be `""`) · `faqs` (10-14).
  Copy the shape from a Wave 10 page, e.g.
  `Property/web/content/blog/business-asset-disposal-relief-residential-property-qualification.md`.
  **Do not** copy `gas-safety-certificates.md` — it predates the `reviewedBy`/`generator` fields.
- Wave pages stamp `generator: "opus-4.8/netnew-wave"`.
- `canonical` = `https://www.propertytaxpartners.co.uk/blog/<category-slug>/<slug>`.
- **Every new slug needs a `SLUG_TO_CATEGORY_MAP` entry in `Property/web/src/middleware.ts`.**
  The content dir is flat; category routing comes from frontmatter plus that map. Miss it and the
  canonical URL 404s.
- **Opus writes every body**, via Claude Code sub-agents in the wave. Sonnet does mechanical work only.
- **Do NOT use the blog generator CLI for this wave.**
  `python -m optimisation_engine.blog_generator --site property` is the *topic-queue* path, it runs
  `claude-sonnet-4-6`, and it stamps a different `generator` value. Wave bodies come from sub-agents.
- **Sub-agent autonomy clause is mandatory** in every dispatch prompt — see run-wave.md. Without it
  sub-agents pause ~70% of the time.
- Tracker, flags and Q&A are written to `main` by **absolute path**, regardless of cwd.
- **Commit before flipping a tracker row to done.** The reverse order produces false lane-done flags.
- No pricing on-page, anonymised social proof only, LeadForm auto-injects at footer — never in body.
- Verify every numeric rate and threshold against gov.uk / primary law at write time.
- No auto-commit outside the wave scripts unless `OPTIMISATION_AUTO_COMMIT=1`.

---

## 8b. QA gates — two of these are HARD and will block your deploy

`deploy-and-index.ps1` runs `predeploy_gate.py` as step 0. It fails the deploy on:

- **internal `/blog` link 404s — HARD**, floor is zero
- **independent QA verdicts — HARD**, sha256-keyed per page; a page with no recorded verdict blocks
- brand consistency — HARD
- em-dashes and service pricing — warn only, unless you pass `--strict`

The QA verdict cache is the one that surprises people. Verdicts live in
`optimisation_engine/.cache/qa_verdict_<batch>.json` and are keyed by content hash, so **editing a
page after its verdict is recorded invalidates it**. Record verdicts last.

```bash
# from repo root
python scripts/frontmatter_lint.py --check --site property
python scripts/track2_link_audit.py --site property          # authoritative 0-HARD-404 check
python scripts/word_count_gate.py --site property

# independent QA verdicts (verdict source workflow: scripts/track2_independent_qa.wf.js)
python scripts/qa_verdict.py pending --site property --batch wave11 --slugs <slug> ...
python scripts/qa_verdict.py record  --site property --batch wave11 --verdicts <return.json>

# the gate itself
python scripts/predeploy_gate.py --site property --qa-batch wave11
```

**Register the batch in `monitored_pages`** so the regression detector watches these 19 pages for the
90-day window (engine §1 requires it, and `deploy-and-index.ps1 -QaBatch` does it for you):

```bash
python scripts/register_monitored_batch.py --batch wave11            # dry run first
python scripts/register_monitored_batch.py --batch wave11 --commit
```

So the real Stage 13 command for this wave is:

```
./scripts/deploy-and-index.ps1 -Site property -QaBatch wave11
```

That chains: predeploy gate → swap `Property/.vercel/project.json` into repo root →
`vercel deploy --prod --yes --archive=tgz` from repo root → restore → register monitored batch →
IndexNow submit. The project swap exists because Property's Vercel Root Directory is `Property/web`,
so deploying from inside `Property/` resolves to `Property/Property/web` and fails.
Verify after: `curl -sI https://www.propertytaxpartners.co.uk/sitemap.xml`.

**Stage 5 caveat.** `scaffold-launch-prompts.ps1` generates from the previous wave's templates, but
`docs/sessions/property/` only holds prompts up to **Wave 9** — Wave 10 ran single-lane without a
launch-prompt set. Expect to author the Wave 11 prompts by hand from the Wave 9 templates rather than
having them scaffolded cleanly.

## 9. Sequence

1. `/run-wave 11` → Stage 0 pause → paste §3 picks.yaml
2. Stages 1-2: scaffold, cannibalisation audit → resolve the §4 partials
3. Stage 3-4: brief seeds → **Stage 1b: lock §5.1 marriage value and §5.2 statutes**
4. Stage 4: full briefs → Stage 2b drift triage
5. Stages 5-8: scaffold prompts, PREP, LAUNCH, RUN (~2-6h), attend Q&A watcher
6. Stages 9-11: validate, HP corrections, audit, merge, build, back-patches
7. **§8b QA gates** — middleware map entries, frontmatter lint, link audit, record QA verdicts LAST
8. Stage 12: **deploy gate — explicit owner approval required**
9. Stage 13-14: `./scripts/deploy-and-index.ps1 -Site property -QaBatch wave11`,
   then heartbeat in `docs/property/STATE.md` (NOT the archived NETNEW_PROGRAM.md)
10. Then §6 out-of-band: 2 pillars, 1 calculator, 2 resource hubs, internal-link sweep
11. Then Wave 12, **only after the §7 brand-fit decision**

---

## 10. What is NOT in scope

From the same research, good opportunities that belong to other brands — do not put them on Property:
party wall (1 mention across 741 posts), asbestos (10), Japanese knotweed (2), RICS surveys,
settlement agreements (`settlement agreement lawyer` 9,900 @ £41.59 KD 1 — the best find in the
sweep, but it needs its own domain), MVL, H&S consultancy, trademark.

Distressed/BMV sale is on the roadmap as a separate site, not a Property cluster. See
`expansion_research/buyer_demand/BMV_STRATEGY.md` and `BMV_FACTS.md`.
