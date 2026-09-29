import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { allTools, toolPath } from "@/lib/calculators/registry";
import { site } from "@/lib/calculators/site";
import { siteContainerLg, sectionY, focusRing } from "@/components/ui/layout-utils";
import EcommerceBackdrop from "@/components/layout/EcommerceBackdrop";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: `Free Ecommerce Tax Calculators`,
  description: "Free calculators for UK online sellers: take-home after tax, VAT threshold tracker and sole trader vs limited company comparison. 2026/27 HMRC rates.",
  alternates: { canonical: `${site.url}/calculators` },
};

export default function CalculatorsPage() {
  const tools = allTools();
  return (<>
    {/* ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx, the same
        call the services, for and vat hubs make. The Home crumb is NOT a new
        internal link: the kit header wordmark
        (packages/web-shared/design/chrome/SiteHeader.tsx:128) and footer
        (SiteFooter.tsx:145) already emit href="/" on every page, so this
        route's UNIQUE internal link set is unchanged. It also emits the
        route's only BreadcrumbList JSON-LD.

        ADOPTION DECLINED: packages/web-shared/design/primitives/SlimHero.tsx.
        Its own header says it is the shallow hero for the token-gated noindex
        pages and is "deliberately not the content-page hero", and it hardcodes
        a slate-900 ground that would replace the locked brand hero.
        RE-EXAMINED U2 2026-09-29 and the decline STANDS on two testable facts,
        neither of which `sectionClassName` (SlimHero.tsx:27,35-47) addresses.
        That prop does remove the ground half of the old objection: it replaces
        the single class `bg-slate-900` and nothing else, so the brand hero
        could keep its ground. What it cannot do:
        (a) SlimHero renders no breadcrumb slot at all (SlimHero.tsx:49-59 is
            section > container > Eyebrow + h1 + children, and `children` is the
            standfirst position under the h1). This hero's Breadcrumb emits the
            route's ONLY BreadcrumbList JSON-LD, so adopting would either delete
            that node or move the trail below the h1.
        (b) its eyebrow is hardcoded `Eyebrow onDark` (SlimHero.tsx:54) with no
            override, and on this site's #8a5e1a brand ground the kit's on-dark
            branch (text-slate-300, #cbd5e1) measures 3.83:1, under the 4.5
            floor for an 11-12px label. That is the same measurement that keeps
            `Eyebrow onDark` declined on every hero in this family.
        It also shortens the rhythm from py-16 sm:py-20 to py-8 sm:py-10 lg:py-12,
        which is a structural class the prop explicitly does not touch. So gate
        D4 is answered without SlimHero: the four hub section labels became
        config strings and the hand-rolled heroes stay.

        ADOPTION DECLINED here only: `Eyebrow onDark` from
        packages/web-shared/design/primitives/page-blocks.tsx. Its on-dark
        branch is text-slate-300 (#cbd5e1), 3.83:1 on this #8a5e1a ground, under
        the 4.5 floor for an 11-12px label. Eyebrow IS adopted below on the
        light section, where its slate-600 branch clears the floor.

        `ground-dark` is load-bearing: the breadcrumb is the first focusable
        thing in this hero and without the rebind its ring would paint #8a5e1a
        on #8a5e1a, 1.00:1. No light island sits inside this section. */}
    <section className="ground-dark relative overflow-hidden border-b border-slate-200 bg-primary-700 py-16 sm:py-20">
      {/* Decoration only, aria-hidden, pointer-events-none. The section
          carries `relative overflow-hidden` and the container below
          `relative z-10`: that is the backdrop host contract, and getting
          it wrong paints the texture over the copy. */}
      <EcommerceBackdrop />
      <div className={`relative z-10 ${siteContainerLg}`}>
        <Breadcrumb tone="onBrand" siteUrl={site.url} items={[{ label: "Home", href: "/" }, { label: "Calculators" }]} />
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">Ecommerce seller calculators</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">Free tools for UK online sellers built on current HMRC rates.</p>
      </div>
    </section>
    {/* ADOPTION DECLINED, re-examined: packages/web-shared/design/marketing/CoverageCards.tsx.
        lucide-react is now declared in ecommerce/web/package.json, so that half
        of the old reason is gone. The other half is decisive and unchanged: its
        cards are <div>s with no link slot, and here the cards ARE the four
        /calculators/<slug> links, the entire job of the grid. Adopting it would
        delete them. It may fit a grid that is not navigation; this one is. It
        would also still need an invented LucideIcon per tool.
        What lucide buys is the affordance the cards lacked: an ArrowRight that
        slides on hover, aria-hidden decoration, text-primary-600 (#9e6615,
        4.81 on the white card, past the 3.0 graphic floor).

        ADOPTION DECLINED: packages/web-shared/design/marketing/StickyCTA.tsx,
        an interruption, banned estate-wide. */}
    <section className={`bg-primary-400/5 ${sectionY}`}>
      <div className={siteContainerLg}>
        <Eyebrow>The tools</Eyebrow>
        <div className="mt-6 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
          {tools.map((t) => (
            <Link key={t.slug} href={toolPath(t.slug)} className={`group flex flex-col border border-slate-200 bg-white p-5 sm:p-6 transition-all hover:border-primary-400 hover:shadow-md ${focusRing}`}>
              {/* text-primary-700 (#8a5e1a, 5.68 on white), NOT
                  var(--brand-primary) (#c9861b, 3.04 on white, which
                  globals.css:96 marks decorative only). This 12px uppercase
                  label is text and needs the 4.5 floor. The card's hover border
                  keeps primary-400: a border is a graphic and clears 3:1. */}
              <div className="text-xs font-semibold uppercase tracking-wide text-primary-700">{t.category}</div>
              <h2 className="mt-2 text-base font-bold text-slate-900 group-hover:text-primary-700 transition-colors">{t.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{t.oneLiner}</p>
              {/* Affordance only, no label: aria-hidden, so the link's
                  accessible name is unchanged and no copy is authored. */}
              <ArrowRight aria-hidden className="mt-4 h-4 w-4 text-primary-600 transition-transform group-hover:translate-x-1" strokeWidth={2} />
            </Link>
          ))}
        </div>
      </div>
    </section>
    {/* ADOPTED (U2, 2026-09-29, owner gate D3 answered yes):
        packages/web-shared/design/marketing/LeadCTAPanel.tsx. The owner ruling
        is an enquiry form on every money page "including calculators and
        research indexes", and this route rendered zero capture: one <LeadForm>
        mount, the site's own component, nothing gated.

        NO COPY IS AUTHORED. `title` and `description` are this site's own
        published panel strings, taken verbatim from /services, /for and /about,
        which mount the identical pair. Three component defaults would publish
        copy nobody wrote and are overridden to empty, which the component
        renders as nothing: `eyebrow=""` (kit default is a fee claim, K7),
        `formTitle=""` and `proofPoints={[]}` (K8: no authored proof-point set
        exists on this site).

        No `.ground-dark`: the panel paints bg-slate-900 but the form sits on a
        WHITE card inside it, and `.ground-dark` on an ancestor of a light
        island is the defect that rule names. The `backdrop` slot is left empty
        because EcommerceBackdrop hardcodes id="ecommerce-settlement-run" and
        the hero above already mounts it. */}
    <LeadCTAPanel
      eyebrow=""
      title="Speak to an ecommerce tax specialist."
      description="Tell us about your situation and we will reply within 24 hours."
      proofPoints={[]}
      formTitle=""
      form={<LeadForm />}
    />
  </>);
}
