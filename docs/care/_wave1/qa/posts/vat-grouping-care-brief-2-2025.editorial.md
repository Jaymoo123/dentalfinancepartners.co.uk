# Track B editorial QA: vat-grouping-care-brief-2-2025

Date: 2026-09-27. Reviewer: Opus, Track B. Read first: `docs/care/_wave1/qa/posts/vat-grouping-care-brief-2-2025.factual.md` (Track A, PASS, 5 edits, 1,090 words).
Compared against: all 12 siblings in `docs/care/_wave1/posts/`, the live `care/web/content/blog/care-home-vat-exemption-edge-cases.md` (the requested overlap check), and the two newest live posts `care-provider-formation-trends.md` and `care-home-bed-supply-and-care-deserts.md` (both 2026-07-23).

**Verdict: PASS after 7 edits.** Body 1,140 words (was 1,090). No figure, rate, date, section reference or rule changed.

## Requested check: overlap with the live `care-home-vat-exemption-edge-cases` on the RCB 2/2025 outline

One real overlap, now cleared, and one thing for the manager.

The live post's section "RCB 2/2025: why the old VAT-grouping schemes are now a live HMRC risk" narrates the scheme mechanism in four steps: unregulated entity inserted into the supply chain, its supplies argued taxable because it is not state-regulated, input VAT then recovered across the group. The draft's opening H2 narrated the same four steps in the same order, in its own words but with the same shape, and then linked to the live post anyway. Two surfaces in the same category, one of them already the canonical treatment.

Fixed by making the draft cite rather than re-run it: the mechanism is now one compressed sentence, the link is repositioned as where the step-by-step and the partial exemption arithmetic live, and the paragraph closes by naming what this post owns instead ("what HMRC can do to a group, and from what date"). The live post carries the mechanism; this one carries the two removal routes and their effective dates, which the live post does not touch at all.

FAQ 1 here ("Did RCB 2/2025 ban VAT groups in the care sector?") sat close to the live post's "What is Revenue and Customs Brief 2/2025?" on the phrase "inserting an unregulated entity ... to unlock input VAT recovery". Reworded. The two FAQs now answer different questions: the live one defines the brief, this one denies the blanket reading of it.

No other overlap above the citation floor. The live post's £90,000, de minimis and partial exemption material has no counterpart in this draft, which asserts no figures at all.

**Manager note, outside this file:** the live post states HMRC's enforcement stance unqualified in three places ("new registrations are refused", "new VAT group registrations using these structures are refused", "HMRC refuses new group registrations"). Track A corrected exactly that overstatement in this draft against the brief's own "where necessary". The live post and this draft will sit in the same category, cross-linked, contradicting each other on the strength of HMRC's position. The live post needs the qualifier. Not a Track B edit here, and not in `content/blog/` under this brief.

## Sibling overlap

`supported-living-company-structure-before-framework-bid.md` is the only sibling that covers RCB 2/2025. Its FAQ and body both use the construction "refuse new [VAT] group registrations designed to route exempt care supplies through an unregulated entity ... and remove members from existing groups". The draft carried the same construction in three places (intro, takeaway 4, FAQ 4), which was also Track A's note that "where necessary" had stacked up. All three rewritten to different verbs and different sentence shapes; the qualifier is preserved in each, because it is the accuracy Track A bought. No other sibling touches grouping, section 43A, section 43C, the representative member or joint and several liability.

## Checklist

| Check | Result |
|---|---|
| Near-verbatim with siblings or live corpus | Cleared, see above. Remaining shared strings are statutory citations (section 43A control test, Group 7 Schedule 9) which cannot be varied further. |
| AI tells | None. Grepped delve, landscape, navigate, crucial, robust, realm, tapestry, "It is important", "In today's": zero. |
| Em-dashes and en-dashes | Zero. |
| Markdown in the body | None. Raw HTML throughout: p, h2, ul, table, strong. |
| H2s answer-first | Four of five were question-shaped and answered in the first clause. "Why grouping is still worth having in a care group" was neither; rewritten to a question with a "Yes, and..." opener. |
| Intro answers with numbers | Yes after edit. It carried the 24 April 2025 publication date and the two-structure split but not the thing that decides the money; it now names section 43C and the fact the two routes carry different effective dates. |
| Thin or padded sections | None. Five H2s, each carrying a distinct decision; the removal table is the spine Track A asked be preserved and is intact. |
| Pipeline leakage | None. No "verify at build", no "(HP*)", no TODO. |
| House style: FAQ attribution | Compliant. No `Source: <url>` tails anywhere in the file; the two attributions (the brief's contact route, HMRC asking providers to review) are already in prose. Matches the two newest live posts, neither of which uses a tail. |
| Banned claims | None. No pricing, no named people or brands, no "chartered", "ICAEW", "our accountants", "we advise", "advice". "A specialist reviews the structure and the returns together" and "have the position professionally reviewed" (HMRC's own words) are the permitted constructions. |
| Body word count | 1,140, inside 800 to 1,200. |
| metaTitle / metaDescription | 39 / 147. |
| Internal links | 4 of 5. Unchanged, all verified on disk by Track A. |
| YAML | Re-parsed after every edit. 15 keys, valid. `date`, `dateModified`, `updatedDate` all 2026-09-27. |

## Edits made (7)

1. Intro, enforcement sentence: reworded off the shared "refuse new group registrations designed to..." construction; qualifier kept as "where it judges refusal necessary".
2. Intro, closing sentence: added the section 43C two-route point so the intro answers with the thing that decides the cost.
3. Body H2 1: mechanism paragraph rewritten to cite the live edge-cases post rather than re-narrate it, and to state what this post owns.
4. Key takeaway 4: reworded, same qualifier, different sentence shape.
5. FAQ 4: reworded, same three HMRC actions, different order and verbs.
6. FAQ 1: reworded off the live post's "inserting an unregulated entity ... unlock input VAT recovery".
7. Body H2 2: "Why grouping is still worth having in a care group" to "Is ordinary grouping still worth having in a care group?", with an answer-first opener.

## Manager notes

1. **The live `care-home-vat-exemption-edge-cases` overstates HMRC's refusal position in three places.** Track A corrected the same overstatement in this draft. Needs a separate pass on `content/blog/`, otherwise the two cross-linked posts contradict each other.
2. `supported-living-company-structure-before-framework-bid.md` carries the same unqualified "HMRC will refuse new group registrations" in its summary, a takeaway, an FAQ and the body. Its Track A has run and did not add the qualifier. Worth a look before the wave ships, since this post and that one will both be new.
3. No factual doubt raised. Nothing in Track A's assertion table was touched.
