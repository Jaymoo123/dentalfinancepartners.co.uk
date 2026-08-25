/**
 * Self-test for the hub-article-crawl-path guard TEMPLATE.
 *
 * Exercises the pure `checkHubArticleList` predicate against inline source
 * strings only — no filesystem access, no site content directory.
 */
import { describe, it, expect } from "vitest";
import { checkHubArticleList } from "./hub-article-crawl-path";

describe("checkHubArticleList", () => {
  it("flags a full map over the default `posts` variable as safe", () => {
    const src = "export function HubArticleList({ posts }) { return <div>{posts.map((p) => <Card key={p.slug} hidden={x} />)}</div>; }";
    const check = checkHubArticleList(src);
    expect(check.mapsFullArray).toBe(true);
    expect(check.slicesArray).toBe(false);
    expect(check.hidesOffPageCards).toBe(true);
  });

  it("flags a slice() as the regression it is meant to catch", () => {
    const src = "posts.slice(0, postsPerPage).map((p) => <Card key={p.slug} />)";
    const check = checkHubArticleList(src);
    expect(check.mapsFullArray).toBe(false);
    expect(check.slicesArray).toBe(true);
  });

  it("flags missing `hidden` attribute", () => {
    const src = "{posts.map((p) => <Card key={p.slug} />)}";
    expect(checkHubArticleList(src).hidesOffPageCards).toBe(false);
  });

  it("generalises to a differently-named posts variable", () => {
    const src = "{articles.map((a) => <Card key={a.slug} hidden={x} />)}";
    const check = checkHubArticleList(src, "articles");
    expect(check.mapsFullArray).toBe(true);
    // The default variable name must not match under the custom name.
    expect(checkHubArticleList(src).mapsFullArray).toBe(false);
  });
});
