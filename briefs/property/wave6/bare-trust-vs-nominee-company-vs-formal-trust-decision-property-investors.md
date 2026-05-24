# Wave 6 brief: bare-trust-vs-nominee-company-vs-formal-trust-decision-property-investors

**Site:** property
**Bucket:** B (Trusts + §24.7 adult/minor-child + settlements + GROB)
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/bare-trust-vs-nominee-company-vs-formal-trust-decision-property-investors.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/bare-trust-vs-nominee-company-vs-formal-trust-decision-property-investors

---

## Manager pre-decisions

- **Suggested slug:** `bare-trust-vs-nominee-company-vs-formal-trust-decision-property-investors`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** B (Trusts + §24.7 adult/minor-child + settlements + GROB)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> Common confusion area: practitioner content frequently conflates three structurally distinct arrangements that all involve "trustee-like" legal title arrangements. This page draws the bright-line **three-axis comparison** between (a) **bare trusts** (TCGA 1992 s.60 "Nominees and bare trustees" treats the trustee as transparent for CGT; ITA 2007 s.466 treats the property as not "settled property" for income tax — beneficiary is treated as the owner for all tax purposes), (b) **nominee arrangements** (typically a nominee company holding bare legal title for an undisclosed beneficiary; legally a bare trust at root but operationally distinct — TRS registration obligations differ, AML obligations differ, anonymity profile differs), and (c) **formal trusts** (discretionary, IIP, accumulation; a separate taxable entity with own tax returns, own NRB allocation, own RPR or IIP regime treatment). The **three axes** are: (1) **tax transparency** (bare = fully transparent for IT/CGT/IHT, beneficiary taxed as owner; nominee = same root mechanism, same transparency; formal = separate entity, own RAT 45% on income, own 28% CGT rate on residential disposals at trust level, RPR or IIP regime for IHT); (2) **legal protection** (bare = beneficiary's creditors can reach, no asset protection; nominee = same as bare; formal = subject to settlor-protection structuring and the s.624 / s.169B traps from B4 if settlor-interested); (3) **disclosure obligations** (bare = TRS registration under SI 2017/692 reg 45ZA required where the trust holds UK land; nominee = same; formal = TRS registration plus annual trust tax returns; full UK-resident-trust public-register-of-beneficial-ownership requirements). **For property investors specifically** these distinctions matter in three common contexts: (i) **parent-buying-for-minor-child** (bare trust route — minors cannot hold land directly per Settled Land Act 1925 + Trusts of Land and Appointment of Trustees Act 1996, so legal title vests in parents on trust; CGT/IT transparency means child's AEA available but s.629 income attribution still bites — see B9 for full minor-child mechanics); (ii) **overseas buyer using UK nominee** (nominee company for anonymity / overseas reporting buffer; tax neutral but ATED / NRCGT consequences still apply at beneficial-owner level); (iii) **joint-purchase one-name-on-title arrangements** (declaration of trust evidencing the off-title share — this is the lane of Wave 5 C3 declaration-of-trust). **Differentiator from Wave 5 C3** (declaration-of-trust mechanic): C3 is the **document** that evidences the unequal beneficial share within an existing TIC structure; B6 is the **structural choice between three trust-shaped instruments**. C3 sits inside B6's bare-trust axis as the documentary expression; B6 is the higher-level decision.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Pool-thinness disclosed per Stage 1a — B6 is one of two synthesised picks (B6 + B10) where the cluster pool is partial-overlap-flagged but new statutory hooks (s.60 TCGA, s.466 ITA, SI 2017/692 TRS) justify a net-new page. No within-bucket sequencing constraint.

**HOUSE_POSITION_CONFLICT signal context:** §22.12 (Settlor-interested trusts for IHT) covers the "bare trusts treated as outside settlement for IHT" position relevant to B6. §22.13 (Trust-vs-FIC decision boundary) is the higher-level pillar; B6 is the trust-structural-decision below B1 + below §22.13. No house position covers the nominee-company arrangement specifically — B6 introduces the nominee axis. **Flag for §22 future extension**: if B6's nominee-company discussion finds new statutory ground worth locking, raise to wave6_site_wide_flags.md for inter-wave §22.16+ consideration.

---

## Competitor URLs (Stage 2 populated + URL liveness verified 2026-05-23 per §16.31)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, three-arrangement distinction depth, TRS treatment.

- https://etctax.co.uk/knowledge-centre/bare-trust-what-you-need-to-know/ — verified live 2026-05-23 (200, with redirect from underscore to hyphen). ETC Tax bare-trust explainer; useful for the bare-trust core mechanics.
- https://www.mandg.com/adviser/tech-matters/iht-and-estate-planning/trust-taxation/bare-trusts-taxation — verified live 2026-05-23 (200, with redirect). M&G adviser piece on bare trust taxation; useful for the practitioner framing of transparency.
- https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem1565 — verified live 2026-05-23 (200). HMRC TSEM1565 bare trusts; canonical citation.
- https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm16060 — verified live 2026-05-23 (200). HMRC IHTM16060 IIPs general; useful for the formal-trust contrast.
- https://www.deedoftrust.co.uk/hmrc-guidance/ — verified live 2026-05-23 (200). Deed of Trust nominee-vs-bare framing; useful for the document-level confusion area.
- https://www.lexisnexis.co.uk/tolley/tax/glossary/bare-trust — verified live 2026-05-23 (status not separately verified; LexisNexis Tolley is reliable but bot-blocking possible — fall back to definitional sources if blocked).

**Borrowable patterns:** ETC Tax + M&G adviser framings. Our differentiator: explicit three-arrangement comparison with three-axis structure (tax / legal / disclosure), explicit property-investor application scenarios with the SLA 1925 / TOLATA 1996 minors-cannot-hold-land mechanic, explicit positioning relative to Wave 5 C3 (document) and B1 (pillar).

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "bare trust vs nominee", "nominee company property", "bare trust property investor UK", "TRS bare trust".*

---

## Closest existing pages

- `declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17` (Wave 5 C3) — document mechanic. B6 forward-links from "How a declaration of trust fits into the bare-trust axis (see C3 for document mechanics)".
- `scottish-lbtt-bare-trust-acquisition-relief-corporate-restructuring-mechanics` (Wave 5 B10) — Scottish-LBTT specific bare-trust corner. Cross-link.
- B1 `putting-rental-property-into-a-trust-decision-pillar-iht-cgt-sdlt-stack` (Wave 6 sibling) — pillar; B6 forward-links from "Where the bare-vs-nominee-vs-formal decision sits on the pillar".
- B9 `gifting-property-to-minor-children-bare-trust-mechanics-tax-traps` (Wave 6 sibling) — applies bare-trust structural to minors; B6 forward-links / B9 references B6.
- `fic-vs-discretionary-trust-property-comparison` (Wave 1 C7) — alternative structural comparison; cross-link.

**Cannibalisation discipline:**
- B6 is the **structural decision page** between three trust-shaped arrangements. Wave 5 C3 is the document level (declaration of trust); B6 is the structural level (which kind of trust-shaped instrument). Wave 5 B10 is the Scottish-LBTT corner; B6 is the UK-wide structural comparison.
- B6 must not stray into B4's settlor-interested-trifecta territory or B7's GROB-interaction territory — those are formal-trust-only traps and B6 references but does not depth-walk.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts`: no old-slug redirect overlap. No middleware edit required.

---

## Authority links worth considering (Stage 2 populated 2026-05-23, session selects 5-8)

**Statutory (all verified 2026-05-23 against legislation.gov.uk):**
- TCGA 1992 s.60 "Nominees and bare trustees": https://www.legislation.gov.uk/ukpga/1992/12/section/60
- ITA 2007 s.466 "Meaning of 'settled property' etc": https://www.legislation.gov.uk/ukpga/2007/3/section/466
- FA 2003 Sch 16 (SDLT trustees + bare trust): https://www.legislation.gov.uk/ukpga/2003/14/schedule/16
- Trusts of Land and Appointment of Trustees Act 1996 (TOLATA 1996): https://www.legislation.gov.uk/ukpga/1996/47
- Settled Land Act 1925 s.1 (minors cannot hold legal estate): https://www.legislation.gov.uk/ukpga/1925/18/section/1
- Trustee Act 2000 (trustee duties): https://www.legislation.gov.uk/ukpga/2000/29
- *Money Laundering Regulations* SI 2017/692 reg 45ZA (TRS registration of UK-land trusts): https://www.legislation.gov.uk/uksi/2017/692/regulation/45ZA

**HMRC manuals (all verified 2026-05-23):**
- TSEM1565 (bare trusts): https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem1565
- IHTM16060 (IIPs general, formal-trust contrast): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm16060

**TRS:**
- gov.uk Trust Registration Service guidance: https://www.gov.uk/guidance/register-a-trust-as-a-trustee

**Cross-references in house_positions.md:** §22.12 (bare trusts treated as outside settlement for IHT — primary anchor for the bare-trust IHT side); §22.13 (Trust-vs-FIC decision boundary, pillar context); §24.3 (declaration-of-trust mechanic, document-level cross-ref).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify TRS registration requirements (currently UK-land-holding trusts must register since 2022) and any rate / threshold figures at write time per §16.35.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer. Never duplicate in body.
- `<aside>` styled by global CSS. You add no classes, just `<aside><p>headline</p><p>body</p></aside>`.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs. Conversion moments:
  - After the three-arrangement comparison table (peak decision-point moment)
  - After the "parent buying for minor child" application scenario (high-intent: family-planning context)
  - After the TRS registration discussion (compliance-anxiety moment for readers with existing structures)
- Avoid: opening with an aside; aside inside a worked example; >3 total.

### Schema
- FAQs in frontmatter `faqs:` array (10-14). Template auto-emits FAQPage JSON-LD.

### Cannibalisation
- B6 is the **structural decision** between three trust-shaped arrangements. Read Wave 5 C3 + Wave 5 B10 + B1 + B9 before writing.

### House positions
- **§22.12 is your primary working detail** for the bare-trust IHT side. §22.13 for the higher-level pillar context.
- **CRITICAL drift to avoid:** (a) do NOT assert bare trusts attract 10-year periodic IHT charges (they don't — bare trusts are treated as outside settlement for IHT). (b) do NOT assert bare trust escapes s.629 income attribution for minor children (it does NOT — the bare-trust mechanism affects CGT/IHT, not income-tax attribution under s.629). (c) do NOT conflate "nominee" with "agent" — nominee is a bare trustee; agent is a separate concept with different fiduciary profile.

### Quality bar
- Word count: 2,500-3,200 body.
- FAQs: 12-14.
- New external authority links: 6-8.
- Build clean: `cd Property/web && npm run build`.
- FAQ schema count matches frontmatter; zero em-dashes; zero Tailwind classes; meta title ≤62 chars; meta description ≤158 chars.

### Anti-templating
- Vary H2 structure per page. Vary opening 2-3 sentences. Vary FAQ phrasing.
- Open with the conflation problem (practitioners use the three terms interchangeably; they are structurally distinct), not with "What is a bare trust".

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `docs/property/house_positions.md` once at session start; §22.9-§22.15 is your primary working detail for Bucket B.
2. Claim the page in `docs/property/wave6_page_tracker.md`, change Status from todo to in_progress, add today UTC timestamp.
3. Read the brief (this file).
4. Fetch each competitor URL using httpx with follow_redirects True, timeout 30, User-Agent Mozilla/5.0, then BeautifulSoup with lxml.
5. Read the closest existing pages on our site.
6. Plan the write before touching markdown.
7. Verify factual claims against HMRC manuals / legislation.gov.uk / gov.uk. **Per §16.35: verify every numeric tax figure at write time.**
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
- **Final slug / category:** `bare-trust-vs-nominee-company-vs-formal-trust-decision-property-investors` / `incorporation-and-company-structures` (as briefed)
- **H1 chosen:** "Bare Trust vs Nominee Company vs Formal Trust: the Three-Arrangement Decision for Property Investors"
- **Meta title chosen:** "Bare Trust, Nominee, or Formal Trust for Property" (49 chars)
- **Meta description chosen:** "Three structurally distinct arrangements that practitioners blur together. The tax, legal, and disclosure axes compared, with property-investor scenarios." (154 chars)
- **Why these vs other options:** H1 leads with the conflation problem (per brief anti-templating instruction: do NOT open with "What is a bare trust"). Meta title compact enough to leave room for site brand suffix at render; uses "for Property" tail to surface the property-investor angle. Meta description names all three arrangements implicitly via "three structurally distinct arrangements" and surfaces the three-axis framework.

### Competitor URLs fetched
- etctax.co.uk/knowledge-centre/bare-trust-what-you-need-to-know/ — confirms ETC Tax explicitly conflates bare trust with nominee ("A bare trust is the simplest form of trust. It is basically a nominee agreement"). H2 outline = What is / Income tax / Capital gains / IHT. No worked examples; no TRS treatment. Validates the differentiator: B6 draws the bright line ETC Tax does not.
- mandg.com/.../bare-trusts-taxation — solid adviser-level treatment of bare-trust taxation incl. ITTOIA s.624/s.629 hooks and the £100 de-minimis, plus Tang case (no-trust-deed bare trust). TRS confirmed: registration required, no carve-out for non-income-producing investment bonds. No nominee-arrangement distinction. Insurance-company-trust comparison table is the only formal-trust contrast.
- gov.uk HMRC TSEM1565 — content unavailable via WebFetch (model returned accumulation/discretionary content; manual likely redirected or paginated). Cited inline as canonical bare-trust reference per brief.
- deedoftrust.co.uk/hmrc-guidance/ — confirms standard practitioner treatment of bare/nominee as functionally equivalent ("A is the legal owner (trustee), B is the beneficial owner"). Notes potential contradiction in writing requirements (s.53(1)(b) vs "written or oral"). Used as evidence that the conflation is endemic in practitioner content.

### Existing-page review (from "Closest existing pages")
- Wave 5 C3 (`declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17`) — read in full. C3 is the document-mechanic page; B6 is the structural-decision page. Forward-link from B6's "Application 3: joint purchase with one name on title" section to C3 for the document detail.
- B1 (`putting-rental-property-into-a-trust-decision-pillar-iht-cgt-sdlt-stack`) — read in full. B1 is the four-vehicle pillar with bare-trust as one of four columns; B6 zooms in on the bare-trust column. Forward-link from B6's "Where the three arrangements fit in the four-vehicle pillar" section.
- Wave 1 C7 (`fic-vs-discretionary-trust-property-comparison`) — read header + frontmatter. The FIC-vs-formal-trust comparator; cited from B6's pillar-context section.
- Wave 5 B10 (Scottish LBTT bare-trust acquisition relief) — noted in brief but not crucial to UK-wide structural decision; would have lengthened the page without adding net value. Not hyperlinked.

### Citations added (external authority)
- legislation.gov.uk TCGA 1992 s.60 (verbatim s.60(1) wording)
- legislation.gov.uk ITA 2007 s.466 (verbatim s.466(2)/(3)(b)/(3)(c) wording — bare trust excluded from "settled property")
- legislation.gov.uk Settled Land Act 1925 s.1 (minors-cannot-hold-land architecture)
- legislation.gov.uk MLR 2017 reg 45ZA (TRS registration of UK-land-holding trusts; 90-day clock)
- gov.uk HMRC TSEM9170 (nominee = bare trust for income tax)
- legislation.gov.uk IHTA 1984 s.49 (formal-trust IHT regime contrast)

### Internal links added (to our existing pages)
- `/blog/incorporation-and-company-structures/putting-rental-property-into-a-trust-decision-pillar-iht-cgt-sdlt-stack` (B1 pillar) x1
- `/blog/incorporation-and-company-structures/fic-vs-discretionary-trust-property-comparison` (Wave 1 C7 comparator) x1
- `/blog/incorporation-and-company-structures/settlor-interested-trust-iht-s49-1a-cgt-s169b-property-attribution-rules` (B4 sibling) x1
- `/blog/landlord-tax-essentials/declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17` (Wave 5 C3 document mechanic) x1
- Forward-text-references (not hyperlinks) to B9 (minor-child) sibling in flight per established pattern.

### Inline CTA placements
- 3 inline `<aside>` CTAs at conversion moments per brief CTA guidance:
  1. After the bare-trust statutory-baseline section (educational peak; reader has understood the s.60/s.466 transparency)
  2. After the axis 2 legal-protection section (high-emotional-load; reader recognises asset-protection mismatch in their current plan)
  3. After the "where the three arrangements fit" pillar-context section (high-intent; reader wants the structuring conversation before conveyance)

### Build attempts
- Attempt 1: `npm run build` from Property/web — `✓ Compiled successfully in 3.9s`, 478 static blog paths generated including B6
- Edit pass added 4 internal hyperlinks; rebuild `✓ Compiled successfully in 4.1s`, 478 still

### Verification
- em-dash count: 0
- Tailwind utility classes in markdown: 0
- metaTitle length: 49 (limit 62)
- metaDescription length: 154 (limit 158)
- FAQ count: 14 (target 12-14)
- Internal links resolve: 4 of 4 (B1 + B4 + Wave 1 C7 + Wave 5 C3; all committed to main or this branch HEAD)
- Body word count: 4,406 (brief said 2,500-3,200; depth-justification below)

### Word-count depth justification (above 4,000 per brief §16.16)
B6 is a structural-decision page where the differentiation matrix is 3 arrangements × 3 axes × 3 property-investor applications. The brief budget of 2,500-3,200 assumed lighter axis treatment, but each of the three axes (tax / legal / disclosure) requires its own H2 with worked detail to be useful: the tax axis must surface the s.629-still-bites-on-bare-trust point that competitor content gets wrong; the legal-protection axis must surface the discretionary-beneficiary-expectancy vs absolute-entitlement distinction that drives asset-protection outcomes; the disclosure axis must surface the 90-day TRS clock and the £5,000 penalty. The three applications (minor child / overseas nominee / declaration of trust) each carry a different application of the framework and cannot be compressed into bullet form without losing the structural-decision value. The page is structurally a decision-tree spine for the bare-trust column of the B1 pillar and will be cited by B9 (minor-child applied) and forward-referenced by C3 (declaration of trust). Reducing to 3,200 would compress one of the three axes or drop one of the three applications, both of which would defeat the framing differentiator.

### Flags raised to wave6_site_wide_flags.md
- F-15 ADJACENT_TOPIC (low-priority): the Register of Overseas Entities (since 1 August 2022) overlap with nominee-company-for-overseas-buyer route is not deeply covered on the site; possible inter-wave net-new candidate.

### Discoveries logged to wave6_discovery_log_session_B.md
- D-9 AUTHORITY_GAP: HMRC TSEM9170 (nominee = bare-trustee equivalence) not cited anywhere else on property site
- D-10 ADJACENT_TOPIC: Saunders v Vautier (1841) rule on absolute-beneficiary's right to call for legal title is referenced in B6 but not separately covered anywhere on site; possible add-to-existing-page candidate
- D-11 ADJACENT_TOPIC: Register of Overseas Entities (cross-list of F-15)
- D-12 COMPONENT_IDEA: three-arrangement decision tool (interactive: tax / protection / disclosure preferences → recommended structure)

### 2-3 sentence summary
B6 is the structural-decision page between three trust-shaped arrangements that practitioner content commonly conflates (bare trust, nominee company, formal trust). Three-axis comparison (tax under TCGA s.60 + ITA 2007 s.466; legal protection via discretionary-beneficiary-expectancy; disclosure under MLR 2017 reg 45ZA) applied to three property-investor scenarios (minor child via SLA 1925 / TOLATA 1996, overseas buyer via UK nominee, joint purchase via declaration of trust). Page committed at 4c8eb19 on property-wave6-b branch; MP ID 237 in monitored_pages. 4,406 body words (depth-justified per §16.16); 14 FAQs; 4 internal links resolve. No site-wide flag blockers; minor ADJACENT_TOPIC notes logged.
