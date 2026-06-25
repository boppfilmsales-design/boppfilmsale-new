import os
import re

folder = r"C:\Users\DELL\Desktop\files"

# Read index.html to get product-to-image mapping
index_path = os.path.join(folder, "index.html")
with open(index_path, 'r', encoding='utf-8') as f:
    index_content = f.read()

# Extract product images from index.html
# Pattern: data-pid="xxx" ... <img src="images/..." ...>
product_images = {}
# Use a more flexible pattern that matches data-pid followed by img src anywhere in the same line
pattern = r'data-pid="(bopp-[a-z0-9-]+)".*?<img[^>]*src="([^"]+)"'
for match in re.finditer(pattern, index_content, re.DOTALL):
    pid = match.group(1)
    img_src = match.group(2)
    product_images[pid] = img_src

print(f"Found {len(product_images)} product images in index.html")

# Map product IDs to detail page filenames
pid_to_page = {
    "bopp-plain-new": "bopp-plain.html",
    "bopp-bag-grade": "bopp-bag-grade.html",
    "bopp-tape-grade": "bopp-tape-grade.html",
    "bopp-glossy-new": "bopp-glossy.html",
    "bopp-matte-new": "bopp-matte.html",
    "bopp-antifog": "bopp-antifog.html",
    "bopp-perforated": "bopp-perforated.html",
    "bopp-antistatic": "bopp-antistatic.html",
    "bopp-heatseal-2side": "bopp-heatseal.html",
    "bopp-heatseal-1side": "bopp-heatseal-1side.html",
    "bopp-heatseal-one": "bopp-heatseal-one.html",
    "bopp-heatseal-small": "bopp-heatseal-small.html",
    "bopp-flower-color-printed": "bopp-flower-color-printed.html",
    "bopp-flower-sleeve": "bopp-flower-sleeve.html",
    "bopp-flower-wrapping": "bopp-flower-wrapping.html",
    "bopp-flower-roll-sheet": "bopp-flower-roll.html",
    "bopp-paper-cellophane": "bopp-paper-cellophane.html",
    "bopp-flower-roll-sheets": "bopp-flower-roll-sheets.html",
    "bopp-foil-superclear": "bopp-foil-superclear.html",
    "bopp-paper-superclear": "bopp-paper-superclear.html",
    "bopp-flower-mini-printed": "bopp-flower-mini-printed.html",
    "bopp-flower-mini-roll": "bopp-flower-mini-roll.html",
    "bopp-flower-mini": "bopp-flower-mini.html",
    "bopp-sheets-wrapper": "bopp-sheets-wrapper.html",
    "bopp-sheets-clear-color": "bopp-sheets-clear-color.html",
    "bopp-bags": "bopp-bags.html",
    "bopp-pearlized-new": "bopp-pearlized.html",
    "bopp-white-opaque": "bopp-white-opaque.html",
    "bopp-pp-white-opaque": "bopp-pp-white-opaque.html",
    "bopp-pearlized-30mic": "bopp-pearlized-30.html",
    "bopp-pearlized-40mic": "bopp-pearlized-40mic.html",
    "bopp-pp-pearlized": "bopp-pp-pearlized.html",
    "bopp-pp-opaque-pearlized": "bopp-pp-opaque-pearlized.html",
    "bopp-white-25mic": "bopp-white-25mic.html",
    "bopp-pp-white-opaque": "bopp-pp-white-opaque.html",
    "bopp-cigarette-shrink-hard": "bopp-cigarette-shrink-hard.html",
    "bopp-cigarette-shrink-tape": "bopp-cigarette-tear.html",
    "bopp-cigarette-new": "bopp-cigarette.html",
    "bopp-cigarette-plain": "bopp-cigarette-plain.html",
    "bopp-cigarette-pp-shrink": "bopp-cigarette-pp-shrink.html",
    "bopp-cigarette-shrink-packets": "bopp-cigarette-shrinkage.html",
    "bopp-cigarette-box": "bopp-cigarette-box.html",
    "bopp-tobacco-transparent": "bopp-tobacco-transparent.html",
    "bopp-tobacco-shrink-box": "bopp-tobacco-shrink-box.html",
    "bopp-tobacco-matte": "bopp-tobacco-matte.html",
    "bopp-tobacco-pp-shrink": "bopp-tobacco-pp-shrink.html",
    "bopp-capacitor-metallized": "bopp-capacitor.html",
    "bopp-capacitor-safety": "bopp-capacitor-safety.html",
    "bopp-capacitor-znal": "bopp-capacitor-znal.html",
    "bopp-capacitor-rough": "bopp-capacitor-rough.html",
    "bopp-capacitor-clear": "bopp-capacitor-clear.html",
    "bopp-capacitor-silver": "bopp-capacitor-silver.html",
    "bopp-capacitor-silver-met": "bopp-capacitor-silver-met.html",
    "bopp-capacitor-safety-anti": "bopp-capacitor-safety-anti.html",
    "bopp-capacitor-metal-film": "bopp-capacitor-metal-thick.html",
    "bopp-metallized-silver": "bopp-metallized-silver.html",
    "bopp-metallized-golden": "bopp-metallized-gold.html",
    "bopp-metallized-laser": "bopp-metallized-laser.html",
}

# Update each detail page to use the same image as the cover
updated = 0
for pid, page_name in pid_to_page.items():
    if pid not in product_images:
        continue

    cover_image = product_images[pid]
    page_path = os.path.join(folder, page_name)

    if not os.path.exists(page_path):
        continue

    with open(page_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if page already has the correct image
    if cover_image in content:
        print(f"Already correct: {page_name}")
        continue

    # Find the first image in the detail page and replace it
    # Look for the main product image (usually in desc-block or img-zoom)
    img_match = re.search(r'<img[^>]*src="[^"]*"[^>]*>', content)
    if img_match:
        old_img = img_match.group(0)
        # Replace with cover image
        new_img = f'<div style="width:100%;aspect-ratio:1;overflow:hidden;margin-bottom:20px;border-radius:8px;"><img src="{cover_image}" alt="" style="width:100%;height:100%;object-fit:cover;"/></div>'
        content = content.replace(old_img, new_img, 1)

        with open(page_path, 'w', encoding='utf-8') as f:
            f.write(content)
        updated += 1
        print(f"Updated: {page_name} -> {cover_image}")

print(f"\nTotal updated: {updated} files")
