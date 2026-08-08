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

1. `.claude/commands/run-wave.md` — the conductor skill you are running (Stages 0-14)
2. `docs/_engines/NETNEW_PROGRAM.md` — the site-agnostic engine (phases, artefacts, quality gates,
   drift patterns). §5.2 six-check floor and §5.3 Bill-vs-enacted-Act discipline are non-negotiable.
3. `docs/property/NETNEW_PROGRAM.md` — §3 heartbeat (current state), §7 workflow, §16 lessons
4. `docs/property/house_positions.md` — the tie-breaker doc; this wave adds to it
5. `sites/property.json` — paths, wave sizing, voice config

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
Registers in `Property/web/src/lib/calculators/` (5 premium in `registry.ts`, 19 generic in `tools/`).
Estimates the premium **including marriage value where the term is under 80 years**. Nothing accurate
exists free, and stating that marriage value still applies is the differentiator.

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
- **Body is raw HTML inside frontmatter**, not markdown. Copy the shape from
  `Property/web/content/blog/gas-safety-certificates.md`. Required fields: `title`, `slug`,
  `canonical`, `date`, `author`, `category`, `metaTitle`, `metaDescription`, `altText`, `image`,
  `imageCredit`, `h1`, `summary`, `schema`, `faqs`.
- `canonical` follows `https://www.propertytaxpartners.co.uk/blog/<category-slug>/<slug>`.
- **Opus writes every body.** Sonnet does mechanical work only.
- **Sub-agent autonomy clause is mandatory** in every dispatch prompt — see run-wave.md. Without it
  sub-agents pause ~70% of the time.
- Tracker, flags and Q&A are written to `main` by **absolute path**, regardless of cwd.
- **Commit before flipping a tracker row to done.** The reverse order produces false lane-done flags.
- No pricing on-page, anonymised social proof only, LeadForm auto-injects at footer — never in body.
- Verify every numeric rate and threshold against gov.uk / primary law at write time.
- No auto-commit outside the wave scripts unless `OPTIMISATION_AUTO_COMMIT=1`.

---

## 9. Sequence

1. `/run-wave 11` → Stage 0 pause → paste §3 picks.yaml
2. Stages 1-2: scaffold, cannibalisation audit → resolve the §4 partials
3. Stage 3-4: brief seeds → **Stage 1b: lock §5.1 marriage value and §5.2 statutes**
4. Stage 4: full briefs → Stage 2b drift triage
5. Stages 5-8: scaffold prompts, PREP, LAUNCH, RUN (~2-6h), attend Q&A watcher
6. Stages 9-11: validate, HP corrections, audit, merge, build, back-patches
7. Stage 12: **deploy gate — explicit owner approval required**
8. Stage 13-14: `deploy-and-index.ps1 -Site property`, then §3 heartbeat
9. Then §6 out-of-band: 2 pillars, 1 calculator, 2 resource hubs, internal-link sweep
10. Then Wave 12, **only after the §7 brand-fit decision**

---

## 10. What is NOT in scope

From the same research, good opportunities that belong to other brands — do not put them on Property:
party wall (1 mention across 741 posts), asbestos (10), Japanese knotweed (2), RICS surveys,
settlement agreements (`settlement agreement lawyer` 9,900 @ £41.59 KD 1 — the best find in the
sweep, but it needs its own domain), MVL, H&S consultancy, trademark.

Distressed/BMV sale is on the roadmap as a separate site, not a Property cluster. See
`expansion_research/buyer_demand/BMV_STRATEGY.md` and `BMV_FACTS.md`.
