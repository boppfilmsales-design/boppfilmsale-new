import os
import re

files = [
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

        # Find the floating image div and update to square
        pattern = r'<div style="float:right;width:420px;[^"]*">'
        replacement = '<div style="float:right;width:360px;height:360px;margin:0 0 16px 20px;background:var(--bg-mid);border:1px solid rgba(232,196,106,0.3);border-radius:8px;padding:12px;text-align:center;box-shadow:0 2px 12px rgba(0,0,0,0.3);transition:all .3s ease;overflow:hidden;">'
        content = re.sub(pattern, replacement, content)

        # Update image style
        content = content.replace('max-width:100%;max-height:320px;object-fit:contain;border-radius:4px;', 'width:100%;height:100%;object-fit:cover;border-radius:4px;')

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {filename}")
    else:
        print(f"File not found: {filename}")
