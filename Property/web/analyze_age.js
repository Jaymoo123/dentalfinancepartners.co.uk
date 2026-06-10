const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { execSync } = require('child_process');

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

const broken = {};  // filename -> {createdDate, brokenCount}

for (const file of files) {
  const filePath = path.join(postsDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: body } = matter(content);
  
  // Find all /blog/cat/slug links
  const linkRegex = /\/blog\/([^\/]+)\/([^\s"')]+)/g;
  let match;
  let brokenCount = 0;
  
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
      }
    }
  }
  
  if (brokenCount > 0) {
    // Get creation date from git
    try {
      const gitCmd = `git log --follow --format=%ai --diff-filter=A -- "content/blog/${file}" 2>/dev/null | head -1`;
      const date = execSync(gitCmd, { encoding: 'utf-8', cwd: __dirname }).trim();
      broken[file] = { date: date || 'unknown', brokenCount };
    } catch {
      broken[file] = { date: 'error', brokenCount };
    }
  }
}

// Analyze by date
const beforeMay20 = {};
const afterMay20 = {};

for (const [file, info] of Object.entries(broken)) {
  const isAfterMay20 = info.date.startsWith('2026-05-2') || info.date > '2026-05-20';
  if (isAfterMay20) {
    afterMay20[file] = info;
  } else {
    beforeMay20[file] = info;
  }
}

console.log(`\n=== BROKEN LINKS: AGE ANALYSIS ===`);
console.log(`\nBEFORE 2026-05-20 (early/pre-Track-2): ${Object.keys(beforeMay20).length} files`);
let beforeCount = 0;
for (const [file, info] of Object.entries(beforeMay20).slice(0, 10)) {
  console.log(`  ${info.date} -- ${file} (${info.brokenCount} broken links)`);
  beforeCount += info.brokenCount;
}
console.log(`  ... (${Object.keys(beforeMay20).length - 10} more files)`);
console.log(`  SUBTOTAL: ${beforeCount} broken links in ${Object.keys(beforeMay20).length} files`);

console.log(`\nAFTER 2026-05-20 (Track-2/recent): ${Object.keys(afterMay20).length} files`);
let afterCount = 0;
for (const [file, info] of Object.entries(afterMay20).slice(0, 10)) {
  console.log(`  ${info.date} -- ${file} (${info.brokenCount} broken links)`);
  afterCount += info.brokenCount;
}
console.log(`  ... (${Object.keys(afterMay20).length - 10} more files)`);
console.log(`  SUBTOTAL: ${afterCount} broken links in ${Object.keys(afterMay20).length} files`);

console.log(`\n=== VERDICT ===`);
console.log(`Before May 20: ${beforeCount} broken links in ${Object.keys(beforeMay20).length} files`);
console.log(`After May 20:  ${afterCount} broken links in ${Object.keys(afterMay20).length} files`);

if (beforeCount > afterCount * 0.5) {
  console.log(`\nThis is a LONG-STANDING problem, not a recent regression.`);
  console.log(`Broken links appear in BOTH old and new files.`);
} else {
  console.log(`\nThis is a RECENT REGRESSION (Track-2 related).`);
  console.log(`Most broken links appear in files created after May 20.`);
}
