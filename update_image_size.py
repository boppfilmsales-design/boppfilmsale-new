import os

files = [
    "bopet-4.5mic-clear.html",
    "bopet-ttr-film.html",
    "bopet-4.2mic.html",
    "bopet-3.8mic.html",
    "bopet-4.5mic-stock.html",
    "bopet-ttr-basic.html",
    "bopet-4.0mic.html",
    "bopet-transfer-printing.html",
    "bopet-transfer-4.4mic.html"
]

for filename in files:
    filepath = os.path.join(r"C:\Users\DELL\Desktop\files", filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        content = content.replace('width:200px;', 'width:600px;')
        content = content.replace('max-height:160px;', 'max-height:480px;')

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {filename}")
    else:
        print(f"File not found: {filename}")
