import os
import re

# Map old image names to new image names (in order of product appearance)
image_mapping = {
    "60f42a99dbe251973d9b9d19ced89c7_watermarked.png": "AEC-group-boppfilmsale-01.jpg",
    "da4d17c9c4889f6d54c1e84231b7478_watermarked.png": "AEC-group-boppfilmsale-02.jpg",
    "17c48216-2a39-48a8-897e-abf0618dc9aa_watermarked.png": "AEC-group-boppfilmsale-03.jpg",
    "1706783598805_watermarked.png": "AEC-group-boppfilmsale-04.jpg",
    "photo_2023-03-13_23-42-55_watermarked.png": "AEC-group-boppfilmsale-05.jpg",
    "photo_2023-03-13_23-43-19_watermarked.png": "AEC-group-boppfilmsale-06.jpg",
    "f04ae0f9edbd93e4162375442b5fa9c_watermarked.png": "AEC-group-boppfilmsale-07.jpg",
    "4610caf56e231e8314fa3228d13ed6b_watermarked.png": "AEC-group-boppfilmsale-08.jpg",
    "1fa7f7b2548c1b2d1224ceba4f9c5f7_watermarked.png": "AEC-group-boppfilmsale-09.jpg",
    "0caea078d05bc74ca1213b439ee9186_watermarked.png": "AEC-group-boppfilmsale-10.jpg",
    "b994ef5c55f3403af8fc8a907c10415_watermarked.png": "AEC-group-boppfilmsale-11.jpg"
}

# Update index.html
index_path = os.path.join(r"C:\Users\DELL\Desktop\files", "index.html")
with open(index_path, 'r', encoding='utf-8') as f:
    content = f.read()

for old_name, new_name in image_mapping.items():
    old_path = f"images/BOPET 4.5Mic TTR Thermal Transfer Film/{old_name}"
    new_path = f"images/BOPET 4.5Mic TTR Thermal Transfer Film/{new_name}"
    content = content.replace(old_path, new_path)

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated: index.html")

# Update product detail pages
product_pages = {
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

for filename, old_name in product_pages.items():
    filepath = os.path.join(r"C:\Users\DELL\Desktop\files", filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        old_path = f"images/BOPET 4.5Mic TTR Thermal Transfer Film/{old_name}"
        new_name = image_mapping.get(old_name, old_name)
        new_path = f"images/BOPET 4.5Mic TTR Thermal Transfer Film/{new_name}"
        content = content.replace(old_path, new_path)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {filename}")
    else:
        print(f"File not found: {filename}")
