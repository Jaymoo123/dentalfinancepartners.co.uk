---
title: "Does Your Software Development Qualify for R&D Tax Relief? An Honest Eligibility Guide"
slug: "software-rd-eligibility-what-qualifies"
date: "2026-07-15"
author: ""
category: "Research and Development"
metaTitle: "Software R&D Tax Relief: What Qualifies (and What Does Not)"
metaDescription: "Plain-English guide to software R&D eligibility. The advance-in-science test, technological uncertainty, and an honest negative list of what HMRC does not accept."
h1: "Does Your Software Development Qualify for R&D Tax Relief? An Honest Eligibility Guide"
summary: "Software R&D relief is available where work seeks a genuine advance in science or technology and resolves technological uncertainty. Routine development, however hard or costly, does not qualify."
keyTakeaways:
  - "Qualifying R&D must seek an advance in science or technology and resolve genuine technological uncertainty."
  - "Routine software development does not qualify, even if it is complex, expensive, or new to your team."
  - "A single project can contain qualifying and non-qualifying workstreams. You claim the qualifying slice, not the whole engineering payroll."
  - "An advance in your company's own knowledge is not enough. The advance must move the overall field forward."
  - "Weak or inflated claims are removed at the Additional Information Form stage and can trigger a compliance enquiry."
faqs:
  - question: "Does all software development qualify for R&D tax relief?"
    answer: "No. Only software work that seeks an advance in science or technology and resolves genuine technological uncertainty qualifies. Routine development using existing techniques does not qualify, regardless of cost or complexity."
  - question: "Does bug fixing or testing qualify for R&D?"
    answer: "Routine bug fixing and testing carried out as standard maintenance do not qualify. Testing that is integral to resolving genuine technological uncertainty, where the outcome is not known in advance, may form part of a qualifying project, but it must be assessed as part of the broader advance, not in isolation."
  - question: "Does building a new feature count as R&D?"
    answer: "Not usually. Adding a feature using established techniques and frameworks is routine development. A feature may involve R&D if the method of achieving it involved genuine technological uncertainty that a competent professional could not readily resolve."
  - question: "What is technological uncertainty in software?"
    answer: "Technological uncertainty exists where it is not known whether or how an objective can be achieved using existing scientific or technological knowledge. The uncertainty must be real and not resolvable by a competent professional through standard methods."
  - question: "Can part of a project qualify while the rest does not?"
    answer: "Yes. A project can contain qualifying and non-qualifying workstreams. You claim the qualifying slice of costs, not the total project budget or engineering headcount."
  - question: "Does using a new framework make it R&D?"
    answer: "No. Using a framework, library or tool that is new to your team but already exists and is well understood in the field is not R&D. The advance must be in the overall field of science or technology, not in your company's own knowledge."
---
<p>R&D tax relief is one of the most valuable incentives available to software and technology companies, and also one of the most abused. Volume R&D mills have built a business model on telling founders that their engineering work almost certainly qualifies, then filing claims that HMRC later removes. The honest position is different: a great deal of software development does not qualify, and saying so plainly is both more accurate and better for your company.</p>

<p>This guide sets out the legal test, what it means in practice for software work, and, crucially, what does not pass it. It is aimed at founders and engineering leads at scaling software companies, not at one-person freelancers or agency project teams.</p>

<h2>The legal test: advance in science or technology plus technological uncertainty</h2>

<p>Software work qualifies for R&D relief only where it seeks an <strong>advance in science or technology</strong> and the work involves resolving <strong>genuine technological uncertainty</strong>. The test also requires that a <strong>competent professional in the field</strong> could not readily deduce the solution from existing knowledge. Routine software development, however hard or costly, does not qualify under <a href="https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird100000">HMRC's guidelines</a>.</p>

<p>Three elements must all be present. Miss any one of them and the work is not R&D for tax purposes.</p>

<ol>
  <li><strong>An advance in science or technology.</strong> The work must extend the overall field, not just your company's own understanding of it. Applying known techniques to a new business problem does not advance the field. Discovering a genuinely novel algorithm, method or architecture that others in the field could not have readily deduced does.</li>
  <li><strong>Technological uncertainty.</strong> It must not have been known, at the time the work was done, whether or how the objective could be achieved using existing scientific or technological knowledge. The uncertainty is about method, not outcome. If an experienced engineer could look at the problem and say "we know how to approach this, it just takes time to build", that is not technological uncertainty.</li>
  <li><strong>Not readily deducible by a competent professional.</strong> The solution must not have been available by applying standard methods that an experienced software engineer in the relevant sub-field would routinely draw on. This is an objective test, not a test of your team's specific skill level.</li>
</ol>

<p>One further point that is often blurred: an advance in the company's own knowledge is not sufficient. Your team learning a technology that already exists is not R&D for tax purposes. The advance must be in the field itself, in objective scientific or technological knowledge, not in your internal capability.</p>

<h2>What genuinely qualifies: the positive case for software R&D</h2>

<p>Where software work does pass the test, it tends to share characteristics. The following are categories where a qualifying case can be made, provided the specific facts support it.</p>

<ul>
  <li><strong>Novel algorithmic work.</strong> Developing a new algorithm where no known efficient solution existed, such as a new approach to a constraint-satisfaction problem, a novel graph-traversal method for a specific domain, or a machine-learning architecture that addresses a recognised limitation in the state of the art. The advance must be in the algorithm, not in applying a known algorithm to a new dataset.</li>
  <li><strong>Performance and scale problems with no known solution.</strong> Where a system needs to achieve a performance target (latency, throughput, accuracy) that existing approaches cannot meet and where the engineering team must investigate unknown solution paths. The key is that the target could not be met by applying standard techniques more carefully. The uncertainty is about whether a solution at that specification is achievable at all.</li>
  <li><strong>Genuine integration uncertainty.</strong> Where the integration of systems, protocols or hardware involves an interaction that is scientifically or technically uncertain, not just logistically complex. Building an API integration with a well-documented third-party service is not R&D. Building a real-time protocol bridge between two systems with conflicting data models and unknown interaction effects may involve qualifying work, if the uncertainty is genuine and the approach is not routine.</li>
  <li><strong>Advances in compiler design, runtime environments or tooling infrastructure.</strong> Where the work pushes beyond what existing tools can do and requires genuinely new techniques to achieve a defined technical capability.</li>
</ul>

<p>In each case, the claim is for the qualifying slice of cost attributable to that work. It is not a claim over the entire project or the whole engineering team's payroll.</p>

<h2>What does NOT qualify: the honest negative list</h2>

<p>This is the section that most R&D advisers soften. We do not soften it. The following categories do not qualify under <a href="https://www.gov.uk/guidance/corporation-tax-research-and-development-rd-relief">HMRC's R&D guidelines</a>, and claiming them creates a weak claim that HMRC can and does remove.</p>

<table>
  <thead>
    <tr>
      <th>QUALIFIES (with supporting evidence)</th>
      <th>DOES NOT QUALIFY</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Novel algorithm addressing a problem with no known efficient solution</td>
      <td>Routine feature development using established frameworks and patterns</td>
    </tr>
    <tr>
      <td>Achieving a performance/scale target where no known method exists</td>
      <td>Standard CRUD application build, however large or complex</td>
    </tr>
    <tr>
      <td>Resolving genuine uncertainty in system integration at a protocol or interaction level</td>
      <td>Configuring or extending a known framework (React, Rails, Django, Laravel etc.)</td>
    </tr>
    <tr>
      <td>Developing new compiler or runtime capabilities beyond the current state of the art</td>
      <td>Cosmetic or UI work, including animations, layouts and styling</td>
    </tr>
    <tr>
      <td>ML/AI work advancing beyond existing model architectures with documented uncertainty</td>
      <td>Applying an existing ML model (including fine-tuning a pre-trained model) to a new dataset</td>
    </tr>
    <tr>
      <td>Resolving a genuinely novel technical uncertainty in hardware-software interaction</td>
      <td>Bug fixing and testing carried out as standard quality-assurance maintenance</td>
    </tr>
    <tr>
      <td>Investigating genuinely unknown interaction effects between incompatible systems</td>
      <td>Using an off-the-shelf approach, API or library that is new to your team but well-established in the field</td>
    </tr>
    <tr>
      <td>Research into a technical approach where the feasibility is genuinely unknown</td>
      <td>Performance work where standard optimisation techniques are applied more carefully</td>
    </tr>
  </tbody>
</table>

<p>The negative column is grounded in <a href="https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird100000">HMRC's R&D manual</a>: qualifying R&D must seek an advance in science or technology and resolve technological uncertainty. None of the items in the right column do that.</p>

<h2>Where the boundary falls inside a single project</h2>

<p>Most real engineering projects contain both qualifying and non-qualifying work. The boundary runs through the project, not around it. You claim the qualifying workstreams, not the total project budget.</p>

<p>This is important because it changes the question. The question is not "does this project qualify?" It is "which specific workstreams within this project involved genuine technological uncertainty, and what costs are attributable to them?" The answer shapes the claim.</p>

<p>A project to build a new data platform might include:</p>

<ul>
  <li>Designing a novel query execution layer that achieves latency targets no existing solution meets (potentially qualifying, if the uncertainty is genuine).</li>
  <li>Building the data ingestion pipeline using established ETL patterns (not qualifying).</li>
  <li>Developing the front-end dashboards and UI (not qualifying).</li>
  <li>Investigating whether a new compression algorithm can reduce storage costs below a threshold that existing algorithms cannot reach (potentially qualifying, depending on specifics).</li>
  <li>Configuring cloud infrastructure and deploying the system (not qualifying).</li>
</ul>

<p>The claim is for costs attributable to the qualifying workstreams, apportioned appropriately. It is not a claim over total project cost. The <a href="/blog/research-and-development/rd-additional-information-form-guide">Additional Information Form</a> requires you to describe the qualifying work precisely, so imprecise boundary-drawing creates an AIF that HMRC can interrogate.</p>

<h2>Worked example: a scaling team's engineering roadmap</h2>

<p>The following is an illustrative example of how an R&D eligibility assessment might apply to a scaling engineering team's roadmap. All workstreams, numbers and descriptions are fictional and for illustration only. Apply the same reasoning to your own facts.</p>

<p>Suppose a B2B SaaS company has a six-workstream engineering roadmap for the year.</p>

<table>
  <thead>
    <tr>
      <th>Workstream</th>
      <th>Description</th>
      <th>Verdict</th>
      <th>Reason</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Query engine redesign</td>
      <td>Building a new execution layer to achieve sub-10ms latency on a class of analytical queries that existing engines cannot handle at that specification</td>
      <td>Potentially qualifying</td>
      <td>Genuine technological uncertainty: not known whether that latency target is achievable; existing solutions cannot meet the specification; novel approach required</td>
    </tr>
    <tr>
      <td>Billing and subscription module</td>
      <td>Implementing recurring billing using Stripe, with standard subscription logic</td>
      <td>Does not qualify</td>
      <td>Routine development using a well-documented, established third-party API; no technological uncertainty</td>
    </tr>
    <tr>
      <td>ML anomaly detection</td>
      <td>Applying a pre-trained anomaly-detection model to a new category of operational data</td>
      <td>Does not qualify</td>
      <td>Applying an existing model to a new dataset; the model and the methodology are established; the advance is in the data, not in science or technology</td>
    </tr>
    <tr>
      <td>Novel compression algorithm</td>
      <td>Investigating whether a domain-specific compression technique can reduce storage by 60% below what DEFLATE achieves, where no published algorithm achieves this on the data type</td>
      <td>Potentially qualifying</td>
      <td>Advance sought in an objective technical capability; uncertainty about whether it is achievable; competent professional could not readily deduce the solution from existing methods</td>
    </tr>
    <tr>
      <td>Multi-tenant UI redesign</td>
      <td>Rebuilding the dashboard and settings pages across the product</td>
      <td>Does not qualify</td>
      <td>Cosmetic and UI work; no scientific or technological advance; no uncertainty beyond standard engineering execution</td>
    </tr>
    <tr>
      <td>Real-time protocol bridge</td>
      <td>Bridging two systems with conflicting real-time message-ordering guarantees where the interaction effects are genuinely unknown and no published approach addresses this combination</td>
      <td>Potentially qualifying (verify specifics)</td>
      <td>Genuine uncertainty about whether consistent ordering can be achieved; competent professional would not readily deduce the solution; confirm exact technical facts against CIRD guidance before claiming</td>
    </tr>
  </tbody>
</table>

<p>In this illustrative example, three of six workstreams potentially qualify. The R&D claim covers costs attributable to those three workstreams, not total engineering spend. The qualifying fraction matters, and it must be supportable with contemporaneous technical records.</p>

<h2>A quick eligibility checklist</h2>

<p>Before deciding whether a piece of work belongs in your R&D claim, run it through these questions. All four must be answered yes for the work to be potentially qualifying.</p>

<ol>
  <li><strong>Was there an advance sought in science or technology</strong>, not just in your company's own knowledge or in business capability?</li>
  <li><strong>Was there genuine technological uncertainty</strong> about whether or how the objective could be achieved, where the outcome was not known in advance?</li>
  <li><strong>Could a competent professional in the relevant sub-field NOT readily deduce the solution</strong> from existing scientific or technological knowledge?</li>
  <li><strong>Was the work not routine</strong>, i.e. not the application of standard techniques in the normal way, however carefully or expensively?</li>
</ol>

<p>If you reach a yes to all four, the work is potentially qualifying and the next step is to quantify the attributable costs accurately. If you are unsure on any of them, that uncertainty is worth resolving before the claim is filed, not after the <a href="https://www.gov.uk/guidance/submit-detailed-information-before-you-claim-research-and-development-rd-tax-relief">Additional Information Form</a> is submitted.</p>

<h2>Why honesty in your claim protects your company</h2>

<p>Weak or inflated R&D claims do not sit quietly with HMRC. Under the current regime, a detailed <a href="https://www.gov.uk/guidance/submit-detailed-information-before-you-claim-research-and-development-rd-tax-relief">Additional Information Form</a> must be submitted before the CT600 claim. HMRC uses the AIF to identify claims where the described work does not meet the qualifying test. Claims filed without a valid AIF are removed. Claims where the AIF describes non-qualifying work can trigger a compliance enquiry, which costs time, money and management attention regardless of outcome.</p>

<p>The volume-mill model works by filing large claims and hoping HMRC does not look closely. For funded, scaling companies, the downside of that approach is asymmetric: the repayment demand, interest and potential penalties on a removed claim far outweigh any uplift from claiming non-qualifying work. A defensible claim over a smaller qualifying base is worth more than an inflated claim that sits in HMRC's enquiry pipeline.</p>

<p>Once you have confirmed your qualifying workstreams, the next decision is which route applies. Most scaling software companies will use the <a href="https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-large-companies">merged scheme</a>, which gives a 20% expenditure credit above the line. Loss-making companies whose qualifying R&D spend is at least 30% of total expenditure may qualify for <a href="https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-small-and-medium-sized-enterprises">ERIS</a>, which provides an 86% additional deduction and a 14.5% payable credit. The <a href="/calculators/rd-relief-estimator">R&D relief estimator</a> gives an indicative figure for your scenario.</p>

<p>If this is your first claim (or your first claim in three years), the <a href="/blog/research-and-development/rd-claim-notification-6-month-deadline">notification deadline</a> is six months from the end of your accounting period. Miss it and the claim is invalid regardless of eligibility.</p>

<p>For a full account of how the merged scheme and ERIS work, see the <a href="/blog/research-and-development/merged-rd-scheme-explained">merged R&D scheme guide</a>. For the AIF requirements, see the <a href="/blog/research-and-development/rd-additional-information-form-guide">AIF guide</a>. If you are ready to talk through your specific workstreams and costs, the <a href="/services/rd-tax-claims">R&D claims service</a> is the right starting point.</p>

<p>For more on what makes a software or SaaS business's R&D position defensible, see the relevant sections of <a href="/for/software-development-companies">the software development companies hub</a> and <a href="/for/saas-companies">the SaaS companies hub</a>.</p>
