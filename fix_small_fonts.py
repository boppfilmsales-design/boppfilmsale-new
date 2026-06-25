import os

folder = r"C:\Users\DELL\Desktop\files"
files = [f for f in os.listdir(folder) if f.endswith('.html')]

# Increase small font sizes
font_map = {
    'font-size:10px': 'font-size:12px',
    'font-size:11px': 'font-size:13px',
    'font-size:12px': 'font-size:14px',
    'font-size:13px': 'font-size:15px',
    'font-size:14px': 'font-size:15px',
    'font-size:9px': 'font-size:11px',
}

count = 0
for filename in files:
    filepath = os.path.join(folder, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    for old_size, new_size in font_map.items():
        content = content.replace(old_size, new_size)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

print(f"Updated {count} files")
