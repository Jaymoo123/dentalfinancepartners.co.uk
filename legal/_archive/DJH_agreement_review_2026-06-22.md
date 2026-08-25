# Review of DJH's "Data Sharing Agreement - DJHMC v1"

*Reviewed 22 June 2026, for Junayd (Ashfield Trading Limited, t/a Property Tax Partners). Plain-English internal review of the data-sharing agreement DJH sent on 22 June 2026. Not legal advice; have a solicitor confirm before signing anything. Source document extracted to `DJH_Data_Sharing_Agreement_v1.extracted.txt`.*

## Bottom line

**Do not sign DJH's template as it stands.** It is DJH's own internal, intra-group, EEA-era data-sharing template (dated December 2023), not a document written for an outside supplier. You are not named in it, it is internally contradictory on the one point that matters most to you (controller vs processor), it contains an **uncapped indemnity with no liability cap at all**, and its "entire agreement" clause could be argued to override the protections in your own agreement if you sign both.

**Recommended path:** propose that DJH sign **your** agreement instead. Your Schedule 2 is already a complete, UK-current, controller-to-controller data-protection layer purpose-built for this exact deal, so it does the job their template is meant to do, but properly. That single move removes almost every problem below. If DJH's compliance team insist on their own paper, it is usable only after the redlines in the last section, plus an order-of-precedence clause.

## What their document actually is

- It is a **generic intra-group template** for the DJH Mitten Clarke group ("DJHMC") to share data **between its own companies**. Annex A lists the same ~20 DJH/Mitten Clarke/DTE group entities as **both** the "Data Discloser" and the "Data Receiver", plus a catch-all sweeping in any future-acquired group company. One DJH person (Scott Heath) signs for all disclosers and another (James Beardmore) for all receivers.
- **You appear nowhere in it.** There is no slot for an outside party. Signed as-is, you would either not be a party at all (so it does nothing for the deal) or, if bolted into Annex A, be dropped into a 20-company data pool, which is not what you are doing.
- It is **framed around the EEA** and around intra-group purposes ("to assist Group companies", "contracts of employment"), neither of which describes selling property-tax leads to one firm.
- Helpfully, it says up front it is **"free-standing" and carries no commercial terms**, which fits the plan of keeping the commercials in a separate document. But see the supersession trap below: "free-standing" cuts both ways.

## What is fair / reasonable in it

To be balanced, the bones are a recognisable, standard ICO-style data-sharing template, and several clauses are genuinely mutual and fine in principle: ICO-registration obligations, mutual assistance with data-subject requests, security and staff-training duties (in principle), breach cooperation, a no-partnership clause, and England-and-Wales governing law. So your instinct that this kind of agreement is necessarily substantial was right, theirs is substantial too. The problem is not that it is long; it is that it is the **wrong template**, tilted to the receiver, and out of date.

## The serious problems (every one of these was independently double-checked and held up)

1. **Processor contamination (the biggest legal issue).** Although one clause calls it controller-to-controller, the **core "Personal Data" definition** is lifted from a *processor* template: data "processed by the Processor on behalf of the Controller". Because that is a defined term used throughout, it pulls the whole deal toward an "on behalf of" (processor) footing. Worse, **clauses 15 and 25 point to a "separate Data Processing Agreement"** you have never seen. This is the exact opposite of the independent controller-to-controller status that protects you, and it would bind you to terms in a document you have not read.

2. **Uncapped indemnity and no liability cap anywhere (the biggest commercial risk).** Clause 44 is a mutual indemnity for breach of **any** provision, and there is **no monetary cap anywhere in the document**. Clause 47 only excludes indirect-loss types (lost profit, goodwill, etc.); direct losses, including data-protection fines, claims and remediation, are fully exposed. This is precisely the unlimited exposure your own agreement was hardened to avoid (your £10,000 / 12-month cap, your £100,000 data-protection super-cap, and your explicit "there are no uncapped indemnities"). Clause 45 also gives the indemnifying side **sole control** of settling a claim, even one affecting your own regulatory standing.

3. **No clean hand-off; instead "return the data on termination" (clause 22).** Your agreement's clause 8.5 makes DJH responsible once a lead lands with them. Their clause 22 does the reverse: the receiver must return or destroy the data on termination, which is processor-style language implying you keep residual control of (and responsibility for) data after it has left you.

4. **Open-ended audit and subjective termination (clause 36).** DJH could inspect your whole operation, with no notice, frequency, confidentiality or cost limits, and terminate simply "where it considers" you non-compliant. Your own agreement gives DJH only a narrow, capped audit (twice a year, on notice, confidential, limited scope).

5. **EEA framing (Background, clauses 24, 26, 42).** Wrong for a UK-only deal post-Brexit, and actually **looser** than UK law requires: it would permit shipping lead data anywhere in the EEA, whereas your position is UK-only with an Article 44 to 49 mechanism for any restricted transfer.

6. **Over-broad data scope and wrong purpose.** Clause 11 authorises sharing bank statements, payroll, date of birth and full financial history, far beyond your name + email/phone + optional message, and breaches data minimisation if applied to your flow. The stated purposes (client engagements, employment contracts, assisting group companies) misdescribe what you actually do.

7. **The structural landmine: entire-agreement / supersession (clauses 52 to 54).** It says it "supersedes and extinguishes all previous agreements relating to its subject matter", with no carve-out for your agreement. Both documents claim to be the entire agreement, so if you sign both, DJH could argue this weaker template overrides the data-protection protections in **yours** (clean hand-off, caps, controller-to-controller status). This must be resolved before any signature.

8. **It is also stale and sloppy.** It pre-dates the Data (Use and Access) Act 2025 your agreement is built on; its internal cross-references point to clause numbers that do not exist (a mangled conversion); it cites the Sale of Goods Act (a recycled goods-supply template); and it has typos. You should not sign a document whose own cross-references do not resolve.

## How it compares with your agreement

Your lean agreement is the better and more current instrument on every axis that matters: it is genuinely controller-to-controller with a clean hand-off, it is UK-only and current with the 2025 Act, it caps liability and indemnities, it names the two real parties and a one-way flow to DJH Business Advisers Limited, and it already contains a full data-protection Schedule 2 **plus** all the commercial terms. In other words, **you already hold the document that does both jobs.**

## Recommended path

**Primary (cleanest): your agreement governs both layers.** Reply that you have reviewed their template, that your own agreement already contains a complete controller-to-controller data-sharing schedule tailored to this arrangement and current with the Data (Use and Access) Act 2025, and that you propose using yours for both the data-protection and the commercial terms. This sidesteps the processor framing, the uncapped indemnity, the EEA issue and the supersession conflict in one move.

**Fallback (if DJH insist on their own paper for the data layer):** it can only be signed after these changes, and only alongside an order-of-precedence clause:
1. **Parties:** name only Ashfield Trading Limited (16358723) as Data Discloser and DJH Business Advisers Limited (03451690) as the sole Data Receiver, one-way. Delete the Group-Companies / Annex A construct, the "any companies acquired" catch-all, the intra-group purpose recitals, and the "for and on behalf of all Annex A" signature block.
2. **"Personal Data" definition:** remove "processed by the Processor on behalf of the Controller"; define it as data shared between the parties as **independent controllers**. Neutralise the "Processor" definition.
3. **Delete the "separate Data Processing Agreement" references** (clauses 15 and 25). No Article 28 hook; each party is responsible for its own lawful basis and its own processors.
4. **Add a clean hand-off** equivalent to your clause 8.5, and replace clause 22's "return on termination" with each party deleting what it no longer needs as its own controller.
5. **Cap the indemnity and add liability caps:** make clause 44 fault-based and subject to a mutual aggregate cap (greater of £10,000 or 12 months' charges) and a data-protection super-cap (greater of £100,000 or insurance); remove "sole control" of settlement for claims affecting the other's regulatory standing.
6. **Constrain the clause 36 audit** to your clause 6.6 terms (notice, twice a year, confidential, scoped, cost allocation), and replace subjective termination with objective material-breach-and-cure.
7. **Replace "EEA" with "United Kingdom"** throughout; restrict transfers to the UK with an Article 44 to 49 mechanism.
8. **Narrow the data categories** to name + email/phone + optional message, and restate the purpose as responding to the property-tax enquiry; set lawful basis to legitimate interests; set retention to 3-month supplier deletion + 24-month delivery log.
9. **Order of precedence:** state that your agreement (and its Schedule 2) prevails on data-protection matters and that neither agreement supersedes the other; carve your agreement out of their entire-agreement clause.
10. **Fix the broken cross-references and typos** before signature.

## The "separate commercial-terms document" you mentioned

Good news: you do not need to build one from scratch. **Your existing lean agreement already is it.** It carries every commercial term their template lacks (the £85, billable-on-delivery, qualifying-lead definition, the 3-day rejection/credits, monthly billing + Lead Statement, 14-day payment, late-payment interest, exclusivity + payment-conditional suspension, IP, non-circumvention, insurance, term + termination, and the caps), as well as a full data-protection Schedule 2. So the question is presentation, not drafting: either your agreement governs everything (primary path), or, if their data paper is used, your agreement becomes the "commercial" document and is cross-referenced so the two read together without conflict.

## Update (22 June 2026): improvements folded into our agreement from DJH's paper

Route chosen: yours governs both layers. Before that, we mined DJH's template constructively for anything genuinely useful that ours lacked, and folded the worthwhile items in. Nothing in ours was weakened. Changes made to the signing copy (and the `.docx` rebuilt):

- **Group dimension (the main one).** DJH operates as a ~20-company group and their template assumes intra-group sharing, so ours now addresses the reality that DJH may handle the Lead Data within its group, while keeping DJH Business Advisers Limited as the single contracting and responsible counterparty: a new defined term "DJH Group" (clause 1.1); a new clause 8.6 (the Client may share within the DJH Group as receiving Controller for the Permitted Purpose, but remains solely answerable to you for it as if its own act, and no other group entity becomes a party or increases your liability); and matching lines in Schedule 2 paragraphs 1 and 5(c), the Annex A "Direction" row, and the enquirer-facing wording in Annex B.1 and B.3 so the transparency notice stays accurate. This is more protective than DJH's own model (you face one liable counterparty, not 20).
- **ICO registration de-gated from signing.** DJH's template only requires registration as an obligation and hardcodes no numbers, so ours now does the same: clause 10.2 states registration is a warranty and continuing obligation, not a condition of signing, with the reference provided on request and registration completed before the first Delivery; Schedule 1 and Schedule 2 paragraph 2 align. You can sign now; your ICO registration just needs to be live before the first lead is delivered, so the pending registration is no longer a bottleneck.
- **Single point of contact.** Schedule 2 paragraph 2 now designates each party's Schedule 1 data-protection contact as the single channel for breach notice, data-subject requests and complaints, which reduces the risk of a notice going to the wrong place and a deadline being missed.
- **Deliberately skipped:** DJH's "make a copy of the agreement available to data subjects on request" clause. Our privacy-notice transparency already discharges that duty, and handing enquirers contract extracts is unnecessary and cuts against confidentiality. Everything else in their template is already matched or beaten by ours.

One small thing to confirm with DJH at go-live (not a blocker): that "may share within its group" matches what their own published privacy policy says, so the two notices are consistent.
