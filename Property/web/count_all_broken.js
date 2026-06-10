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

const postsDir = path.join(__dirname, 'content', 'blog');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

let totalFiles = 0;
let filesWithBrokenLinks = 0;
let totalBrokenLinks = 0;
const brokenLinkExamples = [];

for (const file of files) {
  const filePath = path.join(postsDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: body } = matter(content);
  
  // Find all /blog/cat/slug links
  const linkRegex = /\/blog\/([^\/]+)\/([^\s"')]+)/g;
  let match;
  let hasBroken = false;
  
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
        hasBroken = true;
        totalBrokenLinks++;
        
        if (brokenLinkExamples.length < 20) {
          brokenLinkExamples.push({
            file: file,
            link: `/blog/${linkCat}/${linkSlug}`,
            targetCat: targetCat,
            correctSlug: targetSlug
          });
        }
      }
    }
  }
  
  if (hasBroken) {
    filesWithBrokenLinks++;
  }
  totalFiles++;
}

console.log(`Total blog files: ${totalFiles}`);
console.log(`Files with broken links: ${filesWithBrokenLinks}`);
console.log(`Total broken links: ${totalBrokenLinks}`);
console.log(`\nFirst 20 examples:`);
for (const ex of brokenLinkExamples) {
  console.log(`  ${ex.file}`);
  console.log(`    Link: ${ex.link}`);
  console.log(`    Target category: "${ex.targetCat}" (slug: "${ex.correctSlug}")`);
}
