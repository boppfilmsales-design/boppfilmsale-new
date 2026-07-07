// ============================================================
// products-render.js  v4.0 — PERMANENT CATEGORY STRUCTURE
// ============================================================
// 核心设计原则：
//   左侧导航 = 完整分类树（无论分类下有没有产品都显示）
//   右侧产品区 = 按分类树结构渲染，空分类显示占位提示
//   分类结构 = 永远从 products-data.js 的 categories 读取，不受产品数量影响
// ============================================================

function escapeHtmlR(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function safeDescHtml(html) {
  if (!html) return '';
  if (html.indexOf('<') === -1) return escapeHtmlR(html);
  var plain = html
    .replace(/<br\s*\/?>/gi,' ')
    .replace(/<\/?(p|div|li|h[1-6])[^>]*>/gi,' ')
    .replace(/<[^>]+>/g,'')
    .replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"')
    .replace(/\s+/g,' ').trim();
  if (plain.length > 120) plain = plain.substring(0,120) + '…';
  return escapeHtmlR(plain);
}

// ── 产品卡片 ────────────────────────────────────────────────
function resolveProductLink(p) {
  if (p.detailLink && p.detailLink.trim()) return p.detailLink.trim();
  return 'product.html?id=' + p.id;
}

function safeImgSrc(src) {
  if (!src) return '';
  if (src.startsWith('http') || src.startsWith('data:')) return src;
  return src.replace(/ /g, '%20');
}

function buildProductCardHtml(p, category) {
  var icon = (category && category.icon) || '📦';
  var tag  = (category && category.nameEn) || '';
  var nameCombined = escapeHtmlR(p.nameEn) + (p.nameZh ? ' | ' + escapeHtmlR(p.nameZh) + ' | Aec Group' : ' | Aec Group');
  var specsHtml = (p.specs || []).map(function(s){ return '<span class="tech-spec-pill">'+escapeHtmlR(s)+'</span>'; }).join('');
  var thicknessHtml = p.thickness ? '<span class="tech-spec-pill">'+escapeHtmlR(p.thickness)+'</span>' : '';
  var link = resolveProductLink(p);
  var hasRealImage = p.image && !p.image.startsWith('blob:') && p.image.trim();
  var imageHtml = hasRealImage
    ? '<img src="'+escapeHtmlR(safeImgSrc(p.image))+'" alt="'+escapeHtmlR(p.nameEn)+'" loading="lazy" onerror="this.parentNode.innerHTML=\'<div class=tech-icon>'+icon+'</div>\'" style="width:100%;height:100%;object-fit:cover;border-radius:8px"/>'
    : '<div class="tech-icon">'+icon+'</div>';
  return '<div class="tech-card" onclick="window.location.href=\''+escapeHtmlR(link)+'\'" style="cursor:pointer">'+
    '<div class="tech-card-img">'+imageHtml+'</div>'+
    '<div class="tech-card-body">'+
      '<span class="tech-card-tag">'+escapeHtmlR(tag)+'</span>'+
      '<div class="tech-card-name">'+nameCombined+'</div>'+
      '<div class="tech-card-name-zh"></div>'+
      '<div class="tech-card-desc">'+safeDescHtml(p.descEn||'')+'</div>'+
      '<div class="tech-card-specs">'+thicknessHtml+specsHtml+'</div>'+
      '<div class="tech-card-footer">'+
        '<span class="tech-card-price">'+escapeHtmlR(p.price||'')+'</span>'+
        '<a href="'+escapeHtmlR(link)+'" class="tech-card-btn" onclick="event.stopPropagation()">Details <span class="arrow">→</span></a>'+
      '</div>'+
    '</div>'+
  '</div>';
}

// ── 空分类占位 ───────────────────────────────────────────────
function buildEmptyCatHtml() {
  return '<div class="pcat-empty">'+
    '<span class="pcat-empty-icon">🔜</span>'+
    '<span>Products coming soon · 产品即将上架</span>'+
    '<a href="contact.html" class="pcat-empty-link">Enquire Now →</a>'+
  '</div>';
}

// ── 子分类块（二级/三级叶节点）────────────────────────────────
function buildSubSectionHtml(subCat, products) {
  var zhPart = subCat.nameZh ? '<span class="tech-section-zh">· '+escapeHtmlR(subCat.nameZh)+'</span>' : '';
  var cardsHtml = products.length > 0
    ? products.map(function(p){ return buildProductCardHtml(p, subCat); }).join('')
    : buildEmptyCatHtml();
  var countLabel = products.length > 0 ? products.length + ' Products' : '0';
  return '<div class="tech-subsection" id="'+escapeHtmlR(subCat.id)+'">'+
    '<div class="tech-subsection-header">'+
      '<span class="tech-subsection-icon">'+(subCat.icon||'')+'</span>'+
      '<div><span class="tech-subsection-title">'+escapeHtmlR(subCat.nameEn)+'</span>'+zhPart+'</div>'+
      '<span class="tech-section-count">'+countLabel+'</span>'+
    '</div>'+
    '<div class="pgrid">'+(products.length > 0 ? cardsHtml : '')+'</div>'+
    (products.length === 0 ? buildEmptyCatHtml() : '')+
  '</div>';
}

// ── 顶级分类块 ───────────────────────────────────────────────
function buildParentSectionHtml(parentCat, innerHtml) {
  var zhPart = parentCat.nameZh ? '<span class="tech-section-zh">· '+escapeHtmlR(parentCat.nameZh)+'</span>' : '';
  return '<div class="tech-section" id="'+escapeHtmlR(parentCat.id)+'">'+
    '<div class="tech-section-header">'+
      '<span class="tech-section-icon">'+(parentCat.icon||'')+'</span>'+
      '<div><span class="tech-section-title">'+escapeHtmlR(parentCat.nameEn)+'</span>'+zhPart+'</div>'+
    '</div>'+
    innerHtml+
  '</div>';
}

// ── 独立平铺分类（无子分类）────────────────────────────────────
function buildStandaloneSectionHtml(cat, products) {
  var zhPart = cat.nameZh ? '<span class="tech-section-zh">· '+escapeHtmlR(cat.nameZh)+'</span>' : '';
  var cardsHtml = products.length > 0
    ? products.map(function(p){ return buildProductCardHtml(p, cat); }).join('')
    : '';
  var countLabel = products.length > 0 ? products.length + ' Products' : '0';
  return '<div class="tech-section" id="'+escapeHtmlR(cat.id)+'">'+
    '<div class="tech-section-header">'+
      '<span class="tech-section-icon">'+(cat.icon||'')+'</span>'+
      '<div><span class="tech-section-title">'+escapeHtmlR(cat.nameEn)+'</span>'+zhPart+'</div>'+
      '<span class="tech-section-count">'+countLabel+'</span>'+
    '</div>'+
    '<div class="pgrid">'+cardsHtml+'</div>'+
    (products.length === 0 ? buildEmptyCatHtml() : '')+
  '</div>';
}

// ── 左侧导航栏渲染 ────────────────────────────────────────────
// 完整分类树，不受产品数量影响
function renderCategoryNav(categories, productsByCat, childrenOf) {
  var navEl = document.getElementById('navCatList');
  if (!navEl) return;

  function byOrder(a,b){ return (a.order||0)-(b.order||0); }

  // 统计某分类（含子树）的产品数
  function countTree(catId) {
    var n = (productsByCat[catId]||[]).length;
    (childrenOf[catId]||[]).forEach(function(c){ n += countTree(c.id); });
    return n;
  }

  var parentCats = categories.filter(function(c){ return !c.parentId; }).sort(byOrder);
  var html = '';

  parentCats.forEach(function(parent) {
    var lv2List = (childrenOf[parent.id]||[]).sort(byOrder);
    var totalCount = countTree(parent.id);
    var countBadge = totalCount > 0 ? '<span class="nav-count">'+totalCount+'</span>' : '';

    if (lv2List.length === 0) {
      // 没有子分类，直接链接
      html += '<li class="nci">'+
        '<a class="nci-l1" href="#'+escapeHtmlR(parent.id)+'" onclick="navScrollTo(\''+escapeHtmlR(parent.id)+'\',event)" title="'+escapeHtmlR(parent.nameZh||parent.nameEn)+'">'+
          '<span class="nci-icon">'+(parent.icon||'📦')+'</span>'+
          '<span class="nci-name">'+escapeHtmlR(parent.nameEn)+'</span>'+
          countBadge+
        '</a>'+
      '</li>';
      return;
    }

    // 有子分类 → 可折叠
    var subHtml = '';
    lv2List.forEach(function(lv2) {
      var lv3List = (childrenOf[lv2.id]||[]).sort(byOrder);
      var lv2Count = countTree(lv2.id);
      var lv2Badge = lv2Count > 0 ? '<span class="nav-count nav-count-sm">'+lv2Count+'</span>' : '';

      if (lv3List.length === 0) {
        // lv2 是叶节点
        var anchorId = lv2.id;
        // 如果是 isGroup，锚点指向父分类
        subHtml += '<li class="nci-sub">'+
          '<a class="nci-l2" href="#'+escapeHtmlR(anchorId)+'" onclick="navScrollTo(\''+escapeHtmlR(anchorId)+'\',event)" title="'+escapeHtmlR(lv2.nameZh||lv2.nameEn)+'">'+
            '<span class="nci-icon-sm">'+(lv2.icon||'·')+'</span>'+
            escapeHtmlR(lv2.nameEn)+
            lv2Badge+
          '</a>'+
        '</li>';
      } else {
        // lv2 是分组层（isGroup），有 lv3 子项
        var lv3Html = '';
        lv3List.forEach(function(lv3){
          var lv3Count = (productsByCat[lv3.id]||[]).length;
          var lv3Badge = lv3Count > 0 ? '<span class="nav-count nav-count-sm">'+lv3Count+'</span>' : '';
          lv3Html += '<li class="nci-sub nci-sub-lv3">'+
            '<a class="nci-l3" href="#'+escapeHtmlR(lv3.id)+'" onclick="navScrollTo(\''+escapeHtmlR(lv3.id)+'\',event)" title="'+escapeHtmlR(lv3.nameZh||lv3.nameEn)+'">'+
              '<span class="nci-icon-sm">'+(lv3.icon||'·')+'</span>'+
              escapeHtmlR(lv3.nameEn)+
              lv3Badge+
            '</a>'+
          '</li>';
        });
        subHtml += '<li class="nci-sub nci-sub-group">'+
          '<div class="nci-l2-group">'+
            '<span class="nci-icon-sm">'+(lv2.icon||'▸')+'</span>'+
            escapeHtmlR(lv2.nameEn)+
            lv2Badge+
          '</div>'+
          '<ul class="nci-lv3">'+lv3Html+'</ul>'+
        '</li>';
      }
    });

    html += '<li class="nci nci-has-sub">'+
      '<div class="nci-l1 nci-l1-toggle" onclick="navToggle(this)" data-anchor="'+escapeHtmlR(parent.id)+'" title="'+escapeHtmlR(parent.nameZh||parent.nameEn)+'">'+
        '<span class="nci-icon">'+(parent.icon||'📦')+'</span>'+
        '<span class="nci-name">'+escapeHtmlR(parent.nameEn)+'</span>'+
        countBadge+
        '<span class="nci-arrow">▾</span>'+
      '</div>'+
      '<ul class="nci-children">'+subHtml+'</ul>'+
    '</li>';
  });

  navEl.innerHTML = html;

  // Inject nav styles
  injectNavStyles();
}

window.navScrollTo = function(id, e) {
  if (e) e.preventDefault();
  var el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.classList.add('scroll-hl');
    setTimeout(function(){ el.classList.remove('scroll-hl'); }, 1500);
  }
};

window.navToggle = function(header) {
  var li = header.parentElement;
  var children = li.querySelector('.nci-children');
  var arrow = header.querySelector('.nci-arrow');
  if (!children) return;
  var isOpen = li.classList.toggle('nci-open');
  if (arrow) arrow.style.transform = isOpen ? 'rotate(180deg)' : '';
  // Also scroll to anchor
  var anchor = header.getAttribute('data-anchor');
  if (anchor && isOpen) {
    setTimeout(function(){
      var el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  }
};

function injectNavStyles() {
  if (document.getElementById('nav-cat-style')) return;
  var s = document.createElement('style');
  s.id = 'nav-cat-style';
  s.textContent = `
.nav-cat { list-style:none; padding:0; margin:0; }
.nci { border-bottom:1px solid rgba(0,100,60,.1); }

/* ── L1 顶级分类 ──────────────────────────────────────────────
   字色：深绿色 #0d3d26，悬停高亮用主题青绿色
   字号从 13px → 15px（增大一号）
*/
.nci-l1 {
  display:flex; align-items:center; gap:8px;
  padding:11px 16px; font-size:15px; font-weight:700;
  color:#0d3d26; text-decoration:none; cursor:pointer;
  transition:background .2s, color .2s; border-radius:6px; margin:2px 4px;
}
.nci-l1:hover, .nci-l1-toggle:hover {
  background:rgba(0,150,80,.12);
  color:#006633;
}
.nci-l1.nci-active-l1 {
  background:rgba(0,184,148,.15);
  color:#005c2e;
}

.nci-icon { font-size:17px; flex-shrink:0; }
.nci-name { flex:1; }
.nci-arrow { font-size:10px; transition:transform .25s; flex-shrink:0; color:#3d7a5a; }
.nci-has-sub.nci-open > .nci-l1 .nci-arrow { transform:rotate(180deg); }
.nci-children { list-style:none; padding:0 0 4px 0; display:none; }
.nci-has-sub.nci-open > .nci-children { display:block; }
.nci-sub { }

/* ── L2 二级分类 ──────────────────────────────────────────────
   字色：中深绿 #1a5438，比 L1 稍浅但仍清晰可读
   字号从 12px → 14px（增大一号）
*/
.nci-l2 {
  display:flex; align-items:center; gap:6px;
  padding:8px 14px 8px 34px; font-size:14px; font-weight:500;
  color:#1a5438;
  text-decoration:none; transition:all .15s; border-radius:4px; margin:1px 4px;
}
.nci-l2:hover { color:#005c2e; background:rgba(0,150,80,.1); }
.nci-l2.nci-active { color:#005c2e; background:rgba(0,184,148,.12); font-weight:700; }

.nci-icon-sm { font-size:13px; flex-shrink:0; }

/* ── L2 分组标题（isGroup 层）─────────────────────────────────
   字色：深棕绿，不再用金黄色（在浅绿背景上对比度不够）
   字号从 11px → 13px（增大一号）
*/
.nci-l2-group {
  display:flex; align-items:center; gap:6px;
  padding:8px 14px 4px 34px; font-size:13px; font-weight:800;
  color:#2e7d32; letter-spacing:.05em; text-transform:uppercase;
}

/* ── L3 三级分类 ──────────────────────────────────────────────
   字色：#2d6a4f（中绿，不同于 L1/L2 但同属绿色系，有层次感）
   字号从 11.5px → 13.5px（增大一号）
*/
.nci-lv3 { list-style:none; padding:0; }
.nci-l3 {
  display:flex; align-items:center; gap:6px;
  padding:7px 14px 7px 52px; font-size:13.5px; font-weight:500;
  color:#2d6a4f;
  text-decoration:none; transition:all .15s; border-radius:4px; margin:1px 4px;
}
.nci-l3:hover { color:#005c2e; background:rgba(0,150,80,.1); }
.nci-l3.nci-active { color:#005c2e; background:rgba(0,184,148,.12); font-weight:700; }

/* ── 产品数量角标 ──────────────────────────────────────────────
   背景色改为深绿半透明，字体改成白色——在浅色导航上更明显
*/
.nav-count {
  font-size:11px; background:rgba(0,130,70,.75); color:#fff;
  padding:1px 7px; border-radius:10px; font-weight:700; flex-shrink:0;
}
.nav-count-sm { font-size:10px; padding:1px 5px; }

/* ── 空分类占位符 ──────────────────────────────────────────────*/
.pcat-empty {
  display:flex; align-items:center; gap:12px; padding:20px 24px;
  background:rgba(0,130,70,.04); border:1px dashed rgba(0,130,70,.25);
  border-radius:10px; margin:8px 0; font-size:14px; color:#2d6a4f;
}
.pcat-empty-icon { font-size:20px; }
.pcat-empty-link {
  margin-left:auto; color:#005c2e; text-decoration:none;
  font-size:13px; border:1px solid rgba(0,100,60,.3); padding:4px 12px;
  border-radius:6px; transition:all .2s;
}
.pcat-empty-link:hover { background:rgba(0,100,60,.08); }
`;
  document.head.appendChild(s);
}

// ── 主渲染函数 ────────────────────────────────────────────────
function renderProductCatalog() {
  var container = document.getElementById('productCatalog');
  if (!container) return;

  if (typeof window.productsData === 'undefined') {
    container.innerHTML = '<p style="padding:40px;text-align:center;color:#999">产品数据加载失败，请检查 products-data.js 是否存在</p>';
    return;
  }

  var categories = window.productsData.categories || [];
  var products   = window.productsData.products   || [];

  // 建立分类查找映射
  var catMap = {};
  categories.forEach(function(c){ catMap[c.id] = c; });

  // 分离父/子分类
  var parentCats = categories.filter(function(c){ return !c.parentId; });
  var childCats  = categories.filter(function(c){ return  c.parentId; });

  function byOrder(a,b){ return (a.order||0)-(b.order||0); }
  parentCats.sort(byOrder);

  // 按父分类分组子分类
  var childrenOf = {};
  childCats.forEach(function(c){
    if (!childrenOf[c.parentId]) childrenOf[c.parentId] = [];
    childrenOf[c.parentId].push(c);
  });

  // 只过滤 inactive 的产品（但不过滤空分类）
  var activeProducts = products.filter(function(p){ return p.status === 'active'; });

  // 按分类建立产品索引
  var productsByCat = {};
  activeProducts.forEach(function(p){
    if (!productsByCat[p.category]) productsByCat[p.category] = [];
    productsByCat[p.category].push(p);
  });

  // ─ 渲染左侧导航（完整分类树，包括空分类）─
  renderCategoryNav(categories, productsByCat, childrenOf);

  // ─ 渲染右侧产品区 ─
  var html = '';

  parentCats.forEach(function(parent) {
    var lv2List     = (childrenOf[parent.id]||[]).sort(byOrder);
    var directProds = productsByCat[parent.id] || [];

    if (lv2List.length === 0) {
      // 无子分类 → 平铺
      html += buildStandaloneSectionHtml(parent, directProds);
      return;
    }

    // 检查是否有三级结构（isGroup 层）
    var hasGroupLayer = lv2List.some(function(c){ return c.isGroup; });
    var innerHtml = '';

    // 如果父分类本身也有直属产品（不常见，但兼容）
    if (directProds.length > 0) {
      innerHtml += '<div class="pgrid">' +
        directProds.map(function(p){ return buildProductCardHtml(p, parent); }).join('') +
        '</div>';
    }

    if (hasGroupLayer) {
      // ── 三级结构：顶级 → isGroup → 叶 ─────────────────────
      lv2List.forEach(function(group) {
        var lv3List = (childrenOf[group.id]||[]).sort(byOrder);
        var groupDirectProds = productsByCat[group.id] || [];

        var lv3Html = '';
        if (groupDirectProds.length > 0) {
          lv3Html += '<div class="pgrid">' +
            groupDirectProds.map(function(p){ return buildProductCardHtml(p, group); }).join('') +
            '</div>';
        }
        lv3List.forEach(function(leaf) {
          var leafProds = productsByCat[leaf.id] || [];
          lv3Html += buildSubSectionHtml(leaf, leafProds);
        });
        // 如果 group 既无直属产品又无子分类产品
        if (!lv3Html) lv3Html = buildEmptyCatHtml();

        var zhG = group.nameZh ? '<span class="tech-section-zh">· '+escapeHtmlR(group.nameZh)+'</span>' : '';
        innerHtml +=
          '<div class="tech-group" id="'+escapeHtmlR(group.id)+'">'+
            '<div class="tech-group-header">'+
              '<span class="tech-group-icon">'+(group.icon||'')+'</span>'+
              '<span class="tech-group-title">'+escapeHtmlR(group.nameEn)+'</span>'+zhG+
            '</div>'+
            lv3Html+
          '</div>';
      });
    } else {
      // ── 两级结构：顶级 → 子分类 ──────────────────────────────
      lv2List.forEach(function(sub) {
        var subProds = productsByCat[sub.id] || [];
        innerHtml += buildSubSectionHtml(sub, subProds);
      });
    }

    html += buildParentSectionHtml(parent, innerHtml);
  });

  container.innerHTML = html;

  // 更新统计数字
  var statCat  = document.getElementById('statCatCount');
  var statProd = document.getElementById('statProdCount');
  if (statCat)  statCat.textContent  = parentCats.length;
  if (statProd) statProd.textContent = activeProducts.length;

  // 展开第一个父分类导航
  var firstNavItem = document.querySelector('#navCatList .nci-has-sub');
  if (firstNavItem) {
    firstNavItem.classList.add('nci-open');
    var arrow = firstNavItem.querySelector('.nci-arrow');
    if (arrow) arrow.style.transform = 'rotate(180deg)';
  }

  // Show-more toggle
  applyShowMoreToggle();
}

function applyShowMoreToggle() {
  var VISIBLE_COUNT = 8;
  var grids = document.querySelectorAll('#productCatalog .pgrid');
  grids.forEach(function(grid) {
    var cards = Array.prototype.filter.call(grid.children, function(el){
      return el.classList.contains('tech-card');
    });
    if (cards.length <= VISIBLE_COUNT) return;
    var hiddenCards = cards.slice(VISIBLE_COUNT);
    hiddenCards.forEach(function(card){ card.classList.add('pcard-hidden'); });
    var total = cards.length;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pgrid-showmore-btn';
    btn.innerHTML = '查看全部 '+total+' 个产品 · View All <span class="pgrid-arrow">▼</span>';
    btn.addEventListener('click', function() {
      var isExpanded = btn.classList.contains('is-expanded');
      if (isExpanded) {
        hiddenCards.forEach(function(card){ card.classList.add('pcard-hidden'); });
        btn.classList.remove('is-expanded');
        btn.innerHTML = '查看全部 '+total+' 个产品 · View All <span class="pgrid-arrow">▼</span>';
        grid.scrollIntoView({ behavior:'smooth', block:'start' });
      } else {
        hiddenCards.forEach(function(card){ card.classList.remove('pcard-hidden'); });
        btn.classList.add('is-expanded');
        btn.innerHTML = '收起 · Collapse <span class="pgrid-arrow">▼</span>';
      }
    });
    grid.appendChild(btn);
  });
}

document.addEventListener('DOMContentLoaded', renderProductCatalog);

// ── 三级分类分组层样式 ────────────────────────────────────────
(function injectGroupStyles() {
  if (document.getElementById('tech-group-style')) return;
  var s = document.createElement('style');
  s.id = 'tech-group-style';
  s.textContent = [
    '.tech-group { margin: 0 0 32px 0; }',
    '.tech-group-header {',
    '  display: flex; align-items: center; gap: 10px;',
    '  padding: 14px 20px; margin-bottom: 4px;',
    '  background: rgba(40,240,100,.06);',
    '  border-left: 3px solid var(--green, #28f064);',
    '  border-radius: 0 8px 8px 0;',
    '}',
    '.tech-group-icon { font-size: 18px; }',
    '.tech-group-title {',
    '  font-size: 15px; font-weight: 600;',
    '  color: var(--green, #28f064); letter-spacing: .02em;',
    '}',
    '.tech-group .tech-section-zh {',
    '  font-size: 13px; color: var(--text2, #a0aab0); margin-left: 6px;',
    '}',
    '.tech-group .tech-subsection { margin-top: 0; }',
  ].join('\n');
  document.head.appendChild(s);
})();
