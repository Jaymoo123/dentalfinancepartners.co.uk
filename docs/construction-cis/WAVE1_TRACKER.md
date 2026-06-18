# Wave 1 tracker — construction-cis (Trade Tax Specialists)

**CLOSED 2026-06-12.** All 15 pages through full QA chain; sweeps PASS all; npm test 21/21 green; build green (32 routes + 15 blog posts + 6 category pages).

Conductor session 2026-06-12. 15 pages per SITE_PLAN §7. Writers: 3 Opus pillars + 12 Sonnet clusters, all from `WAVE1_BRIEF.md` + HP lock.

## Status board

| # | slug | tier | written | sweeps | judge | notes |
|---|---|---|---|---|---|---|
| 1 | what-is-cis | pillar | YES | PASS | SHIP (Opus) | REPAIR applied: U+2212 minus sign replaced with "less"; metaDescription trimmed |
| 2 | cis-gross-payment-status-guide | pillar | YES | PASS | SHIP (Opus) | REPAIR applied: FAQ link to sole-trader-vs-ltd added |
| 3 | cis-sole-trader-vs-limited-company | pillar | YES | PASS | SHIP (Opus) | HP §11a addendum written post-audit with Class 4 6%/2%, PA £12,570, worked table self-verified at GBP55k |
| 4 | how-to-register-for-cis | cluster | YES | PASS | SHIP | metaDescription trimmed; all HP-sourced; clean |
| 5 | cis-deduction-rates-explained | cluster | YES | PASS | REPAIR→fixed | FACT FIX: Class 4 9% stale; corrected to 6%; worked example recomputed (refund £4,388); FAQ £2,000 caveat added |
| 6 | cis-tax-refund-how-to-claim | cluster | YES | PASS | SHIP | All figures HP-sourced; £2,000 caveated; clean |
| 7 | allowable-expenses-cis-subcontractor | cluster | YES | PASS | REPAIR→fixed | FACT FIX: plasterer table Class 4 9%→6% (£1,367), Class 2 £180→£0, total £5,925, refund £3,075; refund range lower bound £1,500→£2,000 per HP §13 |
| 8 | vat-reverse-charge-construction | cluster | YES | PASS | SHIP | All HP-sourced; worked invoice + end-user examples present; clean |
| 9 | cis-limited-company-reclaim | cluster | YES | PASS | REPAIR→fixed | REPAIR: missing what-is-cis up-link added; duplicate link removed; EPS 25-working-day figure HP §11a-verified |
| 10 | cis-monthly-return-guide | cluster | YES | PASS | REPAIR→fixed | REPAIR: Reg 24ZA Finance Bill 2026 hedge added; "cumulative" penalty annotation removed; 2,770 words — depth justified |
| 11 | mtd-income-tax-cis | cluster | YES | PASS | SHIP | FACT FIX: MTD quarterly deadlines 5th→7th per HP §11a; figures verified |
| 12 | cis-subcontractor-verification | cluster | YES | PASS | SHIP | All HP-sourced; watch-item hedge preserved; clean |
| 13 | what-is-a-cis-accountant | cluster | YES | PASS | SHIP | ROI paragraph reframed honestly; fee benchmarks HP-sourced; faceless rule observed |
| 14 | cis-vs-paye | cluster | YES | PASS | SHIP | FACT FIX: SSP £116.75→£123.25 per HP §11a; Class 4 6%/2% consistent with pillar 3 |
| 15 | cis-nil-return-explained | cluster | YES | PASS | SHIP | Short-format per pre-write note; clean |

## QA chain results

### Deterministic sweeps (all PASS)

- Em-dash / en-dash: zero instances across all 15 files
- Markdown syntax in body (bare `**`, `#` headings, bare `_`): zero instances
- Stale figures (45p mileage, 8.75/33.75 dividend, 13.8%/£9,100 employer NIC): zero instances
- Frontmatter key set: all 15 files valid (category, slug, title, description, date present)
- Category validity: all 7 categories in niche.config.json; all 15 slugs on internal link map
- Internal link audit: every `<a href` target verified against core pages + wave-1 slug map

### Frontmatter YAML incident (resolved before sweeps)

12 of 15 files had unquoted colons in working titles (YAML parse error); one file contained a stray `</faqs>` tag. Manager wrote a deterministic Python quote-repair script; all 15 files patched deterministically; sweeps and build re-run clean after.

### Fact-audit findings (Opus fact-auditor, web-verified, all fixed manager-direct)

1. **cis-deduction-rates-explained** (row 5): Class 4 NIC rate 9% was stale (main rate cut to 6% from April 2024, confirmed for 2026/27). Corrected to 6%; worked example recomputed to refund £4,388; FAQ £2,000 caveat added.

2. **allowable-expenses-cis-subcontractor** (row 7): plasterer example table used Class 4 9% (stale) and Class 2 £180 (stale — £0 above £7,105 profits threshold from 2026/27 per HP §11a). Corrected: Class 4 to 6% (saving £1,367), Class 2 to £0, total tax bill revised, refund figure revised to £3,075. Refund range lower bound corrected from £1,500 to £2,000 per HP §13.

3. **cis-vs-paye** (row 14): SSP figure £116.75 was stale; corrected to £123.25 per HP §11a (2026/27 rate).

4. **mtd-income-tax-cis** (row 11): MTD quarterly submission deadlines shown as 5th of the following month; corrected to 7th per HP §11a.

### Panel repair outcomes

- **cis-limited-company-reclaim** (row 9): panel found missing up-link to what-is-cis; added. A duplicate internal link present after fix was removed.
- **cis-monthly-return-guide** (row 10): panel requested Reg 24ZA Finance Bill 2026 hedge (bill not yet enacted at time of writing); hedge added. "Cumulative" penalty annotation removed as potentially misleading.

### HP addendum triggered by wave-1 audit

Pillar 3 (cis-sole-trader-vs-limited-company) used Class 4 6%/2%, PA £12,570, and other figures not in the original house_positions.md. Manager wrote HP §11a addendum post-audit with verified 2026/27 supplementary figures: Class 4 6% (below UPL) / 2% (above), PA £12,570, SSP £123.25/week, MTD quarterly deadlines 7th, Class 2 £0 above £7,105, use-of-home flat rates, HMRC helpline 0300 200 3210, EPS 25-working-day target.

### Final state

All 15 pages: sweeps PASS, judge panels complete (12 SHIP, 3 REPAIR all resolved), fact-audit findings all fixed, npm test 21/21, build green.
