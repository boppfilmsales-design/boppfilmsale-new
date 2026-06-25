import os
import re

folder = r"C:\Users\DELL\Desktop\files"
files = [f for f in os.listdir(folder) if f.endswith('.html')]

# Files to remove chatbot from (product detail pages)
product_files = [f for f in files if f not in ['index.html', 'about.html', 'contact.html', 'why-us.html', 'specs.html', 'applications.html', 'chatbot.html']]

# Step 1: Remove chatbot widget from product detail pages
chatbot_css_pattern = r'<style>\s*#chatbot-widget\{[^}]*\}\s*</style>'
chatbot_html_pattern = r'<div id="chatbot-widget">.*?</div>'
chatbot_full_pattern = r'<!-- Floating Chatbot Widget -->.*?</script>'

for filename in product_files:
    filepath = os.path.join(folder, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    # Remove chatbot CSS
    content = re.sub(chatbot_css_pattern, '', content, flags=re.DOTALL)
    # Remove chatbot HTML
    content = re.sub(chatbot_full_pattern, '', content, flags=re.DOTALL)
    # Remove any remaining chatbot HTML
    content = re.sub(r'<div id="chatbot-widget">.*?</div>', '', content, flags=re.DOTALL)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Removed chatbot from: {filename}")

# Step 2: Make chatbot and contact sidebar transparent in index.html
index_path = os.path.join(folder, 'index.html')
with open(index_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make contact sidebar transparent
content = content.replace(
    '.contact-sidebar{position:fixed;right:0;top:50%;transform:translateY(-50%);z-index:999;display:flex;flex-direction:column;gap:1px;box-shadow:-2px 0 10px rgba(0,0,0,0.15);background:#ffffff;border:1px solid rgba(0,0,0,0.08);border-radius:8px 0 0 8px}.contact-item{display:flex;align-items:center;justify-content:center;width:48px;height:48px;background:#ffffff;border:none;border-bottom:1px solid rgba(0,0,0,0.06);transition:all .2s;text-decoration:none;position:relative}.contact-item:last-child{border-bottom:none}.contact-item:hover{width:120px;border-color:rgba(0,0,0,0.1);background:#f5f5f5}',
    '.contact-sidebar{position:fixed;right:0;top:50%;transform:translateY(-50%);z-index:999;display:flex;flex-direction:column;gap:1px;box-shadow:-2px 0 10px rgba(0,0,0,0.1);background:transparent;border:none;border-radius:8px 0 0 8px}.contact-item{display:flex;align-items:center;justify-content:center;width:48px;height:48px;background:rgba(255,255,255,0.95);border:none;border-bottom:1px solid rgba(0,0,0,0.06);transition:all .2s;text-decoration:none;position:relative;backdrop-filter:blur(10px)}.contact-item:last-child{border-bottom:none}.contact-item:hover{width:120px;border-color:rgba(0,0,0,0.1);background:#ffffff}'
)

# Make chatbot transparent
content = content.replace(
    '#chatbot-toggle{display:flex;align-items:center;gap:8px;padding:12px 20px;background:#ffffff;border:1px solid rgba(0,0,0,0.1);border-radius:30px;color:#333;font-size:14px;font-weight:600;cursor:pointer;box-shadow:0 4px 15px rgba(0,0,0,0.1);transition:all .3s}',
    '#chatbot-toggle{display:flex;align-items:center;gap:8px;padding:12px 20px;background:rgba(255,255,255,0.95);border:1px solid rgba(0,0,0,0.1);border-radius:30px;color:#333;font-size:14px;font-weight:600;cursor:pointer;box-shadow:0 4px 15px rgba(0,0,0,0.1);transition:all .3s;backdrop-filter:blur(10px)}'
)

content = content.replace(
    '#chatbot-panel{position:absolute;bottom:70px;right:0;width:360px;max-height:500px;background:#ffffff;border:1px solid rgba(0,0,0,0.1);border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,0.15);display:flex;flex-direction:column;overflow:hidden}',
    '#chatbot-panel{position:absolute;bottom:70px;right:0;width:360px;max-height:500px;background:rgba(255,255,255,0.98);border:1px solid rgba(0,0,0,0.1);border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,0.2);display:flex;flex-direction:column;overflow:hidden;backdrop-filter:blur(10px)}'
)

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated index.html chatbot/sidebar transparency")

# Step 3: Increase font sizes across all files
font_increases = {
    'font-size:15px': 'font-size:16px',
    'font-size:14px': 'font-size:15px',
    'font-size:13px': 'font-size:14px',
    'font-size:12px': 'font-size:13px',
    'font-size:11px': 'font-size:12px',
    'font-size:10px': 'font-size:11px',
    'font-size:9px': 'font-size:10px',
    'font-size:8px': 'font-size:9px',
    'font-size:12.5px': 'font-size:13.5px',
    'font-size:13.5px': 'font-size:14.5px',
    'font-size:9.5px': 'font-size:10.5px',
}

count = 0
for filename in files:
    filepath = os.path.join(folder, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    for old_size, new_size in font_increases.items():
        content = content.replace(old_size, new_size)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

print(f"Updated font sizes in {count} files")
