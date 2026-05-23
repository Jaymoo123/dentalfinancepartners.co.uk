# Wave 5 brief: cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics

**Site:** property
**Bucket:** C (Form 17 + joint ownership + spouse-mechanics)
**Session:** C
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics

---

## Manager pre-decisions

- **Suggested slug:** `cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics`
- **Suggested category:** `capital-gains-tax`
- **Bucket:** C (Form 17 + joint ownership + spouse-mechanics)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> CGT Private Residence Relief (PRR) on a jointly-owned main residence: TCGA 1992 s.222-226. Each owner claims relief on their share of the gain. Two cross-mechanism interactions are the load-bearing content for this page: (i) **TCGA 1992 s.222(5) main-residence nomination election** — where the couple owns two or more residences, a joint election nominates which one is the main residence; the election must be in writing and signed by both spouses, can be backdated to within 2 years of acquisition of the second residence; (ii) **TCGA 1992 s.222(6) one-residence-per-couple rule** — spouses / civil partners living together can have only ONE main residence between them for PPR purposes (the rule that distinguishes spouses from cohabitees, who can each have their OWN main residence). The page also threads the **trap on Form 17 + PPR election interaction**: a Form 17 75/25 income split changes neither spouse's PPR status (PPR follows actual residence, not beneficial share). Distinct from `cgt-property-transfer-spouse` (s.58 inter-spouse transfer mechanic) by being the PRR-on-disposal page. Distinct from `cgt-main-residence-election-two-properties` (existing PRA election applied to two residences) by being the joint-ownership-and-relief mechanic.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** High-search-volume CGT scenario; complements existing PRA + spouse-transfer pages.

**HOUSE_POSITION_CONFLICT signal context:** §24.5 PPR sub-section (s.222(5) election + s.222(6) one-residence rule) is the load-bearing threading. Locked 2026-05-23.

---

## Competitor URLs (Stage 2 populated + URL liveness verified 2026-05-23 per §16.31)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, worked-example density on PRR calc, treatment of the s.222(5) joint election.

- https://www.alexander-ene.co.uk/principal-private-residence-relief.htm — verified live 2026-05-23 (200). Strongest competitor piece on PPR.
- https://www.alexander-ene.co.uk/main-residence-relief.htm — verified live 2026-05-23 (200). Sibling within alexander-ene set.
- https://www.alexander-ene.co.uk/cgt-on-jointly-owned-property.htm — verified live 2026-05-23 (200). Direct topical match.
- https://www.uklandlordtax.co.uk/principal-private-residence-relief/ — verified live 2026-05-23 (200). Useful for FAQ phrasing.
- https://www.gov.uk/government/publications/private-residence-relief-hs283-self-assessment-helpsheet — authority reference (HS283 helpsheet); verified live 2026-05-23 (200).

**Borrowable patterns:** alexander-ene has the strongest PPR coverage; uklandlordtax for reader-friendly FAQ phrasing. Differentiator: we thread §24.5 cross-mechanism explicitly (Form 17 doesn't change PPR; s.222(6) one-residence rule for spouses; s.222(5) nomination + 2-year window).

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "PPR jointly owned property", "main residence election spouses", "CGT joint owners home".*

---

## Closest existing pages

- `cgt-property-transfer-spouse` (category: `capital-gains-tax`) — s.58 inter-spouse no-gain-no-loss. C7 forward-links as the spouse-transfer companion.
- `cgt-main-residence-election-two-properties` (category: `capital-gains-tax`) — PRA election applied to two residences. C7's s.222(5) section forward-links as the deeper election applied page.
- `principal-private-residence-relief-landlords` (category: `capital-gains-tax`) — PRR pillar. C7 forward-links as the pillar.
- `ppr-relief-calculation-former-home-step-by-step` (category: `capital-gains-tax`) — PRR calc walkthrough. Cross-link.
- C1 `form-17-declaration-beneficial-interest-property-mechanics-filing-revocation` (Wave 5 sibling) — Form 17 mechanic. C7 forward-links from the "Form 17 doesn't change PPR" section.

**Cannibalisation discipline:**
- C7 is the PRR-on-joint-ownership page. Existing PRA + PRR pillar pages are the pillar / two-residence applied pages. C7's role: the joint-ownership + s.222(5) joint election + s.222(6) one-residence-rule mechanic.
- Avoid duplicating the worked PRR calc verbatim from the existing helpsheet pages; use a different persona + figures (Patel £950k joint disposal with 5-year letting interlude).

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts`: no old-slug redirect overlap. No middleware edit required.

---

## Authority links worth considering (Stage 2 populated 2026-05-23, session selects 5-8)

**Statutory:**
- TCGA 1992 s.222 (main residence; sub-s.222(5) election; sub-s.222(6) one-residence-per-couple): https://www.legislation.gov.uk/ukpga/1992/12/section/222
- TCGA 1992 s.223 (PRR amount).
- TCGA 1992 s.225 (occupation requirements).
- TCGA 1992 s.58 (spouse no-gain-no-loss on inter-spouse transfer): https://www.legislation.gov.uk/ukpga/1992/12/section/58
- TCGA 1992 s.17 (market-value disposal for non-spouses).

**HMRC manuals + guidance:**
- HMRC CG64200+ (PPR manual page series; entry point CG64200): https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg64200
- HMRC HS283 (PPR self-assessment helpsheet): https://www.gov.uk/government/publications/private-residence-relief-hs283-self-assessment-helpsheet
- HMRC CG64485 (election under s.222(5)): https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg64485
- HMRC CG64950 (one residence per spouse / civil-partner couple, s.222(6)): https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg64950

**Cross-references in house_positions.md:** §24.5 PPR sub-section (s.222(5) election + s.222(6) one-residence rule + Form 17 doesn't change PPR + unmarried-co-owner contrast: each can have own main residence), §24.4 (s.58 no-gain-no-loss), §5 (CGT pillar).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify every numeric tax figure against current gov.uk at write time per §16.35. Particular care: CGT rates (18%/24% on residential from April 2024), CGT annual exempt amount (£3,000 from April 2024).

### Voice
- **No em-dashes.** Practical, specific. Anonymised personas.

### Lead-gen architecture
- LeadForm auto-injected. Never duplicate.
- `<aside>` styled by global CSS; no classes.

### CTA placement guidance (per this page)
- 1-3 inline `<aside>` CTAs. Conversion moments:
  - After the first worked PRR calc
  - After the s.222(5) election + 2-year window section
  - At end of "Form 17 doesn't change PPR" section
- Avoid: opening with an aside; aside inside a worked example; >3 total.

### Schema
- FAQs in frontmatter (10-14). Template auto-emits FAQPage JSON-LD.

### Cannibalisation
- Read existing PRR pages before writing; differentiate by being the joint-ownership-and-relief mechanic.

### House positions
- **§24.5 PPR sub-section is your primary working detail.** Thread s.222(5) + s.222(6) + Form 17 contrast + unmarried-co-owner contrast.

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
5. Read closest existing pages.
6. Plan the write.
7. Verify factual claims per §16.35.
8. Fetch hero image from Pexels.
9. Write markdown file at `Property/web/content/blog/<slug>.md`.
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
- **Final slug:** cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics (as briefed)
- **Final category:** capital-gains-tax (as briefed)
- **H1 chosen:** "Private Residence Relief and Joint Ownership: The Spousal Election and the One-Residence Rule"
- **Meta title chosen:** "PRR on Joint-Owned Property: Spouses' Election and Rules" (56 chars)
- **Why these vs other options:** Lead H1 with "Private Residence Relief" (the named relief that competitor pages search for) + "Joint Ownership" + the two structural rules that distinguish the page (the s.222(5) election + s.222(6) one-residence rule). MetaTitle compresses to "PRR" to stay under 62.

### Competitor URLs fetched / not fetched
- alexander-ene.co.uk URLs: NOT fetched per F-5 URL_ROT pattern (forward note from C5).
- ukpropertyaccountants.co.uk + uklandlordtax.co.uk: previously fetched in C1; same coverage already absorbed.
- HMRC HS283 helpsheet: confirmed at write time as the authority source.

### Existing-page review
- cgt-property-transfer-spouse (existing on main): re-read; C7 forward-links as the s.58 inter-spouse mechanic.
- cgt-main-residence-election-two-properties (existing on main): forward-link from the s.222(5) section as the deeper election-applied page.
- principal-private-residence-relief-landlords (existing on main): forward-link as the PRR pillar.
- ppr-relief-calculation-former-home-step-by-step (existing on main): forward-link from the worked example.
- C1 (same branch): forward-link from the Form 17 / PRR section as the Form 17 mechanic page.
- C6 (same branch): forward-link from the unmarried-co-owner section.
- C3 (same branch): forward-link from the s.58 base-cost shift section as the declaration of trust mechanic.

### Citations added
- TCGA 1992 s.222: https://www.legislation.gov.uk/ukpga/1992/12/section/222
- TCGA 1992 s.223: https://www.legislation.gov.uk/ukpga/1992/12/section/223
- TCGA 1992 s.58: https://www.legislation.gov.uk/ukpga/1992/12/section/58
- TCGA 1992 s.225B: https://www.legislation.gov.uk/ukpga/1992/12/section/225B
- HMRC CG64485 (s.222(5) election): https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg64485

### Internal links added
- /blog/capital-gains-tax/principal-private-residence-relief-landlords
- /blog/capital-gains-tax/cgt-main-residence-election-two-properties
- /blog/capital-gains-tax/ppr-relief-calculation-former-home-step-by-step
- /blog/capital-gains-tax/cgt-property-transfer-spouse
- /blog/landlord-tax-essentials/form-17-declaration-beneficial-interest-property-mechanics-filing-revocation (C1)
- /blog/landlord-tax-essentials/declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17 (C3)
- /blog/landlord-tax-essentials/unmarried-co-owners-property-tax-rental-income-split-actual-beneficial-share (C6)

### Inline CTA placements
- After the s.222(6) section / before Hartley + Singh worked example (high-intent for couples considering an s.222(5) nomination)
- After the s.58 base-cost shift section (high-intent for disposal planning)
- Total asides: 2 (under the 3 max; chose 2 not 3 because the page is dense with mechanics and adding a third would compete with the FAQ-conversion path)

### Verification
- em-dash count: 0
- en-dash count: 0
- Tailwind class= in body: 0
- metaTitle: 56 / 62
- metaDescription: 151 / 158
- FAQs: 14 / 10-14
- Body words: 2,611 / 2,500-3,500 (extended s.225B section by ~150 words to clear the 2,500 floor)
- External authority links: 5 (within 5-8)
- Internal links: 7 of 7 resolve
- monitored_pages registered: id 204

### Per-write verification (§16.35)
- TCGA 1992 s.222(5) (2-year window + joint-signing for couples): verified against legislation.gov.uk at write time on 2026-05-23.
- TCGA 1992 s.222(6) (one-residence-per-couple "so long as living together"): verified against legislation.gov.uk at write time on 2026-05-23.
- CGT residential rates 18% / 24% for 2026/27: verified against gov.uk at write time (higher rate reduced from 28% to 24% with effect from 6 April 2024).
- CGT annual exempt amount £3,000 for 2026/27: confirmed against gov.uk at write time.
- Final-9-months PRR deeming under s.223(2)(a): verified.
- Letting relief abolished from 6 April 2020 except shared occupation: verified against gov.uk at write time.
- FA (No. 2) 2023 s.225B widening (6 April 2023 in-force date): consistent with the prior s.58 verification from C5.

### Build attempts
- Attempt 1: PASS. 448 static pages built. No build warnings.

### Flags raised
- None.

### 2-3 sentence summary
C7 is the PRR-on-joint-ownership applied page. Threads the per-owner relief computation, the s.222(5) election + 2-year window + joint signature rule, the s.222(6) one-residence-per-couple rule (and the unmarried-co-owner contrast), the Form 17 / PRR independence, the s.58 inter-spouse base-cost shift route, and the s.225B post-separation extension widened by Finance (No. 2) 2023. Hartley + Singh worked example walks the £950k joint disposal with 5-yr letting interlude including the post-2020 abolition of letting relief.

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
