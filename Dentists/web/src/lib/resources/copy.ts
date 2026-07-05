/**
 * Per-page lead-magnet copy for the resource gate.
 *
 * The DOWNLOADS are per-topic (CategoryResource in registry.ts); the COPY is
 * per-page, templated from the topic label, the category's magnetTitle and the
 * specific page's title/intent, with an optional override. String-only and safe
 * in the client bundle.
 */
import type { TopicKey } from "@/lib/intent/taxonomy";
import { getTopic } from "@/lib/intent/taxonomy";
import { resourceForTopic } from "@/lib/resources/registry";

export interface GateCopy {
  heading: string;
  blurb: string;
}

export interface GateCopyOverride {
  heading?: string;
  blurb?: string;
}

/**
 * Build the gate copy for a page. `pageTitle` lets the blurb reference the
 * exact article/tool the reader is on; `override` wins field-by-field when present.
 */
export function gateCopy(
  topic: TopicKey | null | undefined,
  pageTitle?: string,
  override?: GateCopyOverride,
): GateCopy {
  const resource = resourceForTopic(topic);
  const topicObj = getTopic(topic ?? null);
  const label = topicObj?.label ?? "this topic";
  const magnetTitle = resource?.magnetTitle ?? "Free dental practice toolkit";

  const subject = pageTitle?.trim() || label;
  const blurbTemplate =
    resource?.magnetBlurbTemplate ??
    "A working Excel model with live formulas, plus the plain-English written guide. Enter your email and get instant access.";

  return {
    heading: override?.heading?.trim() || magnetTitle,
    blurb: override?.blurb?.trim() || blurbTemplate.replace(/\{label\}/g, subject),
  };
}
