"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "../cn";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "group rounded-xl bg-slate-50 border border-transparent transition-colors data-[state=open]:border-primary-600 hover:border-primary-600",
      className,
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

// Focus ring colour reads `--kit-focus-ring` with `--color-primary-600` as the
// fallback, matching `layout-utils.ts` `focusRing` exactly (this trigger keeps
// its own INSET offset, which is why it cannot just import the recipe). The
// kit buttons already read the same hook. A site that has not declared
// `--kit-focus-ring` resolves to primary-600, the old colour.
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5 text-left text-sm sm:text-base font-bold text-slate-900 transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--kit-focus-ring,var(--color-primary-600))] [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className="h-5 w-5 shrink-0 text-primary-600 transition-transform duration-200"
        aria-hidden
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, forceMount, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    // `forceMount` keeps a closed panel in the DOM (so its answer is in the
    // server HTML for whatever the page's JSON-LD asserts); Radix marks it
    // `hidden`, and the class makes that explicit under Tailwind's preflight.
    // Undefined = Radix's default unmount, byte-identical for every caller
    // that does not pass it (added 2026-09-29, startups-tech uplift).
    forceMount={forceMount}
    className={
      "overflow-hidden text-sm sm:text-base leading-relaxed text-slate-700 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down" +
      (forceMount ? " data-[state=closed]:hidden" : "")
    }
    {...props}
  >
    <div className={cn("border-t border-slate-200 bg-white px-4 py-4 sm:px-6 sm:py-5", className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
