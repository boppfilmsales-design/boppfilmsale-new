import os

folder = r"C:\Users\DELL\Desktop\files"
files = [f for f in os.listdir(folder) if f.endswith('.html')]

color_map = {
    # Dark red/black backgrounds -> soft white
    'rgba(30,8,8,0.96)': 'rgba(255,255,255,0.97)',
    'rgba(30,8,8,0.88)': 'rgba(255,255,255,0.92)',
    'rgba(30,8,8,0.85)': 'rgba(255,255,255,0.93)',
    'rgba(30,8,8,0.8)': 'rgba(255,255,255,0.9)',
    'rgba(30,8,8,0.9)': 'rgba(255,255,255,0.95)',
    '#280c0c': '#ffffff',
    'rgba(0,0,0,0.18)': 'rgba(0,0,0,0.04)',
    'rgba(192,57,43,0.2)': 'rgba(46,125,50,0.1)',
    'rgba(0,0,0,0.65)': 'rgba(0,0,0,0.15)',
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
