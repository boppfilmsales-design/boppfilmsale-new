import os
import re

folder = r"C:\Users\DELL\Desktop\files"
files = [f for f in os.listdir(folder) if f.endswith('.html')]

# Color mapping: old -> new
color_map = {
    '#1e0808': '#0a0f1a',
    '#2d1010': '#111827',
    '#3d1a1a': '#1a2332',
    'rgba(50,15,15,0.88)': 'rgba(17,24,39,0.92)',
    '#c0392b': '#00d4aa',
    '#e74c3c': '#00f0c0',
    '#ff8a80': '#66ffdd',
    '#e8c46a': '#00d4aa',
    '#f5d98a': '#00f0c0',
    '#fff5f5': '#f0f4f8',
    '#c8a8a8': '#8899aa',
    'rgba(232,196,106,0.2)': 'rgba(0,212,170,0.2)',
    'rgba(192,57,43,0.28)': 'rgba(0,212,170,0.28)',
    'rgba(232,196,106,.2)': 'rgba(0,212,170,.2)',
    'rgba(192,57,43,.28)': 'rgba(0,212,170,.28)',
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
        print(f"Updated: {filename}")

print(f"\nTotal files updated: {count}")
