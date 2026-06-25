import os
import re

folder = r"C:\Users\DELL\Desktop\files"
files = [f for f in os.listdir(folder) if f.endswith('.html')]

count = 0
for filename in files:
    filepath = os.path.join(folder, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Fix CSS variable --white to be dark
    content = re.sub(r'--white:#fff[f]*;', '--white:#1a202c;', content)
    content = re.sub(r'--white:rgba\(255,255,255,[\d.]+\);', '--white:#1a202c;', content)

    # Fix --ice to be dark text (not white/light)
    content = re.sub(r'--ice:#fff[f]*;', '--ice:#1a202c;', content)
    content = re.sub(r'--ice:rgba\(255,255,255,[\d.]+\);', '--ice:#1a202c;', content)

    # Fix color:#fff or color:#ffffff in CSS
    content = re.sub(r'color:#fff[f]*;', 'color:#1a202c;', content)
    content = re.sub(r'color:rgba\(255,255,255,([\d.]+)\)', r'color:rgba(26,32,44,\1)', content)

    # Fix background:white or background:#fff (make it transparent or light)
    # Only fix text color, not background

    # Fix fill:#fff (SVG)
    content = re.sub(r'fill:#fff[f]*;', 'fill:#1a202c;', content)

    # Fix border-color:white text
    content = re.sub(r'border-color:#fff[f]*;', 'border-color:#1a202c;', content)

    # Specifically fix dropdown menu text
    content = re.sub(r'\.dropdown a\{([^}]*);color:var(--white)', r'.dropdown a{\1;color:#1a202c', content)
    content = re.sub(r'\.dropdown a:hover\{([^}]*);color:var(--white)', r'.dropdown a:hover{\1;color:#1a202c', content)

    # Fix nav-item text
    content = re.sub(r'\.nav-item>a\{([^}]*);color:var(--slate)', r'.nav-item>a{\1;color:#2d3748', content)

    # Fix btn-gold text color (was white, should be dark on light background)
    content = re.sub(r'\.btn-gold\{([^}]*);color:#fff[f]*;', r'.btn-gold{\1;color:#1a202c;', content)
    content = re.sub(r'\.btn-gold\{([^}]*);color:var(--white)', r'.btn-gold{\1;color:#1a202c', content)

    # Fix slide text colors
    content = re.sub(r'color:#fff;', 'color:#1a202c;', content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

print(f"Updated {count} files")
