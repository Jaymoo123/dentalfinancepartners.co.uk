# Rubric: link sentences (stage 13)

Binding for every agent that writes or reviews an internal-link sentence. Read
`sites/<site>_rulings.md` and the site's blueprint link rules first; they win
over this file where they are stricter. Link sentences are user-facing copy:
written by Opus or Fable only, never Sonnet.

## The standard, in the owner's words (2026-10-10)

> "Curated, accurate internal linking, and turning someone on the page, reading
> about a guide, and reinforcing our name, reinforcing us as the best option for
> them. Thoroughly, but not just shoved in their faces: elegantly but linked
> thoroughly. Reinforcing that we're the one they need. And without competing
> the pages."

Every sentence is judged against that paragraph first and the rules below
second.

## What a good link sentence does

1. **Arrives at the moment of need.** It sits right after the paragraph or
   section where the reader's situation turns into "this is getting complicated
   / I would rather someone did this". Never the opening paragraph, never the
   final line of the page, never inside a heading.
2. **Speaks to this reader's exact situation.** It names the specific thing the
   reader is facing on this page (the 60-day return on a gift, the SDLT on a
   transfer, the rebasing for a non-resident) and says what we do about it. A
   sentence that would fit any page fails.
3. **Reinforces us without shouting.** It names Property Tax Partners, or "our
   specialists" where the brand already appears in the paragraph, and makes one
   concrete, true claim about how we help (what we check, what we produce, what
   it costs where the page already states a fee). No superlatives we cannot
   evidence ("the best", "leading", "number one"), no urgency tricks, no
   exclamation marks.
4. **Reads as the guide's own voice.** Same tense, register and spelling (UK) as
   the surrounding paragraph. It may be a new sentence or a light rework of an
   existing sentence that already talks about getting help; prefer the rework
   when one exists.
5. **Earns the click.** The reader should understand what they will get on the
   other side of the link.

## Hard rules (the deterministic checker enforces these)

- **One link per source page per destination page.** A page may link to more
  than one money page only where it genuinely covers more than one subject.
- **Anchor matches destination intent.** Hire wording ("accountant for",
  "specialist", "adviser", "help with", "our ... service") only ever points to a
  sales page (service, `/for/`, city). Explainer wording ("how Section 24
  works") only ever points to a guide. A guide never receives hire wording.
- **No competing.** A guide's link sentence never uses the head search of a
  family the guide does not own as its anchor.
- **Exact-match share.** At most one third of the links into any destination
  carry that destination's exact head phrase; the rest use natural variants or
  descriptive anchors.
- **No repeats.** No two source pages use the same sentence, and no two source
  pages of the same type share the same anchor text for the same destination.
- **City terms stay with city pages** (blueprint R4): "accountant in Leeds"
  never points to a national page.
- **No em-dashes.** Commas, parentheses, full stops.
- **Facts are house facts.** Any figure in the sentence (rates, deadlines,
  fees) must already appear on the source page or in `house_positions.md`; the
  sentence never introduces a new number.
- **Frozen pages and give-up pages** (`property_frozen_pages.md`, blueprint R6)
  get a proposal marked `NEEDS OWNER SIGN-OFF`, never an edit.

## Output schema (one JSON object per proposed link)

```
{"source_route", "source_file", "destination", "family_id",
 "placement": {"after_heading": "...", "after_text_start": "first 12 words of the paragraph it follows"},
 "mode": "new_sentence" | "rework_existing",
 "before": "existing sentence or null", "after": "the full sentence with the link in markdown",
 "anchor": "...", "anchor_type": "exact" | "variant" | "descriptive",
 "why_here": "one line: what need the reader has at this point",
 "confidence": "high" | "medium" | "low", "input_sha256": "sha256 of the source file read"}
```

## Reviewer checklist (Opus reviewer, after the checker)

BLOCK if any: shoved in (opening, closing, or interrupts an explanation
mid-thought); generic (would fit another page unchanged); claim we cannot
evidence; anchor intent mismatch; repeated sentence; changes the meaning of the
surrounding text. FIX if: register or rhythm off, anchor clumsy, could be a
rework of an existing help sentence instead of a new one. NOTE: anything the
owner should see.
