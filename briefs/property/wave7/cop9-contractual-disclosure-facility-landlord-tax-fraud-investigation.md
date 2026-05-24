# Wave 7 brief: cop9-contractual-disclosure-facility-landlord-tax-fraud-investigation

**Site:** property
**Bucket:** B (HMRC enquiry + tax compliance ops)
**Pick:** B3 — CoP9 contractual disclosure framework
**Brief type:** Net-new page
**Source markdown path on launch:** `Property/web/content/blog/cop9-contractual-disclosure-facility-landlord-tax-fraud-investigation.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/cop9-contractual-disclosure-facility-landlord-tax-fraud-investigation

---

## Frontmatter header

- **Slug:** `cop9-contractual-disclosure-facility-landlord-tax-fraud-investigation`
- **Bucket:** B
- **Section ID:** §27.5
- **Framing differentiator (~50 words):** HMRC Code of Practice 9 civil-fraud-investigation track — 60-day CDF acceptance window, Outline Disclosure + Disclosure Report sequencing, scope of criminal-prosecution immunity (matters disclosed only — false statements revoke), distinction between HMRC-initiated CoP9 and taxpayer-initiated voluntary CDF request. **CoP9 is NOT a landlord-friendly voluntary-disclosure route** (per §27.9 do-not-write list); it is HMRC's fraud-investigation track. NOT writing LPC (B6) or WDF (B7).
- **Locked HP anchors:**
  - §27.5 (CoP9 / CDF — verbatim)
  - §27.6 (route distinction — CoP9 vs WDF vs LPC vs DDS)
  - §27.9 (do-not-write list — "CoP9 is a landlord-friendly voluntary-disclosure route" forbidden)
- **monitored_pages stub:** Register at launch; primary monitored queries include "CoP9 landlord", "contractual disclosure facility", "HMRC fraud investigation immunity", "60 day CDF acceptance", "Outline Disclosure CoP9".

---

## Manager pre-decisions

- **Suggested slug:** `cop9-contractual-disclosure-facility-landlord-tax-fraud-investigation`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** B
- **Framing differentiator (Stage 2, 2026-05-24):**

> CoP9 is specialist territory and the firm refers out for representation; this page exists to (a) orient landlord-clients to what CoP9 is when an officer letter arrives, (b) distinguish CoP9 from LPC / WDF / DDS routes, (c) signpost specialist representation rather than pretending CoP9 is a self-service disclosure path. Three readers in scope: (i) landlord who has just received a CoP9 letter from HMRC and needs to understand what is happening; (ii) landlord considering voluntary CDF request (taxpayer-initiated rather than HMRC-initiated) where deliberate behaviour exposure exists; (iii) accountant filtering whether a client's facts pattern sits in LPC territory (residential rental, careless or innocent) or CoP9 territory (deliberate fraud with criminal-prosecution exposure). The page walks five layers: (1) what CoP9 is — HMRC's published code under which the Contractual Disclosure Facility (CDF) operates; current edition CoP9 (2014), republished editorially since (verify current gov.uk version at write time); (2) **60-day CDF acceptance window** — HMRC issues CoP9 letter, taxpayer has 60 days to accept by signing CDF acceptance and providing Outline Disclosure; (3) Outline Disclosure (within 60 days of acceptance summarising the fraud) → full Disclosure Report (6-12 months by agreement, reviewed by HMRC Fraud Investigation Service); (4) **scope of immunity** — immunity is for matters disclosed ONLY; false statements revoke immunity and expose taxpayer to criminal investigation including for the disclosed conduct; non-disclosed matters never covered; (5) the **HMRC-initiated vs taxpayer-initiated distinction** — HMRC-issued CoP9 means HMRC has chosen to offer CDF; taxpayer-requested CDF means the taxpayer is asking HMRC to put them under CoP9 (used where a landlord with deliberate-behaviour exposure wants criminal-immunity protection). Critical framing per §27.9 — CoP9 is NOT a landlord-friendly voluntary-disclosure route. It is a serious step taken only with specialist tax-investigations counsel; the firm's position is that landlord-clients with deliberate-behaviour exposure are referred for CoP9 representation rather than handled in-house.

**Stage 1 manager note:** Pool-thinness disclosure — CoP9 is well-covered by specialist tax-investigations firms but rarely landlord-flavoured. Brief generator pulls from CoP9 (2014) verbatim + §27.5 + HMRC EM6000+. NO primary legislation citation for CoP9 itself — it is HMRC's published code; immunity construct operates by HMRC undertaking not statutory provision. Frame accordingly. FA 2007 s.29 civil-evasion penalty context for adjacent fraud cases — verify cross-reference at write time.

---

## Competitor URLs (Stage 2 populated; sessions verify liveness per §16.31 at write time)

**Fetch + read + extract instruction:** Standard httpx + BS4. Extract treatment of (a) the 60-day acceptance window; (b) immunity scope mechanics; (c) HMRC-initiated vs taxpayer-initiated CDF distinction; (d) clear positioning that CoP9 is NOT a landlord-friendly LPC alternative.

- https://www.ukpropertyaccountants.co.uk/cop9-contractual-disclosure-facility/ — mid-market specialist.
- https://www.uklandlordtax.co.uk/cop9-tax-fraud-investigation-landlord/ — landlord-flavoured.
- https://www.shipleys.com/insights/code-of-practice-9-and-the-cdf/ — Top-50 firm; specialist tax-disputes-flavoured.
- https://www.blickrothenberg.com/insights/code-of-practice-9-deep-dive/ — specialist tax-investigations firm.

**Borrowable patterns:** BlickRothenberg's deep-dive structure is the gold standard; Shipleys' immunity-scope framing is clean. Most landlord-specialist pages collapse CoP9 / WDF / LPC into "voluntary disclosure" — major opportunity for differentiation.

---

## GSC data

*Net-new page. Primary topical queries expected: "CoP9 landlord", "contractual disclosure facility", "HMRC fraud investigation immunity", "60 day CDF acceptance", "Code of Practice 9 landlord rental income".*

---

## Closest existing pages (cannibalisation context)

- `landlord-incorporation-step-by-step-guide-uk` (0.11 — false-positive)
- `hmrc-penalties-late-landlord-tax-returns-2026` (0.08 — adjacent only)

**Cannibalisation discipline:**
- No on-site duplication; B3 is the canonical CoP9 page.
- B6 (LPC) and B7 (WDF) cover the voluntary-disclosure routes; B3 covers the HMRC-initiated fraud-investigation route. Distinct.
- The page should explicitly distinguish CoP9 from LPC + WDF + DDS per §27.6 route distinction.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts`: no existing redirects for "cop9" or "contractual-disclosure" slugs. No middleware edit on initial launch.

---

## Authority links worth considering (Stage 2 populated; session selects 6-8)

**HMRC publications:**
- CoP9 publication landing: https://www.gov.uk/government/publications/cop9-hmrc-investigations-where-we-suspect-tax-fraud
- HMRC Code of Practice 9 (2014) document — verify current edition at write time
- CC/FS9 (CDF factsheet — verify exists at write time)

**Statutory (limited — CoP9 operates by HMRC undertaking, not statute):**
- FA 2007 s.29 (civil evasion penalty — context for fraud-investigation cases): https://www.legislation.gov.uk/ukpga/2007/3/section/29
- TMA 1970 s.36(1A) (deliberate 20-year time limit — operative for fraud cases): https://www.legislation.gov.uk/ukpga/1970/9/section/36
- Criminal Finances Act 2017 (corporate failure-to-prevent-tax-evasion — adjacent context; verify relevance at write time)

**HMRC manuals:**
- EM6000+ (Enquiry Manual on civil investigation of fraud): https://www.gov.uk/hmrc-internal-manuals/enquiry-manual/em6000
- FIS (Fraud Investigation Service) Operational Manual — partially published; verify at write time

**Case law (verify at write time):**
- Cases on CDF immunity revocation — most are unreported FTT; verify operative authorities at write time

**Cross-references in house_positions.md:** §27.5 (primary anchor — CoP9 / CDF mechanics); §27.6 (route distinction — CoP9 vs WDF vs LPC vs DDS); §27.9 (do-not-write list — CoP9 not landlord-friendly).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** (i) Verify CoP9 current edition via gov.uk at write time (CoP9 (2014) republished editorially — confirm no major rewrite has issued); (ii) confirm 60-day acceptance window verbatim (HMRC publication); (iii) confirm immunity scope language — "for matters disclosed only" + "false statements revoke" verbatim; (iv) check if Criminal Finances Act 2017 has any newer cross-references relevant to CDF.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots.
- Practical, specific. Cite HMRC publication anchors carefully.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer.
- `<aside>` styled by global CSS.
- Lead-form role segments: Individual landlord / Portfolio owner / Large portfolio / Property developer.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the 60-day acceptance window walk (high-intent: reader has just received a CoP9 letter and is on the clock)
  - After the HMRC-initiated vs taxpayer-initiated distinction (reader considering voluntary CDF request)
  - **CRITICAL framing:** CTAs must position firm as referrer to specialist counsel, NOT direct-handle CoP9 representation
- Vary opening; do NOT lead with "Code of Practice 9 is HMRC's...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12.

### Cannibalisation
- B6 (LPC) and B7 (WDF) cover the voluntary-disclosure routes. B3 must explicitly distinguish per §27.6 — CoP9 = HMRC-initiated fraud track; LPC + WDF + DDS = taxpayer-initiated voluntary routes.
- Avoid framing CoP9 as a landlord-friendly alternative to LPC. This is a §27.9 do-not-write item.

### House positions
- §27.5 is the primary anchor.
- §27.6 route-distinction is critical for the page positioning.
- §27.9 do-not-write list: "CoP9 is a landlord-friendly voluntary-disclosure route" forbidden.

### Quality bar
- Word count: 2,500-3,200 (slightly tighter than B1/B8 — CoP9 is specialist territory the page signposts not exhausts).
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Framing differentiator is the HMRC-initiated-fraud-track depth + specialist-referral positioning. Write to it.
- Vary opening.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `house_positions.md` once. §27.5 primary; §27.6 + §27.9 adjacent.
2. Claim in `wave7_page_tracker.md`, todo → in_progress + UTC.
3. Read brief.
4. Fetch competitor URLs (httpx + BS4).
5. Read closest existing pages.
6. Plan write.
7. Verify factual claims; **per §16.35: re-verify current CoP9 edition via gov.uk; verify 60-day window; verify immunity scope language**.
8. Fetch Pexels hero image.
9. Write markdown at `Property/web/content/blog/<slug>.md` with full frontmatter.
10. Build: `cd Property/web && npm run build`.
11. Verify six checks.
12. No middleware edit on initial launch.
13. Register in `monitored_pages`.
14. Commit on branch (BEFORE marking done; do NOT include tracker file).
15. Fill work-log below.
16. Mark done in tracker with 1-line Notes.
17. Append flags.
18. Log discoveries.
19. Next page.

## Session-side watcher pattern

Spawn Monitor on Q&A file; keep working while waiting.

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

### Flags raised to wave7_site_wide_flags.md
- 

### 2-3 sentence summary
