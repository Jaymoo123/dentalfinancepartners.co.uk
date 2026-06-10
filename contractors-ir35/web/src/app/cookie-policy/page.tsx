import type { Metadata } from "next";
import { contentNarrow, sectionYLoose } from "@/components/ui/layout-utils";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiePolicyPage() {
  return (
    <section className="bg-white">
      <div className={`${contentNarrow} ${sectionYLoose}`}>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Cookie policy</h1>
        <div className="prose-blog mt-10">
          <p>This site uses a small number of cookies. This policy explains what they are and how to control them.</p>
          <h2>Essential cookies</h2>
          <p>These cookies are necessary for the site to function. They do not store any personally identifiable information and cannot be disabled.</p>
          <h2>Analytics cookies</h2>
          <p>We use Google Analytics to understand how visitors use this site. These cookies collect anonymised information such as the number of visitors, the pages they visit, and the device they use. No personally identifiable information is collected.</p>
          <p>Google Analytics cookies include <code>_ga</code>, <code>_gid</code> and <code>_gat</code>. These expire after between 24 hours and two years.</p>
          <h2>How to control cookies</h2>
          <p>You can control and delete cookies through your browser settings. Deleting analytics cookies will not affect your ability to use this site. For more information, visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">allaboutcookies.org</a>.</p>
          <p>You can also opt out of Google Analytics across all websites by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics opt-out browser add-on</a>.</p>
        </div>
      </div>
    </section>
  );
}
