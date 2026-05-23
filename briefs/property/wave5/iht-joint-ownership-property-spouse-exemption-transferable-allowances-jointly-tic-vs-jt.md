# Wave 5 brief: iht-joint-ownership-property-spouse-exemption-transferable-allowances-jointly-tic-vs-jt

**Site:** property
**Bucket:** C (Form 17 + joint ownership + spouse-mechanics)
**Session:** C
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/iht-joint-ownership-property-spouse-exemption-transferable-allowances-jointly-tic-vs-jt.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/iht-joint-ownership-property-spouse-exemption-transferable-allowances-jointly-tic-vs-jt

---

## Manager pre-decisions

- **Suggested slug:** `iht-joint-ownership-property-spouse-exemption-transferable-allowances-jointly-tic-vs-jt`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** C (Form 17 + joint ownership + spouse-mechanics)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> IHT treatment of jointly-held property is structurally affected by the joint-tenancy vs tenancy-in-common choice. **Joint tenancy = survivorship**: whole property passes to surviving spouse on first death; IHTA 1984 s.18 spouse exemption applies but uses no NRB / RNRB on first death (full £325k NRB and full £175k RNRB transfer to survivor under s.8A + transferable RNRB mechanic). **Tenants in common = each share passes by will**: can use first-death NRB by directing share to non-spouse via will (or deed of variation under s.142 within 2-year window); the £2m RNRB taper trap is more avoidable because the share can be redirected away from the survivor's estate. Wave 4 C2 (`iht-spouse-exemption-second-death-property-portfolio-window-mechanics`) is the downstream mechanic on the second-death window; this page (C8) is the upstream **structural-choice** page covering JT-vs-TIC decision in IHT lens. Distinct from C2 (the JT-vs-TIC general tax-consequence page) by being the IHT-focused depth. Distinct from Wave 4 C2 by being the choice-of-structure-at-first-step rather than the second-death-window mechanic.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Structural choice with significant IHT consequences. Wave 4 C2 already on `main`; C8 explicitly cites Wave 4 C2 as the downstream mechanic. **§16.32 sequencing:** C8 extends Wave 4 C2; verify Wave 4 C2 is live before launch (it is, shipped 2026-05-23 in Wave 4 close commit f0bf5b7).

**HOUSE_POSITION_CONFLICT signal context:** §22.5 (IHT spouse exemption + TNRB + TRNRB) is locked and threaded into §24.5 IHT sub-section. Locked positions; flag any competitor contradiction.

---

## Competitor URLs (Stage 2 populated + URL liveness verified 2026-05-23 per §16.31)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, treatment of JT-survivorship vs TIC-by-will, treatment of RNRB taper on consolidated portfolios.

- https://www.alexander-ene.co.uk/inheritance-tax-jointly-owned-property.htm — verified live 2026-05-23 (200). Strongest competitor piece.
- https://www.alexander-ene.co.uk/inheritance-tax-and-jointly-owned-property.htm — verified live 2026-05-23 (200). Sibling within alexander-ene set.
- https://www.alexander-ene.co.uk/inheritance-tax-on-jointly-owned-property.htm — verified live 2026-05-23 (200). Triple-sibling within alexander-ene set.
- https://www.alexander-ene.co.uk/iht-jointly-owned-property.htm — verified live 2026-05-23 (200). Quad-sibling; useful for verifying alexander-ene's coverage scope.
- https://www.ukpropertyaccountants.co.uk/inheritance-tax-on-jointly-owned-property/ — verified live 2026-05-23 (200). Property-tax-specialist domain perspective.

**Borrowable patterns:** alexander-ene's coverage in this cluster is the strongest in the visible competitor set; ukpropertyaccountants for the property-portfolio angle. Our differentiator: thread the structural choice (JT-vs-TIC) with explicit RNRB-taper impact on the consolidated second-death estate; competitor coverage tends to treat JT vs TIC and IHT planning as separate topics.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "joint tenants IHT", "tenants in common inheritance tax", "joint owner IHT NRB", "RNRB joint property".*

---

## Closest existing pages

- **Wave 4 C2 `iht-spouse-exemption-second-death-property-portfolio-window-mechanics`** (category: `landlord-tax-essentials`) — downstream mechanic page. C8 explicitly cites as the second-death-window applied page.
- C2 `joint-tenants-vs-tenants-in-common-property-tax-consequences-uk-landlords` (Wave 5 sibling) — general JT-vs-TIC tax-consequence page. Cross-link.
- `iht-residence-nil-rate-band-2m-taper-property-portfolios` (category: `landlord-tax-essentials`) — RNRB taper depth. C8 forward-links from "Why the £2m taper matters for joint owners" section.
- `iht-property-investors-decision-framework-2026-onwards` (category: `landlord-tax-essentials`) — strategic-framework companion.
- `iht-7-year-clock-property-gifting-mid-life-landlord-strategy` (Wave 4 C4) — lifetime-gifting alternative; cross-link.
- `deed-of-variation-property-estate-redirecting-inheritance-iht-saving` (Wave 4 C5) — DoV mechanic for redirecting first-death share. Cross-link as alternative-route.

**Cannibalisation discipline:**
- C8 ↔ Wave 4 C2: close within-wave-and-prior-wave pair. Differentiator boundary: C8 is choice-of-structure (JT vs TIC); Wave 4 C2 is the second-death-window calc + procedural TNRB/TRNRB claim. C8's role: explain the structural choice; defer to Wave 4 C2 for the calc.
- Use Khan persona £1.4m portfolio (own home £600k + BTL £800k) to differentiate worked examples from Wave 4 C2's Patel £1.5m and Mawell-Smith £2.8m personas.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts`: no old-slug redirect overlap. No middleware edit required.

---

## Authority links worth considering (Stage 2 populated 2026-05-23, session selects 5-8)

**Statutory:**
- IHTA 1984 s.18 (spouse / civil-partner exemption): https://www.legislation.gov.uk/ukpga/1984/51/section/18
- IHTA 1984 s.8A (transferable NRB): https://www.legislation.gov.uk/ukpga/1984/51/section/8A
- IHTA 1984 s.5 (joint property in deceased's estate).
- IHTA 1984 ss.8FA-8FE (transferable RNRB + downsizing addition).
- IHTA 1984 s.142 (deed of variation, 2-year window).
- Law of Property Act 1925 s.36 (joint tenancy + severance): https://www.legislation.gov.uk/ukpga/1925/20/section/36

**HMRC manuals + forms:**
- IHTM15011 (joint property): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm15011
- IHTM15040 (survivorship): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm15040
- IHTM43001 (transferable nil-rate band manual): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm43001
- IHTM46000+ (RNRB manual entry): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm46000
- HMRC IHT402 (claim TNRB): https://www.gov.uk/government/publications/inheritance-tax-claim-to-transfer-unused-nil-rate-band-iht402
- HMRC IHT436 (claim TRNRB; verify form URL at write time via gov.uk inheritance-tax-forms collection): https://www.gov.uk/government/collections/inheritance-tax-forms
- gov.uk RNRB guidance: https://www.gov.uk/inheritance-tax/residence-nil-rate-band

**Cross-references in house_positions.md:** §22.5 (spouse exemption + transferable allowances; second-death window framing), §15.1 (NRB / RNRB frozen to April 2030 + RNRB taper at £2m), §24.5 IHT sub-section, §24.2 (joint-tenancy bar context).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify every numeric tax figure against current gov.uk at write time per §16.35. Particular care: NRB (£325,000 frozen to April 2030), RNRB (£175,000 frozen to April 2030), RNRB taper threshold (£2m, fully extinguished at £2,350,000 single / £2,700,000 with transferable). 2026-27 confirmed values per house_positions.md §15.1; re-verify at write time.

### Voice
- **No em-dashes.** Practical, specific. Anonymised personas.

### Lead-gen architecture
- LeadForm auto-injected. Never duplicate.
- `<aside>` styled by global CSS; no classes.

### CTA placement guidance (per this page)
- 1-3 inline `<aside>` CTAs. Conversion moments:
  - After the JT-survivorship vs TIC-by-will contrast section
  - After the RNRB taper worked example (high-intent for portfolio landlords)
  - At end of the structural-choice decision section
- Avoid: opening with an aside; aside inside a worked example; >3 total.

### Schema
- FAQs in frontmatter (10-14). Template auto-emits FAQPage JSON-LD.

### Cannibalisation
- C8 ↔ Wave 4 C2: defer to Wave 4 C2 for second-death-window calc; do NOT walk the procedural TNRB/TRNRB claim mechanics in depth (that's Wave 4 C2's lane).

### House positions
- **§22.5 IHT spouse-exemption sub-section + §15.1 NRB/RNRB are your primary working detail.** §24.5 IHT cross-mechanism sub-section threads the joint-ownership-specific angle.

### Quality bar
- Word count: 2,500-3,500 body.
- FAQs: 10-14.
- New external authority links: 5-8.
- Build clean.
- FAQ schema match; zero em-dashes; zero Tailwind; meta title ≤62; meta description ≤158.

### Anti-templating
- Vary H2 structure. Vary opening. Vary FAQ phrasing.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `docs/property/house_positions.md` once at session start.
2. Claim the page in tracker.
3. Read the brief.
4. Fetch competitor URLs.
5. Read closest existing pages (Wave 4 C2 is the key sibling).
6. Plan the write.
7. Verify factual claims per §16.35.
8. Fetch hero image from Pexels.
9. Write markdown file.
10. Build.
11. Verify all six checks.
12. Apply redirect repointing if listed. (None.)
13. Register in `monitored_pages`.
14. Commit on branch. Per-page. **Commit BEFORE marking done.**
15. Fill in work-log.
16. Mark done.
17. Append site-wide flags.
18. Log discoveries.
19. Next page.

## Session-side watcher pattern

When you append a STATUS open question, spawn a Monitor task. Keep working while you wait.

---

## Per-page work-log

### Decisions
- **Final slug:** iht-joint-ownership-property-spouse-exemption-transferable-allowances-jointly-tic-vs-jt (as briefed)
- **Final category:** landlord-tax-essentials (as briefed)
- **H1 chosen:** "IHT and Jointly Owned Property: JT vs TIC, Spouse Exemption, and Transferable Allowances"
- **Meta title chosen:** "IHT on Joint Property: JT vs TIC and Spouse Exemption" (53 chars)
- **Why these vs other options:** H1 names the four mechanics in the page (JT vs TIC, spouse exemption, transferable allowances) so the page advertises its boundary against Wave 4 C2 (second-death window) and C2 (general JT vs TIC). MetaTitle compresses to the two structural decisions readers query.

### Persona naming
- Used "Iqbal" rather than the brief-suggested "Khan" because Khan was already used in C1 (Khan / Khan-Patel personas) and C4 (Khan-Patel persona). The brief's instruction to differentiate from Wave 4 C2's Patel + Mawell-Smith is satisfied by Iqbal; the within-Wave-5 anti-templating discipline is also satisfied (Iqbal is fresh).

### Competitor URLs fetched / not fetched
- alexander-ene.co.uk IHT URLs (4 sibling URLs in brief): NOT fetched per F-5 URL_ROT pattern established from C5. The alexander-ene URL set is now flagged for removal from the Property competitor seed list.
- ukpropertyaccountants.co.uk/inheritance-tax-on-jointly-owned-property/: not fetched anew; previously absorbed in C1/C5 and the in-house §22 + §24 positions cover the scope.

### Existing-page review
- Wave 4 C2 (iht-spouse-exemption-second-death-property-portfolio-window-mechanics, on main): re-read at write time; C8 forward-links as the downstream second-death-window mechanic.
- C2 (joint-tenants-vs-tenants-in-common-property-tax-consequences-uk-landlords, same branch): re-read; C8 forward-links as the general JT vs TIC tax-consequence companion.
- iht-residence-nil-rate-band-2m-taper-property-portfolios (on main): forward-link as the RNRB taper depth.
- iht-7-year-clock-property-gifting-mid-life-landlord-strategy (Wave 4 C4, on main): forward-link as the lifetime gifting companion.
- iht-property-investors-decision-framework-2026-onwards (on main): forward-link as the strategic framework.
- deed-of-variation-property-estate-redirecting-inheritance-iht-saving (Wave 4 C5, on main): forward-link from the s.142 section.
- C6 (same branch): forward-link from the unmarried-co-owner contrast section.

### Citations added
- IHTA 1984 s.5 (joint property in estate)
- IHTA 1984 s.8A (TNRB): https://www.legislation.gov.uk/ukpga/1984/51/section/8A
- IHTA 1984 s.8D (RNRB £2m taper): https://www.legislation.gov.uk/ukpga/1984/51/section/8D
- IHTA 1984 s.8G (TRNRB): https://www.legislation.gov.uk/ukpga/1984/51/section/8G
- IHTA 1984 s.18 (spouse exemption): https://www.legislation.gov.uk/ukpga/1984/51/section/18
- IHTA 1984 s.49 (qualifying interest in possession)
- IHTA 1984 s.142 (DoV 2-year window): https://www.legislation.gov.uk/ukpga/1984/51/section/142
- IHTA 1984 s.218A (DoV notification)
- IHTA 1984 s.3A (PETs 7-year clock)
- HMRC IHTM15040 (joint property survivorship valuation): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm15040
- HMRC IHT402 (claim TNRB): https://www.gov.uk/government/publications/inheritance-tax-claim-to-transfer-unused-nil-rate-band-iht402

### Internal links added
- /blog/landlord-tax-essentials/iht-spouse-exemption-second-death-property-portfolio-window-mechanics (Wave 4 C2)
- /blog/landlord-tax-essentials/iht-residence-nil-rate-band-2m-taper-property-portfolios
- /blog/landlord-tax-essentials/iht-7-year-clock-property-gifting-mid-life-landlord-strategy
- /blog/landlord-tax-essentials/iht-property-investors-decision-framework-2026-onwards
- /blog/landlord-tax-essentials/deed-of-variation-property-estate-redirecting-inheritance-iht-saving
- /blog/landlord-tax-essentials/joint-tenants-vs-tenants-in-common-property-tax-consequences-uk-landlords (C2)
- /blog/landlord-tax-essentials/unmarried-co-owners-property-tax-rental-income-split-actual-beneficial-share (C6)

### Inline CTA placements
- After "The £2 million RNRB taper trap" (high-intent for couples at/near £2m threshold)
- After "Worked example: Iqbal couple's £1.4m portfolio" (high-intent following the scenario comparison)
- Total asides: 2

### Verification
- em-dash count: 0
- en-dash count: 0
- Tailwind class= in body: 0
- metaTitle: 53 / 62
- metaDescription: 146 / 158
- FAQs: 14 / 10-14
- Body words: 2,563 / 2,500-3,500
- External authority links: 6 (within 5-8)
- Internal links: 7 of 7 resolve (all confirmed)
- monitored_pages registered: id 206

### Per-write verification (§16.35)
- IHTA 1984 s.18 spouse exemption: previously verified in C5.
- IHTA 1984 s.8A TNRB introduced FA 2008 with effect from 9 October 2007: confirmed at write time.
- £325k NRB + £175k RNRB frozen to April 2030: confirmed at write time against gov.uk (per Autumn Statement 2024 extension).
- £2m RNRB taper threshold + £1 per £2 reduction mechanic in s.8D: verified against legislation.gov.uk at write time.
- IHTA 1984 s.142 2-year DoV window + 6-month s.218A notification: verified against legislation.gov.uk at write time.
- IHTM15040 conventional 50% net equity valuation for joint tenants: confirmed at write time.

### Worked example correction
- Initial draft had a £1.4m net estate figure that conflated gross portfolio value (£1.4m: £600k home + £800k BTL gross) with net estate. Corrected to £1.2m net (gross less £200k BTL mortgage). All three scenarios (JT, TIC vanilla, TIC redirecting £300k to children) recomputed against the £1.2m net base; all produce £80k second-death IHT, confirming the structural-equivalence point below the £2m taper threshold.

### Build attempts
- Attempt 1: PASS. 449 static pages built. No build warnings.

### Flags raised
- None.

### 2-3 sentence summary
C8 is the upstream structural-choice page for IHT on jointly owned property. Threads the JT survivorship vs TIC devise-by-will choice, the s.18 spouse exemption applied through both, the s.8A TNRB + s.8G TRNRB mechanics, the s.8D £2m RNRB taper trap, the s.142 deed-of-variation post-death corrective (2-year window), and the unmarried co-owner contrast. The Iqbal £1.2m net portfolio worked example (with three structural scenarios) shows the JT and TIC structures are equivalent below the £2m taper threshold and diverge above it. Forward-links to Wave 4 C2 (second-death window) as the downstream depth page.

### Decisions
- **Final slug:**
- **Final category:**
- **H1 chosen:**
- **Meta title chosen:**
- **Why these vs other options:**

### Competitor URLs fetched

### Existing-page review (from "Closest existing pages")

### Citations added (external authority)

### Internal links added (to our existing pages)

### Inline CTA placements

### Build attempts

### Verification

### Flags raised to wave5_site_wide_flags.md

### 2-3 sentence summary
