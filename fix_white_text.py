import os

folder = r"C:\Users\DELL\Desktop\files"
files = [f for f in os.listdir(folder) if f.endswith('.html')]

# Fix white text on white background issues
# Light backgrounds need DARK text, not light text
color_map = {
    # Text colors for light backgrounds - must be DARK
    '#f0f4f8': '#1a202c',  # ice (was light) -> dark text
    '#ffffff': '#1a202c',  # white text -> dark text (for white backgrounds)
    '#f5f5f5': '#1a202c',  # light gray text -> dark
    '#e0e0e0': '#1a202c',  # light gray text -> dark
    '#e8e8e8': '#1a202c',  # light gray text -> dark
    '#8899aa': '#2d3748',  # slate -> dark gray
    '#555555': '#1a202c',  # medium gray -> dark
    '#666666': '#1a202c',  # medium gray -> dark
    '#999999': '#2d3748',  # light gray -> dark gray
    '#cccccc': '#2d3748',  # light gray -> dark gray
    '#dddddd': '#2d3748',  # light gray -> dark gray
    '#eeeeee': '#2d3748',  # light gray -> dark gray
    'rgba(255,255,255,0.9)': 'rgba(26,32,44,0.95)',
    'rgba(255,255,255,0.95)': 'rgba(26,32,44,0.97)',
    'rgba(255,255,255,0.97)': 'rgba(26,32,44,0.98)',
    'rgba(255,255,255,0.98)': 'rgba(26,32,44,0.99)',
    'rgba(255,255,255,1)': 'rgba(26,32,44,1)',
    'linear-gradient(165deg,#ffffff,#f8f9fa)': 'linear-gradient(165deg,#1a202c,#2d3748)',
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
