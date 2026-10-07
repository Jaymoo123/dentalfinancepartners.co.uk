# Final fix receipt, pre-tag

Three lines from R5_FINAL_REREVIEW.md §5. Nothing else touched. No build, no
server, no git state changes.

## 1. R5-1 (serious) — blog sidebar CTA contrast

`pharmacies/web/src/app/blog/[category]/[slug]/page.tsx`

```diff
             <BlogSidebarCta
               copy={{ heading: niche.blog.cta_heading, body: niche.blog.cta_body }}
               buttonLabel={niche.blog.cta_button}
+              buttonClassName="bg-[var(--btn-ground)] text-white hover:bg-[var(--btn-ground-hover)] active:bg-[var(--btn-ground-active)]"
             />
```

`--btn-ground` / `-hover` / `-active` already declared in `globals.css:165-167`
(primary-950 trio, white-on-them measured 12.18 by R5). 22 posts affected.

## 2. R5-2 / m4 — stray missing full stop

`pharmacies/web/src/lib/intent/widget-config.ts:106`

```diff
-  reason = "You have spent real time on this. A quick look will confirm where you stand",
+  reason = "You have spent real time on this. A quick look will confirm where you stand.",
```

## 3. R5-3 / N3 — un-grounded `NextStepOffer` band on 13 routes

`pharmacies/web/src/app/services/[slug]/page.tsx:397`

```diff
-    <div className={siteContainerLg}><NextStepOffer /></div>
+    <section className="bg-slate-50 py-12"><div className={siteContainerLg}><NextStepOffer /></div></section>
```

`pharmacies/web/src/app/for/[slug]/page.tsx:223`

```diff
-    <div className={siteContainerLg}><NextStepOffer /></div>
+    <section className="bg-slate-50 py-12"><div className={siteContainerLg}><NextStepOffer /></div></section>
```

8 `/services/*` + 5 `/for/*` = 13 routes.

## Verification

`cd pharmacies/web && npx tsc --noEmit` — no output, clean.

`npx vitest run` — 8 files, **86 passed (86)**, matches baseline. Two expected
stderr traces (fail-open Twilio/bridge tests logging on purpose), no failures.
