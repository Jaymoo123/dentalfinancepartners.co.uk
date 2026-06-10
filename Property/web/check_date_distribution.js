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

const results = {
  earlyApril: { count: 0, broken: 0, files: [] },  // 2026-04-01 to 2026-04-15
  lateApril: { count: 0, broken: 0, files: [] },   // 2026-04-16 to 2026-05-19
  mayTrack2: { count: 0, broken: 0, files: [] },   // 2026-05-20+
};

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
  
  // Get creation date
  let date = '';
  try {
    const gitCmd = `git log --follow --format=%ai --diff-filter=A -- "content/blog/${file}" 2>/dev/null | head -1`;
    date = execSync(gitCmd, { encoding: 'utf-8', cwd: __dirname, stdio: ['pipe', 'pipe', 'ignore'] }).trim();
  } catch {
    continue;
  }
  
  let bucket = null;
  if (date.startsWith('2026-04') && date < '2026-04-16') {
    bucket = 'earlyApril';
  } else if (date.startsWith('2026-04') || (date.startsWith('2026-05') && date < '2026-05-20')) {
    bucket = 'lateApril';
  } else if (date >= '2026-05-20') {
    bucket = 'mayTrack2';
  }
  
  if (bucket) {
    results[bucket].count++;
    if (brokenCount > 0) {
      results[bucket].broken++;
      results[bucket].files.push({ file, date, brokenCount });
    }
  }
}

console.log(`=== BROKEN LINKS BY CREATION DATE ===\n`);

for (const [period, data] of Object.entries(results)) {
  const pct = data.count > 0 ? ((data.broken / data.count) * 100).toFixed(1) : '0.0';
  console.log(`${period}: ${data.broken}/${data.count} files with broken links (${pct}%)`);
  
  // Show examples
  if (data.files.length > 0) {
    for (const ex of data.files.slice(0, 3)) {
      console.log(`  ${ex.date} -- ${ex.file} (${ex.brokenCount} broken)`);
    }
    if (data.files.length > 3) {
      console.log(`  ... and ${data.files.length - 3} more`);
    }
  }
  console.log('');
}

const totalBroken = Object.values(results).reduce((sum, b) => sum + b.broken, 0);
const totalFiles = Object.values(results).reduce((sum, b) => sum + b.count, 0);
console.log(`TOTAL: ${totalBroken} files with broken links out of ${totalFiles} sampled`);

if (results.earlyApril.broken > 0) {
  console.log(`\nVERDICT: Broken links exist in EARLY (2026-04-10) files.`);
  console.log(`This is a LONG-STANDING PROBLEM, not a recent regression.`);
}
