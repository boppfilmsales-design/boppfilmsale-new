#!/usr/bin/env python3
"""
Batch update all BOPP product pages with consistent style
"""

import os
import glob

# Product data with all information
PRODUCTS_DATA = {
    "bopp-plain": {
        "name": "BOPP PLAIN FILM",
        "name_zh": "BOPP普通薄膜",
        "category": "BOPP Printing & Laminating Film",
        "desc_en": "As one of the largest professionally specialized BOPP manufacturers in China, we will do our best to meet your multi-demands. BOPP Plain Film is our flagship product with consistent quality and competitive pricing.",
        "desc_zh": "作为中国最大的专业BOPP制造商之一，我们将尽力满足您的多种需求。BOPP普通薄膜是我们的旗舰产品，质量稳定，价格具有竞争力。",
        "features": ["Super high transparency and glossy · 超高透明高光泽", "Super high tensile strength · 超高拉伸强度", "Super high grease barrier · 超高油脂阻隔", "Excellent ink and coating adhesion · 优异油墨涂层附着力", "Low static electricity · 低静电", "Superior thickness uniformity · 厚度均匀"],
        "specs": [["Thickness · 厚度", "μm", "10-75"], ["Width · 幅宽", "mm", "350-1600"], ["Length · 卷长", "m", "2000-9000"], ["Corona treated side · 电晕处理面", "—", "Single or double sides"], ["Heat sealable · 热封性", "—", "Non-heatsealable"], ["Color · 颜色", "—", "Transparent, clear"]],
        "apps": ["Printing · 印刷", "Lamination · 复合", "Carton overwrap · 纸箱外包装", "Flower packaging · 花卉包装"]
    },
    "bopp-bag-grade": {
        "name": "BOPP Bag Grade Film",
        "name_zh": "BOPP袋级薄膜",
        "category": "BOPP Printing & Laminating Film",
        "desc_en": "Specially designed BOPP film for bag making applications with excellent seal strength, clarity and heat sealability. Ideal for high-speed bag production lines.",
        "desc_zh": "专为制袋应用设计的BOPP薄膜，具有优异的封合强度、透明度和热封性能。适合高速制袋生产线。",
        "features": ["Excellent heat seal strength · 优异热封强度", "High clarity and transparency · 高透明度", "Good slip properties · 良好爽滑性", "High stiffness · 高挺度", "Excellent printability · 优异印刷适性"],
        "specs": [["Thickness · 厚度", "μm", "15-40"], ["Width · 幅宽", "mm", "Custom"], ["Heat Seal Strength · 热封强度", "N/15mm", "≥3"], ["Heat Seal Temperature · 热封温度", "°C", "100-140"], ["Coefficient of Friction · 摩擦系数", "—", "0.1-0.3"], ["Haze · 雾度", "%", "≤2.5"]],
        "apps": ["Bag making · 制袋包装", "Food packaging bags · 食品包装袋", "High-speed bag lines · 高速制袋线"]
    },
    "bopp-tape-grade": {
        "name": "BOPP TAPE-GRADE FILM",
        "name_zh": "BOPP胶带级薄膜",
        "category": "BOPP Printing & Laminating Film",
        "desc_en": "Base BOPP film specifically engineered for adhesive tape manufacturing. Provides consistent thickness, tensile strength and dimensional stability required for high-speed coating and slitting.",
        "desc_zh": "专为胶带制造设计的BOPP基膜，提供一致的厚度、抗张强度和尺寸稳定性，适用于高速涂胶和分切加工。",
        "features": ["Consistent thickness · 厚度一致", "High tensile strength · 高抗张强度", "Excellent dimensional stability · 优异尺寸稳定性", "Smooth surface · 表面平整", "Good adhesion · 良好粘性"],
        "specs": [["Thickness · 厚度", "μm", "18-50"], ["Width · 幅宽", "mm", "Custom, mill-width"], ["Tensile Strength MD · 纵向拉伸强度", "MPa", "≥150"], ["Tensile Strength TD · 横向拉伸强度", "MPa", "≥260"], ["Format · 形式", "—", "Jumbo rolls"]],
        "apps": ["Packing tape manufacturing · 封箱胶带生产", "Masking tape production · 美纹纸胶带生产", "Specialty tape products · 特种胶带产品"]
    },
    "bopp-glossy": {
        "name": "BOPP Glossy Film 8,10,12,15 Mic",
        "name_zh": "BOPP光亮薄膜",
        "category": "BOPP Printing & Laminating Film",
        "desc_en": "High gloss BOPP film optimized for wet and cold lamination of printed paper substrates. Available in specific thicknesses of 8, 10, 12 and 15 micron. Produces brilliant mirror-like finish that enhances print color vibrancy.",
        "desc_zh": "高光亮BOPP薄膜，专为印刷纸张基材的湿式及冷式复合工艺优化。提供8、10、12、15微米特定厚度。呈现镜面光泽效果，提升印刷色彩鲜艳度。",
        "features": ["Excellent gloss (≥85 GU) · 优异光泽度", "Low haze (≤1.5%) · 低雾度", "High clarity · 高透明度", "Excellent adhesion · 优异附着力", "Smooth surface · 表面光滑"],
        "specs": [["Thickness · 厚度", "μm", "8 / 10 / 12 / 15"], ["Gloss (45°) · 光泽度", "GU", "≥85"], ["Haze · 雾度", "%", "≤1.5"], ["Light Transmittance · 透光率", "%", "≥87"], ["Width · 幅宽", "mm", "250-1000"], ["Lamination Type · 复合类型", "—", "Wet / Cold lamination"]],
        "apps": ["Book & magazine covers · 书籍及杂志封面", "Brochure lamination · 宣传册覆膜", "Packaging box surface · 包装盒表面"]
    },
    "bopp-matte": {
        "name": "BOPP Matte Film 10,12,15,18 Mic",
        "name_zh": "BOPP哑光薄膜",
        "category": "BOPP Printing & Laminating Film",
        "desc_en": "Specialty BOPP lamination film with fine matte surface texture that produces a soft, premium, low-glare finish. Available in 10, 12, 15 and 18 micron thicknesses. Popular in high-end retail packaging and publishing.",
        "desc_zh": "特种BOPP复合薄膜，表面经精细哑光处理，呈现柔和、高档、低反光效果。提供10、12、15、18微米厚度。广泛应用于高端零售包装及出版印刷。",
        "features": ["Low-sheen matte finish · 低光泽哑光效果", "Premium appearance · 高档外观", "Fingerprint resistant · 防指纹", "Excellent printability · 优异印刷适性", "Soft touch feel · 柔软触感"],
        "specs": [["Thickness · 厚度", "μm", "10 / 12 / 15 / 18"], ["Surface Finish · 表面效果", "—", "Low-sheen matte"], ["Gloss (45°) · 光泽度", "GU", "60-75"], ["Fingerprint Resistance · 防指纹", "—", "Excellent"], ["Lamination Type · 复合类型", "—", "Wet / Dry lamination"]],
        "apps": ["Premium packaging boxes · 高端包装盒", "High-end book covers · 高档书籍封面", "Cosmetic packaging · 化妆品包装"]
    },
    "bopp-antifog": {
        "name": "BOPP anti-fog film",
        "name_zh": "BOPP防雾薄膜",
        "category": "BOPP Printing & Laminating Film",
        "desc_en": "BOPP film with anti-fog properties designed for food packaging applications. Maintains clarity in humid conditions and prevents fogging that can obscure product visibility.",
        "desc_zh": "具有防雾性能的BOPP薄膜，专为食品包装应用设计。在潮湿环境下保持清晰度，防止起雾影响产品可见度。",
        "features": ["Anti-fog properties · 防雾性能", "Maintains clarity in humidity · 潮湿环境保持透明", "Food grade · 食品级", "Excellent transparency · 优异透明度", "Good heat sealability · 良好热封性"],
        "specs": [["Property · 特性", "—", "Anti-fog"], ["Grade · 等级", "—", "Food grade"], ["Clarity · 透明度", "—", "Maintained in humidity"], ["Thickness · 厚度", "μm", "15-50"], ["Application · 应用", "—", "Food packaging"]],
        "apps": ["Fresh food packaging · 生鲜食品包装", "Refrigerated food display · 冷藏食品展示", "Produce packaging · 农产品包装"]
    },
    "bopp-perforated": {
        "name": "BOPP PERFORATED FILM",
        "name_zh": "BOPP打孔薄膜",
        "category": "BOPP Printing & Laminating Film",
        "desc_en": "Perforated BOPP film with controlled hole patterns for ventilation packaging applications. Allows air circulation while maintaining product protection.",
        "desc_zh": "具有受控孔洞图案的打孔BOPP薄膜，用于透气包装应用。允许空气流通，同时保持产品保护。",
        "features": ["Controlled hole patterns · 受控孔洞图案", "Allows air circulation · 允许空气流通", "Maintains product protection · 保持产品保护", "Custom hole sizes available · 可定制孔洞尺寸", "Good strength · 良好强度"],
        "specs": [["Type · 类型", "—", "Perforated"], ["Pattern · 图案", "—", "Custom patterns"], ["Hole Size · 孔洞尺寸", "mm", "Custom"], ["Ventilation · 透气", "—", "Controlled"], ["Thickness · 厚度", "μm", "15-50"]],
        "apps": ["Produce packaging · 农产品包装", "Fruit & vegetable bags · 水果蔬菜袋", "Industrial ventilation · 工业透气包装"]
    },
    "bopp-antistatic": {
        "name": "BOPP anti static film",
        "name_zh": "BOPP抗静电薄膜",
        "category": "BOPP Printing & Laminating Film",
        "desc_en": "BOPP film with anti-static treatment for electronics and sensitive product packaging. Prevents static buildup that can damage electronic components or attract dust.",
        "desc_zh": "具有抗静电处理的BOPP薄膜，用于电子元件及敏感产品包装。防止静电积累损坏电子元件或吸附灰尘。",
        "features": ["Anti-static treatment · 抗静电处理", "Prevents static buildup · 防止静电积累", "Protects electronic components · 保护电子元件", "Dust resistant · 防尘", "Permanent anti-static properties · 永久抗静电性能"],
        "specs": [["Treatment · 处理", "—", "Anti-static"], ["Surface Resistance · 表面电阻", "Ω", "10^9-10^12"], ["Application · 应用", "—", "Electronics packaging"], ["Property · 特性", "—", "Static prevention"], ["Thickness · 厚度", "μm", "15-50"]],
        "apps": ["Electronics packaging · 电子元件包装", "Sensitive product wrapping · 敏感产品包装", "Industrial component bags · 工业元件袋"]
    },
    "bopp-heatseal-2side": {
        "name": "Two Sides Heat Sealable Polypropylene Film",
        "name_zh": "双面热封聚丙烯薄膜",
        "category": "BOPP Heat Sealable Film",
        "desc_en": "Co-extruded multilayer BOPP film with heat sealable layers on both sides. Provides versatile sealing options for various packaging applications. Excellent hot-tack strength for high-speed production.",
        "desc_zh": "共挤多层BOPP薄膜，两面均具有热封层。为各种包装应用提供多功能封合选择。优异的热粘强度，适合高速生产。",
        "features": ["Heat sealable both sides · 双面可热封", "Excellent hot-tack strength · 优异热粘强度", "Wide sealing temperature range · 宽热封温度范围", "Good seal strength · 良好封合强度", "Suitable for high-speed lines · 适合高速生产线", "Food grade · 食品级"],
        "specs": [["Thickness · 厚度", "μm", "15-40"], ["Heat Seal Temperature · 热封温度", "°C", "100-140"], ["Heat Seal Strength · 热封强度", "N/15mm", "≥3"], ["Sealing Sides · 封合面", "—", "Both sides"], ["Hot Tack · 热粘强度", "—", "Excellent"], ["Application · 应用", "—", "Food packaging"]],
        "apps": ["Snack bags · 休闲食品袋", "Confectionery packaging · 糖果包装", "Automated form-fill-seal · 自动化制袋包装"]
    },
    "bopp-heatseal-1side": {
        "name": "One Side Heat Sealable Polypropylene Film",
        "name_zh": "单面热封聚丙烯薄膜",
        "category": "BOPP Heat Sealable Film",
        "desc_en": "One-side heat sealable BOPP film for specific packaging requirements where only one sealed surface is needed. Ideal for specialized packaging applications.",
        "desc_zh": "单面热封BOPP薄膜，适用于只需要一个封合表面的特定包装要求。适合专业包装应用。",
        "features": ["Heat sealable one side · 单面可热封", "Good seal strength · 良好封合强度", "Versatile applications · 多功能应用", "Excellent clarity · 优异透明度", "Good printability · 良好印刷适性"],
        "specs": [["Thickness · 厚度", "μm", "15-40"], ["Sealing Side · 封合面", "—", "One side"], ["Heat Seal Temp · 热封温度", "°C", "100-140"], ["Application · 应用", "—", "Specialized packaging"], ["Width · 幅宽", "mm", "Custom"]],
        "apps": ["Specialty wrapping · 特种包装", "Lamination applications · 复合应用", "Specific packaging needs · 特定包装需求"]
    },
    "bopp-heatseal-small": {
        "name": "BOPP Smaller Rolls CLEAR",
        "name_zh": "BOPP小卷透明热封膜",
        "category": "BOPP Heat Sealable Film",
        "desc_en": "Heat sealable BOPP film supplied in smaller roll format for specialty applications and smaller production runs. Clear grade for product visibility.",
        "desc_zh": "以较小卷规格供应的热封BOPP薄膜，适用于特种应用和小批量生产。透明级别，便于产品可见。",
        "features": ["Smaller roll format · 较小卷规格", "Clear/transparent · 透明", "Heat sealable · 可热封", "Suitable for small production · 适合小批量生产", "Easy to handle · 易于操作"],
        "specs": [["Format · 形式", "—", "Small rolls"], ["Clarity · 透明度", "—", "Clear"], ["Sealing · 封合", "—", "Heat sealable"], ["Application · 应用", "—", "Specialty"], ["Thickness · 厚度", "μm", "15-40"]],
        "apps": ["Small production runs · 小批量生产", "Specialty packaging · 特种包装", "Sample production · 样品生产"]
    }
}

# HTML template
HTML_TEMPLATE = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>{name} | {name_zh} | AEC GROUP</title>
<meta name="description" content="{name} - High quality BOPP film products from AEC GROUP, China's leading manufacturer."/>
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
<span style="color:var(--ice)">{name}</span>
</div>
<section><div class="container">
<a href="index.html#bopp" class="back-btn">← Back to BOPP Products</a>
<div class="sec-label">{category}</div>
<h1 class="sec-title">{name}</h1>
<div class="sec-zh">{name_zh}</div>

<div class="desc-block">
<div class="desc-en">{desc_en}</div>
<div class="desc-zh">{desc_zh}</div>
</div>

<div class="sec-label">Features · 特性</div>
<div class="app-grid">{features_html}</div>

<div class="sec-label">Applications · 应用领域</div>
<div class="app-grid">{apps_html}</div>

<div class="sec-label">Specifications · 规格参数</div>
<table class="spec-table"><thead><tr><th>Parameter · 参数</th><th>Unit · 单位</th><th>Value · 数值</th></tr></thead><tbody>{specs_html}</tbody></table>

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

def update_product(product_id, data):
    """Update a single product page"""
    filepath = os.path.join(r"C:\Users\DELL\Desktop\files", f"{product_id}.html")

    if not os.path.exists(filepath):
        print(f"File not found: {product_id}.html")
        return

    features_html = '\n'.join([f'<span class="app-pill">{f}</span>' for f in data['features']])
    specs_html = '\n'.join([f'<tr><td>{s[0]}</td><td>{s[1]}</td><td>{s[2]}</td></tr>' for s in data['specs']])
    apps_html = '\n'.join([f'<span class="app-pill">{a}</span>' for a in data['apps']])

    html = HTML_TEMPLATE.format(
        name=data['name'],
        name_zh=data['name_zh'],
        category=data['category'],
        desc_en=data['desc_en'],
        desc_zh=data['desc_zh'],
        features_html=features_html,
        specs_html=specs_html,
        apps_html=apps_html
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)

    print(f"Updated: {product_id}.html")

def main():
    """Update all products in PRODUCTS_DATA"""
    for product_id, data in PRODUCTS_DATA.items():
        update_product(product_id, data)
    print("\nDone! All product pages updated.")

if __name__ == "__main__":
    main()
