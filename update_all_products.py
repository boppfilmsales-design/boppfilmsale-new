#!/usr/bin/env python3
"""
Script to update all product detail pages to add contact icons
"""

import os
import re

# The contact icons HTML to add
CONTACT_ICONS = '''<div style="display:flex;gap:8px">
<a href="https://wa.me/8618919659471" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;background:#25D366;border-radius:50%;color:#fff;font-size:18px;text-decoration:none" title="WhatsApp: 86-18919659471">💬</a>
<a href="weixin://chat?18919659471" style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;background:#07C160;border-radius:50%;color:#fff;font-size:18px;text-decoration:none" title="WeChat: 86-18919659471">💚</a>
<a href="mailto:SALE@boppfilmsale.com" style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;background:#E74C3C;border-radius:50%;color:#fff;font-size:18px;text-decoration:none" title="Email: SALE@boppfilmsale.com">📧</a>
<a href="mqq://im/chat?chat_type=wpa&uin=2538474128" style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;background:#12B7F5;border-radius:50%;color:#fff;font-size:18px;text-decoration:none" title="QQ: 2538474128">🐧</a>
<a href="https://teams.microsoft.com/l/chat/0/0?users=SALE@boppfilmsale.com" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;background:#6264A7;border-radius:50%;color:#fff;font-size:18px;text-decoration:none" title="Teams: SUNNY JIANG">👥</a>
</div>'''

# Find all product HTML files
output_dir = r"C:\Users\DELL\Desktop\files"
product_files = []

for filename in os.listdir(output_dir):
    if filename.endswith('.html') and any(filename.startswith(prefix) for prefix in ['bopp-', 'bopet-', 'tape-', 'pvdc-', 'acrylic-', 'pe-coat-', 'adhesive-', 'cpp-', 'bops-', 'bopa-', 'pof-']):
        product_files.append(filename)

print(f"Found {len(product_files)} product files to update")

for filename in product_files:
    filepath = os.path.join(output_dir, filename)

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if already has contact icons
    if 'wa.me/8618919659471' in content:
        print(f"Skipping {filename} - already has contact icons")
        continue

    # Find the "Interested in this product" section and add contact icons
    pattern = r'(<div style="margin-top:30px;padding-top:20px;border-top:1px solid var--border\)">.*?Request Quote.*?</a>\s*</div>)'

    match = re.search(pattern, content, re.DOTALL)
    if match:
        old_section = match.group(1)
        new_section = old_section.replace(
            '<a href="index.html#contact" class="btn-gold">Request Quote · 询价</a>\n</div>',
            f'''<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
<a href="index.html#contact" class="btn-gold">Request Quote · 询价</a>
{CONTACT_ICONS}
</div>
</div>'''
        )
        content = content.replace(old_section, new_section)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {filename}")
    else:
        print(f"Pattern not found in {filename}")

print("Done!")
