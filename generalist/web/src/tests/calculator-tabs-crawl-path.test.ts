/**
 * Site-parameterised consumption of the estate `calculator-tabs-crawl-path`
 * guard. A page that renders a tabs-only tool switcher must still carry a real
 * in-body link to a specific /calculators/<slug> page, because tabs render
 * buttons, not anchors.
 *
 * `requireLiveUsage: false`: this site has not ported CalculatorTabs yet, so
 * there are zero usages and the guard would otherwise fail on its own
 * liveness check. Flip it to true (delete the option) in the phase that lands
 * the tabs component on the calculator pages, so the guard stops passing
 * vacuously.
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
  requireLiveUsage: false,
});
