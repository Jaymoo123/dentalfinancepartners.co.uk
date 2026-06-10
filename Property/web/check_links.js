const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function slugifyCategory(category) {
  return category
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: body } = matter(content);
  
  const category = data.category || "General";
  const slug = data.slug;
  const file = path.basename(filePath);
  
  console.log(`\n=== ${file} ===`);
  console.log(`Category: "${category}" -> slug: "${slugifyCategory(category)}"`);
  
  // Find all /blog/cat/slug links
  const linkRegex = /\/blog\/([^\/]+)\/([^\s"')]+)/g;
  let match;
  const links = new Set();
  
  while ((match = linkRegex.exec(body)) !== null) {
    const linkCat = match[1];
    const linkSlug = match[2];
    links.add(`${linkCat}/${linkSlug}`);
  }
  
  let broken = 0;
  for (const link of links) {
    const [linkCat, linkSlug] = link.split('/');
    const targetPath = path.join(__dirname, 'content', 'blog', `${linkSlug}.md`);
    
    if (!fs.existsSync(targetPath)) {
      console.log(`  MISSING TARGET: /blog/${linkCat}/${linkSlug}`);
      broken++;
    } else {
      const targetContent = fs.readFileSync(targetPath, 'utf-8');
      const { data: targetData } = matter(targetContent);
      const targetCat = targetData.category || "General";
      const targetSlug = slugifyCategory(targetCat);
      
      if (linkCat !== targetSlug) {
        console.log(`  BROKEN LINK: /blog/${linkCat}/${linkSlug}`);
        console.log(`    -> Target file has category: "${targetCat}"`);
        broken++;
      }
    }
  }
  
  if (broken === 0 && links.size > 0) {
    console.log(`  ✓ All ${links.size} links OK`);
  } else if (links.size === 0) {
    console.log(`  (No internal /blog/ links)`);
  } else {
    console.log(`  ${broken} broken link(s) out of ${links.size}`);
  }
  
  return broken;
}

const files = [
  'content/blog/section-24-tax-credit-20-percent-basic-rate-relief.md',
  'content/blog/incorporation-case-study-5-property-portfolio-analysis.md',
  'content/blog/finance-costs-section-24-complete-guide.md',
  'content/blog/section-24-basic-rate-taxpayers.md',
  'content/blog/buy-to-let-limited-company-mortgage-options.md',
  'content/blog/landlord-tax-deductions-uk-2026-complete-list.md',
  'content/blog/mortgage-interest-deductible-landlords-uk-2026.md',
  'content/blog/sdlt-incorporation-stamp-duty-twice.md',
  'content/blog/automatic-exchange-of-information.md',
  'content/blog/ated-valuation-date.md',
  'content/blog/changes-nrl-companies.md',
  'content/blog/avoiding-common-mistakes-with-enveloped-dwelling-tax.md'
];

let totalBroken = 0;
for (const file of files) {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    totalBroken += checkFile(filePath);
  }
}

console.log(`\n\nTOTAL BROKEN LINKS IN 12-FILE SAMPLE: ${totalBroken}`);
