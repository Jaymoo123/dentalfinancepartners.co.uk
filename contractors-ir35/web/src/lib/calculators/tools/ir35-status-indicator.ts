import type { GenericTool } from "@accounting-network/web-shared/tools/types";

/**
 * IR35 Status Indicator (CEST-lite / SDC) 2026/27.
 *
 * Weighted indicator across the four case-law/legislative IR35 tests.
 * No tax arithmetic -- pure rules/weights. No rates needed from tax2026.
 *
 * Weighting (per spec):
 *   substitution (personal service)  x3
 *   mutuality of obligation           x3
 *   control                           x2
 *   SDC (supervision/direction/ctrl)  x1
 *   own equipment                     x1
 *   financial risk                    x1
 *   part and parcel                   x1
 *
 * Each factor scores 0 (points toward inside) to max weight (points toward outside).
 * Total outside score / total possible -> band.
 *   >= 65% -> Likely outside
 *   35-64% -> Borderline
 *   <  35% -> Likely inside
 */

// ponytail: scoring inline, no separate class -- this is an indicator not a tax engine

type Band = "outside" | "borderline" | "inside";

interface StatusResult {
  band: Band;
  score: number;        // raw outside score
  maxScore: number;
  pct: number;          // 0-100
  factors: string[];    // top 2 factors driving the result (for display)
  warnings: string[];   // advisory flags even when outside
}

function computeStatus(v: Record<string, unknown>): StatusResult {
  const substitution = String(v.substitutionRight);
  const controlHow   = String(v.controlOver);
  const moo          = String(v.mutuality);
  const sdc          = String(v.sdc);
  const equipment    = String(v.ownEquipment);
  const finRisk      = String(v.financialRisk);
  const partParcel   = String(v.partAndParcel);

  // --- individual outside scores (0 = inside, weight = outside) ---
  // substitution x3
  const subScore =
    substitution === "unfettered" ? 3 :
    substitution === "approval"   ? 1 : 0;

  // MOO x3
  const mooScore =
    moo === "project" ? 3 :
    moo === "expected" ? 0 : 1; // "mixed" = 1

  // control x2
  const ctrlScore =
    controlHow === "you" ? 2 :
    controlHow === "negotiated" ? 1 : 0;

  // SDC x1 (no SDC = outside signal)
  const sdcScore = sdc === "no" ? 1 : 0;

  // own equipment x1
  const eqScore = equipment === "yes" ? 1 : 0;

  // financial risk x1
  const frScore = finRisk === "yes" ? 1 : 0;

  // part and parcel x1 (not integrated = outside)
  const ppScore = partParcel === "no" ? 1 : 0;

  const score = subScore + mooScore + ctrlScore + sdcScore + eqScore + frScore + ppScore;
  const maxScore = 3 + 3 + 2 + 1 + 1 + 1 + 1; // 12

  const pct = Math.round((score / maxScore) * 100);

  const band: Band = pct >= 65 ? "outside" : pct >= 35 ? "borderline" : "inside";

  // Surface top 2 factors driving the band (largest-weight contributors)
  const factorMap: Array<{ label: string; outsideScore: number; weight: number }> = [
    { label: "Personal service / right of substitution", outsideScore: subScore, weight: 3 },
    { label: "Mutuality of obligation",                  outsideScore: mooScore, weight: 3 },
    { label: "Control over how work is done",            outsideScore: ctrlScore, weight: 2 },
    { label: "No supervision, direction or control",     outsideScore: sdcScore,  weight: 1 },
    { label: "Provides own equipment",                   outsideScore: eqScore,   weight: 1 },
    { label: "Bears financial risk / corrections",       outsideScore: frScore,   weight: 1 },
    { label: "Not integrated as an employee",            outsideScore: ppScore,   weight: 1 },
  ];

  // For outside result: top contributors; for inside result: missing scores are the problem
  let factors: string[];
  if (band === "outside") {
    factors = factorMap
      .filter(f => f.outsideScore > 0)
      .sort((a, b) => b.outsideScore - a.outsideScore)
      .slice(0, 2)
      .map(f => f.label);
  } else {
    // surface the highest-weight factors pulling toward inside
    factors = factorMap
      .filter(f => f.outsideScore < f.weight)
      .sort((a, b) => (b.weight - b.outsideScore) - (a.weight - a.outsideScore))
      .slice(0, 2)
      .map(f => f.label);
  }

  const warnings: string[] = [];
  if (band === "outside" && sdc === "yes") {
    warnings.push(
      "Supervision, direction or control is present. Even where substitution and MOO point outside, SDC can be enough to bring a worker inside IR35 under the ESS rules and HMRC guidance. Consider whether the SDC element can be mitigated or documented."
    );
  }
  if (band !== "inside" && moo === "expected") {
    warnings.push(
      "Mutuality of obligation, an expectation of ongoing work on both sides, is one of the strongest inside pointers. If this reflects your actual working relationship, a contract review is strongly recommended."
    );
  }

  return { band, score, maxScore, pct, factors, warnings };
}

const BAND_LABELS: Record<Band, string> = {
  outside: "Likely outside IR35",
  borderline: "Borderline",
  inside: "Likely inside IR35",
};

const BAND_TONES: Record<Band, "good" | "default" | "warn"> = {
  outside: "good",
  borderline: "default",
  inside: "warn",
};

const BAND_SUMMARIES: Record<Band, string> = {
  outside:
    "Based on the working practices you described, this engagement shows characteristics typically associated with an outside-IR35 determination. The key factors are noted below. This is an indicative result only.",
  borderline:
    "This engagement shows a mixed picture. Some factors point outside IR35 and some inside. The result could go either way depending on the precise contractual terms and actual working practices. A contract review is advisable.",
  inside:
    "Based on the working practices you described, this engagement shows characteristics typically associated with an inside-IR35 determination. The key risk factors are noted below. This is an indicative result only.",
};

export const ir35StatusIndicator: GenericTool = {
  kind: "generic",
  slug: "ir35-status-indicator",
  name: "IR35 Status Indicator",
  category: "IR35 and take-home",
  oneLiner:
    "A weighted, plain-English indicator of whether your contract working practices point inside or outside IR35, based on substitution, control, mutuality of obligation and SDC.",
  metaTitle: "IR35 Status Checker 2026/27 | Inside or Outside IR35?",
  metaDescription:
    "Answer 7 questions about your working practices and get an indicative inside / borderline / outside IR35 result based on the core case-law tests. Updated 2026/27. Not legal advice.",
  intro:
    "Answer seven questions about how you actually work (not just what your contract says) and this indicator will tell you which way your engagement points on the three core IR35 tests: personal service and substitution, control, and mutuality of obligation, plus the SDC and business-on-own-account factors. The result is directional, not a determination. It tells you whether a contract review is urgent or precautionary.",
  ctaLabel: "Talk to a specialist contractor accountant about your IR35 position →",
  embedHeight: 780,
  fields: [
    {
      id: "substitutionRight",
      label: "Can you send a substitute to do the work?",
      type: "select",
      default: "approval",
      options: [
        {
          value: "unfettered",
          label: "Yes: I can send a suitably skilled substitute without the client's approval",
        },
        {
          value: "approval",
          label: "Yes, but only with the client's prior approval",
        },
        { value: "none", label: "No: the client requires me personally" },
      ],
      help: "An unfettered right of substitution (genuine in practice, not just on paper) is the single strongest outside-IR35 pointer. A clause that only allows substitution with client consent is weaker but can still point outside if the right has actually been exercised or would genuinely be accepted.",
    },
    {
      id: "mutuality",
      label: "How is the obligation to provide and accept work structured?",
      type: "select",
      default: "expected",
      options: [
        {
          value: "project",
          label:
            "Project-by-project: I can refuse work and the client has no obligation to offer it",
        },
        {
          value: "mixed",
          label: "Mixed: some expectation of continuity but I can decline specific assignments",
        },
        {
          value: "expected",
          label:
            "Ongoing: both sides expect me to accept work as it arises and the relationship continues",
        },
      ],
      help: "Mutuality of obligation (MOO) asks whether there is an overarching obligation on the client to offer work and on you to accept it. A clear project-based arrangement with no expectation of further work after each project points outside IR35. An ongoing rolling relationship where work is assumed points inside.",
    },
    {
      id: "controlOver",
      label: "Who controls how you carry out the work?",
      type: "select",
      default: "negotiated",
      options: [
        {
          value: "you",
          label: "I decide how to do the work: the client specifies the outcome, not the method",
        },
        {
          value: "negotiated",
          label:
            "Negotiated: the client sets some parameters but I have discretion over approach",
        },
        {
          value: "client",
          label: "The client directs how I work, when I work and the order I do things",
        },
      ],
      help: "The control test looks at the right to control how (not just what) the work is done. An outside-IR35 contractor typically agrees a deliverable and chooses their own method, tools and working order. An inside-IR35 worker is directed like an employee.",
    },
    {
      id: "sdc",
      label: "Are you subject to supervision, direction or control over how you do the work?",
      type: "select",
      default: "yes",
      options: [
        {
          value: "no",
          label:
            "No: I work autonomously; the client checks results, not how I produce them",
        },
        { value: "yes", label: "Yes: the client supervises or directs how I carry out my work" },
      ],
      help: "Supervision, direction or control (SDC) is the test used in the Employment Status for Tax rules and also appears in the umbrella and travel-expense restrictions. It is a lower bar than the IR35 control test: even light-touch oversight can count. The absence of SDC supports an outside result; its presence does not automatically mean inside but it is a risk factor.",
    },
    {
      id: "ownEquipment",
      label: "Do you provide your own significant equipment?",
      type: "select",
      default: "no",
      options: [
        {
          value: "yes",
          label:
            "Yes: I use my own laptop, tools, software licences or specialist equipment",
        },
        {
          value: "no",
          label: "No: the client provides the equipment and systems I work on",
        },
      ],
      help: "Providing your own significant equipment is an in-business pointer. A GP locum who brings their own diagnostic kit, or an IT contractor on their own laptop, scores here. This factor alone is not decisive but it adds weight to an outside case. Clients often require use of their own systems for security reasons, so document the reason if that applies to you.",
    },
    {
      id: "financialRisk",
      label: "Do you bear genuine financial risk on the engagement?",
      type: "select",
      default: "no",
      options: [
        {
          value: "yes",
          label:
            "Yes: I correct defects at my own cost, carry professional indemnity insurance or could make a loss",
        },
        {
          value: "no",
          label:
            "No: I am paid for time worked and the client bears the cost of any defects or rework",
        },
      ],
      help: "Bearing financial risk, such as having to put right defective work at your own expense or risking a bad debt, is an in-business pointer. An employee is not personally exposed to financial loss in this way. Professional indemnity insurance carried at your own cost supports this factor.",
    },
    {
      id: "partAndParcel",
      label: "Are you integrated into the client organisation like an employee?",
      type: "select",
      default: "no",
      options: [
        {
          value: "no",
          label:
            "No: I am clearly a contractor with no staff perks, no line manager title, not in the org chart",
        },
        {
          value: "yes",
          label:
            "Yes: I have a company email address, appear in the org chart or receive employee benefits",
        },
      ],
      help: "The 'part and parcel' or 'integration' test looks at whether you are embedded in the client's organisation as if you were an employee. Having a company email, being shown in the org chart, having a named line manager in the client's HR system, or receiving staff benefits are all inside pointers. The absence of these supports an outside result.",
    },
  ],
  compute: (v) => {
    const result = computeStatus(v);
    const bandLabel = BAND_LABELS[result.band];
    const tone: "good" | "default" | "warn" = BAND_TONES[result.band];
    const summary = BAND_SUMMARIES[result.band];

    const rows: Array<{ label: string; value: string; strong?: boolean }> = [
      {
        label: "Indicative status",
        value: bandLabel,
        strong: true,
      },
      {
        label: "Weighted score (outside factors)",
        value: `${result.score} / ${result.maxScore} (${result.pct}%)`,
      },
    ];

    if (result.factors.length > 0) {
      rows.push({
        label: result.band === "outside" ? "Key outside factors" : "Key risk factors",
        value: result.factors.join("; "),
      });
    }

    if (result.warnings.length > 0) {
      result.warnings.forEach((w, i) => {
        rows.push({ label: i === 0 ? "Advisory note" : "", value: w });
      });
    }

    rows.push({
      label: "What to do next",
      value:
        result.band === "outside"
          ? "Ensure your contract reflects your actual working practices and that your client can document the Status Determination Statement. Keep records of any substitutions, refused work and equipment use."
          : result.band === "borderline"
          ? "A contract review by a specialist is advisable. Small changes to working practices or contract wording can shift the balance, but only if they reflect reality."
          : "Speak to a specialist contractor accountant. If the engagement is inside IR35, operating through a limited company adds compliance cost with no tax benefit; umbrella is likely simpler. If the determination is wrong, a formal challenge needs correct documentation.",
    });

    return {
      headline: {
        label: summary,
        value: bandLabel,
        sub: `Weighted score: ${result.score}/${result.maxScore} (${result.pct}%) across substitution, MOO, control, SDC and business-on-own-account factors`,
        tone,
      },
      rows,
      note: "This indicator is based on case-law principles from Ready Mixed Concrete, Hall v Lorimer and related authorities, and HMRC's own factors for status determination. It is indicative only and is not a Status Determination Statement, a formal IR35 assessment or legal advice. For medium and large clients, the end client must issue an SDS (Status Determination Statement) under the off-payroll working rules; that SDS, not this tool, determines your tax position. Contract wording matters less than actual working practices: HMRC and tribunals look at the real relationship. Substitution clauses that have never been exercised and could not realistically be are given little weight. If you are uncertain, seek a contract review from a specialist IR35 adviser before taking up the assignment.",
    };
  },
  explainer: {
    heading: "How IR35 status is assessed for 2026/27",
    paragraphs: [
      "IR35 status is determined by applying case-law employment-status tests to the real working relationship between you and your client. The three most important tests, confirmed across decades of First-tier and Upper Tribunal decisions, are personal service and substitution, mutuality of obligation, and control. Each is weighted differently because the tribunals have consistently treated substitution and MOO as the most decisive factors when they are genuinely present. This indicator uses the same weights: substitution and MOO each carry three times the weight of the remaining factors, control carries double weight and the SDC, equipment, financial-risk and integration factors carry single weight.",
      "A genuine, unfettered right of substitution, where you can send a different person to do the work without the client needing to approve that person, is the single most powerful outside pointer. It fundamentally undermines any deemed-employment argument because employment, by definition, requires personal service. If your substitution clause requires client approval, the right is weaker but not worthless: it still points outside if the right has been exercised in practice, or if the approval is a formality rather than a veto. A clause that has never been tested and is effectively a dead letter carries little weight.",
      "Mutuality of obligation is often misunderstood. It does not just ask whether you are paid for the work you do, which is true of almost every arrangement. It asks whether there is an overarching obligation: does the client have to offer you further work, and do you have to accept it? A succession of project-based contracts where each engagement is genuinely self-contained, and where you can walk away or the client can decline to rebook without consequences, gives you the argument that there is no mutuality of obligation beyond the individual contract. A rolling arrangement where both sides assume continuity, particularly if there is a notice period, a retainer or an expectation of renewal, points strongly inside.",
      "The control test looks at the right to direct how, when and where you work, not just what you produce. Outside contractors typically agree a deliverable and choose their own methods, working order and tools. If the client specifies your working hours, your desk, your tools, the order of tasks and the method of working, that is employment-style control. The related SDC test (supervision, direction or control) used in the off-payroll and expense rules is a lower threshold than the control test in the IR35 case law, and even light-touch oversight satisfies it, so it is possible to fail SDC while passing the control test.",
      "The business-on-own-account factors (providing your own equipment, bearing financial risk, carrying your own professional indemnity insurance, working for multiple clients, marketing your services) are not individually decisive, but collectively they build a picture of genuine self-employment. A GP locum who brings their own diagnostic equipment, can refuse sessions, is not on the hospital rota and corrects errors at their own cost is a strong outside case even where the client exercises some clinical governance oversight (which is regulation, not control in the IR35 sense).",
      "Worked example 1, GP locum (likely outside). A GP locum takes sessions at various NHS and private practices on a session-by-session basis. They can send a suitably qualified colleague with the practice's agreement, set their own clinical approach within regulatory standards, bring their own equipment, carry medical indemnity insurance at their own cost and can decline sessions without penalty. Each session is a standalone arrangement with no obligation on either side beyond it. Weighted score on this indicator: 10 out of 12 (83%). Result: Likely outside IR35. Decisive factors: project-by-project mutuality (no obligation on either side beyond the session) and personal service (substitution allowed with approval). The clinical governance oversight is regulatory, not IR35 control. For medium and large NHS clients, the end client must issue an SDS; this indicator is a prompt to ensure that SDS matches the actual working position.",
      "Worked example 2, IT contractor on a client site (likely inside). An IT contractor has worked on the same project at a large bank for 14 months. Their contract allows substitution with client approval but no substitute has ever been put forward. The bank expects them to be available Monday to Friday, they use the client's laptop and security systems and are part of the project squad with a named delivery manager. Control is negotiated: they have discretion over technical approach but attend daily standups and sprint ceremonies, and are supervised on how the work is carried out. Weighted score on this indicator: 2 out of 12 (17%). Result: Likely inside IR35. Key risk factors: ongoing mutuality (both sides expect continuity) and substitution that has never been tested and may be a contractual formality. The length of the engagement and the daily attendance add to the inside picture. For a medium or large client, the client's SDS governs; the contractor should request and review it, and use the formal disagreement process if it does not reflect the real working relationship.",
    ],
  },
  related: [
    {
      label: "Outside IR35 take-home pay calculator 2026/27",
      href: "/calculators/outside-ir35-take-home-calculator",
    },
    {
      label: "Inside IR35 take-home pay calculator 2026/27",
      href: "/calculators/inside-ir35-take-home-calculator",
    },
    {
      label: "Umbrella vs limited company calculator",
      href: "/calculators/umbrella-vs-limited-calculator",
    },
  ],
  faqs: [
    {
      question: "Is this the same as the HMRC CEST tool?",
      answer:
        "No. HMRC's Check Employment Status for Tax (CEST) tool is the only tool HMRC will stand behind for off-payroll working determinations, and only when it is completed accurately. This indicator uses the same underlying case-law tests (substitution, control, mutuality of obligation and SDC) but it applies a weighted score to give you a directional read before a formal assessment. It is not a CEST equivalent and it cannot be relied on as a Status Determination Statement. Use it to understand which way your working practices point and whether a contract review or CEST run is urgent.",
    },
    {
      question: "Can I rely on this result if my client asks for my IR35 status?",
      answer:
        "No. For medium and large clients, the off-payroll working rules require the end client to issue a formal Status Determination Statement (SDS) with their reasons. That SDS is what governs your tax position, not any contractor-led assessment. For small clients, where the off-payroll rules do not apply, the contractor still bears responsibility for determining status. In either case, this indicator is a prompt and a starting point, not a formal assessment.",
    },
    {
      question: "What is mutuality of obligation and why does it matter so much?",
      answer:
        "Mutuality of obligation (MOO) is the requirement that, for an employment to exist, both sides must be under some obligation: the worker to do the work, the engager to pay for it. In the IR35 context, tribunals look beyond the individual contract to the overall arrangement: is there an ongoing obligation on the client to offer work, and on you to accept it? If each engagement is genuinely standalone and either side can walk away without consequences, that points outside. A rolling arrangement where both sides expect continuity, particularly one with a notice period or an expectation of renewal, points inside. MOO carries a high weight in this indicator because it forms one limb of the foundational Ready Mixed Concrete test, and the Supreme Court in HMRC v Professional Game Match Officials (2024) reaffirmed that some irreducible mutuality is a necessary condition for employment. Note that the courts have held mutuality alone does not determine status; it must be read alongside control and the wider picture.",
    },
    {
      question: "Does a substitution clause in my contract mean I am automatically outside IR35?",
      answer:
        "No. A substitution clause that has never been used, that could not realistically be used because the client would veto any substitute, or that requires the client's approval for an undefined reason, carries little weight with HMRC or a tribunal. The right of substitution must be genuine: the contract must allow it, it must be economically real (you could afford to pay a substitute and still profit) and the client must not have an effective veto that negates the right in practice. Evidence that a substitute was actually sent, or that the right was seriously offered, is far more persuasive than a clause alone.",
    },
    {
      question: "What is SDC and is it the same as the IR35 control test?",
      answer:
        "Supervision, direction or control (SDC) and the IR35 control test are related but distinct. The IR35 control test, drawn from Ready Mixed Concrete and applied in cases such as Hall v Lorimer, asks whether the engager has the right to control how the work is done. SDC, used in the off-payroll expense and umbrella rules, is a lower bar: it asks whether you are subject to any supervision, direction or control over your method of working, and even light-touch oversight satisfies it. You can fail the SDC test (supervision present) while still passing the IR35 control test (no meaningful control over the method). Both are scored in this indicator separately because both matter for different parts of the rules.",
    },
    {
      question: "I am a locum doctor. Am I automatically outside IR35?",
      answer:
        "No. IR35 status depends on the actual working relationship for each engagement, not the profession. Many locum doctors are outside IR35 because they can refuse sessions, set their own clinical approach within regulatory guidelines, use their own equipment and have no ongoing obligation to attend. Clinical governance and regulatory oversight from a hospital or practice is not IR35 control; it is a regulatory requirement that applies to everyone in that clinical environment, including employees. However, a locum in a long-running arrangement with a single NHS trust, attending daily ward rounds like a staff doctor and using the hospital's systems exclusively, could be inside IR35. The result depends on the specifics of each engagement, and medium/large NHS clients must issue an SDS. Review that SDS carefully.",
    },
    {
      question: "What happens if my client says I am inside IR35 but I disagree?",
      answer:
        "For medium and large clients subject to the off-payroll rules, you have a right to a disagreement process: you can formally dispute the Status Determination Statement. The client must respond within 45 days with either a revised SDS or reasons for maintaining the original determination. If the dispute is not resolved, the liability for the PAYE and NIC may shift. You should document your grounds for disagreement, ideally with input from a specialist IR35 adviser. For small clients where the off-payroll rules do not apply, the contractor bears responsibility for self-assessment and the dispute is with HMRC rather than the client.",
    },
  ],
};
