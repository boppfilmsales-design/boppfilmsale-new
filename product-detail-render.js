// ============================================================
// product-detail-render.js  v3.0
// Universal product detail renderer for AEC GROUP
//
// Works in TWO modes:
//   1. Named page  e.g. bopp-antistatic.html
//      → matches product where detailLink === current filename
//   2. Generic page  product.html?id=123
//      → matches product by numeric id
//
// Reads data from window.productsData (products-data.js)
// ============================================================

(function () {
  'use strict';

  /* ─── helpers ─────────────────────────────────────────── */
  function esc(s) {
    if (!s) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function stripHtml(html) {
    if (!html) return '';
    return html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/?(p|div|li|h[1-6]|tr|td|th)[^>]*>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  /* ─── find the product ────────────────────────────────── */
  function findProduct() {
    if (typeof window.productsData === 'undefined') return null;
    var products = window.productsData.products || [];

    // Mode 2: ?id=
    var params = new URLSearchParams(window.location.search);
    var idParam = params.get('id');
    if (idParam) {
      var numId = parseInt(idParam, 10);
      return products.find(function (p) { return p.id === numId; }) || null;
    }

    // Mode 1: match by filename
    // ★ 兼容旧站遗留的 "xxx_zh.html" / "xxx-zh.html" 独立中文页面：
    //   现在的详情页模板本身就是中英双语同页显示的（见下方 nameZh/descZh 渲染），
    //   不再需要为每个产品单独维护一份中文页面。但旧版网站/旧链接/收藏夹里
    //   可能还留着大量 "xxx_zh.html" 这样的历史文件或链接，如果不做兼容，
    //   这些页面会因为文件名和 products-data.js 里存的 detailLink（没有 _zh 后缀）
    //   对不上，而全部显示"产品未找到"，造成"网站里所有产品链接都打不开"的假象。
    //   这里做兼容：去掉文件名末尾的 "_zh"/"-zh" 再重新匹配一次。
    var page = window.location.pathname.split('/').pop() || '';
    if (!page || page === 'product.html') return null;
    var pageLower = page.toLowerCase();
    var pageNoLangSuffix = pageLower.replace(/[_-]zh(\.html?)$/, '$1');
    return products.find(function (p) {
      if (!p.detailLink) return false;
      var link = p.detailLink.trim().toLowerCase();
      return link === pageLower || link === pageNoLangSuffix;
    }) || null;
  }

  /* ─── find category info ──────────────────────────────── */
  function findCategory(catId) {
    if (!catId || typeof window.productsData === 'undefined') return null;
    return (window.productsData.categories || []).find(function (c) { return c.id === catId; }) || null;
  }

  function findParentCategory(cat) {
    if (!cat || !cat.parentId || typeof window.productsData === 'undefined') return null;
    return (window.productsData.categories || []).find(function (c) { return c.id === cat.parentId; }) || null;
  }

  /* ─── filmstrip ticker update ─────────────────────────── */
  function updateFilmstrip(product) {
    var track = document.querySelector('.fs-track');
    if (!track) return;
    var items = [
      product.nameEn || '',
      product.nameZh || '',
      'AEC GROUP · HEFEI CHINA',
      product.nameEn || '',
      product.nameZh || '',
      'AEC GROUP · HEFEI CHINA'
    ].filter(Boolean);
    track.innerHTML = items.map(function (t) {
      return '<span class="fs-hole"></span><span class="fs-txt">' + esc(t) + '</span>';
    }).join('');
  }

  /* ─── page <title> & meta ─────────────────────────────── */
  function updateMeta(product) {
    var title = (product.nameEn || 'Product') +
      (product.nameZh ? ' | ' + product.nameZh : '') +
      ' | AEC GROUP – Packaging Films';
    document.title = title;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) {
      var plainDesc = stripHtml(product.descEn || '').substring(0, 160);
      desc.setAttribute('content', plainDesc || title);
    }
  }

  /* ─── build breadcrumb ────────────────────────────────── */
  function buildBreadcrumb(product, cat, parentCat) {
    var crumbs = [
      { label: 'Home', href: 'index.html' },
      { label: 'Products', href: 'products.html' }
    ];
    if (parentCat) crumbs.push({ label: parentCat.nameEn, href: 'products.html#' + parentCat.id });
    if (cat) crumbs.push({ label: cat.nameEn, href: 'products.html#' + cat.id });
    crumbs.push({ label: product.nameEn });

    return '<nav class="pdr-breadcrumb" aria-label="Breadcrumb">' +
      crumbs.map(function (c, i) {
        if (i === crumbs.length - 1) {
          return '<span class="pdr-bc-current">' + esc(c.label) + '</span>';
        }
        return '<a href="' + esc(c.href) + '" class="pdr-bc-link">' + esc(c.label) + '</a>' +
          '<span class="pdr-bc-sep">›</span>';
      }).join('') +
      '</nav>';
  }

  /* ─── build specs pills ───────────────────────────────── */
  function buildSpecPills(product) {
    var pills = [];
    if (product.thickness) pills.push(product.thickness);
    (product.specs || []).forEach(function (s) { if (s) pills.push(s); });
    if (!pills.length) return '';
    return '<div class="pdr-spec-pills">' +
      pills.map(function (s) {
        return '<span class="pdr-pill">' + esc(s) + '</span>';
      }).join('') +
      '</div>';
  }

  /* ─── sanitise admin rich HTML for display ────────────── */
  // Keeps the HTML but neutralises any inline styles that break dark theme
  function sanitiseRich(html) {
    if (!html) return '';
    // Remove white/light backgrounds pasted from the admin editor (page bg here is already light)
    return html
      .replace(/background-color\s*:\s*(?:white|#fff|#ffffff|rgb\(255\s*,\s*255\s*,\s*255\))[^;"']*/gi, '')
      // Text pasted as white/near-white is invisible on this light page — force dark
      .replace(/color\s*:\s*(?:white|#fff|#ffffff|rgb\(255\s*,\s*255\s*,\s*255\))[^;"']*/gi, 'color:#2d3748')
      .replace(/color\s*:\s*rgb\(\s*(2[2-5][0-9]|19[0-9])\s*,\s*(2[2-5][0-9]|19[0-9])\s*,\s*(2[2-5][0-9]|19[0-9])\s*\)[^;"']*/gi, 'color:#2d3748')
      .replace(/font-size\s*:\s*(\d+)px/gi, function (m, n) {
        // Scale down oversized font from admin editor
        var size = parseInt(n, 10);
        if (size > 20) size = Math.round(size * 0.65);
        return 'font-size:' + size + 'px';
      });
  }

  /* ─── build the full HTML ─────────────────────────────── */
  function buildDetailHtml(product, cat, parentCat) {
    var icon = (cat && cat.icon) || '📦';
    var catName = (cat && cat.nameEn) || '';
    var hasImage = product.image && !product.image.startsWith('blob:');
    var hasDescEn = product.descEn && product.descEn.trim();
    var hasDescZh = product.descZh && product.descZh.trim();
    var hasTechSpecs = product.techSpecs && product.techSpecs.trim();
    var hasApplications = product.applicationsEn && product.applicationsEn.trim();
    var hasPackaging = product.packagingEn && product.packagingEn.trim();

    /* hero section */
    var imageHtml = hasImage
      ? '<div class="pdr-hero-img"><img src="' + esc(product.image) + '" alt="' + esc(product.nameEn) + '" loading="lazy"/></div>'
      : '<div class="pdr-hero-img pdr-hero-img--icon"><span class="pdr-hero-icon">' + icon + '</span></div>';

    var priceHtml = product.price
      ? '<div class="pdr-price">' + esc(product.price) + '</div>'
      : '';

    var heroHtml =
      '<div class="pdr-hero">' +
        '<div class="pdr-hero-inner container">' +
          imageHtml +
          '<div class="pdr-hero-info">' +
            buildBreadcrumb(product, cat, parentCat) +
            (catName ? '<div class="pdr-tag"><span>' + esc(catName) + '</span></div>' : '') +
            '<h1 class="pdr-title">' + esc(product.nameEn) +
              (product.nameZh ? '<span class="pdr-title-zh">' + esc(product.nameZh) + '</span>' : '') +
            '</h1>' +
            buildSpecPills(product) +
            priceHtml +
            '<div class="pdr-cta-row">' +
              '<a href="contact.html?product=' + esc(encodeURIComponent(product.nameEn)) +
                '" class="pdr-btn-quote">Get Quote 询价 →</a>' +
              '<a href="https://wa.me/8618919659471?text=' +
                encodeURIComponent('Hello, I\'m interested in ' + (product.nameEn || '') + '. Please send details.') +
                '" class="pdr-btn-wa" target="_blank" rel="noopener">💬 WhatsApp</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    /* content sections */
    var sections = '';

    // Description tabs (EN / ZH)
    if (hasDescEn || hasDescZh) {
      var tabButtons = '';
      var tabPanels = '';
      if (hasDescEn) {
        tabButtons += '<button class="pdr-tab active" onclick="pdrTab(this,\'pdr-desc-en\')">English</button>';
        tabPanels += '<div class="pdr-tab-panel active" id="pdr-desc-en"><div class="pdr-rich-content">' + sanitiseRich(product.descEn) + '</div></div>';
      }
      if (hasDescZh) {
        tabButtons += '<button class="pdr-tab' + (hasDescEn ? '' : ' active') + '" onclick="pdrTab(this,\'pdr-desc-zh\')">中文</button>';
        tabPanels += '<div class="pdr-tab-panel' + (hasDescEn ? '' : ' active') + '" id="pdr-desc-zh"><div class="pdr-rich-content">' + sanitiseRich(product.descZh) + '</div></div>';
      }
      sections +=
        '<div class="pdr-section">' +
          '<h2 class="pdr-section-title">📋 Product Description · 产品描述</h2>' +
          '<div class="pdr-tabs">' + tabButtons + '</div>' +
          tabPanels +
        '</div>';
    }

    // Tech specs
    if (hasTechSpecs) {
      sections +=
        '<div class="pdr-section">' +
          '<h2 class="pdr-section-title">📊 Technical Specifications · 技术规格</h2>' +
          '<div class="pdr-rich-content pdr-tech-table">' + sanitiseRich(product.techSpecs) + '</div>' +
        '</div>';
    }

    // Applications
    if (hasApplications) {
      var appZhHtml = (product.applicationsZh && product.applicationsZh.trim())
        ? '<div class="pdr-app-zh pdr-rich-content">' + sanitiseRich(product.applicationsZh) + '</div>'
        : '';
      sections +=
        '<div class="pdr-section">' +
          '<h2 class="pdr-section-title">🏭 Applications · 应用领域</h2>' +
          '<div class="pdr-rich-content">' + sanitiseRich(product.applicationsEn) + '</div>' +
          appZhHtml +
        '</div>';
    }

    // Packaging / MOQ
    if (hasPackaging) {
      sections +=
        '<div class="pdr-section">' +
          '<h2 class="pdr-section-title">📦 Packaging & Delivery · 包装与交货</h2>' +
          '<div class="pdr-rich-content">' + sanitiseRich(product.packagingEn) +
            ((product.packagingZh && product.packagingZh.trim())
              ? '<hr class="pdr-divider"/>' + sanitiseRich(product.packagingZh) : '') +
          '</div>' +
        '</div>';
    }

    // If nothing at all, show placeholder
    if (!sections) {
      sections =
        '<div class="pdr-section">' +
          '<div class="pdr-empty">更多详细信息正在完善中，请联系我们获取完整规格。<br>' +
          'More information coming soon. Please contact us for full specifications.</div>' +
        '</div>';
    }

    /* enquiry CTA banner */
    var ctaBanner =
      '<div class="pdr-contact-banner">' +
        '<div class="pdr-contact-banner-inner container">' +
          '<div class="pdr-contact-banner-text">' +
            '<h3>Ready to order? · 准备下单？</h3>' +
            '<p>Contact our team for pricing, samples and technical support</p>' +
          '</div>' +
          '<div class="pdr-contact-banner-actions">' +
            '<a href="mailto:sale@boppfilmsale.com?subject=' +
              encodeURIComponent('Inquiry: ' + (product.nameEn || '')) +
              '" class="pdr-btn-email">✉ Email Us</a>' +
            '<a href="contact.html" class="pdr-btn-contact">Send Enquiry →</a>' +
          '</div>' +
        '</div>' +
      '</div>';

    return heroHtml +
      '<div class="pdr-body container">' + sections + '</div>' +
      ctaBanner;
  }

  /* ─── inject styles ───────────────────────────────────── */
  function injectStyles() {
    if (document.getElementById('pdr-styles')) return;
    var s = document.createElement('style');
    s.id = 'pdr-styles';
    s.textContent = `
/* ── Product Detail Render Styles ── */
.pdr-breadcrumb { display:flex; flex-wrap:wrap; align-items:center; gap:4px; font-size:12px; margin-bottom:16px; }
.pdr-bc-link { color:var(--gold,#e8c66a); text-decoration:none; }
.pdr-bc-link:hover { text-decoration:underline; }
.pdr-bc-sep { color:var(--text2,#a0aab0); }
.pdr-bc-current { color:var(--text2,#a0aab0); }

.pdr-hero { background:linear-gradient(135deg,var(--bg2,#0d1f14) 0%,var(--bg,#0a190f) 100%); border-bottom:1px solid var(--border,rgba(40,240,100,.15)); padding:60px 0 48px; }
.pdr-hero-inner { display:flex; gap:48px; align-items:flex-start; }
.pdr-hero-img { flex:0 0 360px; max-width:360px; border-radius:16px; overflow:hidden; border:1px solid var(--border,rgba(40,240,100,.15)); background:rgba(255,255,255,.03); aspect-ratio:4/3; display:flex; align-items:center; justify-content:center; }
.pdr-hero-img img { width:100%; height:100%; object-fit:cover; display:block; }
.pdr-hero-img--icon { background:rgba(40,240,100,.06); }
.pdr-hero-icon { font-size:80px; }
.pdr-hero-info { flex:1; min-width:0; }
.pdr-tag span { display:inline-block; background:rgba(40,240,100,.12); color:var(--green,#28f064); font-size:11px; font-weight:600; letter-spacing:.08em; text-transform:uppercase; padding:4px 12px; border-radius:20px; margin-bottom:14px; border:1px solid rgba(40,240,100,.25); }
.pdr-title { font-family:'Playfair Display',serif; font-size:clamp(22px,3vw,38px); font-weight:700; line-height:1.2; margin:0 0 8px; color:var(--text,#fff); }
.pdr-title-zh { display:block; font-family:'Inter',sans-serif; font-size:clamp(14px,1.6vw,20px); font-weight:400; color:var(--text2,#a0aab0); margin-top:6px; }
.pdr-spec-pills { display:flex; flex-wrap:wrap; gap:8px; margin:16px 0; }
.pdr-pill { background:rgba(255,255,255,.06); border:1px solid var(--border,rgba(40,240,100,.15)); color:var(--text2,#a0aab0); font-size:12px; font-family:'JetBrains Mono',monospace; padding:5px 12px; border-radius:6px; }
.pdr-price { font-family:'Playfair Display',serif; font-size:22px; color:var(--gold,#e8c66a); font-weight:700; margin:12px 0 20px; }
.pdr-cta-row { display:flex; gap:12px; flex-wrap:wrap; margin-top:24px; }
.pdr-btn-quote { display:inline-block; padding:14px 28px; background:linear-gradient(135deg,var(--green,#28f064),#00a86b); color:#0a190f; font-weight:700; font-size:14px; border-radius:8px; text-decoration:none; transition:all .2s; }
.pdr-btn-quote:hover { filter:brightness(1.1); transform:translateY(-1px); }
.pdr-btn-wa { display:inline-block; padding:14px 24px; background:rgba(37,211,102,.15); color:#25d366; border:1px solid rgba(37,211,102,.35); font-weight:600; font-size:14px; border-radius:8px; text-decoration:none; transition:all .2s; }
.pdr-btn-wa:hover { background:rgba(37,211,102,.25); }

.pdr-body { padding:48px 0 64px; }
.pdr-section { background:rgba(255,255,255,.03); border:1px solid var(--border,rgba(40,240,100,.15)); border-radius:16px; margin-bottom:24px; overflow:hidden; }
.pdr-section-title { font-family:'Playfair Display',serif; font-size:18px; font-weight:700; color:var(--gold,#e8c66a); padding:18px 28px; border-bottom:1px solid var(--border,rgba(40,240,100,.12)); margin:0; background:rgba(40,240,100,.04); }
.pdr-tabs { display:flex; gap:0; border-bottom:1px solid var(--border,rgba(40,240,100,.12)); background:rgba(40,240,100,.04); }
.pdr-tab { padding:12px 24px; background:none; border:none; border-bottom:2px solid transparent; color:var(--text2,#5a6470); font-size:14px; font-weight:600; cursor:pointer; transition:all .2s; font-family:'Inter',sans-serif; }
.pdr-tab:hover { color:var(--text,#1a202c); }
.pdr-tab.active { color:var(--green,#1a7a4a); border-bottom-color:var(--green,#1a7a4a); }
.pdr-tab-panel { display:none; }
.pdr-tab-panel.active { display:block; }

.pdr-rich-content { padding:28px; color:var(--text,#2d3748); line-height:1.7; font-size:15px; }
.pdr-rich-content h1,.pdr-rich-content h2,.pdr-rich-content h3 { color:var(--gold,#b8860b); margin-top:1em; }
.pdr-rich-content table { border-collapse:collapse; width:100%; margin:12px 0; font-size:13px; }
.pdr-rich-content table td, .pdr-rich-content table th { border:1px solid var(--border,rgba(40,150,90,.25)); padding:8px 12px; color:var(--text,#2d3748); }
.pdr-rich-content table th, .pdr-rich-content table tr:first-child td { background:rgba(40,150,90,.08); font-weight:600; color:var(--green,#1a7a4a); }
.pdr-rich-content table tr:hover td { background:rgba(40,150,90,.05); }
.pdr-rich-content ul,.pdr-rich-content ol { padding-left:20px; margin:8px 0; }
.pdr-rich-content li { margin:4px 0; }
.pdr-rich-content p { margin:0.6em 0; }
.pdr-rich-content br + br { display:none; }
.pdr-divider { border:none; border-top:1px solid var(--border,rgba(40,240,100,.15)); margin:20px 0; }
.pdr-empty { padding:40px; text-align:center; color:var(--text2,#5a6470); font-size:14px; line-height:1.8; }
.pdr-app-zh { border-top:1px solid var(--border,rgba(40,240,100,.12)); }
.pdr-tech-table { overflow-x:auto; }

.pdr-contact-banner { background:linear-gradient(135deg,rgba(40,240,100,.12),rgba(40,240,100,.04)); border-top:1px solid rgba(40,240,100,.2); border-bottom:1px solid rgba(40,240,100,.2); padding:40px 0; }
.pdr-contact-banner-inner { display:flex; align-items:center; justify-content:space-between; gap:24px; flex-wrap:wrap; }
.pdr-contact-banner-text h3 { font-family:'Playfair Display',serif; font-size:22px; color:var(--text,#14311f); margin:0 0 6px; }
.pdr-contact-banner-text p { font-size:14px; color:var(--text2,#3f5747); margin:0; }
.pdr-contact-banner-actions { display:flex; gap:12px; flex-wrap:wrap; }
.pdr-btn-email { display:inline-block; padding:12px 24px; background:rgba(20,49,31,.08); border:1px solid var(--border,rgba(40,150,90,.3)); color:var(--text,#14311f); font-size:14px; font-weight:600; border-radius:8px; text-decoration:none; transition:all .2s; }
.pdr-btn-email:hover { background:rgba(20,49,31,.14); }
.pdr-btn-contact { display:inline-block; padding:12px 24px; background:linear-gradient(135deg,var(--green,#28f064),#00a86b); color:#0a190f; font-size:14px; font-weight:700; border-radius:8px; text-decoration:none; transition:all .2s; }
.pdr-btn-contact:hover { filter:brightness(1.1); }

.pdr-not-found { text-align:center; padding:120px 24px; }
.pdr-not-found-icon { font-size:64px; margin-bottom:20px; }
.pdr-not-found h2 { font-family:'Playfair Display',serif; font-size:28px; color:var(--text,#fff); margin:0 0 12px; }
.pdr-not-found p { color:var(--text2,#a0aab0); font-size:15px; margin:0 0 24px; }
.pdr-not-found a { display:inline-block; padding:12px 28px; background:rgba(40,240,100,.15); color:var(--green,#28f064); border:1px solid rgba(40,240,100,.3); border-radius:8px; text-decoration:none; font-weight:600; }
.pdr-not-found a:hover { background:rgba(40,240,100,.25); }

@media(max-width:768px){
  .pdr-hero-inner { flex-direction:column; gap:24px; }
  .pdr-hero-img { flex:none; max-width:100%; width:100%; aspect-ratio:16/9; }
  .pdr-contact-banner-inner { flex-direction:column; text-align:center; }
  .pdr-cta-row { flex-direction:column; }
  .pdr-btn-quote,.pdr-btn-wa { text-align:center; }
}
    `;
    document.head.appendChild(s);
  }

  /* ─── tab switch ──────────────────────────────────────── */
  window.pdrTab = function (btn, panelId) {
    var tabs = btn.closest('.pdr-section').querySelectorAll('.pdr-tab');
    var panels = btn.closest('.pdr-section').querySelectorAll('.pdr-tab-panel');
    tabs.forEach(function (t) { t.classList.remove('active'); });
    panels.forEach(function (p) { p.classList.remove('active'); });
    btn.classList.add('active');
    var panel = document.getElementById(panelId);
    if (panel) panel.classList.add('active');
  };

  /* ─── render ──────────────────────────────────────────── */
  function render() {
    var container = document.getElementById('productDetailContainer');
    if (!container) return;

    injectStyles();

    if (typeof window.productsData === 'undefined') {
      container.innerHTML =
        '<div class="pdr-not-found container">' +
          '<div class="pdr-not-found-icon">⚠️</div>' +
          '<h2>Data Not Loaded</h2>' +
          '<p>products-data.js 未加载。请检查文件是否存在于 aec-project 文件夹中。</p>' +
          '<a href="products.html">← Back to Products</a>' +
        '</div>';
      return;
    }

    var product = findProduct();

    if (!product) {
      container.innerHTML =
        '<div class="pdr-not-found container">' +
          '<div class="pdr-not-found-icon">🔍</div>' +
          '<h2>Product Not Found · 产品未找到</h2>' +
          '<p>This product may have been moved or the URL is incorrect.<br>' +
          '此产品可能已移动或链接有误。</p>' +
          '<a href="products.html">← Browse All Products</a>' +
        '</div>';
      return;
    }

    var cat = findCategory(product.category);
    var parentCat = findParentCategory(cat);

    updateMeta(product);
    updateFilmstrip(product);
    container.innerHTML = buildDetailHtml(product, cat, parentCat);
  }

  /* ─── init ────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }

})();
