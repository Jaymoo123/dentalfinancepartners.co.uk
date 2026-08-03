import type { GenericTool } from "@accounting-network/web-shared/tools/types";

export const probateTimelineEstimator: GenericTool = {
  kind: "generic",
  slug: "probate-timeline-estimator",
  name: "Probate Timeline Estimator",
  category: "Probate Process",
  oneLiner:
    "Estimate how many months probate is likely to take for this estate, stage by stage.",
  metaTitle: "Probate Timeline Estimator | How Long Will It Take?",
  metaDescription:
    "Estimate how long probate will take from valuing the estate to final distribution, based on whether there's a will, IHT to report and how complex the estate is.",
  intro:
    "Probate timelines vary hugely depending on whether IHT forms are needed, how HMCTS is currently performing, and how complex the estate is. This estimator gives a realistic range, stage by stage, so you know roughly what to expect.",
  ctaLabel: "Get help managing the probate timeline →",
  embedHeight: 700,
  fields: [
    { id: "willExists", label: "There is a valid will", type: "toggle", default: true },
    {
      id: "ihtPayable",
      label: "Inheritance tax position",
      type: "select",
      default: "none",
      options: [
        { value: "none", label: "No IHT due, simple excepted estate" },
        { value: "excepted", label: "No IHT due, but full IHT400 still required" },
        { value: "iht400", label: "IHT is due: full IHT400 and payment needed" },
      ],
    },
    {
      id: "complexity",
      label: "Estate complexity",
      type: "select",
      default: "average",
      options: [
        { value: "simple", label: "Simple: bank accounts, one property or none" },
        { value: "average", label: "Average: property, some shares/investments" },
        { value: "complex", label: "Complex: property, shares, business or foreign assets" },
      ],
    },
    {
      id: "applicationStopped",
      label: "Risk of the application being stopped for queries",
      type: "select",
      default: "no",
      options: [
        { value: "no", label: "Low: complete, accurate application with every document enclosed" },
        { value: "yes", label: "Higher: missing paperwork, a damaged will or IHT figures that may not match" },
      ],
      advanced: true,
    },
  ],
  compute: (v) => {
    const willExists = Boolean(v.willExists);
    const ihtPayable = v.ihtPayable as string;
    const complexity = v.complexity as string;
    const stopped = v.applicationStopped === "yes";

    const gatherRange: [number, number] =
      complexity === "simple" ? [4, 6] : complexity === "average" ? [6, 10] : [10, 16];

    const ihtFormsRange: [number, number] =
      ihtPayable === "none" ? [0, 2] : ihtPayable === "excepted" ? [2, 6] : [6, 12];

    // FCSQ Jan-Mar 2026 (published 25 Jun 2026): grants of probate took a mean of about
    // 5 weeks from submission to issue and a median of 1 week. Applications that were not
    // stopped took about 2 weeks; stopped ones took 14 weeks on average. Letters of
    // administration ran to about 11 weeks, or about 20 weeks with a will annexed.
    const grantWaitRange: [number, number] = stopped
      ? willExists ? [10, 18] : [14, 24]
      : willExists ? [1, 4] : [3, 8];

    const adminRange: [number, number] =
      complexity === "simple" ? [8, 12] : complexity === "average" ? [12, 18] : [18, 24];

    const willDelay: [number, number] = willExists ? [0, 0] : [2, 4];

    const lowWeeks = gatherRange[0] + ihtFormsRange[0] + grantWaitRange[0] + adminRange[0] + willDelay[0];
    const highWeeks = gatherRange[1] + ihtFormsRange[1] + grantWaitRange[1] + adminRange[1] + willDelay[1];
    const lowMonths = Math.round((lowWeeks / 4.345) * 10) / 10;
    const highMonths = Math.round((highWeeks / 4.345) * 10) / 10;

    return {
      headline: {
        label: "Estimated total time to close the estate",
        value: `${lowMonths} to ${highMonths} months`,
        sub: `${lowWeeks} to ${highWeeks} weeks across all stages`,
        tone: highMonths > 12 ? "warn" : "default",
      },
      rows: [
        ...(!willExists ? [{ label: "No will: extra time for letters of administration", value: `${willDelay[0]} to ${willDelay[1]} weeks` }] : []),
        { label: "Gather and value the estate", value: `${gatherRange[0]} to ${gatherRange[1]} weeks` },
        { label: "Prepare and submit IHT forms", value: `${ihtFormsRange[0]} to ${ihtFormsRange[1]} weeks` },
        { label: `HMCTS grant of ${willExists ? "probate" : "administration"} wait (${stopped ? "assuming it is stopped for queries" : "assuming it is not stopped"})`, value: `${grantWaitRange[0]} to ${grantWaitRange[1]} weeks` },
        { label: "Collect assets, pay debts, distribute estate", value: `${adminRange[0]} to ${adminRange[1]} weeks` },
        { label: "Total", value: `${lowWeeks} to ${highWeeks} weeks`, strong: true },
      ],
      note:
        "The grant-wait stage reflects the latest published HMCTS figures (Family Court Statistics Quarterly, January to March 2026). Grants of probate took a mean of around 5 weeks from submission to issue, with a median of 1 week. What separates a fast application from a slow one is whether it gets stopped for queries: applications that were not stopped took about 2 weeks, while stopped ones took 14 weeks on average. Letters of administration take longer again, around 11 weeks where there is no will and around 20 weeks where a will is annexed. Waits vary quarter to quarter and can be longer at busy periods, so check the latest published figures on gov.uk before relying on any specific date. These are typical ranges, not guarantees, and disputed applications take considerably longer.",
      workedExamples: [
        {
          title: "Simple estate, will exists, no IHT due",
          inputs: { willExists: "Yes", ihtPayable: "None, excepted estate", complexity: "Simple" },
          result: { note: "Fastest realistic path, typically under six months" },
        },
        {
          title: "Complex estate, IHT400 required, application stopped for queries",
          inputs: { willExists: "Yes", ihtPayable: "IHT400 needed", complexity: "Complex", applicationStopped: "Higher risk" },
          result: { note: "Can extend well beyond a year once HMRC clearance and asset sales are factored in" },
        },
      ],
    };
  },
  explainer: {
    heading: "What determines how long probate takes",
    paragraphs: [
      "Probate has several distinct stages, and delays in any one of them push the whole process back. First, the estate has to be gathered and valued, contacting every bank, pension provider, insurer and asset holder for a date-of-death valuation. Only once that is complete can the IHT forms be prepared, whether that is a short-form excepted estate return or the full IHT400 account.",
      "Where inheritance tax is due, HMRC must issue clearance before the grant application can usually proceed, and this step alone can take several weeks to months depending on the complexity of the estate and current HMRC workloads. Once the forms are settled, the application for the grant of probate (or letters of administration if there is no will) goes to HMCTS. In the latest published figures (January to March 2026), grants of probate took a mean of around 5 weeks from submission to issue, with a median of just 1 week. The gap between those two numbers is the whole story: applications that were not stopped for queries came through in about 2 weeks, while stopped ones averaged 14 weeks. Grant type matters too, with letters of administration taking around 11 weeks and around 20 weeks where a will is annexed. Almost all of this now happens online, with 93% of applications made digitally and 94% of grants issued that way, so the practical question is no longer whether to apply online but whether the application is complete enough to avoid being stopped.",
      "After the grant is issued, the personal representatives still need to collect in the assets, settle any debts and the final tax position, and distribute what remains, often waiting out a statutory notice period to protect against later claims. Complex estates, those with a property to sell, foreign assets, a business, or a dispute between beneficiaries, routinely take well over a year from start to finish.",
    ],
  },
  faqs: [
    {
      question: "How long does a straightforward probate normally take?",
      answer:
        "For a simple estate with a valid will, no inheritance tax to pay and no property to sell, six to nine months from death to final distribution is a realistic expectation, though it can be quicker if everything moves smoothly.",
    },
    {
      question: "Why does HMRC's IHT process take so long?",
      answer:
        "Where inheritance tax is due, HMRC needs to review the IHT400 account and confirm the figures before issuing clearance, and any payment must usually be made before the grant is issued. Valuations for property, shares or business assets can also need independent verification, which adds time.",
    },
    {
      question: "Does having no will make probate slower?",
      answer:
        "Yes, at both ends. Without a will, the person entitled to apply for letters of administration has to be established under the intestacy rules, which can take longer to sort out, particularly for blended families or where the next of kin is not straightforward. The court stage is slower too: in the January to March 2026 figures, letters of administration took around 11 weeks from submission to issue against around 5 weeks for grants of probate.",
    },
    {
      question: "Can probate be sped up?",
      answer:
        "Yes, and the lever that matters most is avoiding a stop. In the January to March 2026 figures, applications that were not stopped for queries were dealt with in about 2 weeks, against 14 weeks for those that were. Submitting complete and accurate paperwork the first time, enclosing every document, making sure names and inheritance tax figures match across the forms, and getting professional help with complex valuations all reduce the chance of a stop. Nothing removes HMCTS's own processing time, though.",
    },
    {
      question: "What happens if beneficiaries disagree during probate?",
      answer:
        "A dispute over the will's validity, an estranged beneficiary, or a challenge under the Inheritance (Provision for Family and Dependants) Act can significantly extend the timeline, sometimes by a year or more, and usually needs specialist advice.",
    },
  ],
};
