#!/usr/bin/env python3
"""
Create all missing product detail pages
"""

import os

# Template for product pages
TEMPLATE = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>{name} | {name_zh} | AEC GROUP</title>
<meta name="description" content="{name} - {description}"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root{{--bg:#1e0808;--bg-mid:#2d1010;--bg-card:rgba(50,15,15,0.88);--red:#c0392b;--red-light:#e74c3c;--gold:#e8c46a;--gold-light:#f5d98a;--ice:#fff5f5;--slate:#c8a8a8;--white:#ffffff;--border:rgba(232,196,106,0.2);}}
*,*::before,*::after{{box-sizing:border-box;margin:0;padding:0}}html{{scroll-behavior:smooth}}body{{background:var(--bg);color:var(--ice);font-family:'Inter',sans-serif;font-size:15px;line-height:1.7;overflow-x:hidden}}
.filmstrip{{height:24px;background:var(--bg-mid);display:flex;align-items:center;overflow:hidden;position:fixed;top:0;left:0;right:0;z-index:200;border-bottom:1px solid var(--border)}}.fs-track{{display:flex;animation:filmroll 20s linear infinite;white-space:nowrap}}.fs-hole{{width:14px;height:10px;border:1.5px solid var(--gold);border-radius:2px;margin:0 9px;flex-shrink:0;opacity:.45;display:inline-block}}.fs-txt{{font-family:'JetBrains+Mono',monospace;font-size:9.5px;color:var(--gold);letter-spacing:.15em;opacity:.65;padding:0 16px;flex-shrink:0}}@keyframes filmroll{{0%{{transform:translateX(0)}}100%{{transform:translateX(-50%)}}}}
header{{position:fixed;top:24px;left:0;right:0;z-index:100;background:rgba(30,8,8,0.96);backdrop-filter:blur(14px);border-bottom:1px solid var(--border)}}.header-inner{{max-width:1200px;margin:0 auto;padding:0 28px;display:flex;align-items:center;height:60px;gap:24px}}.logo{{flex-shrink:0;text-decoration:none}}.logo-main{{font-family:'Playfair Display',serif;font-size:21px;font-weight:700;color:var(--white);letter-spacing:.03em}}.logo-main span{{color:var(--gold)}}.logo-sub{{font-size:8px;color:var(--slate);letter-spacing:.18em;text-transform:uppercase;margin-top:-2px;display:block}}
nav{{display:flex;align-items:center;gap:1px;flex:1}}.nav-item{{position:relative}}.nav-item>a{{color:var(--slate);text-decoration:none;font-size:12px;font-weight:500;letter-spacing:.04em;padding:6px 11px;border-radius:4px;transition:all .2s;display:flex;align-items:center;gap:4px;cursor:pointer;white-space:nowrap}}.nav-item>a:hover{{color:var(--white);background:rgba(255,255,255,0.07)}}
.breadcrumb{{max-width:1200px;margin:0 auto;padding:100px 24px 16px;font-size:11px;color:var(--slate)}}.breadcrumb a{{color:var(--slate);text-decoration:none}}.breadcrumb a:hover{{color:var(--gold)}}.breadcrumb span{{color:var(--gold)}}
section{{padding:30px 0 50px}}.container{{max-width:1200px;margin:0 auto;padding:0 32px}}.sec-label{{font-family:'JetBrains+Mono',monospace;font-size:9.5px;letter-spacing:.24em;color:var(--gold);text-transform:uppercase;margin-bottom:10px}}.sec-title{{font-family:'Playfair Display',serif;font-size:28px;font-weight:700;color:#fff;line-height:1.15;margin-bottom:7px}}.sec-zh{{font-size:15px;color:var(--slate);margin-bottom:20px;font-weight:300}}
.desc-block{{background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:20px;margin-bottom:20px}}.desc-en{{color:var(--ice);line-height:1.8;margin-bottom:14px}}.desc-zh{{color:var(--gold-light);line-height:1.85}}
.spec-table{{width:100%;border-collapse:collapse;font-size:12px;margin-bottom:20px}}.spec-table th{{background:rgba(192,57,43,.16);color:var(--gold);font-size:10px;letter-spacing:.1em;text-transform:uppercase;padding:10px 14px;text-align:left}}.spec-table td{{padding:9px 14px;color:var(--slate);border-bottom:1px solid rgba(232,196,106,.07)}}
.app-grid{{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px}}.app-pill{{font-size:11px;background:rgba(232,196,106,.07);border:1px solid rgba(232,196,106,.18);color:var(--ice);padding:6px 12px;border-radius:6px}}
footer{{background:var(--bg-mid);border-top:1px solid var(--border);padding:36px 0 18px;text-align:center;font-size:10px;color:var(--slate)}}footer a{{color:var(--gold);text-decoration:none}}
.btn-gold{{background:linear-gradient(135deg,var(--red),var(--red-light));color:#fff;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;padding:8px 18px;border-radius:4px;border:none;cursor:pointer;transition:all .2s;display:inline-block;white-space:nowrap}}.btn-gold:hover{{filter:brightness(1.1);transform:translateY(-1px)}}
.back-btn{{display:inline-flex;align-items:center;gap:6px;color:var(--gold);text-decoration:none;font-size:12px;margin-bottom:20px}}.back-btn:hover{{color:var(--gold-light)}}
/* Floating Contact Sidebar */
.contact-sidebar{{position:fixed;right:0;top:50%;transform:translateY(-50%);z-index:999;display:flex;flex-direction:column;gap:1px;box-shadow:-2px 0 10px rgba(0,0,0,.5)}}
.contact-item{{display:flex;align-items:center;justify-content:center;width:48px;height:48px;background:var(--bg-card);border:1px solid var(--border);transition:all .2s;text-decoration:none;position:relative}}
.contact-item:first-child{{border-radius:8px 0 0 0}}
.contact-item:last-child{{border-radius:0 0 0 8px}}
.contact-item:hover{{width:120px;border-color:var(--gold);background:var(--red)}}
.contact-icon{{font-size:20px;flex-shrink:0}}
.contact-label{{position:absolute;right:55px;white-space:nowrap;font-size:11px;color:var(--ice);opacity:0;transition:opacity .2s;pointer-events:none}}
.contact-item:hover .contact-label{{opacity:1}}
.contact-whatsapp{{background:#25D366}}
.contact-wechat{{background:#07C160}}
.contact-email{{background:#E74C3C}}
.contact-qq{{background:#12B7F5}}
.contact-teams{{background:#6264A7}}
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
<a href="index.html#{category}">{category_name}</a> /
<span style="color:var(--ice)">{name}</span>
</div>
<section><div class="container">
<a href="index.html#{category}" class="back-btn">← Back to {category_name}</a>
<div class="sec-label">{category_name}</div>
<h1 class="sec-title">{name}</h1>
<div class="sec-zh">{name_zh}</div>

<div class="desc-block">
<div class="desc-en">{desc_en}</div>
<div class="desc-zh">{desc_zh}</div>
</div>

<div class="sec-label">Product Keywords · 产品关键词</div>
<div class="app-grid">{keywords}</div>

<div class="sec-label">Specifications · 规格参数</div>
<table class="spec-table">
<thead><tr><th>Parameter · 参数</th><th>Unit · 单位</th><th>Value · 数值</th></tr></thead>
<tbody>
{specs}
</tbody>
</table>

<div class="sec-label">Applications · 应用领域</div>
<div class="app-grid">{apps}</div>

<div style="margin-top:30px;padding-top:20px;border-top:1px solid var(--border)">
<div class="sec-label">Interested in this product?</div>
<a href="index.html#contact" class="btn-gold">Request Quote · 询价</a>
</div>

</div></section>
<!-- Floating Contact Sidebar -->
<div class="contact-sidebar">
<a href="https://wa.me/8618919659471" target="_blank" class="contact-item contact-whatsapp" title="WhatsApp">
<span class="contact-icon">💬</span>
<span class="contact-label">WhatsApp: 18919659471</span>
</a>
<a href="weixin://chat?18919659471" class="contact-item contact-wechat" title="WeChat">
<span class="contact-icon">💚</span>
<span class="contact-label">WeChat: 18919659471</span>
</a>
<a href="mailto:sale@boppfilmsale.com" class="contact-item contact-email" title="Email">
<span class="contact-icon">📧</span>
<span class="contact-label">sale@boppfilmsale.com</span>
</a>
<a href="mqq://im/chat?chat_type=wpa&uin=2538474128" class="contact-item contact-qq" title="QQ">
<span class="contact-icon">🐧</span>
<span class="contact-label">QQ: 2538474128</span>
</a>
<a href="https://teams.microsoft.com/l/chat/0/0?users=boppfilmsales@hotmail.com" target="_blank" class="contact-item contact-teams" title="Teams">
<span class="contact-icon">👥</span>
<span class="contact-label">Teams: boppfilmsales</span>
</a>
</div>

<footer>© 2026 AEC GROUP – Anhui Eastern Communication Imp. &amp; Exp. Co., Ltd. · <a href="https://www.boppfilmsale.com">boppfilmsale.com</a></footer>
<script>
var currentLang=localStorage.getItem('aec-lang')||'zh';
function setLang(l){{localStorage.setItem('aec-lang',l);document.documentElement.lang=l}}
setLang(currentLang);
</script>
</body>
</html>'''

# Product data
products = [
    {
        "id": "bopp-plain-new",
        "name": "BOPP PLAIN FILM",
        "name_zh": "BOPP普通薄膜",
        "category": "bopp",
        "category_name": "BOPP Printing & Laminating Film",
        "description": "Standard BOPP film for general packaging, printing and lamination applications.",
        "desc_en": "Standard BOPP film for general packaging, printing and lamination applications. Versatile grade suitable for carton overwrap, flower packaging, CD/DVD sleeves and general flexible packaging.",
        "desc_zh": "标准BOPP薄膜，适用于通用包装、印刷和复合应用。多功能级别，适用于纸箱外包装、花卉包装、CD/DVD套及通用软包装。",
        "keywords": "<span class=\"app-pill\">BOPP PLAIN FILM</span><span class=\"app-pill\">general packaging</span><span class=\"app-pill\">printing</span><span class=\"app-pill\">lamination</span><span class=\"app-pill\">carton overwrap</span><span class=\"app-pill\">flower packaging</span><span class=\"app-pill\">CD/DVD sleeves</span><span class=\"app-pill\">flexible packaging</span><span class=\"app-pill\">corona treated</span><span class=\"app-pill\">3-75μm</span>",
        "specs": "<tr><td>Thickness · 厚度</td><td>μm</td><td>3-75</td></tr><tr><td>Width · 宽度</td><td>mm</td><td>250-10000</td></tr><tr><td>Tensile Strength</td><td>N/15mm</td><td>≥10</td></tr><tr><td>Haze</td><td>%</td><td>≤1.5</td></tr><tr><td>Gloss</td><td>GU</td><td>≥85</td></tr>",
        "apps": "<span class=\"app-pill\">Carton box overwrap</span><span class=\"app-pill\">Gift & flower wrap</span><span class=\"app-pill\">CD/DVD packaging</span><span class=\"app-pill\">General flexible packaging</span><span class=\"app-pill\">Printing & lamination base</span>"
    },
    # Add more products here...
]

# Create the pages
output_dir = r"C:\Users\DELL\Desktop\files"

for product in products:
    filename = f"{product['id']}.html"
    filepath = os.path.join(output_dir, filename)

    html = TEMPLATE.format(**product)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)

    print(f"Created: {filename}")

print("Done!")
