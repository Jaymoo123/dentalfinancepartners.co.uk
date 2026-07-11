---
slug: charity-commission-annual-return-guide
tier: blog
route: /blog/charity-commission-annual-return-guide
intent: DIY-MIXED per LAUNCH_CORE (annual returns/filings cluster). Trustees filing themselves; capture edge where the over-£25,000 tier drags accounts and the trustee annual report into the filing.
---
# Charity Commission Annual Return: What to File, When, and at Which Income Tier

## Target queries (evidence: LAUNCH_CORE.md / TOPICS.md, DataForSEO UK 2826, fetched 2026-07-11)

- **Primary:** "charity commission annual return" 1,000/0
- Secondary: "charity annual return" 170/15
- Secondary: "trustee annual report" 140/0 (mainly owned by trustees-annual-report-guide; this page covers only the "attach it over £25,000" rule and links out)

## Search-intent class + play

DIY-MIXED. Trustees of small charities file the return themselves; the tiering confusion ("do I just report income and spending, or the whole accounts pack?") is the content win. Play: BLUF answer box on the deadline and the tiers, a definitive tier table, step-by-step filing walkthrough, then capture where the pain starts: over £25,000 the return drags in the trustee annual report and externally scrutinised accounts, which is exactly the site's accounts and independent examination service lane.

**Cannibalisation split:** this page owns the RETURN (the Commission filing). trustees-annual-report-guide owns the REPORT (the document). services-charity-accounts owns accounts preparation. Cover each neighbour in one paragraph and link.

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- **gov.uk** ("Prepare a charity annual return"): owns the SERP; accurate but dry, no tier table at a glance, no worked scenarios. Beat on the consolidated tier table + deadline examples + what-happens-if-late coverage.
- **charityaccountants.co.uk** (primary rival #1, most visible domain in the sweep): meta lists Commission compliance among its services; expect a thin blog treatment. Beat on depth.

## Required structure

H2 skeleton:
1. What the annual return is and when it is due (BLUF answer box: within 10 months of financial year end)
2. The three income tiers and what each must file (the core table)
3. Under £10,000: income and spending only
4. £10,000 to £25,000: answering the annual return questions
5. Over £25,000: attaching the trustee annual report and accounts
6. How to file: the Commission's online service, step by step
7. What happens if you file late (public register consequences)
8. Annual return vs annual report vs accounts: untangling the names
9. Getting the whole year-end pack done together (capture)

FAQ candidates:
- When is the charity annual return due?
- Do all charities have to file an annual return?
- What does a charity under £10,000 have to file?
- At what income do charity accounts have to be sent to the Commission?
- Is the annual return the same as the trustees' annual report?
- What happens if a charity files its annual return late?
- Do CIOs file an annual return?
- Does the annual return appear on the public register?
- Do excepted or exempt charities file annual returns?
- Can an accountant file the annual return for us?

Table/chart opportunities:
- Tier table: income band, what is filed, external scrutiny interaction (cross-reference the £25,000 IE gate)
- Deadline examples table: year end date, filing deadline (10 months later)

Calculator embed: none directly; consider a signpost to /embed/ie-vs-audit-checker in the over-£25,000 section since that tier is also the external-scrutiny gate.

Internal links (launch core): trustees-annual-report-guide (the report itself), services-charity-accounts (accounts prep), services-independent-examination (scrutiny over £25,000), pillar-set-up-a-charity-cio (registration context, CIOs always registered), pillar-audit-vs-independent-examination.

## House positions touched

- **HP 2:** "All registered charities must submit an annual return, with tiered content: under £10,000 income they report income and spending only; £10,000 to £25,000 they answer the annual return questions; over £25,000 they must also attach the trustee annual report and accounts. Deadline: within 10 months of financial year end. (The outline's shorthand 'required over £10,000' undersold this: everyone files something; the £10,000 gate changes what is filed.)" Citation: https://www.gov.uk/guidance/prepare-a-charity-annual-return (verified 2026-07-11: tiering + "within 10 months of the end of your financial year").
- **HP 9:** "Charity details (name, address, trustees, work, finances) are publicly searchable; charities under £5,000 income, excepted and exempt charities are not on the register." Citation: https://www.gov.uk/find-charity-information (verified 2026-07-11).
- **HP 3** (cross-reference at the over-£25,000 tier): "Once gross income exceeds £25,000, trustees must arrange external scrutiny: an independent examination or an audit." Citation: https://www.gov.uk/government/publications/independent-examination-of-charity-accounts-trustees-cc31 (verified 2026-07-11).
- **HP 1** (registration context): "A charity based in England or Wales must register with the Charity Commission once its income exceeds £5,000 per year. A charitable incorporated organisation (CIO) must register whatever its income." Citation: https://www.gov.uk/guidance/how-to-register-your-charity-cc21b (verified 2026-07-11).
- Consistency rules: thresholds in positions 1-6 are the single source of truth; every scrutiny/filing figure links its gov.uk page. E&W default, Scotland flagged (HP 26).

## Hallucination danger zones

- "Everyone files something": do not repeat the common error that returns are only required over £10,000; the £10,000 gate changes WHAT is filed, not WHETHER (explicit HP 2 note).
- Late-filing consequences: the HP doc locks no penalty figures; describe the public "overdue" marking only if verified at Stage 2, no invented fines.
- Scotland trap: OSCR annual returns are a different regime (HP 26); flag explicitly, never blend thresholds.
- Do not invent the current year's annual-return question set; reference and link the gov.uk question list at Stage 2.

## Stage 2 TODO

- WebFetch gov.uk prepare-a-charity-annual-return; confirm tiering text unchanged and extract the current question-set link.
- Verify what the register shows for overdue filers before writing the late-filing section.
- Fetch charityaccountants.co.uk for a competing return guide; extract H2 set.
