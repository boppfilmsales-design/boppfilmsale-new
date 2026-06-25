#!/usr/bin/env python3
"""
Generate BOPP product detail pages for AEC GROUP
Based on the template from bopp-plain.html
"""

import os

# Product data structure
products = [
    # BOPP Printing & Laminating Film
    {
        "id": "bopp-plain",
        "name": "BOPP PLAIN FILM",
        "name_zh": "BOPP普通薄膜",
        "tag": "BOPP PLAIN FILM",
        "title": "Plain BOPP Film (Bi-axially Oriented PolyPropylene) For Printing And Lamination",
        "desc_en": "As one of the largest professionally specialized BOPP manufacturers in China, we will do our best to meet your multi-demands.",
        "desc_zh": "作为中国最大的专业BOPP制造商之一，我们将尽力满足您的多种需求。",
        "usage_en": "It is widely used in packaging industry such as printing, lamination and Aluminium metallization.",
        "usage_zh": "广泛应用于包装行业，如印刷、复合和镀铝。",
        "features": [
            "Super high transparency and glossy · 超高透明高光泽",
            "Super high tensile strength · 超高拉伸强度",
            "Super high grease barrier · 超高油脂阻隔",
            "Excellent ink and coating adhesion · 优异油墨涂层附着力",
            "Low static electricity · 低静电",
            "Superior thickness uniformity · 厚度均匀",
            "Smoothness of vertical section · 纵切面平整",
            "Compact film rolls winding · 卷绕紧实"
        ],
        "specs": [
            ["Thickness · 厚度", "μm", "10, 12, 15, 18 for lamination; 20, 23, 25, 28, 30, 35-52 for printing; 23, 25, 28 for adhesive tape; 35, 37, 40, 50 for BOPP Bag"],
            ["Width · 幅宽", "mm", "350-1600"],
            ["Length · 卷长", "m", "2000, 3000, 4000, 7000, 8000, 9000"],
            ["Corona treated side · 电晕处理面", "—", "Single(one) side or double (two)sides"],
            ["Heat sealable · 热封性", "—", "Non-heatsealable"],
            ["Application · 应用", "—", "Printing, lamination, Aluminium metallization"],
            ["Color · 颜色", "—", "Transparent, clear"],
            ["Inner core · 纸芯", "mm", "76mm(3\"), 152mm(6\")"]
        ],
        "loading_en": "1. Use 20GP, 40GP, 40HQ.<br>2. Per 20GP: With pallets, can load 12-15 tons. If width <500MM, load 12 tons; if width >500MM, load ~15 tons. Without pallets, load 16-18 tons.<br>3. Per 40GP: With pallets (usually 40HQ), can load 24-25 tons. If width <500MM, load 24 tons; if width >500MM, load ~25 tons. Without pallets, load 26-27 tons.",
        "properties_en": "High transparency and gloss · 高透明高光泽<br>High tensile strength · 高拉伸强度<br>High grease barrier · 高油脂阻隔<br>Excellent ink and coating adhesion · 优异油墨涂层附着力<br>Low static electricity · 低静电<br>Superior thickness uniformity · 厚度均匀<br>Smooth rolling and neat ends · 平整卷绕整齐端面",
        "apps_en": ["Printing · 印刷", "Lamination · 复合", "Carton overwrap · 纸箱外包装", "Flower packaging · 花卉包装"],
        "apps_zh": ["印刷", "复合", "纸箱外包装", "花卉包装"],
        "category": "BOPP Printing & Laminating Film"
    },
    # Add more products here...
]

# Template for product page
template = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>{name} | {name_zh} | AEC GROUP</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<style>
:root{{--bg:#1e0808;--bg-mid:#2d1010;--bg-card:rgba(50,15,15,0.88);--red:#c0392b;--gold:#e8c46a;--ice:#fff5f5;--slate:#c8a8a8;--border:rgba(232,196,106,0.2);}}
*,*::before,*::after{{box-sizing:border-box;margin:0;padding:0}}body{{background:var(--bg);color:var(--ice);font-family:Inter,sans-serif;font-size:15px;line-height:1.7}}
.filmstrip{{height:24px;background:var(--bg-mid);display:flex;align-items:center;overflow:hidden}}.fs-track{{display:flex;animation:roll 20s linear infinite;white-space:nowrap}}.fs-hole{{width:14px;height:10px;border:1.5px solid var(--gold);border-radius:2px;margin:0 9px;opacity:.45}}.fs-txt{{font-size:9.5px;color:var(--gold);letter-spacing:.15em;opacity:.65;padding:0 16px}}@keyframes roll{{100%{{transform:translateX(-50%)}}}}
header{{background:rgba(30,8,8,.97);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:100}}.header-inner{{max-width:1200px;margin:0 auto;padding:0 24px;display:flex;align-items:center;height:60px;gap:20px}}.logo{{text-decoration:none}}.logo-main{{font-family:Playfair Display,serif;font-size:18px;font-weight:700;color:#fff}}.logo-main span{{color:var(--gold)}}.logo-sub{{font-size:7px;color:var(--slate);letter-spacing:.15em;text-transform:uppercase}}
nav{{display:flex;gap:3px;margin-left:auto}}nav a{{color:var(--slate);text-decoration:none;font-size:11px;padding:5px 10px;border-radius:3px}}nav a:hover{{color:#fff}}nav a.act{{color:var(--gold)}}
.breadcrumb{{max-width:1200px;margin:0 auto;padding:16px 24px 0;font-size:11px;color:var(--slate)}}.breadcrumb a{{color:var(--slate);text-decoration:none}}.breadcrumb a:hover{{color:var(--gold)}}.breadcrumb span{{color:var(--gold)}}
section{{padding:50px 0}}.container{{max-width:1200px;margin:0 auto;padding:0 32px}}.sec-label{{font-size:9px;letter-spacing:.24em;color:var(--gold);text-transform:uppercase;margin-bottom:8px}}.sec-title{{font-family:Playfair Display,serif;font-size:26px;font-weight:700;color:#fff;margin-bottom:6px}}.sec-zh{{font-size:14px;color:var(--slate);margin-bottom:14px}}
.desc-block{{background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:20px;margin-bottom:20px}}.desc-en{{color:var(--ice);line-height:1.8;margin-bottom:14px}}.desc-zh{{color:var(--gold-light);line-height:1.85}}
.spec-table{{width:100%;border-collapse:collapse;font-size:12px;margin-bottom:20px}}.spec-table th{{background:rgba(192,57,43,.16);color:var(--gold);font-size:10px;letter-spacing:.1em;text-transform:uppercase;padding:10px 14px;text-align:left}}.spec-table td{{padding:9px 14px;color:var(--slate);border-bottom:1px solid rgba(232,196,106,.07)}}
.app-grid{{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px}}.app-pill{{font-size:11px;background:rgba(232,196,106,.07);border:1px solid rgba(232,196,106,.18);color:var(--ice);padding:6px 12px;border-radius:6px}}
footer{{background:var(--bg-mid);border-top:1px solid var(--border);padding:36px 0 18px;text-align:center;font-size:10px;color:var(--slate)}}
footer a{{color:var(--gold);text-decoration:none}}
.btn-gold{{background:linear-gradient(135deg,var(--red),var(--red-light));color:#fff;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;padding:8px 18px;border-radius:4px;border:none;cursor:pointer;display:inline-block;white-space:nowrap}}
.btn-gold:hover{{filter:brightness(1.1);transform:translateY(-1px)}}
</style>
</head>
<body>
<div class="filmstrip"><div class="fs-track"><span class="fs-hole"></span><span class="fs-txt">BOPP FILM</span><span class="fs-hole"></span><span class="fs-txt">BOPET FILM</span><span class="fs-hole"></span><span class="fs-txt">CPP FILM</span><span class="fs-hole"></span><span class="fs-txt">POF SHRINK</span><span class="fs-hole"></span><span class="fs-txt">PACKING TAPE</span></div></div>
<header><div class="header-inner"><a href="index.html" class="logo"><div class="logo-main">AEC <span>GROUP</span></div><div class="logo-sub">Anhui Eastern Communication Imp. & Exp.</div></a>
<nav><a href="index.html#about">About</a><a href="index.html#products" class="act">Products</a><a href="index.html#specs">Specs</a><a href="index.html#applications">Apps</a><a href="index.html#why-us">Why Us</a><a href="index.html#contact">Contact</a></nav>
<a href="index.html#contact" class="btn-gold">Get Quote</a>
</header>
<div class="breadcrumb"><a href="index.html">Home</a> / <a href="index.html#products">Products</a> / <a href="index.html#bopp">BOPP</a> / <span>{name}</span></div>
<section><div class="container">
  <div class="sec-label">{tag}</div>
  <h2 class="sec-title">{title}</h2>
  <div class="sec-zh">{name_zh}</div>

  <div class="desc-block">
    <div class="desc-en">{desc_en}</div>
    <div class="desc-zh">{desc_zh}</div>
  </div>

  <div class="sec-label">Usage · 用途</div>
  <div class="desc-block">
    <div class="desc-en">{usage_en}</div>
    <div class="usage_zh">{usage_zh}</div>
  </div>

  <div class="sec-label">Featuring · 特性</div>
  <div class="app-grid">
    {features_html}
  </div>

  <div class="sec-label">Basic Parameters · 基本参数</div>
  <table class="spec-table"><thead><tr><th>Parameter · 参数</th><th>Unit · 单位</th><th>Value · 数值</th></tr></thead><tbody>
    {specs_html}
  </tbody></table>

  <div class="sec-label">Loading Details · 装载详情</div>
  <div class="desc-block">
    <div class="desc-en">{loading_en}</div>
  </div>

  <div class="sec-label">Main Properties · 主要特性</div>
  <div class="app-grid">
    {properties_html}
  </div>

  <div class="sec-label">Applications · 应用领域</div>
  <div class="app-grid">
    {apps_html}
  </div>

</div></section>
<footer>© 2026 AEC GROUP · <a href="https://www.boppfilmsale.com">boppfilmsale.com</a></footer>
<script>
var currentLang=localStorage.getItem('aec-lang')||'zh';
function setLang(l){{localStorage.setItem('aec-lang',l);document.documentElement.lang=l}}
setLang(currentLang);
</script>
</body>
</html>'''

def generate_product_page(product):
    """Generate HTML for a single product page"""

    # Generate features HTML
    features_html = '\n'.join([f'<span class="app-pill">{f}</span>' for f in product['features']])

    # Generate specs HTML
    specs_html = '\n'.join([f'<tr><td>{s[0]}</td><td>{s[1]}</td><td>{s[2]}</td></tr>' for s in product['specs']])

    # Generate apps HTML
    apps_html = '\n'.join([f'<span class="app-pill">{a}</span>' for a in product['apps_en']])

    # Generate properties HTML
    properties_html = product['properties_en'].replace('<br>', '\n')
    properties_html = '\n'.join([f'<span class="app-pill">{p.strip()}</span>' for p in properties_html.split('\n') if p.strip()])

    # Fill template
    html = template.format(
        name=product['name'],
        name_zh=product['name_zh'],
        tag=product['tag'],
        title=product['title'],
        desc_en=product['desc_en'],
        desc_zh=product['desc_zh'],
        usage_en=product['usage_en'],
        usage_zh=product['usage_zh'],
        features_html=features_html,
        specs_html=specs_html,
        loading_en=product['loading_en'],
        properties_html=properties_html,
        apps_html=apps_html
    )

    return html

def main():
    """Generate all product pages"""
    output_dir = r"C:\Users\DELL\Desktop\files"

    for product in products:
        filename = f"{product['id']}.html"
        filepath = os.path.join(output_dir, filename)

        html = generate_product_page(product)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)

        print(f"Generated: {filename}")

if __name__ == "__main__":
    main()
