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

function checkBrokenLinks(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: body } = matter(content);
  
  const linkRegex = /\/blog\/([^\/]+)\/([^\s"')]+)/g;
  let match;
  const broken = [];
  
  while ((match = linkRegex.exec(body)) !== null) {
    const linkCat = match[1];
    const linkSlug = match[2];
    const targetPath = path.join(__dirname, 'content', 'blog', `${linkSlug}.md`);
    
    if (fs.existsSync(targetPath)) {
      const targetContent = fs.readFileSync(targetPath, 'utf-8');
      const { data: targetData } = matter(targetContent);
      const targetCat = targetData.category || "General";
      const targetSlug = slugifyCategory(targetCat);
      
      if (linkCat !== targetSlug) {
        broken.push(linkCat + '/' + linkSlug + ' -> ' + targetSlug);
      }
    }
  }
  
  return broken;
}

// Test files created in early April 2026 (2026-04-10)
const earlyApril = [
  'content/blog/2027-property-tax-rates-section-24-relief-uk-landlords.md',
  'content/blog/accountant-corporation-tax-property-companies.md',
  'content/blog/airbnb-tax-uk-short-term-rental-income-taxed.md',
];

// Test files from May 22+ (Track-2)
const mayTrack2 = [
  'content/blog/automatic-exchange-of-information.md',
  'content/blog/ated-valuation-date.md',
  'content/blog/changes-nrl-companies.md',
];

console.log('=== EARLY APRIL 2026 FILES (2026-04-10) ===\n');
let earlyBroken = 0;
for (const file of earlyApril) {
  const fp = path.join(__dirname, file);
  if (fs.existsSync(fp)) {
    const { data } = matter(fs.readFileSync(fp, 'utf-8'));
    const broken = checkBrokenLinks(fp);
    console.log(`${path.basename(file)}`);
    console.log(`  Category: "${data.category}"`);
    if (broken.length > 0) {
      console.log(`  Broken links: ${broken.length}`);
      earlyBroken++;
      for (const b of broken.slice(0, 3)) {
        console.log(`    - ${b}`);
      }
    } else {
      console.log(`  No broken links`);
    }
  }
}

console.log('\n=== MAY 22+ 2026 FILES (Track-2) ===\n');
let mayBroken = 0;
for (const file of mayTrack2) {
  const fp = path.join(__dirname, file);
  if (fs.existsSync(fp)) {
    const { data } = matter(fs.readFileSync(fp, 'utf-8'));
    const broken = checkBrokenLinks(fp);
    console.log(`${path.basename(file)}`);
    console.log(`  Category: "${data.category}"`);
    if (broken.length > 0) {
      console.log(`  Broken links: ${broken.length}`);
      mayBroken++;
      for (const b of broken.slice(0, 3)) {
        console.log(`    - ${b}`);
      }
    } else {
      console.log(`  No broken links`);
    }
  }
}

console.log(`\n=== SUMMARY ===`);
console.log(`Early April: ${earlyBroken}/${earlyApril.length} files have broken links`);
console.log(`May Track-2: ${mayBroken}/${mayTrack2.length} files have broken links`);

if (earlyBroken > 0) {
  console.log(`\nConclusion: Broken links are PRESENT IN EARLY (2026-04-10) FILES.`);
  console.log(`This is a LONG-STANDING problem, not a recent regression.`);
} else {
  console.log(`\nConclusion: Broken links appear primarily in recent Track-2 files.`);
}
