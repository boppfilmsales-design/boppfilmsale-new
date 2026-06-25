import os
import re

folder = r"C:\Users\DELL\Desktop\files"
files = [f for f in os.listdir(folder) if f.endswith('.html')]

# Update CSS variables for green text on white background
color_map = {
    # Background colors - keep white
    '#f8f9fa': '#f8f9fa',
    '#ffffff': '#ffffff',
    'rgba(255,255,255,0.95)': 'rgba(255,255,255,0.95)',
    '#f0f2f5': '#f0f2f5',

    # Text colors: change white/dark to green
    '#1a1a2e': '#1b5e20',  # ice - dark green for text
    '#ffffff': '#1b5e20',  # white - green for text
    '#f0f4f8': '#1b5e20',  # ice in product pages
    '#555555': '#2e7d32',  # slate - medium green

    # Accent colors
    '#0066cc': '#2e7d32',  # red -> green
    '#3399ff': '#43a047',  # red-light -> light green
    '#66aaff': '#66bb6a',  # red-pale -> lighter green

    # Gold -> green shades
    '#0066cc': '#2e7d32',
    '#3399ff': '#43a047',

    # Borders
    'rgba(0,102,204,0.15)': 'rgba(46,125,50,0.15)',
    'rgba(0,102,204,0.25)': 'rgba(46,125,50,0.25)',

    # Slider backgrounds - dark to light
    '#180404': '#e8f5e9',
    '#3a0808': '#c8e6c9',
    '#180606': '#e8f5e9',
    '#060c18': '#e0f2e1',
    '#0a1a38': '#c8e6c9',
    '#06180a': '#e8f5e9',
    '#0a3018': '#c8e6c9',
    '#061208': '#e0f2e1',
    '#181206': '#e8f5e9',
    '#302808': '#c8e6c9',
    '#181006': '#e0f2e1',

    # Glow effects
    'rgba(0,102,204,0.25)': 'rgba(46,125,50,0.2)',
    'rgba(232,196,106,0.025)': 'rgba(46,125,50,0.03)',

    # Gradient overlays
    'rgba(232,196,106,0.04)': 'rgba(46,125,50,0.04)',
    'rgba(192,57,43,0.1)': 'rgba(46,125,50,0.08)',
    'rgba(192,57,43,0.16)': 'rgba(46,125,50,0.12)',
    'rgba(232,196,106,0.07)': 'rgba(46,125,50,0.06)',
    'rgba(192,57,43,0.28)': 'rgba(46,125,50,0.2)',
    'rgba(232,196,106,0.2)': 'rgba(46,125,50,0.15)',
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
