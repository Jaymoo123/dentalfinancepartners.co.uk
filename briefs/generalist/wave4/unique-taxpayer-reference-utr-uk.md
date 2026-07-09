# Brief: Unique Taxpayer Reference (UTR) -- what it is and how to find it

**Pick ID:** A7
**Slug:** `unique-taxpayer-reference-utr-uk`
**Branch / wave:** wave4 bucket A
**Category:** Sole Trader and Self Employment
**Target word count (body):** 2,800 -- 3,200 (non-pillar)
**Meta title (≤62 chars):** `Unique Taxpayer Reference (UTR): what it is and how to find it`
**Meta description (≤158 chars):** `Your UTR is a 10-digit tax reference from HMRC. Learn what it is, where to find it, what to do if you lose it, and when each type of UTR applies.`

---

## Collision-verify clearance (BINDING)

Per `wave4_collision_verify.md` A7: THIN CLEARANCE. Coverage boundary:

- **In scope:** personal vs company vs partnership UTR; the 10-digit format; where each UTR appears; lost-UTR recovery; when a UTR is needed (Self Assessment, CIS, mortgage evidence, agent authorisation).
- **Out of scope / link instead:** the process of registering as self-employed and being issued a UTR in that flow -- **link to** `/blog/how-to-register-as-self-employed-uk` for issuance; registering a limited company -- link to `/blog/how-to-register-a-limited-company-uk-with-a-protected-business-name`.

---

## Competitor URL liveness

| URL | Status | Action |
|---|---|---|
| `https://www.crunch.co.uk/knowledge/what-is-a-unique-taxpayer-reference-utr` | HTTP 404 | DROP |
| `https://countingup.com/resources/how-to-find-and-use-your-company-utr-number/` | HTTP 404 | DROP |

Both competitor URLs are dead. No live competitor source to replicate structure from. Brief is built from primary sources (gov.uk) and house positions.

**Live URL count used in brief: 0 external competitor URLs.**

---

## Primary sources verified (gov.uk)

- `https://www.gov.uk/find-utr-number` -- confirmed live. Key facts:
  - A UTR is a 10-digit number issued by HMRC.
  - Issued on: registering for Self Assessment OR setting up a limited company.
  - Individuals find it via: (1) personal tax account, (2) HMRC app, (3) previous HMRC documents (tax returns, filing notices, payment reminders).
  - Organisations (partnerships, trusts): check previous tax returns and other HMRC documents; if not found, contact HMRC Self Assessment team.
  - Companies: request the corporation tax UTR online via HMRC portal; HMRC sends it to the Companies House registered address.
  - Lost UTR: contact HMRC Self Assessment helpline.
  - Typically arrives by post within 15 days of registration (longer for overseas residents).

---

## House-position anchors

No new HP entries are required for this page. The UTR is a reference-number concept rather than a rate/threshold. Relevant existing positions:

- **§2 (SA obligations):** sole trader/partner registers for Self Assessment and gets a UTR in that flow; link back to the registration page per collision clearance.
- **§2.B (SA deadlines):** CIS and SA filing contexts where the UTR is required are framed correctly in HP.
- **§1 (structures):** the three-way split (sole trader / partnership / company) maps directly onto the three UTR types this page covers.

No HOUSE_POSITION_EXTENSION flag required.

---

## Page architecture

### H1

`Unique Taxpayer Reference (UTR): what it is and how to find it`

### Introduction (~120 words)

Open with the reader's situation: they have been asked for a UTR by their accountant, a mortgage broker, a CIS contractor, or HMRC -- and they do not know what it is or where to find it. Signal that the answer depends on their situation: a sole trader has a personal UTR, a limited company has a separate corporation tax UTR, and a partnership has its own UTR alongside each partner's individual one. State that this page covers all three types, how to locate each, what to do if the number is lost, and when HMRC actually requires it. No em-dashes.

---

### H2: What is a Unique Taxpayer Reference (UTR)?

- A UTR is a 10-digit reference number that HMRC uses to identify a taxpayer -- an individual, a business, or a company -- for tax purposes.
- It may also appear on correspondence as simply "tax reference" or "UTR number".
- It is NOT the same as a National Insurance number (for individuals), a VAT registration number, a Companies House registration number, or a PAYE reference. Each serves a different administrative function. State this plainly; the confusion is very common.
- Sole traders and partners receive a **personal UTR** when they register for Self Assessment.
- A limited company receives a **corporation tax UTR** when it registers with HMRC for corporation tax (triggered automatically when a company is incorporated at Companies House -- HMRC writes to the registered office within a few weeks of incorporation).
- A partnership (general partnership or LLP) receives its own **partnership UTR** separate from each partner's personal UTR. Both are needed on the partnership tax return (SA800).

**Format note:** every UTR is exactly 10 digits. There is no letter prefix for personal UTRs. Corporation tax UTRs are also 10 digits and may appear on HMRC correspondence as a "Unique Taxpayer Reference" with a slash or forward-slash followed by the accounting period (e.g. `1234567890 / 001`). The 10-digit number itself is the UTR.

---

### H2: Which UTR do you need? (Decision table)

Introduce the table as the "which UTR do I need" answer for the four most common situations.

**Worked-example decision table:**

| Situation | UTR type needed | Issued when | Where it appears |
|---|---|---|---|
| Sole trader filing a Self Assessment tax return | Personal UTR (10 digits) | On registration for Self Assessment | SA302, notices to file, HMRC app, personal tax account |
| Partner in a general partnership or LLP | Personal UTR (individual) AND the partnership's own UTR | Personal: on SA registration. Partnership: on SA partnership registration (form SA400) | SA100, SA104 supplement, partnership's SA800 return |
| The partnership itself (filing SA800) | Partnership UTR (10 digits, separate from any partner's UTR) | On partnership registration (SA400 / SA401) | HMRC acknowledgement letter, SA800 return |
| Director / shareholder of a limited company | Corporation tax UTR (10 digits, belongs to the company, not the individual) | HMRC issues to the company's registered address after Companies House incorporation | CT600, HMRC CT payment notices, online HMRC business tax account |

**Callout box (author note: render as a shaded aside):**
"If you are a sole trader who also owns a limited company you have two separate UTRs: your personal one (for your Self Assessment return) and the company's corporation tax UTR (for the CT600 return). They are different numbers and used in different contexts."

---

### H2: Where to find your personal UTR

For individuals (sole traders, partners, employees with Self Assessment obligations):

**Route 1: Personal Tax Account**
Sign in to your HMRC online account at `https://www.gov.uk/personal-tax-account`. The UTR is displayed on the Self Assessment summary page. This is the fastest route if you already have Government Gateway credentials.

**Route 2: HMRC app**
Download the official HMRC app (available on iOS and Android). Sign in with the same Government Gateway credentials. The UTR is visible under the Self Assessment section.

**Route 3: Previous HMRC documents**
Check any of the following (all carry the 10-digit UTR):
- Previous Self Assessment tax returns (paper SA100 or printed PDF)
- Notices to file a return (SA316)
- Payment reminders from HMRC
- Statement of account letters from HMRC
- Form SA302 (tax calculation for a completed year)

**If you cannot find it any other way:**
Contact the HMRC Self Assessment helpline. HMRC will verify your identity and confirm the UTR. They will NOT give it over webchat. Have your National Insurance number, date of birth, and address ready.

Source: `https://www.gov.uk/find-utr-number`

---

### H2: Where to find your company's corporation tax UTR

A limited company's corporation tax UTR belongs to the company, not to any director personally.

**Where it appears:**
- The letter HMRC sends to the company's registered Companies House address shortly after incorporation (usually within 2 to 4 weeks). This letter is the primary source and should be filed immediately.
- The company's CT600 corporation tax return (filed via HMRC's online service or your accountant's software).
- HMRC's online business tax account for the company (accessible via Government Gateway using the company's enrolled credentials).
- Corporation tax payment notices from HMRC.

**If you cannot find it:**
Use HMRC's online service to request the corporation tax UTR. Go to `https://www.gov.uk/find-utr-number` and follow the "request your Corporation Tax UTR online" link. HMRC will send it to the company's registered address at Companies House. This means the registered address must be correct and accessible -- if the company's registered address has changed, update it at Companies House first.

**Author note:** do NOT use a personal UTR in a CT600 context and vice versa. They are administratively separate. An accountant filing a CT600 will ask specifically for the company's UTR.

---

### H2: Where to find your partnership UTR

A partnership (general partnership or LLP) has its own UTR, separate from any partner's personal UTR.

- It appears on correspondence from HMRC addressed to the partnership itself (not to individual partners).
- It is on the SA800 partnership tax return.
- The nominated partner can access it via HMRC's online services using the partnership's Government Gateway enrolment.

If the partnership UTR cannot be found, the nominated partner should contact HMRC's Self Assessment team.

**Practical note:** if you are a new partner joining an existing partnership, ask the existing nominated partner (or your accountant) for the partnership UTR. You will need both it and your own personal UTR when you start filing your share of partnership income on the SA104 supplement.

---

### H2: What to do if you have lost your UTR

Steps in order:

1. **Check your documents first.** Previous tax returns, HMRC letters, payment reminders. A UTR printed anywhere on any piece of HMRC correspondence is the fastest recovery.
2. **Check your online account or app.** Personal Tax Account or HMRC app (individuals). The company's business tax account (companies).
3. **Contact HMRC Self Assessment.** Telephone 0300 200 3310 (UK), open Monday to Friday 8am to 6pm. Have your National Insurance number (individuals) or company registration number (companies) to hand. HMRC will verify your identity and provide the UTR. They will NOT send it by email or give it on webchat.
4. **For companies only: request online.** Use the "request Corporation Tax UTR" online route at gov.uk; HMRC sends to the registered Companies House address.

**Timeline expectation:** if HMRC needs to send a replacement letter, allow 10 to 15 working days for post.

---

### H2: When do you actually need your UTR?

Cover the main trigger contexts with a brief explanation of each:

**Self Assessment filing (SA100)**
Every individual who files a Self Assessment return must quote their personal UTR on the return. Required when submitting online via HMRC's own service or when instructing an accountant to file on your behalf.

**CIS (Construction Industry Scheme)**
Subcontractors in the CIS must give their UTR to each contractor they work for. The contractor uses it to verify the subcontractor's deduction rate with HMRC (20% standard, 30% unverified, 0% gross payment status). Without a UTR, the contractor deducts at the higher 30% unverified rate. Source: `https://www.gov.uk/what-is-the-construction-industry-scheme`.

**Mortgage applications**
Lenders routinely ask for a self-employed applicant's SA302 (tax year overview + tax calculation), which carries the personal UTR. Some lenders request the UTR directly. This is most commonly needed for sole traders and partners applying for a residential or buy-to-let mortgage. See [accountant-for-landlords](../accountant-for-landlords-uk-property-investors) and [btl-mortgage-accountants](../btl-mortgage-accountants-uk) for the broader documentation picture.

**Agent authorisation (64-8 / online authorisation)**
When you appoint an accountant or tax agent to act on your behalf with HMRC, the agent needs your UTR to set up authorisation. This applies to individuals (personal UTR), partnerships (partnership UTR), and companies (corporation tax UTR). Without it, HMRC cannot match the authorisation request to your tax record.

**Corporation tax return (CT600)**
The company's corporation tax UTR is required on every CT600 filing. Accountants will ask for it when taking on a new company client.

**Partnership tax return (SA800)**
Both the partnership UTR and each individual partner's personal UTR are required when filing the SA800 and the partners' SA104 supplements.

---

### H2: Common questions about UTRs

(Transition sentence into the FAQ section.)

---

## FAQ drafts (8 questions)

Author note: write in conversational UK English. No em-dashes. Each answer is a complete standalone (used for FAQ schema). Aim for 60 to 100 words per answer.

---

**Q1: What is a Unique Taxpayer Reference (UTR) number?**

A UTR is a 10-digit reference number issued by HMRC to identify you as a taxpayer. HMRC uses it to match your tax returns, payments, and correspondence to your tax record. You receive one when you register for Self Assessment as a self-employed person or when a limited company is incorporated and registered with HMRC for corporation tax. Partnerships also receive their own separate UTR. It may appear on HMRC letters simply as "tax reference."

---

**Q2: Is my UTR the same as my National Insurance number?**

No. Your National Insurance (NI) number is in the format QQ 123456 A and is used for NIC records, state pension entitlement, and employment. Your UTR is a separate 10-digit number used only for tax return filing and HMRC correspondence. If you are self-employed you have both: your NI number for NIC purposes and your UTR for Self Assessment. Do not use one in place of the other on HMRC forms.

---

**Q3: Where can I find my personal UTR number?**

Check your HMRC personal tax account online, the HMRC app, or any previous HMRC documents such as your Self Assessment tax return, a notice to file (SA316), or a payment reminder letter. All of these carry the 10-digit UTR. If you cannot find it via any of those routes, call the HMRC Self Assessment helpline on 0300 200 3310 with your National Insurance number and date of birth to hand.

---

**Q4: How do I find my company's corporation tax UTR?**

Your company's corporation tax UTR appears on the letter HMRC sent to your Companies House registered address shortly after the company was incorporated (usually within 2 to 4 weeks of incorporation). It also appears on CT600 returns and HMRC payment notices. If you cannot find the letter, use HMRC's online service to request the UTR and it will be sent to the current registered address. Make sure that address is up to date at Companies House before requesting.

---

**Q5: Does a partnership have a separate UTR from the partners?**

Yes. A general partnership or LLP has its own partnership UTR that is entirely separate from each individual partner's personal UTR. The partnership UTR is used when filing the SA800 partnership tax return. Each partner also needs their own personal UTR for their individual SA100 return, where they report their share of partnership profit using the SA104 supplement. If you are joining an existing partnership, ask the nominated partner or your accountant for the partnership's UTR.

---

**Q6: What happens if I give the wrong UTR to a CIS contractor?**

The contractor will be unable to verify your deduction rate with HMRC and will deduct tax at the higher unverified rate of 30% instead of the standard 20% (or 0% if you have gross payment status). Always give your correct personal UTR when working under CIS. If you have both a personal UTR and a company UTR, give the one that matches the entity actually providing the labour (your personal UTR if you are operating as a sole trader, the company's UTR if you are operating through a limited company).

---

**Q7: Can I use my UTR as proof of self-employment?**

A UTR alone does not prove self-employment, but it demonstrates you are registered for Self Assessment, which HMRC requires for self-employed individuals. Mortgage lenders and some clients ask for SA302 forms (which carry your UTR) as evidence of self-employed income. For a formal proof-of-income document, ask HMRC for a tax year overview or use your SA302 from the previous year. Your accountant can usually obtain these quickly via their agent access.

---

**Q8: How long does it take to get a UTR after registering as self-employed?**

HMRC typically sends your UTR by post within 10 to 15 working days of your Self Assessment registration. The letter is addressed to the address you gave when you registered. If you do not receive it after three weeks, contact the HMRC Self Assessment helpline. Note that you can access your UTR online via your personal tax account or the HMRC app as soon as your registration has been processed, which may be faster than waiting for the post.

---

**Q9: Can I find my UTR on the HMRC app?**

Yes. Download the official HMRC app (available on iOS and Android), sign in with your Government Gateway credentials, and navigate to the Self Assessment section. Your 10-digit UTR is displayed there. This is often the fastest route if you have already set up your Government Gateway account. The app also shows your Self Assessment account balance and payment history.

---

**Q10: My accountant is asking for my UTR -- which one do they need?**

It depends on what they are filing for you. If they are handling your personal Self Assessment tax return (SA100), they need your personal 10-digit UTR. If they are handling your limited company's corporation tax return (CT600), they need the company's corporation tax UTR, which is a different 10-digit number belonging to the company. If they are handling a partnership tax return (SA800), they need the partnership's UTR as well as each partner's personal UTR. When in doubt, tell your accountant which entity you are asking about and they will specify.

---

**Q11: I have just set up a limited company -- how does it get a UTR?**

HMRC automatically issues a corporation tax UTR to every new limited company within a few weeks of incorporation at Companies House. The UTR is sent by post to the company's registered address. You do not need to apply separately -- incorporation triggers the process. If three to four weeks have passed and the letter has not arrived, check that the registered address at Companies House is correct, then contact HMRC. Once you have the UTR, you will need to register the company online with HMRC for corporation tax within three months of starting to trade.

---

**Q12: Does an LLP have a UTR?**

Yes. A limited liability partnership (LLP) has its own partnership UTR, separate from each member's personal UTR. The LLP's UTR is used when filing the SA800 partnership return (which LLPs are required to file). Each member also needs their own personal UTR for their individual SA100. From a UTR perspective an LLP is treated the same way as a general partnership: one UTR for the entity, one per member.

---

## Internal cross-link map

Per `wave4_collision_verify.md` A7 cross-link mandates and natural anchors from the page content:

| Link target (slug) | Anchor text suggestion | Context |
|---|---|---|
| `how-to-register-as-self-employed-uk` | how to register as self-employed | Introduction and the "UTR issuance" section -- collision clearance requires linking here for issuance flow, NOT re-covering it |
| `how-to-register-a-limited-company-uk-with-a-protected-business-name` | register a limited company | Company UTR section, explaining how incorporation triggers the UTR |
| `accountant-for-construction-subcontractors-cis` | CIS accountant | CIS section, "when you need your UTR" |
| `cis-accountant-uk-construction` | construction subcontractors | Alternative anchor in CIS context (choose whichever slug is preferred; both exist) |
| `self-assessment-accountant-2025-26` | Self Assessment accountant | Agent authorisation section |
| `self-assessment-tax-return-accountant-near-me` | filing your Self Assessment return | SA filing context |
| `btl-mortgage-accountants-uk` | buy-to-let mortgage | Mortgage evidence section |
| `accountant-for-landlords-uk-property-investors` | landlord mortgage documentation | Mortgage evidence section |
| `mtd-itsa-april-2026-deadline-mixed-member-partnerships` | partnerships and MTD | Partnership UTR section (optional, for forward-looking context) |

---

## Flags

**F-70 AUTHORITY_GAP:** Both competitor URLs are dead (HTTP 404). No live specialist competitor page covers this topic in the current SERP. This is an opportunity but means the brief has no live competitor to differentiate against structurally. Brief built from primary sources only.

---

## Writer instructions

1. Do not cover the registration-as-self-employed process in detail. State briefly that you receive your UTR when you register, and link to `how-to-register-as-self-employed-uk`. This is the collision clearance line.
2. Do not use em-dashes anywhere. Use commas, parentheses, or full stops.
3. Use semantic HTML in the final file (`<h2>`, `<h3>`, `<p>`, `<table>`, `<ul>`, `<li>`). No utility CSS classes.
4. The decision table in "Which UTR do you need?" is a worked example and must appear in the body as a real HTML table.
5. FAQ schema: all 12 FAQ items above must appear in the `faqs:` frontmatter array and the schema count must match the body FAQ count after build. Target 12 FAQs.
6. Meta title is exactly 62 characters -- do not shorten or lengthen.
7. The callout box ("If you are a sole trader who also owns a limited company...") should render as a `<div class="callout">` or equivalent semantic wrapper, not a blockquote.
8. Body word count target: 2,800 -- 3,200. The frontmatter and FAQ JSON add approximately 1,000 to 1,500 words on top; do not count those.
9. No pricing, no client names, no named experts. The LeadForm is injected at footer -- do not add a second one in the body.
10. Cross-links: use relative paths (`../slug-name`) not absolute URLs.
