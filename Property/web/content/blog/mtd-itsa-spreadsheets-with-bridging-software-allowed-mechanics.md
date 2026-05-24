---
title: "Spreadsheets and Bridging Software for MTD ITSA: The Digital-Link Mechanics"
slug: "mtd-itsa-spreadsheets-with-bridging-software-allowed-mechanics"
canonical: "https://www.propertytaxpartners.co.uk/blog/making-tax-digital-mtd/mtd-itsa-spreadsheets-with-bridging-software-allowed-mechanics"
date: "2026-05-23"
author: "Property Tax Partners Editorial Team"
category: "Making Tax Digital (MTD)"
metaTitle: "MTD ITSA: Spreadsheets + Bridging Software, the Mechanics"
metaDescription: "MTD ITSA allows spreadsheet plus bridging software. The digital-link rule defines what passes and what fails. Cell refs work, copy-paste does not."
altText: "Top-down view of analytical data sheets and a laptop, representing a landlord using a spreadsheet for MTD ITSA digital record-keeping"
image: "https://images.pexels.com/photos/6694560/pexels-photo-6694560.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
imageCredit:
  photographer: Tima Miroshnichenko
  photographer_url: https://www.pexels.com/@tima-miroshnichenko
  source: Pexels
  source_url: https://www.pexels.com/photo/business-data-printout-on-white-paper-6694560/
h1: "Spreadsheets Plus Bridging Software for MTD ITSA: The Digital-Link Mechanics"
summary: "Landlords running on a longstanding spreadsheet often resist swapping to a full SaaS accounting suite for MTD ITSA, and they are right to ask whether they have to. The answer is no. House position §19.6 and §19.14 confirm that spreadsheet plus HMRC-recognised bridging software is a permitted route, provided every data transfer satisfies the digital-link rule. This page works the operational mechanics: what counts as a digital link and what does not (cell references and CSV exports yes, copy-paste no), what bridging software actually does between spreadsheet and HMRC API, the spreadsheet column discipline that maps to the SA105 expense categories, a worked compliant-versus-non-compliant data flow, and when the spreadsheet route is sensibly the right answer versus when a full SaaS suite saves the friction."
schema: ""
faqs:
  - question: "Am I allowed to keep using a spreadsheet for MTD ITSA, or do I have to switch to accounting software?"
    answer: "You are allowed to keep using a spreadsheet, provided you pair it with HMRC-recognised bridging software that submits the quarterly updates to the MTD ITSA API on your behalf. The spreadsheet plus bridging combination is the same arrangement HMRC has accepted under MTD for VAT since 2019, and the same principle (the digital-record obligation plus the digital-link rule) applies to MTD ITSA from 6 April 2026. House position §19.6 confirms the route and §19.14 covers the digital-link mechanic specifically."
  - question: "What is bridging software actually doing in this setup?"
    answer: "Bridging software is a translator. It reads your spreadsheet (typically by you exporting a defined range as CSV, or by the bridging tool reading the workbook directly via an Excel add-in or Google Sheets connector), maps your spreadsheet columns to the corresponding HMRC MTD ITSA API fields, authenticates against your Government Gateway credentials, submits the quarterly update via the MTD ITSA API, and returns a submission receipt. The bridging vendor does not store your records on an ongoing basis (the spreadsheet remains your record of original entry); it is the API conduit between your records and HMRC."
  - question: "What is a digital link, in HMRC's definition?"
    answer: "A digital link is a transfer of data between software (or between cells in a spreadsheet) that does not involve manual transcription, copy-paste, cut-paste, screen-reading, or hand re-keying. Acceptable digital links include cell references and formulae within a workbook, linked tables across sheets, CSV exports read by another tool, API transfers, and automated extracts via script. Unacceptable are copy-paste, cut-paste, retyping a figure from one sheet into another, reading a number off a screen and typing it elsewhere. The rule is derived from HMRC notice 700/22 (the MTD for VAT framework) and applies to MTD ITSA from 6 April 2026."
  - question: "Can I have an Excel workbook with multiple sheets and use formulae to roll up to a summary sheet?"
    answer: "Yes, that is exactly what HMRC has in mind. Cell references and formulae across sheets within one workbook are digital links by HMRC's definition. A workbook with a transactions sheet (line-by-line income and expense entries), a category-summary sheet (formula-driven roll-up by SA105 category), and a quarterly-update sheet (formula-driven roll-up by quarter, fed to the bridging tool) is fully compliant, provided every link between sheets is formulaic rather than manual."
  - question: "What is the most common mistake landlords make in their spreadsheets that breaks the digital-link rule?"
    answer: "Typing a number into a summary cell by hand, when that number should come from a formula referencing the underlying transactions. The pattern is: a landlord keeps a careful transactions sheet, then opens a quarterly-update sheet at quarter-end and types the totals into it (often after looking at the transactions sheet's autosum). The typed number is not a digital link, even if it equals the formula result. The fix is trivial (replace the typed cell with =SUM(Transactions!D2:D300) or equivalent) but the discipline must hold across every quarter."
  - question: "Does copy-paste of an entire range count as a digital link?"
    answer: "No. HMRC's position is that any form of cut-paste or copy-paste (including paste-special-values, which strips the original formula) is not a digital link. Even though the result is the same number, the mechanism is not automated. The acceptable equivalent is to use cell references or formulae that pull from the source range, so future changes to the source flow through automatically. Excel's paste-link function (which inserts a reference rather than a copy) is acceptable. Right-click paste-values is not."
  - question: "What about importing CSVs into bridging software? Is that a digital link?"
    answer: "Yes, provided the CSV is exported automatically (or with a single deterministic action like clicking File > Save As CSV) and not modified by hand before import. The CSV-export-then-CSV-import flow is the most common way landlords on a spreadsheet feed bridging software, and HMRC accepts it as a digital link. Editing the CSV between export and import (re-typing a figure, deleting rows, hand-adding rows that should have been in the source) breaks the link."
  - question: "Do I need different bridging software for MTD ITSA than for MTD for VAT?"
    answer: "Often yes, because the underlying APIs are different. MTD for VAT and MTD for ITSA are separate HMRC services with separate API endpoints; software products on HMRC's MTD VAT compatible list are not automatically on the MTD ITSA list. Vendors typically build for both, but you need to verify the specific product is listed on the MTD ITSA gov.uk compatible-software register. Some vendors charge a single licence covering both; some charge separately."
  - question: "How do I know which bridging vendors are HMRC-recognised?"
    answer: "Check the gov.uk MTD ITSA compatible-software list directly. The list is maintained at gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-income-tax and is the only authoritative source. Filter the list for products that support spreadsheet-bridging (some products are full accounting suites without bridging, some are bridging-only, some are both). House position §19.14 is explicit that we do not name specific vendors in editorial content, because the list changes regularly and naming creates a stale reference."
  - question: "I have a property portfolio across multiple properties. How should I structure the spreadsheet columns?"
    answer: "Typical column structure: date, property reference (or address), counterparty (tenant or supplier), category (one of the SA105 expense categories), amount (gross), VAT (where applicable for commercial), and notes. Rows are line-by-line transactions. A categories sheet rolls up by SA105 category (gross rental income, premises running costs, repairs and maintenance, finance charges, legal and management fees, cost of services, other property expenses), formula-driven from the transactions sheet. The bridging software reads either the transactions sheet (filtered by quarter) or the rolled-up summary, depending on the vendor's preference."
  - question: "What if I have one property held in a spreadsheet and another property's bookkeeping in a full SaaS package?"
    answer: "You cannot have two separate quarterly submissions for one MTD ITSA cycle. The cycle aggregates all your UK property income at the taxpayer level. You either consolidate everything into one route (move the SaaS-held property's data into the spreadsheet, or move the spreadsheet's data into the SaaS suite), or you use both tools to feed a single bridging software that aggregates before submission. Most landlords in this position rationalise to one tool ahead of the April 2026 mandate to avoid the consolidation friction every quarter."
  - question: "Is it worth migrating to a full SaaS accounting product, or should I stay on spreadsheet plus bridging?"
    answer: "The decision is largely about portfolio scale and your time cost. For one to three properties with a tidy spreadsheet and reliable bookkeeping discipline, spreadsheet plus bridging is operationally sensible and cheaper than a SaaS subscription. For four or more properties, multiple revenue streams, or any joint ownership where two software environments need to coordinate, a full SaaS product saves the quarterly reconciliation work. The decision is covered in our companion guide on choosing software by landlord scenario."
  - question: "What is the minimum testing I should do before the mandate goes live in April 2026?"
    answer: "Run at least one parallel quarter ahead of the mandate. Take a representative quarter's data, run it through your spreadsheet, export to the bridging tool, and use HMRC's MTD ITSA pilot environment (open from April 2025) to submit a test quarterly update. Verify the submission lands cleanly, the figures match what your spreadsheet shows, and the bridging software's audit trail is complete. Run the same dry run with your year-end final-declaration data. Issues caught in the pilot dry run are fixable without consequence; issues caught in the first live quarter come with points and potentially £200 penalties at threshold."
dateModified: "2026-05-23"
reviewedBy: "Property Tax Partners Editorial Team"
reviewerCredentials: "UK-based tax advisers specialising in property income, MTD ITSA implementation, and the spreadsheet-power-user landlord cohort. Position aligned with house position §19.14 (digital-link rule, Wave 4 extension, locked 2026-05-23) and §19.6 (software requirements)."
reviewedAt: "2026-05-23"
editorialNote: "Operational mechanics page for landlords using a spreadsheet as their primary record system and entering MTD ITSA via bridging software from 6 April 2026. Authority sources: house position §19.14 + §19.6 + HMRC notice 700/22 + gov.uk compatible-software list + FA 2017 Sch A1. Anti-templating boundary: B2 owns the scenario-led software decision-tree, B8 owns the digital-link compliance mechanic specifically. Defers product recommendations to gov.uk register per §19.14."
---
<p>A landlord running on a longstanding spreadsheet often resists swapping to a full SaaS accounting suite for MTD ITSA, and the resistance is reasonable. Their spreadsheet works, the data flow is familiar, the back-history is intact, and the migration cost (data cleanup, retraining, paying for a subscription) is meaningful relative to the underlying compliance need.</p>
<p>The good news: spreadsheet-plus-bridging is a permitted MTD ITSA route. The catch: every data transfer between cells, sheets, the bridging tool, and HMRC's API must satisfy the digital-link rule. This page walks the rule, the mechanics, the spreadsheet column discipline, a compliant-versus-non-compliant worked example, the choice of bridging vendor, and the question of when staying on a spreadsheet still makes sense versus when a full SaaS suite saves the friction.</p>
<h2>What HMRC actually allows</h2>
<p>House position §19.6 confirms that MTD ITSA permits HMRC-recognised compatible software, with two valid forms: a full accounting-suite product (Xero, FreeAgent, QuickBooks, etc) that handles record-keeping and submission together, or a spreadsheet paired with HMRC-recognised bridging software that handles only the submission step. House position §19.14 covers the spreadsheet-plus-bridging route specifically, adopting HMRC's digital-link rule from MTD for VAT (notice 700/22) into the MTD ITSA context.</p>
<p>The legal anchor is FA 2017 Sch A1 paragraph 8, which obliges the taxpayer to keep records in electronic form. The phrase "electronic form" does not specify any particular software; what HMRC has insisted on (through notice 700/22 originally and now via §19.14 for ITSA) is that data moves between systems digitally rather than by hand.</p>
<p>The acceptable forms of digital link, per HMRC and §19.14, are:</p>
<ul>
<li>Cell references and formulae within a workbook (including across sheets and across linked workbooks).</li>
<li>CSV or XML exports from one tool, ingested by another tool without manual edit.</li>
<li>API transfers between systems.</li>
<li>Automated extracts via script.</li>
<li>Bank-feed integrations that import transactions directly into the spreadsheet or accounting tool.</li>
</ul>
<p>The unacceptable forms are:</p>
<ul>
<li>Copy-paste, cut-paste, paste-special-values.</li>
<li>Manual re-keying of a number from one location to another.</li>
<li>Reading a figure from a screen and typing it elsewhere (screen-reading).</li>
<li>Editing a CSV by hand between export and import.</li>
</ul>
<p>That distinction (formulaic versus manual) is the single most important compliance discipline for a spreadsheet-power-user landlord under MTD ITSA.</p>
<h2>What bridging software actually does</h2>
<p>Bridging software is a thin API conduit. It does not store your records, it does not perform bookkeeping, and it does not categorise transactions on your behalf. What it does:</p>
<ol>
<li>Reads a defined range of your spreadsheet (or accepts a CSV export).</li>
<li>Maps each spreadsheet column to a corresponding HMRC MTD ITSA API field (income line, premises running costs, repairs, finance charges, etc).</li>
<li>Authenticates against your Government Gateway credentials.</li>
<li>Submits the quarterly update via the MTD ITSA API endpoint.</li>
<li>Returns a confirmation receipt and writes an audit trail.</li>
</ol>
<p>The data flow is linear: spreadsheet → bridging tool → Government Gateway authentication → HMRC API → confirmation. The bridging tool is the translator at the API boundary; your spreadsheet remains the system of record for everything else.</p>
<p>Pricing for bridging software ranges from free or near-free for the simplest tools (typically with limits on the number of submissions or property count) up to roughly £50 to £150 per year for vendors targeting landlords specifically. Bridging is cheaper than full SaaS accounting because the vendor is doing much less work.</p>
<h2>Spreadsheet column discipline: mapping to SA105 categories</h2>
<p>The discipline that converts a working spreadsheet into an MTD-ready spreadsheet is the column structure. Each row is a transaction; each column captures one attribute of that transaction. The columns that matter for MTD ITSA, mapped to the SA105 categories the API expects, are:</p>
<ul>
<li><strong>Date</strong> (transaction date, not bank-clearance date)</li>
<li><strong>Property reference</strong> (or address, or short code)</li>
<li><strong>Counterparty</strong> (tenant, supplier, agent, etc)</li>
<li><strong>Category</strong> (one of: gross rental income, premises running costs, repairs and maintenance, finance charges, legal-management-and-professional fees, cost of services, other property expenses)</li>
<li><strong>Amount</strong> (gross, in pounds and pence)</li>
<li><strong>VAT</strong> (where applicable, typically only for commercial property landlords)</li>
<li><strong>Notes</strong> (a short description, useful for audit trail)</li>
</ul>
<p>A summary sheet rolls up by category and by quarter, driven entirely by formulae (SUMIFS, FILTER, or pivot-table equivalents). The bridging tool reads either the transactions sheet filtered by quarter, or the rolled-up summary, depending on the vendor's preference.</p>
<p>Joint-owner spreadsheets add an ownership-share column (50/50, 70/30, or whatever the beneficial-interest split is) and a derived "your share" column driven by =Amount * Share. The bridging tool then reads the your-share column rather than the gross amount. This pattern keeps the underlying source clean while producing per-owner figures correctly.</p>
<h2>A compliant versus non-compliant worked example</h2>
<p>Take Khan, a landlord with two BTLs in Reading and Slough, who runs his bookkeeping on an Excel workbook he built himself in 2018.</p>
<p><strong>Compliant flow:</strong></p>
<ul>
<li>Sheet 1 (Transactions): line-by-line entries for every rent receipt and every expense. Columns: Date, Property, Counterparty, Category, Amount, Notes.</li>
<li>Sheet 2 (Quarterly Summary): formulae like <code>=SUMIFS(Transactions!E:E, Transactions!D:D, "Repairs and maintenance", Transactions!A:A, "&gt;="&amp;DATE(2026,4,6), Transactions!A:A, "&lt;="&amp;DATE(2026,7,5))</code> that roll up Q1 totals by category.</li>
<li>Sheet 3 (Bridging Export): formulaic references to Sheet 2, formatted in the column order the bridging vendor requires. Khan exports this sheet as CSV at quarter-end and imports into the bridging tool.</li>
<li>Bridging tool reads the CSV, validates, submits via the MTD ITSA API. Submission receipt logged.</li>
</ul>
<p>Every step in that flow is a digital link. The CSV export is deterministic (File &gt; Save As CSV with no edit between export and import). The formulae in Sheets 2 and 3 are unambiguous digital links from the source data. The bridging tool's API transfer to HMRC is the final digital link.</p>
<p><strong>Non-compliant flow:</strong></p>
<ul>
<li>Sheet 1: same line-by-line transactions.</li>
<li>Quarterly summary: Khan opens the file at quarter-end, looks at the autosum in the status bar for each category, and types the four quarterly totals into a new "Q1 totals" sheet by hand.</li>
<li>Khan emails the Q1 totals to his bookkeeper, who types the numbers into the bridging tool's web form.</li>
</ul>
<p>The hand-typing in step two is manual re-keying. The web-form data entry in step three is screen-reading plus manual entry. Both break the digital-link rule. The submitted figure might match what the transactions show, but the path it took to get there is non-compliant under §19.14.</p>
<p>The fix on Khan's workbook is trivial: replace the typed quarterly totals with <code>=SUMIFS(...)</code> formulae, and have the bookkeeper export the summary as CSV and feed it to the bridging tool directly. Same numbers, same submission, compliant data flow.</p>
<aside><p>Got a longstanding spreadsheet you want to keep using under MTD ITSA, and need a hand auditing it against the digital-link rule before April 2026?</p><p>We do fixed-scope spreadsheet reviews for landlord clients, flagging the manual-rekey points, suggesting the formulaic equivalents, and recommending a bridging vendor from the gov.uk register. Get in touch via the form below.</p></aside>

<h2>Common pitfalls to avoid</h2>
<p>The patterns we see most often in landlord spreadsheets that need fixing before April 2026:</p>
<ul>
<li>A "summary" sheet that someone updated monthly by typing totals from the transactions sheet. Replace every typed cell with a formula.</li>
<li>Copy-paste of last-month's structure into next-month's tab, with figures overwritten. Replace with structured formulae that reference dynamic ranges.</li>
<li>Manual VAT splits where the spreadsheet has a gross figure and the VAT is derived by mental arithmetic. Replace with an explicit VAT column and formulaic gross / net derivations.</li>
<li>Sheets that load data from a bank statement by manual entry. Replace with a bank-feed integration (where the bank supports it) or a deterministic CSV import from the bank's online portal.</li>
<li>Spreadsheets stored on a personal laptop with no backup. Move to a cloud-hosted location (OneDrive, Google Drive, Dropbox business) so the digital-record obligation under FA 2017 Sch A1 paragraph 8 plus the 7-year retention under TMA 1970 s.12B both hold.</li>
</ul>
<p>None of these fixes require a software change. They are spreadsheet discipline corrections, performed once, and held thereafter.</p>
<aside><p>Worried your spreadsheet has manual-rekey points you cannot easily find?</p><p>We run a structured digital-link audit for landlord workbooks, flagging the cells that need converting to formulae and the data flows that need restructuring before the mandate. Reach out via the form below.</p></aside>

<h2>Choosing bridging software (without naming names)</h2>
<p>The gov.uk MTD ITSA compatible-software list is the authoritative source for which bridging vendors are HMRC-recognised. The list filter for "spreadsheet bridging" or "Excel" identifies the products built for the spreadsheet-power-user landlord.</p>
<p>Evaluation criteria worth applying:</p>
<ul>
<li>HMRC-recognition: appears on the gov.uk MTD ITSA list specifically (not just the MTD VAT list).</li>
<li>Spreadsheet format: handles Excel and Google Sheets, or only one of them (matters if you ever migrate).</li>
<li>Property-level reporting: maps your columns to per-property figures correctly, especially if you have joint ownership splits.</li>
<li>Pricing model: per-submission, per-quarter, or annual flat fee (annual flat fee is typically the cheapest for active landlords).</li>
<li>Audit trail: maintains a submission log, retrieval of past submissions, ability to re-export the data flow for an HMRC enquiry.</li>
<li>Support: a real-person support channel matters in the first one or two quarters as the workflow beds in.</li>
</ul>
<p>We deliberately do not name specific vendors in this page, per §19.14, because the gov.uk register changes (vendors enter and leave the list as they obtain or lose certification, and product names change in mergers). The decision should be a snapshot of the current register, not a pointer to a name on an editorial page that might be stale.</p>
<h2>When spreadsheet plus bridging is the right answer (and when it is not)</h2>
<p>Spreadsheet plus bridging is the right answer when:</p>
<ul>
<li>Portfolio is small (one to three properties) and the existing spreadsheet works.</li>
<li>The landlord's bookkeeping discipline is high (transactions entered weekly or monthly, not annually).</li>
<li>The annual subscription cost of a full SaaS suite is meaningful relative to the rental profit.</li>
<li>There are no joint-ownership complications that would benefit from a SaaS product's per-owner reporting.</li>
<li>The landlord is comfortable with formulae and structured workbooks.</li>
</ul>
<p>A full SaaS accounting product is the right answer when:</p>
<ul>
<li>Portfolio is larger (four or more properties), where the manual maintenance of category formulae and bank-feed reconciliation in a spreadsheet exceeds the SaaS subscription.</li>
<li>The landlord has joint ownership and the SaaS product handles ownership splits automatically.</li>
<li>The landlord uses a bookkeeper or accountant who needs simultaneous access to the records.</li>
<li>The bookkeeping discipline historically has been weak, where a SaaS product's bank-feed-driven workflow imposes structure the landlord has not maintained voluntarily.</li>
<li>The landlord values the consolidated view of rental P&amp;L per property that SaaS products surface natively.</li>
</ul>
<p>Our companion guide on <a href="/blog/making-tax-digital-mtd/mtd-itsa-choosing-software-by-landlord-scenario-decision-tree">choosing software by landlord scenario</a> walks the scenario-led decision in more depth, with a five-question decision tree.</p>
<h2>Pre-mandate testing protocol</h2>
<p>In the run-up to 6 April 2026 (or to the April 2027 / April 2028 phased threshold drops), the protocol that catches issues before they bite is:</p>
<ol>
<li><strong>Audit the workbook</strong>. Open every formula and trace its source. Identify any cell where the value is typed rather than derived. Fix.</li>
<li><strong>Confirm the CSV export is deterministic</strong>. Open the workbook in a different version of Excel (or Google Sheets) and verify the export produces an identical CSV. Some products handle locale (commas vs periods, date formats) inconsistently and corrupt the export.</li>
<li><strong>Sign up with the chosen bridging vendor in pilot mode</strong>. The HMRC MTD ITSA pilot has been open since April 2025; many bridging vendors expose pilot-API connections for testing.</li>
<li><strong>Run a parallel quarter</strong>. Take Q3 or Q4 of the 2025/26 tax year, run it through the spreadsheet, export, import to bridging, submit via the pilot. Verify the submission matches your spreadsheet figures.</li>
<li><strong>Run a parallel year-end</strong>. Test the end-of-period statement and final declaration submissions as well as the quarterly update. The bridging tool typically handles all three; verify each independently.</li>
<li><strong>Save the audit trail</strong>. Keep the bridging tool's confirmation log alongside the workbook. HMRC compliance enquiries reach back six years; the digital trail is your evidence base.</li>
</ol>
<p>Landlords who run this protocol in autumn 2025 land in April 2026 with a tested workflow. Landlords who delay until February or March 2026 are running into the bridging vendors' busiest onboarding window with the least margin for fixing issues.</p>
<h2>Where this page sits</h2>
<p>This page is the operational digital-link mechanics page for landlords on the spreadsheet-plus-bridging route. It does not re-walk the strategic software-decision question (covered in our <a href="/blog/making-tax-digital-mtd/mtd-itsa-choosing-software-by-landlord-scenario-decision-tree">choosing software by scenario page</a>), the headline MTD ITSA changes (covered in our <a href="/blog/making-tax-digital-mtd/mtd-itsa-overview-six-changes-residential-landlords">bucket overview page</a>), or the digital-records evidence discipline more broadly (covered in our <a href="/blog/making-tax-digital-mtd/mtd-itsa-digital-records-receipts-bank-feeds-what-counts-evidence">digital records, receipts, and bank feeds page</a>).</p>
<p>For joint owners with the spreadsheet route, the joint-owner mechanics are covered in our <a href="/blog/making-tax-digital-mtd/mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse">joint-owner quarterly filing page</a>, where the per-owner share-derivation column pattern carries through to the bridging tool the same way.</p>
<p>Source authority for the positions on this page: house position §19.14 (Wave 4 digital-link extension, locked 2026-05-23) and §19.6 (software requirements); HMRC notice 700/22 (MTD for VAT digital-link rule, adapted to ITSA); gov.uk MTD ITSA compatible-software list; FA 2017 Sch A1 paragraph 8 (digital-records obligation); TMA 1970 s.12B (7-year retention).</p>
