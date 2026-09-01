# U43 — non-resident-landlord-scheme-uk-complete-guide (EXTEND)

Verdict: EXTEND. Cluster: non-resident. Priority: P2.

## 1. Unit facts

- Target page confirmed on disk: `Property/web/content/blog/non-resident-landlord-scheme-uk-complete-guide.md`, slug `non-resident-landlord-scheme-uk-complete-guide` (frontmatter verified).
- Dominant query: "non resident landlord scheme for companies" (page_map.csv row U43, volume 90 for "non resident landlord tax").
- Tagged query variants, with data (all from questions_corpus.csv non-resident bucket, 27 questions total, unmeasured volume unless noted):
  - "non resident landlord company" (line 1335)
  - "non resident landlord company corporation tax" (line 1336)
  - "register non resident landlord for corporation tax" (line 1350)
  - "how to register as a non resident landlord" (line 1332)
  - "non resident landlord application for company" (line 1334)
  - "non resident landlord number" (line 1338)
  - "non resident landlord scheme company" (line 1339)
  - "non resident landlord scheme corporation tax" (line 1341)
  - "non resident landlord scheme for companies" (line 1342)
  - "non resident landlord corporation tax" / "non resident landlord corporation tax rate" (lines 1337, 1280 — 1280 sits in the mortgages+lending bucket, likely mis-bucketed, treat as the same intent)
  - "who owns tennant company" (line 1189, misc bucket — low-quality/noise, do not target directly, but check if it resolves to a genuine "who is responsible, landlord or agent" question worth folding into an FAQ)

**Formulation types across the list above (all four present in the corpus, all four must be covered):**
- **question**: "how to register as a non resident landlord", "what is a non resident landlord", "what is non resident landlord scheme" (the last two are definitional and already owned by the live page's H2s 2-3 — do not rebuild them, they are listed so the writer knows the intent is already served)
- **action**: "register non resident landlord for corporation tax", "non resident landlord application for company"
- **technical**: "non resident landlord scheme corporation tax", "non resident landlord company corporation tax", "non resident landlord corporation tax rate"
- **conversational**: "non resident landlord scheme for companies", "non resident landlord scheme company"
- Deliberately excluded as navigational noise: "non resident landlord scheme contact number", "non resident landlord number" (the latter is kept in the list above only because it may resolve to "what reference number does HMRC give me", worth one FAQ line at most).

## 2. Our-data baseline

`our_queries.csv` shows two live Bing rows landing on THIS page already:
- "non resident landlord scheme - annual information form" — 28 impressions, 0 clicks, avg position 6.0 (row 447)
- "uk non resident landlord scheme updates to information held" — 10 impressions, 0 clicks, avg position 4.0 (row 1019)

Neither of these is the company-path query the extend targets, but both confirm the page already ranks respectably (positions 4-6) on adjacent scheme-mechanics queries, which is exactly the authority base the company-path addition should extend rather than risk. No existing row targets "non resident landlord company corporation tax" specifically — this confirms the gap.

## 3. Competitor floor

- `uklandlordtax.co.uk` runs a dedicated non-resident-landlord content hub (category page plus at least 6 individual guides: tax return, CGT, self-assessment, ROE/overseas-registry) — competitor_urls.csv lines 6412-6856. None of their titles specifically name the company/corporation-tax path; the company angle is a genuine gap versus this competitor too.
- `dnsassociates.co.uk` runs an "offshore company formation" service line and a 2021-budget non-resident-landlord blog post (lines 6959, 7019, 7047, 7092, 7119) — adjacent to U44, not directly competing on the NRL-company mechanics.
- `taxd.co.uk` has one NRLS explainer page (line 4919), general scheme mechanics, no company-specific depth found in the corpus.
- No competitor in the corpus has a dedicated NRL4/NRL6-for-companies section. This confirms the addition is a genuine differentiator, not a catch-up.

## 4. Existing page structure (verified on disk, current H2s in order)

1. At a glance: who withholds, who applies, which form
2. What the non-resident landlord scheme is, and what it is not
3. Who is a non-resident landlord
4. How withholding works: agent, tenant, and the £100-a-week trigger
5. Applying to receive rent gross: NRL1, NRL2 and NRL3 (plus an H3: "Keeping your scheme record current")
6. Refunds and over-withholding: you reclaim through Self Assessment
7. Ongoing UK tax: Self Assessment and Making Tax Digital
8. April 2027: separate property income tax rates (enacted)
9. **Non-resident companies: the 2020 corporation tax move** ← the section to extend
10. Capital gains: the non-resident CGT 60-day return
11. Double taxation: the treaty layer
12. Non-resident companies and the Register of Overseas Entities
13. Common mistakes, and how a specialist helps
14. Where to go next

Section 9 currently (verbatim, verified) covers: gross payment still via NRL2; the 6 April 2020 move from income tax to corporation tax under FA 2019 Sch 5; corporate interest restriction and CT-regime loss/anti-avoidance rules arriving with the switch; a link out to `changes-nrl-companies` for "the detail of the transition and the company tax stack." It does **not** currently mention NRL4 or NRL6, and does not walk through the offshore-company-plus-UK-letting-agent mechanics as a company-specific operational sequence.

`content/blog/changes-nrl-companies.md` (slug `changes-nrl-companies`) is confirmed on disk and already owns the deep-dive: its H2s are "The before-and-after architecture map," "What FA 2019 Schedule 5 actually did," three worked examples (straddling-period split, Corporate Interest Restriction bite for a leveraged BVI landlord, hybrid-mismatch counteraction for a US-LLC structure), "What the CT-regime stack import means at the operational level," "The NRL withholding mechanic continues but the credit shifts," "The compliance trio and where non-compliance bites," FAQ, next step. **This page already owns the 2020 transition's technical depth (CIR, hybrid mismatch, worked examples). Do not duplicate any of that here.**

## 5. Seam and scope of the addition

The gap this EXTEND fills is narrower than the whole transition story: it is the **company-path forms and mechanics** — NRL4, NRL6, and the operational sequence of an offshore company letting through a UK agent — which sits one level more practical than `changes-nrl-companies`' regime-architecture framing. Cross-link to `changes-nrl-companies` for the 2020 switch's tax-regime consequences; do not re-explain CIR, hybrid mismatch or the worked examples there.

**MUST-NOT:** do not re-derive the corporate interest restriction or hybrid-mismatch mechanics (owned by `changes-nrl-companies`). Do not re-explain ATED (owned by the ATED cluster, link if the offshore-company angle comes up). Do not build a general "what is an offshore company" explainer (that is U44's job as the router; link to U44 once it exists, or note it as forthcoming if built in the same wave).

**NRL4/NRL6 — VERIFIED AT SOURCE 2026-09-01, and the original framing was WRONG.** Checked against the gov.uk collection "Forms for non-resident landlords" (https://www.gov.uk/government/collections/non-resident-landlords-forms) on 2026-09-01. The form set is:

| Form | What it is | Who files it |
|---|---|---|
| NRL1 | Application to receive UK rental income without deduction of UK tax — individuals | Non-resident landlord (individual) |
| NRL2 | Application to receive UK rental income without deduction of UK tax — **companies** | Non-resident **company** landlord |
| NRL3 | Same application — trustees | Non-resident trustee landlord |
| NRL4 | Application by **UK letting agents** to register for the Non-resident Landlords Scheme | UK letting agent |
| NRL5 | Application by UK letting agents to operate the scheme **through branches** | UK letting agent |
| NRL6 | **Certificate of tax liability** to be provided to non-resident landlords by UK letting agents or tenants | UK letting agent or tenant (given to the landlord) |
| NRLY | Non-resident landlord annual information return | Filed annually under the scheme |

**Correction the writer must carry:** NRL4 and NRL6 are **not** the company gross-payment path. The company's own gross-payment application form is **NRL2** — which the live page already names. NRL4 is the letting agent's own registration with HMRC to operate the scheme; NRL6 is the certificate of tax deducted that the agent or tenant hands to the landlord (the landlord uses it to claim credit for tax withheld). NRL5 is the agent's branch-level variant.

The genuine gap this EXTEND fills is therefore the **agent-side and evidence-side** of the company path, which the live page does not cover at all: the company applies on NRL2, the UK letting agent separately registers on NRL4 (and NRL5 if operating through branches), and where tax has been withheld the agent issues an NRL6 certificate that the company needs to claim credit in its corporation tax return. Do NOT write "the company files NRL4/NRL6" — that is the error this brief originally carried.

## 6. Dated facts pack (verified vs house_positions.md)

- 6 April 2020: non-resident corporate landlords moved from income tax to corporation tax on UK property profit, under Sch 5 FA 2019 (house_positions.md §10, §16.6, and confirmed in the live page body). This is the anchor date for the whole addition; do not restate it as a proposal or approximate date.
- NRL scheme statutory basis: ITA 2007 ss.971-972 + SI 1995/2902 (house_positions.md §16.6). **Do not cite "FA 1995 Sch 23"** — repealed, unrelated, a known miscite the corpus has been back-patching (house_positions.md §16.6 citation-discipline note, corrected 2026-05-30).
- NRL scheme is statutory, not treaty-based (house_positions.md §10, §16.6) — a treaty-resolved non-UK-resident company must still apply for gross-payment approval; the DTA does not displace NRL withholding.
- ATED interacts with, but is separate from, an offshore company's NRL/CT position (house_positions.md §18.6 — RoE and ATED run in parallel, neither displaces the other). Only reference in passing if the addition touches offshore-company landlords; do not re-explain ATED bands or reliefs (owned by the 20+-page ATED cluster).
- Corporation tax rates if referenced for the company-path landlord's UK property profit: 19% small-profits rate to £50,000, 25% main rate from £250,000, marginal relief between (house_positions.md §21.A framework) — only if the addition needs a rate reminder; do not re-derive marginal relief maths, that belongs to the corporation-tax cluster/calculator.

## 7. Interlink spec (verified on disk)

- `changes-nrl-companies` — already linked from the existing section; keep and strengthen the link specifically around "for the 2020 transition's CT-regime consequences, see..." rather than duplicating.
- U44 `offshore-company-owning-uk-property` (being built in the same wave) — cross-link once live; this is the natural "why would a landlord even use an offshore company" companion.
- ATED cluster (e.g. `ated-overview-companies-holding-uk-residential-property-2026-27`, confirmed on disk) — one-line pointer only if offshore-company mechanics are discussed.
- `register-of-overseas-entities-roe-annual-update-statement-non-resident-landlords` (confirmed on disk, already linked from H2 12 "Non-resident companies and the Register of Overseas Entities") — do not duplicate RoE mechanics in the new NRL4/NRL6 section; if RoE overlaps, point to the existing section instead.

## 8. Editorial conventions (hard rules)

£nnn always; "per cent" in prose, % in tables; hyphenated compounds; sentence-case H2s (match existing page's sentence-case style, e.g. "Non-resident companies: the 2020 corporation tax move"); no em-dashes; no templated restatement of the H1 in a new opening paragraph; distinct FAQ answers if FAQ entries are added (the existing page has no visible FAQ H2 in the confirmed section list above — check the tail of the file for a FAQ block before adding new questions, to avoid duplicating question text); no build/pipeline narration; citations verified against house_positions.md §10/§16/§17/§18 or flagged. The NRL form set is now VERIFIED at source (§5 table), not flagged — use it as written.

## 9. Scope of the ADD (company-path section only)

Insert as new subsections within or immediately after the existing "Non-resident companies: the 2020 corporation tax move" H2 (H3s, not new H2s, to keep the existing section's position in the page flow):

1. **H3: Applying to receive rent gross as a company: NRL2, and the agent-side forms around it** — the company applies on **NRL2** (not NRL4). Then set out what sits on the agent's side of the same transaction: the UK letting agent registers with HMRC on **NRL4** (or **NRL5** where it operates through branches), and where tax has been withheld the agent or tenant issues an **NRL6 certificate of tax liability** to the company, which the company needs as evidence to claim credit for the tax withheld. The form facts are verified (§5 table, gov.uk 2026-09-01); do not re-derive or re-number them, and do not write that the company files NRL4 or NRL6.
2. **H3: The offshore company plus UK letting agent mechanics** — the practical sequence: UK letting agent registers on NRL4 and identifies a non-resident corporate landlord, applies NRL scheme withholding by default, company applies for gross-payment approval on NRL2, agent updates its records and issues NRL6 for any period in which tax was withheld, ongoing obligation to keep the agent/HMRC record current (cross-reference the existing "Keeping your scheme record current" H3 under the NRL1/NRL2/NRL3 section rather than re-explaining it).
3. A short bridging sentence connecting to the existing 2020 CT-switch paragraph and the `changes-nrl-companies` link, so the new material reads as one continuous section rather than a bolted-on block.

Target length: 300-500 words added, matching the existing section's density (the current H2 runs two paragraphs, roughly 180 words) — this ADD should roughly double to triple that section's depth without turning it into a second `changes-nrl-companies`.
