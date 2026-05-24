# Wave 7 brief: hmrc-nudge-letter-response-playbook-landlords-property-income

**Site:** property
**Bucket:** B (HMRC enquiry + tax compliance ops)
**Pick:** B5 — HMRC nudge letter response playbook — PIM2010+ landlord cohort
**Brief type:** Net-new page
**Source markdown path on launch:** `Property/web/content/blog/hmrc-nudge-letter-response-playbook-landlords-property-income.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/hmrc-nudge-letter-response-playbook-landlords-property-income

---

## Frontmatter header

- **Slug:** `hmrc-nudge-letter-response-playbook-landlords-property-income`
- **Bucket:** B
- **Section ID:** §27 cluster (cross-cuts §27.1 + §27.6)
- **Framing differentiator (~50 words):** HMRC nudge-letter campaign on property income (PIM2010+ context; rising volume 2023-2026 driven by DAC7 platform reporting + Land Registry + tenancy deposit scheme data) — risk-assessment of the recipient cohort, four response options (do nothing, voluntary disclosure via LPC, await enquiry, engage proactively), trade-off against enquiry-opening risk. Pre-enquiry behavioural-prompt distinguished from formal s.9A enquiry opening. NOT writing LPC mechanics (B6) or formal enquiry response (B2/B4).
- **Locked HP anchors:**
  - §27.1 (discovery time limits — underlying liability the nudge addresses)
  - §27.6 (voluntary disclosure routes including LPC)
  - §27.8 (firm-positioning hooks)
- **monitored_pages stub:** Register at launch; primary monitored queries include "HMRC nudge letter property income", "HMRC nudge letter rental", "HMRC letter unreported rental", "nudge letter landlord response", "DAC7 nudge letter landlord".

---

## Manager pre-decisions

- **Suggested slug:** `hmrc-nudge-letter-response-playbook-landlords-property-income`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** B
- **Framing differentiator (Stage 2, 2026-05-24):**

> Nudge letters are HMRC's pre-enquiry behavioural-prompt mechanism — soft letters informing the recipient that HMRC has information suggesting they may have undeclared property income, inviting voluntary review and disclosure. They are NOT formal s.9A enquiries (which require statutory time-window discipline). The page is the response-playbook reference for the rising 2024-2026 cohort driven by (a) DAC7 platform-reporting (Airbnb, booking.com, Vrbo reporting overseas-platform UK-resident host data to HMRC from 1 January 2024), (b) Land Registry property-ownership cross-matching, (c) tenancy deposit scheme data, (d) Section 18 + Section 28 Finance Act 2011 third-party information notices. Three readers in scope: (i) landlord with letter in hand and no current accountant; (ii) landlord with letter and historic informal lettings (lodger / Airbnb / family rental); (iii) landlord with letter where rental IS declared but a separate concern (capital gain, foreign rental, prior years). Page walks four response options with trade-offs: (1) **do nothing** — risk: nudge letter is HMRC's last warning before opening a formal enquiry; doing nothing where there IS undeclared income exposes you to prompted-disclosure penalty floors (15% careless / 35% deliberate-not-concealed minimum under Sch 24 — see B8) instead of unprompted floors (0% / 20%); (2) **voluntary disclosure via Let Property Campaign** — the recommended route where undeclared rental income exists (LPC mechanics at B6); operates within Sch 41 framework; the letter is functionally a prompt, so disclosure within nudge-letter response window typically still secures unprompted floors per HMRC operational practice (verify at write time); (3) **await enquiry** — risk: aggressively pursued by HMRC for cases where nudge letter is ignored; default to (2) over (3) for any undeclared-income case; (4) **engage proactively with HMRC** — write back confirming review undertaken with no undeclared income identified, providing supporting position; effective where rental IS correctly declared and letter is fishing or system-generated. Critical framing: **DO NOT advise non-engagement** as a stock answer. The nudge letter has identified the recipient via HMRC data-matching; non-response is recorded and shapes the next escalation step. The page is a forward-link source for B6 (LPC) and B7 (WDF) for offshore-flavoured nudge letters.

**Stage 1 manager note:** Page is **operationally pre-enquiry** — distinct from B2 (closure notice) and B4 (FTT). It sits in the §27.6 voluntary-disclosure architecture. **B5 ships after B8** (penalty matrix is referenced in nudge-letter response trade-offs) and **after B6** (LPC mechanics referenced as response option 2) ideally — but if B5 ships before B6, mark B6 reference as TODO forward-link.

**Pool-thinness disclosure:** Specialist tax-disputes firms cover nudge letters; landlord-flavoured at moderate depth. Defensible differentiation point: the four-response-option matrix with explicit penalty-floor trade-off (most competitor pages stop at "consider voluntary disclosure" without the unprompted-vs-prompted floor mechanic). DAC7 cohort overlay is newer (DAC7 reporting began 1 January 2024 for 2023 period; rising HMRC nudge-letter volume 2025 onwards) — territory-novelty point.

---

## Competitor URLs (Stage 2 populated; sessions verify liveness per §16.31 at write time)

**Fetch + read + extract instruction:** Standard httpx + BS4. Extract treatment of (a) DAC7 / Airbnb-platform-reporting nudge cohort; (b) four response options framework (most use 2-3); (c) prompted-vs-unprompted disclosure-floor mechanic; (d) "do nothing" framing — most pages weakly advise against it without specifying the penalty-floor consequence.

- https://www.ukpropertyaccountants.co.uk/hmrc-nudge-letter-rental-income/ — mid-market specialist.
- https://www.uklandlordtax.co.uk/hmrc-nudge-letter-response-landlord/ — landlord-flavoured.
- https://www.landlordstax.co.uk/property-income-nudge-letter/ — landlord-specialist.

**Borrowable patterns:** Most landlord-specialist pages cover the "should I respond" question well but skip the penalty-floor mechanic — defensible differentiation point.

---

## GSC data

*Net-new page. Primary topical queries expected: "HMRC nudge letter property income", "received HMRC letter rental income", "DAC7 HMRC landlord", "nudge letter response landlord", "HMRC suspect undeclared rental".*

---

## Closest existing pages (cannibalisation context)

- `sa105-property-income-form-2026-complete-guide` (0.27 — adjacent SA105 filing)
- `2027-property-income-tax-rates-landlords-uk` (0.25 — adjacent rates)
- `rental-income-tax-uk-complete-guide-landlords` (0.22 — adjacent general rental)

**Cannibalisation discipline:**
- No on-site duplication; B5 is the canonical nudge-letter-response page.
- Distinguish from `sa105-property-income-form-2026-complete-guide` (filing) — B5 is the post-filing-failure mitigation response.
- B6 (LPC) is the deep-dive on voluntary disclosure; B5 references LPC as response option 2.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts`: no existing redirects for "nudge-letter" slugs. No middleware edit on initial launch.

---

## Authority links worth considering (Stage 2 populated; session selects 6-8)

**HMRC publications:**
- PIM (Property Income Manual) landing: https://www.gov.uk/hmrc-internal-manuals/property-income-manual
- Let Property Campaign landing: https://www.gov.uk/guidance/let-property-campaign
- HMRC information notices framework (third-party data — Finance Act 2011 Sch 23): https://www.legislation.gov.uk/ukpga/2011/11/schedule/23
- DAC7 implementing regulations — verify SI at write time (Platform Operators (Due Diligence and Reporting Requirements) Regulations 2023; SI 2023/817)

**Statutory:**
- TMA 1970 s.7 (notification of chargeability — for Sch 41 failure-to-notify exposure): https://www.legislation.gov.uk/ukpga/1970/9/section/7
- TMA 1970 s.9A (enquiry power — the next-step risk): https://www.legislation.gov.uk/ukpga/1970/9/section/9A

**HMRC manuals:**
- CH150000+ (Compliance Handbook on disclosure mitigation — unprompted vs prompted floors): https://www.gov.uk/hmrc-internal-manuals/compliance-handbook/ch150000

**Cross-references in house_positions.md:** §27.1 (discovery time limits); §27.6 (voluntary disclosure routes); §27.8 (firm-positioning hooks); §27.2 (Sch 24 penalty floors).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** (i) Verify nudge-letter campaign volume still active at write time (HMRC operational — could shift); (ii) check for any new 2024-2026 nudge-letter cohort announcements (DAC7, foreign-property, FHL post-abolition); (iii) verify SI 2023/817 DAC7 SI title + number; (iv) verify unprompted-vs-prompted penalty-floor distinction per Sch 24 paras 9-10 and Sch 41 para 13.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots.
- Practical, specific. Reader-facing — many recipients are first-time landlord-defendants.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer.
- `<aside>` styled by global CSS.
- Lead-form role segments: Individual landlord / Portfolio owner / Large portfolio / Property developer.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the four-response-options matrix (high-intent: reader has just identified their response track)
  - After the "do nothing" risk framing (reader needs help engaging quickly)
  - Optionally after the LPC route walk (reader needs LPC representation)
- Vary opening; do NOT lead with "If you have received an HMRC nudge letter...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12.

### Cannibalisation
- B6 (LPC) covers voluntary-disclosure mechanics; B5 references but does not re-cover.
- B8 covers penalty bands; B5 cross-references for the unprompted-vs-prompted floor mechanic.

### House positions
- §27.6 is the primary anchor (voluntary-disclosure routes including LPC).
- §27.1 secondary (discovery time limits — underlying liability framing).
- §27.8 firm-positioning hooks for the CTAs.

### Quality bar
- Word count: 2,500-3,200.
- FAQs: 10-12.
- New external authority links: 5-7.
- Build clean.
- All six verifications.

### Anti-templating
- Framing differentiator is the four-response-option matrix + penalty-floor trade-off depth + DAC7 cohort overlay. Write to it.
- Vary opening.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `house_positions.md` once. §27.6 primary; §27.1 + §27.2 + §27.8 adjacent.
2. Claim in `wave7_page_tracker.md`, todo → in_progress + UTC.
3. Read brief.
4. Fetch competitor URLs (httpx + BS4).
5. Read closest existing pages.
6. Plan write.
7. Verify factual claims; **per §16.35: re-verify DAC7 SI title + number; verify any new 2024-2026 nudge-letter cohort announcements; verify penalty-floor distinction per Sch 24 + Sch 41**.
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
