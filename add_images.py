import os

# Map of product pages to their images
products = {
    "bopet-super-thinner.html": "60f42a99dbe251973d9b9d19ced89c7_watermarked.png",
    "bopet-4.5mic-clear.html": "da4d17c9c4889f6d54c1e84231b7478_watermarked.png",
    "bopet-ttr-film.html": "17c48216-2a39-48a8-897e-abf0618dc9aa_watermarked.png",
    "bopet-4.2mic.html": "1706783598805_watermarked.png",
    "bopet-3.8mic.html": "photo_2023-03-13_23-42-55_watermarked.png",
    "bopet-4.5mic-stock.html": "photo_2023-03-13_23-43-19_watermarked.png",
    "bopet-ttr-basic.html": "f04ae0f9edbd93e4162375442b5fa9c_watermarked.png",
    "bopet-4.0mic.html": "4610caf56e231e8314fa3228d13ed6b_watermarked.png",
    "bopet-ttr-basic-2.html": "1fa7f7b2548c1b2d1224ceba4f9c5f7_watermarked.png",
    "bopet-transfer-printing.html": "0caea078d05bc74ca1213b439ee9186_watermarked.png",
    "bopet-transfer-4.4mic.html": "b994ef5c55f3403af8fc8a907c10415_watermarked.png"
}

image_html = '''<div class="product-image" style="margin:20px 0;text-align:center;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:16px;">
<img src="images/BOPET 4.5Mic TTR Thermal Transfer Film/{image}" alt="" style="max-width:100%;max-height:280px;object-fit:contain;"/>
</div>'''

for filename, image in products.items():
    filepath = os.path.join(r"C:\Users\DELL\Desktop\files", filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Find the position after sec-zh and before desc-block
        img_div = image_html.format(image=image)

        # Insert after the sec-zh div
        if '<div class="sec-zh">' in content and 'product-image' not in content:
            pos = content.find('<div class="sec-zh">')
            end_pos = content.find('</div>', pos) + 6
            content = content[:end_pos] + '\n' + img_div + content[end_pos:]

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated: {filename}")
        else:
            print(f"Skipped (already updated or no sec-zh): {filename}")
    else:
        print(f"File not found: {filename}")
