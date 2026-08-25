# Wave 11 independent adversarial factual QA — service charges + ground rent

Reviewer: independent Track 1 (factual) reviewer. Instruction: refute. No content file edited.
Date: 2026-08-20. Repo root: C:\Users\user\Documents\Accounting.

Pages reviewed (full page, frontmatter + FAQs + body):
- Property\web\content\blog\service-charge-disputes-leaseholders.md
- Property\web\content\blog\ground-rent-rules-uk.md

Read for consistency only (not reviewed): Property\web\content\blog\leasehold-reform-act-2024-what-is-in-force.md

VERDICT service-charge-disputes-leaseholders: all_clear
VERDICT ground-rent-rules-uk: all_clear

No statement of law, statute reference, commencement claim or tax proposition on either page was
falsified. Every advisory below is a precision or labelling fix, not a correction of a false claim.
Two advisories (SC-1, GR-1) are worth taking before deploy; the rest are optional.

---

## FINDINGS — service-charge-disputes-leaseholders

`[ADVISORY] service-charge-disputes-leaseholders: "Section 21 of LTA 1985 lets you require your landlord to supply a written summary of the costs incurred that are relevant to your service charges, covering the last accounting year or the 12 months before your request. For blocks with more than four dwellings the summary must be certified by a qualified accountant."`
— (SC-1) The described right is the **pre-2008 text** of s.21. The text legislation.gov.uk currently
displays as the live s.21 is a different provision: heading "Service charge information", subsection (1)
= "The appropriate national authority may make regulations about the provision, by landlords of
dwellings to each tenant by whom service charges are payable, of information about service charges."
It was substituted by the Housing and Regeneration Act 2008 Sch 12 para 2, and per the site's own F1
note that substitution commenced for England on 1 Dec 2008 **only "for the purpose of enabling the
Secretary of State to make regulations"**; no such regulations have ever been made, so the old s.21
remains operative for the substantive right. Corroboration: the in-force s.22(1) (substituted by CLRA
2002 s.154, in force 30 Sep 2003) still reads "has obtained such a summary as is referred to in section
21(1) (summary of relevant costs)" — a cross-reference that only works against the old text.
**The page is substantively correct and must NOT be "fixed" by deleting the summary right.** The gap is
that a reader who follows the page's own link to the 1985 Act and opens s.21 reads something else — on
a page whose entire thesis is enacted-vs-in-force discipline. Same issue in the FAQ "What information
can I demand about my service charges?" and in the toolkit table row "LTA 1985 ss.21-22".
— Drop-in fix (body, after "certified by a qualified accountant"): add the clause
`(legislation.gov.uk displays a replacement s.21 substituted by the Housing and Regeneration Act 2008, but that substitution was commenced only so regulations could be made and none ever were, so the original summary right is the one in operation, which is why s.22 still cross-refers to it)`.
Optionally add the same short parenthetical to the FAQ answer.

`[ADVISORY] service-charge-disputes-leaseholders: "The apportionment schedule he requests shows the agent has re-spread the block's costs across only 16 \"contributing\" units, at 6% for flats like Dev's"`
— (SC-2) Internally loose against the page's own test three paragraphs earlier ("every unit's share,
which should total 100%. Mis-keyed percentages and schedules totalling 103% are more common than anyone
admits"). 16 units × 6% = 96%. A pro-rata re-spread of Dev's 4.2% over 16 of 24 units gives
4.2 / (16 × 4.2) × 100 = 6.25%, not 6%. Not strictly wrong (the 16 remaining flats need not be equal),
but the worked example the page invites readers to replicate does not itself close to 100%.
— Drop-in fix: change `at 6% for flats like Dev's` to `at 6.25% for flats like Dev's`, `His demand says
£2,880, which is 6%` to `His demand says £3,000, which is 6.25%`, and `a precise, arithmetical claim for
£864` to `a precise, arithmetical claim for £984`. (16 × 6.25% = 100%; 6.25% × £48,000 = £3,000;
£3,000 − £2,016 = £984.)

`[ADVISORY] service-charge-disputes-leaseholders: "In October 2025, 20 months later, a demand arrives for £1,850 as her share."`
— (SC-3) Unlabelled precise figure in the Elaine s.20B timeline. Clearly hypothetical from context
(named person, invented facts), and the Dev example two sections later IS labelled "(illustrative
figures)", so the labelling is inconsistent within the page. The maths is right (Feb 2024 → Oct 2025 =
20 months; a June 2024 notification falls inside the 18-month window ending Aug 2025).
— Drop-in fix: `a demand arrives for £1,850 as her share (illustrative figures)`.

`[ADVISORY] service-charge-disputes-leaseholders: "where the whole or part varies according to the relevant costs"`
— (SC-4) s.18(1)(b) reads "the whole or part of which **varies or may vary** according to the relevant
costs". The page drops "or may vary" in both the FAQ and the body ("where the whole or part of it varies
according to the relevant costs"). The omission narrows the statutory definition, and this page turns on
that definition deciding whether the s.19/s.27A protections attach at all. The next sentence ("A truly
fixed charge written into the lease at an amount that never changes falls outside sections 19 to 27A")
is correct.
— Drop-in fix: `where the whole or part of it varies or may vary according to the relevant costs`.

Checked and found correct (no finding): the £250 (reg 6) and £100 per accounting period (reg 4(1))
triggers stated per tenant, not per building; the s.20B notification limb stated in full; the £114
application fee, £227 hearing fee and 6 July 2026 commencement date of SI 2026/642 (the brief's Stage 2
note said 13 July — the page uses the corrected 6 July, matching the §31.D lock and SI art 1(2) verbatim
"comes into force on 6th July 2026"); Daejan on terms including the £50,000 reduction and the
leaseholders' costs; s.42 LTA 1987 trust status; s.81 HA 1996; PIM2078 wording; LFRA 2024 ss.53-58
headings and their not-in-force status.

## FINDINGS — ground-rent-rules-uk

`[ADVISORY] ground-rent-rules-uk: "It is contested. Freeholder investors challenged the ground rent and valuation reforms in the High Court and lost in October 2025, but the Court of Appeal has given them permission to appeal."`
— (GR-1) This bullet sits inside the H2 "The £250 cap: a draft Bill, not law", under the heading "Three
points keep this state honest". A reader will take it to mean the £250 cap has been litigated. It has
not, and cannot be: the cap is in a draft Bill. The litigation is R (ARC Time Freehold Income Authorised
Fund and others) v SSHCLG [2025] EWHC 2751 (Admin), a challenge to **LFRA 2024's** marriage-value,
ground-rent and costs provisions, dismissed by the Divisional Court on 24 October 2025 with permission
to appeal since granted — exactly as the sibling page states it. Attaching it to the draft-Bill state
blurs the three-state ledger that is the whole point of the page, and brushes §31.3a discipline.
— Drop-in fix: `It is contested territory. Freeholder investors challenged the Leasehold and Freehold
Reform Act 2024's ground rent and valuation provisions in the Divisional Court and lost in October 2025
(R (ARC Time Freehold Income Authorised Fund) v SSHCLG [2025] EWHC 2751 (Admin)); the Court of Appeal
has since given them permission to appeal. That case is about the 2024 Act, not the draft Bill, but it
is another reason not to plan around a date nobody has.`

`[ADVISORY] ground-rent-rules-uk: "Your own 2007 lease demands £295 a year and doubles it every decade."`
— (GR-2) Contradicted by the page's own doubling table, which puts a 2007 lease granted at £295 with a
10-year doubling clause at £590 from 2017, and by "Elena's problem in 2026 is not the £590 she currently
pays". As written the opener says a 2007 lease is still demanding its original £295 in 2026.
— Drop-in fix: `Your own 2007 lease started at £295 a year and doubles it every decade.`

`[ADVISORY] ground-rent-rules-uk: "Marcus lets a leasehold flat and pays £295 a year in ground rent... In 2026 he pays an £8,000 premium to extend the lease"`
— (GR-3) Unlabelled precise figures in the two-returns worked example. The doubling table immediately
above IS labelled ("The figures are illustrative"), so the labelling is inconsistent within the page.
The £8,000 premium is also un-anchored to the lease-extension cost page it forward-links.
— Drop-in fix: `Here is the same flat, in two returns (illustrative figures). Marcus lets a leasehold
flat and pays £295 a year in ground rent...`

`[ADVISORY] ground-rent-rules-uk: "Many lenders decline or refer leases where the ground rent exceeds a small percentage of the property value (0.1% is a commonly applied threshold) or doubles more often than every 20 years or so."`
— (GR-4) The 0.1% figure and the 20-year doubling test are unsourced market claims. Both are hedged
("many lenders", "commonly applied", "or so"), so this clears the labelled-market-range bar, but the
same claim appears twice (body and FAQ "Why do lenders care about ground rent levels?") with no source
on either. Lender criteria are not statutory and vary by lender.
— Drop-in fix (both places): append `Criteria are lender-specific and change; check the individual
lender's handbook entry rather than a rule of thumb.`

`[ADVISORY] ground-rent-rules-uk: "The proposal sits in the draft Commonhold and Leasehold Reform Bill announced in the May 2026 King's Speech"`
— (GR-5) Verified and true in substance: the King's Speech of 13 May 2026 confirmed the government
would bring forward a Commonhold and Leasehold Reform Bill in the 2026-27 session, and the cap is
reported at £250 with a taper to a peppercorn after 40 years — both of the page's claims hold. The
compression loses a stronger, more checkable fact: the Bill was **published in draft on 27 January 2026
for pre-legislative scrutiny**, which is what makes "draft Bill" literally accurate rather than a label.
Note also the forward-link target `commonhold-and-leasehold-reform-bill.md` dates the announcement to
the **King's Speech 2024** (line 227). Both are true of different events, but a reader clicking through
meets a different date with no bridge.
— Drop-in fix: `The proposal sits in the Commonhold and Leasehold Reform Bill, published in draft on 27
January 2026 for pre-legislative scrutiny and confirmed for the 2026-27 session in the May 2026 King's
Speech, widely reported as a £250 cap tapering to a peppercorn over 40 years.` (Optional, for the
conductor: align the Bill page's "Announced" row so the two dates read as a sequence.)

Checked and found correct (no finding): every LR(GR)A 2022 section attribution (s.1 regulated lease
four-limb test, s.2 excepted categories incl. statutory extensions, s.3 prohibited rent, s.4 peppercorn,
s.5 shared ownership retained share, s.6 excepted-period/regulated-period split on a voluntary
extension, s.7 automatic conversion, s.8 weights-and-measures authorities, s.9 £500-£30,000 beyond
reasonable doubt, s.10 refund orders); SI 2022/694 dates 30 June 2022 / 1 April 2023; HA 1988 Sch 1
para 3A thresholds, para 3D inserted by RRA 2025 s.31 effective 27/12/2025 excluding fixed terms of
more than 21 years regardless of rent, and para 3E as a **closed** cohort (para 3E(2) limits it to
tenancies entered into before the Act was passed, within two months after, or under a prior contract —
the page's "closed transitional group" is exact); LRHUDA 1993 s.56 peppercorn + 90 years; the two-year
ownership rule gone since January 2025; PIM2205 verbatim.

## CROSS-PAGE CHECK (ground-rent-rules-uk vs leasehold-reform-act-2024-what-is-in-force)

Agreement on every in-force claim. No contradiction found:
- £250 cap: both = DRAFT ONLY, in the Commonhold and Leasehold Reform Bill, **not** in LFRA 2024, King's
  Speech May 2026. Identical position.
- Statutory extension today = existing term + 90 years at a peppercorn. Both. Neither implies 990 years
  is available.
- Two-year ownership rule abolished, in force (sibling dates it 31 Jan 2025 via SI 2025/57; the ground
  rent page says "Since January 2025" — consistent, less precise).
- ARC Time litigation: both = lost at first instance October 2025, permission to appeal granted, no
  effect on commencement. The ground rent page says "High Court", the sibling "Divisional Court" — the
  Divisional Court is part of the High Court, so not a conflict; see GR-1 for the placement issue.
- Neither page implies any LFRA 2024 ground-rent or service-charge reform is live. §31.3a clean.
- The service charge page and the sibling agree that LFRA 2024 ss.53-58 are enacted and not in force,
  and that LTA 1985 + SI 2003/1987 remain the operative regime. §31.D clean.

## HOUSE-POSITION COMPLIANCE

§31.D do-not-write list: all four clear. Thresholds stated per tenant (not per building); s.20B stated
with the notification limb; LFRA 2024 transparency stated as not in force with the safe formulation;
ground rent not treated as challengeable under s.19/s.27A (explicit boundary sentence + forward-link).
§31.E do-not-write list: all five clear. No "ground rent is capped"; no unqualified "abolished"; no
suggestion the 2022 Act helps existing leaseholders; ground rent not framed as a service charge; both
the commencement dates and the penalty figures are sourced to the SI and to s.9 (not s.8) respectively.
§31.B: draft-Bill framing used throughout, no enacted language.

## LINKS

Internal hrefs, both pages: 12 blog targets + 1 calculator, all resolve.
On disk under Property\web\content\blog\: ground-rent-rules-uk, service-charge-disputes-leaseholders,
right-to-manage-explained, right-to-manage-company-setup,
brief-introduction-to-commercial-property-service-charge-accounts,
leasehold-reform-act-2024-what-is-in-force,
building-safety-act-2022-cladding-cost-recovery-leaseholder-protections-landlords, lease-extension-cost-uk,
commonhold-and-leasehold-reform-bill. Every one carries `category: "Property Types & Specialist Tax"`,
so all `/blog/property-types-and-specialist-tax/<slug>` paths are correct.
Calculator: Property\web\src\app\calculators\portfolio-profitability-calculator exists.
External hrefs: 12 checked, 11 returned content and are on-topic; bailii.org returned 403 (see below).

## ARITHMETIC

17 recomputed, 16 OK, 0 wrong, 1 internally inconsistent (SC-2).
Derivations: £20,000 / 10 equal shares = £2,000 each (over £250, consultation required) OK. £3,000 / 15 =
£200 each (under £250) OK. 4.2% × £48,000 = £2,016 OK. £2,880 / £48,000 = 6.00% OK. £2,880 − £2,016 =
£864 OK. 24 units − 4 commercial − 4 unsold = 16 contributing units OK, but 16 × 6% = 96% ≠ 100% and a
pro-rata re-spread yields 6.25% (SC-2). £114 + £227 = £341 OK. Costs paid Feb 2024 → demand Oct 2025 =
20 months, outside the 18-month window (which closed Aug 2025) OK; a June 2024 notification falls inside
it OK. £2,000 per-flat bill capped to £250 on a failed consultation OK. Doubling table £295 → £590 →
£1,180 → £2,360 → £4,720 → £9,440, five successive doublings, all OK. Review dates 2007 + 10-year
intervals = 2017 / 2027 / 2037 / 2047 / 2057, last review 50 years after grant OK. Elena paying £590 in
2026 (2017 review applied, 2027 review not yet) OK.

## STATUTES

30 checked, 28 supported, 1 partially supported, 0 failed, 1 unreachable.
Supported: LTA 1985 contents (ss.18/19/20/20ZA/20B/20C/21/22/27A headings); LTA 1985 s.19(1) verbatim;
s.20B(1)-(2) verbatim; s.22 full text (six months, free inspection, management-cost treatment, reasonable
copying charge); s.27A(1)+(3) verbatim; SI 2003/1987 reg 4(1) (£100, per tenant, per accounting period,
agreements over 12 months) and reg 6 (£250, relevant contribution of any tenant); Housing Act 1996 s.81;
LTA 1987 s.42 (heading "Service charge contributions to be held in trust"); SI 2026/642 Sch 6 item 2.1
(£114 application / £227 hearing for LTA 1985 s.27A(1) or (3)); SI 2026/642 art 1(2) ("comes into force
on 6th July 2026"); LFRA 2024 contents ss.53-58 headings and Part 4 = ss.53-71; LFRA 2024 commencement
register (exactly three SIs: 2024/1018, 2025/57, 2025/131; no Commencement No. 4); TSEM5710; PIM2078;
PIM2205; PIM1051; PIM1056; Daejan [2013] UKSC 14 (supremecourt.uk case page + Gatehouse Chambers report:
prejudice not seriousness, dispensation on terms = £50,000 reduction + leaseholders' costs);
LR(GR)A 2022 contents ss.1-10; s.1; s.2; s.4; s.6; s.9; SI 2022/694; HA 1988 Sch 1 paras 3A/3D;
HA 1988 Sch 1 para 3E(2); LRHUDA 1993 s.56(1).
Partially supported: **LTA 1985 s.21** — the currently displayed in-force text is a regulation-making
power and does not support the sentences citing it; the pre-2008 text does, and remains operative
because the substituting provision is commenced only for regulation-making purposes. See SC-1.
Note on PIM1056: it names "ground annuals, rentcharges and feu duties", not "ground rents". The page
cites PIM1051 **and** PIM1056 jointly, and PIM1051 reads "rentcharges, ground rents and feu duties
(PIM1056)", so the sentence is carried. No fix required.
Unreachable: bailii.org/uk/cases/UKSC/2013/14.html returned HTTP 403 (not cited on-page; used only as a
verification route for Daejan, substituted with supremecourt.uk and Gatehouse Chambers).

## AUTONOMY CALLS MADE (no questions asked, per dispatch)

1. Treated the LTA 1985 s.21 position as ADVISORY not BLOCKER: the substantive right the page describes
   IS in force, so the page states no false proposition; the defect is citation transparency.
2. Treated the 6%/96% apportionment looseness as ADVISORY not WRONG: the 16 remaining flats need not be
   equal-sized, so the figure is underdetermined rather than false. Fix still recommended.
3. Verified the "May 2026 King's Speech" claim externally rather than accepting §31.B's May-2026-dated
   "not yet introduced / King's Speech 2024" line, which predates the 13 May 2026 Speech. The pages are
   right and the house position is simply older than the event.
4. Counted the joint PIM1051 + PIM1056 citation as supported rather than failed.
5. Did not re-verify the sibling page's own claims beyond the points where the two pages must agree.
