# Stage 1B house-position lock drafts, batch A (VAT and IPT anchors)

**Researched 2026-09-11 against primary sources only** (legislation.gov.uk for statute, gov.uk HMRC VAT Notices and internal manuals for published HMRC practice). Every URL listed under "Source:" was actually fetched in this session. No secondary sources were used. Where a page could not be fetched, that is stated rather than papered over.

Status legend: **LOCKED** = confirmed at primary source. **UNCONFIRMED** = could not reach a primary source, or the source was reached but the detail was not stated verbatim. **CONTRADICTS EXISTING HP** = conflicts with `docs/generalist/house_positions.md`.

---

## Anchor 1. VAT exemption, general: VATA 1994 Schedule 9 groups

**Locked position.** Exempt supplies are listed in **Value Added Tax Act 1994, Schedule 9 (Exemptions)**, indexed in Part I and set out in Part II. The sixteen groups are:

| Group | Name (verbatim from the Part I index) |
|---|---|
| 1 | Land |
| 2 | Insurance |
| 3 | Postal services |
| 4 | Betting, gaming, dutiable machine games and lotteries |
| 5 | Finance |
| 6 | Education |
| 7 | Health and welfare |
| 8 | Burial and cremation |
| 9 | Subscriptions to trade unions, professional and other public interest bodies |
| 10 | Sport, sports competitions and physical education |
| 11 | Works of art etc |
| 12 | Fund raising events by charities and other qualifying bodies |
| 13 | Cultural services etc |
| 14 | Supplies of goods where input tax cannot be recovered |
| 15 | Investment gold |
| 16 | Supplies of services by groups involving cost sharing |

Exempt is not the same as zero-rated: an exempt supply carries no output VAT **and blocks input-tax recovery** on attributable costs, and exempt turnover does not count toward the £90,000 registration threshold. Schedule 9 now also carries a **Part 3 (Exceptions)** inserted by Finance Act 2025, see Anchor 4b.

**Source:** *Value Added Tax Act 1994*, Schedule 9 (Exemptions), Part I (Index to exempt supplies) - https://www.legislation.gov.uk/ukpga/1994/23/schedule/9

**Confidence: LOCKED.** No contradiction with house_positions.md; the existing §19.3 hook (Sch 9 Group 7 item 9) and §19.4 hook (Sch 9 Group 6 item 2) both sit correctly inside this index.

---

## Anchor 2. Partial exemption de minimis, the standard method, and the two simplified tests

**HIGH BLAST RADIUS. Calculator will be built on this. Read the numbers carefully.**

**Locked position.** A partly exempt business must attribute input tax: directly attributable to taxable supplies (recoverable in full), directly attributable to exempt supplies (not recoverable), and **residual** (recoverable in the taxable proportion). The **standard method** apportions residual input tax by the value-based fraction:

> "Value of taxable supplies in the period (excluding VAT) / total value of supplies in the period (excluding VAT) x 100 = recoverable percentage"

(VAT Notice 706 para 4.3; the recoverable percentage is rounded up per para 4.7.)

**The de minimis limit is TWO cumulative conditions, not one.** Exempt input tax is recoverable in full where it:

1. does **not exceed £625 per month on average** (that is, **£1,875 per VAT quarter** and **£7,500 per annum**), **and**
2. does **not exceed one half (50%) of all input tax** in the period concerned.

Both must be satisfied. Regulation 106 wording: *"relevant input tax ... does not amount to more than £625 per month on average, and ... does not exceed one half of all his input tax for the period concerned, all such input tax in that period shall be treated as attributable to taxable supplies."*

**The two simplified de minimis tests** (Notice 706 para 11.7) exist so a business can pass without doing the full calculation. They are alternatives, not extra hurdles:

- **Simplified test one:** total input tax is no more than **£625 per month on average** AND the **value of exempt supplies is no more than 50% of the value of all supplies**.
- **Simplified test two:** total input tax **less** input tax directly attributable to taxable supplies is no more than **£625 per month on average** AND the **value of exempt supplies is no more than 50% of the value of all supplies**.

Para 11.8: a business is de minimis if it passes **any one** of the three tests (the two simplified tests or the full regulation 106 test); they are alternatives, not cumulative.

**The two "50%" figures are DIFFERENT tests and must never be conflated on a page or in a calculator.** The regulation 106 test compares **exempt input tax against total input tax**. The simplified tests compare the **value of exempt supplies against the value of all supplies**. This is the single most common error in the calculation and is the reason this anchor was flagged high blast radius.

An annual adjustment applies at the end of the partial exemption longer period; the de minimis tests are applied both per return period and again on the annual adjustment.

**Source:**
- *The Value Added Tax Regulations 1995 (S.I. 1995/2518)*, regulation 106 (and the partial exemption code at regulations 99 to 110) - https://www.legislation.gov.uk/uksi/1995/2518/regulation/106
- HMRC, *Partial exemption (VAT Notice 706)*, paras 4.3, 4.7, 11.2, 11.7, 11.8 - https://www.gov.uk/guidance/partial-exemption-vat-notice-706

**Confidence: LOCKED** for the £625/month, the 50% limbs, the standard method formula and the two simplified tests. **Partial caveat:** the annual-adjustment mechanics and the standard method override were not fetched paragraph by paragraph in this session, so do not cite a paragraph number for those two points without a re-fetch.

**Note against existing HP.** house_positions.md contains no partial exemption position; §19.3 and §19.4 both say "a mixed practice is into partial exemption, **flag rather than compute**". That instruction was written when no verified de minimis anchor existed. This anchor now supports computing, but the flag-rather-than-compute rule in §19.3/§19.4 is a scope fence on nursery and tutor pages, not a statement of law, and nothing here contradicts it. If a calculator is built, the orchestrator should decide whether those two sections' fences are relaxed.

---

## Anchor 3. Zero rating: VATA 1994 Schedule 8 groups, printed matter, children's clothing

### 3a. The Schedule 8 groups

**Locked position.** Zero-rated supplies are listed in **Value Added Tax Act 1994, Schedule 8 (Zero-rating)**, Part I index:

| Group | Name |
|---|---|
| 1 | Food |
| 2 | Sewerage services and water |
| 3 | Books etc. |
| 4 | Talking books for the blind and disabled and wireless sets for the blind |
| 5 | Construction of buildings etc. |
| 6 | Protected buildings |
| 7 | International services |
| 8 | Transport |
| 9 | Caravans and houseboats |
| 10 | Gold |
| 11 | Bank notes |
| 12 | Drugs, medicines, aids for the disabled etc. |
| 13 | Imports, exports etc. |
| 15 | Charities etc. |
| 16 | Clothing and footwear |
| 19 | Women's sanitary products |
| 20 | Personal protective equipment (coronavirus) |
| 21 | Online marketplaces (deemed supply) |
| 22 | Free zones |
| 23 | Energy-saving materials: installation |

**Gaps in the numbering are real:** Groups 14, 17 and 18 are repealed or spent, and the index is not consecutive. Do not "fill in" a missing group number on a page.

**UNCONFIRMED point inside an otherwise locked anchor:** on the first fetch the summariser returned Group 14 as "Charities etc." and Group 15 as "Charities etc."; on a second, targeted fetch of the same page it returned **Group 14 = "Drugs, medicines, aids for the disabled etc."** and **Group 15 = "Charities etc."**, which conflicts with its own reading of Group 12. The safe, twice-corroborated readings are **Group 12 = Drugs, medicines, aids for the disabled etc.** and **Group 15 = Charities etc.** **Do not publish a Group 14 name.** Re-fetch the Part I index and read it directly before any page names Group 14.

**Source:** *Value Added Tax Act 1994*, Schedule 8 (Zero-rating), Part I (Index to zero-rated supplies) - https://www.legislation.gov.uk/ukpga/1994/23/schedule/8

**Confidence: LOCKED for the group list as a whole; UNCONFIRMED for the name of Group 14 specifically.**

### 3b. Group 3 printed matter, including the 2020 e-publications extension

**Locked position.** **Schedule 8 Group 3 (Books etc.)** zero-rates, verbatim: **item 1** "Books, booklets, brochures, pamphlets and leaflets"; **item 2** "Newspapers, journals and periodicals"; **item 3** "Children's picture books and painting books"; **item 4** "Music (printed, duplicated or manuscript)"; **item 5** "Maps, charts and topographical plans"; **item 6** "Covers, cases and other articles supplied with items 1 to 5".

**Item 7** extends the zero rate to **electronic versions of the publications in items 1 to 3**, excluding publications which "(a) are wholly or predominantly devoted to advertising, or (b) consist wholly or predominantly of audio or video content". **Item 7 was inserted with effect from 1 May 2020 by the *Value Added Tax (Extension of Zero-Rating to Electronically Supplied Books etc.) (Coronavirus) Order 2020 (S.I. 2020/459)*.** Note the instrument's verbatim short title includes "(Coronavirus)"; a citation that omits it is wrong.

**Not zero-rated** (standard-rated), per Notice 701/10: stationery and things completed in use (account books, unused diaries, exercise books, forms, order books, questionnaires), business stationery (compliment slips, letterheads, business cards), **posters for public display**, framed decorative maps and wall charts, completed stamp albums, individual handwritten letters, and incomplete or unbound publications. The organising idea for reader copy: the zero rate attaches to **reading matter**, not to paper.

**Source:**
- *Value Added Tax Act 1994*, Schedule 8, Group 3 (Books etc.), items 1 to 7 and notes - https://www.legislation.gov.uk/ukpga/1994/23/schedule/8
- *The Value Added Tax (Extension of Zero-Rating to Electronically Supplied Books etc.) (Coronavirus) Order 2020 (S.I. 2020/459)* - https://www.legislation.gov.uk/uksi/2020/459/contents/made
- HMRC, *Zero rating books and printed matter for VAT (Notice 701/10)* - https://www.gov.uk/guidance/zero-rating-books-and-printed-matter-for-vat-notice-70110

**Confidence: LOCKED.**

### 3c. Children's clothing and footwear, and the size-based test

**Locked position.** **Schedule 8 Group 16 (Clothing and footwear)** zero-rates young children's clothing and footwear. HMRC's published practice (Notice 714) applies **four cumulative conditions**: the article must (1) be an article of clothing or footwear, (2) **not be made of fur**, (3) be **designed for young children**, and (4) be **suitable only for young children**.

The **size-based test** is how condition (3) is applied in practice. HMRC publishes maximum measurement tables: *"These measurements are based on children up to the eve of their 14th birthday, as this is when the body dimensions begin to merge with those of the general adult population."* The tables are derived from the relevant **British Standard** for an average child up to the eve of the fourteenth birthday. Illustrative maxima read from the notice: boys' shirts and knitwear **104cm chest**, jackets **109cm chest**, top coats **114cm chest**, trousers **72cm waist**; girls' corresponding limits are marginally larger (shirts **105cm chest**). Footwear: **boys' shoes up to and including size 6.5**; **girls' court shoes up to and including size 3**; **other girls' shoes up to and including size 3, and sizes 3.5 to 5.5 provided the heel height does not exceed the sole depth by more than 4cm** (HMRC internal manual VCLOTHING4200 carries the full measurement tables).

Reader-copy consequence, which is the whole point of the page: **there is no age test at the till.** A garment above the maximum measurement is standard-rated even if the buyer is a child, and a garment within the measurements is zero-rated even if the buyer is an adult. Condition (4), "suitable only for young children", is what stops adult-sized items being sold as children's wear.

**Source:**
- HMRC, *Young children's clothing and footwear (VAT Notice 714)* - https://www.gov.uk/guidance/vat-on-young-childrens-clothing-and-footwear-notice-714
- HMRC internal manual, *VCLOTHING4200 - The design test - is the article designed for young children?: Maximum Clothing Measurements* - https://www.gov.uk/hmrc-internal-manuals/vat-clothing/vclothing4200 (identified via gov.uk search; **the manual page itself was not fetched**, so cite the notice, not the manual, until it is)

**Confidence: LOCKED** for the four conditions, the under-14 / British Standard basis and the footwear sizes. **The individual clothing centimetre figures are UNCONFIRMED at paragraph level** (they came back as a summarised table, not verbatim). **Do not publish a measurement table without re-fetching Notice 714 and VCLOTHING4200 and reading the tables directly.** Publish the principle and link to the table.

**Note:** the verbatim text of Group 16 items and notes could not be extracted from legislation.gov.uk in this session (the Schedule 8 page is too large for the fetcher to reach Group 16, and the `/schedule/8/part/II/crossheading/...` URL pattern returns 404). Group 16's **name** is confirmed from the Part I index. The item text is UNCONFIRMED.

---

## Anchor 4. Exemption sub-groups, one page each

### 4a. Health and medical, Schedule 9 Group 7

**Locked position.** Exemption for medical care requires **two cumulative conditions**, both of which must be met (Notice 701/57 s.2.3):

1. **"The services are within the profession in which you're registered to practice"** - the practitioner must be **enrolled on the relevant statutory register**, and the service must draw on the knowledge, skills, judgement and experience acquired in that professional training; and
2. **"The primary purpose of the services is the protection, maintenance or restoration of the health of the person concerned."**

The registers recognised under Group 7 items 1 to 3 include: the **General Medical Council** register (doctors, and anaesthesia associates and physician associates), the **Health and Care Professions Council** register (physiotherapists, radiographers, podiatrists, speech and language therapists, occupational therapists, dietitians, clinical scientists, biomedical scientists, paramedics, prosthetists and orthotists, hearing aid dispensers, arts therapists, orthoptists), the **Nursing and Midwifery Council** register, the **General Optical Council** register, the **General Dental Council** register, the **General Pharmaceutical Council** register, and, under item 3, the **General Osteopathic Council** and **General Chiropractic Council**.

The **purpose test is the boundary that catches people out**: cosmetic and aesthetic work, medico-legal reports, occupational-health reports written for an employer and fitness-to-work certification are standard-rated where the primary purpose is not the protection, maintenance or restoration of the individual's health, even though a registered professional performs them. Services of **unregistered staff** can be exempt where directly supervised by a registered professional on HMRC's stated conditions (s.5.3) or where supplied by a regulated health institution (s.5.4).

**Source:** HMRC, *Health professionals and pharmaceutical products (VAT Notice 701/57)*, ss.2.3, 5.3, 5.4 - https://www.gov.uk/guidance/health-professionals-pharmaceutical-products-and-vat-notice-70157 ; VATA 1994 Schedule 9 Group 7 - https://www.legislation.gov.uk/ukpga/1994/23/schedule/9

**Confidence: LOCKED** for the two-condition test, the registers and the supervision rule. The **verbatim item text of Group 7 items 1 to 4** could not be reliably extracted from legislation.gov.uk in this session (the fetcher paraphrased a very large page and returned an item 9 text that does not match the welfare item). **Do not quote a Group 7 item verbatim without a direct re-read.**

**Flag against existing HP:** house_positions.md §19.3 cites **"VATA 1994 Sch 9 Group 7 item 9"** for state-regulated childcare as welfare. That citation is **consistent** with Notice 701/2 (welfare exemption sits in Group 7), and nothing found here refutes it, but the item-number-level text was not re-verified this session. Treat §19.3's item 9 reference as still standing, not as re-confirmed.

### 4b. Education, Schedule 9 Group 6, and VAT on private school fees

**Locked position.** Education exemption sits in **VATA 1994 s.31 and Schedule 9 Group 6**, item 1 being the provision by an **eligible body** of education and vocational training. **The exemption no longer covers private schools.**

**What changed, exactly.** **Finance Act 2025** inserted a new **Part 3 (Exceptions) into Schedule 9 VATA 1994** and amended **s.31(1)** so that a supply is exempt only if it is of a description specified in **Part 2 of Schedule 9** *and* **is not of a description specified in Part 3** of that Schedule. Part 3 removes the exemption from three things: (a) **education provided by a private school**, (b) **vocational training provided by a private school**, and (c) **board and lodging closely related to** (a) or (b). Carve-outs preserved: **English as a foreign language**, **nursery classes**, and **higher education courses**. The result: private school fees and boarding are **standard-rated at 20%** on supplies made on or after **1 January 2025**.

**The sections:** **Finance Act 2025 s.47** ("Removal of exemption for private school fees"), **s.48** ("Charge on pre-paid private school fees", the anti-forestalling rule catching prepayments made **on or after 29 July 2024**), and **s.49** ("Sections 47 and 48: commencement"). Per s.49 the provisions are treated as coming into force on **30 October 2024**, with effect for supplies **on or after 1 January 2025**. The practical anti-forestalling line: fees invoiced or paid **from 30 October 2024** for terms starting on or after 1 January 2025 attract VAT at the time of the invoice or payment; fees invoiced or paid **between 29 July 2024 and 29 October 2024** for such terms attract VAT on **the first day of that term**.

**Source:**
- *Finance Act 2025* (c.8), Part 3, sections 47, 48 and 49 (value added tax crossheading) - https://www.legislation.gov.uk/ukpga/2025/8/part/3/crossheading/value-added-tax
- HMRC, *Applying VAT to private school fees* - https://www.gov.uk/government/publications/vat-on-private-school-fees/applying-vat-to-private-school-fees (identified via gov.uk search; **not fetched directly**, so cite the Act, not this page)

**Confidence: LOCKED** for the change, the sections, the commencement and the carve-outs. **The verbatim text of Part 3 and of the "private school" definition is UNCONFIRMED** (returned in summarised form). Before any page quotes the definition of "private school", re-fetch FA 2025 s.47.

**Does not contradict existing HP.** house_positions.md §19.4 states the **private tuition** exemption (Sch 9 Group 6 item 2, individual teacher acting independently). That is a different limb and survives unchanged: the FA 2025 exception bites on **private schools**, not on independent tutors. The two positions must be kept visibly distinct on any education-VAT page, because the obvious reader error is to assume a tutor lost the exemption in January 2025. **They did not.**

### 4c. Welfare and care, and charity reliefs

**Locked position, welfare.** **Schedule 9 Group 7** exempts welfare services and connected goods supplied by **charities**, **state-regulated private welfare institutions or agencies**, or **public bodies**. **Welfare services** are services "directly connected with the provision of care, treatment or instruction designed to promote the physical or mental welfare of elderly, sick, distressed or disabled persons" (and, separately, the care or protection of children and young persons). **"State-regulated"** means *"approved, licensed, registered or exempted from registration by any Minister or other authority pursuant to a provision of a public general Act"*, and covers domiciliary care agencies, independent fostering agencies, voluntary adoption agencies and nurses' agencies. **Critical timing trap:** a provider is **not state-regulated until its registration has been approved** by the relevant national care regulator, so supplies made while an application is pending **cannot be exempted**.

**Locked position, charities.** Charity VAT relief is **three different mechanisms and the distinction is the page**:
- **Non-business / outside the scope:** no supply for consideration, so no VAT and **no input-tax recovery**. Freely given donations are the paradigm. *"An activity that does not involve the making of supplies for consideration cannot be a business activity for VAT purposes."*
- **Exempt:** a supply is made but Schedule 9 exempts it (for example welfare services under Group 7, or fundraising events under Group 12). No output VAT, and **no input-tax recovery** on attributable costs.
- **Zero-rated:** a taxable supply at 0%. Output VAT is nil **and input tax IS recoverable**. Schedule 8 **Group 15 (Charities etc.)** covers sales of donated goods and certain supplies to charities; Group 16 and the construction groups carry further charity reliefs.

The consequence worth stating plainly for readers: **zero-rating is worth more to a charity than exemption**, because only zero-rating preserves recovery. Mislabelling a non-business activity as exempt (or the reverse) distorts the partial exemption and business/non-business apportionments, which is the usual source of charity VAT error.

**Source:**
- HMRC, *Welfare services and goods (VAT Notice 701/2)* - https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012 (**identified via gov.uk search, not fetched directly**; the definitional quotes above are from the gov.uk-restricted search of that notice and of the VATWELF manual)
- HMRC, *How VAT affects charities (VAT Notice 701/1)* - https://www.gov.uk/guidance/how-vat-affects-charities-notice-7011 (fetched)
- HMRC internal manual, *VATWELF2095* and *VATWELF2160* - https://www.gov.uk/hmrc-internal-manuals/vat-welfare (identified, not fetched)

**Confidence: LOCKED** for the three-mechanism charity framing (Notice 701/1 fetched directly). **UNCONFIRMED at paragraph level for welfare**: Notice 701/2 was not fetched successfully (the guidance URL 404s under the slug tried), so the welfare definitions and the "not state-regulated until approved" rule rest on gov.uk-restricted search snippets of that notice and of the VATWELF manual rather than on a page this session fetched. **Re-fetch https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012 before publishing the welfare page.**

**Note against existing HP:** §19.3 relies on exactly this welfare exemption for Ofsted-registered childcare, and the "not state-regulated until registration approved" trap is **new information not present in house_positions.md**. It is material to nursery pages and should be flagged to the orchestrator.

### 4d. Funeral services, Schedule 9 Group 8

**Locked position.** **Schedule 9 Group 8 (Burial and cremation)**, items 1 and 2, exempt (a) **the disposal of the remains of the dead** and (b) **the making of arrangements for, or in connection with, the disposal of the remains of the dead**. The exempt supply can be made by **undertakers, funeral directors, and cemetery and crematorium operators**, and remains exempt whether supplied to the bereaved family or to another funeral professional. Goods incidental and closely related to the exempt service (the coffin, bearers, transport of the deceased) follow the exemption.

**Standard-rated elements inside a typical funeral package**: **flowers and wreaths**, **headstones, memorials and plaques**, **newspaper announcements**, memorial vases and seats, and agency services. A package therefore normally requires **apportionment** between the exempt disposal element and the standard-rated commemorative and ancillary goods, which is the operative point for a funeral-director reader.

**Source:** HMRC, *Burial, cremation and commemoration of the dead (VAT Notice 701/32)* - https://www.gov.uk/guidance/burial-cremation-and-commemoration-of-the-dead-notice-70132 (note: the `...-vat-notice-70132` slug 404s; the working slug omits "vat"); VATA 1994 Schedule 9 Group 8 - https://www.legislation.gov.uk/ukpga/1994/23/schedule/9

**Confidence: LOCKED.**

### 4e. Sports club membership, Schedule 9 Group 10

**Locked position.** **Schedule 9 Group 10 (Sport, sports competitions and physical education)** exempts certain sporting services supplied by an **eligible body** to individuals taking part in sport or physical education, and entry to certain competitions in sport or physical recreation. Exempt services include playing, competing, refereeing, umpiring, judging, coaching and training; use of changing rooms, showers, playing equipment and storage; match fees for playing facilities; and mooring, hangarage and workshop facilities.

**The non-profit making body condition has four cumulative limbs** (Notice 701/45): the body must (1) be **non-profit making**, that is, precluded from distributing profit to anyone with a financial interest in it; (2) have a **constitutional clause** preventing distribution of profit, or restricting distribution to another non-profit making body or to members on winding up or dissolution; (3) **actually apply** any surplus from playing activities to maintaining or improving its related facilities; and (4) **not be subject to commercial influence** nor be part of a wider commercial undertaking.

**Membership subscription boundary:** a subscription is exempt only to the extent the benefits supplied satisfy the notice's basic conditions (s.3.1) - an eligible body supplying services closely linked with and essential to sport, to individuals **actively taking part**. **Social or non-playing memberships are standard-rated.** A club with both playing and social members must apportion; this is the single most commonly misapplied point on a sports club page.

**Source:** HMRC, *Sport supplies that are VAT exempt (VAT Notice 701/45)*, s.3.1 and the eligible body conditions - https://www.gov.uk/guidance/sport-supplies-that-are-vat-exempt-notice-70145 ; VATA 1994 Schedule 9 Group 10 - https://www.legislation.gov.uk/ukpga/1994/23/schedule/9

**Confidence: LOCKED** for the four eligible-body conditions and the social-membership exclusion. Group 10 **item numbers** were not read verbatim from the statute; cite the group, not an item number.

### 4f. Passenger transport, Schedule 8 Group 8 (zero-rated, NOT exempt)

**Locked position.** Passenger transport is **zero-rated**, not exempt: it sits in **Schedule 8 Group 8 (Transport)**, **item 4(a)**, which zero-rates the transport of passengers **"in any vehicle, ship or aircraft designed or adapted to carry not less than 10 passengers"**. HMRC's published practice reads this as at least **10 seats including those for the driver and crew**, and the test is applied to the **vehicle actually used at the time of the supply**, not to the operator's fleet in general. Vehicles designed or substantially and permanently adapted for the safe carriage of persons in a **wheelchair** are zero-rated without meeting the 10-person count, on the terms HMRC sets out following Revenue and Customs Brief 3 (2019).

**Consequence for the reader:** taxis, private hire cars and minicabs (fewer than 10 seats) are **standard-rated**; buses, coaches, trains and larger minibuses are zero-rated. This is a zero-rated page, so input tax **is** recoverable, and the operator is in a repayment position - the opposite of the exempt pages in Anchor 4.

**Source:** VATA 1994 Schedule 8 Group 8 item 4 - https://www.legislation.gov.uk/ukpga/1994/23/schedule/8 ; HMRC, *The VAT treatment of passenger transport (VAT Notice 744A)* - https://www.gov.uk/guidance/the-vat-treatment-of-passenger-transport-notice-744a and HMRC internal manual *VTRANS020500* - https://www.gov.uk/hmrc-internal-manuals/vat-transport/vtrans020500 (both **identified via gov.uk-restricted search; neither page was fetched directly**, the `...vat-on-transport-notice-744a` slug 404s)

**Confidence: LOCKED for the statutory 10-passenger rule and its location** (Schedule 8 Group 8 item 4, corroborated by the Schedule 8 index fetch). **UNCONFIRMED at paragraph level for the HMRC practice gloss** (10 seats including driver and crew; the wheelchair-vehicle relief). Re-fetch Notice 744A before publishing those two points.

### 4g. Finance and insurance, Schedule 9 Groups 5 and 2

**Locked position, finance (Group 5).** Exempt items include: **item 1** *"the issue, transfer or receipt of, or any dealing with, money, any security for money or any note or order for the payment of money"*; **item 2** *"the making of any advance or the granting of any credit"*; **item 2A** the management of credit **by the person granting it**; **item 3** instalment credit finance in hire-purchase, conditional sale or credit sale, where separately disclosed; **item 4** administrative arrangements and documentation and transfer of title to the goods (consideration limited to £10); **item 5** **intermediary services** in relation to a transaction in items 1, 2, 3, 4 or 6; **item 5A** underwriting; **item 6** dealings in securities and secondary securities; **item 8** the operation of a current, deposit or savings account; **item 9** the management of an authorised unit trust or trust-based scheme.

**The boundary, and it is a hard one:** services **associated with** finance are **standard-rated** unless they fall inside an item. Notice 701/49 para 1.6 lists as outside the exemption: **book-keeping**, **debt collection and credit control**, depositary and trustee services, equipment leasing, executor and trustee services, **investment, finance and taxation advice**, **management consultancy**, merger and take-over advice, portfolio management (with exceptions), registrar services, safe custody and safe transportation, and service companies' administrative activities. **Item 2A is the trap for owner-managed lenders:** management of credit is exempt only when done **by the person who granted it**, so outsourced credit management is standard-rated.

**Locked position, insurance (Group 2).** **Item 1** exempts **insurance and reinsurance transactions** - the insurer provides agreed cover on the occurrence of a risk in exchange for a premium, and HMRC's stated position is that the exemption applies **regardless of whether the insurer is formally authorised** under financial services regulation. **Item 4** exempts **insurance related services supplied by insurance brokers and insurance agents acting in an intermediary capacity**: introductory work leading to insurance contracts, policy administration, claims handling on stated conditions, and premium collection where ancillary to other intermediary services.

**Outside the exemption (standard-rated):** market research, advertising and promotional services; standalone valuation and inspection services; **loss adjusters' assessment services**, except where the adjuster handles claims under **written authority from the insurer to accept or reject claims and settle them**; **manufacturer and retailer warranties**, which are unlikely to constitute insurance at all; and services supplied in settling a claim (the plumber paid by the insurer charges VAT normally).

**VAT and IPT are different taxes and must never be blended in copy.** Notice 701/36 states they are *"2 very different taxes"* and, critically, **IPT is not recoverable** by the insured in the way input VAT is. An exempt insurance supply attracts IPT instead of VAT, not as well as VAT relief - see Anchor 5.

**Source:**
- HMRC, *VAT Notice 701/49: finance*, Schedule 9 Group 5 items and para 1.6 - https://www.gov.uk/government/publications/vat-notice-70149-finance/vat-notice-70149-finance
- HMRC, *Insurance (VAT Notice 701/36)*, Schedule 9 Group 2 items 1 and 4 - https://www.gov.uk/guidance/insurance-notice-70136
- VATA 1994 Schedule 9 Groups 2 and 5 - https://www.legislation.gov.uk/ukpga/1994/23/schedule/9

**Confidence: LOCKED.** Note item 7 of Group 5 is not listed because it is spent or repealed; do not assert a Group 5 item 7.

### 4h. Land and property, Schedule 9 Group 1, and the option to tax

**Locked position.** **Schedule 9 Group 1 (Land)** exempts the grant of any interest in or right over land or of any licence to occupy land, subject to a long list of exceptions (hotel accommodation, holiday accommodation, parking, sports facilities, new commercial buildings and civil engineering works, and others) which are standard-rated. The **option to tax** in **VATA 1994 Schedule 10** lets an owner of non-residential land or buildings **disapply the exemption** and charge VAT on supplies of that land, in order to recover input tax on acquisition and refurbishment.

**Notification:** the option is a two-stage act. The **decision** is made, then it must be **notified to HMRC normally within 30 days of the decision** (Notice 742A para 4.2.1), on **form VAT1614A** (para 4.2.2), which may be emailed to HMRC's Option to Tax National Unit. HMRC may accept a **late notification** where the taxpayer shows the decision was in fact made at the claimed time, supported by documentary evidence or a written declaration by a responsible person that output tax was charged and input tax recovered accordingly. **The decision is what has legal effect; the notification is the condition. Neither alone is enough.**

**Revocation, two routes:**
- **Cooling-off:** within **6 months** of the option taking effect, revocable without HMRC permission where no tax has become chargeable on a supply of the land, the "Section F" input-tax conditions are met, and notification is given on **form VAT1614C** before the 6 months expire. Revocation then takes effect **from the day the option was exercised**, that is, retrospectively.
- **The 20-year rule:** an option may be revoked once **more than 20 years** have elapsed since it took effect, where either the person holds **no relevant interest** in the land, or all the conditions in "Section G" of the notice are met (including the 20-year condition and the absence of recent below-market-value disposals). Notification is on **form VAT1614J**.

**The two points that matter most in reader copy:** an option to tax **runs with the opter, not with the land** (a buyer must make and notify its own option), and between month 6 and year 20 the option is, for practical purposes, **irrevocable**. Options also do not apply to **residential** or relevant charitable use buildings.

**Source:** HMRC, *Opting to tax land and buildings (VAT Notice 742A)*, paras 4.2.1, 4.2.2, 8.1 and 8.3, citing VATA 1994 Schedule 10 - https://www.gov.uk/guidance/opting-to-tax-land-and-buildings-notice-742a ; VATA 1994 Schedule 9 Group 1 - https://www.legislation.gov.uk/ukpga/1994/23/schedule/9

**Confidence: LOCKED** for the 30-day notification, the 6-month cooling-off, the 20-year revocation and the form numbers. **The Schedule 9 Group 1 exception list was NOT read verbatim** this session and the "runs with the opter, not the land" and residential-exclusion points come from the notice's structure rather than a quoted paragraph. **UNCONFIRMED at paragraph level for those.** Re-fetch Notice 742A sections 2 and 3 before publishing the exception list.

---

## Anchor 5. Insurance Premium Tax

**Locked position.** IPT is charged under **Finance Act 1994 Part III**. **Section 51 (Rate of tax)**: *"Tax shall be charged - (a) at the higher rate, in the case of a premium which is liable to tax at that rate; and (b) at the standard rate, in any other case."* The rates are **standard rate 12 per cent** and **higher rate 20 per cent**, both in force since **1 June 2017** and **unchanged since**.

**Which supplies attract the higher rate.** **Section 51A**: *"A premium received under a taxable insurance contract by an insurer is liable to tax at the higher rate if it falls within one or more of the paragraphs of Part II of Schedule 6A."* In HMRC's published summary that is: **travel insurance**; **insurance on mechanical or electrical appliances** (electronic goods and household appliances) sold by the supplier of the goods; and **certain vehicle insurance arranged by the vehicle supplier rather than by an insurance company**, including hired vehicles. **Ordinary motor insurance bought from an insurer is standard-rated at 12%**, and that distinction is the single most common reader error.

**Exemptions.** IPT exemptions are in **Finance Act 1994 Schedule 7A (Contracts that are not taxable)**: para 1 **reinsurance**; para 2 **contracts constituting long term business** (life, pensions, permanent health); para 3 **motor vehicles let on relevant benefit terms** (the Motability route); para 4 **commercial ships**; paras 5 and 6 **lifeboats and lifeboat equipment**; para 7 **commercial aircraft**; para 7A **spacecraft**; para 8 **risks outside the United Kingdom**; para 9 **foreign or international railway rolling stock**; paras 10 and 11 **the Channel Tunnel**; para 12 **goods in foreign or international transit**; para 13 **credit**; para 14 **exchange losses**; para 15 **the provision of financial facilities**.

**Did FA 2026 change either rate? No.** Neither the standard nor the higher rate changed: they remain **12%** and **20%** from 1 June 2017. Two **scope** changes are in train and must be date-tagged rather than described as rate changes:
- **From 1 July 2026**, the **Schedule 7A para 3 exemption for motor vehicles let on relevant benefit terms is restricted**: it will apply only to vehicles substantially and permanently adapted for, or originally designed for, wheelchair or stretcher users. Other vehicles leased through qualifying schemes become liable to IPT at the **standard 12% rate**, for **leases entered into on or after 1 July 2026** (pre-existing leases keep the exemption).
- **From 1 August 2026**, premiums on **buildings and contents insurance for UK-based embassies** become liable to IPT, the risk being located in the UK.

**Source:**
- *Finance Act 1994*, Part III, sections 51 and 51A, and Schedule 7A (Contracts that are not taxable) - https://www.legislation.gov.uk/ukpga/1994/9/schedule/7A and the Part III text at https://www.legislation.gov.uk/ukpga/1994/9 (the `/part/III` URL 404s; Part III sections were read via the Act page)
- HMRC, *Insurance Premium Tax rates* - https://www.gov.uk/government/publications/rates-and-allowances-insurance-premium-tax/insurance-premium-tax-rates
- HMRC/HMT, *Motability Scheme: reforming tax reliefs* - https://www.gov.uk/government/publications/vat-and-insurance-premium-tax-change-to-reliefs-for-qualifying-motor-vehicle-leasing-schemes/motability-scheme-reforming-tax-reliefs

**Confidence: LOCKED** for the 12% / 20% rates, s.51, s.51A, Schedule 6A Part II as the higher-rate gateway, and the Schedule 7A exemption list. **UNCONFIRMED, and this matters:** the gov.uk Motability page describes the 1 July 2026 change as enacted by **"Finance Bill 2025-26"** announced at Budget 2025. This session did **not** verify the enacting section in **Finance Act 2026 (enacted 18 March 2026)**. **Do not cite an FA 2026 section number for the Motability IPT restriction until that is fetched.** State the change and its 1 July 2026 date, sourced to the gov.uk policy paper, and nothing more.

**Also unverified:** the **exact wording of Schedule 6A Part II** (which paragraphs create the higher-rate classes) was not read. The higher-rate categories above come from HMRC's published rates page, not from the Schedule. Cite the rates page for them.

---

## Anchor 6. Retail schemes and the VAT Retail Export Scheme

**Locked position, retail schemes.** A retailer who cannot account for VAT on each individual sale may use a **retail scheme** under the **Value Added Tax Regulations 1995 (S.I. 1995/2518), regulations 66 to 75**, as set out in **VAT Notice 727**. The published schemes and their **tax-exclusive retail turnover limits**:

| Scheme | Tax-exclusive retail turnover limit | Notice 727 para |
|---|---|---|
| Point of Sale | £130 million | 3.2 |
| Apportionment Scheme 1 | £1 million | 3.5.1 |
| Apportionment Scheme 2 | £130 million | 3.6.1 |
| Direct Calculation Scheme 1 | £1 million | 3.7.1 |
| Direct Calculation Scheme 2 | £130 million | 3.8 |
| Bespoke scheme agreed with HMRC | **mandatory above £130 million** | 3.2 |

Point of sale identifies the VAT rate at the till; apportionment splits takings by reference to the VAT-inclusive value of purchases at each rate; direct calculation marks up the minority-rate goods to expected selling prices. A retailer whose turnover **is about to exceed £130 million** must contact HMRC to agree a bespoke scheme.

**Locked position, VAT RES.** The **VAT Retail Export Scheme was WITHDRAWN in Great Britain (England, Scotland and Wales) with effect from 1 January 2021**, at the end of the transition period, **together with the "airside" tax-free shopping concession (ESC 9.1)**. **It continues to operate in Northern Ireland**, where VAT-registered retailers may zero-rate goods sold to qualifying overseas visitors for personal export, under **VAT Notice 704** and the Retail Export Scheme (Northern Ireland) guidance. Operational point for NI retailers: VAT RES forms for NI sales made on or after 1 January 2021 **will not be stamped by Border Force in Great Britain** and must be presented on leaving Northern Ireland or the EU.

**Source:**
- HMRC, *Retail schemes (VAT Notice 727)*, paras 3.2, 3.5.1, 3.6.1, 3.7.1, 3.8, citing the Value Added Tax Regulations 1995 regulations 66 to 75 - https://www.gov.uk/guidance/retail-schemes-notice-727 (note the `retail-schemes-vat-notice-727` slug 404s)
- HMRC, *Revenue and Customs Brief 21 (2020): withdrawal of the VAT Retail Export Scheme and the tax-free shopping concession* - https://www.gov.uk/government/publications/revenue-and-customs-brief-21-2020-withdrawal-of-the-vat-retail-export-scheme-and-the-tax-free-shopping-concession/revenue-and-customs-brief-21-2020-withdrawal-of-the-vat-retail-export-scheme-and-the-tax-free-shopping-concession
- HMRC, *Retail Export Scheme (Northern Ireland)* - https://www.gov.uk/guidance/retail-export-scheme-northern-ireland (identified via gov.uk search, **not fetched directly**)

**Confidence: LOCKED for the scheme limits and for the VAT RES withdrawal.** The Northern Ireland operational detail (form stamping) is **UNCONFIRMED at paragraph level**, having come from a gov.uk-restricted search snippet of Notice 704 rather than a direct fetch.

**CONTRADICTS EXISTING HP (minor, one clause).** house_positions.md §21.4 states:

> "**point of sale** (identify the rate at the till, **no turnover cap below the bespoke line**)"

**The HP clause is right in substance but loose in wording.** Notice 727 para 3.2 gives Point of Sale the **same £130 million tax-exclusive limit** as Apportionment 2 and Direct Calculation 2; there is no *lower* cap, which is what the HP was getting at, but "no turnover cap" is not accurate. **Recommended wording change: "point of sale (identify the rate at the till, available up to the £130 million limit, same as the other large-retailer schemes)."** Everything else in §21.4 (Apportionment 1 and Direct Calculation 1 at £1 million, Apportionment 2 and Direct Calculation 2 at £130 million, bespoke mandatory above £130 million) is **confirmed correct**. The §21.4 statutory hook "VAT Regulations 1995 (retail schemes, Part IX)" should be **narrowed to regulations 66 to 75**, which is what Notice 727 cites.

---

## Anchor 7. Northern Ireland Retail Movement Scheme (NIRMS)

**Locked position. This is NOT a tax or VAT matter.** The **Northern Ireland Retail Movement Scheme** is a **sanitary and phytosanitary (SPS) and food-labelling scheme** established under the **Windsor Framework** and **administered by the Department for Environment, Food and Rural Affairs (Defra)**, not by HMRC. It is the simplified route for moving **prepacked retail agri-food goods** from Great Britain to Northern Ireland, and it replaced the Scheme for Temporary Agrifood Movements into Northern Ireland (STAMNI). It launched on **1 October 2023**.

**Who must use it.** Businesses responsible for selling, or facilitating the movement of, **food for final consumption in Northern Ireland**: retailers, hospitality venues, public-sector food suppliers, wholesalers and businesses operating canteens. Registration is a one-off online process requiring the business type, establishment locations, **UK Food Business Operator registration number** and contact details. Goods move under a **General Certificate** rather than individual export health certificates, and must meet UK public-health and consumer-protection standards.

**Current operative status in 2026.** The scheme is **live and fully phased in**. The **"Not for EU" individual labelling requirement** completed its phasing: phase 1 from October 2023, **phase 2 from 1 October 2024** (more dairy in scope), and **phase 3 from 1 July 2025** (the remaining food and retail goods requiring individual labelling). **SPS identity check rates have been progressively reduced: 10% (October 2023), 8% (October 2024), 5% (July 2025).**

**Source:** Defra, *Retail Movement Scheme: how the scheme will work* - https://www.gov.uk/government/publications/retail-movement-scheme-how-the-scheme-will-work/retail-movement-scheme-how-the-scheme-will-work ; Defra, *Labelling requirements for certain products moving from Great Britain to retail premises in Northern Ireland under the Retail Movement Scheme* - https://www.gov.uk/guidance/labelling-requirements-for-certain-products-moving-from-great-britain-to-retail-premises-in-northern-ireland-under-the-retail-movement-scheme (identified via gov.uk search, **not fetched directly**)

**Confidence: LOCKED** on the central finding, which is the one the build needs: **NIRMS is SPS and agri-food labelling, not tax.** The phase dates and check percentages are **UNCONFIRMED at paragraph level** (summarised from the fetched overview page plus a gov.uk-restricted search).

**RECOMMENDATION: DROP the NIRMS page from this build.** It is not a VAT or tax matter, it sits with Defra rather than HMRC, its audience is GB-to-NI agri-food movers rather than the owner-managed businesses this site serves, and an accountancy site publishing SPS-certification guidance is outside the estate's competence fence. If the traffic is wanted, the defensible replacement is a **genuine VAT page on GB-to-NI goods movements** (the Windsor Framework **Internal Market Movements** and the NI VAT accounting rules at https://www.gov.uk/guidance/internal-market-movements-from-great-britain-to-northern-ireland and https://www.gov.uk/guidance/how-vat-will-apply-to-goods-moving-between-great-britain-and-northern-ireland), which **is** HMRC ground and does sit in this site's scope. Neither of those two pages was fetched in this session, so that replacement page needs its own verification pass before it is written.

---

## Summary of what could NOT be confirmed

1. **Schedule 8 Group 14's name.** Two fetches of the same index page gave conflicting answers. Do not name Group 14 on any page.
2. **Verbatim item text of Schedule 9 Groups 1, 7 and 10, and Schedule 8 Group 16.** The legislation.gov.uk schedule pages are too large for reliable extraction, and the `/schedule/N/part/II/crossheading/...` URL pattern returns 404. Group names and locations are confirmed; item wording is not. Quote HMRC notices, not the statute, until a direct read is done.
3. **Notice 714's clothing measurement tables.** Returned in summary form. Publish the principle, link to the table, do not reproduce centimetre figures.
4. **VAT Notice 701/2 (welfare).** The guidance URL 404'd; welfare definitions rest on gov.uk-restricted search snippets. Re-fetch before publishing the welfare page.
5. **VAT Notice 744A (passenger transport).** Not fetched; the statutory 10-passenger rule is confirmed from Schedule 8, the HMRC practice gloss is not.
6. **The FA 2026 section enacting the 1 July 2026 IPT Motability restriction.** gov.uk calls it "Finance Bill 2025-26". No section number verified. Cite the policy paper only.
7. **FA 2025 s.47's verbatim definition of "private school"** and the verbatim text of new Schedule 9 Part 3.
8. **Schedule 6A Part II FA 1994**, the higher-rate IPT gateway paragraphs.

---

*Researched and drafted 2026-09-11. house_positions.md was read but NOT edited. No git commands were run.*
