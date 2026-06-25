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
pattern = r'data-pid="(bopp-[a-z0-9-]+)"[^>]*<img[^>]*src="([^"]+)"'
for match in re.finditer(pattern, index_content):
    pid = match.group(1)
    img_src = match.group(2)
    product_images[pid] = img_src

print(f"Found {len(product_images)} product images in index.html")

# Get all BOPP product detail pages
bopp_pages = []
for f in os.listdir(folder):
    if f.endswith('.html') and f.startswith('bopp-'):
        bopp_pages.append(f)

print(f"Found {len(bopp_pages)} BOPP product detail pages")

# For each page, find the product ID and add/update the image
updated = 0
for page_name in bopp_pages:
    page_path = os.path.join(folder, page_name)
    with open(page_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the product ID from the page
    pid_match = re.search(r'data-pid="(bopp-[a-z0-9-]+)"', content)
    if not pid_match:
        # Try to find from the HTML structure
        pid_match = re.search(r'<h1[^>]*>([^<]+)</h1>', content)

    # Find the corresponding product ID
    pid = None
    if pid_match:
        pid = pid_match.group(1)

    # Check if we have an image for this product
    if pid and pid in product_images:
        img_src = product_images[pid]

        # Check if page already has an img tag
        if '<img' in content:
            # Replace existing image
            content = re.sub(
                r'<img[^>]*src="[^"]*"[^>]*>',
                f'<div style="width:100%;max-height:400px;overflow:hidden;margin-bottom:20px;border-radius:8px;"><img src="{img_src}" alt="" style="width:100%;height:100%;object-fit:cover;"/></div>',
                content,
                count=1
            )
        else:
            # Add image after the title
            content = re.sub(
                r'(<div class="sec-zh">[^<]*</div>)',
                rf'\1<div style="width:100%;max-height:400px;overflow:hidden;margin-bottom:20px;border-radius:8px;"><img src="{img_src}" alt="" style="width:100%;height:100%;object-fit:cover;"/></div>',
                content
            )

        with open(page_path, 'w', encoding='utf-8') as f:
            f.write(content)
        updated += 1
        print(f"Updated: {page_name} -> {pid}")
    else:
        print(f"Skipped: {page_name} (no image found for {pid})")

print(f"\nTotal updated: {updated} files")
