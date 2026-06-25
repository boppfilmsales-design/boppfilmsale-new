import os
import re
import glob

folder = r"C:\Users\DELL\Desktop\files"

# Get all BOPP product detail pages
bopp_pages = [f for f in os.listdir(folder) if f.endswith('.html') and f.startswith('bopp-')]

# Get all available images in BOPP folders
image_folders = [
    "images/BOPP Printing & Laminating Film",
    "images/BOPP Heat Sealable Film",
    "images/BOPP Flower Wrapping Film",
    "images/BOPP White Pearlized Film",
    "images/BOPP Cigarette Packs Wrapping",
    "images/BOPP Metallized Film",
    "images/BOPP Capacitor Film",
]

available_images = []
for img_folder in image_folders:
    folder_path = os.path.join(folder, img_folder)
    if os.path.exists(folder_path):
        for img_file in os.listdir(folder_path):
            if img_file.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.webp')):
                available_images.append(os.path.join(img_folder, img_file))

print(f"Found {len(available_images)} available images")
print(f"Found {len(bopp_pages)} BOPP product detail pages")

# For each page, add a full-width image
updated = 0
for page_name in bopp_pages:
    page_path = os.path.join(folder, page_name)
    with open(page_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if already has an image
    if '<img' in content:
        print(f"Skipped (already has image): {page_name}")
        continue

    # Find the product name from the page title
    title_match = re.search(r'<h1 class="sec-title">([^<]+)</h1>', content)
    if not title_match:
        print(f"Skipped (no title found): {page_name}")
        continue

    product_name = title_match.group(1).strip()

    # Find a matching image based on product name keywords
    matched_image = None
    for img_path in available_images:
        img_lower = img_path.lower()
        # Check if any keyword from product name matches image filename
        keywords = product_name.lower().split()
        for keyword in keywords:
            if keyword in img_lower and keyword not in ['film', 'bopp', 'the', 'a', 'an', 'for', 'and', '&', '·']:
                matched_image = img_path
                break
        if matched_image:
            break

    # If no match found, use the first available image as placeholder
    if not matched_image and available_images:
        matched_image = available_images[0]

    if matched_image:
        # Add full-width image after the title section
        img_html = f'<div style="width:100%;max-height:400px;overflow:hidden;margin-bottom:20px;border-radius:8px;"><img src="{matched_image}" alt="{product_name}" style="width:100%;height:100%;object-fit:cover;"/></div>'

        # Insert after the sec-zh div using string replace
        marker = '<div class="sec-zh">'
        if marker in content:
            pos = content.find(marker)
            if pos != -1:
                # Find the end of the div
                end_pos = content.find('</div>', pos)
                if end_pos != -1:
                    end_pos += 6  # Include '</div>'
                    content = content[:end_pos] + '\n' + img_html + content[end_pos:]
        else:
            # Insert after the h1 title
            marker2 = '<h1 class="sec-title">'
            if marker2 in content:
                pos = content.find(marker2)
                if pos != -1:
                    end_pos = content.find('</h1>', pos)
                    if end_pos != -1:
                        end_pos += 5  # Include '</h1>'
                        content = content[:end_pos] + '\n' + img_html + content[end_pos:]

        with open(page_path, 'w', encoding='utf-8') as f:
            f.write(content)
        updated += 1
        print(f"Updated: {page_name} -> {matched_image}")
    else:
        print(f"Skipped (no image): {page_name}")

print(f"\nTotal updated: {updated} files")
