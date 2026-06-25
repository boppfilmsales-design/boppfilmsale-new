import os

folder = r"C:\Users\DELL\Desktop\files"
files = [f for f in os.listdir(folder) if f.endswith('.html')]

count = 0
for filename in files:
    filepath = os.path.join(folder, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Fix remaining background colors to transparent
    replacements = [
        # Header and nav
        ('background:rgba(26,32,44,0.97)', 'background:rgba(255,255,255,0.95)'),
        ('background:rgba(26,32,44,0.9)', 'background:rgba(255,255,255,0.9)'),
        ('background:rgba(26,32,44,0.95)', 'background:rgba(255,255,255,0.93)'),

        # Nav hover
        ('background:rgba(255,255,255,0.07)', 'background:rgba(0,0,0,0.04)'),

        # Dropdown hover
        ('background:rgba(0,0,0,0.04)', 'background:rgba(0,0,0,0.03)'),

        # Section backgrounds
        ('.company-introduce{background:var(--bg-mid)}', '.company-introduce{background:transparent}'),
        ('.specs{background:var(--bg-mid)}', '.specs{background:transparent}'),

        # Product nav active
        ('background:rgba(192,57,43,0.15)', 'background:rgba(27,94,32,0.1)'),

        # DDI background
        ('background:rgba(0,0,0,0.04)', 'background:rgba(0,0,0,0.03)'),

        # Dots
        ('background:rgba(232,196,106,0.28)', 'background:rgba(27,94,32,0.3)'),

        # Arrows
        ('background:rgba(26,32,44,0.9)', 'background:rgba(255,255,255,0.9)'),

        # Category count
        ('background:rgba(0,0,0,0.04)', 'background:rgba(0,0,0,0.03)'),

        # Specs table header
        ('background:rgba(192,57,43,0.14)', 'background:rgba(27,94,32,0.1)'),

        # Table row hover
        ('background:rgba(255,255,255,0.02)', 'background:rgba(0,0,0,0.02)'),

        # Contact icon
        ('background:rgba(232,196,106,0.09)', 'background:rgba(27,94,32,0.08)'),

        # Form inputs
        ('background:rgba(26,32,44,0.95)', 'background:rgba(255,255,255,0.95)'),

        # Notice
        ('background:rgba(232,196,106,0.06)', 'background:rgba(27,94,32,0.05)'),

        # Mobile dropdown
        ('background:rgba(0,0,0,0.04)', 'background:rgba(0,0,0,0.03)'),

        # Modal close
        ('background:rgba(255,255,255,0.93)', 'background:rgba(255,255,255,0.95)'),

        # Modal tag
        ('background:rgba(192,57,43,0.12)', 'background:rgba(27,94,32,0.1)'),

        # Spec table header
        ('background:rgba(192,57,43,.16)', 'background:rgba(27,94,32,.12)'),

        # Border colors
        ('border:1px solid rgba(232,196,106,0.14)', 'border:1px solid rgba(0,0,0,0.08)'),
        ('border:1px solid rgba(232,196,106,0.18)', 'border:1px solid rgba(0,0,0,0.1)'),
        ('border:1px solid rgba(192,57,43,0.22)', 'border:1px solid rgba(0,0,0,0.1)'),
        ('border:1px solid rgba(46,125,50,0.1)', 'border:1px solid rgba(0,0,0,0.08)'),
        ('border:1px solid rgba(46,125,50,0.15)', 'border:1px solid rgba(0,0,0,0.1)'),
        ('border:1px solid rgba(46,125,50,0.25)', 'border:1px solid rgba(0,0,0,0.12)'),
        ('border:1px solid rgba(0,0,0,0.06)', 'border:1px solid rgba(0,0,0,0.08)'),
        ('border:1px solid rgba(0,0,0,0.08)', 'border:1px solid rgba(0,0,0,0.1)'),
    ]

    for old, new in replacements:
        content = content.replace(old, new)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

print(f"Updated {count} files")
