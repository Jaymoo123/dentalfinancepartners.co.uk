# Brief U10 — Change SIC Code Companies House Property Company

## Editorial conventions (hard rules, every brief)

- £nnn always. Per cent in prose, % in tables.
- Hyphenated compound modifiers.
- Sentence-case H2s.
- No em-dashes anywhere in the body copy.
- No templated second paragraph ("this guide covers X, not Y, see Z" is banned).
- FAQs must be distinct questions, never restatements of the same query.
- No build narration, no inline citation codes.
- Citations verified against `docs/property/house_positions.md` where a lock exists; else flagged verify-at-write.
- Tables use `<thead>`/`<tbody>`. Asides wrap text in `<p>`.

## 1. Unit facts

- **Type:** NEW blog post, `Property/web/content/blog/change-sic-code-companies-house-property-company.md`.
- **Category:** Incorporation & Company Structures (or SIC/Companies House admin sub-cluster).
- **Priority:** P3.
- **Hub:** sic-companies-house-admin cluster (per page_map cluster label).
- **Questions answered (target):** matches page_map's stated 5 (verify against final draft; page_map row for U10 lists no explicit questions_answered figure captured, treat 5-7 as the working target).
- **Intent:** administrative/action — reader already has a company and wants to fix or update the registered activity.

## 2. Dominant query + full variant list

| Query | Type | Data |
|---|---|---|
| does an spv need to register for vat | — not this page, see U14 seam note below | n/a |
| change sic code companies house | dominant (our-data) | our_queries/demand_corpus signal, mapped to U09's page (`companies-house-reforms`) at pos 56.9, 22 impressions/mo (gsc, property) |
| companies house sic code change | variant | our-data, mapped to same U09/companies-house-reforms page, pos 68.8, 15 impressions/mo |
| companies house change sic code | variant | our-data, pos 58.5, 4 impressions/mo |
| change of sic code companies house | variant | our-data, pos 55.0, 1 impression/mo |
| can i add another sic code | variant | questions_corpus (SIC+Companies House admin bucket) |
| can i add sic code companies house | variant | questions_corpus |
| can i change company sic code | variant | questions_corpus |
| can i change my sic code | variant | questions_corpus |
| can i change sic code | variant | questions_corpus |
| can i change sic code companies house | variant | questions_corpus |
| can i change the sic code of my company | variant | questions_corpus |
| can sic code be changed | variant | questions_corpus |
| can you change sic code | variant | questions_corpus |
| does sic code affect tax | variant | questions_corpus — answer briefly (no), do not build out a tax section |
| does sic code matter | variant | questions_corpus |
| sic code change | variant | our_queries.csv, general (not property-specific) volume context |
| ltd company for buy to let property sic code | variant | questions_corpus (SIC+Companies House admin) |
| can you add sic codes later | variant | questions_corpus — the "additive not replacement" intent, feeds the adding-vs-replacing H2 |
| can i add sic codes to my business | variant | questions_corpus |
| can i have multiple sic codes | variant | questions_corpus — pairs with the four-code limit fact |
| do sic codes change | variant | questions_corpus |
| sic code update | variant | questions_corpus |
| is sic code on tax return / sic code on tax return | variant | questions_corpus — answer alongside "does sic code affect tax"; one sentence, do not open a tax section |
| is sic code important / do sic codes matter | variant | questions_corpus — same one-paragraph treatment as "does sic code matter" |

**Corpus-shape warning that makes seam 5 harder than it looks.** The `sic code` questions_corpus bucket runs to roughly 280 deduped rows and the overwhelming majority are **"which code" queries** (`what should my sic code be`, `which sic code for buy to let`, `what sic code to use for property investment`, `sic code 68209`, `what is sic code 68100`, `sic code property investment`, `sic code real estate`, `what sic codes do banks like`, and dozens of non-property occupational codes). **Every one of those belongs to U09 and none of them may be answered on this page.** The genuinely U10-shaped rows are only the change/add/update phrasings tabled above. The gravitational pull of that bucket toward "here are the codes" is the single biggest drafting risk on this unit, and a writer scanning the corpus for coverage will feel it. The bucket also carries heavy international and off-topic noise (`sic code usa`, `sic code canada`, `sic code kenya`, `sic code zoho crm`, `sic marking qr code`, plus the whole `seed:sic code spv` run of bank BIC/SWIFT codes) which is not demand for anything on this site.

**Critical existing-page finding:** the four highest-signal our-data queries above (`change sic code companies house` and its three close variants) are **currently mapped to `sic-code-for-an-spv-property-company` (U09)**, which is a mortgage-lender-acceptance page, not a how-to-change page. This is real cannibalisation risk if U10 does not clearly out-rank U09 for the "how do I change it" intent while U09 keeps "which code should I use." U10 must own the mechanical change process; U09 already covers which code and why, and briefly touches the confirmation-statement mechanism (see §5).

## 3. Our-data baseline

- `change sic code companies house` — pos 56.9, 22 impressions/mo, currently resolving to U09's `sic-code-for-an-spv-property-company`.
- `companies house sic code change` — pos 68.8, 15 impressions/mo, same resolution.
- `companies house change sic code` — pos 58.5, 4 impressions/mo, same resolution.
- `change of sic code companies house` — pos 55.0, 1 impression/mo, same resolution.
- All four are unranked-to-poor positions (55-69) on a page that is not built to answer the "how" question directly, which is the opportunity: a dedicated how-to page can take this cluster.

## 4. Competitor coverage floor

- https://taxqube.co.uk/best-sic-code-for-youtubers-registering-a-company-in-the-uk/ — competitor SIC-selection content; useful to see the format, but do not copy the "best code for X" selection framing, which is U09's job here.
- gov.uk "Confirmation statement guidance" and the Companies House SIC condensed list — primary sources for the CS01 mechanics; verify current filing routes at write time.
- gov.uk Companies House WebFiling / Find and Update service — the actual filing interface; describe it generically, do not screenshot-narrate a UI that changes.

## 5. Seam warnings — MUST-NOT rules

1. **U10 must NEVER state which SIC code a property company should use.** That is U09's protected territory (`sic-code-for-an-spv-property-company`, PAGE_MAP.md seam 5: "U09 vs U10. Which SIC code (Track B, protected) vs changing it later. U10 must not list codes."). If a worked example needs a code, link to U09 for "which code" and keep the example generic (e.g. "correcting a trading code to a letting code" without asserting the specific digits belong in this page's authority). **Concretely: no five-digit code may appear anywhere in the body, the tables, the FAQ answers or the metadata of this page.** That is the testable form of the rule, and §2's corpus-shape warning explains why it will be tempting to break it.
2. Do not re-explain what a SIC code is or why lenders care (U09 already does this in depth, including the 68209-vs-68100 lender-decline mechanic). One sentence of orientation is enough before moving to the change process.
3. Do not restate U02's incorporation mechanics (IN01, PSC statement, ID verification) beyond the one line needed to note that the SIC code is first set at incorporation.
4. Do not build a VAT or tax-registration section. "Does sic code affect tax" gets one direct "no" answer with a one-line reason; it does not open into a wider tax discussion.

## 6. Facts pack (dated; verify against `docs/property/house_positions.md` where locked, else verify-at-write)

- **SIC codes are changed via the confirmation statement (form CS01)**, filed with Companies House. Two routes exist: update at the annual renewal, or file an updating confirmation statement at any time to correct the codes early. This is corroborated verbatim by the live U09 page's own facts pack (already published, same mechanism), so this is a stable, low-risk fact to restate, not a new claim.
- **No separate fee to change SIC codes.** Companies House charges the standard confirmation-statement fee once per annual payment period; an updating statement filed within a period already paid for carries no further charge (same source as U09's live content).
- **Companies House confirmation statement fee: £50 online/software, £110 paper.** VERIFIED at source 2026-09-02 against the gov.uk "Companies House fees" page (page updated 2 July 2026), which also states the fee applies "with your first statement in the 12 month payment period" — the wording that makes the no-extra-fee point on a second, updating statement in the same period safe to state as fact rather than inference. Consistent with `house_positions.md` §42. This is the annual filing fee, distinct from any one-off cost; state clearly this is not a per-SIC-change charge.
- **Contrast fact worth one line, VERIFIED 2026-09-02 (same fees page): a company NAME change does cost money (£20 online, £30 paper, £85 same day), whereas a SIC-code change costs nothing beyond the confirmation statement already due.** This is a genuinely useful distinction for the "can i change my sic code and my company name at the same time" FAQ already planned in §8: the answer is that they are two different filings on two different forms with two different costs, and only one of them carries a fee. Link to U04 there rather than explaining the name-change rules.
- **A company can hold up to four SIC codes.** Restated from U09's live content; relevant here because "adding another SIC code" (a recurring questions_corpus phrasing) is additive, not a replacement, and does not require removing an existing code.
- **ECCTA 2023 confirmation-statement changes (registered email address + lawful purposes statement)** were introduced from 4 March 2024 per `house_positions.md` §11.A. Mention only if the writer wants to note that a SIC-code-correcting confirmation statement is filed on the same modernised form that also carries these newer requirements; do not build these out, they are U02/U09's existing territory (registered-office and admin pages) not this page's.
- **SIC code does not change how the company is taxed.** Corroborated by U09's live FAQ ("Will changing my SIC code affect my tax?" — No). Use this directly for the "does sic code affect tax" / "does sic code matter" variants, keep the answer to one paragraph.

## 7. Interlink spec (verified against files on disk)

- `/spv-company` (U01 pillar, live route) — **mandatory up-link.**
- `sic-code-for-an-spv-property-company` (U09, live at `Property/web/content/blog/sic-code-for-an-spv-property-company.md`) — **mandatory link, the seam itself.** For "which code should I use," from the intro and from any worked example. This is the protected page; U10 must send this traffic there rather than answering "which code" itself.
- `how-to-set-up-property-investment-company-uk-guide` (U02, live) — one-line link from the "SIC is first set at incorporation" mention.
- `registered-office-address-property-spv` (U06, live at `Property/web/content/blog/registered-office-address-property-spv.md`) — optional light link, since a confirmation-statement filing session is also where a registered-office correction is often made; keep to one line if included.
- `spv-company-name-rules-uk` (U04, once live) — optional light link from the "this is a different filing from changing your company name" note.

## 8. Fresh outline

1. **Intro** — direct answer up top: yes, a SIC code can be changed at any time via the confirmation statement, at no extra fee if within a paid period. State scope in one sentence (how to change it, not which code to pick), no templated second paragraph, link to U09 immediately for the "which code" question.
2. **H2 — How to change your SIC code** — the confirmation-statement (CS01) mechanism, the two routes (renewal vs updating statement filed early), and that no special form or separate application exists.
3. **H2 — Does changing your SIC code cost anything** — the "no separate fee" fact, distinguished from the annual £50/£110 confirmation-statement fee itself (which is due regardless of whether codes change).
4. **H2 — Adding a code vs replacing one** — up to four codes allowed; adding a supporting code (e.g. correcting a trading-only registration to also carry a letting code) does not require removing the original code, though the writer should note that leaving a genuinely wrong primary code in place is what causes lender declines (light touch, points to U09 for the depth).
5. **H2 — Does the SIC code affect tax** — direct "no," one paragraph, citing that SIC is a statistical classification, not a tax-status determinant.
6. **H2 — Timing: when to make the change** — before a mortgage application (link to U09's decline mechanic), at annual renewal if there is no urgency, and the practical note that filing online is normally processed quickly.
7. **H2 — What happens after you file** — the updated codes appear on the public Companies House register once accepted; no further action needed.
8. **FAQ (5-7 questions minimum, aim 10-14 for parity with the wave)** — built from §2's tagged variants plus natural follow-ups: e.g. "can i change my sic code myself or do i need an accountant," "how long does a sic code change take to show on the register," "can i change my sic code and my company name at the same time," "does sic code matter for tax," "can i add a second sic code without removing the first," "what happens if i never update a wrong sic code," "is there a limit to how often i can change my sic code."
