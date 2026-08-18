# Pack (experiment 3, conversational coverage): `section-24-self-assessment-tax-return`

## 1. Target and permission
- File: `Property/web/content/blog/section-24-self-assessment-tax-return.md`
- Change: insert ONE new H2 section (or extend the FAQ block if the post has one, with new
  entries only) that directly answers the Bing-only questions below. Answer-first: the number
  or the yes/no lands in the first sentence of each answer. Use the searcher's phrasing in the
  heading/question where it reads naturally; never force a variant verbatim.
- 3 to 5 questions answered, chosen from the list below by impressions.
- Baseline: Bing 220 impr / 25 clicks @ wpos 4.45; Google 28d 19 impr / 1 clicks.

## Rules (identical for every page in this experiment)

- ADDITIVE ONLY. Existing metaTitle, H1, H2 order, body prose, FAQ entries: byte-identical.
  The diff may only INSERT the new block. Equity gate blocks anything else.
- Every figure re-derived from the post's own stated figures or docs/property/house_positions.md.
  No new external facts without a statute or gov.uk source already cited in the post.
- No em-dashes anywhere. Voice matches the surrounding post (read it first).
- One change per page. Nothing else touched, no internal-link additions, no meta changes.
- Revert path: single-file git revert.

## The Bing-only questions (queries Bing shows this page for that Google never has)

- `can you claim mortgage payments on self assessment` : 3 impr, pos 2.0
- `does mortgage interest go into finance cost for self assessment` : 3 impr, pos 1.0
- `tax return where do i put mortgage` : 2 impr, pos 2.0
- `where to enter mortgage interest on taxes` : 2 impr, pos 2.0
- `where to enter mortgage interest on self assessment uk` : 2 impr, pos 1.0
- `which box does mortgage interest go on tax return` : 2 impr, pos 1.5
- `how to enter mortgage interest 20% on tax return uk 25/26` : 2 impr, pos 2.0
- `residential finance costs” box completing for interest. do i enter the 20% figure paid or the full figure paid` : 2 impr, pos 1.0

## 2. Equity register (must still match after the edit; additive edits preserve this by construction, the gate verifies)

Bing 90d (weekly rows summed), every query with an impression:

- `sa105` : 14 impr, 0 clicks, pos 10.0
- `mortgage interest for self assessment` : 4 impr, 0 clicks, pos 4.2
- `hmrc property income mortgage interest` : 4 impr, 0 clicks, pos 8.0
- `can you claim mortgage payments on self assessment` : 3 impr, 0 clicks, pos 2.0
- `pro44 residential finance costs` : 3 impr, 0 clicks, pos 4.0
- `does mortgage interest go into finance cost for self assessment` : 3 impr, 1 clicks, pos 1.0
- `residential property finance costs` : 3 impr, 0 clicks, pos 6.7
- `hmrc sa105` : 3 impr, 0 clicks, pos 8.0
- `tax return property mortgage interest` : 3 impr, 0 clicks, pos 5.0
- `tax return where do i put mortgage` : 2 impr, 0 clicks, pos 2.0
- `sa105 24-25` : 2 impr, 0 clicks, pos 5.0
- `where to enter mortgage interest on taxes` : 2 impr, 0 clicks, pos 2.0
- `where to enter mortgage interest on self assessment uk` : 2 impr, 0 clicks, pos 1.0
- `which box does mortgage interest go on tax return` : 2 impr, 0 clicks, pos 1.5
- `how to enter mortgage interest 20% on tax return uk 25/26` : 2 impr, 1 clicks, pos 2.0
- `residential finance costs” box completing for interest. do i enter the 20% figure paid or the full figure paid` : 2 impr, 1 clicks, pos 1.0
- `where on the tax return do you get mortgage interest uk` : 2 impr, 0 clicks, pos 3.0
- `where do i put the mortgage paid as a landlord on self assesment` : 2 impr, 0 clicks, pos 3.0
- `residential finsnace costs tax return` : 2 impr, 0 clicks, pos 6.0
- `section 24 taxes` : 2 impr, 0 clicks, pos 5.0
- `in resisdencial property finance cost box do i enter full interest paid uk?` : 2 impr, 1 clicks, pos 1.0
- `how do i report mortgage interest on my tax return` : 2 impr, 0 clicks, pos 4.0
- `what is shedule 24 hmrc` : 2 impr, 0 clicks, pos 6.0
- `hmrc let property interest where to enter` : 2 impr, 0 clicks, pos 3.0
- `do we add intrest on our mortgage on self accessment form` : 2 impr, 0 clicks, pos 1.0
- `property income self assessment can i use mortgage interest payments to reduce income tax` : 2 impr, 0 clicks, pos 3.0
- `where in my self assessemtn form do i add in the interest on my mortage for rental properites` : 2 impr, 0 clicks, pos 3.0
- `self assessments for landlords - can i claim mortgage payments 25/26` : 2 impr, 0 clicks, pos 2.0
- `what tax self assessment box do you put mortgage interest in for rental properties` : 2 impr, 1 clicks, pos 1.0
- `hmrc self assessment property income finance costs relief uk` : 2 impr, 0 clicks, pos 5.0
- `self assessment , loan from spouse` : 2 impr, 0 clicks, pos 6.0
- `summary s 24` : 2 impr, 0 clicks, pos 3.0
- `residential finance costs hmrc` : 2 impr, 0 clicks, pos 7.0
- `sa105 2026` : 2 impr, 0 clicks, pos 10.0
- `how to deduct mortgage interest on tax return uk` : 2 impr, 0 clicks, pos 10.0
- `where do i add my mortgage interest on self assessment and why does it ask me for uk interest` : 2 impr, 0 clicks, pos 3.0
- `self assessmeny where do i put how much mortgaaae intrest` : 2 impr, 1 clicks, pos 1.0
- `sage mtd income tax for property, where is the tax relief on mortgage interest shown` : 2 impr, 0 clicks, pos 2.0
- `mortgage payments included as expenditure on self assessment tax return?` : 2 impr, 0 clicks, pos 6.0
- `s24 finance costs. what does this mean?` : 2 impr, 0 clicks, pos 4.0
- (+108 more, all protected)

Google 28d:

- none

## Acceptance
1. Diff is insert-only (one H2 section or new FAQ entries; existing entries byte-identical).
2. Each targeted question is answered under a searcher-worded heading with the answer in
   sentence one; facts re-derivable from the post or house_positions.md.
3. No em-dashes, no new links unless the post already links the same target.
