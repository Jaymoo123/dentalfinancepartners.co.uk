/**
 * Schema module unit tests — GAP-8 W4b suite.
 *
 * Verifies: builder output shapes, no undefined leakage, serialize safety,
 * Property-compat optional fields (reviewedBy/reviewerCredentials).
 */
import { describe, it, expect } from "vitest";
import { serialize } from "./serialize";
import { buildOrganization, referencedOrganization, buildWebSite } from "./organization";
import { buildBreadcrumb } from "./breadcrumb";
import { buildBlogPosting } from "./blog-posting";
import { buildArticle } from "./article";
import { buildFaqPage } from "./faq-page";
import { buildHowTo } from "./howto";
import { buildWebApplication } from "./web-application";
import { buildAccountingService, buildLocalBusinessJsonLd } from "./local-business";
import { buildDefinedTerm, buildDefinedTermSet } from "./defined-term";
import { buildCollectionPage } from "./collection-page";
import { buildOgImageUrl } from "./og";
import { buildPerson, referencedPerson } from "./person";
import type { SiteSchemaOpts, SchemaThing } from "./types";

const OPTS: SiteSchemaOpts = {
  siteUrl: "https://www.example.co.uk",
  siteName: "Example Accountants",
  legalName: "Example Accountants Ltd",
  description: "UK small-business tax specialists.",
  tagline: "Tax made simple.",
  organizationType: "AccountingService",
  publisherLogoUrl: "/brand/logo.png",
  email: "hello@example.co.uk",
  phone: "020 1234 5678",
  serviceAreas: ["London", "Manchester"],
  knowsAbout: ["Corporation tax", "VAT"],
};

const DUMMY_AUTHOR: SchemaThing = {
  "@type": "Person",
  name: "Test Author",
  url: "https://www.example.co.uk/team/test",
};

function hasNoUndefined(obj: unknown): boolean {
  if (typeof obj !== "object" || obj === null) return true;
  for (const [, v] of Object.entries(obj as Record<string, unknown>)) {
    if (v === undefined) return false;
    if (typeof v === "object" && !hasNoUndefined(v)) return false;
  }
  return true;
}

// ---------------------------------------------------------------------------
// serialize
// ---------------------------------------------------------------------------
describe("serialize", () => {
  it("escapes </script> sequences", () => {
    const out = serialize({
      "@type": "Thing",
      name: "a</script>b",
    });
    expect(out).toContain("<\\/script>");
    expect(out).not.toContain("</script>");
  });

  it("handles arrays", () => {
    const out = serialize([
      { "@type": "Thing", name: "a" },
      { "@type": "Thing", name: "b" },
    ]);
    expect(JSON.parse(out)).toHaveLength(2);
  });
});

// ---------------------------------------------------------------------------
// organization
// ---------------------------------------------------------------------------
describe("buildOrganization", () => {
  it("emits @context, @type, @id, name", () => {
    const org = buildOrganization(OPTS);
    expect(org["@context"]).toBe("https://schema.org");
    expect(org["@type"]).toBe("AccountingService");
    expect(org["@id"]).toBe("https://www.example.co.uk#organization");
    expect(org.name).toBe("Example Accountants Ltd");
    expect(hasNoUndefined(org)).toBe(true);
  });

  it("emits serviceAreas and knowsAbout when provided", () => {
    const org = buildOrganization(OPTS);
    expect(Array.isArray(org.areaServed)).toBe(true);
    expect(Array.isArray(org.knowsAbout)).toBe(true);
  });

  it("omits optional fields when not provided", () => {
    const minimalOpts: SiteSchemaOpts = {
      siteUrl: "https://www.x.co.uk",
      siteName: "X",
      publisherLogoUrl: "/logo.png",
    };
    const org = buildOrganization(minimalOpts);
    expect(org.email).toBeUndefined();
    expect(org.telephone).toBeUndefined();
    expect(hasNoUndefined(org)).toBe(true);
  });
});

describe("referencedOrganization", () => {
  it("returns @id pointing to org fragment", () => {
    const ref = referencedOrganization(OPTS);
    expect(ref["@id"]).toBe("https://www.example.co.uk#organization");
    expect(hasNoUndefined(ref)).toBe(true);
  });
});

describe("buildWebSite", () => {
  it("emits WebSite with SearchAction", () => {
    const ws = buildWebSite(OPTS);
    expect(ws["@type"]).toBe("WebSite");
    expect((ws.potentialAction as SchemaThing)?.["@type"]).toBe("SearchAction");
  });
});

// ---------------------------------------------------------------------------
// breadcrumb
// ---------------------------------------------------------------------------
describe("buildBreadcrumb", () => {
  it("maps items to ListItem positions", () => {
    const crumbs = buildBreadcrumb(
      [
        { label: "Home", href: "/" },
        { label: "Blog", href: "/blog" },
        { label: "Post" },
      ],
      OPTS,
    );
    const list = crumbs.itemListElement as unknown[];
    expect(list).toHaveLength(3);
    expect((list[0] as Record<string, unknown>).position).toBe(1);
    expect((list[2] as Record<string, unknown>).item).toBeUndefined();
    expect(hasNoUndefined(crumbs)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// blog-posting
// ---------------------------------------------------------------------------
describe("buildBlogPosting", () => {
  const post = {
    h1: "Test post",
    metaDescription: "A test.",
    date: "2025-01-01",
    category: "Tax",
  };

  it("emits BlogPosting with required fields", () => {
    const bp = buildBlogPosting(post, "/blog/tax/test-post", OPTS, DUMMY_AUTHOR);
    expect(bp["@type"]).toBe("BlogPosting");
    expect(bp.headline).toBe("Test post");
    expect(bp.datePublished).toBe("2025-01-01");
    expect(bp.dateModified).toBe("2025-01-01");
    expect(hasNoUndefined(bp)).toBe(true);
  });

  it("prefers dateModified over updatedDate", () => {
    const bp = buildBlogPosting(
      { ...post, updatedDate: "2025-02-01", dateModified: "2025-03-01" },
      "/blog/tax/p",
      OPTS,
      DUMMY_AUTHOR,
    );
    expect(bp.dateModified).toBe("2025-03-01");
  });

  it("emits reviewedBy block when provided (Property compat)", () => {
    const bp = buildBlogPosting(
      { ...post, reviewedBy: "Jane Smith", reviewerCredentials: "ACA" },
      "/blog/tax/p",
      OPTS,
      DUMMY_AUTHOR,
    );
    const rb = bp.reviewedBy as Record<string, unknown>;
    expect(rb?.name).toBe("Jane Smith");
    expect(rb?.jobTitle).toBe("ACA");
  });

  it("omits reviewedBy when not provided", () => {
    const bp = buildBlogPosting(post, "/blog/tax/p", OPTS, DUMMY_AUTHOR);
    expect(bp.reviewedBy).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// faq-page
// ---------------------------------------------------------------------------
describe("buildFaqPage", () => {
  it("returns null for empty array", () => {
    expect(buildFaqPage([])).toBeNull();
  });

  it("emits correct mainEntity count", () => {
    const fp = buildFaqPage([
      { question: "Q1", answer: "A1" },
      { question: "Q2", answer: "A2" },
    ]);
    expect((fp!.mainEntity as unknown[]).length).toBe(2);
    expect(hasNoUndefined(fp!)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// og
// ---------------------------------------------------------------------------
describe("buildOgImageUrl", () => {
  it("constructs URL with title param", () => {
    const url = buildOgImageUrl("Hello world", OPTS);
    expect(url).toContain("https://www.example.co.uk/api/og");
    expect(url).toContain("title=Hello+world");
  });

  it("appends category when provided", () => {
    const url = buildOgImageUrl("Title", OPTS, "Tax");
    expect(url).toContain("category=Tax");
  });
});

// ---------------------------------------------------------------------------
// howto
// ---------------------------------------------------------------------------
describe("buildHowTo", () => {
  it("emits steps with positions", () => {
    const h = buildHowTo(
      {
        name: "How to file",
        description: "Step by step",
        path: "/guides/filing",
        steps: [
          { name: "Step 1", text: "Do this" },
          { name: "Step 2", text: "Do that" },
        ],
      },
      OPTS,
    );
    const steps = h.step as unknown[];
    expect(steps).toHaveLength(2);
    expect((steps[1] as Record<string, unknown>).position).toBe(2);
    expect(hasNoUndefined(h)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// web-application
// ---------------------------------------------------------------------------
describe("buildWebApplication", () => {
  it("emits SoftwareApplication/WebApplication types", () => {
    const wa = buildWebApplication(
      { name: "Tax calc", description: "UK tax", path: "/calculators/tax" },
      OPTS,
    );
    expect(wa["@type"]).toContain("WebApplication");
    expect((wa.offers as Record<string, unknown>)?.price).toBe("0");
    expect(hasNoUndefined(wa)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// local-business
// ---------------------------------------------------------------------------
describe("buildAccountingService", () => {
  it("emits AccountingService with address", () => {
    const lb = buildAccountingService(
      { city: "London", url: "/locations/london", name: "London office", description: "We serve London." },
      OPTS,
    );
    expect(lb["@type"]).toBe("AccountingService");
    expect((lb.address as Record<string, unknown>)?.addressLocality).toBe("London");
    expect(hasNoUndefined(lb)).toBe(true);
  });
});

describe("buildLocalBusinessJsonLd (legacy compat)", () => {
  it("returns a JSON string with the org type", () => {
    const s = buildLocalBusinessJsonLd({
      name: "Dentists Finance",
      legalName: "DF Ltd",
      description: "Desc",
      url: "https://x.co.uk",
      logo: "https://x.co.uk/logo.png",
      email: "a@b.co.uk",
      phone: "01234",
      areaServed: "Manchester",
      city: "Manchester",
      organizationType: "Dentist",
    });
    const parsed = JSON.parse(s);
    expect(parsed["@type"]).toBe("Dentist");
    expect(parsed.name).toBe("Dentists Finance - Manchester");
  });
});

// ---------------------------------------------------------------------------
// defined-term
// ---------------------------------------------------------------------------
describe("buildDefinedTerm / buildDefinedTermSet", () => {
  it("emits DefinedTerm with glossary URL", () => {
    const dt = buildDefinedTerm(
      { slug: "bas", term: "Basic Accounting", definition: "It is accounting." },
      OPTS,
    );
    expect(dt["@type"]).toBe("DefinedTerm");
    expect(dt["@id"]).toContain("/glossary/bas#term");
    expect(hasNoUndefined(dt)).toBe(true);
  });

  it("emits DefinedTermSet with custom name/description", () => {
    const dts = buildDefinedTermSet(
      [{ slug: "bas", term: "Basic Accounting" }],
      OPTS,
      "Example Glossary",
      "Plain-English definitions.",
    );
    expect(dts.name).toBe("Example Glossary");
    expect((dts.hasDefinedTerm as unknown[]).length).toBe(1);
    expect(hasNoUndefined(dts)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// collection-page
// ---------------------------------------------------------------------------
describe("buildCollectionPage", () => {
  it("emits CollectionPage with isPartOf", () => {
    const cp = buildCollectionPage(
      { name: "Blog", description: "All posts", path: "/blog" },
      OPTS,
    );
    expect(cp["@type"]).toBe("CollectionPage");
    expect((cp.isPartOf as Record<string, unknown>)?.name).toBe("Example Accountants");
    expect(hasNoUndefined(cp)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// person
// ---------------------------------------------------------------------------
describe("buildPerson / referencedPerson", () => {
  const member = {
    slug: "emma-carter",
    name: "Emma Carter",
    role: "Editorial Lead",
    expertise: ["UK tax"],
  };

  it("buildPerson emits Person with team URL", () => {
    const p = buildPerson(member, OPTS);
    expect(p["@type"]).toBe("Person");
    expect(p.url).toContain("/team/emma-carter");
    expect(hasNoUndefined(p)).toBe(true);
  });

  it("referencedPerson falls back to editorial team", () => {
    const ref = referencedPerson(null, {
      siteUrl: OPTS.siteUrl,
      siteName: OPTS.siteName,
    });
    expect((ref.name as string).includes("Editorial Team")).toBe(true);
  });

  it("referencedPerson resolves member URL when member provided", () => {
    const ref = referencedPerson(member, {
      siteUrl: OPTS.siteUrl,
      siteName: OPTS.siteName,
    });
    expect(ref.url).toContain("/team/emma-carter");
  });
});
