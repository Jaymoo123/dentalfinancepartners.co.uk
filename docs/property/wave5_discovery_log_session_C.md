# Wave 5 discovery log — Session C (Joint ownership + Form 17 + spouse-mechanics)

Append-only. Each entry uses format `D-N | YYYY-MM-DD HH:MMZ | TAG | summary` plus optional sub-bullets.

Tags: ADJACENT_TOPIC, CALCULATOR_IDEA, COMPONENT_IDEA, EXISTING_PAGE_STALE, EXISTING_PAGE_LINK_OPPORTUNITY, AUTHORITY_GAP, CROSS_NICHE_LINK.

Discoveries do not block forward progress. Manager reads at wave end; feeds future waves + Track 2 sweep.

---

## D-1 | 2026-05-23 PM | EXISTING_PAGE_STALE | C1 competitor scan | farnellclarke.co.uk Form 17 article 301-redirects to tc-group.com

The Stage-2 verified URL `https://www.farnellclarke.co.uk/blog/property-investors-letting-jointly-owned-property-form-17/` (live 2026-05-23 morning per brief) returns a 301 redirect to `https://www.tc-group.com/news/offices/accountants-business-advisors-in-norwich-farnellclarke/` (Farnell Clarke is now part of TC Group). The original Form 17 article does not appear to have been carried over to the new domain.

Operational impact: none for C1 write (the other three Stage-2 sources gave adequate coverage). Forward note for future joint-ownership briefs: drop farnellclarke.co.uk from the competitor seed list; TC Group's combined editorial does not appear to maintain the original Form 17 long-form content.

## D-2 | 2026-05-23 PM | EXISTING_PAGE_STALE | C1 competitor scan | taxscape.deloitte.com Form 17 article 404

Stage-2 verified URL `https://taxscape.deloitte.com/article/married-couples-civil-partnership-form-17.aspx` returns a 404 page on fetch. The URL was reported live on Stage-2 verification 2026-05-23 morning (per brief); URL rot between Stage-2 verification and Session C launch on the same day.

Operational impact: none for C1 (other sources sufficient). Forward note: drop the Deloitte URL from joint-ownership competitor seed lists.

## D-3 | 2026-05-23 PM | AUTHORITY_GAP | C1 write | The statutory 60-day window for Form 17 is in ITA 2007 s.837(3), not in TSEM

Competitor coverage of the 60-day window almost universally cites TSEM9851 as the source (and one major competitor, ukpropertyaccountants.co.uk, gets the direction of the window wrong, framing it as "60 days before" rather than "60 days from" the signature date). The statutory source is ITA 2007 s.837(3) itself, which makes the 60-day window a primary-legislation requirement, not an HMRC operational guideline. C1 cites s.837 directly and includes a sentence ("the rule is statutory, not just procedural") that flips this from a near-universal competitor framing.

Operational impact: the s.837 framing is C1's strongest distinguishing point against competitor pages. Future C-bucket pages should preserve the "statutory, not procedural" framing where they reference the 60-day window (C4 and C5 are the most relevant).

## D-4 | 2026-05-23 PM | EXISTING_PAGE_LINK_OPPORTUNITY | C1 write | Five existing on-site pages should add a back-link to C1 once it ships to main

The following existing pages reference Form 17 in body or FAQ without linking to a canonical mechanic page (because none existed pre-C1):

- section-24-joint-property-ownership-tax-split (cousin, back-patched 2026-05-23): mentions Form 17 throughout; should link to C1 from the "Form 17 Election for Married Couples and Civil Partners" H2.
- mtd-itsa-jointly-owned-property-threshold-split (Wave 3 B3): FAQ "What is Form 17 and how does it interact with MTD?" describes the mechanic; should link to C1.
- mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse (Wave 4 B1): operational mechanics page; should link to C1 for the underlying form mechanic.
- cgt-property-transfer-spouse (CGT): describes the income-side parallel; should link to C1.
- alphabet-shares-property-spv-dividend-splitting-spouse-children (Wave 4 A2): SPV-side spouse mechanic; should add a "Form 17 is the personal-name equivalent" cross-link to C1.

Operational impact: deferred until C1 ships to main. Manager-applied at wave-end merge OR Session C captures via Track 2 sweep.

## D-5 | 2026-05-23 PM | EXISTING_PAGE_STALE | C5 competitor scan | alexander-ene.co.uk civil-partnership URL set returns homepage content

Stage-2 verified URLs in the C5 brief (alexander-ene.co.uk/civil-partnership-tax.htm, alexander-ene.co.uk/civil-partner-property-tax.htm, alexander-ene.co.uk/civil-partnership-property.htm) all served the firm's generic North London accountants homepage rather than the civil-partnership tax content described in the brief at fetch time on 2026-05-23 PM. All three returned HTTP 200 (no redirect, no 404) but with replaced body content.

Operational impact: none for C5 write. The ukpropertyaccountants.co.uk URL plus the in-house §24 position carried enough scope.

Forward note: drop the alexander-ene.co.uk URL set from civil-partner / spouse-mechanics competitor seed lists. The firm appears to have migrated CMS or restructured its content, and the original civil-partnership articles do not appear to be available on the current site. Also flagged in wave5_site_wide_flags.md as F-5.

## D-6 | 2026-05-23 PM | AUTHORITY_GAP | C5 write | FA (No. 2) Act 2023 s.41 three-year extension to TCGA 1992 s.58 underused in competitor coverage of civil-partner dissolution

Competitor coverage of civil-partner dissolution and inter-partner CGT transfers almost universally describes the pre-2023 single-tax-year window (transfers in the year of separation only, at no-gain-no-loss). The Finance (No. 2) Act 2023, section 41, in force from 6 April 2023, inserted s.58(1A) to (1D) extending the protection to up to three full tax years after the year of separation, and indefinitely for transfers in accordance with a court order or formal separation agreement.

C5 threads this with a worked example (Patel / O'Brien dissolution scenario), specifically calling out the change from the pre-2023 rule and the material planning difference for civil-partner dissolutions occurring on or after 6 April 2023.

Forward note: the FA (No. 2) 2023 s.58 extension is a recurring AUTHORITY_GAP across the C-bucket: C7 (CGT main residence relief on joint ownership) and C10 (retirement Form 17 shift) will also benefit from this framing where dissolution / separation scenarios are mentioned. Reuse the Patel / O'Brien naming pattern or vary as needed.
