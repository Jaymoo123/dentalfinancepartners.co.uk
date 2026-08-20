# Restructure verification: CGT pillar + 60-day deadlines

Date: 2026-08-20. Scope: final verification read only, five checks per page, full read top to bottom. No edits made.

| Page | Verdict |
|---|---|
| capital-gains-tax-property-complete-guide-uk.md | PASS (5/5) |
| cgt-payment-deadlines-property-sales-2026.md | FAIL (checks 1, 2, 4) |

---

## 1. capital-gains-tax-property-complete-guide-uk.md

**Verdict: PASS.**

### Check 1: duplicate answers in two registers
No surviving duplicate answer pair. The plain layer (lines 57 to 89) and the depth layer (line 91 onward) overlap on facts but never on answers: each depth section carries material the plain layer does not state.

Closest overlap, judged acceptable:

- Line 65 (plain): "the final nine months count as though you still lived there. CGT letting relief only reaches you if you shared the house with your tenant"
- Lines 158 and 160 (depth): "The final nine months of ownership always qualify as deemed occupation provided the property was at some point a main residence." / "it requires the owner to have shared occupation with the tenant during a period of letting. The pre-April 2020 version (which applied without the shared-occupation requirement) was abolished."

Same two facts recur, but the depth adds deemed-occupation framing, the pre-2020 abolition and the "PRR alone applies" conclusion. That is layering, not a duplicate answer. Same reading applies to line 73 (plain rates) versus lines 166 to 170 (depth AEA ordering, GBP 37,700 band, trustees at 24%).

### Check 2: seam
Clean. All five plain-register sections sit above the depth layer with no technical section stranded above them and no plain section stranded below. Two forward references, both resolving correctly:

- Line 69: "the 60-day section below sets out who does not have to file at all" resolves to line 174 ("Where the gain is fully covered by PRR, capital losses or the AEA, no 60-day filing is required for UK residents"). Correct direction.
- Line 89: "all run through the same steps set out below" resolves to the five-step calculation at line 112. Correct direction.

No backward reference points at moved content.

### Check 3: keyword-list-as-prose
None. One soft note, not a blocker, line 86 carries two variants of the same phrase in a single sentence:

> "Capital gains tax on commercial property has matched residential since 30 October 2024, so commercial property capital gains tax now turns on reporting rather than rate"

The sentence still carries a real claim (rate parity, so the difference is reporting) so it reads as prose, but the doubled variant is the only place on the page where the keyword shows through.

### Check 4: frontmatter
YAML parses (21 keys, 15 FAQ entries, all with non-empty answers). No near-duplicate FAQ pair. FAQ 15 ("Do you pay capital gains tax when you sell your house?") is the new plain entry and mirrors the body H2 at line 57, which is the intended FAQ-to-body pairing, not a duplicate. It restates the 18/24 and GBP 3,000 figures also in FAQ 1, but answers a different question (whether you pay at all, via PRR) rather than the rate question.

### Check 5: em-dashes and artefacts
Zero em-dashes, en-dashes, horizontal bars, minus signs. No pipeline artefacts (no `[[`, `{{`, HTML comments, code fences, TODO/FIXME/PLACEHOLDER, bracketed inserts, template tags).

---

## 2. cgt-payment-deadlines-property-sales-2026.md

**Verdict: FAIL.** Checks 3 and 5 pass. Checks 1, 2 and 4 fail, and 1 and 2 share a single root cause.

### Check 1: duplicate answers in two registers, FAIL

The restructure moved most of the plain layer to the top (lines 64 to 122), but two plain-register sections were left behind inside the depth layer, each sitting immediately after the technical section that already answers it. Two duplicate answer pairs survive.

**Pair A (sharpest, 11 lines apart).** Same answer: not in Self Assessment plus liability settled at 60 days means nothing further to file, and rental income or untaxed interest pulls you back in.

- Line 236, depth register, inside "How the 60-day return and Self Assessment interact":
  > "Sellers not currently within Self Assessment can trigger registration through the 60-day return or by writing to HMRC. Where the entire CGT liability is settled through the 60-day return and there is no other reason to file an SA return (no rental income, no untaxed interest above the threshold), HMRC may accept that no SA return is needed, but this is a case-by-case position rather than a general rule."

- Line 247, plain register, inside "Do you report capital gains on your Self Assessment tax return as well?":
  > "If you are not within Self Assessment at all and the 60-day return settled your whole liability, you may have nothing further to file. Rental income, untaxed interest or a second disposal in the same tax year can pull you back into Self Assessment, and the gain then has to appear there as well."

The second adds only "or a second disposal in the same tax year" and drops the case-by-case caveat. A reader hitting line 247 has already read the answer.

**Pair B (6 lines apart).** Same answer: a non-resident files at 60 days even with no tax due or a loss, a UK resident does not.

- Line 143, depth register, closing "Who is in scope of the 60-day return":
  > "The asymmetry between UK and non-UK residents is the easiest point to get wrong. A non-UK resident landlord who sells a property at a loss, or whose gain is fully covered by losses, still has to file the 60-day return. A UK resident in the same position does not."

- Line 149, plain register, inside "Do you report a land sale or a commercial property sale within 60 days?":
  > "If you are not UK resident the answer flips. Every disposal of UK land goes through the 60-day return, residential or commercial, and so does an indirect disposal of shares in a UK property-rich company. You file within 60 days even where you have no tax to pay and even where you sold at a loss."

Line 149 does add indirect disposals and an onward link, so this pair is weaker than Pair A, but the loss and no-tax-due point is stated twice in adjacent sections.

**Third, softer overlap (not counted as a pair, noted for completeness).** The interactive PPDCGT paper route is described twice:

- Line 120: "The paper form for capital gains tax on UK property is the interactive PPDCGT return, which you complete on screen, print and post."
- Line 190: "Interactive PPDCGT form. Since April 2024, HMRC has published an interactive Capital Gains Tax on UK Property return that can be completed online, printed and posted."

Line 190 adds the April 2024 date and the point that the route is open without qualifying as digitally excluded, so it survives on added content, but the mechanic sentence is near-verbatim. Same pattern, weaker, for the CGT on UK property account number at line 100 versus line 166.

### Check 2: seam, FAIL

The page does not read as one plain-then-depth document. Section order:

| # | Line | Heading | Register |
|---|---|---|---|
| 1 | 64 | You have 60 days to report and pay CGT after completion | plain |
| 2 | 72 | How do you report capital gains tax to HMRC? | plain |
| 3 | 88 | How do you pay capital gains tax to HMRC? | plain |
| 4 | 96 | What is the HMRC capital gains tax account and how do you sign in? | plain |
| 5 | 104 | Which capital gains tax form do you need? | plain |
| 6 | 124 | Who is in scope of the 60-day return | depth |
| **7** | **145** | **Do you report a land sale or a commercial property sale within 60 days?** | **plain, stranded** |
| 8 | 153 | The 60-day clock | depth |
| 9 | 164 | What the 60-day return contains | depth |
| 10 | 196 | Payment is due at the same time | depth |
| 11 | 202 | Penalties for late filing and late payment | depth |
| 12 | 222 | How the 60-day return and Self Assessment interact | depth |
| **13** | **243** | **Do you report capital gains on your Self Assessment tax return as well?** | **plain, stranded** |
| 14 | 249 | Worked timeline: a 2026/27 disposal | depth |
| 15+ | 270 onward | practical points, missed deadline, records, wider picture | depth |

Sections 7 and 13 are the two the restructure did not move. Each landed directly after its technical twin, which is what produced the Pair A and Pair B duplicates. Fixing the seam and fixing check 1 is the same edit.

No dangling directional references. Both explicit ones resolve correctly after the move:

- Line 284: "compound at the points set out above" resolves to the penalty table at line 206, above it. Correct.
- Line 62: forward pointer to the pillar guide, unaffected by the move.

### Check 3: keyword-list-as-prose, PASS

No sentence is a keyword list. Two soft notes:

- Line 98: "There is no separate CGT login to set up." The phrase "CGT login" is seeded rather than natural, but the sentence carries a real correction.
- Line 106: "There is no single capital gains tax form. Which capital gains tax return you file depends on what you sold and how you are filing it." Two variants in consecutive sentences, still functional prose.

### Check 4: frontmatter, FAIL

YAML parses (18 keys, 19 FAQ entries, all with non-empty answers). Structure is fine. Near-duplicate FAQ pairs survive:

**Pair 1, clear duplicate.** FAQ 6 and FAQ 19 give the same two-part answer (UK resident: no, Self Assessment, 31 January; non-resident: all UK land within 60 days regardless of tax due).

- FAQ 6, "Does the 60-day rule apply to commercial property sales?": "For UK-resident sellers, the 60-day CGT on UK property service applies to UK residential property only. Disposals of UK commercial property (and disposals abroad) by UK residents are reported only on the Self Assessment return, with payment due by 31 January following the tax year. For non-UK resident sellers, all UK land disposals ... must be reported within 60 days regardless of whether tax is due."
- FAQ 19, "Do I have to report a capital gain on the sale of land within 60 days?": "For a UK resident, no: bare land is not residential property, so capital gains on sale of land wait for your Self Assessment return and the tax is due by the 31 January after the tax year. ... A non-UK resident has no such distinction to make and files within 60 days on every UK land disposal, tax due or not."

FAQ 19 adds only the garden and grounds boundary and the rate reassurance. One question, answered twice.

**Pair 2, borderline duplicate.** FAQ 5 and FAQ 16 both answer how the account is created and what the account number is for.

- FAQ 5, "How is the 60-day return filed?": "Individuals first need a Government Gateway account and a CGT on UK property account number, which HMRC generates the first time you log into the service."
- FAQ 16, "How do I sign in to my capital gains tax account?": "Use your Government Gateway user ID and password ... the account is created the first time you sign in and HMRC issues a CGT on UK property account number that identifies your returns."

FAQ 16 adds the keep-the-number and separate-from-SA points, so it is defensible, but the core sentence is duplicated.

**Two one-sentence overlaps, not pairs.** FAQ 15 closes with "Self Assessment payments on account do not apply to capital gains tax", which is the whole of FAQ 9. FAQ 14 already routes non-SA filers to the real time service, which FAQ 18 then answers again as a negative.

At 19 entries the FAQ block is also the longest in the cluster. The new plain entries (14 to 19) were appended without pruning the technical entries they overlap.

### Check 5: em-dashes and artefacts, PASS
Zero em-dashes, en-dashes, horizontal bars, minus signs. No pipeline artefacts.

---

## What would clear page 2

1. Fold section 7 (line 145) into section 6 (line 124) and section 13 (line 243) into section 12 (line 222), or move both up into the plain layer above line 124. Either kills the seam break and both duplicate pairs in one edit.
2. Delete FAQ 19 (its unique content, the garden and grounds boundary, is already in the body at line 151) or merge it into FAQ 6.
3. Trim FAQ 5 or FAQ 16 to one account-creation statement.

## Out of scope, flagged once
Line 60 of page 2 states "Missing the 60-day window triggers automatic penalties from day 61, even if the eventual tax bill turns out to be zero." Where the bill is zero a UK resident has no filing obligation at all, per the page's own rule at line 68 and FAQ 1, so no penalty arises. This is an accuracy point, not one of the five checks, and it is not a restructure regression.
