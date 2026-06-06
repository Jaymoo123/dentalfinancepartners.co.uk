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

// Files from 2026-04-10 and other early dates
const oldFiles = [
  'content/blog/2027-property-tax-rates-section-24-relief-uk-landlords.md',
  'content/blog/airbnb-tax-uk-short-term-rental-income-taxed.md',
  'content/blog/accountant-corporation-tax-property-companies.md'
];

const postsDir = path.join(__dirname, 'content', 'blog');

for (const file of oldFiles) {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) continue;
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: body } = matter(content);
  
  console.log(`\n=== ${path.basename(file)} ===`);
  console.log(`Category: "${data.category}"`);
  
  const linkRegex = /\/blog\/([^\/]+)\/([^\s"')]+)/g;
  let match;
  let brokenCount = 0;
  const broken = [];
  
  while ((match = linkRegex.exec(body)) !== null) {
    const linkCat = match[1];
    const linkSlug = match[2];
    const targetPath = path.join(postsDir, `${linkSlug}.md`);
    
    if (fs.existsSync(targetPath)) {
      const targetContent = fs.readFileSync(targetPath, 'utf-8');
      const { data: targetData } = matter(targetContent);
      const targetCat = targetData.category || "General";
      const targetSlug = slugifyCategory(targetCat);
      
      if (linkCat !== targetSlug) {
        brokenCount++;
        broken.push(`/blog/${linkCat}/${linkSlug} -> should be /blog/${targetSlug}/${linkSlug}`);
      }
    }
  }
  
  if (brokenCount === 0) {
    console.log(`  No broken links found`);
  } else {
    console.log(`  ${brokenCount} broken links:`);
    for (const b of broken) {
      console.log(`    ${b}`);
    }
  }
}
