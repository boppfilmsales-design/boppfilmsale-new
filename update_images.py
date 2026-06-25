import os
import re

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
    "bopet-transfer-printing.html": "0caea078d05bc74ca1213b439ee9186_watermarked.png",
    "bopet-transfer-4.4mic.html": "b994ef5c55f3403af8fc8a907c10415_watermarked.png"
}

for filename, image in products.items():
    filepath = os.path.join(r"C:\Users\DELL\Desktop\files", filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Remove the standalone product-image div
        pattern = r'<div class="product-image"[^>]*>.*?</div>'
        content = re.sub(pattern, '', content, flags=re.DOTALL)

        # Add image to the beginning of the first desc-block (top right)
        img_html = f'''<div style="float:right;width:200px;margin:0 0 12px 16px;background:var(--bg-mid);border:1px solid var(--border);border-radius:6px;padding:8px;text-align:center;">
<img src="images/BOPET 4.5Mic TTR Thermal Transfer Film/{image}" alt="" style="max-width:100%;max-height:160px;object-fit:contain;"/>
</div>'''

        # Find the first desc-block and insert the image at the beginning
        if 'desc-block' in content:
            pos = content.find('<div class="desc-block">')
            if pos != -1:
                insert_pos = pos + len('<div class="desc-block">')
                content = content[:insert_pos] + '\n' + img_html + content[insert_pos:]

                # Add clearfix after the desc-block content
                # Find the closing </div> of the first desc-block
                close_pos = content.find('</div>', insert_pos)
                if close_pos != -1:
                    # Check if there's already a clearfix
                    if 'clearfix' not in content[insert_pos:close_pos]:
                        # Insert clearfix before the closing div
                        content = content[:close_pos] + '\n<div style="clear:both"></div>' + content[close_pos:]

                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated: {filename}")
            else:
                print(f"No desc-block found: {filename}")
        else:
            print(f"No desc-block found: {filename}")
    else:
        print(f"File not found: {filename}")
