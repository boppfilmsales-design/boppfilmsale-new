import os
import re

files = [
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

        # Replace double <br/> with single <br/>
        content = content.replace('<br/><br/>', '<br/>')

        # Also handle <br /><br /> with space
        content = content.replace('<br /><br />', '<br/>')

        # Replace <br/> at end of paragraphs with proper spacing
        # Add margin-bottom to desc-en and desc-zh if not present
        if 'desc-en{' in content and 'margin-bottom' not in content.split('desc-en{')[1].split('}')[0]:
            content = content.replace(
                '.desc-en{color:var(--ice);line-height:1.8;margin-bottom:14px;}',
                '.desc-en{color:var(--ice);line-height:1.8;margin-bottom:10px;}'
            )

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Cleaned: {filename}")
    else:
        print(f"File not found: {filename}")
