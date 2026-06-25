import os

folder = r"C:\Users\DELL\Desktop\files"
files = [f for f in os.listdir(folder) if f.endswith('.html')]

color_map = {
    # Green backgrounds -> soft white
    '#1b5e20': '#ffffff',
    'rgba(46,125,50,0.1)': 'rgba(0,0,0,0.04)',
    'rgba(46,125,50,0.06)': 'rgba(0,0,0,0.04)',
    'rgba(46,125,50,0.08)': 'rgba(0,0,0,0.04)',
    'rgba(46,125,50,0.03)': 'rgba(0,0,0,0.02)',
    'rgba(46,125,50,0.2)': 'rgba(0,0,0,0.08)',
    'rgba(192,57,43,0.22)': 'rgba(0,0,0,0.08)',
    'rgba(46,125,50,0.15)': 'rgba(0,0,0,0.06)',
    'rgba(46,125,50,0.1)': 'rgba(0,0,0,0.04)',
    'linear-gradient(165deg,#1b5e20,#f8f9fa)': 'linear-gradient(165deg,#f8f9fa,#ffffff)',
    'linear-gradient(135deg,#2e7d32,#43a047)': 'linear-gradient(135deg,#e0e0e0,#f5f5f5)',
    'rgba(192,57,43,0.4)': 'rgba(0,0,0,0.15)',
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
