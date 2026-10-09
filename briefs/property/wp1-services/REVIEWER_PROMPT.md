# Reviewer prompt (two independent agents per page, Opus or Fable, neither sees the other)

Paste verbatim, replacing `<slug>`. Run the two in parallel. Their outputs go to the merge step (MERGE_PROMPT.md).

---

You are reviewing one rewritten service page, section by section, in the context of the whole page. Repo root `/home/user/dentalfinancepartners.co.uk`. Read: the rendered page `Property/web/.next/server/app/services/<slug>.html` (the text, not the scripts; this is what a reader and a crawler get), the spec `docs/property/commercial_recovery_2026-10-07/ANSWER_PATTERN_SPEC_services_2026-10.md`, the pack `briefs/property/wp1-services/<slug>.pack.md` (sections 1, 2, 3, 5 and 6: the spec, the phrases, the questions, the old page, the anchors that will point here), `docs/property/house_positions.md`, and the harness report `briefs/property/wp1-services/VERIFY_<slug>_draft1.md`. You do not see the writer's notes and you do not see the other reviewer.

Rules of evidence: no scores, no adjectives on their own. Every finding is a quoted sentence from the page, the heading it sits under, the rule or spec line it breaks (cite the document and line or section), and the replacement sentence you propose. Type each finding BLOCK (a fact or claim that is wrong or forbidden, a ruling breach), FIX (a clear improvement with a replacement you have written), or NOTE (a judgement for the owner, with both sides in one line each). If a section is right, say "no finding" and move on; do not invent one.

Per section, in reading order (title and meta description first, then the H1 and opening, then each H2 with its H3s, then the FAQ as one section), answer these eight, numbered:
1. Does the first sentence answer what the heading promises? Quote the heading and the first sentence. If not, write the sentence that would.
2. Which one sentence in this section could be deleted with no loss to the reader? Name it, or state "none" and why.
3. Does any sentence here repeat a point made elsewhere on the page? Quote both and say which goes.
4. Does any sentence exist for a query rather than a reader? Quote it, name the query from pack §2, and either rewrite it as prose or say it belongs in the coverage sentence.
5. Does this section contradict the opening, the FAQ, the schema, house_positions.md, or a fact the old page stated (pack §5)? Quote both sides.
6. Would the firm say this? Compare against the twelve owner-voice sentences in the spec: quote the nearest one and say whether this register matches (direct address, plain nouns, one claim per sentence, no hedging stack).
7. What does the reader still not know at the end of the section that the heading implied they would? One line.
8. Is the section in the right place? If a reader who just finished the previous section would not ask this question next, say where it belongs.

Then for the whole page:
9. The reader walk, three personas, one paragraph each: a first-time landlord with one flat; an eight-property owner deciding on a company; an accidental landlord about to sell. For each: where they would stop reading, what they would click, what they could not find, whether they would book the call.
10. The ten-second read: title, H1, opening paragraph, the H2 list, the first FAQ. Does a person who reads only those know what the page offers, for whom, and what to do next?
11. Register verdict against the spec's measured targets and the harness check 14 numbers: quote the three sentences that most pull the page away from the target.
12. One sentence: the single change that would most improve the page.

Output a Markdown file `briefs/property/wp1-services/REVIEW_<slug>_<A or B>.md` (you are told which letter), findings first (a table: section, type, quote, rule, replacement), then the numbered answers. No em-dashes. Do not edit the page. Do not commit.
