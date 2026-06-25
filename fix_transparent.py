import os

folder = r"C:\Users\DELL\Desktop\files"
files = [f for f in os.listdir(folder) if f.endswith('.html')]

count = 0
for filename in files:
    filepath = os.path.join(folder, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Update main background to transparent
    content = content.replace('--bg:#f8f9fa;', '--bg:transparent;')
    content = content.replace('--bg-mid:#ffffff;', '--bg-mid:transparent;')
    content = content.replace('--bg-card:rgba(255,255,255,0.97);', '--bg-card:transparent;')
    content = content.replace('--bg-light:#f0f2f5;', '--bg-light:transparent;')

    # Fix body background
    content = content.replace('body{background:var(--bg);', 'body{background:var(--bg);')

    # Fix filmstrip background
    content = content.replace('.filmstrip{height:24px;background:var(--bg-mid);', '.filmstrip{height:24px;background:transparent;')

    # Fix header background
    content = content.replace('background:rgba(255,255,255,0.97);backdrop-filter:blur(14px)', 'background:rgba(255,255,255,0.95);backdrop-filter:blur(10px)')

    # Fix section backgrounds that use dark colors
    content = content.replace('background:var(--bg);', 'background:transparent;')
    content = content.replace('background:var(--bg-mid);', 'background:transparent;')
    content = content.replace('background:var(--bg-card);', 'background:transparent;')

    # Fix about section
    content = content.replace('.about{background:var(--bg-mid)}', '.about{background:transparent}')

    # Fix why-us section
    content = content.replace('.why-us{background:var(--bg-mid)}', '.why-us{background:transparent}')

    # Fix products section
    content = content.replace('.products{background:var(--bg)}', '.products{background:transparent}')

    # Fix equipment section
    content = content.replace('.equipment{background:var(--bg)}', '.equipment{background:transparent}')

    # Fix contact section
    content = content.replace('.contact{background:var(--bg)}', '.contact{background:transparent}')

    # Fix specs section
    content = content.replace('.specs{background:var(--bg)}', '.specs{background:transparent}')

    # Fix applications section
    content = content.replace('.applications{background:var(--bg)}', '.applications{background:transparent}')

    # Fix footer
    content = content.replace('background:var(--bg-mid);padding:36px 0 18px', 'background:#f5f5f5;padding:36px 0 18px')

    # Fix desc-block
    content = content.replace('.desc-block{background:var(--bg-card);', '.desc-block{background:transparent;')

    # Fix stat-card
    content = content.replace('.stat-card{background:rgba(255,255,255,0.92);', '.stat-card{background:transparent;')

    # Fix fcrd
    content = content.replace('.fcrd{background:var(--bg-card);', '.fcrd{background:transparent;')

    # Fix ci-en and ci-zh
    content = content.replace('.ci-en,.ci-zh{background:var(--bg-card);', '.ci-en,.ci-zh{background:transparent;')

    # Fix contact-sidebar
    content = content.replace('background:rgba(255,255,255,0.98);border:1px solid rgba(0,0,0,0.1)', 'background:rgba(255,255,255,0.95);border:1px solid rgba(0,0,0,0.1)')

    # Fix chatbot panel
    content = content.replace('background:#ffffff;border:1px solid rgba(0,0,0,0.12);border-radius:16px', 'background:rgba(255,255,255,0.95);border:1px solid rgba(0,0,0,0.1);border-radius:16px')

    # Fix modal box
    content = content.replace('background:linear-gradient(165deg,#1a202c,#2d3748);border:1px solid var(--border);border-radius:14px', 'background:#ffffff;border:1px solid rgba(0,0,0,0.1);border-radius:14px')

    # Fix modal overlay
    content = content.replace('background:rgba(0,0,0,0.5);backdrop-filter:blur(6px)', 'background:rgba(0,0,0,0.4);backdrop-filter:blur(4px)')

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

print(f"Updated {count} files")
