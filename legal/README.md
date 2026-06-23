# Property Tax Partners - Lead Generation & Data Sharing Agreement (draft pack)

First-draft contract pack for the exclusive lead arrangement between **Ashfield Trading Limited** (trading as Property Tax Partners) and **DJH Business Advisers Limited**. Drafted as an aid, in British English, under the law of **England and Wales**. **Not legal advice** - have a qualified solicitor and a data protection specialist review before signing.

## Contents

| File | What it is |
|---|---|
| **Lead_Generation_and_Data_Sharing_Agreement_FOR_SIGNATURE.docx** | **The operative signing copy for DocuSign / Word — send this to DJH.** Lean version (~13-14pp): comments stripped, figures finalised, optional extras condensed, only genuine signing blanks left (date, DJH signatory, DJH inbox/email). Built from the `_FOR_SIGNATURE.md` source. |
| **Lead_Generation_and_Data_Sharing_Agreement_FOR_SIGNATURE.md** | Markdown source of the lean signing copy (edit this, then rebuild the .docx). This is the authoritative version of the terms. |
| **build_signing_docx.py** | Rebuilds the signing-copy `.docx` from the `.md` using python-docx (no pandoc needed). After editing the `.md`, run `python build_signing_docx.py` in this folder. Matches the original look (US Letter, Calibri 11, Heading 1/2 styles, the three tables, page breaks before each Schedule). `*.bak-YYYY-MM-DD` files are pre-edit backups. |
| **[Lead_Generation_and_Data_Sharing_Agreement.md](Lead_Generation_and_Data_Sharing_Agreement.md)** | The **long-form annotated reference** with full `<!-- LAW: -->` legal-reasoning comments — internal only, NOT for sending. It is more verbose and carries a few optional clauses the lean signing copy condenses or drops (see Review Checklist Part I); rely on the lean version for the actual terms. |
| **[Plain_English_Summary.md](Plain_English_Summary.md)** | One-page plain-English summary of the key terms. |
| **[Review_Checklist_and_Placeholders.md](Review_Checklist_and_Placeholders.md)** | What to have a professional review (prioritised), plus a checklist of every `[PLACEHOLDER]` to complete. |
| **[Questions_for_Supplier.md](Questions_for_Supplier.md)** | What I still need from you to finish the draft. |

## Legal grounding (researched 20 June 2026)
- **UK GDPR + Data Protection Act 2018**, as amended by the **Data (Use and Access) Act 2025** (main provisions in force 5 Feb 2026; new controller complaints-handling duty in force 19 June 2026). **PECR 2003** for electronic marketing.
- **ICO Data Sharing Code of Practice** (s.121 DPA 2018) - controller-to-controller sharing.
- **Data Protection (Charges and Information) Regulations 2018** - ICO registration fee.
- **Late Payment of Commercial Debts (Interest) Act 1998** - interest and fixed compensation.
- **Unfair Contract Terms Act 1977** - B2B limitation/exclusion enforceability.
- **Companies House** register checked for DJH (no. 03451690): Active; incorporated 17 Oct 1997; registered office confirmed; formerly Mitten Clarke Limited / DJH Mitten Clarke Limited.

This is **draft v2**, revised after a five-lens adversarial legal review (data protection, UCTA/enforceability, internal consistency, commercial balance, completeness). See Review Checklist Part C for what changed.

## Three things to decide first
1. **Lawful basis for the share (the biggest call):** consent vs "necessary to act on the enquiry" (Art 6(1)(b)/(f)). Left as a documented choice for your DP adviser in Schedule 2, para 3, with frozen wording to settle in Annex B. See Review Checklist Part A, item 1.
2. **Liability cap:** drafted as a **mutual** cap at "greater of £floor or **12 months'** fees" rather than the 3 months you mentioned (a 3-month, one-way cap risks being struck down under UCTA, leaving you *uncapped*). Plus set the £ floor, super-cap and insurance limit together. See Review Checklist Part A, item 3.
3. **Your entity details:** likely Ashfield Trading Ltd (16358723) trading as Property Tax Partners - confirm so I can fill the party block, plus your ICO registration number.
