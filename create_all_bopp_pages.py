#!/usr/bin/env python3
"""
Generate ALL BOPP product detail pages for AEC GROUP
"""

import os

# Complete product data for all BOPP products
bopp_products = [
    # ========== BOPP Printing & Laminating Film ==========
    {
        "id": "bopp-plain",
        "name": "BOPP PLAIN FILM",
        "name_zh": "BOPP普通薄膜",
        "tag": "BOPP PLAIN FILM",
        "title": "Plain BOPP Film (Bi-axially Oriented PolyPropylene) For Printing And Lamination",
        "desc_en": "As one of the largest professionally specialized BOPP manufacturers in China, we will do our best to meet your multi-demands. BOPP Plain Film is our flagship product with consistent quality and competitive pricing.",
        "desc_zh": "作为中国最大的专业BOPP制造商之一，我们将尽力满足您的多种需求。BOPP普通薄膜是我们的旗舰产品，质量稳定，价格具有竞争力。",
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
        "properties_en": "High transparency and gloss<br>High tensile strength<br>High grease barrier<br>Excellent ink and coating adhesion<br>Low static electricity<br>Superior thickness uniformity<br>Smooth rolling and neat ends",
        "apps_en": ["Printing · 印刷", "Lamination · 复合", "Carton overwrap · 纸箱外包装", "Flower packaging · 花卉包装"],
        "category": "BOPP Printing & Laminating Film"
    },
    {
        "id": "bopp-bag-grade",
        "name": "BOPP Bag Grade Film",
        "name_zh": "BOPP袋级薄膜",
        "tag": "BOPP Bag Grade Film",
        "title": "BOPP Film Specially Designed For Bag Making Applications",
        "desc_en": "Specially designed BOPP film for bag making applications with excellent seal strength, clarity and heat sealability. Ideal for high-speed bag production lines.",
        "desc_zh": "专为制袋应用设计的BOPP薄膜，具有优异的封合强度、透明度和热封性能。适合高速制袋生产线。",
        "usage_en": "Specially designed for bag making with excellent seal strength and clarity.",
        "usage_zh": "专为制袋设计，具有优异的封合强度和透明度。",
        "features": [
            "Excellent heat seal strength · 优异热封强度",
            "High clarity and transparency · 高透明度",
            "Good slip properties · 良好爽滑性",
            "High stiffness · 高挺度",
            "Excellent printability · 优异印刷适性",
            "Consistent thickness · 厚度均匀"
        ],
        "specs": [
            ["Thickness · 厚度", "μm", "15-40"],
            ["Width · 幅宽", "mm", "Custom"],
            ["Heat Seal Strength · 热封强度", "N/15mm", "≥3"],
            ["Heat Seal Temperature · 热封温度", "°C", "100-140"],
            ["Coefficient of Friction · 摩擦系数", "—", "0.1-0.3"],
            ["Haze · 雾度", "%", "≤2.5"]
        ],
        "loading_en": "Standard export packing. Contact us for specific loading details.",
        "properties_en": "Excellent seal strength<br>High clarity<br>Good slip<br>High stiffness<br>Excellent printability<br>Consistent thickness",
        "apps_en": ["Bag making · 制袋包装", "Food packaging bags · 食品包装袋", "High-speed bag lines · 高速制袋线"],
        "category": "BOPP Printing & Laminating Film"
    },
    {
        "id": "bopp-tape-grade",
        "name": "BOPP TAPE-GRADE FILM",
        "name_zh": "BOPP胶带级薄膜",
        "tag": "BOPP TAPE-GRADE FILM",
        "title": "Base BOPP Film For Adhesive Tape Manufacturing",
        "desc_en": "Base BOPP film specifically engineered for adhesive tape manufacturing. Provides consistent thickness, tensile strength and dimensional stability required for high-speed coating and slitting into finished tape products.",
        "desc_zh": "专为胶带制造设计的BOPP基膜，提供一致的厚度、抗张强度和尺寸稳定性，适用于高速涂胶和分切加工。",
        "usage_en": "Base film for manufacturing packing tape, masking tape and other adhesive tape products.",
        "usage_zh": "用于制造封箱胶带、美纹纸胶带和其他胶带产品的基膜。",
        "features": [
            "Consistent thickness · 厚度一致",
            "High tensile strength · 高抗张强度",
            "Excellent dimensional stability · 优异尺寸稳定性",
            "Smooth surface · 表面平整",
            "Good adhesion · 良好粘性",
            "Suitable for high-speed coating · 适合高速涂布"
        ],
        "specs": [
            ["Thickness · 厚度", "μm", "18-50"],
            ["Width · 幅宽", "mm", "Custom, mill-width"],
            ["Tensile Strength MD · 纵向拉伸强度", "MPa", "≥150"],
            ["Tensile Strength TD · 横向拉伸强度", "MPa", "≥260"],
            ["Elongation at Break · 断裂伸长率", "%", "≤180"],
            ["Format · 形式", "—", "Jumbo rolls"]
        ],
        "loading_en": "Jumbo rolls for slitting. Contact us for specific loading details.",
        "properties_en": "Consistent thickness<br>High tensile strength<br>Dimensional stability<br>Smooth surface<br>Good adhesion<br>High-speed coating suitable",
        "apps_en": ["Packing tape manufacturing · 封箱胶带生产", "Masking tape production · 美纹纸胶带生产", "Specialty tape products · 特种胶带产品"],
        "category": "BOPP Printing & Laminating Film"
    },
    {
        "id": "bopp-glossy",
        "name": "BOPP Glossy Film 8,10,12,15 Mic",
        "name_zh": "BOPP光亮薄膜",
        "tag": "BOPP Glossy Film",
        "title": "High Gloss BOPP Film For Lamination Applications",
        "desc_en": "High gloss BOPP film optimized for wet and cold lamination of printed paper substrates. Available in specific thicknesses of 8, 10, 12 and 15 micron. Produces brilliant mirror-like finish that enhances print color vibrancy.",
        "desc_zh": "高光亮BOPP薄膜，专为印刷纸张基材的湿式及冷式复合工艺优化。提供8、10、12、15微米特定厚度。呈现镜面光泽效果，提升印刷色彩鲜艳度。",
        "usage_en": "For wet and cold lamination of book covers, brochures, packaging boxes and printed materials.",
        "usage_zh": "用于书籍封面、宣传册、包装盒和印刷品的湿式和冷式复合。",
        "features": [
            "Excellent gloss (≥85 GU) · 优异光泽度",
            "Low haze (≤1.5%) · 低雾度",
            "High clarity · 高透明度",
            "Excellent adhesion · 优异附着力",
            "Smooth surface · 表面光滑",
            "Available in specific thicknesses · 特定厚度可选"
        ],
        "specs": [
            ["Thickness · 厚度", "μm", "8 / 10 / 12 / 15"],
            ["Gloss (45°) · 光泽度", "GU", "≥85"],
            ["Haze · 雾度", "%", "≤1.5"],
            ["Light Transmittance · 透光率", "%", "≥87"],
            ["Width · 幅宽", "mm", "250-1000"],
            ["Lamination Type · 复合类型", "—", "Wet / Cold lamination"]
        ],
        "loading_en": "Standard export packing. Contact us for specific loading details.",
        "properties_en": "Excellent gloss<br>Low haze<br>High clarity<br>Excellent adhesion<br>Smooth surface<br>Specific thicknesses",
        "apps_en": ["Book & magazine covers · 书籍及杂志封面", "Brochure lamination · 宣传册覆膜", "Packaging box surface · 包装盒表面"],
        "category": "BOPP Printing & Laminating Film"
    },
    {
        "id": "bopp-matte",
        "name": "BOPP Matte Film 10,12,15,18 Mic",
        "name_zh": "BOPP哑光薄膜",
        "tag": "BOPP Matte Film",
        "title": "Matte Finish BOPP Film For Premium Packaging",
        "desc_en": "Specialty BOPP lamination film with fine matte surface texture that produces a soft, premium, low-glare finish. Available in 10, 12, 15 and 18 micron thicknesses. Popular in high-end retail packaging and publishing.",
        "desc_zh": "特种BOPP复合薄膜，表面经精细哑光处理，呈现柔和、高档、低反光效果。提供10、12、15、18微米厚度。广泛应用于高端零售包装及出版印刷。",
        "usage_en": "For premium packaging, high-end book covers, brochures and publishing applications.",
        "usage_zh": "用于高端包装、高档书籍封面、宣传册和出版应用。",
        "features": [
            "Low-sheen matte finish · 低光泽哑光效果",
            "Premium appearance · 高档外观",
            "Fingerprint resistant · 防指纹",
            "Excellent printability · 优异印刷适性",
            "Soft touch feel · 柔软触感",
            "Anti-glare properties · 防眩光"
        ],
        "specs": [
            ["Thickness · 厚度", "μm", "10 / 12 / 15 / 18"],
            ["Surface Finish · 表面效果", "—", "Low-sheen matte"],
            ["Gloss (45°) · 光泽度", "GU", "60-75"],
            ["Fingerprint Resistance · 防指纹", "—", "Excellent"],
            ["Lamination Type · 复合类型", "—", "Wet / Dry lamination"],
            ["Width · 幅宽", "mm", "Custom"]
        ],
        "loading_en": "Standard export packing. Contact us for specific loading details.",
        "properties_en": "Low-sheen matte finish<br>Premium appearance<br>Fingerprint resistant<br>Excellent printability<br>Soft touch<br>Anti-glare",
        "apps_en": ["Premium packaging boxes · 高端包装盒", "High-end book covers · 高档书籍封面", "Cosmetic packaging · 化妆品包装"],
        "category": "BOPP Printing & Laminating Film"
    },
    {
        "id": "bopp-antifog",
        "name": "BOPP anti-fog film",
        "name_zh": "BOPP防雾薄膜",
        "tag": "BOPP Anti-Fog Film",
        "title": "Anti-Fog BOPP Film For Food Packaging",
        "desc_en": "BOPP film with anti-fog properties designed for food packaging applications. Maintains clarity in humid conditions and prevents fogging that can obscure product visibility.",
        "desc_zh": "具有防雾性能的BOPP薄膜，专为食品包装应用设计。在潮湿环境下保持清晰度，防止起雾影响产品可见度。",
        "usage_en": "For food packaging, fresh produce, refrigerated products and applications requiring clarity in humid conditions.",
        "usage_zh": "用于食品包装、生鲜、冷藏产品和需要在潮湿环境下保持清晰度的应用。",
        "features": [
            "Anti-fog properties · 防雾性能",
            "Maintains clarity in humidity · 潮湿环境保持透明",
            "Food grade · 食品级",
            "Excellent transparency · 优异透明度",
            "Good heat sealability · 良好热封性",
            "Prevents moisture condensation · 防止水汽凝结"
        ],
        "specs": [
            ["Property · 特性", "—", "Anti-fog"],
            ["Grade · 等级", "—", "Food grade"],
            ["Clarity · 透明度", "—", "Maintained in humidity"],
            ["Thickness · 厚度", "μm", "15-50"],
            ["Application · 应用", "—", "Food packaging"],
            ["Width · 幅宽", "mm", "Custom"]
        ],
        "loading_en": "Standard export packing. Contact us for specific loading details.",
        "properties_en": "Anti-fog properties<br>Maintains clarity<br>Food grade<br>Excellent transparency<br>Good heat sealability<br>Prevents condensation",
        "apps_en": ["Fresh food packaging · 生鲜食品包装", "Refrigerated food display · 冷藏食品展示", "Produce packaging · 农产品包装"],
        "category": "BOPP Printing & Laminating Film"
    },
    {
        "id": "bopp-perforated",
        "name": "BOPP PERFORATED FILM",
        "name_zh": "BOPP打孔薄膜",
        "tag": "BOPP Perforated Film",
        "title": "Perforated BOPP Film For Ventilation Packaging",
        "desc_en": "Perforated BOPP film with controlled hole patterns for ventilation packaging applications. Allows air circulation while maintaining product protection.",
        "desc_zh": "具有受控孔洞图案的打孔BOPP薄膜，用于透气包装应用。允许空气流通，同时保持产品保护。",
        "usage_en": "For ventilation packaging of fresh produce, flowers and products requiring air circulation.",
        "usage_zh": "用于需要空气流通的生鲜农产品、花卉等透气包装。",
        "features": [
            "Controlled hole patterns · 受控孔洞图案",
            "Allows air circulation · 允许空气流通",
            "Maintains product protection · 保持产品保护",
            "Custom hole sizes available · 可定制孔洞尺寸",
            "Good strength · 良好强度",
            "Suitable for automated packaging · 适合自动化包装"
        ],
        "specs": [
            ["Type · 类型", "—", "Perforated"],
            ["Pattern · 图案", "—", "Custom patterns"],
            ["Hole Size · 孔洞尺寸", "mm", "Custom"],
            ["Ventilation · 透气", "—", "Controlled"],
            ["Application · 应用", "—", "Ventilation packaging"],
            ["Thickness · 厚度", "μm", "15-50"]
        ],
        "loading_en": "Standard export packing. Contact us for specific loading details.",
        "properties_en": "Controlled hole patterns<br>Air circulation<br>Product protection<br>Custom hole sizes<br>Good strength<br>Automated packaging suitable",
        "apps_en": ["Produce packaging · 农产品包装", "Fruit & vegetable bags · 水果蔬菜袋", "Industrial ventilation · 工业透气包装"],
        "category": "BOPP Printing & Laminating Film"
    },
    {
        "id": "bopp-antistatic",
        "name": "BOPP anti static film",
        "name_zh": "BOPP抗静电薄膜",
        "tag": "BOPP Anti-Static Film",
        "title": "Anti-Static BOPP Film For Electronics Packaging",
        "desc_en": "BOPP film with anti-static treatment for electronics and sensitive product packaging. Prevents static buildup that can damage electronic components or attract dust.",
        "desc_zh": "具有抗静电处理的BOPP薄膜，用于电子元件及敏感产品包装。防止静电积累损坏电子元件或吸附灰尘。",
        "usage_en": "For electronics packaging, sensitive components, and applications requiring static prevention.",
        "usage_zh": "用于电子元件包装、敏感元件和需要防静电的应用。",
        "features": [
            "Anti-static treatment · 抗静电处理",
            "Prevents static buildup · 防止静电积累",
            "Protects electronic components · 保护电子元件",
            "Dust resistant · 防尘",
            "Surface resistance controlled · 表面电阻受控",
            "Permanent anti-static properties · 永久抗静电性能"
        ],
        "specs": [
            ["Treatment · 处理", "—", "Anti-static"],
            ["Surface Resistance · 表面电阻", "Ω", "10^9-10^12"],
            ["Application · 应用", "—", "Electronics packaging"],
            ["Property · 特性", "—", "Static prevention"],
            ["Thickness · 厚度", "μm", "15-50"],
            ["Width · 幅宽", "mm", "Custom"]
        ],
        "loading_en": "Standard export packing. Contact us for specific loading details.",
        "properties_en": "Anti-static treatment<br>Prevents static buildup<br>Protects electronics<br>Dust resistant<br>Controlled resistance<br>Permanent properties",
        "apps_en": ["Electronics packaging · 电子元件包装", "Sensitive product wrapping · 敏感产品包装", "Industrial component bags · 工业元件袋"],
        "category": "BOPP Printing & Laminating Film"
    },

    # ========== BOPP Heat Sealable Film ==========
    {
        "id": "bopp-heatseal-2side",
        "name": "two sides Heat sealable Polypropylene film",
        "name_zh": "双面热封聚丙烯薄膜",
        "tag": "BOPP Heat Sealable Film (Two Sides)",
        "title": "Two Sides Heat Sealable BOPP Film For Food Packaging",
        "desc_en": "Co-extruded multilayer BOPP film with heat sealable layers on both sides. Provides versatile sealing options for various packaging applications. Excellent hot-tack strength for high-speed production.",
        "desc_zh": "共挤多层BOPP薄膜，两面均具有热封层。为各种包装应用提供多功能封合选择。优异的热粘强度，适合高速生产。",
        "usage_en": "For food packaging, snack bags, confectionery and automated form-fill-seal lines.",
        "usage_zh": "用于食品包装、休闲食品袋、糖果包装和自动化制袋包装线。",
        "features": [
            "Heat sealable both sides · 双面可热封",
            "Excellent hot-tack strength · 优异热粘强度",
            "Wide sealing temperature range · 宽热封温度范围",
            "Good seal strength · 良好封合强度",
            "Suitable for high-speed lines · 适合高速生产线",
            "Food grade · 食品级"
        ],
        "specs": [
            ["Thickness · 厚度", "μm", "15-40"],
            ["Heat Seal Temperature · 热封温度", "°C", "100-140"],
            ["Heat Seal Strength · 热封强度", "N/15mm", "≥3"],
            ["Sealing Sides · 封合面", "—", "Both sides"],
            ["Hot Tack · 热粘强度", "—", "Excellent"],
            ["Application · 应用", "—", "Food packaging"]
        ],
        "loading_en": "Standard export packing. Contact us for specific loading details.",
        "properties_en": "Heat sealable both sides<br>Excellent hot-tack<br>Wide sealing range<br>Good seal strength<br>High-speed suitable<br>Food grade",
        "apps_en": ["Snack bags · 休闲食品袋", "Confectionery packaging · 糖果包装", "Automated form-fill-seal · 自动化制袋包装"],
        "category": "BOPP Heat Sealable Film"
    },
    {
        "id": "bopp-heatseal-1side",
        "name": "one side Heat sealable Polypropylene film",
        "name_zh": "单面热封聚丙烯薄膜",
        "tag": "BOPP Heat Sealable Film (One Side)",
        "title": "One Side Heat Sealable BOPP Film For Specialty Packaging",
        "desc_en": "One-side heat sealable BOPP film for specific packaging requirements where only one sealed surface is needed. Ideal for specialized packaging applications.",
        "desc_zh": "单面热封BOPP薄膜，适用于只需要一个封合表面的特定包装要求。适合专业包装应用。",
        "usage_en": "For specialty wrapping, lamination applications and specific packaging needs.",
        "usage_zh": "用于特种包装、复合应用和特定包装需求。",
        "features": [
            "Heat sealable one side · 单面可热封",
            "Good seal strength · 良好封合强度",
            "Versatile applications · 多功能应用",
            "Excellent clarity · 优异透明度",
            "Good printability · 良好印刷适性",
            "Custom specifications available · 可定制规格"
        ],
        "specs": [
            ["Thickness · 厚度", "μm", "15-40"],
            ["Sealing Side · 封合面", "—", "One side"],
            ["Heat Seal Temp · 热封温度", "°C", "100-140"],
            ["Application · 应用", "—", "Specialized packaging"],
            ["Width · 幅宽", "mm", "Custom"],
            ["Length · 卷长", "m", "Custom"]
        ],
        "loading_en": "Standard export packing. Contact us for specific loading details.",
        "properties_en": "Heat sealable one side<br>Good seal strength<br>Versatile applications<br>Excellent clarity<br>Good printability<br>Custom specs available",
        "apps_en": ["Specialty wrapping · 特种包装", "Lamination applications · 复合应用", "Specific packaging needs · 特定包装需求"],
        "category": "BOPP Heat Sealable Film"
    },
    {
        "id": "bopp-heatseal-small",
        "name": "BOPP smaller rolls CLEAR",
        "name_zh": "BOPP小卷透明热封膜",
        "tag": "BOPP Heat Sealable Film (Small Rolls)",
        "title": "Heat Sealable BOPP Film In Smaller Roll Format",
        "desc_en": "Heat sealable BOPP film supplied in smaller roll format for specialty applications and smaller production runs. Clear grade for product visibility.",
        "desc_zh": "以较小卷规格供应的热封BOPP薄膜，适用于特种应用和小批量生产。透明级别，便于产品可见。",
        "usage_en": "For small production runs, specialty applications and sample production.",
        "usage_zh": "用于小批量生产、特种应用和样品生产。",
        "features": [
            "Smaller roll format · 较小卷规格",
            "Clear/transparent · 透明",
            "Heat sealable · 可热封",
            "Suitable for small production · 适合小批量生产",
            "Easy to handle · 易于操作",
            "Custom sizes available · 可定制尺寸"
        ],
        "specs": [
            ["Format · 形式", "—", "Small rolls"],
            ["Clarity · 透明度", "—", "Clear"],
            ["Sealing · 封合", "—", "Heat sealable"],
            ["Application · 应用", "—", "Specialty"],
            ["Thickness · 厚度", "μm", "15-40"],
            ["Width · 幅宽", "mm", "Custom small"]
        ],
        "loading_en": "Standard export packing. Contact us for specific loading details.",
        "properties_en": "Smaller roll format<br>Clear/transparent<br>Heat sealable<br>Small production suitable<br>Easy to handle<br>Custom sizes",
        "apps_en": ["Small production runs · 小批量生产", "Specialty packaging · 特种包装", "Sample production · 样品生产"],
        "category": "BOPP Heat Sealable Film"
    },

    # ========== BOPP Flower Wrapping Film ==========
    {
        "id": "bopp-flower-color-printed",
        "name": "BOPP COLOR PRINTED FLOWER WRAPPING FILM",
        "name_zh": "BOPP彩色印刷花卉包装膜",
        "tag": "BOPP Color Printed Flower Wrapping Film",
        "title": "Color Printed BOPP Film For Attractive Flower Wrapping",
        "desc_en": "Color printed BOPP film with attractive designs for flower wrapping. Multiple color options available to enhance visual appeal of floral arrangements.",
        "desc_zh": "具有精美设计的彩色印刷BOPP薄膜，用于花卉包装。提供多种颜色选择，增强