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

        # Add CSS class if not present
        if 'img-zoom' not in content and '.img-zoom' not in content:
            content = content.replace(
                '.back-btn:hover{color:var(--gold-light)}',
                '.back-btn:hover{color:var(--gold-light)}\n.img-zoom{border:1px solid rgba(232,196,106,0.3);border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.3);transition:all .3s ease}\n.img-zoom:hover{border-color:var(--gold);box-shadow:0 4px 24px rgba(232,196,106,0.3),0 0 40px rgba(232,196,106,0.1)}\n.img-zoom img{transition:transform .4s ease}\n.img-zoom:hover img{transform:scale(1.08)}'
            )

        # Replace inline styles with CSS class
        content = content.replace(
            'float:right;width:360px;height:360px;margin:0 0 16px 20px;background:var(--bg-mid);border:1px solid rgba(232,196,106,0.3);border-radius:8px;padding:12px;text-align:center;box-shadow:0 2px 12px rgba(0,0,0,0.3);transition:all .3s ease;overflow:hidden;">',
            'class="img-zoom" style="float:right;width:360px;height:360px;margin:0 0 16px 20px;padding:12px;text-align:center;">'
        )

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {filename}")
    else:
        print(f"File not found: {filename}")
