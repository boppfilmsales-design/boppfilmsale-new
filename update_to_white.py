import os

folder = r"C:\Users\DELL\Desktop\files"
files = [f for f in os.listdir(folder) if f.endswith('.html')]

color_map = {
    '#0a0f1a': '#f8f9fa',
    '#111827': '#ffffff',
    'rgba(17,24,39,0.92)': 'rgba(255,255,255,0.95)',
    '#1a2332': '#f0f2f5',
    '#00d4aa': '#0066cc',
    '#00f0c0': '#3399ff',
    '#66ffdd': '#66aaff',
    '#f0f4f8': '#1a1a2e',
    '#8899aa': '#555555',
    'rgba(0,212,170,0.2)': 'rgba(0,102,204,0.15)',
    'rgba(0,212,170,0.28)': 'rgba(0,102,204,0.25)',
    'rgba(0,212,170,.2)': 'rgba(0,102,204,.15)',
    'rgba(0,212,170,.28)': 'rgba(0,102,204,.25)',
}

count = 0
for filename in files:
    filepath = os.path.join(folder, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    for old_color, new_color in color_map.items():
        content = content.replace(old_color, new_color)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

print(f"Updated {count} files")
