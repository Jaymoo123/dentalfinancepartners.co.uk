# Wave 3 — Cluster A brief (locum & foundation dentist tax, HP §1, §8, §1.B, §11)

Conductor-authored brief (no general sub-agent tool available in this environment; conductor designs + verifies + writes directly, applying the same gates). All figures anchored to `docs/dentists/house_positions.md` and verified at primary source on 2026-06-03 (see the HP verification log Wave 3 cluster A entry).

Six-check floor per page: 0 em-dashes; semantic HTML only (no `class=`); 10-14 FAQs; metaTitle ≤62; metaDescription ≤158; every internal link `/blog/<category-slug>/<slug>` resolves to a real file; body 2,800-3,500 words.

Category slugs (from `slugifyCategory`): Locum Tax → `locum-tax`; Associate Tax → `associate-tax`; NHS Pension → `nhs-pension`; NHS Contracts → `nhs-contracts`; Practice Finance → `practice-finance`.

Sibling slugs (so cross-links resolve at build time):
- A1 `foundation-dentist-dft-first-year-tax-guide` (Locum Tax)
- A2 `locum-dentist-limited-company-vs-sole-trader-tax` (Locum Tax)
- A3 `locum-dentist-pension-options-outside-nhs-scheme` (Locum Tax)
- A4 `newly-qualified-dentist-first-self-assessment-payments-on-account` (Associate Tax)
- A5 `dentist-working-abroad-uk-tax-residence-implications` (Associate Tax)

---

## A1 — foundation-dentist-dft-first-year-tax-guide (Locum Tax)
**Intent:** the DFT/VT year is salaried/PAYE (§1.B), then the move to self-employed associate. Distinct from A4 (which is about the *first SA return + payments on account* once self-employed) and from `dental-foundation-training-pay-scales-uk-2026` (pay scales, not the tax mechanics + transition).
**Anchors:** §1.B (DFT £42,408 from 1 Apr 2025, salaried + officer-pensionable), §1 (associate status on transition), §8 (Class 1 → Class 4 switch, allowable expenses begin, SA registration), §2.C (practitioner pension route begins).
**H2 outline:** What DFT actually is, in tax terms (salaried) · Your DFT payslip: PAYE, Class 1 NIC, NHS officer pension · The £42,408 salary and what is deducted · What you can and cannot claim during DFT (employee, limited) · The switch the day you become an associate · Registering for Self Assessment · Class 1 vs Class 4 National Insurance · The expenses that open up as self-employed · Your NHS pension: officer to practitioner · The first-year cash-flow trap (forward ref to payments on account) · A worked timeline.
**Worked example:** DFT salary £42,408, illustrate take-home as PAYE; then year-2 associate at e.g. £75,000 gross fees, show how tax is no longer deducted at source.
**Internal links:** A4 `/blog/associate-tax/newly-qualified-dentist-first-self-assessment-payments-on-account`; `/blog/locum-tax/allowable-expenses-locum-dentists-uk-2025-26`; `/blog/associate-tax/self-assessment-registration-dentist-uk`; `/blog/nhs-pension/nhs-pension-1995-2008-2015-explained-dentists`; `/blog/nhs-contracts/dental-foundation-training-pay-scales-uk-2026`.

## A2 — locum-dentist-limited-company-vs-sole-trader-tax (Locum Tax)
**Intent (differentiation, partial 0.45 vs `sole-trader-vs-limited-company-dentists-uk`):** that page is the practice-OWNER decision (retained profit, NHS contract novation, sale planning). THIS page is the LOCUM decision: short engagements across multiple practices, IR35 exposure on each engagement (§1.A), no NHS pension via the company, much lower profit, admin overhead vs a thin saving. Lead with audience and the IR35 difference.
**Anchors:** §1.A (IR35/off-payroll: SDS sits with the medium/large client; mix of inside/outside across engagements; inside-IR35 kills the company's extraction advantage), §5 (CT 19-25%, dividend 10.75/35.75% from 6 Apr 2026, employer NIC 15% above £5,000, Employment Allowance not for single-director), §8 (Class 4 6%/2%, expenses).
**H2 outline:** Why the locum question is different from the practice-owner question · The two structures for a locum · Sole trader: how a locum is taxed · Limited company: how a locum extracts · The IR35 problem that hits locums specifically · Inside-IR35: the company stops helping · A worked comparison at locum-level income · The admin and cost the company adds · NHS pension: the company route loses it · So which, for a locum?
**Worked example:** locum on ~£70,000 net of practice deductions; sole trader vs ltd full-extraction at 2026/27 rates; show the thin/negative spread + the IR35 caveat.
**Internal links:** `/blog/locum-tax/ir35-locum-dentists-nhs-engagements`; `/blog/locum-tax/locum-dentist-ltd-company-vs-self-employed`; `/blog/locum-tax/paying-yourself-from-locum-ltd-company-2025-26`; `/blog/practice-finance/sole-trader-vs-limited-company-dentists-uk` (explicitly "if you OWN a practice, see..."); A3 `/blog/locum-tax/locum-dentist-pension-options-outside-nhs-scheme`.

## A3 — locum-dentist-pension-options-outside-nhs-scheme (Locum Tax)
**Intent:** a locum often has patchy/no NHS scheme access; the private-pension route. Distinct from the NHS-pension pages (which assume scheme membership).
**Anchors:** §2.B (£60,000 annual allowance, taper >£200k/£260k, £10,000 floor, 3-year carry-forward, MPAA £10,000), private-pension relief mechanics (relief at source, 100%-of-relevant-UK-earnings cap, £3,600 gross / £2,880 net floor — verified gov.uk), §2.C (when does a locum have NHS access at all), §5 (employer pension contribution via a locum ltd, FA 2004 s.196, no NIC).
**H2 outline:** Why a locum's pension is a gap · When a locum can and cannot be in the NHS scheme · Personal pension / SIPP: the basics · Tax relief at source and the higher-rate top-up · The annual allowance and the 100%-of-earnings cap · Carry-forward · If you trade through a company: employer contributions · The MPAA trap · How much should a locum put away · Putting it together.
**Worked example:** locum earning £60k makes a £20k gross SIPP contribution: £16k net in, £4k basic relief at source, higher-rate top-up via SA.
**Internal links:** `/blog/nhs-pension/nhs-pension-1995-2008-2015-explained-dentists`; `/blog/associate-tax/dentist-pension-contributions-tax-relief-uk`; A2 `/blog/locum-tax/locum-dentist-limited-company-vs-sole-trader-tax`; `/blog/locum-tax/paying-yourself-from-locum-ltd-company-2025-26`.

## A4 — newly-qualified-dentist-first-self-assessment-payments-on-account (Associate Tax)
**Intent:** the *first SA return* and the payments-on-account "double bill" shock. Distinct from A1 (the DFT salaried year) and from existing `dentist-self-assessment-filing-guide-2026` / `payment-on-account-uk-dentists-guide` (this is specifically the *newly qualified, first ever* angle: why year 1 feels like 18 months of tax).
**Anchors:** §8 (payments on account: 31 Jan + 31 Jul, each 50% of prior liability, trigger >£1,000 and <80% at source; Class 4 6%/2%; allowable expenses; Class 2 removed from 6 Apr 2024), §1.B (came from a PAYE DFT year so nothing was set aside), §9 (MTD from Apr 2026 for >£50k — most full-timers).
**H2 outline:** Why your first tax bill is the one nobody warns you about · From PAYE to self-employed · When to register for Self Assessment · The balancing payment for year one · Payments on account: the second hit · A worked first-year bill · Why it feels like 18 months of tax at once · The 31 July payment · Reducing payments on account (and the danger) · Setting money aside from day one · MTD is coming · The checklist.
**Worked example:** first self-employed year profit £70,000: compute income tax + Class 4; show 31 Jan = balancing + first POA; 31 Jul = second POA; total cash leaving by next July.
**Internal links:** A1 `/blog/locum-tax/foundation-dentist-dft-first-year-tax-guide`; `/blog/associate-tax/self-assessment-registration-dentist-uk`; `/blog/associate-tax/dentist-self-assessment-filing-guide-2026`; `/blog/associate-tax/payment-on-account-uk-dentists-guide`; `/blog/locum-tax/allowable-expenses-locum-dentists-uk-2025-26`.

## A5 — dentist-working-abroad-uk-tax-residence-implications (Associate Tax)
**Intent:** a UK dentist taking a job abroad (or a stint) and what UK tax follows them. Net-new (top 0.13).
**Anchors:** §11 (SRT: automatic overseas <16/<46 days + full-time-work-overseas; automatic UK 183/only-home/full-time-UK; ties tables arrivers vs leavers; country tie leavers-only; split-year; worldwide vs UK-source; double-tax relief). §8 (what stops/continues), §2 (NHS pension while abroad — keep light, point to NHSBSA).
**H2 outline:** The question that decides everything: are you still UK tax-resident? · The Statutory Residence Test, in order · Automatic overseas tests · Automatic UK tests · The sufficient ties test (the table) · Arrivers vs leavers · Split-year treatment · If you stay UK-resident: worldwide income + double-tax relief · If you become non-resident: UK-source only · Your NHS pension and GDC registration while abroad · Common dentist scenarios (a year in Australia; weekly commute to Ireland; locum stints) · Get advice before you assume non-residence.
**Worked example:** dentist leaves mid-year for Australia: full-time-work-overseas vs the ties test; show why a leaver with a UK home + family can stay resident; split-year if criteria met.
**Internal links:** `/blog/associate-tax/dentist-self-assessment-filing-guide-2026`; `/blog/locum-tax/allowable-expenses-locum-dentists-uk-2025-26`; `/blog/nhs-pension/nhs-pension-1995-2008-2015-explained-dentists`; A4 `/blog/associate-tax/newly-qualified-dentist-first-self-assessment-payments-on-account`.

**Competitor landscape (for tone/coverage, not citation):** dentaccounts / Hive Business / Figurit / UNW / PFM Dental blogs cover associate tax and locum structuring; SRT coverage on the dentist-specific angle is thin (gap). DFT pay is covered by deaneries but not the tax-transition mechanics (gap). No pricing, no named firms, no fabricated proof.
