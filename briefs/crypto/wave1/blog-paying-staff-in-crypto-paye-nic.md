---
slug: paying-staff-in-crypto-paye-nic
tier: blog
category: Crypto for Business
route: /blog/crypto-for-business/paying-staff-in-crypto-paye-nic
intent: BUSINESS-PROBLEM + capture. UK employers considering paying salaries, bonuses or contractor fees in crypto, needing to know the PAYE/NIC consequences; LAUNCH_CORE names "Paying staff in crypto (PAYE/NIC, readily convertible assets)" in the 12 launch blogs (position 11, BUSINESS-rule pick, no measured volume).
---
# Paying Staff in Crypto: PAYE, National Insurance, and the Readily Convertible Assets Trap

## Body format (LOCKED)

- The blog body ships as **RAW HTML** (`<p>`, `<h2>`, `<h3>`, `<table>`, `<ul>`). The loader does NO markdown conversion, so markdown syntax (`##`, `**`, `-`) will render as literal characters. Author the body in HTML tags only.
- No em-dashes anywhere in the body. Use commas, parentheses, full stops or middle dots.

## Target queries (evidence: LAUNCH_CORE.md, this run 2026-07-11)

- **Primary:** NO measured volume (LAUNCH_CORE blog queue position 11: "no measured volume; BUSINESS-rule pick"). Do NOT attach a volume figure.
- **Secondary (autocomplete/long-tail, no measured volume in dossier):** "paying employees in crypto uk", "crypto salary tax uk", "paying staff in bitcoin", "readily convertible assets crypto". Do not attach volume figures.
- BUSINESS-PROBLEM, assist + capture into the /for/businesses service. Judge on business-lead capture, not sessions. Honours the BUSINESS-audience rule (LAUNCH_CORE).

## Search-intent class + play

BUSINESS-PROBLEM, assist + capture. Reader is an employer or director who wants to pay salary, a bonus, or a contractor in crypto and assumes it is simpler or cheaper than sterling. Play: BLUF that crypto pay is taxable as employment earnings, that PAYE and NIC apply where the tokens are readily convertible assets, and that employer Class 1 NIC is 15% above the £5,000 secondary threshold (from 6 April 2025). Then the readily-convertible-assets test, then the employer's PAYE/NIC obligations, then the employee's later CGT on the tokens they hold, then capture. The wedge is that "pay in crypto" does not escape payroll; it usually adds complexity.

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- **gov.uk (CRYPTO42000, employer NIC guidance)** owns the definitional SERP: beat on the joined-up employer view (earnings + readily convertible assets + the 15%/£5,000 NIC + the employee's later CGT), not on restating the manual.
- **Dedicated crypto-accountant blogs** (per COMPETITORS.md): service framing; beat on a concrete "what the employer actually has to do" walkthrough with the current NIC figures.
- **Generic HR/payroll blogs**: likely stale on the 15%/£5,000 employer NIC and vague on readily convertible assets; a correctly-updated post outranks them.

## Required structure

- H2 skeleton:
  1. The short answer: crypto pay is earnings, PAYE and NIC apply, and it is rarely simpler (BLUF box)
  2. Crypto as employment income: taxed as earnings at sterling value
  3. Readily convertible assets: the test that decides whether PAYE and NIC bite
  4. The employer's payroll obligations (operating PAYE, accounting for NIC)
  5. Employer National Insurance: 15% above the £5,000 secondary threshold (from 6 April 2025)
  6. The employee's second tax: CGT when they later dispose of the tokens they were paid in
  7. Contractors and directors paid in crypto (the same earnings analysis, IR35 scope wall noted)
  8. Why paying in crypto rarely saves tax or admin (the honest conclusion)
  9. Setting up crypto pay correctly (capture section)
- FAQ candidates (no answers at seed stage):
  1. Can I pay my staff in crypto in the UK?
  2. Is a crypto salary taxable?
  3. Do PAYE and National Insurance apply to crypto pay?
  4. What are readily convertible assets?
  5. What is the employer National Insurance rate?
  6. Does the employee pay tax again when they sell the crypto?
  7. Is paying in crypto cheaper for an employer?
- Table/chart opportunities: an "employer obligations" table (earnings valuation, PAYE, employer NIC at 15% over £5,000, reporting); an employee "two taxes" table (income tax/NIC on receipt, then CGT on disposal).
- Calculator embed: none of the launch trio is a token-salary PAYE tool (that is a queue tier-5-9 calculator per LAUNCH_CORE, not launched). No embed at launch. Internal-link the /for/businesses service.
- Internal links within launch core: /for/businesses hub (capture), company-crypto-treasury-accounting blog (companies holding crypto), /for/investors (the employee's later CGT baseline). Note the IR35/contractor scope wall: contractor-status detail belongs to the contractors-ir35 estate site, do NOT cross-link estate sites (LAUNCH_CORE HP 30).

## House positions touched

- **HP 8 (employment income paid in crypto is taxable as earnings), the spine:** where tokens are readily convertible assets, PAYE and NIC apply; employer Class 1 NIC is 15% above the £5,000 secondary threshold (from 6 April 2025), NOT the old 13.8%/£9,100. Cite https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto42000 (verified 2026-07-11); NIC rate per FA-2026 ground truth (employer_nic_15pc_2025_ground_truth).
- **HP 2, HP 3 (CGT rates, AEA), for the employee's second-tax section:** the tokens the employee holds enter CGT at their sterling value on receipt (that is the base cost); later disposal is 18% within remaining basic band, 24% above, higher/additional 24%; AEA £3,000. Cite https://www.gov.uk/capital-gains-tax/rates and https://www.gov.uk/capital-gains-tax/allowances (both re-verified at source 2026-07-14).

## Hallucination danger zones (SHARED + post-specific, ENFORCED)

- **Employer Class 1 NIC is 15% above the £5,000 secondary threshold (from 6 April 2025).** Do NOT use the stale 13.8%/£9,100. This is a locked estate ground truth (employer_nic_15pc_2025_ground_truth) and HP 8. Re-verify at source at write time.
- **PAYE and NIC apply only where the tokens are readily convertible assets.** Describe the test; do not assert that ALL crypto pay is always within PAYE without the readily-convertible-assets qualifier (HP 8).
- **The employee has a SECOND tax (CGT) on later disposal.** Do not stop at the earnings charge. The receipt value is the CGT base cost.
- **CGT is NEVER a flat 18%** (HP 2): 18% within remaining basic band, 24% above, higher/additional 24%. AEA £3,000 (HP 3).
- **IR35 / contractor status is a scope wall** (HP 30): touch it in one line and route to "speak to us"; do NOT cross-link the contractors-ir35 estate site and do NOT write IR35 rules here.
- Do not assert an employee income-tax rate table from memory beyond the earnings principle; if a rate is needed, cite gov.uk live or keep it principle-level.
- No credential claims, no named expert (faceless authority).
- No em-dashes in user-facing copy.

## Stage 2 TODO

- Copy HP 8 exactly and re-verify the 15%/£5,000 employer NIC at source (employer_nic_15pc_2025_ground_truth citation) at write time; this is the single most error-prone figure on the page.
- Copy HP 2, 3 for the employee CGT section; re-verify CGT rates and AEA at source.
- Confirm the readily-convertible-assets wording against CRYPTO42000 before writing that section.
- Keep the IR35 mention to one line with a "speak to us" route; confirm no cross-site link is introduced.
- WebFetch one HR/payroll or rival post to confirm it is stale on the 15%/£5,000 NIC (the coverage gap).

## FLAGGED open items

- **No locked HP gives the employee's income-tax rate bands** (house_positions.md covers the earnings principle at HP 8, not the IT rate table). Keep the employee income-tax charge principle-level or cite gov.uk live at Stage 2; do not assert a bands table from memory.
- **No locked HP covers the non-readily-convertible-assets route** (where PAYE may not apply but the earnings charge still exists and the employee self-reports). If that branch is wanted, cite gov.uk live at Stage 2; do not invent the mechanics. Flag to orchestrator whether to include it.
