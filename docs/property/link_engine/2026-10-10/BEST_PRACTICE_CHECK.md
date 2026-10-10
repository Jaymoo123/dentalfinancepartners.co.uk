# Best-practice check of the link engine rules (2026-10-10)

Research by an Opus agent against Google's own documentation and statements ([G])
and recognised third-party research ([3P]). Verdicts and refinements below are
adopted into the engine rules unless the owner says otherwise.

| Rule | Verdict | Strongest sources | Refinement adopted |
|---|---|---|---|
| R-A Intent split: guides own searches Google answers with guides; sales pages own hire wording | Partly consistent | [3P] Ahrefs "3 Cs" (https://ahrefs.com/blog/search-intent/): match the dominant content type. [3P] Ahrefs cannibalisation (https://ahrefs.com/blog/keyword-cannibalization/): only a problem when pages share the same intent; de-optimising one page is not recommended. [G] Mueller 2025 (https://www.searchenginejournal.com/google-answers-seo-question-about-keyword-cannibalization/556472/): several of your pages in one result "doesn't seem problematic"; reduce unnecessary duplication. | "One owner" is a target per intent, not a ban. The non-owner does not use the owner's main phrase in its title or H1, but body copy keeps its natural topic words. Mixed-intent searches can keep two pages with clearly different angles. Our problem is the wrong page showing, not two pages splitting results. |
| R-B Move "landlord tax advice" to the landlord tax pillar | Consistent | [3P] Ahrefs 3 Cs: 56% guides in the top 10 means a service page is the wrong type. [3P] Agency guidance (e.g. https://www.smartsites.com/blog/keyword-cannibalization-in-seo-how-to-find-and-fix-it/): fix blog vs service clashes by sharpening intent, not merging. | The service page keeps hire wording ("landlord tax adviser"); do not retitle in a way that loses long-tail terms. |
| R-C Wait before judging recently rewritten pages | Consistent; the 14 days is ours | [G] SEO Starter Guide (https://developers.google.com/search/docs/fundamentals/seo-starter-guide): changes take hours to months; "wait a few weeks to assess". | Wait at least 14 days AND until the pages have been recrawled (URL Inspection), and wait out any core update in progress. |
| R-D One contextual link per guide to its sales page, varied descriptive anchors, no forced links | Mostly consistent | [G] Link best practices (https://developers.google.com/search/docs/crawling-indexing/links-crawlable): descriptive, concise, relevant anchors; surrounding words matter. [G] Spam policies (https://developers.google.com/search/docs/essentials/spam-policies): pages made only to funnel visitors are doorways. [G] Mueller 2022/2025: link position is not measurably different; worry is linking everything to everything. | The one-third exact-match anchor cap is a style rule, not a Google requirement. Guides must stand on their own as genuinely useful pages; the "no forced link" (primary "none") rule is the right guard. |
| R-E Diagnose before linking | Consistent in spirit; no direct Google source | [3P] Ahrefs: fix overlap first, then update internal links. | Keep as sensible ordering, described as such. |

## Best practice we were not doing (adopted as engine to-dos)

1. **Sales pages link back to their guides** (two-way pillar and cluster). [3P] HubSpot topic clusters; [G] links give context on a topic.
2. **Near-duplicates:** best practice is to merge true duplicates (301). House rule (standard_terms section 4) forbids collapsing pages; merges stay a separate opt-in, data-gated workstream. The engine differentiates instead and lists true duplicates for the owner.
3. **Trust signals.** [G] Helpful content (https://developers.google.com/search/docs/fundamentals/creating-helpful-content): "trust is most important"; make clear who wrote and reviewed a page and why. Genuine signals only (house rule: no fake E-E-A-T).
4. **Scale caution.** [G] Helpful content warns against lots of content on many topics "in hopes that some of it might perform well"; scaled content abuse policy. Keeps the A* bar on every guide that receives links.
5. **Do not over-target exact phrases.** [G] Starter Guide: language matching is sophisticated.
