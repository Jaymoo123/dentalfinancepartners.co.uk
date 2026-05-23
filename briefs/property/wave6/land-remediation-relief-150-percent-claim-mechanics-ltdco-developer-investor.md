# Wave 6 brief: land-remediation-relief-150-percent-claim-mechanics-ltdco-developer-investor

**Site:** property
**Bucket:** C (Capital allowances + SBA + FYA — CAA 2001 cluster; LRR is a sister regime under CTA 2009 Part 14)
**Session:** C
**Brief type:** Net-new page (no existing LRR-dedicated page on-site)
**Source markdown path on launch:** `Property/web/content/blog/land-remediation-relief-150-percent-claim-mechanics-ltdco-developer-investor.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/land-remediation-relief-150-percent-claim-mechanics-ltdco-developer-investor

---

## Manager pre-decisions

- **Suggested slug:** `land-remediation-relief-150-percent-claim-mechanics-ltdco-developer-investor`
- **Suggested category:** `property-types-and-specialist-tax`
- **Bucket:** C (CTA 2009 Part 14 sister regime; included in C-bucket because LRR sits alongside CAA in CT relief architecture and is operationally adjacent for property investors / developers)
- **Framing differentiator (Stage 2, 2026-05-23):**

> Land Remediation Relief depth — **CTA 2009 Part 14** (ss.1143-1179) gives a **150% corporation-tax deduction** for qualifying expenditure on cleaning up contaminated or derelict land. **Companies only** — sole traders, partnerships, and LLPs are excluded (use ordinary deduction routes instead). Available to **both LtdCo investors AND LtdCo developers** (s.1147 — relief is available to the company carrying on a property business OR a trade involving the land), residential or commercial — one of the few property tax reliefs that is regime-agnostic. **Loss-making companies can surrender for a payable cash credit** under CTA 2009 s.1149 at a rate equivalent to 16% of the unrelieved expenditure (so a £100k cleanup spend in a loss-making year yields a £16k payable credit). **Qualifying conditions** (s.1144 contamination definition): land is in a contaminated state if relevant harm is being caused or there is a serious possibility of harm being caused; **the "polluter pays" exclusion** at s.1150 — relief is denied where the contamination resulted from the claimant company's own act or omission. **Derelict land relief** at s.1147 — separate gateway, requires land to have been derelict throughout the period beginning **1 April 1998** and ending at the start of the qualifying expenditure period. Two worked claims: (a) developer SPV cleaning up Manchester ex-petrol-station for £180k qualifying spend, profit-making — £270k deduction (150% × £180k) against CT-rate trading profits, value at 25% main rate = £67.5k CT saving; (b) investor LtdCo acquiring derelict warehouse with £80k cleanup spend, loss-making — surrender the loss for payable credit, £80k × 150% = £120k loss surrendered × 16% = **£19.2k payable cash credit** from HMRC. Native pool §993 provides 5 competitor slugs but no on-site coverage; C9 closes a clean authority gap.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** No cross-bucket dependencies. C9 is sister to C-bucket because LRR sits in CT relief architecture adjacent to CAA. The 16% payable credit rate has been stable since the FA 2009 reform; confirm at write time. The 150% rate is the headline; confirm.

**Pool-thinness disclosure:** §993 LRR pool gives 5 competitor slugs of variable quality (taxinsider page is dead; evelyn is dead; crowe is anti-bot). Lean on the four live sources below + the CIRD60000 HMRC manual chapter + the CTA 2009 statutory text.

---

## Competitor URLs (Stage 2 populated + URL liveness verified 2026-05-23 per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Extract treatment of the 150% deduction + 16% payable credit, qualifying-conditions framing (contamination vs derelict-land definitions), "polluter pays" exclusion, claim-process steps.

- https://www.ukpropertyaccountants.co.uk/land-remediation-relief/ — verified live 2026-05-23 (200). Mid-market specialist; useful for landlord-side framing and worked-example pattern.
- https://www.icaew.com/technical/tax/capital-allowances/land-remediation-relief — verified live 2026-05-23 (200). Professional body technical reference; gold for citation density.
- https://taxscape.deloitte.com/article/land-remediation-relief.aspx — verified live 2026-05-23 (200). Big-4 reference; useful for the corporate-only framing + payable-credit calculation.
- https://www.lovellconsulting.com/services/land-remediation-relief/ — verified live 2026-05-23 (200). Specialist CA boutique services page.
- https://www.lovellconsulting.com/news/land-remediation/ — verified live 2026-05-23 (200). Same firm news article; useful for the practical-claim-process framing.

**Borrowable patterns:** ICAEW citation density. Deloitte's payable-credit worked example structure is clean. Lovell's practical-claim-process walkthrough is the cleanest pattern for the 5-step claim process.

---

## GSC data

*Net-new page; primary topical queries expected: "land remediation relief", "land remediation relief 150%", "land remediation payable credit", "derelict land tax relief", "CTA 2009 s1144 contamination", "contaminated land tax relief company".*

---

## Closest existing pages (cannibalisation context)

- `commercial-property-tax-landlords-rates-reliefs-allowances` (category: `property-types-and-specialist-tax`) — generic commercial property reliefs page; partial mention only. Cross-link as a parent.
- `vat-cladding-remediation-relief-residential-building-safety-act-section-30a-mechanics` (Wave 5) — adjacent regime (VATA 1994 s.30A on cladding remediation, not CTA 2009 LRR); cross-link as the regime cousin.
- C1 pillar (forward-link).

**Cannibalisation discipline:**
- No on-site LRR coverage exists; C9 is canonical.
- Vary worked figures from C5 and C8.

---

## Redirect overlap (on launch)

Stage 1 scan: no slug-token overlap. No middleware edit required.

---

## Authority links worth considering (Stage 2 populated 2026-05-23, session selects 5-8)

**Statutory (CTA 2009):**
- Part 14 (Land Remediation Relief; ss.1143-1179): https://www.legislation.gov.uk/ukpga/2009/4/part/14
- s.1144 (qualifying land remediation expenditure; contamination definition): https://www.legislation.gov.uk/ukpga/2009/4/section/1144
- s.1147 (derelict land at 1 April 1998 gateway)
- s.1149 (loss-surrender for payable credit, 16% rate)
- s.1150 (polluter-pays exclusion)

**Other statutory:**
- Finance Act 2001 Sch 22 (original LRR introduction; superseded by CTA 2009 Part 14 consolidation)
- Finance Act 2009 (reform including the derelict-land extension and payable-credit rate calibration)

**HMRC manuals:**
- CIRD60000 (Corporate Intangibles Research and Development Manual — LRR chapter; the canonical HMRC interpretive reference): https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird60000

**Case law (optional):**
- *DCC Holdings v HMRC* [2010] UKSC 58 — statutory interpretation context (cited in Stage 1 seeds; cite only if directly relevant to a worked-example point).

**Cross-references in house_positions.md:** No dedicated §25 anchor for LRR (LRR is CTA 2009 Part 14, not CAA 2001 — sits adjacent). Sessions should treat the statutory text + CIRD60000 as the primary references for this page; flag if a house position is needed for inter-wave consistency. §21.5 (FIC mechanics) for the corporate-only constraint context.

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify the 150% deduction rate, the 16% payable credit rate, and the 1 April 1998 derelict-land gateway date at write time. The "polluter pays" exclusion at s.1150 should be verified verbatim.

### Voice
- **No em-dashes.**
- Practical, specific. Exact figures, named legislation.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no classes.
- Lead-form role segments emphasise Property developer (primary LRR readership) + Large portfolio.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the corporate-only constraint correction (sole-trader developers learn they cannot claim LRR; strong intent for incorporation review)
  - After the payable-credit worked example (loss-making developer realises they can extract cash from HMRC)
  - Optionally after the polluter-pays exclusion section
- Vary opening; do NOT lead with "Land Remediation Relief was introduced...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12.

### Cannibalisation
- No on-site LRR content; C9 is canonical.
- Vary worked figures from other C-bucket pages.

### House positions
- No dedicated §25 anchor; flag if needed.
- Lean on CTA 2009 Part 14 statutory text + CIRD60000.

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is LRR depth + corporate-only constraint + payable-credit-route-for-loss-makers + polluter-pays exclusion. Write to it.
- Vary H2s from other C-bucket pages.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `house_positions.md` once. No dedicated §25 anchor for LRR; lean on §21.5 for corporate-context cross-references.
2. Claim in tracker.
3. Read brief.
4. Fetch competitor URLs.
5. Read closest existing pages.
6. Plan rewrite/write.
7. Verify factual claims; **per §16.35: re-verify 150% rate + 16% payable credit + 1 April 1998 derelict gateway**.
8. Fetch Pexels image.
9. Write markdown with full frontmatter.
10. Build.
11. Verify six checks.
12. No middleware edit on launch.
13. Register in `monitored_pages`.
14. Commit (BEFORE marking done; do NOT include tracker).
15. Fill work-log.
16. Mark done.
17. Append flags.
18. Log discoveries.
19. Next page.

## Session-side watcher pattern

Standard.

---

## Per-page work-log (fill in as you go)

### Decisions
- **Final slug:**
- **Final category:**
- **H1 chosen:**
- **Meta title chosen:**
- **Why these vs other options:**

### Competitor URLs fetched
- 

### Existing-page review
- 

### Citations added
- 

### Internal links added
- 

### Inline CTA placements
- 

### Build attempts
- 

### Verification
- em-dash count:
- Tailwind utility classes:
- metaTitle length:
- metaDescription length:
- FAQ count:
- Internal links resolve:
- Body word count:

### Flags raised to wave6_site_wide_flags.md
- 

### 2-3 sentence summary
