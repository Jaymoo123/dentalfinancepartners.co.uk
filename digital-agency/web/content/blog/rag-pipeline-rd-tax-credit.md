---
title: 'Building RAG Pipelines: Is It R&D-Qualifying Work?'
slug: rag-pipeline-rd-tax-credit
canonical: https://www.agencyfounderfinance.co.uk/blog/tax-and-compliance/rag-pipeline-rd-tax-credit
date: '2026-05-16'
generator: unverified/claude-era
author: Agency Founder Finance Editorial Team
category: Tax and Compliance
metaTitle: 'RAG Pipeline R&D Tax Credit: What Agency Founders Need'
metaDescription: Can building RAG pipelines qualify for R&D tax credits? Yes, if you're resolving technical uncertainty. Here's what HMRC looks for and how to claim.
altText: Software developer working on AI RAG pipeline architecture at a desk in a modern UK agency office
image: /blog/rag-pipeline-rd-tax-credit.jpg
imageCredit:
  photographer: Sergei Starostin
  photographerUrl: https://www.pexels.com/@sejio402
  sourceUrl: https://www.pexels.com/photo/pipe-priming-26953859/
  source: Pexels
h1: 'Building RAG Pipelines: Is It R&D-Qualifying Work?'
summary: If your agency is building custom RAG (Retrieval-Augmented Generation) pipelines for clients or internal tools, you might be leaving R&D tax credits on the table. Here's what qualifies, what doesn't, and how to structure your claim.
schema: ''
faqs:
- question: Can a RAG pipeline built for a client qualify for R&D tax credits?
  answer: Yes, if the work resolves technical uncertainty that couldn't be solved by a competent professional using standard methods. The client's industry doesn't matter. What matters is whether the technical challenge was genuinely uncertain at the outset. Document the uncertainty, the experiments, and the results.
- question: What costs can I claim for RAG pipeline R&D work?
  answer: Staff time spent directly on resolving technical uncertainty qualifies. So do subcontractor costs (at 65% under the SME scheme), software licenses used for R&D (OpenAI, Pinecone, cloud compute), and consumables. You cannot claim overheads, rent, or marketing costs. Apportion costs if the same resources are used for non-R&D work.
- question: How do I separate qualifying RAG work from routine implementation?
  answer: Track time against specific technical uncertainties, not against the whole project. If a developer spends 2 weeks building a custom chunking strategy (qualifying) and 1 week integrating it into a CMS (not qualifying), record both separately. Use project codes in your accounting software. HMRC will ask for this breakdown.
- question: What happens if HMRC challenges my RAG pipeline R&D claim?
  answer: HMRC may open an enquiry asking for more detail. They'll want to see your technical narrative, time records, and evidence of the uncertainty you faced. If your documentation is solid, most enquiries close without adjustment. If you're unsure about your documentation, speak to an accountant before filing.
authorSlug: james-whitfield
updatedDate: '2026-05-17'
keyTakeaways:
- Custom RAG pipeline development can qualify for R&D tax credits if it resolves scientific or technological uncertainty.
- HMRC requires evidence of technical uncertainty, a systematic approach to resolution, and qualifying costs for R&D claims.
- Developing novel chunking strategies for domain-specific documents or low-resource domains typically qualifies as R&D work.
- Optimising RAG pipelines for latency or cost constraints with no off-the-shelf solution is likely qualifying R&D activity.
- Simply using existing RAG frameworks out of the box or calling an API without resolving uncertainty does not qualify for R&D relief.
---
<p>If you're building RAG (Retrieval-Augmented Generation) pipelines for clients or your own agency, you've probably wondered whether the work qualifies for R&D tax credits. The short answer is: it can. But not all RAG work qualifies, and HMRC is paying closer attention to AI-related claims than ever before.</p>

<p>This article explains exactly what HMRC looks for, what doesn't qualify, and how to structure a defensible claim for a <strong>rag pipeline r&d tax credit</strong>. We'll use real examples from agency work, not theoretical scenarios.</p>

<h2>What Is a RAG Pipeline?</h2>

<p>RAG stands for Retrieval-Augmented Generation. It's a pattern where you combine a large language model (LLM) with an external knowledge base. The LLM retrieves relevant information from your data store before generating a response. This gives you more accurate, grounded outputs than relying on the model's training data alone.</p>

<p>A typical RAG pipeline involves:</p>
<ul>
<li>Chunking documents into searchable pieces</li>
<li>Creating embeddings using a model (OpenAI, Cohere, open-source alternatives)</li>
<li>Storing those embeddings in a vector database (Pinecone, Weaviate, Qdrant, pgvector)</li>
<li>Setting up a retrieval mechanism that finds the most relevant chunks for a given query</li>
<li>Feeding those chunks into an LLM as context for generation</li>
<li>Handling prompt engineering, chunk overlap, reranking, and fallback logic</li>
</ul>

<p>If you're building this from scratch or adapting it to a novel domain, you're dealing with technical uncertainty. That's where R&D relief starts to apply.</p>

<h2>What HMRC Looks for in R&D Claims</h2>

<p>HMRC's R&D definition hasn't changed with the arrival of AI. The test is still whether your project sought to resolve <strong>scientific or technological uncertainty</strong>. Not whether you built something new to the world. Whether it was uncertain at the outset how to achieve the result.</p>

<p>For a <strong>rag pipeline r&d tax credit</strong> claim, HMRC will want to see:</p>
<ul>
<li><strong>Technical uncertainty</strong> that couldn't be resolved by a competent professional in the field</li>
<li><strong>A systematic approach</strong> to resolving that uncertainty (experiments, iterations, testing)</li>
<li><strong>Recorded evidence</strong> of the uncertainty and the work done to resolve it</li>
<li><strong>Qualifying costs</strong> (staff time, subcontractor costs, software licenses, consumables)</li>
</ul>

<p>HMRC's AI guidance, published in April 2024, specifically acknowledges that integrating AI into existing systems can qualify if it involves resolving technical uncertainty. But simply calling an API and piping the output into a frontend does not.</p>

<h2>When Does RAG Work Qualify?</h2>

<h3>Custom chunking strategies for domain-specific documents</h3>
<p>Standard chunking (splitting documents into fixed-size pieces) often fails with legal contracts, medical records, or highly technical documentation. If you're developing a chunking strategy that preserves semantic meaning across complex document structures, that's likely qualifying work. You're experimenting with different approaches, measuring retrieval accuracy, and iterating.</p>

<h3>Building retrieval systems for low-resource domains</h3>
<p>If your RAG pipeline needs to work with a specialised vocabulary (say, maritime logistics or pharmaceutical compliance) where off-the-shelf embedding models perform poorly, you're facing technical uncertainty. Fine-tuning embedding models or building hybrid retrieval systems that combine vector search with keyword-based methods qualifies.</p>

<h3>Optimising for latency or cost constraints</h3>
<p>Agency clients often want RAG systems that run under strict latency budgets or on limited hardware. If you're developing novel caching strategies, model distillation approaches, or hybrid architectures to meet those constraints, that's R&D work. You're solving a problem with no obvious off-the-shelf solution.</p>

<h3>Building multi-step reasoning pipelines</h3>
<p>Simple RAG (retrieve one set of chunks, generate one answer) is well understood. But if you're building a pipeline that decomposes a question, retrieves different information for each sub-question, synthesises results, and handles contradictions across sources, you're in R&D territory. The uncertainty lies in how to chain these steps reliably.</p>

<h2>When Does RAG Work Not Qualify?</h2>

<h3>Using an existing RAG framework out of the box</h3>
<p>LangChain, LlamaIndex, and Haystack are mature frameworks. If you're following their tutorials and connecting standard components, you're not doing R&D. You're implementing known solutions. That's valuable client work, but it's not qualifying.</p>

<h3>Simple API wrappers</h3>
<p>Taking a user query, sending it to OpenAI, and displaying the response is not R&D. Even if you add a vector database with precomputed embeddings, if the approach is well documented and the implementation is straightforward, HMRC will reject the claim.</p>

<h3>Prompt engineering alone</h3>
<p>Tweaking prompts to get better outputs is not R&D. It's optimisation, not innovation. HMRC explicitly excludes work that "could be resolved by a competent professional applying standard techniques." Prompt engineering, in most cases, falls into that category.</p>

<h3>Maintaining an existing RAG system</h3>
<p>Bug fixes, performance monitoring, and routine updates are not R&D. The qualifying work ends when the technical uncertainty is resolved. Ongoing maintenance, however complex, doesn't qualify.</p>

<h2>Real Examples from Agency Work</h2>

<p><strong>Example 1: A 15-person digital agency in Shoreditch</strong> built a RAG pipeline for a legal publishing client. The documents were 500-page PDFs with complex cross-references, footnotes, and appendices. Standard chunking broke the semantic connections. The agency spent 6 weeks developing a hierarchical chunking strategy that preserved document structure. They ran 40+ experiments measuring retrieval accuracy against a test set. This qualifies.</p>

<p><strong>Example 2: A 6-person web design agency in Bristol Harbourside</strong> built a chatbot for a local council's website using LangChain and Pinecone. They followed the standard tutorial, adjusted prompts, and deployed. Total time: 3 days. This does not qualify.</p>

<p><strong>Example 3: A 20-person creative agency in Manchester Northern Quarter</strong> developed a RAG pipeline for a fashion retailer that needed to answer questions about 50,000 product SKUs with high accuracy. The challenge was handling product descriptions that changed weekly, inconsistent metadata, and multilingual queries. The agency built a custom embedding pipeline with incremental update logic and a hybrid retrieval system combining vector search with product category filters. This qualifies.</p>

<h2>How to Structure Your Claim</h2>

<h3>Identify the technical uncertainty early</h3>
<p>Before you start building, document what you don't know. "Can we achieve 95% retrieval accuracy on legal documents with standard chunking?" is a specific technical question. Write it down. If you later prove the answer is no, that's evidence of uncertainty.</p>

<h3>Track time by project, not by task</h3>
<p>Your developers should record time against specific R&D projects, not generic categories like "RAG work" or "AI development." Use project codes in Xero or QuickBooks. HMRC wants to see that the time relates to resolving specific uncertainties.</p>

<h3>Keep technical notes</h3>
<p>Notebooks, experiment logs, Slack threads where your team discusses failed approaches, pull requests that document iterations. These are your evidence. HMRC doesn't expect formal lab reports. But they need to see that real problem-solving happened.</p>

<h3>Separate qualifying from non-qualifying work</h3>
<p>Most agencies mix R&D work with routine implementation. You need to separate them in your records. If a developer spends 3 days building a custom chunking strategy (qualifying) and 2 days integrating it into the client's CMS (not qualifying), record both separately.</p>

<h2>Common Mistakes Agencies Make</h2>

<p><strong>Claiming for the whole project.</strong> HMRC will look at the specific activities. If 70% of your RAG pipeline was standard implementation, only the 30% that resolved uncertainty qualifies.</p>

<p><strong>Not documenting the uncertainty.</strong> HMRC doesn't accept "we built something new" as a justification. You need to show what was uncertain and how you resolved it.</p>

<p><strong>Using subcontractors without proper agreements.</strong> If you subcontract RAG development to another company, the qualifying costs are limited to 65% of the subcontractor payments (under the SME scheme). Make sure your contracts specify the R&D work being done.</p>

<p><strong>Claiming for software costs incorrectly.</strong> OpenAI API credits, Pinecone subscriptions, and cloud compute costs can qualify as consumables. But only the portion used directly in the R&D activity. If you're using the same Pinecone instance for production client work, you need to apportion the costs.</p>

<h2>How Agency Founder Finance Can Help</h2>

<p>As <a href="/about">specialist agency accountants</a> working exclusively with agency founders, we've handled R&D claims for agencies building everything from RAG pipelines to custom AI training platforms. We know what HMRC expects because we deal with them regularly.</p>

<p>We'll help you:</p>
<ul>
<li>Identify which parts of your RAG work qualify</li>
<li>Set up time tracking and cost recording systems</li>
<li>Prepare the technical narrative HMRC wants to see</li>
<li>File the claim through the correct HMRC channels</li>
<li>Handle any HMRC enquiries that follow</li>
</ul>

<p>If you're building RAG pipelines and wondering whether the work qualifies, <a href="/contact">get in touch</a>. We'll tell you honestly whether a claim makes sense for your situation.</p>

<h2>Final Thoughts</h2>

<p>RAG pipeline work can qualify for R&D tax credits, but only where it resolves genuine technical uncertainty. The agencies that claim successfully are the ones that document their uncertainty from day one, track their experiments systematically, and separate qualifying work from routine implementation.</p>

<p>The <strong>rag pipeline r&d tax credit</strong> isn't a loophole. It's a legitimate relief for agencies doing genuine innovation. If that describes your work, it's worth pursuing.</p>

<p>If your contractor mix has changed in the last 12 months, or you've taken on RAG work that pushed your team into unfamiliar technical territory, ask your accountant before year-end. The deadlines for amended R&D claims are strict, and missing them costs real money.</p>

<h2>Related articles in Tax and Compliance</h2>
<ul>
    <li><a href="/blog/tax-and-compliance/does-fine-tuning-llm-qualify-rd-tax-credits">Does Fine-Tuning an LLM Qualify for R&D Tax Credits?</a></li>
    <li><a href="/blog/tax-and-compliance/r-and-d-tax-credits-ai-agency-custom-models-fine-tuning-prompt-engineering">R&D Tax Credits for AI Agencies: Custom Models, Fine-Tuning and Prompt Engineering</a></li>
</ul>

