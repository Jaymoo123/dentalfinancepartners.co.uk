# Voice & Readability Standard — LOCKED

**Type:** Site-agnostic shared standard. Reuse VERBATIM for any niche site (property, dentists, solicitors, medical, generalist, contractors-ir35). Lives in `docs/_engines/` because it is methodology, not site facts. Per-site tuning (the abstract-noun list and the industry-term allowlist) lives in `sites/<site>.json` "voice", never here.

**Why this exists.** The content is factually excellent but a sample of the corpus read like a robot wrote it: it addressed the reader as an abstract noun ("the landlord", "the operator"), narrated its own structure ("this page walks...", "the page's first concrete artefact"), leaked internal SEO/orchestration vocabulary into published copy ("see our pillar", "bucket sibling page C5"), and over-signposted. This standard defines what "human" means here so every page reads like a genuine senior adviser wrote it, and is the rulebook the [[Humanise Engine]] (`docs/_engines/HUMANISE_PROGRAM.md`) enforces.

**The deterministic floor.** This standard is operationalised by `scripts/voice_scan.py` (signals S1-S6 below) and `scripts/voice_safety_diff.py` (the fact/query preservation guard). "Voice-clean" = `voice_scan` band `clean` or `minor`. Prose judgement still sits with a senior-adviser editor (Opus); the scanner is the floor, not the ceiling.

---

## The rules

### 1. Second person by default
Write to the reader as "you" / "your". This is the single biggest lever.
- Robotic: "The landlord must file a return by 31 January." / "The taxpayer should keep records."
- Human: "You must file your return by 31 January." / "Keep your records."

### 2. Concrete role over abstract noun (with a context-aware allowlist)
Do not refer to the reader as an abstract noun ("the landlord / taxpayer / investor / individual / operator / recipient / owner"). Use "you", or a concrete role only where genuinely needed. **Keep the noun where it is the correct, natural term**, namely:
- **A named worked-example persona or company.** "Mr Quayle, the landlord, ..." / "Crosby Properties Ltd ... the company" stays. (Even here, prefer reframing the example so the reader is "you" where it reads better.)
- **A genuine industry term in context.** A serviced-accommodation or FHL **operator**; an IHT **donor** / **donee**; a transaction **buyer / seller / vendor / purchaser**; a trust **settlor / trustee / beneficiary**. The other party to the reader's transaction is correctly "the seller", "the tenant", etc. (it is not the reader).
- **A statutory definition.** "A donor is a person who makes a transfer of value" is a definition, not voice.

The per-site allowlist of these terms + their context tokens is in `sites/<site>.json` "voice".industryAllowlist. The rule: if it is the reader, it is "you"; if it is a defined term, a third party, or a named persona, keep the noun.

### 3. No meta-commentary
Never narrate the article. State the substance directly. Headings show structure; prose must not describe it.
- Banned: "This guide covers...", "This page walks...", "In this guide we explain...", "In the sections that follow...", "below we look at...", "read on", "as noted above", "the page's first concrete artefact", "the thing readers can self-identify against", "this is the ... playbook / map / deep-dive".
- A reader does not care that they are reading a guide. They came for the answer. Open with it.

### 4. No structural / SEO-architecture talk in prose
Internal site architecture is invisible to the reader. Links are plain cross-references, not signposts to a content hierarchy.
- Banned in reader-facing copy: "pillar", "this pillar", "see our pillar", "... cluster", "child guide / parent guide", "sibling page", "bucket sibling page C5", "forward-link", "hub and spoke", "cornerstone / anchor page", "topic cluster".
- Internal orchestration vocabulary (bucket, lane, wave, batch ids like "C5") must NEVER appear in published copy.
- Good cross-reference: "For how the non-resident landlord scheme works, see our NRL scheme guide." Bad: "For the framing see our pillar page; this sits in the serviced-accommodation cluster."

### 5. No signposting / AI transitions
Cut the filler that flags machine writing: "Moreover", "Furthermore", "In addition", "Additionally", "It is worth noting", "It is important to note", "Notably", "Importantly", "Crucially", "In conclusion", "To summarise", "When it comes to", "Needless to say", "delve into", "navigating the complexities", "in today's...". Lead with the point; let sentences connect by logic, not connective boilerplate.

### 6. No em-dashes
House style bans the em-dash (U+2014); it reads as AI-generated. Use commas, parentheses, full stops, or middle dots. (This is the long-standing rule shared with `NETNEW_PROGRAM.md` §2 and `REWRITE_PROGRAM.md`; restated here for completeness.)

### 7. Length as the topic needs, never padded
A tight page that fully answers the query beats a padded one. Do not write to a word target and do not pad to hit one. Comprehensive depth is good where the topic warrants it (worked examples, comparison tables, real statutory detail); restating the same point, throat-clearing intros, and restate-only conclusions are not. Indicative landing ranges (NOT targets): non-pillar ~1,400-2,400 words, pillar ~2,400-3,500; under-length is fine if intent is fully served.

### 8. British English, for a UK audience
Write in British English throughout: `-ise` / `-isation` spellings (organise, optimise, recognise, realise, analyse, maximise), British terms and idiom (HMRC, a tax return, Self Assessment, £, VAT, "property" not "real estate", "maths" not "math", "whilst", "cheque", "licence" the noun), and a UK register. No American spellings or idiom (color, center, favor, behavior, defense, "license" the noun, fulfill, enrollment, "filing taxes", "gotten", "real estate", "math"). The audience is UK landlords, investors and advisers; a single Americanism reads wrong and undercuts authority. Enforced by a deterministic Americanism check in `voice_scan.py` (S7) and the per-page gate.

### 9. Authoritative and genuinely engaging (never clickbait)
The page must earn the click and the read the way the best adviser in the niche would, never with hype. The reader is a real person with a real worry and money on the line.
- **Open with the reader's stake.** Lead with the cost, risk or opportunity to *you*, not a textbook definition. "Get the residence test wrong and HMRC's discovery window stays open" beats "This article explains the residence test."
- **Hold a clear point of view.** A senior adviser takes a position; cut endless hedging.
- **Make it scannable.** Short paragraphs, H2s phrased as the reader's real question, key figures in **bold** where it helps a skimmer, tables for comparisons.
- **Close so the next step is obvious.** A natural, non-salesy lead into getting expert help (the lead form follows the body; never add pricing or fake urgency).
- **Never cross into clickbait.** No hype, no "save thousands", no invented urgency, nothing that breaks the gold-standard authority bar. Enticing here means clear, relevant, specific and confident, backed by real substance.

This deepens rules 1-7 rather than replacing them: same facts, same queries, same depth, framed to genuinely engage a real person. It does NOT touch the SERP snippet (metaTitle / metaDescription / h1 stay frozen; CTR is a separate data-driven, monitored workstream).

---

## The editorial contract (fact + query preservation) — NON-NEGOTIABLE

A Humanise pass changes **voice only**. It must NOT change a single fact or drop a single query. Specifically it must preserve, byte-for-byte where stated:
- **Every figure**: rate, threshold, %, currency amount, date, year, year-tag, number+unit. No figure removed, none added.
- **Every citation**: statute, section, Finance Act, treaty Article / Schedule / Part / paragraph.
- **Every internal link**: keep all `/blog/` hrefs (re-home the link into natural prose if you delete the meta-commentary around it; never lose the link, it carries SEO value).
- **Protected frontmatter**: `slug, category, metaTitle, metaDescription, h1, canonical, date, dateModified, reviewedBy, reviewerCredentials, reviewedAt, author, image, altText`. FAQ **questions** are query-bearing and frozen; FAQ **answers** may be voice-edited but every figure/citation in them stays. FAQ count and howToSteps count unchanged.
- **Every target query / keyword the page serves** (verified by `scripts/track2_query_coverage.py`). Nothing left on the floor.

This contract is enforced deterministically by `scripts/voice_safety_diff.py` and `scripts/track2_query_coverage.py`; a page that breaks it is reverted and retried, never shipped.

---

## Exemplars

**Target voice (good).** `Property/web/content/blog/section-24-pension-contributions-tax-planning.md` reads close to the bar: it speaks to "you", worked examples are concrete, and it gets to the point. (Even it has a couple of "this guide shows/sets out" openers to remove.)

**Anti-pattern (what to kill).** `Property/web/content/blog/double-taxation-agreement-uk-and-isle-of-man.md`, body paragraph 3:
> "This page walks the trap and the architecture that sits behind it. We cover the treaty allocation table for Manx-resident landlords (the page's first concrete artefact, the thing readers can self-identify against), three worked examples..."

Every clause here is meta-commentary or structural talk, and "the page's first concrete artefact" leaked straight out of the internal `editorialNote`. The fix is to delete the paragraph (the two paragraphs above it already state the substance) while preserving its two internal links by re-homing them, and to convert "the landlord" to "you" throughout the body where the landlord is the reader.

**Structural-leak (what to kill).** `commercial-property-fixtures-claim-s198-election-purchase-mechanics.md` ships "Bucket sibling page C5 covers full expensing in detail" and "the fixtures-acquisition cluster generates a recurring set of errors". Internal orchestration vocabulary in published copy. Rewrite as a plain cross-reference or remove.
