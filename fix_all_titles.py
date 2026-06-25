import os
import re

# Get all HTML files
html_files = [f for f in os.listdir(r"C:\Users\DELL\Desktop\files") if f.endswith('.html')]

# Pattern to find uppercase product titles (at+ consecutive uppercase words)
# This will match patterns like "BOPET INSULATING FILM", "BOPET TWIST FILM", etc.
def to_title_case(text):
    """Convert text to title case, keeping numbers and special chars intact."""
    words = text.split()
    result = []
    for word in words:
        # Keep numbers and special characters as is
        if word.isdigit() or word in ['×', 'x', '-', '(', ')']:
            result.append(word)
        # Keep words that are already mixed case (like "4.5MIC")
        elif any(c.islower() for c in word) and any(c.isupper() for c in word):
            result.append(word)
        # Convert all-caps words to title case
        elif word.isupper():
            result.append(word.capitalize())
        else:
            result.append(word)
    return ' '.join(result)

# Find and fix all uppercase titles in all files
fixed_files = []
for filename in html_files:
    filepath = os.path.join(r"C:\Users\DELL\Desktop\files", filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Fix uppercase product names in various contexts
    # Pattern: sequences of 2+ uppercase words (product titles)
    patterns = [
        # HTML tags content
        (r'>([A-Z][A-Z\s\(\)\-]+?)<', lambda m: '>' + to_title_case(m.group(1)) + '<'),
        # Title tags
        (r'<title>(.*?)</title>', lambda m: '<title>' + to_title_case(m.group(1)) + '</title>'),
    ]

    for pattern, replacer in patterns:
        content = re.sub(pattern, replacer, content)

    # Also fix specific known patterns in product cards and breadcrumbs
    # Fix product card titles
    content = re.sub(
        r'<div class="pname">([^<]+)</div>',
        lambda m: '<div class="pname">' + to_title_case(m.group(1)) + '</div>',
        content
    )

    # Fix h1 titles
    content = re.sub(
        r'<h1 class="sec-title">([^<]+)</h1>',
        lambda m: '<h1 class="sec-title">' + to_title_case(m.group(1)) + '</h1>',
        content
    )

    # Fix breadcrumb spans
    content = re.sub(
        r'<span>([A-Z][A-Z\s\(\)\-]+?)</span>',
        lambda m: '<span>' + to_title_case(m.group(1)) + '</span>',
        content
    )

    # Fix title meta tags
    content = re.sub(
        r'<title>([^<]+)</title>',
        lambda m: '<title>' + to_title_case(m.group(1)) + '</title>',
        content
    )

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        fixed_files.append(filename)

print(f"Fixed {len(fixed_files)} files:")
for f in sorted(fixed_files):
    print(f"  - {f}")
