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
- **Final slug / category:**
- **H1 chosen:**
- **Meta title chosen:** (max 62 chars)
- **Meta description chosen:** (max 158 chars)
- **Why these vs other options:**

### Competitor URLs fetched

### Existing-page review (from "Closest existing pages")

### Citations added (external authority)

### Internal links added (to our existing pages)

### Inline CTA placements

### Build attempts

### Verification
- em-dash count:
- Tailwind utility classes in markdown:
- metaTitle length:
- metaDescription length:
- FAQ count:
- Internal links resolve:
- Body word count:

### Flags raised to wave6_site_wide_flags.md

### 2-3 sentence summary
