---
title: 'Bespoke Integrations as R&D: When Building Bridges Qualifies'
slug: bespoke-integrations-rd-agency
canonical: https://www.agencyfounderfinance.co.uk/blog/tax-and-compliance/bespoke-integrations-rd-agency
date: '2026-05-16'
author: Agency Founder Finance Editorial Team
category: Tax and Compliance
metaTitle: 'Bespoke Integration R&D Agency: Tax Relief for Custom Builds'
metaDescription: Custom API builds and bespoke integrations can qualify for R&D tax credits. We explain the criteria, common pitfalls, and how to structure claims for your
altText: Software developer working on a custom API integration between two platforms on a dual-monitor setup in a modern UK agency office
image: /blog/bespoke-integrations-rd-agency.jpg
imageCredit:
  photographer: Sergej  Strannik
  photographerUrl: https://www.pexels.com/@strannik-sk
  sourceUrl: https://www.pexels.com/photo/modern-architecture-in-coesfeld-germany-36815866/
  source: Pexels
h1: 'Bespoke Integrations as R&D: When Building Bridges Qualifies'
summary: Custom integrations between software platforms can qualify for R&D tax credits if they solve genuine technical uncertainty. We walk through the criteria, common mistakes, and how to prepare a defensible claim for your agency.
schema: ''
faqs:
- question: Can a marketing agency claim R&D tax credits for building custom integrations between platforms?
  answer: Yes, provided the work involves resolving genuine technical uncertainty. If your team had to reverse-engineer an undocumented API, build a custom data transformation layer that exceeded standard tools, or solve performance issues that required novel architecture, the work may qualify. The key is documenting the technical challenges and the systematic investigation your team undertook.
- question: What documentation do I need to support an R&D claim for integration work?
  answer: You need contemporaneous records showing the technical uncertainty and your team's approach to resolving it. This can include time logs with R&D-specific project codes, technical notes or Slack conversations describing the challenges, records of approaches that failed, and cost records for staff time, software, and subcontractors. HMRC expects to see that the uncertainty existed at the start of the project and that you investigated systematically.
- question: Can I claim R&D tax credits if the integration was built for a client?
  answer: Generally no, if the client paid you for the work. R&D relief is for the company bearing the financial risk of the development. If the client is paying regardless of outcome, the risk sits with them. The exception is where you build the integration as part of your own product development, not a client project. If you are unsure, speak to your accountant before filing.
- question: What is the tax saving from an R&D claim for integration work?
  answer: For a profitable SME agency, the saving is typically 19-25% of the qualifying expenditure, depending on your profit level. For loss-making agencies, you can surrender the loss for a cash payment of up to 14.5% of the enhanced expenditure. A claim on £39,000 of qualifying costs could yield a tax saving of approximately £13,783 or a cash payment of around £10,518.
authorSlug: james-whitfield
updatedDate: '2026-05-17'
keyTakeaways:
- Custom integrations that solve genuine technical uncertainty can qualify for UK R&D tax credits under HMRC's BEIS guidelines.
- Routine integration using standard APIs and published documentation does not qualify as R&D for tax purposes.
- Qualifying integration work includes reverse-engineering undocumented proprietary systems or handling inconsistent API behaviour.
- A successful R&D claim requires systematic investigation of a technical challenge not resolvable by standard industry practice.
- Examples of qualifying work include building custom parsers for undocumented data formats or novel solutions for performance constraints.
---
<p>If your agency builds custom integrations between software platforms, you might be leaving money on the table. The kind of work that frustrates your developers, the "this should work but it doesn't" debugging, the proprietary APIs with undocumented behaviour, the data transformation problems that keep your senior dev up at night. That is precisely the kind of work HMRC expects to see in a legitimate R&D claim.</p>

<p>Most agency founders assume R&D tax credits are for pharmaceutical companies or aerospace engineers. They picture labs and white coats. But the legislation is broader than that. It covers any project that seeks to resolve scientific or technological uncertainty. And in the context of a digital agency, that uncertainty often shows up in bespoke integration work.</p>

<p>This article is about when a <strong>bespoke integration R&D agency</strong> claim works, when it doesn't, and how to structure your claim so it survives HMRC scrutiny.</p>

<h2>What Qualifies as R&D in an Integration Project</h2>

<p>HMRC uses a specific definition of R&D for tax purposes. It is not about whether your team worked hard. It is about whether they faced a technical challenge that could not be resolved by applying standard industry practice.</p>

<p>The relevant criteria come from the BEIS (Department for Business, Energy and Industrial Strategy) guidelines. To qualify, your project must:</p>

<ul>
<li>Seek to achieve an advance in science or technology</li>
<li>Face scientific or technological uncertainty at the outset</li>
<li>Attempt to resolve that uncertainty through systematic investigation</li>
<li>Result in a resolution that was not readily deducible by a competent professional in the field</li>
</ul>

<p>For an integration project, the "advance" does not need to be world-changing. It just needs to be an advance for your field. If you are connecting a legacy CRM system with a modern ecommerce platform, and the standard connectors fail because the CRM uses a proprietary data structure with no public documentation, the work to build a working integration from scratch could qualify.</p>

<h3>The Line Between Routine Integration and R&D</h3>

<p>Not every integration qualifies. If you are using standard APIs with published documentation, following the vendor's integration guide, and the work is something any competent developer could replicate, that is routine development. It is not R&D.</p>

<p>The line gets crossed when you encounter genuine technical uncertainty. Examples include:</p>

<ul>
<li>An API that behaves inconsistently across different data volumes or transaction types</li>
<li>A proprietary system with no public documentation where you must reverse-engineer the data format</li>
<li>Data transformation requirements that exceed the capabilities of existing middleware tools</li>
<li>Performance constraints that require novel caching or queuing architectures</li>
<li>Security requirements that conflict with the platform's intended data flow</li>
</ul>

<p>A 12-person digital agency in Bristol we worked with spent three months building a custom integration between a niche property management system and a CRM platform. The PMS vendor had no public API. The data export was a flat file with undocumented fields. The team had to analyse thousands of records, identify patterns, and build a parser that could handle edge cases the vendor had never documented. That is R&D.</p>

<h2>Common Integration Scenarios That Qualify</h2>

<p>Let me give you some concrete examples from agency work we have seen qualify successfully.</p>

<h3>Legacy System Integration</h3>

<p>A PR agency needed to connect a 15-year-old media monitoring database with a modern reporting dashboard. The database used a proprietary binary format. No off-the-shelf connector existed. The development team had to reverse-engineer the data structure, build a custom extraction tool, and design a transformation layer that could handle the database's inconsistent date formats and character encoding issues. That work qualified for R&D relief.</p>

<h3>Multi-Platform Data Synchronisation</h3>

<p>An advertising agency was building a campaign management platform that needed to pull data from Google Ads, Facebook Ads, LinkedIn, TikTok, and a dozen smaller ad networks. Each platform had different data schemas, different refresh rates, and different authentication protocols. The team had to build a unified data model and a synchronisation engine that could handle partial failures, rate limiting, and inconsistent data quality across all sources. That systematic work to resolve the technical uncertainty qualified.</p>

<h3>Custom Middleware for Niche Platforms</h3>

<p>A creative agency working with a luxury retail client needed to integrate a bespoke inventory management system with Shopify Plus. The inventory system used a non-standard XML schema that included nested elements the Shopify API could not accept. The team built a custom middleware layer that transformed the XML into Shopify-compatible JSON, handled stock-level reconciliation, and managed error recovery when either system was unavailable. The technical challenge was in the data transformation and error handling logic, which went beyond standard integration patterns.</p>

<h2>What Does Not Qualify</h2>

<p>Let me save you some time and HMRC correspondence. The following do not qualify:</p>

<ul>
<li>Installing and configuring a standard plugin or connector</li>
<li>Following a vendor's published integration guide step by step</li>
<li>Customising the user interface of an existing integration</li>
<li>Building a simple data export/import using CSV files</li>
<li>Any work that a competent developer could complete without experimentation</li>
</ul>

<p>The key test is: did your team face uncertainty that required systematic investigation to resolve? If the answer is no, you do not have a claim.</p>

<h2>How to Document Your Integration R&D Work</h2>

<p>Documentation is where most agency R&D claims fall apart. HMRC will ask for evidence that technical uncertainty existed and that you attempted to resolve it systematically. Without documentation, your claim is a guess. And HMRC does not accept guesses.</p>

<p>Here is what you need to capture for each qualifying project:</p>

<h3>Project Records</h3>
<p>Keep a running log of the technical challenges encountered during the integration build. This does not need to be formal. A Slack channel, a Trello board, or a Google Doc updated weekly by your lead developer is fine. What matters is contemporaneous evidence that shows what you were trying to solve and when.</p>

<p>For example: "Week 3: The PMS API returns a 500 error when we send orders with more than 15 line items. Vendor support says this is a known issue but cannot give a fix date. We are testing alternative payload structures to work around it." That is evidence of technical uncertainty.</p>

<h3>Technical Notes</h3>
<p>Capture the approaches you tried and why they failed. HMRC wants to see that you went through a genuine process of elimination. A note that says "tried batch processing, failed due to API rate limits. Tried parallel processing, failed due to race conditions. Solved with queue-based architecture using Redis" tells a clear story of systematic investigation.</p>

<h3>Time Tracking</h3>
<p>You need to separate qualifying R&D time from routine development time. If your developers use a time tracking tool like Harvest or Toggl, create a specific project code for R&D work. If you use Xero Projects or QuickBooks Time, tag qualifying hours separately. The key is that you can show HMRC exactly how many hours went into resolving technical uncertainty.</p>

<h3>Cost Records</h3>
<p>For an SME R&D claim, qualifying costs include:</p>
<ul>
<li>Staff costs (salaries, employer NI, pension contributions) for the time spent on qualifying work</li>
<li>Software licenses directly used in the R&D (e.g., development tools, testing environments)</li>
<li>Subcontractor costs (subject to the 65% rule for externally provided workers)</li>
<li>Consumables (cloud hosting, API credits, testing data)</li>
</ul>

<p>You need to be able to identify these costs separately from your general operational spend. A good chart of accounts with specific R&D cost codes makes this straightforward.</p>

<h2>The Numbers: What a Claim Looks Like</h2>

<p>Let me give you a worked example. A 15-person digital agency in Manchester's Northern Quarter spends six months building a custom integration between a client's legacy ERP system and a modern ecommerce platform. The qualifying R&D work takes 400 hours across two senior developers.</p>

<p>Staff costs for that 400 hours: £28,000 (salary plus employer NI and pension). Software licenses and cloud hosting directly attributable to the R&D: £3,200. Subcontractor costs for a specialist data architect: £12,000 (65% of this qualifies, so £7,800).</p>

<p>Total qualifying expenditure: £39,000. Under the SME scheme, the enhanced deduction is 186% of that figure, giving a total deduction of £72,540. If the agency is paying 19% corporation tax on profits up to £50k, the tax saving is approximately £13,783. If the agency is loss-making, it can surrender the loss for a cash credit of up to 14.5% of the enhanced expenditure, which would give a cash payment of approximately £10,518.</p>

<p>Those numbers are real. That is not theoretical. That is cash back in your business or tax you do not pay.</p>

<h2>Common Mistakes Agency Founders Make</h2>

<p>I see the same errors repeatedly. Here are the ones to avoid.</p>

<h3>Claiming for Client-Funded Work</h3>
<p>If your client paid you to build the integration, you cannot claim R&D tax credits on the costs. The relief is for the company bearing the financial risk of the R&D. If the client is paying you regardless of outcome, the risk sits with them, not you. There are exceptions for subsidised expenditure, but the general rule is: if the client paid for it, you cannot claim it.</p>

<p>The exception is where you are building the integration as part of your own product development, not a client project. If you build a reusable integration framework that you then license to multiple clients, the development costs may qualify.</p>

<h3>Not Separating R&D Time from BAU</h3>
<p>HMRC will ask for a breakdown of qualifying time versus business-as-usual time. If your developers spend 40% of their week on R&D and 60% on routine client work, you need to show that split. A single time code that lumps everything together will not work.</p>

<h3>Ignoring the Subsidised Expenditure Rules</h3>
<p>If you receive a grant, a subsidy, or a client payment specifically for the R&D work, the subsidised expenditure rules can reduce or eliminate your claim. This is complex territory. If your project has any external funding, speak to your accountant before filing.</p>

<h3>Claiming for Work That Failed</h3>
<p>This one surprises people. Failed projects can qualify for R&D. The test is whether you faced technical uncertainty, not whether you resolved it. If you spent six months trying to build an integration that ultimately proved impossible with the available technology, that work can still qualify. The key is documentation showing what you tried and why it failed.</p>

<h2>How to Prepare a Claim</h2>

<p>If you think your agency has qualifying integration work, here is the process we recommend.</p>

<ol>
<li><strong>Review your project list</strong> from the last two accounting periods. Identify any integration projects that involved custom builds, undocumented APIs, proprietary data formats, or performance challenges that required novel solutions.</li>
<li><strong>Interview your lead developers.</strong> Ask them which projects required genuine problem-solving. What kept them up at night? What did they have to experiment with before finding a solution? Their answers will tell you where the R&D is.</li>
<li><strong>Gather contemporaneous documentation.</strong> Pull together time logs, technical notes, Slack archives, and any written records that show the technical challenges and the approaches tried.</li>
<li><strong>Calculate qualifying costs.</strong> Work with your accountant to identify the staff time, software, and subcontractor costs that relate directly to the qualifying work.</li>
<li><strong>Prepare a technical report.</strong> This is the document that explains to HMRC what the technical uncertainty was, how you approached it, and what the outcome was. A good technical report is the difference between a smooth claim and an HMRC enquiry.</li>
<li><strong>Submit the claim with your corporation tax return.</strong> The claim is made on the CT600 form, with supporting calculations in the computation.</li>
</ol>

<p>As <a href="/about">ICAEW qualified accountants</a> working exclusively with agency founders, we see R&D claims come through our doors in two states: well-documented and defensible, or thrown together at year-end with no supporting evidence. The former gets you a tax saving. The latter gets you an HMRC letter asking for more information.</p>

<p>If your agency builds bespoke integrations and you have not considered an R&D claim, you are probably leaving money on the table. The key is to start documenting the technical challenges now, while the work is fresh in your developers' minds, rather than trying to reconstruct it eighteen months later when HMRC asks.</p>

<p>For more on how R&D tax credits apply to agency work, read our guide on <a href="/blog/tax-and-compliance">tax and compliance for agencies</a>. If you want to discuss whether your integration work qualifies, <a href="/contact">get in touch</a>.</p>
