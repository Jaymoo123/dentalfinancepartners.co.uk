---
slug: cgt-on-inherited-property-uk-probate-base-cost
category: capital-gains-tax
intent: applied guide — CGT calculation when a UK beneficiary inherits and later sells residential property
---

# Working title: CGT on Inherited Property: Probate Value, PPR and the 60-Day Clock

## Statutory anchor

**Primary:** TCGA 1992 s.62 — base cost of assets acquired as legatee is the market value at the date of death (probate value), NOT the original purchase price.

**Supporting:**
- TCGA 1992 s.222-s.226 (PRR / PPR) — occupying beneficiary may qualify for private residence relief from the date they move in as main residence.
- TCGA 1992 s.62(6) — deed of variation reads back to the deceased for CGT where the relevant election is made (cross-reference §22.2).
- TCGA 1992 s.60 — personal representative (PR) disposals treated as nominee; PR rate is 24% (§5 house position).
- IHTA 1984 s.171 — value used for IHT (probate value) becomes the s.62 base cost for CGT; the interaction prevents double-taxation of the same uplift.
- Finance Act 2019 Sch 2 (60-day reporting for UK property disposals by UK residents where tax is due — confirmed in §5 house position).

**House position reference:** §5 (CGT rates, 60-day reporting, PRR). §22.2 (deed of variation s.62(6) and s.142 IHTA). NEW LOCK NEEDED: dedicated s.62(1) probate-base-cost position with explicit confirmation that the IHT probate value IS the CGT acquisition cost.

## Framing differentiator

Closest existing page: `cgt-inherited-rental-property-calculation-uk` (Jaccard 0.12 — very low overlap per cannib check). Closest competitor coverage noted in picks label: `capital-gains-tax-property-complete-guide-uk` covers inheritance in one FAQ sentence only.

**Angle this page takes that neither existing page nor the complete guide takes:** This is the APPLIED operational guide — the reader has inherited a specific property and needs to know: (a) what their base cost is and where to find it, (b) whether PPR is available and from what date, (c) how IHT already paid interacts with the CGT calculation, (d) what happens if there are multiple beneficiaries, and (e) the 60-day filing window. The calculation walkthrough is the load-bearing section.

**Scope NOT covered here (in-scope for other pages):**
- Non-resident inheriting UK property (covered by non-resident-cgt-uk-property-rates-reporting).
- Deed of variation mechanics in depth (§22.2 position; this page should link to the DoV page if it exists, or note briefly).
- IHT itself — this page is CGT-only; IHT context is background only.

## Key questions this page must answer

1. What is the CGT base cost when you inherit a property, and how does it differ from buying at market price?
2. Where does the probate value come from, and what documents confirm it (IHT400 / IHT205 / grant of probate)?
3. Can a beneficiary who moves into the inherited property claim PPR, and from what date does the clock run?
4. Does the IHT paid by the estate reduce the CGT gain, or is it entirely separate?
5. How is the gain calculated where a property has been let between the date of death and sale?
6. What are the CGT rules when the estate has multiple beneficiaries (e.g. three children each inheriting a one-third share)?
7. Is a 60-day return required, and does it apply when PPR fully covers the gain?
8. What is the personal representative (PR) rate vs. the beneficiary rate, and does it matter who sells — the PR or the beneficiary after assent?
9. Can a deed of variation change the base cost for CGT, and what election is needed?
10. What records should an executor/beneficiary keep to support the base cost figure?

## Manager pre-decisions placeholder

- [ ] Confirm: does the site have an existing deed-of-variation page to cross-link? If not, flag as a future pick.
- [ ] Confirm: should the page cover the position where the PR sells before assent (PR at 24%) vs. beneficiary sells after assent (individual rates 18/24%)? Stage 1 assumes YES — both paths covered.

## Stage 2 research target list

**Competitor candidates (for brief verification — Stage 2 to WebFetch and confirm live):**
1. `capital-gains-tax-property-complete-guide-uk` (Property Tax Partners site) — check the inheritance FAQ sentence to confirm our differentiator angle holds.
2. HMRC CGT manual CG31100-CG31700 (assets passing on death, legatee acquisition cost, personal representative disposals) — key HMRC manual anchor.
3. HMRC guidance "Report and pay your Capital Gains Tax" — 60-day return mechanics for UK residents.
4. TCGA 1992 s.62 on legislation.gov.uk — verbatim verify s.62(1) wording.

**HMRC manual refs:**
- CG30700: legatee — general
- CG31100: assets passing on death — acquisition cost
- CG30900: personal representatives — rate and treatment
- CG64300+: PPR for assets not occupied throughout

**Case law:**
- No landmark case law specific to probate base cost (it is a statutory bright-line rule); Stage 2 to check if HMRC has issued any SP or ESC on executors delaying assent.

## Universal rules + workflow stubs (Stage 2 fills)

- No em-dashes anywhere in the body.
- Rates: residential CGT 18% (basic) / 24% (higher); personal representatives 24% throughout (§5).
- PRR final period: 9 months (§5); mention but do not over-explain letting relief restriction (shared occupation only since April 2020 — §5).
- Do NOT write "CGT rate is 28%", "letting relief is universally available", "60-day applies even where no tax due for UK residents" (§5 do-not-write list).
- Blog body = raw HTML (p, h2, h3); no markdown syntax in body field.
- LeadForm injected at footer; do not add a second call-to-action in the body.
- Internal links: link to CGT payment deadlines page (`cgt-payment-deadlines-property-sales-2026`) and to the PRR page if one exists.

## Work log

- 2026-07-08 S1 seed written (Stage 1 sub-agent, Session A).
