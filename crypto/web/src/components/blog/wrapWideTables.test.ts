import { describe, it, expect } from "vitest";
import { wrapWideTables } from "./wrapWideTables";

describe("wrapWideTables", () => {
  it("wraps every table in its own scroll container", () => {
    const html = "<p>a</p><table><tr><td>1</td></tr></table><p>b</p><table><tr><td>2</td></tr></table>";
    const out = wrapWideTables(html);
    expect(out.match(/overflow-x-auto/g)).toHaveLength(2);
    // The scroll lives on the wrapper, never on the table itself.
    expect(out).not.toMatch(/<table[^>]*overflow/);
    expect(out).toContain('tabindex="0"');
  });

  it("keeps the table markup intact and leaves non-table html alone", () => {
    const html = '<table class="x"><thead><tr><th>H</th></tr></thead></table>';
    expect(wrapWideTables(html)).toContain('<table class="x"><thead><tr><th>H</th></tr></thead></table>');
    expect(wrapWideTables("<p>no tables</p>")).toBe("<p>no tables</p>");
  });
});
