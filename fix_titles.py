import os
import re

# Map of old titles to new title case versions
title_mapping = {
    # index.html product cards
    "BOPET Super Thinner Film": "Bopet Super Thinner Film",
    "4.5MIC BOPET Clear Fiim Stock": "4.5mic Bopet Clear Fiim Stock",
    "3.8-4.5MIC BOPET TTR Film": "3.8-4.5mic Bopet Ttr Film",
    "BOPET polyester film 4.2microns": "Bopet Polyester Film 4.2microns",
    "BOPET polyester film 3.8microns": "Bopet Polyester Film 3.8microns",
    "4.5 Microns BOPET Film (polyesterfilm) In Stock": "4.5 Microns Bopet Film (polyesterfilm) In Stock",
    "BOPET TTR (Thermal TransferRibbons) basic film": "Bopet Ttr (thermal Transfer Ribbons) Basic Film",
    "BOPET film 4.0MIC": "Bopet Film 4.0mic",
    # Also fix the Chinese name
    "安徽东渐进出口有限公司": "安徽东渐进出口有限公司",
}

# Files to update
files = [
    "index.html",
    "bopet-super-thinner.html",
    "bopet-4.5mic-clear.html",
    "bopet-ttr-film.html",
    "bopet-4.2mic.html",
    "bopet-3.8mic.html",
    "bopet-4.5mic-stock.html",
    "bopet-ttr-basic.html",
    "bopet-4.0mic.html",
    "bopet-transfer-printing.html",
    "bopet-transfer-4.4mic.html"
]

for filename in files:
    filepath = os.path.join(r"C:\Users\DELL\Desktop\files", filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        for old_title, new_title in title_mapping.items():
            content = content.replace(old_title, new_title)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {filename}")
    else:
        print(f"File not found: {filename}")
