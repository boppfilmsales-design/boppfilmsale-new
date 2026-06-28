const fs = require('fs');
let content = fs.readFileSync('products.html', 'utf8');

// Add CSS for collapsible sections
const css = `
/* Collapsible product sections */
.pgrid-wrapper {
  position: relative;
  overflow: hidden;
  transition: max-height 0.4s ease;
}
.pgrid-wrapper.collapsed {
  max-height: 320px; /* Show approximately 2 rows of products */
}
.pgrid-wrapper.expanded {
  max-height: none;
}
.view-more-btn {
  display: block;
  width: 100%;
  padding: 12px 20px;
  margin-top: 16px;
  background: linear-gradient(135deg, rgba(40,240,100,0.1), rgba(40,240,100,0.05));
  border: 1px solid rgba(40,240,100,0.3);
  border-radius: 8px;
  color: #28F064;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;
}
.view-more-btn:hover {
  background: linear-gradient(135deg, rgba(40,240,100,0.2), rgba(40,240,100,0.1));
  border-color: #28F064;
}
.view-more-btn .arrow {
  display: inline-block;
  margin-left: 8px;
  transition: transform 0.3s;
}
.view-more-btn.expanded .arrow {
  transform: rotate(180deg);
}
.pfade-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(to bottom, transparent, #0A190F);
  pointer-events: none;
  transition: opacity 0.3s;
}
.pgrid-wrapper.expanded .pfade-overlay {
  opacity: 0;
}
`;

// Insert CSS before </style>
content = content.replace('</style>', css + '</style>');

// Add JavaScript before </script>
const javascript = `
// Collapse/Expand product sections
document.addEventListener('DOMContentLoaded', function() {
  var sections = document.querySelectorAll('.pgrid');
  sections.forEach(function(section) {
    if (!section.classList.contains('pgrid-wrapper')) {
      // Wrap the pgrid content
      var wrapper = document.createElement('div');
      wrapper.className = 'pgrid-wrapper collapsed';
      var fadeOverlay = document.createElement('div');
      fadeOverlay.className = 'pfade-overlay';

      // Move all children to wrapper
      while (section.firstChild) {
        wrapper.appendChild(section.firstChild);
      }

      // Add view more button
      var viewMoreBtn = document.createElement('button');
      viewMoreBtn.className = 'view-more-btn';
      viewMoreBtn.innerHTML = 'View All Products <span class="arrow">▼</span>';
      viewMoreBtn.onclick = function() {
        if (wrapper.classList.contains('collapsed')) {
          wrapper.classList.remove('collapsed');
          wrapper.classList.add('expanded');
          viewMoreBtn.classList.add('expanded');
          viewMoreBtn.innerHTML = 'Collapse <span class="arrow">▼</span>';
        } else {
          wrapper.classList.remove('expanded');
          wrapper.classList.add('collapsed');
          viewMoreBtn.classList.remove('expanded');
          viewMoreBtn.innerHTML = 'View All Products <span class="arrow">▼</span>';
          // Scroll to top of section
          section.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
      };

      wrapper.appendChild(fadeOverlay);
      section.appendChild(wrapper);
      section.appendChild(viewMoreBtn);
    }
  });
});
`;

content = content.replace('</script>', javascript + '</script>');

// Update pgrid class to include the wrapper class
content = content.replace(/<div class="pgrid" /g, '<div class="pgrid">');
content = content.replace(/<div class="pgrid">/g, '<div class="pgrid">');

fs.writeFileSync('products.html', content);
console.log('Added collapsible product sections');
