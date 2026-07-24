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
      id: "applicationType",
      label: "Grant application method",
      type: "select",
      default: "digital",
      options: [
        { value: "digital", label: "Online (digital) application" },
        { value: "paper", label: "Paper application" },
      ],
      advanced: true,
    },
  ],
  compute: (v) => {
    const willExists = Boolean(v.willExists);
    const ihtPayable = v.ihtPayable as string;
    const complexity = v.complexity as string;
    const applicationType = v.applicationType as string;

    const gatherRange: [number, number] =
      complexity === "simple" ? [4, 6] : complexity === "average" ? [6, 10] : [10, 16];

    const ihtFormsRange: [number, number] =
      ihtPayable === "none" ? [0, 2] : ihtPayable === "excepted" ? [2, 6] : [6, 12];

    // FCSQ Jan-Mar 2026: mean submission-to-grant 6.4 weeks all channels, digital 4.5, paper 16.5
    const grantWaitRange: [number, number] =
      applicationType === "digital"
        ? complexity === "complex" ? [6, 12] : [4, 8]
        : complexity === "complex" ? [18, 26] : [14, 20];

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
        { label: `HMCTS grant of ${willExists ? "probate" : "administration"} wait (${applicationType})`, value: `${grantWaitRange[0]} to ${grantWaitRange[1]} weeks` },
        { label: "Collect assets, pay debts, distribute estate", value: `${adminRange[0]} to ${adminRange[1]} weeks` },
        { label: "Total", value: `${lowWeeks} to ${highWeeks} weeks`, strong: true },
      ],
      note:
        "The grant-wait stage reflects the latest published HMCTS figures (January to March 2026): a mean of 6.4 weeks from submission across all channels, 4.5 weeks for digital applications and 16.5 for paper. Waits vary quarter to quarter and can be longer at busy periods, so check the latest published figures on gov.uk before relying on any specific date. These are typical ranges, not guarantees, and complex, stopped or disputed applications take considerably longer.",
      workedExamples: [
        {
          title: "Simple estate, will exists, no IHT due",
          inputs: { willExists: "Yes", ihtPayable: "None, excepted estate", complexity: "Simple" },
          result: { note: "Fastest realistic path, typically under six months" },
        },
        {
          title: "Complex estate, IHT400 required, paper application",
          inputs: { willExists: "Yes", ihtPayable: "IHT400 needed", complexity: "Complex" },
          result: { note: "Can extend well beyond a year once HMRC clearance and asset sales are factored in" },
        },
      ],
    };
  },
  explainer: {
    heading: "What determines how long probate takes",
    paragraphs: [
      "Probate has several distinct stages, and delays in any one of them push the whole process back. First, the estate has to be gathered and valued, contacting every bank, pension provider, insurer and asset holder for a date-of-death valuation. Only once that is complete can the IHT forms be prepared, whether that is a short-form excepted estate return or the full IHT400 account.",
      "Where inheritance tax is due, HMRC must issue clearance before the grant application can usually proceed, and this step alone can take several weeks to months depending on the complexity of the estate and current HMRC workloads. Once the forms are settled, the application for the grant of probate (or letters of administration if there is no will) goes to HMCTS. In the latest published figures (January to March 2026), the mean wait from submission to grant was 6.4 weeks across all channels, around 4.5 weeks for the 82.6% of applications made digitally and 16.5 weeks for paper applications, though waits vary and stopped applications take much longer.",
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
        "Yes, typically. Without a will, the person entitled to apply for letters of administration has to be established under the intestacy rules, which can take longer to sort out, particularly for blended families or where the next of kin is not straightforward.",
    },
    {
      question: "Can probate be sped up?",
      answer:
        "Applying online where eligible, submitting complete and accurate paperwork the first time, and getting professional help with complex valuations all reduce the chance of delays caused by queries or rejected applications. Nothing removes HMCTS's own processing time, though.",
    },
    {
      question: "What happens if beneficiaries disagree during probate?",
      answer:
        "A dispute over the will's validity, an estranged beneficiary, or a challenge under the Inheritance (Provision for Family and Dependants) Act can significantly extend the timeline, sometimes by a year or more, and usually needs specialist advice.",
    },
  ],
};
