import os

folder = r"C:\Users\DELL\Desktop\files"
files = [f for f in os.listdir(folder) if f.endswith('.html')]

# Fix color contrast: make text darker on light backgrounds
color_map = {
    # Light text colors -> darker colors for white backgrounds
    '#1b5e20': '#0d3311',  # ice (light green text) -> very dark green
    '#2e7d32': '#1b5e20',  # gold/red -> dark green
    '#43a047': '#2e7d32',  # red-light -> medium green
    '#66bb6a': '#43a047',  # red-pale -> green
    '#8899aa': '#4a5568',  # slate -> dark gray
    '#555555': '#2d3748',  # darker slate
    '#333': '#1a202c',     # dark gray -> very dark
    '#666': '#2d3748',     # medium gray -> dark gray
    '#999': '#4a5568',     # light gray -> medium gray
    '#fff': '#1a202c',     # white text -> dark (for dark backgrounds)
    '#f0f4f8': '#1a202c',  # ice -> dark
    '#f5f5f5': '#1a202c',  # light gray -> dark
    '#e0e0e0': '#2d3748',  # light gray -> dark gray
    '#e8e8e8': '#2d3748',  # light gray -> dark gray
    '#f8f9fa': '#1a202c',  # light background -> dark text
    '#ffffff': '#1a202c',  # white -> dark text
    'rgba(255,255,255,0.9)': 'rgba(26,32,44,0.9)',
    'rgba(255,255,255,0.95)': 'rgba(26,32,44,0.95)',
    'rgba(255,255,255,0.97)': 'rgba(26,32,44,0.97)',
    'rgba(255,255,255,0.98)': 'rgba(26,32,44,0.98)',
    'rgba(255,255,255,1)': 'rgba(26,32,44,1)',
    'linear-gradient(135deg,#e0e0e0,#f5f5f5)': 'linear-gradient(135deg,#2d3748,#4a5568)',
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

print(f"Updated contrast in {count} files")
