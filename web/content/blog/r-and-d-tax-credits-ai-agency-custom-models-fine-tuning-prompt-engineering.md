---
title: Can an AI Agency Claim R&D Tax Credits for Custom Models, Fine-Tuning and Prompt Engineering?
slug: r-and-d-tax-credits-ai-agency-custom-models-fine-tuning-prompt-engineering
canonical: https://www.agencyfounderfinance.co.uk/blog/tax-and-compliance/r-and-d-tax-credits-ai-agency-custom-models-fine-tuning-prompt-engineering
date: '2026-05-16'
author: Agency Founder Finance Editorial Team
category: Tax and Compliance
metaTitle: 'R&D Tax Credits for AI Agencies: Custom Models & Fine-Tuning'
metaDescription: Can your AI agency claim R&D tax credits for custom models, fine-tuning, or prompt engineering? Yes, if you're resolving technical uncertainty. Here's
altText: Two agency founders reviewing a laptop screen showing code and an R&D tax credit calculator in a modern UK office with exposed brick walls
image: /blog/r-and-d-tax-credits-ai-agency-custom-models-fine-tuning-prompt-engineering.jpg
imageCredit:
  photographer: Markus Winkler
  photographerUrl: https://www.pexels.com/@markus-winkler-1430818
  sourceUrl: https://www.pexels.com/photo/scrabble-tiles-on-a-wooden-table-with-the-word-rock-19867470/
  source: Pexels
h1: Can an AI Agency Claim R&D Tax Credits for Custom Models, Fine-Tuning and Prompt Engineering?
summary: Many AI agency founders assume R&D tax credits only apply to labs and hardware projects. That is wrong. If your agency is building custom models, fine-tuning open-source LLMs, or engineering complex prompt chains to solve uncertain technical problems, you likely qualify. This post explains exactly what HMRC looks for, what does not qualify, and how to structure your claim.
schema: ''
faqs:
- question: Can an AI agency claim R&D tax credits for using OpenAI or Anthropic APIs?
  answer: Generally, no. Calling an API with standard prompts is routine work, not R&D. Even if you engineer complex prompts, HMRC typically views this as writing, not technological innovation. The exception is if you are building novel multi-agent systems, custom routing logic, or evaluation frameworks that resolve genuine technical uncertainty. In that case, the API costs for the experimentation phase may qualify, but the production API calls do not.
- question: What records do I need to keep for an AI R&D claim?
  answer: You need contemporaneous evidence showing the technical uncertainty and the work done to resolve it. This includes project briefs, experiment logs, training run records, meeting notes, version control history, and timesheets. HMRC expects to see a clear narrative of what was uncertain, what you tried, and what the outcome was. A spreadsheet of costs without a technical narrative will not survive an enquiry.
- question: Does fine-tuning an open-source model like Llama 3 qualify for R&D?
  answer: It can, but only if the fine-tuning process itself resolved technological uncertainty. If you ran a standard fine-tuning script on your data and it worked first time, that is routine. If you had to experiment with different architectures, training strategies, or evaluation methods because standard approaches failed, that is R&D. The key is whether a competent machine learning engineer would have known the outcome in advance.
- question: How much does an AI agency typically claim for R&D?
  answer: It varies widely based on the agency's size and the nature of its work. A small agency with two qualifying projects might claim £50,000 to £100,000 in costs. A larger agency doing substantial model training work could claim £300,000 to £500,000 or more. The average claim we see for AI-focused agencies is around £180,000 in qualifying costs, which generates a tax saving or cash payment of roughly £25,000 to £45,000 depending on profitability.
authorSlug: james-whitfield
updatedDate: '2026-05-17'
keyTakeaways:
- AI agencies can claim R&D tax credits for building custom models, fine-tuning open-source LLMs, or advanced prompt engineering if the work resolves technological uncertainty.
- HMRC requires that the project had a defined start and end, sought to overcome scientific or technological uncertainty, and advanced the field of science or technology.
- Training a model from scratch qualifies as R&D if you document specific uncertainties like architecture, data selection, or hyperparameters that required experimentation.
- Fine-tuning open-source models qualifies only if the fine-tuning process itself resolved technological uncertainty, not if it was routine engineering.
- Claims fail when agencies use standard model architectures with standard training data or make vague claims without technical records backing up the uncertainty.
---
<p>You are an AI agency founder. Your team has spent the last six months fine-tuning a Llama 3 model on proprietary client data to generate compliant marketing copy for a regulated industry. You have built custom retrieval-augmented generation (RAG) pipelines. You have engineered prompt chains that route queries through multiple models to produce accurate outputs. You have hit dead ends, changed approaches, and eventually landed on something that works.</p>

<p>That sounds like research and development. And for <strong>r&d tax credits ai agency</strong> claims, it often is.</p>

<p>HMRC's definition of R&D is broader than most founders assume. It does not require white coats, laboratories, or physics PhDs. It requires a project that sought to resolve scientific or technological uncertainty, and that was not routine work for someone competent in the field. If your AI agency is doing genuinely novel work, you likely qualify.</p>

<p>This post covers the three main areas where AI agencies claim R&D: building custom models, fine-tuning existing models, and advanced prompt engineering. It also covers the traps that get claims rejected.</p>

<h2>What HMRC Actually Looks For in an AI R&D Claim</h2>

<p>The legislation is in Part 13 of the Corporation Tax Act 2009. The key test is whether your project sought to resolve "scientific or technological uncertainty." That means the outcome was not obvious to a competent professional working in the field at the start of the project.</p>

<p>For an AI agency, this usually means one of the following:</p>

<ul>
<li>You could not know in advance whether a particular model architecture would achieve the required accuracy, latency, or cost targets.</li>
<li>You had to experiment with different training data, fine-tuning techniques, or inference strategies because no standard approach existed.</li>
<li>You had to build novel evaluation frameworks or synthetic data pipelines because off-the-shelf tools could not handle your domain.</li>
</ul>

<p>HMRC also requires that the work was part of a "project." A project has a defined start, a defined end, and a clear technical objective. Ongoing incremental improvements to a live system rarely qualify. A six-month sprint to solve a specific problem does.</p>

<p>Finally, the work must advance the field of science or technology. For most AI agencies, that means advancing the state of the art in applied machine learning, not just applying existing tools in a standard way.</p>

<h2>Custom Models: When Building From Scratch Qualifies</h2>

<p>If your agency has trained a model from scratch, you are almost certainly doing R&D. Training a new model requires resolving uncertainty about architecture, data selection, hyperparameters, and evaluation. That is textbook technological uncertainty.</p>

<p>But the claim must be specific. You cannot say "we built an AI model." You need to document what was uncertain. For example:</p>

<ul>
<li>"We needed a model that could generate legally compliant marketing copy for UK financial services. No existing model achieved the required accuracy on FCA-regulated content. We experimented with three different transformer architectures, two tokenisation strategies, and a novel data augmentation pipeline before achieving 94% accuracy."</li>
</ul>

<p>That is a claim HMRC will accept, provided you have the technical records to back it up.</p>

<p>Where agencies go wrong is claiming for projects that use standard model architectures with standard training data. If you trained a BERT model on a public dataset using a standard training loop, that is not R&D. It is routine engineering. The uncertainty must be real.</p>

<h2>Fine-Tuning Open-Source Models: The Grey Area</h2>

<p>Fine-tuning is where most AI agencies do their work. And it is the area where HMRC scrutinises claims most carefully.</p>

<p>Fine-tuning an open-source model like Llama 3, Mistral, or Gemma can qualify as R&D, but only if the fine-tuning process itself resolved technological uncertainty. Simply loading a model, running a standard fine-tuning script on your data, and deploying it is not R&D. That is routine.</p>

<p>What qualifies is when the standard approach does not work and you have to innovate. Examples:</p>

<ul>
<li>You needed the model to output structured JSON with specific validation rules, and standard fine-tuning caused catastrophic forgetting of the base model's capabilities. You had to develop a multi-stage fine-tuning pipeline with progressive unfreezing and mixed-precision training to preserve performance.</li>
<li>Your training data was sparse and imbalanced. Standard fine-tuning produced a model that was 99% accurate on the majority class and 40% on the minority class. You had to build a synthetic data generation pipeline, experiment with class-weighted loss functions, and develop a custom evaluation metric before the model was viable.</li>
<li>You needed inference latency under 200ms on a budget GPU. Standard quantisation destroyed accuracy. You had to experiment with different quantisation techniques, pruning strategies, and distillation approaches to hit the target.</li>
</ul>

<p>Each of these involved genuine technical uncertainty. Each required experimentation, iteration, and problem-solving that went beyond routine work.</p>

<h2>Prompt Engineering: Does It Count?</h2>

<p>This is the most contentious area. HMRC has not issued specific guidance on prompt engineering. But the principles are clear.</p>

<p>Writing a single prompt, even a clever one, is not R&D. It is writing.</p>

<p>Building a complex prompt engineering system that resolves technical uncertainty can qualify. The distinction is whether the work was routine for a competent professional in the field.</p>

<p>Consider this example. Your agency built a multi-agent system where three LLMs debate a question, cross-check each other's outputs, and produce a consensus answer. You had to design the prompt templates, the routing logic, the validation rules, and the fallback mechanisms. You experimented with different agent configurations, different temperature settings, and different consensus algorithms before the system achieved reliable accuracy.</p>

<p>That is R&D. The uncertainty was real: no standard approach existed for your specific domain, and you had to innovate to solve the problem.</p>

<p>Compare that to writing a prompt that says "summarise this document in three bullet points." That is routine. No claim.</p>

<p>The key test is the same as for any R&D project: was there technological uncertainty that a competent professional could not resolve without experimentation?</p>

<h2>What Does Not Qualify</h2>

<p>HMRC sees many AI claims that get rejected. The most common reasons:</p>

<ul>
<li><strong>Routine API calls.</strong> Calling OpenAI's API with standard prompts is not R&D. Even if you are doing it at scale.</li>
<li><strong>Standard data processing.</strong> Cleaning data, normalising it, and loading it into a model is routine. Unless the data itself presented novel technical challenges.</li>
<li><strong>Deployment and infrastructure.</strong> Setting up Kubernetes clusters, load balancers, or monitoring dashboards is engineering, not R&D.</li>
<li><strong>Business uncertainty.</strong> "We did not know if clients would buy it" is commercial uncertainty, not technological. HMRC does not care about that.</li>
<li><strong>Iterative improvements to a live system.</strong> Tweaking a production model's hyperparameters over six months is not a project. It is maintenance.</li>
</ul>

<p>If your claim is mostly API costs and a few hours of prompt writing, do not submit it. It will be rejected, and it will trigger HMRC to scrutinise your future claims more closely.</p>

<h2>How to Structure a Defensible R&D Claim for Your AI Agency</h2>

<p>A strong claim starts with documentation. HMRC expects to see contemporaneous records that show what you did, why you did it, and what was uncertain at each stage.</p>

<p>The standard approach is to identify each qualifying project, describe the technical uncertainty, and list the activities that resolved it. For each project, you need:</p>

<ul>
<li><strong>Project name and dates.</strong> When did it start? When did it end? What was the objective?</li>
<li><strong>Technical uncertainty.</strong> What could you not know at the start? Be specific. "We did not know whether fine-tuning would preserve base model accuracy on unrelated tasks" is better than "we had to experiment."</li>
<li><strong>Activities undertaken.</strong> What did you actually do? Training runs, data collection, architecture experiments, evaluation iterations. List them.</li>
<li><strong>Outcome.</strong> Did you succeed? Did you fail? Both count. R&D is about the attempt, not the result.</li>
<li><strong>Staff and costs.</strong> Who worked on it? How many hours? What did they cost? Include salaries, employer NI, and pension contributions.</li>
<li><strong>Third-party costs.</strong> Cloud compute, GPU time, API costs for training, software licences used directly in the R&D. Exclude general overheads.</li>
</ul>

<p>Most AI agencies use cloud compute extensively. That is a qualifying cost, but only for the compute used directly in R&D activity. Your production inference costs do not qualify. Your staging environment for testing routine deployments does not qualify. Only the compute used for experimentation, training, and evaluation counts.</p>

<h2>The Two R&D Schemes: SME vs RDEC</h2>

<p>Most agencies qualify under the SME scheme. If your agency has fewer than 500 employees and either turnover under €100m or a balance sheet under €86m, you are an SME for R&D purposes.</p>

<p>The SME scheme gives you an enhanced deduction of 186% on qualifying costs. That means if you spent £50,000 on R&D, you can deduct £143,000 from your taxable profits. If you are loss-making, you can surrender the loss for a cash payment worth up to 14.5% of the qualifying costs.</p>

<p>If your agency is larger, or if the R&D was subcontracted to you by a larger company, you may fall under the RDEC scheme. RDEC gives a 20% taxable credit on qualifying costs. The net benefit is lower than the SME scheme, but it is still significant.</p>

<p>Your accountant should determine which scheme applies. It is not always obvious. If your agency has received grant funding or is part of a group, the rules change.</p>

<h2>Common Mistakes AI Agencies Make on R&D Claims</h2>

<p>I see the same errors repeatedly. Avoid them.</p>

<p><strong>Claiming too broadly.</strong> If your entire agency is doing "AI work," that does not mean all of it qualifies. Be precise. Separate qualifying projects from routine work.</p>

<p><strong>No technical narrative.</strong> HMRC wants to understand the story of the project. A spreadsheet of hours and costs is not enough. Write a narrative that explains the uncertainty and how you resolved it.</p>

<p><strong>Ignoring failed projects.</strong> Failed projects qualify for R&D. If you spent three months trying to fine-tune a model and it never worked, that is still R&D. Claim it.</p>

<p><strong>Mixing R&D and non-R&D costs.</strong> If a developer spent 60% of their time on R&D and 40% on production work, only the 60% qualifies. HMRC expects reasonable allocation. Use timesheets or project tracking.</p>

<p><strong>Not using a specialist accountant.</strong> R&D claims for AI work are technically complex. A general accountant who files a standard claim form without understanding the technology will miss qualifying costs and risk rejection. As ICAEW qualified accountants working exclusively with agency founders, we see this regularly.</p>

<h2>Real Numbers: What a Typical AI Agency Claim Looks Like</h2>

<p>Consider a 15-person AI agency in Manchester Northern Quarter. They build custom NLP models for legal firms. In the last financial year, they had three qualifying projects:</p>

<ul>
<li>A project to fine-tune Mistral on UK contract law, which required novel data augmentation and evaluation techniques. Four staff, six months, £120,000 in staff costs, £45,000 in GPU compute.</li>
<li>A project to build a multi-agent system for due diligence document review. Three staff, four months, £80,000 in staff costs, £20,000 in API costs.</li>
<li>A failed project to build a model that could predict litigation outcomes. Two staff, three months, £50,000 in staff costs, £15,000 in compute.</li>
</ul>

<p>Total qualifying costs: £330,000. Under the SME scheme, the enhanced deduction is £613,800. If the agency is profitable, that saves them approximately £153,450 in corporation tax at 25%. If they are loss-making, they could claim a cash payment of around £47,850.</p>

<p>That is real money. It funds the next project.</p>

<h2>Before You Submit a Claim</h2>

<p>R&D claims are under more scrutiny than ever. HMRC opened over 11,000 enquiries into R&D claims in 2023, up from 4,000 in 2020. Claims from digital and AI businesses are a particular focus.</p>

<p>Before you submit, ask yourself:</p>

<ul>
<li>Can I point to specific technical uncertainties that my team resolved?</li>
<li>Do I have contemporaneous records showing the work?</li>
<li>Is the claim clearly separated from routine work?</li>
<li>Have I excluded API call costs for production systems?</li>
<li>Have I spoken to an accountant who understands AI R&D?</li>
</ul>

<p>If the answer to any of these is no, pause. A rejected claim is worse than no claim. It triggers HMRC to look at your next claim more closely.</p>

<p>If you want to discuss whether your agency's work qualifies, <a href="/contact">get in touch</a>. We handle R&D claims for agencies across the UK, from Shoreditch to Bristol Harbourside. We will tell you honestly whether you have a claim worth making.</p>

<h2>Related articles in Tax and Compliance</h2>
<ul>
    <li><a href="/blog/tax-and-compliance/paye-ni-cap-rd-claim-agencies">The PAYE-NI Cap on R&D Claims: When It Catches Agencies Out</a></li>
    <li><a href="/blog/tax-and-compliance/merged-r-and-d-scheme-agency-2023">Merged R&D Scheme Explained for UK Agency Founders (Post-April 2023)</a></li>
</ul>

