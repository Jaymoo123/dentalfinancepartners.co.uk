/**
 * Site-parameterised consumption of the estate `calculator-tabs-crawl-path`
 * guard. A page that renders a tabs-only tool switcher must still carry a real
 * in-body link to a specific /calculators/<slug> page, because tabs render
 * buttons, not anchors.

 *
 * Both exemption lists stay empty. A route earns an entry only on a recorded
 * owner decision, never because a page edit tripped the guard.
 */
import { join } from "path";
import { registerCalculatorTabsCrawlPathGuard } from "@accounting-network/web-shared/design/guards/calculator-tabs-crawl-path";

registerCalculatorTabsCrawlPathGuard({
  appDir: join(__dirname, "..", "app"),
  tabsTag: "<CalculatorTabs",
  linkCardsTag: "<CalculatorLinkCards",
  toolRoutePrefix: "/calculators/",
  toolIndexRoute: "/calculators",
  noPriorInBodyLinks: [],
  ownerRemovedInBodyLinks: [],
  requireLiveUsage: true,
});
