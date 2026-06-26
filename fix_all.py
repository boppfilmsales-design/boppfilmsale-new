#!/usr/bin/env python3
import re, os

# ========== 1. Fix products.html card click navigation ==========
print("=== Fixing products.html card navigation ===")

with open('products.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find each tech-card and add onclick based on its Details link
def add_card_onclick(match):
    card = match.group(0)
    # Find the Details link
    link_match = re.search(r'href="([^"]+\.html)"[^>]*>Details', card)
    if link_match:
        link = link_match.group(1)
        # Add onclick to card div
        card = card.replace(
            '<div class="tech-card" >',
            f'<div class="tech-card" onclick="window.location.href=\'{link}\'" style="cursor:pointer">'
        )
    return card

content = re.sub(
    r'<div class="tech-card" >.*?</div>\s*</div>',
    add_card_onclick,
    content,
    flags=re.DOTALL
)

onclick_count = content.count('onclick="window.location.href=')
print(f"Updated {onclick_count} product cards with click navigation")

with open('products.html', 'w', encoding='utf-8') as f:
    f.write(content)

# ========== 2. Add Related Products section to detail template ==========
print("\n=== Adding Related Products section ===")

with open('product-detail-template.html', 'r', encoding='utf-8') as f:
    template = f.read()

# Add Related Products section before the inquiry tab content
related_section = '''
<!-- Related Products -->
<div class="pd-tab-content" id="related">
<div class="pd-section">
  <h2 class="pd-section-title">Related Products</h2>
  <div class="pd-section-title-zh">相关产品推荐</div>
  <div class="pd-related-grid">
    <a href="#" class="pd-related-card">
      <div class="pd-related-img"><span class="pd-related-icon">🎞️</span></div>
      <div class="pd-related-name">BOPP Glossy Film</div>
      <div class="pd-related-name-zh">BOPP光亮薄膜</div>
      <div class="pd-related-price">From $1.0/m²</div>
    </a>
    <a href="#" class="pd-related-card">
      <div class="pd-related-img"><span class="pd-related-icon">🔥</span></div>
      <div class="pd-related-name">BOPP Heat Sealable</div>
      <div class="pd-related-name-zh">BOPP热封薄膜</div>
      <div class="pd-related-price">From $1.0/m²</div>
    </a>
    <a href="#" class="pd-related-card">
      <div class="pd-related-img"><span class="pd-related-icon">🌟</span></div>
      <div class="pd-related-name">BOPP Pearlized</div>
      <div class="pd-related-name-zh">BOPP珠光薄膜</div>
      <div class="pd-related-price">From $1.2/m²</div>
    </a>
    <a href="#" class="pd-related-card">
      <div class="pd-related-img"><span class="pd-related-icon">🪙</span></div>
      <div class="pd-related-name">BOPP Metallized</div>
      <div class="pd-related-name-zh">BOPP镀铝薄膜</div>
      <div class="pd-related-price">From $1.5/m²</div>
    </a>
    <a href="#" class="pd-related-card">
      <div class="pd-related-img"><span class="pd-related-icon">🧊</span></div>
      <div class="pd-related-name">BOPET Clear Film</div>
      <div class="pd-related-name-zh">BOPET透明薄膜</div>
      <div class="pd-related-price">From $1.3/m²</div>
    </a>
    <a href="#" class="pd-related-card">
      <div class="pd-related-img"><span class="pd-related-icon">📦</span></div>
      <div class="pd-related-name">BOPP Packing Tape</div>
      <div class="pd-related-name-zh">BOPP包装胶带</div>
      <div class="pd-related-price">From $0.3/m²</div>
    </a>
  </div>
</div>
</div>

'''

# Insert before inquiry tab content
template = template.replace(
    '<!-- Inquiry -->\n<div class="pd-tab-content" id="inquiry">',
    related_section + '<!-- Inquiry -->\n<div class="pd-tab-content" id="inquiry">'
)

# Add Related Products tab button
template = template.replace(
    '<button type="button" class="pd-tab" onclick="switchTab(this,\'inquiry\')">Inquiry</button>',
    '<button type="button" class="pd-tab" onclick="switchTab(this,\'related\')">Related</button>\n  <button type="button" class="pd-tab" onclick="switchTab(this,\'inquiry\')">Inquiry</button>'
)

# Add CSS for related products
related_css = '''
/* Related Products */
.pd-related-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:16px}
.pd-related-card{display:block;text-align:center;padding:16px 12px;background:rgba(255,255,255,.02);border:1px solid var(--tech-border);border-radius:12px;transition:all .2s;text-decoration:none}
.pd-related-card:hover{border-color:var(--neon-cyan);background:rgba(0,240,255,.04);transform:translateY(-2px)}
.pd-related-img{width:56px;height:56px;margin:0 auto 10px;display:flex;align-items:center;justify-content:center;background:rgba(0,240,255,.06);border-radius:12px}
.pd-related-icon{font-size:24px}
.pd-related-name{font-size:13px;font-weight:600;color:var(--text-primary);margin-bottom:2px}
.pd-related-name-zh{font-size:11px;color:var(--text-secondary);margin-bottom:6px}
.pd-related-price{font-size:12px;color:var(--neon-cyan);font-weight:500}

'''

template = template.replace('</style>', related_css + '</style>')

with open('product-detail-template.html', 'w', encoding='utf-8') as f:
    f.write(template)

print("Added Related Products section to template")

# ========== 3. Sync images between detail pages and listing ==========
print("\n=== Syncing images ===")

# Update detail pages to use correct image paths
detail_pages = ['bopp-plain.html', 'bopp-glossy.html', 'bopet-clear.html']
detail_images = {
    'bopp-plain.html': [
        'images/BOPP Printing & Laminating Film/AEC-group-boppfilmsale-33.jpg',
        'images/BOPP Printing & Laminating Film/AEC-group-boppfilmsale-34.jpg',
    ],
    'bopp-glossy.html': [
        'images/BOPP Printing & Laminating Film/AEC-group-boppfilmsale-37.jpg',
    ],
    'bopet-clear.html': [
        'images/Bopet Plain Film/AEC-group-boppfilmsale-001 (1).jpg',
    ],
}

for page, images in detail_images.items():
    if os.path.exists(page):
        with open(page, 'r', encoding='utf-8') as f:
            content = f.read()

        # Update main image
        if images:
            content = re.sub(
                r'<img src="[^"]*" alt="Product"',
                f'<img src="{images[0]}" alt="Product"',
                content
            )
            content = re.sub(
                r'<img src="[^"]*" alt="BOPP Plain Film"',
                f'<img src="{images[0]}" alt="BOPP Plain Film"',
                content
            )

        with open(page, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated images in {page}")

print("\nDone!")
