# Editorial QA: rural / landed-estates batch A

Date: 2026-08-21. Four surfaces, four writers. Judged against
`briefs/property/rural-estates/_language_spec.md` §5 (hard rules) and §3 (register prescription),
plus the standing editorial track (cross-page sameness, AI tells, register, persona, UK English,
padding, pipeline leakage). Read-only pass: nothing was edited.

## Verdicts

| Surface | Verdict | Headline reason |
|---|---|---|
| `Property/web/content/blog/inheritance-tax-on-farms.md` | **must_fix** | Persona collision (second Helen in the batch); keyword-permutation prose; shares the batch CTA formula and the "pence in the pound" metaphor |
| `Property/web/content/blog/agricultural-relief-for-inheritance-tax-key-benefits.md` | **must_fix** | Eight keyword permutations of "agricultural relief inheritance tax" used as prose; twin CTA sentence and twin colon-list with the pillar |
| `Property/web/content/blog/iht-april-2026-bpr-apr-cap-property-impact.md` | **must_fix** | Seam: reads as two pages. Couples answered 4x, buy-to-let answered 6x, across two registers. New blocks also duplicate themselves |
| `Property/web/src/app/landed-estates/page.tsx` | **must_fix** | "AIM and other unlisted shares ... 50% in all circumstances" contradicts the batch and the house position; 1 of 8 H2s is a question against spec rule 7; the £1m-is-stale point is made six times |

Measured (body prose, tables and frontmatter excluded, per spec §1 method):

| Surface | Words | "you"/1k | statute/1k | em-dashes | Q-H2 | Spec target |
|---|---|---|---|---|---|---|
| inheritance-tax-on-farms | ~1,610 | **23.6** | **0.0** | 0 | **7/7** | consumer: you 20+, statute 0, 700-1,600 words |
| agricultural-relief | ~3,100 | **24.8** | **1.6** | 0 | 6/12 | adviser: you 6+, statute <=2 |
| cap page (whole) | ~3,780 | 17.2 | 9.3 | 0 | 4/11 | old body protected; NEW blocks measure statute **0.0** |
| landed-estates pillar | ~3,380 | **24.5** | 1.5 (table cells only) | 0 | **1/8** | consumer: Q-headings >= half |

Register and the two hard numeric gates are clean everywhere. Zero em-dashes, zero en-dashes, zero
pricing on any surface. Arithmetic was re-run on every worked figure in the batch (£3,650,000 farm,
£2,400,000 holding, £4m/£4.5m/£3m illustrations, the RNRB taper at £2.4m, the £530,000
counterfactual): all correct and internally consistent. The findings below are register, sameness
and one accuracy contradiction.

---

## (d) PERSONA COLLISION: adjudicated

**Finding P1 (must_fix, `inheritance-tax-on-farms.md`).** Two Helens in one batch, and both are the
sole female owner of the page's worked example.

- `inheritance-tax-on-farms.md:61` "Helen owns Marsh End Farm outright in her own name, with no
  spouse's allowance to add to hers"  (Helen appears 5x, lines 61, 71 x2, 77, 93)
- `agricultural-relief-for-inheritance-tax-key-benefits.md:133` "Helen Whitfield owns a Cotswold
  holding and dies in 2027, a widow, leaving everything to her two children."

The two pages inter-link (`inheritance-tax-on-farms.md:57` links to the APR page;
`agricultural-relief...:129` links back), so a reader crossing between them meets two different
Helens each dying with a farm. `agricultural-relief` is the pre-existing page and holds the
surname, so the **new page renames**.

Proposed replacements (checked against the exclusion list and against the other batch-A/B files,
none of which carry a named persona):

1. **Malcolm Rees** (preferred). Also flips the persona to a widower, which breaks the second half
   of the collision: both current examples are a lone woman dying with a farm. See finding S3.
2. **Judith Crake**
3. **Ruth Pengelly**

Consumer register does not need the surname; first name only is fine on the farms page, so
"Malcolm owns Marsh End Farm outright in his own name" works as a straight swap at line 61 with
pronoun changes at 71, 77 and 93.

**Other persona scan (clear).** No reuse of Yusuf, Lars, Marcus, Bev, Dele, Priya, Farah, Nadia,
Tom, Sunita, Bola, Idris, Dermot, Renata, Callum, Fergal, Rafiq, Orla, Bernadette or Holloway on
any of the four surfaces. The cap page carries "The Singh-estate persona"
(`iht-april-2026...:121`), which is pre-existing old body, does not collide with anything in this
batch, and is left alone. The pillar and the two sibling new files (`farm-tax-uk-guide.md`,
`how-to-avoid-inheritance-tax-on-a-farm.md`) carry no named persona at all.

---

## (a) CROSS-PAGE SAMENESS

**Finding S1 (must_fix, all four surfaces). The closing CTA is the same sentence four times.**
Spec §2 P6 and rule 9 name one model sentence, and every writer has copied its shape rather than
its principle:

- `inheritance-tax-on-farms.md:101` "**We can produce a written** farm inheritance tax position
  **for your family:** the qualifying value, how much of the £2.5 million each of you has left, the
  figure your executors would be facing..."
- `agricultural-relief...:200` "**We can produce a written** IHT agricultural relief view **on your
  holding: what qualifies, what does not,** what your agricultural value is likely to look like..."
- `agricultural-relief...:103` (aside) "**We can produce a written** qualification view **on your
  holding**, asset by asset..."
- `landed-estates/page.tsx:461` "**We can produce a written** view of your allowance position:
  **what qualifies, what does not,** how much headroom is left after gifts already made..."
- `iht-april-2026...:205` "**ask us for a written view of your own position:** what your qualifying
  value is today, how much of your allowance your past gifts have already used..."

Five instances, four surfaces, one template: `We can produce a written [X] view/position [on your
holding / for your family]: [three-item colon list]`. Two of them share the literal string "what
qualifies, what does not". A reader who lands on two of these pages reads the same closing
sentence twice.

*Fix:* keep the template on **one** surface, the pillar (`page.tsx:461`), because that is where the
deliverable belongs. On the other three, name a different deliverable and drop the colon list:
- farms: "Send us the farm's rough value, whose name it is in and anything gifted since October
  2024, and we will tell you what your executors would be facing."
- agricultural-relief:200: "Give us the parcel list and we will tell you which parts of the holding
  the relief actually reaches, and what your farmhouse would need to look like to pass."
- cap:205: "Start with the calculator, then send us your qualifying value and your gift history and
  we will size the exposure."

**Finding S2 (must_fix, farms + cap). Same metaphor, two writers.**
- `inheritance-tax-on-farms.md:49` "20p in the pound on the top slice"
- `iht-april-2026...:181` "Twenty pence in the pound on the excess is the number to carry around"

*Fix (cap, NEW block, so it is in scope):* the cap page has already given the reader three worked
figures in the preceding sentence. Cut the sentence to "and you can size your own position with our
BPR and APR allowance calculator", dropping the pence-in-the-pound restatement entirely. Leave the
farms page holding the metaphor.

**Finding S3 (must_fix, farms + agricultural-relief). Twin worked-example framing.**
Both examples are: one woman, sole owner, dies, family gets a bill, then one variable is changed
and the bill collapses.

- farms 61-77: Helen, sole owner, £3,650,000, bill £230,000, then "Change that one fact in the
  example and the bill disappears... The £230,000 becomes £0."
- agricultural-relief 133-167: Helen Whitfield, widow, £2,400,000, bill £392,000, then "Had it
  passed the character test... the bill from £392,000 down to £112,000."

*Fix:* the persona swap in P1 to a widower covers the gender half. For the framing half, the farms
page should keep the counterfactual (it is the page's whole point: married versus not) and the APR
page should convert its counterfactual into a forward instruction rather than a second
bill-collapse: at `agricultural-relief...:167`, replace "and the bill from £392,000 down to
£112,000. The farmhouse test was worth £280,000 to her children" with a sentence about what her
children could not fix after the death, keeping the £280,000 figure but not the same
before-and-after pair.

**Finding S4 (must_fix, all four). "[Number] [noun]" paragraph openers, one per surface, plus more.**
Spec does not ban them; four writers landing on the identical device does.

- `inheritance-tax-on-farms.md:55` "**Two things** sit outside the pot."
- `inheritance-tax-on-farms.md:99` "**Three things**, in this order."
- `agricultural-relief...:50` "**Two limits** are built into the relief"
- `agricultural-relief...:118` "**Four points** about how it behaves."
- `agricultural-relief...:167` "**Two things** fall out of that."
- `iht-april-2026...:183` "**Two details** change that sum."
- `iht-april-2026...:203` "**Three things** follow for you."
- `landed-estates/page.tsx:248` "**Two things** change that answer quickly."
- (old body, for density context: `iht-april-2026...:72` "Three concrete moves", `:135` "The four
  highest-impact moves")

Eight in the new/reframed copy, and three of them are "Two things ...". This is the single most
visible cross-writer fingerprint in the batch.

*Fix:* keep at most one per surface. Cheapest cuts, all of which are pure deletions:
- farms:55 → "Two things sit outside the pot." becomes "Assets that never qualified..." (the list
  that follows already carries the count).
- agricultural-relief:167 → "Two things fall out of that." becomes "The £2.5 million allowance never
  binds:" (start on the point).
- cap:183 → "Two details change that sum." becomes "Your allowance is not a once-in-a-lifetime
  figure:" (start on the point).
- page.tsx:248 → "Two things change that answer quickly." becomes "If you are married or in a civil
  partnership, the unused part..." (start on the point).

**Finding S5 (must_fix, agricultural-relief + cap). Twin worked-example opener "Say you...".**
- `agricultural-relief...:181` "**Say you** gifted a £4 million farm to a child in November 2024"
- `iht-april-2026...:189` "**Say you** own farmland and buildings worth £3,000,000"

*Fix:* cap page (new block, in scope): "Take a farm worth £3,000,000 that qualifies for relief,
alongside a residential rental portfolio worth £1,000,000 that never did."

**Finding S6 (advisory, farms + agricultural-relief). Twin altText, same last five words.**
- `inheritance-tax-on-farms.md:14` "Farming family **working through** an inheritance tax
  calculation for their farm **at the kitchen table**"
- `agricultural-relief...:10` "UK rural landowner **working through** an agricultural property
  relief qualification check with farmhouse, tenancy paperwork and an IHT414 form **on the kitchen
  table**"

Compounded by the body: `inheritance-tax-on-farms.md:47` "The test is simple enough to run at the
kitchen table." *Fix:* change the APR altText to the setting the page is actually about, e.g.
"...tenancy paperwork and an IHT414 form spread out on a farm office desk".

**Finding S7 (advisory, all four). "One allowance, not two" said four ways.**
farms:53 "One allowance, one pot."; agricultural-relief:122 "It is one allowance, not two.";
cap:179 "not one of each"; cap FAQ (new, line 48) "rather than giving you one of each";
page.tsx:55/345 "One allowance shared by..." / "Mixed estates: one allowance, several claims on it".
Unavoidable at fact level; the duplication inside the cap page's own new blocks (line 48 and line
179, the same four words) is the part worth cutting. See seam finding C4.

---

## (b) AI TELLS

Zero em-dashes, zero en-dashes, zero "it's important to note", "navigate", "unlock", "delve",
"realm", "tapestry", "seamless", "robust" anywhere in the batch. Two hits:

**Finding A1 (advisory, cap, OLD body, not in scope for editing).** "landscape" x2:
`iht-april-2026...:10` altText "...representing the agricultural and business property relief
**landscape** under the April 2026 reform" and `:175` "the 2026 landlord tax **landscape**". Both
pre-date this batch. Logged, not proposed for fix here since the old body is protected; the altText
is frontmatter rather than body and could be changed independently if the owner wants it.

**Finding A2 (must_fix, agricultural-relief). Keyword-lists-as-prose.** Eight permutations of the
target phrase are pushed into sentences as adjectives, in positions where no writer would put them:

- `:42` "Most **agricultural relief inheritance tax** questions come down to that one point"
- `:48` "The effect of **agricultural relief on inheritance tax** is all or nothing parcel by parcel"
- `:50` "the first is that **agricultural inheritance tax relief** only covers the agricultural value"
- `:116` "The **agricultural property relief inheritance tax** rules changed on 6 April 2026."
- `:187` "**IHT agricultural property relief** claims run on two forms."
- `:189` "Every **inheritance tax agricultural relief** claim is decided on evidence created during
  your lifetime"
- `:198` "Your **agricultural relief IHT** position is settled by the qualification walk"
- `:200` "We can produce a written **IHT agricultural relief** view on your holding"

*Fix:* keep two, at `:42` and `:116` (the intro and the reform section, where the phrase is doing
real work). Strip the modifier from the other six: `:48` "The relief is all or nothing parcel by
parcel"; `:50` "the relief only covers the agricultural value"; `:187` "Claims run on two forms";
`:189` "Every claim is decided on evidence created during your lifetime"; `:198` "Your position is
settled by the qualification walk"; `:200` covered by finding S1.

**Finding A3 (must_fix, farms). Same defect, milder, four instances.**
- `:45` "**IHT on farms** carries the same 40% rate and the same nil rate band as IHT on a house in a
  town." (preceded in the same paragraph by "Inheritance tax, or IHT, works on a farm..." so the
  page states the same thing twice in two keyword shapes)
- `:49` "That is the **inheritance tax farmers** actually face from April 2026" (ungrammatical as
  written: "the inheritance tax farmers" reads as a compound noun)
- `:49` "The **farming inheritance tax** changes apply to deaths on or after 6 April 2026"
- `:101` "a written **farm inheritance tax** position for your family"

*Fix:* `:45` cut the second sentence's keyword and merge: "It carries the same 40% rate and the same
nil rate band as inheritance tax on a house in a town." `:49` "That is what farmers actually face
from April 2026". Leave `:49` second instance and `:101` (covered by S1).

**Finding A4 (advisory, cap NEW block). Hedge phrase that flags the seam.**
`:179` "**Strip out the legal language** and the BPR and APR cap comes down to one number and one
rate." This tells the reader the preceding 2,600 words were the legal language. See C1.

---

## (c) REGISTER vs SPEC

**Finding R1 (must_fix, `landed-estates/page.tsx`). 1 of 8 H2s is a question.** Spec rule 7:
consumer pages need at least half of H2s as complete questions in the reader's words. The page is
consumer by every other measure (you/1k 24.5, statute confined to table cells, £2.5m converted to an
effective rate in the hero) but its section titles are labels:

| Line | Current H2 | Reads as |
|---|---|---|
| 225 | "Will your family pay inheritance tax on the farm?" | question, keep |
| 257 | "What is actually in force from April 2026" | statement |
| 306 | "If your estate is rental property, read this before anything else" | instruction |
| 345 | "Mixed estates: one allowance, several claims on it" | label |
| 378 | "What gifts and trusts do to the allowance" | statement |
| 411 | "What we do not cover, and who does" | label, fine as a scope block |
| 442 | "Where to start" | label, fine as a closer |
| 468 | "Farm inheritance tax questions" | keyword label on the FAQ block |

*Fix:* three rewrites gets it to 4 of 8. `:257` "Which rules are actually in force from April
2026?"; `:306` "Does your buy-to-let portfolio qualify for this relief?"; `:378` "How do gifts and
trusts change your allowance?". Optionally `:468` "Questions farming families ask", which is a
phrase rather than a keyword.

**Finding R2 (must_fix, cap NEW block). One H2 is a keyword string, not a question.**
`iht-april-2026...:177` "**APR/BPR changes April 2026:** what the cap costs you in plain English".
The colon-prefixed keyword is the only heading of its shape in the batch, and "in plain English" is
a hedge. *Fix (new block, in scope):* "How much will the cap actually cost your family?"

**Finding R3 (clear).** `inheritance-tax-on-farms.md` hits the consumer targets exactly: 7 of 7 H2s
are complete reader questions, zero statute in prose (the s.124D reference is confined to the FAQ
block at line 35, which spec §1 excludes from prose stats), £2.5m converted to an effective 20% in
the first paragraph, couples figure stated as a single pound number, first sentence answers the
query ("For most family farms, the answer is no."). This is the spec's P1/W7 pattern executed
correctly and it is the best-registered surface in the batch.

**Finding R4 (advisory, agricultural-relief).** Body statute is 1.6/1k against an adviser ceiling of
2, achieved by moving citations into the reference aside at `:191-194`, which is exactly what spec
rule 1 and §3 prescribe. But the 12-entry FAQ block above it still carries s.115(2), s.115(3),
s.116, s.117, s.117(1)(b), ss.115 to 124D, s.124D, s.124D(3), FA 2026 Sch 12 para 4, IHTM24067,
IHT400, IHT414 and two case citations. FAQs render on the page and are the surface Google lifts into
SERP FAQ snippets, so the page's visible statute density is far above what the body measurement
shows. Not a spec breach (spec §1 explicitly excludes FAQs from the count) but worth an owner call
before the family is measured again. Logged, no fix proposed.

---

## SEAM QUALITY: `iht-april-2026-bpr-apr-cap-property-impact.md`

The new work is four H2 blocks (lines 177-205, ~880 words) appended after the old body's closing
link paragraph, plus four FAQ entries appended after the old body's thirteen. Statute density in the
new blocks is **0.0 per 1,000 words** and second person is high, so the new blocks are individually
compliant. The problem is entirely at the join.

**Finding C1 (must_fix). The page reads as two pages.** The old body's last move is a bullet list of
misconceptions and a cross-link paragraph (`:175`). The next line is a keyword-labelled H2 (`:177`)
whose opening clause, "Strip out the legal language" (`:179`), is an explicit acknowledgement that
the register just changed. There is no bridge, and the new blocks never refer to anything above
them.

*Fix, new blocks only:* retitle `:177` per R2 and rewrite the opening clause to bridge from the
reader's position rather than from the page's own prose. Proposed replacement for the first sentence
of `:179`: "If you own a farm or a trading business rather than advise on one, the cap comes down to
one number and one rate." That names the audience switch as deliberate instead of apologising for
the material above it.

**Finding C2 (must_fix). The couples question is answered four times, in two registers.**
- `:36` old FAQ "Does the cap apply per estate or per individual?" (adviser: s.124D, s.124E,
  "the same shape as the transferable nil-rate band")
- `:172` old body bullet "I can transfer the allowance to my spouse like the NRB." (adviser)
- `:50` **new** FAQ "We are a married couple with a farm. Is our allowance really £5 million?"
- `:193-197` **new** H2 "Are you married or in a civil partnership? Your combined position can reach
  £5 million"

*Fix, new blocks only:* delete the new FAQ at `:50`. It sits fourteen entries below the old FAQ that
answers the same question, and its two substantive sentences are reproduced almost verbatim in the
new H2 block below (see C4). The new H2 block is the one worth keeping: it is the consumer-register
answer and it carries the ownership instruction.

**Finding C3 (must_fix). The buy-to-let question is answered six times.**
- `:24` old FAQ "Does the cap affect a pure buy-to-let landlord?"
- `:44` old FAQ "If my BTL portfolio is in a limited company, does the company count as a trading
  business for BPR?"
- `:105-117` old H2 "Who is not affected: pure BTL landlords" (a full section)
- `:168` and `:169` old body bullets ("My BTL portfolio is now caught", "I should just put my BTL in
  a company now")
- `:52` **new** FAQ "I own a farm and some rental flats. Does the APR cap cover both?"
- `:185-191` **new** H2 "You farm and you let property: how does the cap treat each part?"

*Fix, new blocks only:* delete the new FAQ at `:52` (it duplicates old FAQ `:24` plus old FAQ `:44`
in consumer wording), and cut the second paragraph of the new H2 block at `:191` down to its
genuinely new half. The sentences "moving it into a company will not change that" and "letting homes
has always counted as investment rather than trading" are the sixth and fifth statements of the same
fact on one page. What survives, and what the old body never says, is the split arithmetic in `:189`
(farm side uses the allowance, rental side does not) and the triage line "If your wealth is mostly
rental property, this reform is not the thing to worry about". Keep those, drop the rest.

**Finding C4 (must_fix). The new blocks duplicate themselves.** The four new FAQs are paraphrases
of the four new H2 blocks, near-verbatim in two places:

- `:50` (FAQ) "Treat that as the **best available outcome rather than an automatic one**. How the
  allowance sits between you depends on who owns what and on the order of the two deaths, so **if
  everything qualifying is in one name, that is the first thing to** get reviewed."
- `:195-197` (body) "It describes the **best available outcome** for a couple, **not an automatic
  one**, and how the allowance sits between the two of you turns on who owns what and on the order
  of the two deaths. **If everything qualifying is in one name, that is the first thing to** look
  at."

Also `:48` (FAQ) "it is one allowance covering both reliefs together rather than giving you one of
each" against `:179` (body) "it is one allowance covering farming and business value together, not
one of each".

*Fix:* deleting the FAQs at `:50` and `:52` per C2 and C3 removes the worst of it. Of the two
remaining new FAQs, `:48` is the only one that adds something the body does not already say in the
same words, and `:54` (gifts) is safe because the corresponding body block at `:199-203` is written
from a different angle. Recommend keeping `:48` and `:54`, deleting `:50` and `:52`.

**Finding C5 (advisory). Where the new FAQs sit makes the register flip visible.** With `:50` and
`:52` deleted the FAQ list still runs thirteen adviser-register entries (s.124D, s.124G to s.124K,
IHTM25000, Pawson, s.18, s.58 TCGA) and then flips to two consumer entries at the bottom. Reordering
would touch the old block, so it is out of scope for this pass. Logged as an owner call.

**Not a seam problem (positive).** The new blocks introduce **zero** new statute references, **zero**
new £1m mentions, and repeat none of the old body's case-law citations. The register discipline
inside the new blocks is good. The failure is duplication and the missing bridge, not the prose.

---

## (e) UK ENGLISH, PRICING

**Finding U1 (advisory, cap, OLD body).** `iht-april-2026...:102` "We work alongside specialist
estate-planning **advisors** for the detailed work." US spelling; UK house style is "advisers", and
the pillar uses "advisers" correctly at `page.tsx:435`. Pre-existing old body, so flagged rather
than fixed here.

Everything else is clean: "recognised", "specialised", "utilise" absent, "practise/practice" not
misused, no "program", no Oxford-comma drift. **No pricing on any of the four surfaces.** The pillar
CTA says "Book a free consultation" (`page.tsx:485`), which is the sitewide offer and not a price.

---

## (f) THIN, PADDED, OR LEAKED

**Finding T1 (must_fix, pillar). The £1m-is-stale point is made six times on one page.**
`page.tsx:13` (metaDescription), `:201` (hero), `:274` (section intro), `:91-94` (table row 8),
`:299-300` (footnote under the table), `:125-127` (FAQ 6), and a seventh echo at `:458` ("the
numbers you were given at the time were almost certainly based on the announcement figure").

The differentiator is real and worth stating; stating it seven times makes the page look defensive.
*Fix:* keep the hero line (`:201`), the table row (`:91-94`, which is the ledger's job) and the FAQ
(`:125-127`, which is the query). Cut the section intro at `:274` to its second half ("the single
most useful thing on this page is a plain statement of the rules that are law today") and delete the
footnote at `:298-301` entirely, which currently repeats the table row directly beneath the table
row.

**Finding T2 (must_fix, pillar). Substantive contradiction on unlisted shares.**
- `page.tsx:73-76` table row: "**AIM and other unlisted shares: 50% sub-tier** ... Relief on these
  shares drops from 100% to 50% **in all circumstances**"
- `page.tsx:365-366` body: "**Unlisted shares** are the exception worth knowing. Relief on them has
  dropped to 50%"

The house position (`docs/property/house_positions.md:512`) and the other three surfaces all frame
this as shares **designated as not listed on the markets of recognised stock exchanges, such as
AIM**, which is a quoted-but-not-listed category. An ordinary private trading company's shares are
also unlisted, and they keep 100% relief within the £2.5m allowance. As written, the pillar tells a
farming family that owns a trading company that their shares drop to 50%, which contradicts the same
page's own table row 1 ("Farmland and the trading business draw on the same £2.5 million") and
contradicts `iht-april-2026...:30` and `agricultural-relief...:124`.

*Fix:* `:73` row label to "AIM shares and other 'not listed' quoted shares: 50% sub-tier"; `:76`
drop "in all circumstances"; `:365` to "Shares designated as not listed on a recognised stock
exchange, AIM holdings in practice, are the exception worth knowing." This is the only accuracy
finding in the batch and it is the reason the pillar is must_fix rather than advisory.

**Finding T3 (advisory, pillar). Third statement of the company-wrapper point.** `page.tsx:369-372`
("If you hold the estate through a company or a family investment company, the relief position
follows the underlying activity rather than the wrapper") repeats `:322-328` (the landlords section)
and the FAQ at `:120-122`. *Fix:* delete the paragraph at `:369-372`; the FIC link in the section
below already carries the reader to the depth.

**Finding T4 (clear). No pipeline-artefact leakage in rendered copy.** Scanned all four surfaces for
"verify at build", "(HP\d)", "TODO", "TK", "Wave n", "F-10n", bracket-link syntax and reviewer
notes:
- `iht-april-2026...:59` carries `editorialNote:` in frontmatter ("Wave 2 A4 (IHT)... Post-F-102
  quantum correction"). Confirmed **not rendered**: no reference to `editorialNote` anywhere in
  `Property/web/src/`. Internal only, no action needed.
- `page.tsx:39-46` carries an `F-102` reference and "Do not guess these" inside code comments.
  Compiled out, not user-facing, and the comment at `:45` ("Statute citations belong in these cells,
  not in the prose above them") is a useful maintenance guard. Leave it.
- The previous version of `agricultural-relief` leaked a real artefact into a rendered FAQ ("The
  Wave 2 A10 brief contained a 5-year erratum"). **The reframe removed it.** Confirmed gone.

**Finding T5 (clear). No thin sections.** Every H2 on every surface carries at least two substantive
paragraphs or a table. `page.tsx:411-438` ("What we do not cover, and who does") is the shortest and
is the most useful block on the pillar: it is the only place in the batch that names the boundary of
the service, and it is the spec's P5 behaviour done correctly.

---

## Summary of proposed fixes, by surface

**`inheritance-tax-on-farms.md` (must_fix)**
1. Rename Helen to Malcolm (preferred) or Judith Crake / Ruth Pengelly; lines 61, 71, 77, 93. [P1]
2. Rewrite the CTA at `:101` off the shared template. [S1]
3. Strip the keyword modifiers at `:45` and `:49`. [A3]
4. Delete the numeric opener at `:55`. [S4]
5. Change nothing else. Register, question headings, arithmetic and answer-first opening are the
   batch's best.

**`agricultural-relief-for-inheritance-tax-key-benefits.md` (must_fix)**
1. Strip six of the eight keyword permutations: `:48`, `:50`, `:187`, `:189`, `:198`, `:200`. [A2]
2. Rewrite the CTA at `:200` and the aside CTA at `:103` off the shared template. [S1]
3. Delete the numeric opener at `:167`. [S4]
4. Rewrite the counterfactual close at `:167` so it is not a second bill-collapse. [S3]
5. Change the altText at `:10` off "kitchen table". [S6]
6. Keeps Helen Whitfield. [P1]

**`iht-april-2026-bpr-apr-cap-property-impact.md` (must_fix, NEW blocks only)**
1. Retitle the H2 at `:177` to a reader question. [R2]
2. Rewrite the opening clause at `:179` as a bridge. [C1, A4]
3. Delete the new FAQ at `:50` (couples, duplicates `:36`). [C2, C4]
4. Delete the new FAQ at `:52` (farm plus rentals, duplicates `:24` and `:44`). [C3]
5. Cut the duplicated half of `:191`. [C3]
6. Delete the pence-in-the-pound sentence at `:181`. [S2]
7. Delete the numeric opener at `:183`. [S4]
8. Rewrite "Say you own..." at `:189`. [S5]
9. Rewrite the CTA at `:205` off the shared template. [S1]
10. Old body untouched. `advisors` at `:102` and `landscape` at `:10`/`:175` logged, not fixed.

**`landed-estates/page.tsx` (must_fix)**
1. Fix the unlisted-shares wording at `:73`, `:76` and `:365`. [T2] Highest priority in the batch.
2. Three H2s to questions: `:257`, `:306`, `:378`. [R1]
3. Cut the £1m repetition: trim `:274`, delete the footnote at `:298-301`. [T1]
4. Delete the company-wrapper paragraph at `:369-372`. [T3]
5. Delete the numeric opener at `:248`. [S4]
6. Keeps the CTA template at `:461` (it is the one surface that should have it). [S1]
