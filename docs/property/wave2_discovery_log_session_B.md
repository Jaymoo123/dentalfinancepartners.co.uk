# Property Wave 2 — Session B discovery log (append-only)

Observations that don't require immediate action but feed future waves and the Track 2 sweep over legacy pages. Append-only.

## Categories

- `ADJACENT_TOPIC` — competitor covers something we don't, not in topic_gaps_final.md
- `CALCULATOR_IDEA` — interactive widget worth building (IHT estate calculator, residence-test day-counter, etc)
- `COMPONENT_IDEA` — UI pattern from competitors worth borrowing
- `EXISTING_PAGE_STALE` — existing Property page with stale figures / framings (feeds Track 2 sweep)
- `EXISTING_PAGE_LINK_OPPORTUNITY` — existing page that should link to your new page
- `AUTHORITY_GAP` — HMRC manual / legislation never cited on our site
- `CROSS_NICHE_LINK` — Property topic that bridges to dentists / medical / solicitors / contractors-ir35
- `SERP_FEATURE` — featured snippet / rich answer / knowledge panel competitors win
- `INTERNAL_RESEARCH` — question you couldn't answer with public sources

## Format

```
### [D-N] [YYYY-MM-DD] [CATEGORY] Title
- **Page being worked on:** <slug>
- **Observation:** <text>
- **Why it matters:** <text>
- **Suggested next action:** <text or "no action — observation only">
```

---

### [D-1] [2026-05-22] [EXISTING_PAGE_STALE] Legacy NRL / NRCGT cluster runs short and shallow
- **Page being worked on:** B1 tax-treaties-property-investors-treaty-framework-guide
- **Observation:** Six closest-existing Property pages in the non-resident-landlord-tax cluster (NRL complete guide, NRCGT rates & reporting, NRCGT applied selling guide, NRL 20% withholding, NRL self-assessment filing, expat obligations overview) all sit at 76-138 lines of legacy DeepSeek-era content. Frontmatter uses em-dashes in body and template wording ("Many landlords ask..." style openings). None go to article-level depth on the treaty framework, the NRCGT statutory citations (still mostly cite ss.14B-14H rather than s.1A + Schs 1A/1B/4AA), or the credit-relief mechanics.
- **Why it matters:** When the legacy-rebuild wave runs, this entire cluster is a coherent rebuild target. The new B1 framework page gives them a natural pillar to spoke into; rebuilds should be deeper (2,500-3,500 words each), cite the current statutory regime, and adopt the bidirectional crosslink pattern.
- **Suggested next action:** Add this cluster to the legacy-rebuild backlog as a single coherent batch (rather than rebuilding piecemeal). Tag the batch as "NRL/NRCGT/treaty cluster, B1-spoked".

### [D-2] [2026-05-22] [AUTHORITY_GAP] Property site rarely cites TIOPA 2010
- **Page being worked on:** B1
- **Observation:** Grep across the existing 316 Property blog markdown files for "TIOPA" returned few hits before this wave. TIOPA 2010 is the principal UK foreign tax credit statute (ss.18, 130, plus 81 transfer-pricing provisions); for any treaty-relevant page on the Property side it should be a routine citation. Equally rare: explicit citation of FA 1995 Sch 23 and SI 1995/2902 for the NRL scheme (the statutory source rather than the colloquial "NRL scheme").
- **Why it matters:** Authority-link density is a known SERP signal in legal/financial verticals; competitor DTA pages don't cite either statute, so the Property site can lead. Worth adding to the wave's authority-link bucket and propagating across B2-B10.
- **Suggested next action:** Ensure every B-series bilateral DTA page cites TIOPA 2010 ss.18 / 130 (or the equivalent for the specific credit-method article) and references the NRL statutory source by Sch 23 / SI 1995/2902 rather than colloquially.

### [D-3] [2026-05-22] [SERP_FEATURE] Top-5 UK landlord-tax DTA pages all run short
- **Page being worked on:** B1
- **Observation:** Of the five competitor URLs fetched (uklandlordtax.co.uk, landlordstax.co.uk, gov.uk treaties hub, INTM150000, HS304), only landlordstax.co.uk presents an actual narrative explanation (943 words), and even there article-level detail is absent. uklandlordtax.co.uk reports 1,931 total words but the body is ~250 words of "Overview" plus nav cruft. There is no specialist competitor running a 3,000+ word framework pillar with an article-by-article walk.
- **Why it matters:** B1 at 3,939 body words is structurally distinct from anything on page 1 of the SERP today. The bilateral pages (B2-B10) probably face similar shallow-competitor patterns; each is therefore a real ranking opportunity rather than a parity exercise.
- **Suggested next action:** No immediate action; informs B2-B10 framing (do not pad to match short competitors; let depth fall out of the framing differentiator).

### [D-4] [2026-05-22] [INTERNAL_RESEARCH] Indian-resident UK landlord credit position is often credit-light
- **Page being worked on:** B5 uk-india-dta-property-rental-income-treatment
- **Observation:** In the worked example (Anil, Mumbai-resident, two UK BTL flats totalling £32,400 gross rent, £17,080 interest), the UK personal allowance under Article 26 plus the s.24 finance-cost credit exhaust UK income tax to nil. Form 67 reports nil UK tax to credit, so the full Indian liability (~£1,850) lands without DTAA mediation. The standard "treaty credit relieves double tax" framing badly understates what the Indian-side cost actually is in mid-portfolio scenarios.
- **Why it matters:** The credit-relief headline that most NRI-targeted competitor pages lead with ("UK-India DTAA prevents double taxation") is misleading for mid-portfolio Indian-resident landlords. The s.24 + personal allowance pattern leaves UK tax at nil for typical 2-3 property portfolios; Indian-side IRPF on the gross rental (after 30% standard deduction) lands largely uncredited. This is a counterintuitive finding worth either a dedicated calculator widget or a more prominent FAQ across the bilateral pages where the same arithmetic recurs (UAE, India, anywhere with an asymmetric or higher residence-state rate).
- **Suggested next action:** Consider a "treaty credit shortfall" calculator widget for the legacy-rebuild wave on the NRL/NRCGT cluster, taking gross rent + mortgage interest + UK personal-allowance status + residence-state marginal rate as inputs. For B6 (UAE) the inverse holds (UAE has no income tax so UK tax is the only tax line); flag the symmetric-but-opposite shape there.

### [D-5] [2026-05-22] [INTERNAL_RESEARCH] Habitual-abode is widely treated as raw day-count but OECD Commentary requires settled-pattern test
- **Page being worked on:** B8 dta-tie-breaker-test-dual-residence-property-owners
- **Observation:** Writing the Daniel/UK-Portugal worked example forced a close read of OECD Commentary on Article 4 paragraph 19. Most competitor coverage of habitual abode reduces it to "whoever has more days a year wins Step 3". The Commentary is more demanding: habitual abode requires a settled pattern detected over a sufficient length of time (typically multi-year), with frequency, duration, AND regularity all weighed. The Daniel example resolved at Step 3 not because of a day-count lead (his UK 175 / Portuguese 178 days were essentially tied) but because the UK pattern was more concentrated and regular (long blocks at one address in predictable seasons) while the Portuguese pattern was itinerant. This is a meaningful distinction that most NRL/expat content gets wrong by treating Step 3 as a numerical tie-break.
- **Why it matters:** Solo retirees with dual-base lives are a structurally common dual-residence pattern (a partial-non-dom-reform consequence as well — wealthier retirees increasingly maintaining Lisbon/Faro/Malta flats alongside UK homes). For this segment the habitual-abode test is where the cascade resolves, and the framing on competitor sites is materially wrong. A calculator widget that takes 3 years of stay-pattern data and surfaces the OECD-Commentary frequency-duration-regularity weights would be authority-building.
- **Suggested next action:** Calculator idea for legacy-rebuild wave or a separate Wave-3 SRT/tie-breaker tooling sprint: a multi-year stay-pattern visualiser that takes blocks of dates in each jurisdiction and computes (a) raw day count per year, (b) longest-consecutive-block by jurisdiction, (c) seasonal regularity score, (d) habitual-abode lean signal. Could anchor on a Wave-2 page or live as standalone tooling. Also worth a dedicated FAQ on the SRT page (C2) once that lands.

### [D-6] [2026-05-22] [CALCULATOR_IDEA] s.24/FTC interaction is the largest avoidable cost for mortgage-financed overseas landlords
- **Page being worked on:** B9 foreign-tax-credit-uk-property-overseas-landlords
- **Observation:** Helen's worked example surfaced a counterintuitive interaction. UK-resident landlords with mortgage-financed overseas residential property face s.24 ITA 2007 restriction on UK side (interest restricted to basic-rate tax reducer); foreign country typically permits full interest deduction. Result: UK measure of rental is higher than foreign measure; UK tax cap is on the higher UK measure; credit is capped at foreign tax (lower because foreign measure is lower); s.24 basic-rate reducer only partly offsets. Helen counterfactual: with £200k mortgage at 5%, UK net liability rises by ~£600/year on top of the £2,400 interest cost. Across portfolio-scale landlords with 3-4 overseas properties, this is £1,800-£2,400/year of avoidable cost that most landlords (and many advisers) don't model.
- **Why it matters:** UK-resident landlords with overseas property are a growing segment (FIG-window expirers from 2029 onwards, plus the always-UK-resident landlords with newly-bought EU property post-Brexit). The s.24/FTC arithmetic is genuinely tricky and not well covered by competitors. Either a calculator widget that takes (gross rent, foreign expenses, foreign tax rate, UK marginal rate, UK mortgage interest) and outputs (UK measure, UK cap, credit allowed, s.24 reducer, net UK liability) would be a high-utility tool, or a dedicated FAQ chain on the B9 page when next iterated.
- **Suggested next action:** Calculator widget candidate for legacy-rebuild wave or Wave-3 tooling sprint. Companion to the D-4 "treaty credit shortfall" calculator (D-4 focused on residence-state shortfall for NRI/UAE/India cases; D-6 focuses on UK-side shortfall via s.24 for UK residents with overseas residential property). The two calculators could share a unified "cross-border landlord tax stack" framework.
