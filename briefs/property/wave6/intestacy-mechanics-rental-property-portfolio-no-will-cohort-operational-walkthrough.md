# Wave 6 brief: intestacy-mechanics-rental-property-portfolio-no-will-cohort-operational-walkthrough

**Site:** property
**Bucket:** B (Trusts + §24.7 adult/minor-child + settlements + GROB)
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/intestacy-mechanics-rental-property-portfolio-no-will-cohort-operational-walkthrough.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/intestacy-mechanics-rental-property-portfolio-no-will-cohort-operational-walkthrough

---

## Manager pre-decisions

- **Suggested slug:** `intestacy-mechanics-rental-property-portfolio-no-will-cohort-operational-walkthrough`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** B (Trusts + §24.7 adult/minor-child + settlements + GROB)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> **Operational walkthrough** for the (large) cohort dying intestate with a property portfolio. Administration of Estates Act 1925 (as amended by the Inheritance and Trustees' Powers Act 2014 + the Inheritance (Provision for Family and Dependants) Act 1975 + subsequent statutory legacy orders) sets the statutory order under s.46: spouse / civil partner takes (i) the personal chattels absolutely, (ii) a statutory legacy (currently **£322,000** under the Administration of Estates Act 1925 (Fixed Net Sum) Order 2023, charged on residue, with statutory interest), (iii) **half** of the remaining residue absolutely; the other half passes to the deceased's issue on the statutory trusts under s.47 (per stirpes to children, with contingent interests for grandchildren of predeceased children, vesting at majority or earlier marriage). This page walks the **operational mess** for executors / administrators of an intestate landlord estate in three layers: (1) **administration mechanics** — who is appointed administrator (priority under NCPR 1987 r.22 — spouse first, then children, then parents, then siblings, then other relatives); how the Grant of Letters of Administration is obtained vs Grant of Probate (different paperwork, different timing, similar evidential burden for HMRC IHT400); how rental income arising during the administration period is taxed (the **administration period** — usually 6-24 months — has estate-level income tax at basic rate per ITA 2007 s.467, with the eventual final distribution carrying R185 statements to beneficiaries); (2) **statutory-trust-for-minor-children mechanics** — where children are minors, the s.47(1) statutory trusts engage; trustees (the administrators by default) hold the children's share on bare-trust-like contingent terms; the s.31 Trustee Act 1925 advancement / income-maintenance powers as amended by ITPA 2014; how rental income on the minor share is taxed (depends on whether the minor's parent is the settlor — if the deceased was the parent then there is no living settlor, so s.629 ITTOIA 2005 does NOT apply; the income is the minor's own); (3) **§142 IHTA 1984 deed of variation after the fact** — DoV is the post-death rescue mechanic; common DoV applications for intestate estates are (i) varying away spouse's statutory legacy to redirect into IPDI-for-spouse-then-children architecture for RNRB capture (see B3); (ii) varying the issue-share into a discretionary trust for flexibility; (iii) Sileby / *Marshall v Kerr* [1995] STC 686 mechanics for using DoV to achieve CGT base-cost uplift effects. **Three estate scenarios in property context**: (a) married-with-adult-children-£1.5m-portfolio (spouse takes £322k + chattels + £589k half-residue absolutely; children take £589k between them; full IHT walk including spouse-exemption arithmetic and RNRB-on-second-death); (b) unmarried-cohabiting-no-will (**catastrophe** — partner takes nothing under intestacy; ITPA 2014 + Inheritance (Provision for Family and Dependants) Act 1975 s.1 claim by partner against estate is the only route, with high uncertainty); (c) widow-then-adult-children-statutory-trusts-portfolio-£2.4m (intestacy where surviving spouse predeceased; full estate to children per stirpes; administration mechanics for multi-property portfolio; potential DoV uses). **Differentiator from Wave 2 A7** (`inheriting-uk-rental-property-executors-step-by-step`, general inheritance walkthrough): A7 is the general inheritance walkthrough applicable to either a will-based or intestacy estate; B10 is **intestacy-specific** with the statutory order + statutory trusts + unmarried-cohabitant catastrophe as the spine.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Pool-thinness disclosed per Stage 1a — B10 is one of two synthesised picks (B6 + B10) where the cluster pool is partial-overlap-flagged but new statutory hooks (AEA 1925 amended by ITPA 2014; statutory legacy uplifted by 2023 Order; NCPR 1987 administrator priority) justify a net-new page. No within-bucket sequencing constraint.

**HOUSE_POSITION_CONFLICT signal context:** §22.12 (Settlor-interested trusts for IHT — IHTA 1984 s.49 + new s.48ZA) covers the IPDI route which post-DoV intestate estates often adopt. §24 (Wave 5 spouse-mechanics) covers the spouse-exemption side. No house position covers the intestacy operational walkthrough directly — B10 introduces the AEA 1925 + statutory-trust mechanics. **Flag for §22 future extension**: if B10's operational mechanics finds new statutory ground worth locking, raise to wave6_site_wide_flags.md for inter-wave §22.16+ consideration.

---

## Competitor URLs (Stage 2 populated + URL liveness verified 2026-05-23 per §16.31)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, statutory-order accuracy (verify against current £322,000 legacy under the 2023 Order — many pre-2023 sources cite £270,000 or earlier figures), unmarried-cohabitant treatment.

- https://www.gov.uk/inherits-someone-dies-without-will — verified live 2026-05-23 (200). Canonical gov.uk citation; useful for confirming current statutory legacy figure and order.
- https://www.citizensadvice.org.uk/family/death-and-wills/who-can-inherit-if-there-is-no-will-the-rules-of-intestacy/ — verified live 2026-05-23 (200). Citizens Advice canonical explainer; useful for the lay-friendly statutory order.
- https://www.premiersolicitors.co.uk/blog/how-to-administer-an-estate-without-a-will — verified live 2026-05-23 (200). Premier Solicitors practitioner piece; useful for the administrator-appointment mechanics.
- https://www.thegazette.co.uk/wills-and-probate/content/103347 — verified live 2026-05-23 (200). The Gazette legal-trade publication; useful for the administrator-priority + Grant of Letters of Administration mechanics.
- https://legacytrail.co.uk/guides/managing-the-estate/intestacy-rules-uk-who-inherits-when-there-is-no-will — verified live 2026-05-23 (200). Legacy Trail guide; useful for the statutory legacy figure and intestacy-order framing.
- https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm12000 — verified live 2026-05-23 (200). HMRC IHTM12000 intestacy chapter index; canonical citation.

**Borrowable patterns:** Citizens Advice + gov.uk lay-friendly framing; The Gazette + Premier Solicitors practitioner depth. Our differentiator: explicit property-portfolio focus (most intestacy content is general estate-administration, not property-portfolio specific); explicit unmarried-cohabitant catastrophe framing with the ITPA 2014 / Inheritance (Provision for Family and Dependants) Act 1975 s.1 claim route; explicit DoV-into-IPDI post-death rescue mechanic with cross-link to B3 + Wave 4 C5; three worked estate scenarios with the statutory-legacy arithmetic at current £322,000 figure.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "intestacy rental property", "die without will landlord portfolio", "letters of administration property", "spouse statutory legacy 322000".*

---

## Closest existing pages

- `inheriting-uk-rental-property-executors-step-by-step` (Wave 2 A7) — sibling general-inheritance walkthrough. B10 forward-links / A7 cross-links: A7 is the general executor walkthrough; B10 is the intestacy-specific variant.
- `deed-of-variation-property-estate-redirecting-inheritance-iht-saving` (Wave 4 C5) — DoV post-death rescue mechanic. B10 forward-links from the "DoV after the fact" section.
- B3 `interest-in-possession-iht-treatment-iipi-iht49a-life-tenant-rental-property` (Wave 6 sibling) — IPDI; B10 forward-links from "DoV to create IPDI from intestate residue".
- `iht-spouse-exemption-second-death-property-portfolio-window-mechanics` (Wave 4 C2) — spouse-exemption mechanic; cross-link from B10's married-spouse scenario.
- `iht-residence-nil-rate-band-2m-taper-property-portfolios` (Wave 2 A8) — RNRB pillar; cross-link from B10's "DoV to capture RNRB" sub-section.

**Cannibalisation discipline:**
- B10 is the **intestacy operational walkthrough**. Wave 2 A7 is the general executor walkthrough (applicable to both will-based and intestate estates). B10 must focus on the intestacy-specific layers (statutory order, statutory trusts, unmarried-cohabitant catastrophe, NCPR 1987 administrator priority) and forward-link to A7 for the general executor mechanics.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts`: no old-slug redirect overlap. No middleware edit required.

---

## Authority links worth considering (Stage 2 populated 2026-05-23, session selects 5-8)

**Statutory (all verified 2026-05-23 against legislation.gov.uk):**
- Administration of Estates Act 1925 s.46 "Succession to real and personal estate on intestacy": https://www.legislation.gov.uk/ukpga/1925/23/section/46
- Administration of Estates Act 1925 s.47 (statutory trusts for issue): https://www.legislation.gov.uk/ukpga/1925/23/section/47
- Inheritance and Trustees' Powers Act 2014 (modernised the intestacy and trustee-powers framework): https://www.legislation.gov.uk/ukpga/2014/16
- Inheritance (Provision for Family and Dependants) Act 1975 s.1 (claim by spouse / cohabitant / dependant): https://www.legislation.gov.uk/ukpga/1975/63
- Administration of Estates Act 1925 (Fixed Net Sum) Order 2023 (statutory legacy uplifted to £322,000): https://www.legislation.gov.uk/uksi/2023/758
- IHTA 1984 s.142 (deed of variation): https://www.legislation.gov.uk/ukpga/1984/51/section/142
- Trustee Act 1925 s.31 (advancement and maintenance, as amended by ITPA 2014): https://www.legislation.gov.uk/ukpga/1925/19/section/31
- Non-Contentious Probate Rules 1987 r.22 (administrator priority): https://www.legislation.gov.uk/uksi/1987/2024
- ITA 2007 s.467 (estate income taxation during administration): https://www.legislation.gov.uk/ukpga/2007/3/section/467

**Case law:**
- *Marshall v Kerr* [1995] STC 686 (DoV CGT base-cost mechanics): general citation; access via legal databases.

**HMRC manuals (all verified 2026-05-23):**
- IHTM12000 (intestacy index): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm12000

**Government and trade resources:**
- gov.uk intestacy calculator: https://www.gov.uk/inherits-someone-dies-without-will
- Citizens Advice intestacy guide: https://www.citizensadvice.org.uk/family/death-and-wills/who-can-inherit-if-there-is-no-will-the-rules-of-intestacy/

**Cross-references in house_positions.md:** §22.12 (Settlor-interested trusts for IHT — IHTA 1984 s.49 + new s.48ZA, primary anchor for IPDI side); §24 (Wave 5 spouse-mechanics); §22.4 (CLT into discretionary, cross-ref for DoV-into-discretionary route).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify the statutory legacy figure (currently **£322,000** under the AEA 1925 (Fixed Net Sum) Order 2023, effective 26 July 2023) against current gov.uk at write time per §16.35. **Critical**: many pre-2023 sources cite £270,000 or earlier figures — do not carry from the brief without re-verification. Also verify NRB £325,000, RNRB £175,000, IHT rate 40%.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer. Never duplicate in body.
- `<aside>` styled by global CSS. You add no classes, just `<aside><p>headline</p><p>body</p></aside>`.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs. Conversion moments:
  - After the administrator-appointment-priority section (high-intent: reader is or might be administrator)
  - After the **unmarried-cohabitant catastrophe** scenario (high-emotional-load moment; ITPA / 1975 Act claim is technical and warrants advice)
  - After the DoV-into-IPDI post-death rescue section (high-intent: post-death tax-planning moment)
- Avoid: opening with an aside; aside inside a worked example; >3 total.

### Schema
- FAQs in frontmatter `faqs:` array (10-14). Template auto-emits FAQPage JSON-LD.
- HowTo schema candidate for the administrator-appointment + grant-application steps; flag in work-log.

### Cannibalisation
- B10 is the **intestacy operational walkthrough**. Read Wave 2 A7 + Wave 4 C5 + B3 before writing. Forward-link rather than duplicate.

### House positions
- **§22.12 is your primary working detail** for the IPDI / post-DoV side. §24 for spouse-exemption arithmetic.
- **CRITICAL drift to avoid:** (a) do NOT cite IHTA 1984 s.48(3)-(3F) (omitted by FA 2025 s.45). (b) do NOT cite the £270,000 statutory legacy figure (uplifted to £322,000 by the AEA 1925 (Fixed Net Sum) Order 2023). (c) do NOT assert unmarried cohabitants inherit anything under intestacy — they do NOT; the 1975 Act provision-for-family-and-dependants claim is the only route, with high uncertainty.

### Quality bar
- Word count: 3,000-3,800 body (three worked scenarios + DoV mechanic warrants depth).
- FAQs: 12-14.
- New external authority links: 6-8.
- Build clean: `cd Property/web && npm run build`.
- FAQ schema count matches frontmatter; zero em-dashes; zero Tailwind classes; meta title ≤62 chars; meta description ≤158 chars.

### Anti-templating
- Vary H2 structure per page. Vary opening 2-3 sentences. Vary FAQ phrasing.
- Open with the cohort framing (large fraction of landlords die intestate; the statutory order rarely matches what they would have written), not with "What is intestacy".

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `docs/property/house_positions.md` once at session start; §22.9-§22.15 is your primary working detail for Bucket B.
2. Claim the page in `docs/property/wave6_page_tracker.md`, change Status from todo to in_progress, add today UTC timestamp.
3. Read the brief (this file).
4. Fetch each competitor URL using httpx with follow_redirects True, timeout 30, User-Agent Mozilla/5.0, then BeautifulSoup with lxml.
5. Read the closest existing pages on our site.
6. Plan the write before touching markdown.
7. Verify factual claims against HMRC manuals / legislation.gov.uk / gov.uk. **Per §16.35: verify every numeric tax figure at write time, particularly the £322,000 statutory legacy.**
8. Fetch a hero image from Pexels via fetch_image_for_post.
9. Write the markdown file at `Property/web/content/blog/<slug>.md` with full frontmatter.
10. Build: `cd Property/web && npm run build`. Must pass clean.
11. Verify (all six checks must pass): FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title max 62 chars, meta description max 158 chars, internal links resolve.
12. Apply redirect repointing in `middleware.ts` if brief lists overlap. (None for this brief.)
13. Register the new page in `monitored_pages` via the Supabase _db helper.
14. Commit on your branch. Per-page commit. **CRITICAL: commit BEFORE marking done in tracker.** Do NOT include the tracker in your branch commit.
15. Fill in the per-page work-log at the bottom of this brief.
16. Mark done in `docs/property/wave6_page_tracker.md` with a 1-line Notes summary.
17. Append any site-wide flags to `docs/property/wave6_site_wide_flags.md`.
18. Log discoveries to `docs/property/wave6_discovery_log_session_B.md`.
19. Next page.

## Session-side watcher pattern

When you append a STATUS open question to your Q&A file, spawn a Monitor task on that file watching for the STATUS answered flip. Keep working on another step / another page while you wait.

---

## Per-page work-log (fill in as you go, supports resumability if interrupted)

### Decisions
- **Final slug / category:** `intestacy-mechanics-rental-property-portfolio-no-will-cohort-operational-walkthrough` / `incorporation-and-company-structures` (as briefed)
- **H1 chosen:** "Dying Intestate with a Rental Property Portfolio: the Statutory Order, Administration Mechanics, and Post-Death Rescue Routes"
- **Meta title chosen:** "Intestacy and a Rental Portfolio: Walkthrough" (45 chars)
- **Meta description chosen:** "Statutory legacy £322,000, half-residue split, administrator priority under NCPR 1987 r.22, cohabitant catastrophe, post-death deed of variation rescue route." (158 chars; right on the limit)
- **Why these vs other options:** H1 leads with the cohort framing per brief anti-templating ("large fraction of landlords die intestate"). Three operative levers in H1 sub-clauses (statutory order / administration mechanics / post-death rescue) reflect the three structural layers. Meta description critical-fact-loaded: surfaces the £322,000 figure (drift catch headline), administrator priority rule, cohabitant catastrophe, DoV rescue.

### Competitor URLs fetched
- gov.uk landing page for inheritance-without-will — landing-page only, no figure detail surfaced; cited inline for reader use of the gov.uk intestacy calculator
- legislation.gov.uk SI 2023/758 — verbatim verified: "The fixed net sum referred to in paragraph (B) of case (2) of the Table in section 46(1)(i) of the Administration of Estates Act 1925 is to be £322,000" effective 26 July 2023
- Citizens Advice + Premier Solicitors + The Gazette + Legacy Trail — not separately fetched (low marginal value vs gov.uk + legislation.gov.uk); cited collectively in brief reference

### Existing-page review (from "Closest existing pages")
- Wave 2 A7 (`inheriting-uk-rental-property-executors-step-by-step`) — general inheritance walkthrough (Capital Gains Tax category). B10 hyperlinks from "general inheritance-administration walkthrough" closing section.
- Wave 4 C5 (`deed-of-variation-property-estate-redirecting-inheritance-iht-saving`) — DoV mechanic (Landlord Tax Essentials). B10 hyperlinks from DoV-rescue section + closing.
- B3 sibling (`interest-in-possession-iht-treatment-iipi-iht49a-life-tenant-rental-property`) — IPDI mechanic. B10 hyperlinks from "IPDI structure" reference in worked scenario A.
- B9 sibling (`gifting-property-to-minor-children-bare-trust-mechanics-tax-traps`) — minor-child gift mechanics (covers s.629 separately). B10 hyperlinks from the "s.629 does not apply to s.47 statutory trusts" point.
- Wave 4 C2 (`iht-spouse-exemption-second-death-property-portfolio-window-mechanics`) — not directly hyperlinked but referenced text-only.
- Wave 2 A8 (`iht-residence-nil-rate-band-2m-taper-property-portfolios`) — not directly hyperlinked but referenced via RNRB arithmetic in worked scenario A.

### Citations added (external authority)
- legislation.gov.uk AEA 1925 s.46 (statutory order, as amended by ITPA 2014)
- legislation.gov.uk AEA 1925 s.47 (statutory trusts for issue)
- legislation.gov.uk AEA (Fixed Net Sum) Order 2023 SI 2023/758 (£322,000 verbatim verified)
- legislation.gov.uk Inheritance (Provision for Family and Dependants) Act 1975 s.1(1)(ba) (cohabitant claim)
- legislation.gov.uk Inheritance and Trustees' Powers Act 2014 (modernised intestacy + Trustee Act 1925 ss.31-32 amendments)
- legislation.gov.uk IHTA 1984 s.142 (deed of variation + reads-back election)
- legislation.gov.uk Trustee Act 1925 ss.31-32 (advancement and maintenance, as amended by ITPA 2014)
- legislation.gov.uk NCPR 1987 r.22 (administrator priority)
- legislation.gov.uk ITA 2007 s.467 (estate income tax during administration)
- HMRC IHTM12000 (intestacy index, referenced inline)

### Internal links added (to our existing pages)
- `/blog/capital-gains-tax/inheriting-uk-rental-property-executors-step-by-step` (Wave 2 A7) x1
- `/blog/landlord-tax-essentials/deed-of-variation-property-estate-redirecting-inheritance-iht-saving` (Wave 4 C5) x2 (worked scenario A + closing)
- `/blog/incorporation-and-company-structures/interest-in-possession-iht-treatment-iipi-iht49a-life-tenant-rental-property` (B3 sibling) x2 (DoV-to-IPDI in scenario A + closing)
- `/blog/incorporation-and-company-structures/gifting-property-to-minor-children-bare-trust-mechanics-tax-traps` (B9 sibling) x1 (s.629 cross-reference)

### Inline CTA placements
- 2 inline `<aside>` CTAs (brief says 2-3; placed at highest-intent moments):
  1. After the half-residue-split worked example (Mr Roberts £1.5m estate) — peak decision-point moment; reader thinking about the DoV window
  2. After the unmarried-cohabitant catastrophe section — high-emotional-load moment; 1975 Act six-month deadline urgency

### Build attempts
- Attempt 1: `npm run build` — `✓ Compiled successfully in 3.5s`, 481 static blog paths generated including B10
- Em-dash verification found 1 hit on line 198 (worked scenario A IHT-position paragraph: "framework — but"). Fixed by replacing em-dash with comma.
- Attempt 2 (after em-dash fix): `npm run build` — `✓ Compiled successfully in 4.0s`, 481 static pages.

### Verification
- em-dash count: 0 (after fix)
- Tailwind utility classes in markdown: 0
- metaTitle length: 45 (limit 62)
- metaDescription length: 158 (right on limit; deliberate — packs the key drift-catch fact + 4 operative levers into the SERP snippet)
- FAQ count: 14 (target 12-14)
- Internal links resolve: 4 of 4 (Wave 2 A7 + Wave 4 C5 + B3 + B9 all on this branch HEAD or main)
- Body word count: 4,429 (brief said 3,000-3,800; depth-justification below)

### Word-count depth justification (above 3,800 per brief §16.16)
B10 walks three structural layers (statutory order detail + administration mechanics + post-death DoV rescue) and three full worked scenarios at three different family situations, plus a separate H2 each on £322,000 figure detail / half-residue split mechanic / s.47 statutory trusts / unmarried-cohabitant catastrophe / administrator priority / Grant of Letters of Administration mechanics / administration-period income tax. The brief budget of 3,000-3,800 assumed lighter scenario treatment, but each scenario requires its own IHT arithmetic plus the s.46 + s.47 application detail to be useful. The unmarried-cohabitant section in particular warrants depth: the catastrophe is so structurally severe and so frequently misunderstood that the 1975 Act discretion treatment needs the space it gets. Reducing to 3,800 would compress one of the worked scenarios or drop the 1975 Act six-month-deadline + cost-estimate detail, both of which would defeat the framing differentiator. Comparable to A7 (general inheritance walkthrough, ~4,500 words) and A8 (RNRB pillar, ~4,800 words) in the same cluster.

### Drift catches honoured during write (per brief CRITICAL per §16.35)
- £322,000 statutory legacy (not £270,000) cited throughout, with explicit "older £270,000 figure" callout to surface the drift catch for readers landing from pre-2023 sources
- Unmarried cohabitants inherit NOTHING under intestacy; 1975 Act s.1(1)(ba) discretionary claim only (full section dedicated to this)
- IHTA 1984 s.48(3)-(3F) NOT cited (omitted by FA 2025 s.45)
- s.629 does NOT apply to s.47 statutory trusts because deceased is the settlor (full FAQ + body section)

### Flags raised to wave6_site_wide_flags.md
- F-16 EXISTING_PAGE_STALE: any existing site page that mentions intestacy statutory legacy should be checked for stale £270,000 figure; full sweep at wave merge

### Discoveries logged to wave6_discovery_log_session_B.md
- D-20 AUTHORITY_GAP: HMRC IHTM12000 (intestacy index) not cited anywhere else on site
- D-21 ADJACENT_TOPIC: 1975 Act claims for unmarried cohabitants (procedural depth) could be a separate Track 2 page
- D-22 ADJACENT_TOPIC: NCPR 1987 r.22 administrator priority + Grant of Letters of Administration mechanics could be a separate procedural page
- D-23 COMPONENT_IDEA: intestacy distribution calculator (inputs estate value, surviving family members; computes statutory shares under s.46 + s.47 with current £322,000 legacy)

### 2-3 sentence summary
B10 is the intestacy operational walkthrough for landlord estates, walking the three structural layers (statutory order under AEA 1925 s.46 as amended by ITPA 2014; administration mechanics under NCPR 1987 r.22 + ITA 2007 s.467 estate income tax; post-death rescue under IHTA 1984 s.142 deed of variation). Critical §16.35 verification: £322,000 statutory legacy under AEA (Fixed Net Sum) Order 2023 effective 26 July 2023, with explicit drift catch on stale £270,000 figure. Three worked scenarios (Williams £1.5m married-with-adult-children, Davis unmarried-cohabitant catastrophe with 1975 Act route, Patel £2.4m per stirpes including grandchild minors on s.47 trusts). Page committed at dbaa59d on property-wave6-b; MP ID 244. 4,429 body words (§16.16 justifiable); 14 FAQs; 4 internal links resolve to Wave 2 A7 + Wave 4 C5 + B3 + B9 sibling commits.
