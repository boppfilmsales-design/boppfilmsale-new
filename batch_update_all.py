#!/usr/bin/env python3
"""
Batch update all remaining BOPP product pages with new template style
"""

import os
import re

# Template for product pages
TEMPLATE = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>{title} | {title_zh} | AEC GROUP</title>
<meta name="description" content="{title} - High quality BOPP film from AEC GROUP."/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root{{--bg:#1e0808;--bg-mid:#2d1010;--bg-card:rgba(50,15,15,0.88);--red:#c0392b;--red-light:#e74c3c;--gold:#e8c46a;--gold-light:#f5d98a;--ice:#fff5f5;--slate:#c8a8a8;--white:#ffffff;--border:rgba(232,196,106,0.2);}}
*,*::before,*::after{{box-sizing:border-box;margin:0;padding:0}}html{{scroll-behavior:smooth}}body{{background:var(--bg);color:var(--ice);font-family:'Inter',sans-serif;font-size:15px;line-height:1.7;overflow-x:hidden}}
.filmstrip{{height:24px;background:var(--bg-mid);display:flex;align-items:center;overflow:hidden;position:fixed;top:0;left:0;right:0;z-index:200;border-bottom:1px solid var(--border)}}.fs-track{{display:flex;animation:filmroll 20s linear infinite;white-space:nowrap}}.fs-hole{{width:14px;height:10px;border:1.5px solid var(--gold);border-radius:2px;margin:0 9px;flex-shrink:0;opacity:.45;display:inline-block}}.fs-txt{{font-family:'JetBrains Mono',monospace;font-size:9.5px;color:var(--gold);letter-spacing:.15em;opacity:.65;padding:0 16px;flex-shrink:0}}@keyframes filmroll{{0%{{transform:translateX(0)}}100%{{transform:translateX(-50%)}}}}
header{{position:fixed;top:24px;left:0;right:0;z-index:100;background:rgba(30,8,8,0.96);backdrop-filter:blur(14px);border-bottom:1px solid var(--border)}}.header-inner{{max-width:1200px;margin:0 auto;padding:0 28px;display:flex;align-items:center;height:60px;gap:24px}}.logo{{flex-shrink:0;text-decoration:none}}.logo-main{{font-family:'Playfair Display',serif;font-size:21px;font-weight:700;color:var(--white);letter-spacing:.03em}}.logo-main span{{color:var(--gold)}}.logo-sub{{font-size:8px;color:var(--slate);letter-spacing:.18em;text-transform:uppercase;margin-top:-2px;display:block}}
nav{{display:flex;align-items:center;gap:1px;flex:1}}.nav-item{{position:relative}}.nav-item>a{{color:var(--slate);text-decoration:none;font-size:12px;font-weight:500;letter-spacing:.04em;padding:6px 11px;border-radius:4px;transition:all .2s;display:flex;align-items:center;gap:4px;cursor:pointer;white-space:nowrap}}.nav-item>a:hover{{color:var(--white);background:rgba(255,255,255,0.07)}}
.breadcrumb{{max-width:1200px;margin:0 auto;padding:100px 24px 16px;font-size:11px;color:var(--slate)}}.breadcrumb a{{color:var(--slate);text-decoration:none}}.breadcrumb a:hover{{color:var(--gold)}}.breadcrumb span{{color:var(--gold)}}
section{{padding:30px 0 50px}}.container{{max-width:1200px;margin:0 auto;padding:0 32px}}.sec-label{{font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:.24em;color:var(--gold);text-transform:uppercase;margin-bottom:10px}}.sec-title{{font-family:'Playfair Display',serif;font-size:28px;font-weight:700;color:#fff;line-height:1.15;margin-bottom:7px}}.sec-zh{{font-size:15px;color:var(--slate);margin-bottom:20px;font-weight:300}}
.desc-block{{background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:20px;margin-bottom:20px}}.desc-en{{color:var(--ice);line-height:1.8;margin-bottom:14px}}.desc-zh{{color:var(--gold-light);line-height:1.85}}
.spec-table{{width:100%;border-collapse:collapse;font-size:12px;margin-bottom:20px}}.spec-table th{{background:rgba(192,57,43,.16);color:var(--gold);font-size:10px;letter-spacing:.1em;text-transform:uppercase;padding:10px 14px;text-align:left}}.spec-table td{{padding:9px 14px;color:var(--slate);border-bottom:1px solid rgba(232,196,106,.07)}}
.app-grid{{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px}}.app-pill{{font-size:11px;background:rgba(232,196,106,.07);border:1px solid rgba(232,196,106,.18);color:var(--ice);padding:6px 12px;border-radius:6px}}
footer{{background:var(--bg-mid);border-top:1px solid var(--border);padding:36px 0 18px;text-align:center;font-size:10px;color:var(--slate)}}footer a{{color:var(--gold);text-decoration:none}}
.btn-gold{{background:linear-gradient(135deg,var(--red),var(--red-light));color:#fff;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;padding:8px 18px;border-radius:4px;border:none;cursor:pointer;transition:all .2s;display:inline-block;white-space:nowrap}}.btn-gold:hover{{filter:brightness(1.1);transform:translateY(-1px)}}
.back-btn{{display:inline-flex;align-items:center;gap:6px;color:var(--gold);text-decoration:none;font-size:12px;margin-bottom:20px}}.back-btn:hover{{color:var(--gold-light)}}
</style>
</head>
<body>
<div class="filmstrip"><div class="fs-track">
<span class="fs-hole"></span><span class="fs-txt">BOPP FILM</span><span class="fs-hole"></span><span class="fs-txt">BOPET FILM</span><span class="fs-hole"></span><span class="fs-txt">CPP FILM</span><span class="fs-hole"></span><span class="fs-txt">POF SHRINK FILM</span><span class="fs-hole"></span><span class="fs-txt">PACKING TAPE</span><span class="fs-hole"></span><span class="fs-txt">AEC GROUP · HEFEI CHINA</span>
<span class="fs-hole"></span><span class="fs-txt">BOPP FILM</span><span class="fs-hole"></span><span class="fs-txt">BOPET FILM</span><span class="fs-hole"></span><span class="fs-txt">CPP FILM</span><span class="fs-hole"></span><span class="fs-txt">POF SHRINK FILM</span><span class="fs-hole"></span><span class="fs-txt">PACKING TAPE</span><span class="fs-hole"></span><span class="fs-txt">AEC GROUP · HEFEI CHINA</span>
</div></div>
<header><div class="header-inner">
<a href="index.html" class="logo"><div class="logo-main">AEC <span>GROUP</span></div><span class="logo-sub">Anhui Eastern Communication Imp. &amp; Exp.</span></a>
<nav>
<div class="nav-item"><a href="index.html#about">About</a></div>
<div class="nav-item"><a href="index.html#products" class="act">Products</a></div>
<div class="nav-item"><a href="index.html#specs">Specs</a></div>
<div class="nav-item"><a href="index.html#applications">Applications</a></div>
<div class="nav-item"><a href="index.html#why-us">Why Us</a></div>
<div class="nav-item"><a href="index.html#contact">Contact</a></div>
</nav>
<a href="index.html#contact" class="btn-gold">Get Quote</a>
</header>
<div class="breadcrumb">
<a href="index.html">Home</a> /
<a href="index.html#products">Products</a> /
<a href="index.html#bopp">BOPP Film</a> /
<span>{category}</span> /
<span style="color:var(--ice)">{title}</span>
</div>
<section><div class="container">
<a href="index.html#bopp" class="back-btn">← Back to BOPP Products</a>
<div class="sec-label">{category}</div>
<h1 class="sec-title">{title}</h1>
<div class="sec-zh">{title_zh}</div>

<div class="desc-block">
<div class="desc-en">{desc_en}</div>
<div class="desc-zh">{desc_zh}</div>
</div>

<div class="sec-label">Features · 特性</div>
<div class="app-grid">{features}</div>

<div class="sec-label">Applications · 应用领域</div>
<div class="app-grid">{apps}</div>

<div class="sec-label">Specifications · 规格参数</div>
<table class="spec-table">
<thead><tr><th>Parameter · 参数</th><th>Unit · 单位</th><th>Value · 数值</th></tr></thead>
<tbody>{specs}</tbody>
</table>

<div style="margin-top:30px;padding-top:20px;border-top:1px solid var(--border)">
<div class="sec-label">Interested in this product?</div>
<a href="index.html#contact" class="btn-gold">Request Quote · 询价</a>
</div>

</div></section>
<footer>© 2026 AEC GROUP – Anhui Eastern Communication Imp. &amp; Exp. Co., Ltd. · <a href="https://www.boppfilmsale.com">boppfilmsale.com</a></footer>
<script>
var currentLang=localStorage.getItem('aec-lang')||'zh';
function setLang(l){{localStorage.setItem('aec-lang',l);document.documentElement.lang=l}}
setLang(currentLang);
</script>
</body>
</html>'''

# Product data
PRODUCTS = {
    "bopp-perforated": {
        "title": "BOPP PERFORATED FILM",
        "title_zh": "BOPP打孔薄膜",
        "category": "BOPP Printing & Laminating Film",
        "desc_en": "Perforated BOPP film with controlled hole patterns for ventilation packaging applications. Allows air circulation while maintaining product protection.",
        "desc_zh": "具有受控孔洞图案的打孔BOPP薄膜，用于透气包装应用。允许空气流通，同时保持产品保护。",
        "features": ["Controlled hole patterns · 受控孔洞图案", "Allows air circulation · 允许空气流通", "Maintains product protection · 保持产品保护", "Custom hole sizes available · 可定制孔洞尺寸", "Good strength · 良好强度"],
        "apps": ["Produce packaging · 农产品包装", "Fruit & vegetable bags · 水果蔬菜袋", "Industrial ventilation · 工业透气包装"],
        "specs": [["Type · 类型", "—", "Perforated"], ["Pattern · 图案", "—", "Custom patterns"], ["Hole Size · 孔洞尺寸", "mm", "Custom"], ["Ventilation · 透气", "—", "Controlled"], ["Thickness · 厚度", "μm", "15-50"]]
    },
    "bopp-antistatic": {
        "title": "BOPP Anti Static Film",
        "title_zh": "BOPP抗静电薄膜",
        "category": "BOPP Printing & Laminating Film",
        "desc_en": "BOPP film with anti-static treatment for electronics and sensitive product packaging. Prevents static buildup that can damage electronic components or attract dust.",
        "desc_zh": "具有抗静电处理的BOPP薄膜，用于电子元件及敏感产品包装。防止静电积累损坏电子元件或吸附灰尘。",
        "features": ["Anti-static treatment · 抗静电处理", "Prevents static buildup · 防止静电积累", "Protects electronic components · 保护电子元件", "Dust resistant · 防尘", "Permanent anti-static properties · 永久抗静电性能"],
        "apps": ["Electronics packaging · 电子元件包装", "Sensitive product wrapping · 敏感产品包装", "Industrial component bags · 工业元件袋"],
        "specs": [["Treatment · 处理", "—", "Anti-static"], ["Surface Resistance · 表面电阻", "Ω", "10^9-10^12"], ["Application · 应用", "—", "Electronics packaging"], ["Property · 特性", "—", "Static prevention"], ["Thickness · 厚度", "μm", "15-50"]]
    },
    "bopp-heatseal-small": {
        "title": "BOPP Smaller Rolls CLEAR",
        "title_zh": "BOPP小卷透明热封膜",
        "category": "BOPP Heat Sealable Film",
        "desc_en": "Heat sealable BOPP film supplied in smaller roll format for specialty applications and smaller production runs. Clear grade for product visibility.",
        "desc_zh": "以较小卷规格供应的热封BOPP薄膜，适用于特种应用和小批量生产。透明级别，便于产品可见。",
        "features": ["Smaller roll format · 较小卷规格", "Clear/transparent · 透明", "Heat sealable · 可热封", "Suitable for small production · 适合小批量生产", "Easy to handle · 易于操作"],
        "apps": ["Small production runs · 小批量生产", "Specialty packaging · 特种包装", "Sample production · 样品生产"],
        "specs": [["Format · 形式", "—", "Small rolls"], ["Clarity · 透明度", "—", "Clear"], ["Sealing · 封合", "—", "Heat sealable"], ["Application · 应用", "—", "Specialty"], ["Thickness · 厚度", "μm", "15-40"]]
    },
    "bopp-heatseal": {
        "title": "BOPP Heat Sealable Film",
        "title_zh": "BOPP热封薄膜",
        "category": "BOPP Heat Sealable Film",
        "desc_en": "Heat sealable BOPP film for various packaging applications. Available in one-side and two-side heat sealable grades for different packaging requirements.",
        "desc_zh": "热封BOPP薄膜，用于各种包装应用。提供单面和双面热封等级，满足不同的包装需求。",
        "features": ["Heat sealable · 可热封", "Good seal strength · 良好封合强度", "Versatile applications · 多功能应用", "Excellent clarity · 优异透明度", "Food grade · 食品级"],
        "apps": ["Food packaging · 食品包装", "Snack bags · 休闲食品袋", "Automated packaging · 自动化包装"],
        "specs": [["Thickness · 厚度", "μm", "15-40"], ["Heat Seal Temperature · 热封温度", "°C", "100-140"], ["Heat Seal Strength · 热封强度", "N/15mm", "≥3"], ["Sealing Sides · 封合面", "—", "One or Both sides"], ["Application · 应用", "—", "Food packaging"]]
    },
    "bopp-heatseal-one": {
        "title": "One Side Heat Sealable BOPP Film",
        "title_zh": "单面热封BOPP薄膜",
        "category": "BOPP Heat Sealable Film",
        "desc_en": "One-side heat sealable BOPP film for specific packaging requirements where only one sealed surface is needed. Ideal for specialized packaging applications.",
        "desc_zh": "单面热封BOPP薄膜，适用于只需要一个封合表面的特定包装要求。适合专业包装应用。",
        "features": ["Heat sealable one side · 单面可热封", "Good seal strength · 良好封合强度", "Versatile applications · 多功能应用", "Excellent clarity · 优异透明度"],
        "apps": ["Specialty wrapping · 特种包装", "Lamination applications · 复合应用", "Specific packaging needs · 特定包装需求"],
        "specs": [["Thickness · 厚度", "μm", "15-40"], ["Sealing Side · 封合面", "—", "One side"], ["Heat Seal Temp · 热封温度", "°C", "100-140"], ["Application · 应用", "—", "Specialized packaging"]]
    }
}

def update_page(product_id, data):
    """Update a single product page"""
    filepath = os.path.join(r"C:\Users\DELL\Desktop\files", f"{product_id}.html")

    if not os.path.exists(filepath):
        print(f"File not found: {product_id}.html")
        return False

    features_html = '\n'.join([f'<span class="app-pill">{f}</span>' for f in data['features']])
    apps_html = '\n'.join([f'<span class="app-pill">{a}</span>' for a in data['apps']])
    specs_html = '\n'.join([f'<tr><td>{s[0]}</td><td>{s[1]}</td><td>{s[2]}</td></tr>' for s in data['specs']])

    html = TEMPLATE.format(
        title=data['title'],
        title_zh=data['title_zh'],
        category=data['category'],
        desc_en=data['desc_en'],
        desc_zh=data['desc_zh'],
        features=features_html,
        apps=apps_html,
        specs=specs_html
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)

    print(f"Updated: {product_id}.html")
    return True

def main():
    """Update all products"""
    success = 0
    failed = 0

    for product_id, data in PRODUCTS.items():
        if update_page(product_id, data):
            success += 1
        else:
            failed += 1

    print(f"\nDone! Updated: {success}, Failed: {failed}")

if __name__ == "__main__":
    main()
