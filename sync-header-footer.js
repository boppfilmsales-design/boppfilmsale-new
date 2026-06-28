const fs = require('fs');
const path = require('path');

// Read index.html to get the header and footer
const indexContent = fs.readFileSync('index.html', 'utf8');

// Extract header (from <!-- HEADER --> to </header>)
const headerStart = indexContent.indexOf('<!-- HEADER -->');
const headerEnd = indexContent.indexOf('</header>') + '</header>'.length;
const header = indexContent.substring(headerStart, headerEnd);

// Extract footer (from <!-- FOOTER --> to </footer>)
const footerStart = indexContent.indexOf('<!-- FOOTER -->');
const footerEnd = indexContent.indexOf('</footer>') + '</footer>'.length;
const footer = indexContent.substring(footerStart, footerEnd);

console.log('Header length:', header.length);
console.log('Footer length:', footer.length);

// Get all HTML files
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace header
  const oldHeaderStart = content.indexOf('<!-- HEADER -->');
  const oldHeaderEnd = content.indexOf('</header>') + '</header>'.length;

  if (oldHeaderStart !== -1 && oldHeaderEnd !== -1) {
    content = content.substring(0, oldHeaderStart) + header + content.substring(oldHeaderEnd);
  }

  // Replace footer
  const oldFooterStart = content.indexOf('<!-- FOOTER -->');
  const oldFooterEnd = content.indexOf('</footer>') + '</footer>'.length;

  if (oldFooterStart !== -1 && oldFooterEnd !== -1) {
    content = content.substring(0, oldFooterStart) + footer + content.substring(oldFooterEnd);
  }

  fs.writeFileSync(file, content);
  console.log('Updated:', file);
});

console.log('Synced header and footer to all pages');
