// =====================================================
// AEC GROUP 本地后台管理系统 v2
// =====================================================

// ★★★ 修复：_blobUrl 污染 products-data.js 的问题 ★★★
// 背景：loadProductImageBlobUrls() 会往 product 对象上挂一个临时字段 p._blobUrl
// （仅用于后台预览图片，值形如 "blob:null/xxxx-xxxx"，只在当次浏览器会话内有效）。
// 之前 getAdminProductsForFrontend() / saveProductsToStorage() 直接引用/序列化
// APP_DATA.products 原对象，导致这个"一次性"字段被一起写进了磁盘上的
// products-data.js 和 localStorage —— 下次打开时会读到一个早已失效的 blob:
// 地址，且 loadProductImageBlobUrls() 一看 p._blobUrl 已经"有值"就跳过刷新，
// 导致图片一直报 "Not allowed to load local resource: blob:null/..." 且永远
// 无法自愈。
// 修复方式：任何"要落盘/存 localStorage/导出"的地方，一律先经过下面这个函数，
// 剥离所有下划线开头的内部临时字段，绝不让它们进入持久化数据。
function stripTransientFields(products) {
  return (products || []).map(function(p) {
    var clean = {};
    for (var key in p) {
      if (Object.prototype.hasOwnProperty.call(p, key) && key.charAt(0) !== '_') {
        clean[key] = p[key];
      }
    }
    return clean;
  });
}

// 数据存储
var APP_DATA = {
  products: [],
  categories: [],
  company: {
    nameEn: 'AEC GROUP',
    nameZh: '安徽东渐进出口有限公司',
    sloganEn: 'Film Technology Redefined',
    sloganZh: '薄膜技术重新定义',
    email: 'sale@boppfilmsale.com',
    phone: '+86 18919659471',
    qq: '2538474128, 156641365',
    addressEn: 'No.1158 Huizhou Ave., Baohe Industrial Dist., Hefei, Anhui, China 230051',
    addressZh: '中国安徽省合肥市包河工业区徽州大道1158号，邮编230051',
    icp: '皖ICP备11005402号'
  },
  headerFooter: {
    header: {
      logoPrimary: 'AEC',
      logoSecondary: 'GROUP',
      logoImage: '',
      logoWidth: 160,
      taglineEn: 'Packaging Film & Materials',
      taglineZh: '包装薄膜与材料',
      topBarVisible: 'yes',
      topEmail: 'sale@boppfilmsale.com',
      topPhone: '+86 18919659471',
      topTextEn: 'Global Packaging Film Supplier Since 2005',
      topTextZh: '全球包装薄膜供应商，始于2005年',
      langSwitchVisible: 'yes',
      defaultLang: 'en',
      langEn: 'EN',
      langZh: '中文',
      scrollBar: 'yes',
      scrollBarColor: '#8b1a2e',
      navItems: [
        { labelEn: 'Home', labelZh: '首页', url: 'index.html' },
        { labelEn: 'Products', labelZh: '产品', url: 'products.html' },
        { labelEn: 'Why Us', labelZh: '关于我们', url: 'why-us.html' },
        { labelEn: 'Specs', labelZh: '规格参数', url: 'specs.html' },
        { labelEn: 'Contact', labelZh: '联系我们', url: 'contact.html' }
      ]
    },
    footer: {
      logoPrimary: 'AEC',
      logoSecondary: 'GROUP',
      aboutEn: 'Professional manufacturer and exporter of BOPP, BOPET, CPP, POF and other specialty packaging films. Committed to delivering high-quality flexible packaging solutions worldwide.',
      aboutZh: '专业生产和出口 BOPP、BOPET、CPP、POF 等特种包装薄膜，致力于向全球提供高质量柔性包装解决方案。',
      contactTitleEn: 'Contact Us',
      contactTitleZh: '联系我们',
      email: 'sale@boppfilmsale.com',
      whatsapp: '+86 18919659471',
      qq: '2538474128, 156641365',
      addressEn: 'No.1158 Huizhou Ave., Baohe Industrial Dist., Hefei, Anhui, China 230051',
      addressZh: '中国安徽省合肥市包河工业区徽州大道1158号',
      quickLinkTitleEn: 'Quick Links',
      quickLinkTitleZh: '快速链接',
      quickLinks: [
        { labelEn: 'Home', labelZh: '首页', url: 'index.html' },
        { labelEn: 'Products', labelZh: '产品中心', url: 'products.html' },
        { labelEn: 'Why Us', labelZh: '关于我们', url: 'why-us.html' },
        { labelEn: 'Specs', labelZh: '技术规格', url: 'specs.html' },
        { labelEn: 'Contact', labelZh: '联系我们', url: 'contact.html' }
      ],
      productsTitleEn: 'Our Products',
      productsTitleZh: '主要产品',
      footerProducts: [
        { labelEn: 'BOPP Film', labelZh: 'BOPP薄膜', url: 'products.html' },
        { labelEn: 'BOPET Film', labelZh: 'BOPET薄膜', url: 'products.html' },
        { labelEn: 'CPP Film', labelZh: 'CPP流延膜', url: 'products.html' },
        { labelEn: 'POF Shrinkage Film', labelZh: 'POF收缩膜', url: 'products.html' },
        { labelEn: 'PVDC Coating Film', labelZh: 'PVDC涂布膜', url: 'products.html' }
      ],
      copyrightEn: '© 2024 AEC GROUP. All Rights Reserved.',
      copyrightZh: '© 2024 安徽东渐进出口有限公司 版权所有',
      icp: '皖ICP备11005402号',
      icpLink: 'https://beian.miit.gov.cn/',
      socialVisible: 'yes',
      socialWhatsapp: 'https://wa.me/8618919659471',
      socialLinkedin: '',
      socialFacebook: '',
      socialYoutube: '',
      madeinChina: '',
      certBadges: '',
      friendLinksVisible: 'yes',
      friendLinkTitleEn: 'Friend Links',
      friendLinkTitleZh: '友情链接',
      friendLinks: [
        { icon: '📝', labelEn: '东渐博客官网 / Blog web', labelZh: '东渐博客官网', url: 'https://dongjian.blog' },
        { icon: '🌐', labelEn: '网站旧版本 / Old version', labelZh: '网站旧版本', url: 'https://v1.boppfilmsale.com' },
        { icon: '🔄', labelEn: '网站第二版 / The second version', labelZh: '网站第二版', url: 'https://v2.boppfilmsale.com' },
        { icon: '📊', labelEn: 'CNZZ', labelZh: 'CNZZ', url: 'https://www.cnzz.com' },
        { icon: '🔗', labelEn: 'Admin / 后台管理', labelZh: '后台管理', url: 'https://boppfilmsale-new.vercel.app/admin/index.html' },
        { icon: '📊', labelEn: 'CNZZTV', labelZh: 'CNZZTV', url: 'https://cnzztv.com/dashboard' }
      ]
    }
  }
};

// 当前筛选状态
var FILTER = { search: '', category: '', status: '' };
var NEXT_ID = 10000; // 用于新增产品时的自动ID

// 初始化
document.addEventListener('DOMContentLoaded', async function() {
  await restoreFolderHandle();
  loadData();
  initNavigation();
  initForms();
  initFilters();
  updateDashboard();
  renderProductsTable();
  renderCategoriesTable();
  loadCompanyInfo();
  // 图片blob URL异步加载（需要文件夹已连接）
  loadProductImageBlobUrls();

  if (window._aecDataLooksIncomplete) {
    showDataIncompleteBanner();
  }

  // 支持 index.html?page=products 这样的深链接直接跳转到指定标签页
  // （用于从 product_edit.html 等独立页面"返回"时，精确回到来源列表，而不是首页仪表盘）
  var urlParams = new URLSearchParams(window.location.search);
  var targetPage = urlParams.get('page');
  if (targetPage && document.getElementById('page-' + targetPage)) {
    navigateTo(targetPage);
    // 清理地址栏中的查询参数，避免刷新页面时反复跳转、也避免地址栏显得凌乱
    window.history.replaceState({}, document.title, window.location.pathname);
  }
});

// ★ 数据看起来不完整时，在页面顶部插入一条醒目的、不会自动消失的横幅提示，
//   避免用户在没注意到 toast 一闪而过的情况下继续操作、甚至保存/同步覆盖磁盘。
function showDataIncompleteBanner() {
  if (document.getElementById('aecDataIncompleteBanner')) return;
  var banner = document.createElement('div');
  banner.id = 'aecDataIncompleteBanner';
  banner.style.cssText = 'position:sticky;top:0;left:0;right:0;z-index:9999;background:#5a1010;color:#ffdcdc;padding:12px 20px;font-size:13px;line-height:1.6;border-bottom:2px solid #ff5252;';
  var lastGood = (typeof window.ProductsSyncGuard !== 'undefined') ? window.ProductsSyncGuard.getLastKnownGoodCount() : '?';
  banner.innerHTML = '⚠️ <strong>当前加载到的产品数量（' + APP_DATA.products.length + ' 个）明显少于本机历史记录（' + lastGood + ' 个）。</strong>' +
    '这通常说明"网站文件夹"没连接对、或浏览器缓存被清空 —— 当前看到的可能不是真实的完整数据。' +
    '在核实清楚之前，请不要点击"保存"或"同步到前端网站"，以免覆盖真实数据。' +
    '<button onclick="confirmCurrentCountAsBaseline()" style="margin-left:12px;background:rgba(40,240,100,.15);border:1px solid var(--green);color:var(--green);border-radius:4px;padding:2px 10px;cursor:pointer;font-weight:600">✅ 我已核实，这就是正确数据</button>' +
    '<button onclick="document.getElementById(\'aecDataIncompleteBanner\').remove()" style="margin-left:8px;background:transparent;border:1px solid #ff5252;color:#ffdcdc;border-radius:4px;padding:2px 10px;cursor:pointer">暂时忽略（仍不允许保存）</button>';
  document.body.insertBefore(banner, document.body.firstChild);
}

// 用户在页面上点击"我已核实，这就是正确数据"后调用：
// 把当前产品数量设为新的历史基准值，之后的保存/同步不会再因为这次的"下降"被拦截。
// 这不会绕过安全检查本身——下次如果数量再次异常骤降，还是会正常拦截，
// 只是这一次确认过的数字，被显式记录成了"这就是对的"。
function confirmCurrentCountAsBaseline() {
  if (typeof window.ProductsSyncGuard === 'undefined') return;
  var n = APP_DATA.products.length;
  if (!confirm('确认当前 ' + n + ' 个产品就是正确、完整的最新数据吗？\n\n确认后，这个数字会成为新的基准值，以后保存/同步不会再因为这次的数量变化被拦截。')) return;
  window.ProductsSyncGuard.setBaseline(n);
  window._aecDataLooksIncomplete = false;
  var banner = document.getElementById('aecDataIncompleteBanner');
  if (banner) banner.remove();
  showToast('✅ 已确认，基准值已更新为 ' + n + ' 个');
}

// ============ 数据加载 ============
function loadData() {
  // ── 防止"分类越存越少"的自我修复机制 ─────────────────────────────────────
  // 如果 localStorage 里保存的分类数量 < getDefaultCategories() 的数量，
  // 说明上一轮写盘时数据不完整，直接清除旧的分类缓存，让下面的逻辑
  // 重新从 getDefaultCategories() 里加载完整数据。
  try {
    var savedCatsRaw = localStorage.getItem('aecAdmin_categories');
    if (savedCatsRaw) {
      var savedCatsParsed = JSON.parse(savedCatsRaw);
      var defaultCount = getDefaultCategories().length;
      if (savedCatsParsed.length < defaultCount) {
        localStorage.removeItem('aecAdmin_categories');
        console.warn('[AEC Admin] 分类缓存不完整(' + savedCatsParsed.length + '<' + defaultCount + ')，已自动清除，将重新加载完整分类树。');
      }
    }
  } catch(e) { /* ignore */ }
  // ──────────────────────────────────────────────────────────────────────────

  // 1. 从 products-data.js 获取完整产品目录和分类
  var sourceProducts = [];
  var sourceCategories = [];

  if (typeof window.productsData !== 'undefined') {
    sourceCategories = window.productsData.categories || [];
    sourceProducts = window.productsData.products || [];
  }

  // 1.5 迁移旧版数据（如果存在）
  try {
    var oldData = localStorage.getItem('aecAdminData');
    if (oldData) {
      var parsed = JSON.parse(oldData);
      if (parsed.products && parsed.products.length > 0 && !localStorage.getItem('aecAdmin_products')) {
        localStorage.setItem('aecAdmin_products', JSON.stringify(parsed.products));
      }
      if (parsed.categories && parsed.categories.length > 0 && !localStorage.getItem('aecAdmin_categories')) {
        localStorage.setItem('aecAdmin_categories', JSON.stringify(parsed.categories));
      }
      if (parsed.company && !localStorage.getItem('aecAdmin_company')) {
        localStorage.setItem('aecAdmin_company', JSON.stringify(parsed.company));
      }
    }
  } catch(e) { /* ignore migration errors */ }

  // 2. 从 localStorage 读取用户修改
  var savedProducts = null;
  var savedCategories = null;
  var savedCompany = null;
  var savedHeaderFooter = null;
  var deletedIds = {};
  try {
    var saved = localStorage.getItem('aecAdmin_products');
    if (saved) savedProducts = JSON.parse(saved);
    saved = localStorage.getItem('aecAdmin_categories');
    if (saved) savedCategories = JSON.parse(saved);
    saved = localStorage.getItem('aecAdmin_company');
    if (saved) savedCompany = JSON.parse(saved);
    saved = localStorage.getItem('aecAdmin_headerFooter');
    if (saved) savedHeaderFooter = JSON.parse(saved);
    // 已删除产品的 ID “墓碑”列表：防止刷新时从源数据 products-data.js 里把已删除的产品重新加回来
    saved = localStorage.getItem('aecAdmin_deletedIds');
    if (saved) {
      JSON.parse(saved).forEach(function(id) { deletedIds[id] = true; });
    }
  } catch (e) {
    showToast('无法读取本地缓存，将使用默认数据', 'error');
  }

  // 3. 合并数据：用户修改优先，源数据补充
  // ── 分类：以 getDefaultCategories()（规范完整树）为基础 ────────────────────
  // 不能用 sourceCategories（products-data.js 里的）做基础，因为它可能已经
  // 因为之前写盘时丢失了深层子类而变成一个残缺版本。
  // 正确做法：始终以 getDefaultCategories() 为权威基础，用户在后台手动
  // 修改/新增的分类（存在 localStorage）叠加其上。
  var baseCats = getDefaultCategories();
  var baseCatIds = {};
  baseCats.forEach(function(c) { baseCatIds[c.id] = true; });

  if (savedCategories && savedCategories.length > 0) {
    var savedCatMap = {};
    savedCategories.forEach(function(c) { savedCatMap[c.id] = c; });
    // 先用 default 为骨架，用 saved 版本覆盖（保留用户改过的 icon/nameZh 等）
    var mergedCats = baseCats.map(function(c) {
      return savedCatMap[c.id] || c;
    });
    // 追加用户手动新增的分类（ID 不在 default 里）
    savedCategories.forEach(function(c) {
      if (!baseCatIds[c.id]) mergedCats.push(c);
    });
    APP_DATA.categories = mergedCats;
  } else if (sourceCategories && sourceCategories.length > 0) {
    // localStorage 完全为空（初次使用）：以 default 为基础，source 补充没有的
    var sourceCatMap = {};
    sourceCategories.forEach(function(c) { sourceCatMap[c.id] = c; });
    APP_DATA.categories = baseCats.map(function(c) {
      return sourceCatMap[c.id] || c;
    });
    // source 里有 default 没有的分类也保留（用户之前自行添加并已写盘的）
    sourceCategories.forEach(function(c) {
      if (!baseCatIds[c.id] && !APP_DATA.categories.some(function(m){ return m.id === c.id; })) {
        APP_DATA.categories.push(c);
      }
    });
  } else {
    APP_DATA.categories = baseCats;
  }

  // 产品：磁盘 / 源数据（products-data.js）才是唯一权威来源。
  // 之前这里写反了——只要某个产品 ID 在浏览器缓存(localStorage)里存在，
  // 就无条件用缓存版本覆盖磁盘版本，哪怕磁盘上的内容更新、更完整。
  // 一旦缓存里残留旧版本（比如某次"重新连接文件夹"没有真正生效），
  // 就会在你毫无察觉的情况下，把已经保存到磁盘的新内容换回旧版本。
  // 现在改为：磁盘/源数据里已经存在的产品，永远以磁盘为准；
  // localStorage 缓存只用来补充"磁盘上还没有、但本地新建/编辑过"的产品
  // （比如还没连接文件夹、只能先存缓存的情况）。
  var mergedProducts = [];
  var sourceIds = {};
  if (sourceProducts.length > 0) {
    sourceProducts.forEach(function(p) {
      sourceIds[p.id] = true;
      if (!deletedIds[p.id]) mergedProducts.push(p);
    });
  }
  if (savedProducts && savedProducts.length > 0) {
    savedProducts.forEach(function(p) {
      // 只有磁盘/源数据里没有这个 ID 时，才采用缓存版本；
      // 磁盘已有的产品不再被缓存悄悄替换。
      if (!sourceIds[p.id] && !deletedIds[p.id]) {
        mergedProducts.push(p);
      } else if (sourceIds[p.id]) {
        console.info('[AEC Admin] 产品 #' + p.id + ' 磁盘上已有数据，忽略浏览器缓存里的旧版本。');
      }
    });
  }
  APP_DATA.products = mergedProducts.length > 0 ? mergedProducts : getDefaultProducts();
  // 防御性清理：初始加载时也顺手清掉可能残留的 _blobUrl（见 stripTransientFields 说明）
  APP_DATA.products.forEach(function(p) { delete p._blobUrl; });

  // 公司信息
  if (savedCompany) {
    APP_DATA.company = savedCompany;
  }

  // 页眉页脚
  if (savedHeaderFooter) {
    APP_DATA.headerFooter = savedHeaderFooter;
  }

  // 计算下一个可用 ID
  var maxId = 0;
  APP_DATA.products.forEach(function(p) { if (p.id > maxId) maxId = p.id; });
  NEXT_ID = maxId + 1;

  // 兜底：如果 categories 仍为空，用完整 default 树
  if (APP_DATA.categories.length === 0) {
    APP_DATA.categories = getDefaultCategories();
  }

  // ── 数据健康检查 ─────────────────────────────────────────────
  // 记录本机见过的历史最高产品数量（只升不降），供 products-sync-guard.js
  // 在写盘前做"骤降拦截"用。同时如果当前加载到的数量远低于历史记录，
  // 在界面上明显提示用户"这可能不是完整数据"，而不是让用户误以为产品真的丢了
  // 或者更糟：在不知情的情况下把这份缩水数据保存/同步覆盖回磁盘。
  try {
    if (typeof window.ProductsSyncGuard !== 'undefined') {
      var lastGood = window.ProductsSyncGuard.getLastKnownGoodCount();
      if (lastGood >= 10 && APP_DATA.products.length < lastGood * 0.8) {
        window._aecDataLooksIncomplete = true;
        console.warn('[AEC Admin] 当前加载到 ' + APP_DATA.products.length + ' 个产品，' +
          '低于历史记录 ' + lastGood + ' 个。很可能是网站文件夹未连接/连接错误，' +
          '或浏览器缓存被清空。在确认数据完整前，请不要点击"保存"或"同步到前端网站"。');
      } else {
        window.ProductsSyncGuard.recordGoodCount(APP_DATA.products.length);
      }
    }
  } catch (e) { /* ignore */ }
}

// ============ 分类树形结构辅助函数 ============

// 获取某分类的所有直接子分类
function getCategoryChildren(parentId) {
  return APP_DATA.categories
    .filter(function(c) { return (c.parentId || null) === (parentId || null); })
    .sort(function(a, b) { return (a.order || 0) - (b.order || 0); });
}

// 获取某分类的所有后代分类 id（用于防止把分类挂到自己的子孙下面形成循环）
function getDescendantIds(catId) {
  var result = [];
  var children = getCategoryChildren(catId);
  children.forEach(function(child) {
    result.push(child.id);
    result = result.concat(getDescendantIds(child.id));
  });
  return result;
}

// 获取某分类从顶级到自身的完整路径，例如 [BOPP Film, Plain Film]
function getCategoryPath(catId) {
  var path = [];
  var current = APP_DATA.categories.find(function(c) { return c.id === catId; });
  var guard = 0;
  while (current && guard < 10) {
    path.unshift(current);
    current = current.parentId ? APP_DATA.categories.find(function(c) { return c.id === current.parentId; }) : null;
    guard++;
  }
  return path;
}

// 获取某分类的层级深度（顶级 = 0）
function getCategoryDepth(catId) {
  return getCategoryPath(catId).length - 1;
}

// 递归生成扁平化、带缩进的分类列表，用于下拉框 (select) 渲染
// excludeIds: 需要排除的分类 id 列表（及其所有后代），常用于防止把分类设为自己的子分类
function getFlatCategoryList(parentId, excludeIds, depth) {
  excludeIds = excludeIds || [];
  depth = depth || 0;
  var result = [];
  getCategoryChildren(parentId).forEach(function(cat) {
    if (excludeIds.indexOf(cat.id) > -1) return;
    result.push({ cat: cat, depth: depth });
    result = result.concat(getFlatCategoryList(cat.id, excludeIds, depth + 1));
  });
  return result;
}

function getDefaultCategories() {
  return [
    { id: 'boppfilm-cat', nameEn: 'BOPP Film', nameZh: '双向拉伸聚丙烯薄膜', icon: '🎞️', order: 1, parentId: null },
    { id: 'bopetfilm-cat', nameEn: 'BOPET Film', nameZh: '双向拉伸聚酯薄膜', icon: '🧊', order: 2, parentId: null },
    { id: 'boppthermal-cat', nameEn: 'BOPP Thermal Lamination Film', nameZh: 'BOPP预涂膜', icon: '🔥', order: 3, parentId: null },
    { id: 'coatingfilm-cat', nameEn: 'Coating Film', nameZh: '涂布膜', icon: '🛡️', order: 4, parentId: null },
    { id: 'packingtape-cat', nameEn: 'BOPP Packing Tape', nameZh: '包装胶带', icon: '📦', order: 5, parentId: null },
    { id: 'bopswindows-cat', nameEn: 'BOPS Windows Envelope Film', nameZh: '聚苯乙烯窗口膜', icon: '✉️', order: 6, parentId: null },
    { id: 'cppbopa-cat', nameEn: 'CPP / BOPA Film', nameZh: '流延膜&尼龙膜', icon: '🌊', order: 7, parentId: null },
    { id: 'pofpepvc-cat', nameEn: 'POF / PE / PVC', nameZh: '收缩膜及袋类产品', icon: '🎬', order: 8, parentId: null },
    { id: 'teartape-cat', nameEn: 'Tear Tape & Clips', nameZh: '拉线和包扎绳', icon: '📌', order: 9, parentId: null },
    { id: 'paperproducts-cat', nameEn: 'Paper Products', nameZh: '纸制品', icon: '📄', order: 10, parentId: null },
    { id: 'machinesequipment-cat', nameEn: 'Machines & Equipment', nameZh: '机器设备', icon: '🔧', order: 11, parentId: null },
    { id: 'ttrlabels-cat', nameEn: 'TTR Ribbons & Labels', nameZh: '热转印碳带', icon: '📊', order: 12, parentId: null },
    { id: 'adhesives-cat', nameEn: 'Adhesive Glue', nameZh: '胶水粘合剂', icon: '🧴', order: 13, parentId: null },
    { id: 'other-cat', nameEn: 'Other Products', nameZh: '其他产品', icon: '📦', order: 14, parentId: null },
    { id: 'boppfilm-printing', nameEn: 'Bopp Printing & Laminating Film', nameZh: 'BOPP印刷复合膜', icon: '🖨️', order: 1, parentId: 'boppfilm-cat' },
    { id: 'boppfilm-heatseal', nameEn: 'Bopp Heat Sealable Film', nameZh: 'BOPP热封膜', icon: '🔥', order: 2, parentId: 'boppfilm-cat' },
    { id: 'boppfilm-flower', nameEn: 'Bopp Flower Wrapping Film', nameZh: 'BOPP花卉包装膜', icon: '💐', order: 3, parentId: 'boppfilm-cat' },
    { id: 'boppfilm-pearl', nameEn: 'Bopp White Pearlized Film', nameZh: 'BOPP白色珠光膜', icon: '✨', order: 4, parentId: 'boppfilm-cat' },
    { id: 'boppfilm-cigarette', nameEn: 'Bopp Cigarette Packs Wrapping Film', nameZh: 'BOPP烟包膜', icon: '🚬', order: 5, parentId: 'boppfilm-cat' },
    { id: 'boppfilm-metallized', nameEn: 'Bopp Metallized Film', nameZh: 'BOPP镀铝膜', icon: '🌟', order: 6, parentId: 'boppfilm-cat' },
    { id: 'boppfilm-capacitor', nameEn: 'Bopp Capacitor Film', nameZh: 'BOPP电容器膜', icon: '⚡', order: 7, parentId: 'boppfilm-cat' },
    { id: 'bopet-ttr-group', nameEn: 'BOPET 4.5Mic TTR Thermal Transfer Film', nameZh: 'BOPET 4.5微米热转印膜', icon: '🔄', order: 1, parentId: 'bopetfilm-cat', isGroup: true },
    { id: 'bopet-45mic', nameEn: 'BOPET polyester film 4.5microns', nameZh: 'BOPET聚酯薄膜4.5微米', icon: '🔄', order: 1, parentId: 'bopet-ttr-group' },
    { id: 'bopet-40mic', nameEn: 'BOPET polyester film 4.0microns', nameZh: 'BOPET聚酯薄膜4.0微米', icon: '🔄', order: 2, parentId: 'bopet-ttr-group' },
    { id: 'bopet-45mic-stock', nameEn: '4.5MIC BOPET Film In Stock', nameZh: 'BOPET 4.5微米现货', icon: '🔄', order: 3, parentId: 'bopet-ttr-group' },
    { id: 'bopet-38-45mic', nameEn: '3.8-4.5MIC BOPET TTR Film', nameZh: 'BOPET 3.8-4.5微米热转印膜', icon: '🔄', order: 4, parentId: 'bopet-ttr-group' },
    { id: 'bopet-metallized-group', nameEn: 'BOPET Metallized Film Silver', nameZh: 'BOPET镀银膜', icon: '✨', order: 2, parentId: 'bopetfilm-cat', isGroup: true },
    { id: 'bopet-metallized-45', nameEn: '4.5Mic BOPET Metallized Film', nameZh: '4.5微米BOPET镀铝膜', icon: '✨', order: 1, parentId: 'bopet-metallized-group' },
    { id: 'bopet-metallized-6', nameEn: '6 Mic BOPET Metallized Film', nameZh: '6微米BOPET镀铝膜', icon: '✨', order: 2, parentId: 'bopet-metallized-group' },
    { id: 'bopet-plain-group', nameEn: 'BOPET PLAIN FILM', nameZh: 'BOPET普通膜', icon: '🧊', order: 3, parentId: 'bopetfilm-cat', isGroup: true },
    { id: 'bopet-clear', nameEn: 'BOPET Film Clear transparent', nameZh: 'BOPET透明薄膜', icon: '🧊', order: 1, parentId: 'bopet-plain-group' },
    { id: 'bopet-insulating', nameEn: 'BOPET Insulating Film', nameZh: 'BOPET绝缘膜', icon: '🧊', order: 2, parentId: 'bopet-plain-group' },
    { id: 'bopet-color-vmpet', nameEn: 'Color VMPET film', nameZh: '彩色VMPET膜', icon: '🧊', order: 3, parentId: 'bopet-plain-group' },
    { id: 'bopet-capacitor-group', nameEn: 'BOPET Capacitor Film', nameZh: 'BOPET电容器膜', icon: '⚡', order: 4, parentId: 'bopetfilm-cat', isGroup: true },
    { id: 'bopet-capacitor', nameEn: 'BOPET Capacitor Film', nameZh: 'BOPET电容器膜', icon: '⚡', order: 1, parentId: 'bopet-capacitor-group' },
    { id: 'bopp-thermal-glossy', nameEn: 'BOPP Thermal Lamination Film Glossy', nameZh: 'BOPP热复合光亮膜', icon: '🔥', order: 1, parentId: 'boppthermal-cat' },
    { id: 'bopp-thermal-matt', nameEn: 'BOPP Thermal Lamination Film Matt', nameZh: 'BOPP热复合哑光膜', icon: '🔥', order: 2, parentId: 'boppthermal-cat' },
    { id: 'soft-touch-velvet', nameEn: 'Soft Touch Velvet thermal BOPP', nameZh: '柔软触感天鹅绒BOPP', icon: '🔥', order: 3, parentId: 'boppthermal-cat' },
    { id: 'bopet-thermal', nameEn: 'BOPET thermal laminating film', nameZh: 'BOPET热复合膜', icon: '🔥', order: 4, parentId: 'boppthermal-cat' },
    { id: 'bopa-thermal', nameEn: 'BOPA thermal lamination film', nameZh: 'BOPA热复合膜', icon: '🔥', order: 5, parentId: 'boppthermal-cat' },
    { id: 'matal-bopp-thermal', nameEn: 'Metal BOPP thermal lamination film', nameZh: '金属BOPP热复合膜', icon: '🔥', order: 6, parentId: 'boppthermal-cat' },
    { id: 'laser-bopet-thermal', nameEn: 'Laser BOPET thermal lamination film', nameZh: '激光BOPET热复合膜', icon: '🔥', order: 7, parentId: 'boppthermal-cat' },
    { id: 'pvdc-kfilm', nameEn: 'PVDC Coating Film (K Film)', nameZh: 'PVDC涂布K膜', icon: '🛡️', order: 1, parentId: 'coatingfilm-cat' },
    { id: 'acrylic-coat', nameEn: 'Acrylic Acid Coating Film', nameZh: '丙烯酸涂层膜', icon: '🛡️', order: 2, parentId: 'coatingfilm-cat' },
    { id: 'tape-jumbo-group', nameEn: 'Packing Tape', nameZh: '包装胶带', icon: '📦', order: 1, parentId: 'packingtape-cat', isGroup: true },
    { id: 'bopp-tape-jumbo', nameEn: 'BOPP Tape Jumbo Rolls', nameZh: 'BOPP胶带大卷', icon: '📦', order: 1, parentId: 'tape-jumbo-group' },
    { id: 'bopp-crystal-jumbo', nameEn: 'BOPP Crystal Adhesive Tape Jumbo Rolls', nameZh: 'BOPP水晶胶带大卷', icon: '📦', order: 2, parentId: 'tape-jumbo-group' },
    { id: 'bopp-tape-finished', nameEn: 'BOPP Tape Finished Rolls', nameZh: 'BOPP胶带成品卷', icon: '📦', order: 3, parentId: 'tape-jumbo-group' },
    { id: 'printed-bopp-tape', nameEn: 'Printed BOPP adhesive tape', nameZh: '印刷BOPP胶带', icon: '📦', order: 4, parentId: 'tape-jumbo-group' },
    { id: 'masking-tape-jumbo', nameEn: 'Masking Tape Jumbo Roll', nameZh: '美纹纸胶带大卷', icon: '📦', order: 5, parentId: 'tape-jumbo-group' },
    { id: 'double-sides-jumbo', nameEn: 'Double sides tape jumbo rolls', nameZh: '双面胶带大卷', icon: '📦', order: 6, parentId: 'tape-jumbo-group' },
    { id: 'bops-glossy', nameEn: 'BOPS Windows Envelope Film Glossy', nameZh: 'BOPS亮光信封窗口膜', icon: '✉️', order: 1, parentId: 'bopswindows-cat' },
    { id: 'bops-matt', nameEn: 'BOPS Windows Envelope Film Matt', nameZh: 'BOPS哑光信封窗口膜', icon: '✉️', order: 2, parentId: 'bopswindows-cat' },
    { id: 'bops-shrink', nameEn: 'BOPS Shrinkage Film', nameZh: 'BOPS收缩膜', icon: '✉️', order: 3, parentId: 'bopswindows-cat' },
    { id: 'bops-food', nameEn: 'BOPS Film For Food Container', nameZh: 'BOPS食品容器膜', icon: '✉️', order: 4, parentId: 'bopswindows-cat' },
    { id: 'cpp-film-group', nameEn: 'CPP Film', nameZh: 'CPP流延膜', icon: '🌊', order: 1, parentId: 'cppbopa-cat', isGroup: true },
    { id: 'gcpp-film', nameEn: 'GCPP film', nameZh: 'GCPP镀铝流延膜', icon: '✨', order: 1, parentId: 'cpp-film-group' },
    { id: 'vmcpp-film', nameEn: 'VMCPP Film', nameZh: 'VMCPP真空镀铝膜', icon: '🌟', order: 2, parentId: 'cpp-film-group' },
    { id: 'bopa-nylon-group', nameEn: 'BOPA nylon film', nameZh: 'BOPA尼龙膜', icon: '🔬', order: 2, parentId: 'cppbopa-cat', isGroup: true },
    { id: 'bopa-12mic', nameEn: 'BOPA nylon film 12Mic', nameZh: 'BOPA尼龙膜12微米', icon: '🔬', order: 1, parentId: 'bopa-nylon-group' },
    { id: 'bopa-15mic', nameEn: 'BOPA nylon film 15Mic', nameZh: 'BOPA尼龙膜15微米', icon: '🔬', order: 2, parentId: 'bopa-nylon-group' },
    { id: 'pof-shrink-group', nameEn: 'POF Shrinkage Film', nameZh: 'POF收缩膜', icon: '🎬', order: 1, parentId: 'pofpepvc-cat', isGroup: true },
    { id: 'pof-single', nameEn: 'POF Shrinkage Film Single Layer', nameZh: 'POF单层收缩膜', icon: '🎬', order: 1, parentId: 'pof-shrink-group' },
    { id: 'pof-central', nameEn: 'POF Shrinkage Film Central Fold', nameZh: 'POF中折收缩膜', icon: '🎬', order: 2, parentId: 'pof-shrink-group' },
    { id: 'pof-color', nameEn: 'POF Shrinkage Film Color', nameZh: 'POF彩色收缩膜', icon: '🎬', order: 3, parentId: 'pof-shrink-group' },
    { id: 'pe-film-group', nameEn: 'PE film', nameZh: 'PE薄膜', icon: '🎬', order: 2, parentId: 'pofpepvc-cat', isGroup: true },
    { id: 'pe-stretch', nameEn: 'PE Stretch Film', nameZh: 'PE拉伸膜', icon: '🎬', order: 1, parentId: 'pe-film-group' },
    { id: 'pe-cling', nameEn: 'PE Cling film', nameZh: 'PE缠绕膜', icon: '🎬', order: 2, parentId: 'pe-film-group' },
    { id: 'pvc-film-group', nameEn: 'PVC film', nameZh: 'PVC薄膜', icon: '🎬', order: 3, parentId: 'pofpepvc-cat', isGroup: true },
    { id: 'pvc-shrink', nameEn: 'PVC Shrinkage Film', nameZh: 'PVC收缩膜', icon: '🎬', order: 1, parentId: 'pvc-film-group' },
    { id: 'pvc-cling', nameEn: 'PVC Cling film', nameZh: 'PVC缠绕膜', icon: '🎬', order: 2, parentId: 'pvc-film-group' },
    { id: 'tear-tape-group', nameEn: 'Self-adhesive Tear Tape', nameZh: '拆封拉线', icon: '📌', order: 1, parentId: 'teartape-cat', isGroup: true },
    { id: 'clear-tear', nameEn: 'Clear Tear Tape', nameZh: '透明撕裂带', icon: '📌', order: 1, parentId: 'tear-tape-group' },
    { id: 'golden-tear', nameEn: 'Golden Tear Tape', nameZh: '金色撕裂带', icon: '📌', order: 2, parentId: 'tear-tape-group' },
    { id: 'red-tear', nameEn: 'Red Tear Tape', nameZh: '红色撕裂带', icon: '📌', order: 3, parentId: 'tear-tape-group' },
    { id: 'laser-tear', nameEn: 'Laser Tear Tape', nameZh: '激光撕裂带', icon: '📌', order: 4, parentId: 'tear-tape-group' },
    { id: 'printed-tear', nameEn: 'Printed Tear Tape', nameZh: '印刷撕裂带', icon: '📌', order: 5, parentId: 'tear-tape-group' },
    { id: 'bopp-sheet-tear', nameEn: 'BOPP Sheet Inserts Tear Tape', nameZh: 'BOPP片材撕裂带', icon: '📌', order: 6, parentId: 'tear-tape-group' },
    { id: 'tear-clips', nameEn: 'Tear Clips', nameZh: '包扎绳', icon: '📌', order: 7, parentId: 'tear-tape-group' },
    { id: 'copy-paper-jumbo', nameEn: 'Copy Paper jumbo rolls', nameZh: '复印纸大卷', icon: '📄', order: 1, parentId: 'paperproducts-cat' },
    { id: 'a4-copy', nameEn: 'A4 Copy Paper', nameZh: 'A4复印纸', icon: '📄', order: 2, parentId: 'paperproducts-cat' },
    { id: 'letter-copy', nameEn: 'Letter Size Copy Paper', nameZh: '信纸尺寸复印纸', icon: '📄', order: 3, parentId: 'paperproducts-cat' },
    { id: 'legal-copy', nameEn: 'Legal size Copy Paper', nameZh: '法律文件尺寸复印纸', icon: '📄', order: 4, parentId: 'paperproducts-cat' },
    { id: 'lwc-paper', nameEn: 'LWC Paper', nameZh: '轻量涂布纸', icon: '📄', order: 5, parentId: 'paperproducts-cat' },
    { id: 'photo-paper', nameEn: 'Photo Paper', nameZh: '相纸', icon: '📄', order: 6, parentId: 'paperproducts-cat' },
    { id: 'inkjet-supply', nameEn: 'Inkjet Printing Supply', nameZh: '喷墨打印耗材', icon: '📄', order: 7, parentId: 'paperproducts-cat' },
    { id: 'slitting-machines', nameEn: 'Slitting Machines', nameZh: '分切机', icon: '🔧', order: 1, parentId: 'machinesequipment-cat' },
    { id: 'printing-machines', nameEn: 'Printing Machines', nameZh: '印刷机', icon: '🔧', order: 2, parentId: 'machinesequipment-cat' },
    { id: 'bag-machines', nameEn: 'Bag Machines', nameZh: '制袋机', icon: '🔧', order: 3, parentId: 'machinesequipment-cat' },
    { id: 'tape-machines', nameEn: 'Tape Machines', nameZh: '胶带机', icon: '🔧', order: 4, parentId: 'machinesequipment-cat' },
    { id: 'metal-film-machines', nameEn: 'Metal Film Machines', nameZh: '镀膜机', icon: '🔧', order: 5, parentId: 'machinesequipment-cat' },
    { id: 'selfadhesive-labels-group', nameEn: 'Self-adhesive Labels', nameZh: '自粘标签', icon: '📊', order: 1, parentId: 'ttrlabels-cat', isGroup: true },
    { id: 'labels-rolls', nameEn: 'Self-Adhesive Labels In Rolls', nameZh: '自粘标签卷', icon: '📊', order: 1, parentId: 'selfadhesive-labels-group' },
    { id: 'labels-sheets', nameEn: 'Self-Adhesive Labels In Sheets', nameZh: '自粘标签片材', icon: '📊', order: 2, parentId: 'selfadhesive-labels-group' },
    { id: 'ttr-ribbons-group', nameEn: 'TTR Ribbons', nameZh: '热转印碳带', icon: '📊', order: 2, parentId: 'ttrlabels-cat', isGroup: true },
    { id: 'ttr-barcode', nameEn: 'TTR Barcode Ribbons', nameZh: '热转印条码碳带', icon: '📊', order: 1, parentId: 'ttr-ribbons-group' },
    { id: 'wax-resin', nameEn: 'Wax/resin Ribbons', nameZh: '蜡基/树脂碳带', icon: '📊', order: 2, parentId: 'ttr-ribbons-group' },
    { id: 'adhesive-glue', nameEn: 'Adhesive Glue', nameZh: '胶水粘合剂', icon: '🧴', order: 1, parentId: 'adhesives-cat' },
    { id: 'bags-sheets-group', nameEn: 'Bags & Sheets', nameZh: '袋子和片膜', icon: '📦', order: 1, parentId: 'other-cat' },
    { id: 'others-group', nameEn: 'Others', nameZh: '其他', icon: '📦', order: 2, parentId: 'other-cat' },
  ];
}

// ============ 前端产品同步 ============
// 生成前端可直接使用的产品数据（供 products.html 动态渲染）
function getAdminProductsForFrontend() {
  // ── 分类：永远从 getDefaultCategories()（规范完整树）出发 ──────────────────
  // 问题根源：每次写盘时如果只写 APP_DATA.categories，而 APP_DATA.categories
  // 是从旧的 products-data.js（只有28个浅层分类）合并来的，那么写出去的文件
  // 就只剩28个，下次再加载又是这28个，形成"分类越存越少"的循环。
  // 解决：写盘时始终以 getDefaultCategories() 为基础，再叠加用户在分类管理
  // 里手动新增/修改的分类（凡是 ID 不在 defaultCats 里的都是用户新增的）。
  var defaultCats = getDefaultCategories();
  var defaultCatIds = {};
  defaultCats.forEach(function(c) { defaultCatIds[c.id] = true; });

  // 用户在分类管理里手动修改了某个 default 分类的字段（icon、nameZh 等）
  // → 用 APP_DATA.categories 里的版本覆盖 default
  var userCatMap = {};
  APP_DATA.categories.forEach(function(c) { userCatMap[c.id] = c; });

  var mergedCats = defaultCats.map(function(c) {
    return userCatMap[c.id] || c; // 用户改过就用用户的，否则用 default
  });

  // 用户新增的分类（ID 不在 defaultCats 里）→ 追加到末尾
  APP_DATA.categories.forEach(function(c) {
    if (!defaultCatIds[c.id]) mergedCats.push(c);
  });

  return {
    categories: mergedCats,
    products: stripTransientFields(APP_DATA.products)
  };
}

// 导出当前后台数据为前端兼容的 products-data.js 格式
async function exportAsProductsData() {
  var ok = await writeProductsDataToDisk(false);
  if (ok) return;

  // 兜底：未连接文件夹或写入失败时，下载文件后提示手动替换
  var data = getAdminProductsForFrontend();
  // Auto-fill detailLink for products missing it
  data.products = data.products.map(function(p) {
    if (!p.detailLink || !p.detailLink.trim()) {
      return Object.assign({}, p, { detailLink: 'product.html?id=' + p.id });
    }
    return p;
  });
  var js = '// Auto-generated by AEC Admin - ' + new Date().toISOString() + '\n';
  js += 'var productsData = ' + JSON.stringify(data, null, 2) + ';\n';
  js += 'if (typeof window !== "undefined") { window.productsData = productsData; }\n';
  var blob = new Blob([js], { type: 'text/javascript' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'products-data.js';
  a.click();
  URL.revokeObjectURL(url);
  showToast('⚠️ 未连接网站文件夹，已下载 products-data.js，请手动替换到 C:\\Users\\DELL\\Desktop\\aec-project\\ 目录下', 'error');
}

function getDefaultProducts() {
  return [
    { id: 1, nameEn: 'PE or BOPP Bags', nameZh: 'PE或BOPP袋子', category: 'boppfilm-cat', descEn: 'High-quality bags', descZh: '优质袋子', price: 'From $0.8/m²', thickness: '3-75μm', specs: ['High clarity'], status: 'active', detailLink: 'bag.html' },
    { id: 2, nameEn: 'BOPP Anti-Fog Film', nameZh: 'BOPP防雾薄膜', category: 'boppfilm-cat', descEn: 'Anti-fog film', descZh: '防雾膜', price: 'From $0.8/m²', thickness: '3-75μm', specs: ['Anti-fog'], status: 'active', detailLink: '' },
    { id: 3, nameEn: 'BOPP Anti Static Film', nameZh: 'BOPP抗静电薄膜', category: 'boppfilm-cat', descEn: 'Anti-static film', descZh: '抗静电膜', price: 'From $0.8/m²', thickness: '3-75μm', specs: ['Anti-static'], status: 'active', detailLink: '' },
    { id: 4, nameEn: 'BOPP Bag Grade Film', nameZh: 'BOPP袋级薄膜', category: 'boppfilm-cat', descEn: 'Bag grade film', descZh: '袋级膜', price: 'From $0.8/m²', thickness: '3-75μm', specs: ['Strong'], status: 'active', detailLink: '' },
    { id: 5, nameEn: 'BOPP Bags', nameZh: 'BOPP袋子', category: 'boppfilm-cat', descEn: 'Finished BOPP bags', descZh: '成品袋', price: 'From $1.2/pc', thickness: '3-75μm', specs: ['Durable'], status: 'active', detailLink: 'bag.html' }
  ];
}

// ============ 筛选功能 ============
function initFilters() {
  // 搜索输入
  var searchInput = document.getElementById('productSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      FILTER.search = this.value.toLowerCase();
      renderProductsTable();
    });
  }

  // 分类下拉
  var catFilter = document.getElementById('filterCategory');
  if (catFilter) {
    catFilter.addEventListener('change', function() {
      FILTER.category = this.value;
      renderProductsTable();
    });
    populateCategoryFilter(catFilter);
  }

  // 状态下拉
  var statusFilter = document.getElementById('filterStatus');
  if (statusFilter) {
    statusFilter.addEventListener('change', function() {
      FILTER.status = this.value;
      renderProductsTable();
    });
  }
}

function populateCategoryFilter(selectEl) {
  selectEl.innerHTML = '<option value="">全部分类</option>';
  getFlatCategoryList(null).forEach(function(item) {
    var opt = document.createElement('option');
    opt.value = item.cat.id;
    opt.textContent = '　'.repeat(item.depth) + (item.depth > 0 ? '└─ ' : '') + item.cat.icon + ' ' + item.cat.nameEn;
    selectEl.appendChild(opt);
  });
}

function getFilteredProducts() {
  return APP_DATA.products.filter(function(p) {
    // 搜索过滤
    if (FILTER.search) {
      var searchStr = (p.nameEn + ' ' + p.nameZh + ' ' + (p.keywords || []).join(' ') + ' ' + p.id).toLowerCase();
      if (searchStr.indexOf(FILTER.search) === -1) return false;
    }
    // 分类过滤
    if (FILTER.category && p.category !== FILTER.category) return false;
    // 状态过滤
    if (FILTER.status && p.status !== FILTER.status) return false;
    return true;
  });
}

// ============ 导航 ============
function initNavigation() {
  document.querySelectorAll('.nav-item').forEach(function(item) {
    item.addEventListener('click', function() {
      var page = this.dataset.page;
      navigateTo(page);
    });
  });
}

function navigateTo(page) {
  document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); });
  document.querySelector('.nav-item[data-page="' + page + '"]').classList.add('active');

  document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
  var pageEl = document.getElementById('page-' + page);
  if (pageEl) pageEl.classList.add('active');

  var titles = {
    dashboard: '仪表盘',
    products: '产品管理',
    categories: '分类管理',
    pages: '页面管理',
    company: '公司信息',
    headerfooter: '页眉 & 页脚管理',
    files: '文件管理'
  };
  document.getElementById('pageTitle').textContent = titles[page] || page;

  if (page === 'products') {
    populateCategoryFilter(document.getElementById('filterCategory'));
    renderProductsTable();
  }
  if (page === 'categories') renderCategoriesTable();
  if (page === 'pages') renderPagesList();
  if (page === 'dashboard') updateDashboard();
  if (page === 'company') loadCompanyInfo();
  if (page === 'headerfooter') loadHeaderFooterInfo();
}

// ============ 仪表盘 ============
function updateDashboard() {
  document.getElementById('totalProducts').textContent = APP_DATA.products.length;
  document.getElementById('totalCategories').textContent = APP_DATA.categories.length;
  var activePages = document.querySelectorAll('.page').length;
  document.getElementById('totalPages').textContent = activePages - 1; // exclude dashboard

  try {
    var last = localStorage.getItem('aecAdmin_lastSave');
    document.getElementById('lastSave').textContent = last || '--';
  } catch (e) {
    document.getElementById('lastSave').textContent = '--';
  }
}

// ============ 产品管理 ============
var SELECTED_PRODUCTS = new Set();

function updateBatchToolbar() {
  var toolbar = document.getElementById('batchToolbar');
  var countEl = document.getElementById('batchSelectedCount');
  if (!toolbar) return;
  if (SELECTED_PRODUCTS.size > 0) {
    toolbar.style.display = 'flex';
    countEl.textContent = '已选 ' + SELECTED_PRODUCTS.size + ' 项';
  } else {
    toolbar.style.display = 'none';
  }
  // Update select-all checkbox state
  var selectAll = document.getElementById('selectAllProducts');
  if (selectAll) {
    var filtered = getFilteredProducts();
    selectAll.checked = filtered.length > 0 && filtered.every(function(p) { return SELECTED_PRODUCTS.has(p.id); });
    selectAll.indeterminate = SELECTED_PRODUCTS.size > 0 && !selectAll.checked;
  }
}

function toggleSelectAll(checked) {
  var filtered = getFilteredProducts();
  filtered.forEach(function(p) {
    if (checked) SELECTED_PRODUCTS.add(p.id);
    else SELECTED_PRODUCTS.delete(p.id);
  });
  updateBatchToolbar();
  renderProductsTable();
}

function toggleProductSelect(id, checked) {
  if (checked) SELECTED_PRODUCTS.add(id);
  else SELECTED_PRODUCTS.delete(id);
  updateBatchToolbar();
  // Update select-all state without re-render
  var selectAll = document.getElementById('selectAllProducts');
  if (selectAll) {
    var filtered = getFilteredProducts();
    selectAll.checked = filtered.length > 0 && filtered.every(function(p) { return SELECTED_PRODUCTS.has(p.id); });
    selectAll.indeterminate = SELECTED_PRODUCTS.size > 0 && !selectAll.checked;
  }
}

function clearAllSelections() {
  SELECTED_PRODUCTS.clear();
  updateBatchToolbar();
  renderProductsTable();
}

async function batchDeleteSelected() {
  if (SELECTED_PRODUCTS.size === 0) return;
  if (!confirm('确定要删除已选的 ' + SELECTED_PRODUCTS.size + ' 个产品吗？此操作不可撤销。')) return;
  SELECTED_PRODUCTS.forEach(function(id) { markProductIdDeleted(id); });
  APP_DATA.products = APP_DATA.products.filter(function(p) { return !SELECTED_PRODUCTS.has(p.id); });
  SELECTED_PRODUCTS.clear();
  await persistChange();
  updateBatchToolbar();
  renderProductsTable();
  updateDashboard();
  showToast('已批量删除 ✅');
}

// 一键上架所有产品：勾选全部产品 + 把每个产品状态置为 active，然后写盘同步到前端
async function activateAllProducts() {
  var total = APP_DATA.products.length;
  if (total === 0) {
    showToast('当前没有任何产品', 'error');
    return;
  }
  var inactiveCount = APP_DATA.products.filter(function(p) { return p.status !== 'active'; }).length;
  if (inactiveCount === 0) {
    showToast('全部 ' + total + ' 个产品本来就已经是上架状态 ✅');
    return;
  }
  if (!confirm('确定要一键上架全部 ' + total + ' 个产品吗？\n\n其中 ' + inactiveCount + ' 个当前是下架状态，操作后将全部变为"上架"并同步到前端网站。')) return;

  // 自动勾选所有产品
  APP_DATA.products.forEach(function(p) { SELECTED_PRODUCTS.add(p.id); });
  // 全部置为上架
  APP_DATA.products.forEach(function(p) { p.status = 'active'; });

  await persistChange();
  updateBatchToolbar();
  renderProductsTable();
  updateDashboard();
  showToast('✅ 已一键上架全部 ' + total + ' 个产品，并同步到前端网站');
}

// ============ 查重功能 ============

// 找出重复产品（按产品名EN去重；忽略大小写和首尾空格）
function findDuplicates() {
  var groups = {};
  APP_DATA.products.forEach(function(p) {
    var key = (p.nameEn || '').trim().toLowerCase();
    if (!key) return;
    if (!groups[key]) groups[key] = [];
    groups[key].push(p);
  });
  // 只返回有2个以上的组
  return Object.values(groups).filter(function(g) { return g.length > 1; });
}

// 打开查重弹窗
function showDedupModal() {
  var groups = findDuplicates();
  var modal   = document.getElementById('dedupModal');
  var content = document.getElementById('dedupContent');
  var stats   = document.getElementById('dedupStats');
  var btn     = document.getElementById('btnDedupDelete');

  if (groups.length === 0) {
    stats.textContent   = '';
    content.innerHTML   = '<div style="text-align:center;padding:48px;color:var(--green)">✅ 未发现重复产品！所有 ' + APP_DATA.products.length + ' 个产品名称均不重复。</div>';
    btn.style.display   = 'none';
    modal.classList.add('active');
    return;
  }

  var totalDups = groups.reduce(function(s, g) { return s + g.length - 1; }, 0);
  stats.textContent = '发现 ' + groups.length + ' 组重复，共 ' + totalDups + ' 个多余副本（默认已勾选）';
  btn.style.display = '';

  var html = '';
  groups.forEach(function(group, gi) {
    html += '<div style="margin-bottom:20px;border:1px solid var(--border);border-radius:10px;overflow:hidden">' +
      '<div style="background:rgba(40,240,100,.06);padding:10px 16px;display:flex;justify-content:space-between;align-items:center">' +
        '<span style="font-size:13px;font-weight:600;color:var(--text)">' + escapeHtml(group[0].nameEn) + '</span>' +
        '<span style="font-size:11px;color:var(--gold)">共 ' + group.length + ' 个重复</span>' +
      '</div>';
    group.forEach(function(p, pi) {
      var isExtra = pi > 0; // 保留第一个，默认勾选其余
      var catPath = getCategoryPath(p.category).map(function(c) { return c.nameEn; }).join(' › ');
      html += '<div style="display:flex;align-items:center;gap:12px;padding:10px 16px;border-top:1px solid var(--border);' + (isExtra ? 'background:rgba(255,82,82,.04)' : '') + '">' +
        '<input type="checkbox" id="dedup_' + p.id + '" value="' + p.id + '" ' + (isExtra ? 'checked' : '') + ' onchange="updateDedupCount()" style="cursor:pointer;width:15px;height:15px;flex-shrink:0">' +
        '<label for="dedup_' + p.id + '" style="flex:1;cursor:pointer">' +
          '<span style="font-family:JetBrains Mono,monospace;font-size:11px;color:var(--gold)">#' + p.id + '</span> ' +
          '<strong style="color:var(--text);font-size:13px">' + escapeHtml(p.nameEn) + '</strong>' +
          (p.nameZh ? '<span style="color:var(--text2);font-size:12px"> · ' + escapeHtml(p.nameZh) + '</span>' : '') +
          '<br><span style="font-size:11px;color:var(--text2)">' + escapeHtml(catPath || p.category || '') + (p.status === 'inactive' ? ' · <span style="color:#ff5252">下架</span>' : '') + '</span>' +
        '</label>' +
        (pi === 0 ? '<span style="font-size:11px;color:var(--green);background:rgba(40,240,100,.12);padding:2px 8px;border-radius:8px;white-space:nowrap">✓ 保留</span>' : '<span style="font-size:11px;color:#ff5252;white-space:nowrap">删除</span>') +
      '</div>';
    });
    html += '</div>';
  });

  content.innerHTML = html;
  updateDedupCount();
  modal.classList.add('active');
}

function closeDedupModal() {
  document.getElementById('dedupModal').classList.remove('active');
}

function updateDedupCount() {
  var boxes   = document.querySelectorAll('#dedupContent input[type=checkbox]');
  var checked = Array.prototype.filter.call(boxes, function(b) { return b.checked; }).length;
  var el = document.getElementById('dedupDeleteCount');
  if (el) el.textContent = checked > 0 ? ('将删除 ' + checked + ' 个产品') : '';
}

async function executeDedupDelete() {
  var boxes = document.querySelectorAll('#dedupContent input[type=checkbox]:checked');
  if (boxes.length === 0) { showToast('未选择任何产品', 'error'); return; }
  if (!confirm('确定删除选中的 ' + boxes.length + ' 个重复产品吗？操作不可撤销。')) return;

  var idsToDelete = new Set();
  boxes.forEach(function(b) { idsToDelete.add(parseInt(b.value)); });
  idsToDelete.forEach(function(id) { markProductIdDeleted(id); });
  APP_DATA.products = APP_DATA.products.filter(function(p) { return !idsToDelete.has(p.id); });

  await persistChange();
  closeDedupModal();
  renderProductsTable();
  updateDashboard();
  showToast('已删除 ' + idsToDelete.size + ' 个重复产品 ✅');
}

function renderProductsTable() {
  var tbody = document.getElementById('productsTableBody');
  var filtered = getFilteredProducts();
  var displayedCount = filtered.length;
  var totalCount = APP_DATA.products.length;

  // 更新统计标签
  var statsEl = document.getElementById('productStats');
  if (statsEl) {
    statsEl.textContent = totalCount > 0 ? ('共 ' + totalCount + ' 个产品' + (displayedCount !== totalCount ? '，当前显示 ' + displayedCount + ' 个' : '')) : '';
  }

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:40px;color:var(--text2)">没有找到匹配的产品。请尝试其他搜索条件或 <a href="product_edit.html?id=new" style="color:var(--green)">添加产品</a>。</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map(function(p) {
    var pathItems = getCategoryPath(p.category);
    var catLabel;
    if (pathItems.length > 0) {
      catLabel = pathItems.map(function(c, i) {
        return (i === 0 ? c.icon + ' ' : '') + escapeHtml(c.nameEn);
      }).join(' <span style="color:var(--text2)">›</span> ');
    } else {
      catLabel = escapeHtml(p.category || '');
    }
    var specsStr = (p.specs || []).map(function(s) {
      return '<span style="display:inline-block;padding:2px 8px;margin:2px;background:rgba(40,240,100,.1);border-radius:3px;font-size:11px;color:var(--green)">' + escapeHtml(s) + '</span>';
    }).join('');
    var isChecked = SELECTED_PRODUCTS.has(p.id);
    // 图片路径处理：如果已连接文件夹，图片是 aec-project/images/ 下的文件，
    // 后台与前端在不同目录，需要通过文件夹句柄读取并生成 blob URL 来显示。
    // 这里优先显示已缓存的 blob URL（存在 p._blobUrl），否则显示占位符并异步加载。
    var thumbHtml;
    if (p.image) {
      var blobSrc = p._blobUrl || p.image;
      thumbHtml = '<img src="' + escapeHtml(blobSrc) + '" alt="" ' +
        'style="width:42px;height:42px;object-fit:cover;border-radius:6px;border:1px solid var(--border);display:block" ' +
        'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'" ' +
        'data-product-id="' + p.id + '" data-img-path="' + escapeHtml(p.image) + '">' +
        '<div style="display:none;width:42px;height:42px;border-radius:6px;border:1px solid var(--border);' +
        'background:rgba(255,255,255,.04);align-items:center;justify-content:center;font-size:16px;color:var(--text2)">🖼️</div>';
    } else {
      thumbHtml = '<div style="width:42px;height:42px;border-radius:6px;border:1px solid var(--border);' +
        'background:rgba(255,255,255,.04);display:flex;align-items:center;justify-content:center;font-size:16px;color:var(--text2)" title="无图片">🖼️</div>';
    }
    return '<tr' + (isChecked ? ' style="background:rgba(232,196,106,.07)"' : '') + '>' +
      '<td style="text-align:center"><input type="checkbox" ' + (isChecked ? 'checked' : '') + ' onchange="toggleProductSelect(' + p.id + ',this.checked)" style="cursor:pointer;width:15px;height:15px"></td>' +
      '<td style="font-family:JetBrains Mono,monospace;font-size:12px;color:var(--gold)">#' + p.id + '</td>' +
      '<td>' + thumbHtml + '</td>' +
      '<td><strong style="color:var(--text)">' + escapeHtml(p.nameEn) + '</strong></td>' +
      '<td>' + escapeHtml(p.nameZh || '') + '</td>' +
      '<td style="font-size:13px">' + catLabel + '</td>' +
      '<td>' + escapeHtml(p.thickness || '') + '</td>' +
      '<td><span class="status-' + p.status + '">' + (p.status === 'active' ? '● 上架' : '○ 下架') + '</span></td>' +
      '<td>' +
        '<button class="btn-edit" onclick="editProduct(' + p.id + ')" style="margin-right:4px">✏️ 编辑</button>' +
        '<button class="btn-danger" onclick="deleteProduct(' + p.id + ')">🗑</button>' +
      '</td>' +
    '</tr>';
  }).join('');
}

function showProductModal(id) {
  document.getElementById('productModalTitle').textContent = id ? '编辑产品' : '添加产品';
  document.getElementById('productId').value = id || '';

  // 填充分类下拉（树状缩进，可选顶级或任意层级子分类）
  var catSelect = document.getElementById('productCategory');
  catSelect.innerHTML = '<option value="">-- 选择分类 --</option>';
  getFlatCategoryList(null).forEach(function(item) {
    var opt = document.createElement('option');
    opt.value = item.cat.id;
    opt.textContent = '　'.repeat(item.depth) + (item.depth > 0 ? '└─ ' : '') + item.cat.icon + ' ' + item.cat.nameEn + ' / ' + item.cat.nameZh;
    catSelect.appendChild(opt);
  });

  if (id) {
    var p = APP_DATA.products.find(function(x) { return x.id === id; });
    if (p) {
      document.getElementById('productNameEn').value = p.nameEn || '';
      document.getElementById('productNameZh').value = p.nameZh || '';
      catSelect.value = p.category || '';
      // Rich editors: load HTML if stored, else plain text
      document.getElementById('productDescEnEditor').innerHTML = p.descEn || '';
      document.getElementById('productDescZhEditor').innerHTML = p.descZh || '';
      document.getElementById('productDescEn').value = p.descEn || '';
      document.getElementById('productDescZh').value = p.descZh || '';
      document.getElementById('productTechSpecsEditor').innerHTML = p.techSpecs || '';
      document.getElementById('productTechSpecs').value = p.techSpecs || '';
      // New fields
      var tzEl = document.getElementById('productTechSpecsZhEditor');
      if (tzEl) { tzEl.innerHTML = p.techSpecsZh || ''; }
      var aeEl = document.getElementById('productApplicationsEnEditor');
      if (aeEl) { aeEl.innerHTML = p.applicationsEn || ''; }
      var azEl = document.getElementById('productApplicationsZhEditor');
      if (azEl) { azEl.innerHTML = p.applicationsZh || ''; }
      var peEl = document.getElementById('productPackagingEnEditor');
      if (peEl) { peEl.innerHTML = p.packagingEn || ''; }
      var pzEl = document.getElementById('productPackagingZhEditor');
      if (pzEl) { pzEl.innerHTML = p.packagingZh || ''; }
      document.getElementById('productThickness').value = p.thickness || '';
      document.getElementById('productSpecs').value = (p.specs || []).join(', ');
      document.getElementById('productKeywords').value = (p.keywords || []).join(', ');
      document.getElementById('productStatus').value = p.status || 'active';
      document.getElementById('productDetailLink').value = p.detailLink || '';
      document.getElementById('productImage').value = p.image || '';
      // 显示已有图片预览
      if (p.image) {
        document.getElementById('imagePreviewImg').src = p.image;
        document.getElementById('imagePreview').style.display = 'block';
      } else {
        document.getElementById('imagePreview').style.display = 'none';
        document.getElementById('imagePreviewImg').src = '';
      }
      document.getElementById('productImageFile').value = '';
    }
  } else {
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    document.getElementById('productStatus').value = 'active';
    document.getElementById('productDescEnEditor').innerHTML = '';
    document.getElementById('productDescZhEditor').innerHTML = '';
    document.getElementById('productTechSpecsEditor').innerHTML = '';
    var tzEl2 = document.getElementById('productTechSpecsZhEditor');
    if (tzEl2) tzEl2.innerHTML = '';
    var aeEl2 = document.getElementById('productApplicationsEnEditor');
    if (aeEl2) aeEl2.innerHTML = '';
    var azEl2 = document.getElementById('productApplicationsZhEditor');
    if (azEl2) azEl2.innerHTML = '';
    var peEl2 = document.getElementById('productPackagingEnEditor');
    if (peEl2) peEl2.innerHTML = '';
    var pzEl2 = document.getElementById('productPackagingZhEditor');
    if (pzEl2) pzEl2.innerHTML = '';
    document.getElementById('imagePreview').style.display = 'none';    document.getElementById('imagePreviewImg').src = '';
    document.getElementById('productImageFile').value = '';
  }

  document.getElementById('productModal').classList.add('active');
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('active');
}

async function saveProduct(e) {
  e.preventDefault();
  var id = document.getElementById('productId').value;
  var nameEn = document.getElementById('productNameEn').value.trim();
  var nameZh = document.getElementById('productNameZh').value.trim();
  var category = document.getElementById('productCategory').value;

  if (!nameEn) { showToast('请输入产品英文名称', 'error'); return; }
  if (!category) { showToast('请选择分类', 'error'); return; }

  var specsRaw = document.getElementById('productSpecs').value;
  var specs = specsRaw ? specsRaw.split(',').map(function(s) { return s.trim(); }).filter(Boolean) : [];

  var keywordsRaw = document.getElementById('productKeywords').value;
  var keywords = keywordsRaw ? keywordsRaw.split(',').map(function(s) { return s.trim(); }).filter(Boolean) : [];

  // Read rich editor HTML for descriptions
  var descEn = document.getElementById('productDescEnEditor').innerHTML.trim();
  var descZh = document.getElementById('productDescZhEditor').innerHTML.trim();
  var techSpecs = document.getElementById('productTechSpecsEditor').innerHTML.trim();
  // New fields
  var techSpecsZhEl = document.getElementById('productTechSpecsZhEditor');
  var techSpecsZh = techSpecsZhEl ? techSpecsZhEl.innerHTML.trim() : '';
  var applicationsEnEl = document.getElementById('productApplicationsEnEditor');
  var applicationsEn = applicationsEnEl ? applicationsEnEl.innerHTML.trim() : '';
  var applicationsZhEl = document.getElementById('productApplicationsZhEditor');
  var applicationsZh = applicationsZhEl ? applicationsZhEl.innerHTML.trim() : '';
  var packagingEnEl = document.getElementById('productPackagingEnEditor');
  var packagingEn = packagingEnEl ? packagingEnEl.innerHTML.trim() : '';
  var packagingZhEl = document.getElementById('productPackagingZhEditor');
  var packagingZh = packagingZhEl ? packagingZhEl.innerHTML.trim() : '';
  // Normalise empty editor state
  if (descEn === '<br>' || descEn === '<br/>') descEn = '';
  if (descZh === '<br>' || descZh === '<br/>') descZh = '';
  if (techSpecs === '<br>' || techSpecs === '<br/>') techSpecs = '';
  if (techSpecsZh === '<br>' || techSpecsZh === '<br/>') techSpecsZh = '';
  if (applicationsEn === '<br>' || applicationsEn === '<br/>') applicationsEn = '';
  if (applicationsZh === '<br>' || applicationsZh === '<br/>') applicationsZh = '';
  if (packagingEn === '<br>' || packagingEn === '<br/>') packagingEn = '';
  if (packagingZh === '<br>' || packagingZh === '<br/>') packagingZh = '';

  var resolvedId = id ? parseInt(id) : NEXT_ID;
  var detailLinkRaw = document.getElementById('productDetailLink').value.trim();
  // Auto-assign generic detail page for products without a custom HTML page
  // This ensures every product is clickable on the frontend
  var resolvedDetailLink = detailLinkRaw || ('product.html?id=' + resolvedId);

  var productData = {
    id: resolvedId,
    nameEn: nameEn,
    nameZh: nameZh,
    category: category,
    descEn: descEn,
    descZh: descZh,
    techSpecs: techSpecs,
    techSpecsZh: techSpecsZh,
    applicationsEn: applicationsEn,
    applicationsZh: applicationsZh,
    packagingEn: packagingEn,
    packagingZh: packagingZh,
    thickness: document.getElementById('productThickness').value.trim(),
    specs: specs,
    keywords: keywords,
    status: document.getElementById('productStatus').value,
    detailLink: resolvedDetailLink,
    image: document.getElementById('productImage').value.trim()
  };

  if (id) {
    // 编辑现有
    var idx = APP_DATA.products.findIndex(function(p) { return p.id === parseInt(id); });
    if (idx >= 0) APP_DATA.products[idx] = productData;
  } else {
    // 新增
    APP_DATA.products.push(productData);
    NEXT_ID++;
  }

  var diskOk = await persistChange();
  closeProductModal();
  renderProductsTable();
  updateDashboard();
  if (diskOk) {
    showToast('产品已保存并自动同步到前端 ✅');
  } else {
    // persistChange 内部已触发下载，这里给用户提示说明操作
    setTimeout(function() {
      alert('⚠️ 未连接网站文件夹，无法自动同步。\n\n' +
        '已自动下载 products-data.js\n\n' +
        '请将下载的文件复制到：\n' +
        'C:\\Users\\DELL\\Desktop\\aec-project\\\n\n' +
        '然后刷新前端 products.html 即可看到更新。\n\n' +
        '💡 建议：左侧菜单 → 文件管理 → 选择 aec-project 文件夹\n' +
        '连接后保存将自动同步，无需手动替换文件。');
    }, 300);
  }
}

function editProduct(id) {
  // Navigate to dedicated product edit page (non-responsive full page)
  window.location.href = 'product_edit.html?id=' + encodeURIComponent(id);
}

async function deleteProduct(id) {
  var p = APP_DATA.products.find(function(x) { return x.id === id; });
  if (!p) return;
  if (!confirm('确定要删除产品 "' + p.nameEn + '" (#' + id + ') 吗？此操作不可撤销。')) return;

  APP_DATA.products = APP_DATA.products.filter(function(x) { return x.id !== id; });
  markProductIdDeleted(id);
  await persistChange();
  renderProductsTable();
  updateDashboard();
  showToast('产品已删除并同步');
}

// 把已删除产品的 ID 记入“墓碑”列表，避免下次 loadData() 从 products-data.js 源文件里把它重新加回来
function markProductIdDeleted(id) {
  try {
    var saved = localStorage.getItem('aecAdmin_deletedIds');
    var ids = saved ? JSON.parse(saved) : [];
    if (ids.indexOf(id) === -1) ids.push(id);
    localStorage.setItem('aecAdmin_deletedIds', JSON.stringify(ids));
  } catch (e) { /* ignore */ }
}

// ============ 分类管理 ============
function renderCategoriesTable() {
  var tbody = document.getElementById('categoriesTableBody');
  var counts = {};
  APP_DATA.products.forEach(function(p) {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });

  if (APP_DATA.categories.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text2)">暂无分类</td></tr>';
    return;
  }

  var flatList = getFlatCategoryList(null);

  tbody.innerHTML = flatList.map(function(item) {
    var c = item.cat;
    var depth = item.depth;
    var indent = depth > 0 ? '<span style="color:var(--text2);opacity:.5;margin-right:6px">' + ('　'.repeat(depth)) + '└─' + '</span>' : '';
    var levelBadge = depth > 0 ? '<span style="font-size:10px;color:var(--text2);margin-left:6px;border:1px solid var(--border);border-radius:8px;padding:1px 6px">L' + (depth + 1) + '</span>' : '';
    return '<tr>' +
      '<td style="font-family:JetBrains Mono,monospace;font-size:12px;color:var(--gold)">' + escapeHtml(c.id) + '</td>' +
      '<td>' + indent + escapeHtml(c.nameEn) + levelBadge + '</td>' +
      '<td>' + escapeHtml(c.nameZh || '') + '</td>' +
      '<td style="font-size:20px">' + escapeHtml(c.icon || '') + '</td>' +
      '<td>' + (counts[c.id] || 0) + '</td>' +
      '<td>' + c.order + '</td>' +
      '<td>' +
        '<button class="btn-edit" style="margin-right:4px" onclick="editCategory(\'' + c.id + '\')">✏️ 编辑</button>' +
        '<button class="btn-sm btn-upload" style="margin-right:4px" onclick="showCategoryModal(null, \'' + c.id + '\')" title="在此分类下添加子分类">➕ 子分类</button>' +
        '<button class="btn-danger btn-sm" onclick="deleteCategory(\'' + c.id + '\')">🗑</button>' +
      '</td>' +
    '</tr>';
  }).join('');
}

async function deleteCategory(id) {
  var children = getCategoryChildren(id);
  if (children.length > 0) {
    showToast('该分类下还有 ' + children.length + ' 个子分类，请先删除或迁移子分类', 'error');
    return;
  }
  var productCount = APP_DATA.products.filter(function(p) { return p.category === id; }).length;
  if (productCount > 0) {
    showToast('该分类下还有 ' + productCount + ' 个产品，请先迁移或删除这些产品', 'error');
    return;
  }
  var c = APP_DATA.categories.find(function(x) { return x.id === id; });
  if (!c) return;
  if (!confirm('确定要删除分类 "' + c.nameEn + '" 吗？')) return;

  APP_DATA.categories = APP_DATA.categories.filter(function(x) { return x.id !== id; });
  await persistChange();
  renderCategoriesTable();
  populateCategoryFilter(document.getElementById('filterCategory'));
  showToast('分类已删除并同步');
}

function showCategoryModal(id, presetParentId) {
  document.getElementById('categoryModalTitle').textContent = id ? '编辑分类' : '添加分类';
  document.getElementById('categoryId').value = id || '';

  // 填充"上级分类"下拉：排除自己和自己的所有后代，防止循环嵌套
  var parentSelect = document.getElementById('categoryParent');
  var excludeIds = id ? [id].concat(getDescendantIds(id)) : [];
  parentSelect.innerHTML = '<option value="">-- 无（顶级分类）--</option>';
  getFlatCategoryList(null, excludeIds).forEach(function(item) {
    var opt = document.createElement('option');
    opt.value = item.cat.id;
    opt.textContent = '　'.repeat(item.depth) + (item.depth > 0 ? '└─ ' : '') + item.cat.icon + ' ' + item.cat.nameEn + ' / ' + item.cat.nameZh;
    parentSelect.appendChild(opt);
  });

  if (id) {
    var c = APP_DATA.categories.find(function(x) { return x.id === id; });
    if (c) {
      document.getElementById('categoryNameEn').value = c.nameEn || '';
      document.getElementById('categoryNameZh').value = c.nameZh || '';
      document.getElementById('categoryIcon').value = c.icon || '';
      document.getElementById('categoryOrder').value = c.order || 0;
      document.getElementById('categoryDescEn').value = c.descEn || '';
      document.getElementById('categoryDescZh').value = c.descZh || '';
      parentSelect.value = c.parentId || '';
    }
  } else {
    document.getElementById('categoryForm').reset();
    document.getElementById('categoryId').value = '';
    document.getElementById('categoryOrder').value = getCategoryChildren(presetParentId || null).length + 1;
    parentSelect.value = presetParentId || '';
  }

  document.getElementById('categoryModal').classList.add('active');
}

function closeCategoryModal() {
  document.getElementById('categoryModal').classList.remove('active');
}

async function saveCategory(e) {
  e.preventDefault();
  var id = document.getElementById('categoryId').value;
  var nameEn = document.getElementById('categoryNameEn').value.trim();
  var nameZh = document.getElementById('categoryNameZh').value.trim();
  var parentId = document.getElementById('categoryParent').value || null;

  if (!nameEn) { showToast('请输入分类英文名称', 'error'); return; }

  if (!id) {
    // 新增：生成 ID
    id = nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-cat';
  }

  // 安全校验：禁止把分类的上级设为自己或自己的后代（防止循环嵌套）
  if (parentId && (parentId === id || getDescendantIds(id).indexOf(parentId) > -1)) {
    showToast('上级分类不能是自己或自己的子分类', 'error');
    return;
  }

  var catData = {
    id: id,
    nameEn: nameEn,
    nameZh: nameZh,
    icon: document.getElementById('categoryIcon').value.trim(),
    order: parseInt(document.getElementById('categoryOrder').value) || 0,
    descEn: document.getElementById('categoryDescEn').value.trim(),
    descZh: document.getElementById('categoryDescZh').value.trim(),
    parentId: parentId
  };

  var existingIdx = APP_DATA.categories.findIndex(function(c) { return c.id === id; });
  if (existingIdx >= 0) {
    APP_DATA.categories[existingIdx] = catData;
  } else {
    APP_DATA.categories.push(catData);
  }

  await persistChange();
  closeCategoryModal();
  renderCategoriesTable();
  populateCategoryFilter(document.getElementById('filterCategory'));
  showToast('分类已保存并同步 ✅');
}

function editCategory(id) {
  showCategoryModal(id);
}

// ============ 页面管理 ============
function renderPagesList() {
  var pagesList = document.getElementById('pagesList');
  if (!pagesList) return;

  var pages = [
    { id: 'index', name: 'Home Page / 首页', file: 'index.html' },
    { id: 'products', name: 'Products / 产品页', file: 'products.html' },
    { id: 'about', name: 'About / 关于我们', file: 'about.html' },
    { id: 'contact', name: 'Contact / 联系我们', file: 'contact.html' },
    { id: 'why-us', name: 'Why Us / 为什么选择我们', file: 'why-us.html' },
    { id: 'specs', name: 'Specifications / 规格', file: 'specs.html' },
    { id: 'applications', name: 'Applications / 应用', file: 'applications.html' },
    { id: 'equipment', name: 'Equipment / 设备', file: 'equipment.html' }
  ];

  pagesList.innerHTML = '<div class="table-container"><table class="data-table"><thead><tr><th>页面</th><th>文件名</th><th>操作</th></tr></thead><tbody>' +
    pages.map(function(page) {
      return '<tr>' +
        '<td><strong style="color:var(--text)">' + escapeHtml(page.name) + '</strong></td>' +
        '<td style="font-family:JetBrains Mono,monospace;font-size:12px">' + escapeHtml(page.file) + '</td>' +
        '<td><button class="btn-edit" onclick="editPageContent(\'' + page.id + '\',\'' + escapeHtml(page.name) + '\')">✏️ 编辑内容</button></td>' +
      '</tr>';
    }).join('') +
    '</tbody></table></div>' +
    '<p style="margin-top:16px;color:var(--text2);font-size:13px">💡 可以通过"文件管理"直接编辑HTML文件。这里提供快捷入口。</p>';
}

function editPageContent(pageId, pageName) {
  document.getElementById('pageModalTitle').textContent = '编辑: ' + pageName;
  document.getElementById('pageId').value = pageId;
  document.getElementById('pageName').value = pageName;
  // 加载保存的页面内容
  try {
    var saved = localStorage.getItem('aecAdmin_page_' + pageId);
    document.getElementById('pageContent').value = saved || '';
  } catch (e) {
    document.getElementById('pageContent').value = '';
  }
  document.getElementById('pageModal').classList.add('active');
}

function closePageModal() {
  document.getElementById('pageModal').classList.remove('active');
}

function savePage(e) {
  e.preventDefault();
  var pageId = document.getElementById('pageId').value;
  var content = document.getElementById('pageContent').value;
  try {
    localStorage.setItem('aecAdmin_page_' + pageId, content);
    showToast('页面内容已保存 ✅ 请通过文件管理同步到源文件');
  } catch (e) {
    showToast('保存失败', 'error');
  }
  closePageModal();
}

// ============ 公司信息 ============
function loadCompanyInfo() {
  document.getElementById('companyNameEn').value = APP_DATA.company.nameEn || '';
  document.getElementById('companyNameZh').value = APP_DATA.company.nameZh || '';
  document.getElementById('sloganEn').value = APP_DATA.company.sloganEn || '';
  document.getElementById('sloganZh').value = APP_DATA.company.sloganZh || '';
  document.getElementById('companyEmail').value = APP_DATA.company.email || '';
  document.getElementById('companyPhone').value = APP_DATA.company.phone || '';
  document.getElementById('companyQQ').value = APP_DATA.company.qq || '';
  document.getElementById('addressEn').value = APP_DATA.company.addressEn || '';
  document.getElementById('addressZh').value = APP_DATA.company.addressZh || '';
  document.getElementById('icpNumber').value = APP_DATA.company.icp || '';
}

function saveCompanyInfo() {
  APP_DATA.company.nameEn = document.getElementById('companyNameEn').value.trim();
  APP_DATA.company.nameZh = document.getElementById('companyNameZh').value.trim();
  APP_DATA.company.sloganEn = document.getElementById('sloganEn').value.trim();
  APP_DATA.company.sloganZh = document.getElementById('sloganZh').value.trim();
  APP_DATA.company.email = document.getElementById('companyEmail').value.trim();
  APP_DATA.company.phone = document.getElementById('companyPhone').value.trim();
  APP_DATA.company.qq = document.getElementById('companyQQ').value.trim();
  APP_DATA.company.addressEn = document.getElementById('addressEn').value.trim();
  APP_DATA.company.addressZh = document.getElementById('addressZh').value.trim();
  APP_DATA.company.icp = document.getElementById('icpNumber').value.trim();

  saveCompanyToStorage();
  showToast('公司信息已保存 ✅');
}

// ============ 页眉页脚管理 ============

var _hfCurrentTab = 'header';

function switchHFTab(tab) {
  _hfCurrentTab = tab;
  document.getElementById('hfTabHeader').style.display = tab === 'header' ? '' : 'none';
  document.getElementById('hfTabFooter').style.display = tab === 'footer' ? '' : 'none';
  var hBtn = document.getElementById('hfTabHeaderBtn');
  var fBtn = document.getElementById('hfTabFooterBtn');
  if (tab === 'header') {
    hBtn.style.background = 'var(--gold)'; hBtn.style.color = '#000'; hBtn.style.fontWeight = '600';
    fBtn.style.background = 'transparent'; fBtn.style.color = 'var(--text2)'; fBtn.style.fontWeight = '500';
  } else {
    fBtn.style.background = 'var(--gold)'; fBtn.style.color = '#000'; fBtn.style.fontWeight = '600';
    hBtn.style.background = 'transparent'; hBtn.style.color = 'var(--text2)'; hBtn.style.fontWeight = '500';
  }
}

function loadHeaderFooterInfo() {
  var hf = APP_DATA.headerFooter;
  var h = hf.header;
  var f = hf.footer;

  // Header fields
  document.getElementById('hdrLogoPrimary').value = h.logoPrimary || '';
  document.getElementById('hdrLogoSecondary').value = h.logoSecondary || '';
  document.getElementById('hdrLogoImage').value = h.logoImage || '';
  document.getElementById('hdrLogoWidth').value = h.logoWidth || 160;
  document.getElementById('hdrTaglineEn').value = h.taglineEn || '';
  document.getElementById('hdrTaglineZh').value = h.taglineZh || '';
  document.getElementById('hdrTopBarVisible').value = h.topBarVisible || 'yes';
  document.getElementById('hdrTopEmail').value = h.topEmail || '';
  document.getElementById('hdrTopPhone').value = h.topPhone || '';
  document.getElementById('hdrTopTextEn').value = h.topTextEn || '';
  document.getElementById('hdrTopTextZh').value = h.topTextZh || '';
  document.getElementById('hdrLangSwitchVisible').value = h.langSwitchVisible || 'yes';
  document.getElementById('hdrDefaultLang').value = h.defaultLang || 'en';
  document.getElementById('hdrLangEn').value = h.langEn || 'EN';
  document.getElementById('hdrLangZh').value = h.langZh || '中文';
  document.getElementById('hdrScrollBar').value = h.scrollBar || 'yes';
  var color = h.scrollBarColor || '#8b1a2e';
  document.getElementById('hdrScrollBarColor').value = color;
  document.getElementById('hdrScrollBarColorText').value = color;

  renderNavItems(h.navItems || []);

  // Footer fields
  document.getElementById('ftrLogoPrimary').value = f.logoPrimary || '';
  document.getElementById('ftrLogoSecondary').value = f.logoSecondary || '';
  document.getElementById('ftrAboutEn').value = f.aboutEn || '';
  document.getElementById('ftrAboutZh').value = f.aboutZh || '';
  document.getElementById('ftrContactTitleEn').value = f.contactTitleEn || '';
  document.getElementById('ftrContactTitleZh').value = f.contactTitleZh || '';
  document.getElementById('ftrEmail').value = f.email || '';
  document.getElementById('ftrWhatsapp').value = f.whatsapp || '';
  document.getElementById('ftrQQ').value = f.qq || '';
  document.getElementById('ftrAddressEn').value = f.addressEn || '';
  document.getElementById('ftrAddressZh').value = f.addressZh || '';
  document.getElementById('ftrQuickLinkTitleEn').value = f.quickLinkTitleEn || '';
  document.getElementById('ftrQuickLinkTitleZh').value = f.quickLinkTitleZh || '';
  document.getElementById('ftrProductsTitleEn').value = f.productsTitleEn || '';
  document.getElementById('ftrProductsTitleZh').value = f.productsTitleZh || '';
  document.getElementById('ftrCopyrightEn').value = f.copyrightEn || '';
  document.getElementById('ftrCopyrightZh').value = f.copyrightZh || '';
  document.getElementById('ftrICP').value = f.icp || '';
  document.getElementById('ftrICPLink').value = f.icpLink || '';
  document.getElementById('ftrSocialVisible').value = f.socialVisible || 'yes';
  document.getElementById('ftrSocialWhatsapp').value = f.socialWhatsapp || '';
  document.getElementById('ftrSocialLinkedin').value = f.socialLinkedin || '';
  document.getElementById('ftrSocialFacebook').value = f.socialFacebook || '';
  document.getElementById('ftrSocialYoutube').value = f.socialYoutube || '';
  document.getElementById('ftrMadeinChina').value = f.madeinChina || '';
  document.getElementById('ftrCertBadges').value = f.certBadges || '';

  document.getElementById('ftrFriendLinksVisible').value = f.friendLinksVisible || 'yes';
  document.getElementById('ftrFriendLinkTitleEn').value = f.friendLinkTitleEn || 'Friend Links';
  document.getElementById('ftrFriendLinkTitleZh').value = f.friendLinkTitleZh || '友情链接';
  renderFriendLinks(f.friendLinks || []);

  renderFooterLinks(f.quickLinks || []);
  renderFooterProducts(f.footerProducts || []);

  // Reset to header tab
  switchHFTab('header');
}

function saveHeaderFooterInfo() {
  var hf = APP_DATA.headerFooter;
  var h = hf.header;
  var f = hf.footer;

  // Read header
  h.logoPrimary = document.getElementById('hdrLogoPrimary').value.trim();
  h.logoSecondary = document.getElementById('hdrLogoSecondary').value.trim();
  h.logoImage = document.getElementById('hdrLogoImage').value.trim();
  h.logoWidth = parseInt(document.getElementById('hdrLogoWidth').value) || 160;
  h.taglineEn = document.getElementById('hdrTaglineEn').value.trim();
  h.taglineZh = document.getElementById('hdrTaglineZh').value.trim();
  h.topBarVisible = document.getElementById('hdrTopBarVisible').value;
  h.topEmail = document.getElementById('hdrTopEmail').value.trim();
  h.topPhone = document.getElementById('hdrTopPhone').value.trim();
  h.topTextEn = document.getElementById('hdrTopTextEn').value.trim();
  h.topTextZh = document.getElementById('hdrTopTextZh').value.trim();
  h.langSwitchVisible = document.getElementById('hdrLangSwitchVisible').value;
  h.defaultLang = document.getElementById('hdrDefaultLang').value;
  h.langEn = document.getElementById('hdrLangEn').value.trim();
  h.langZh = document.getElementById('hdrLangZh').value.trim();
  h.scrollBar = document.getElementById('hdrScrollBar').value;
  h.scrollBarColor = document.getElementById('hdrScrollBarColorText').value.trim() || document.getElementById('hdrScrollBarColor').value;
  h.navItems = collectNavItems();

  // Read footer
  f.logoPrimary = document.getElementById('ftrLogoPrimary').value.trim();
  f.logoSecondary = document.getElementById('ftrLogoSecondary').value.trim();
  f.aboutEn = document.getElementById('ftrAboutEn').value.trim();
  f.aboutZh = document.getElementById('ftrAboutZh').value.trim();
  f.contactTitleEn = document.getElementById('ftrContactTitleEn').value.trim();
  f.contactTitleZh = document.getElementById('ftrContactTitleZh').value.trim();
  f.email = document.getElementById('ftrEmail').value.trim();
  f.whatsapp = document.getElementById('ftrWhatsapp').value.trim();
  f.qq = document.getElementById('ftrQQ').value.trim();
  f.addressEn = document.getElementById('ftrAddressEn').value.trim();
  f.addressZh = document.getElementById('ftrAddressZh').value.trim();
  f.quickLinkTitleEn = document.getElementById('ftrQuickLinkTitleEn').value.trim();
  f.quickLinkTitleZh = document.getElementById('ftrQuickLinkTitleZh').value.trim();
  f.productsTitleEn = document.getElementById('ftrProductsTitleEn').value.trim();
  f.productsTitleZh = document.getElementById('ftrProductsTitleZh').value.trim();
  f.copyrightEn = document.getElementById('ftrCopyrightEn').value.trim();
  f.copyrightZh = document.getElementById('ftrCopyrightZh').value.trim();
  f.icp = document.getElementById('ftrICP').value.trim();
  f.icpLink = document.getElementById('ftrICPLink').value.trim();
  f.socialVisible = document.getElementById('ftrSocialVisible').value;
  f.socialWhatsapp = document.getElementById('ftrSocialWhatsapp').value.trim();
  f.socialLinkedin = document.getElementById('ftrSocialLinkedin').value.trim();
  f.socialFacebook = document.getElementById('ftrSocialFacebook').value.trim();
  f.socialYoutube = document.getElementById('ftrSocialYoutube').value.trim();
  f.madeinChina = document.getElementById('ftrMadeinChina').value.trim();
  f.certBadges = document.getElementById('ftrCertBadges').value.trim();
  f.friendLinksVisible = document.getElementById('ftrFriendLinksVisible').value;
  f.friendLinkTitleEn = document.getElementById('ftrFriendLinkTitleEn').value.trim();
  f.friendLinkTitleZh = document.getElementById('ftrFriendLinkTitleZh').value.trim();
  f.friendLinks = collectFriendLinks();
  f.quickLinks = collectFooterLinks();
  f.footerProducts = collectFooterProducts();

  saveHeaderFooterToStorage();
  showToast('页眉页脚信息已保存 ✅');
}

// ------- 导航菜单 项渲染/增删 -------

function renderNavItems(items) {
  var container = document.getElementById('navItemsList');
  container.innerHTML = '';
  items.forEach(function(item, idx) {
    container.appendChild(createNavItemRow(item, idx));
  });
}

function createNavItemRow(item, idx) {
  var row = document.createElement('div');
  row.className = 'nav-item-row';
  row.style.cssText = 'display:flex;gap:8px;align-items:center;background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:8px;padding:8px 10px';
  row.dataset.idx = idx;
  row.innerHTML =
    '<span style="color:var(--text2);cursor:grab;font-size:16px" title="拖拽排序">⠿</span>' +
    '<input type="text" class="nav-label-en" value="' + escapeHtml(item.labelEn || '') + '" placeholder="菜单名(EN)" style="flex:1;min-width:80px">' +
    '<input type="text" class="nav-label-zh" value="' + escapeHtml(item.labelZh || '') + '" placeholder="菜单名(ZH)" style="flex:1;min-width:80px">' +
    '<input type="text" class="nav-url" value="' + escapeHtml(item.url || '') + '" placeholder="链接 e.g. products.html" style="flex:2;min-width:120px">' +
    '<select class="nav-open-new" style="width:80px;font-size:12px">' +
      '<option value="no" ' + (item.newTab ? '' : 'selected') + '>当前页</option>' +
      '<option value="yes" ' + (item.newTab ? 'selected' : '') + '>新标签</option>' +
    '</select>' +
    '<button type="button" onclick="moveNavItem(this,-1)" title="上移" style="padding:3px 7px;background:transparent;border:1px solid var(--border);border-radius:4px;color:var(--text);cursor:pointer">↑</button>' +
    '<button type="button" onclick="moveNavItem(this,1)" title="下移" style="padding:3px 7px;background:transparent;border:1px solid var(--border);border-radius:4px;color:var(--text);cursor:pointer">↓</button>' +
    '<button type="button" onclick="removeNavItemRow(this)" title="删除" style="padding:3px 8px;background:rgba(220,50,50,.15);border:1px solid rgba(220,50,50,.4);border-radius:4px;color:#f88;cursor:pointer">✕</button>';
  return row;
}

function addNavItem() {
  var container = document.getElementById('navItemsList');
  var idx = container.children.length;
  container.appendChild(createNavItemRow({ labelEn: '', labelZh: '', url: '', newTab: false }, idx));
}

function removeNavItemRow(btn) {
  btn.closest('.nav-item-row').remove();
}

function moveNavItem(btn, dir) {
  var row = btn.closest('.nav-item-row');
  var container = row.parentNode;
  var rows = Array.from(container.children);
  var idx = rows.indexOf(row);
  var newIdx = idx + dir;
  if (newIdx < 0 || newIdx >= rows.length) return;
  if (dir === -1) container.insertBefore(row, rows[newIdx]);
  else container.insertBefore(rows[newIdx], row);
}

function collectNavItems() {
  var rows = document.querySelectorAll('#navItemsList .nav-item-row');
  var items = [];
  rows.forEach(function(row) {
    items.push({
      labelEn: row.querySelector('.nav-label-en').value.trim(),
      labelZh: row.querySelector('.nav-label-zh').value.trim(),
      url: row.querySelector('.nav-url').value.trim(),
      newTab: row.querySelector('.nav-open-new').value === 'yes'
    });
  });
  return items;
}

// ------- 页脚快速链接 -------

function renderFooterLinks(links) {
  var container = document.getElementById('footerLinksList');
  container.innerHTML = '';
  links.forEach(function(link, idx) {
    container.appendChild(createFooterLinkRow(link, idx));
  });
}

function createFooterLinkRow(link, idx) {
  var row = document.createElement('div');
  row.className = 'footer-link-row';
  row.style.cssText = 'display:flex;gap:8px;align-items:center;background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:8px;padding:8px 10px';
  row.innerHTML =
    '<input type="text" class="fl-label-en" value="' + escapeHtml(link.labelEn || '') + '" placeholder="链接名(EN)" style="flex:1">' +
    '<input type="text" class="fl-label-zh" value="' + escapeHtml(link.labelZh || '') + '" placeholder="链接名(ZH)" style="flex:1">' +
    '<input type="text" class="fl-url" value="' + escapeHtml(link.url || '') + '" placeholder="URL" style="flex:2">' +
    '<button type="button" onclick="this.closest(\'.footer-link-row\').remove()" style="padding:3px 8px;background:rgba(220,50,50,.15);border:1px solid rgba(220,50,50,.4);border-radius:4px;color:#f88;cursor:pointer">✕</button>';
  return row;
}

function addFooterLink() {
  var container = document.getElementById('footerLinksList');
  container.appendChild(createFooterLinkRow({ labelEn: '', labelZh: '', url: '' }));
}

function collectFooterLinks() {
  var rows = document.querySelectorAll('#footerLinksList .footer-link-row');
  var items = [];
  rows.forEach(function(row) {
    items.push({
      labelEn: row.querySelector('.fl-label-en').value.trim(),
      labelZh: row.querySelector('.fl-label-zh').value.trim(),
      url: row.querySelector('.fl-url').value.trim()
    });
  });
  return items;
}

// ------- 页脚产品栏 -------

function renderFooterProducts(products) {
  var container = document.getElementById('footerProductsList');
  container.innerHTML = '';
  products.forEach(function(p) {
    container.appendChild(createFooterProductRow(p));
  });
}

function createFooterProductRow(p) {
  var row = document.createElement('div');
  row.className = 'footer-product-row';
  row.style.cssText = 'display:flex;gap:8px;align-items:center;background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:8px;padding:8px 10px';
  row.innerHTML =
    '<input type="text" class="fp-label-en" value="' + escapeHtml(p.labelEn || '') + '" placeholder="产品名(EN)" style="flex:1">' +
    '<input type="text" class="fp-label-zh" value="' + escapeHtml(p.labelZh || '') + '" placeholder="产品名(ZH)" style="flex:1">' +
    '<input type="text" class="fp-url" value="' + escapeHtml(p.url || '') + '" placeholder="URL" style="flex:2">' +
    '<button type="button" onclick="this.closest(\'.footer-product-row\').remove()" style="padding:3px 8px;background:rgba(220,50,50,.15);border:1px solid rgba(220,50,50,.4);border-radius:4px;color:#f88;cursor:pointer">✕</button>';
  return row;
}

function addFooterProduct() {
  var container = document.getElementById('footerProductsList');
  container.appendChild(createFooterProductRow({ labelEn: '', labelZh: '', url: '' }));
}

function collectFooterProducts() {
  var rows = document.querySelectorAll('#footerProductsList .footer-product-row');
  var items = [];
  rows.forEach(function(row) {
    items.push({
      labelEn: row.querySelector('.fp-label-en').value.trim(),
      labelZh: row.querySelector('.fp-label-zh').value.trim(),
      url: row.querySelector('.fp-url').value.trim()
    });
  });
  return items;
}

// ------- 友情链接 -------

function renderFriendLinks(links) {
  var container = document.getElementById('friendLinksList');
  container.innerHTML = '';
  links.forEach(function(link) {
    container.appendChild(createFriendLinkRow(link));
  });
}

function createFriendLinkRow(link) {
  var row = document.createElement('div');
  row.className = 'friend-link-row';
  row.style.cssText = 'display:flex;gap:8px;align-items:center;background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:8px;padding:8px 10px';
  row.innerHTML =
    '<input type="text" class="flink-icon" value="' + escapeHtml(link.icon || '') + '" placeholder="图标" style="width:52px;text-align:center;font-size:16px">' +
    '<input type="text" class="flink-label-en" value="' + escapeHtml(link.labelEn || '') + '" placeholder="名称(EN)" style="flex:1.2">' +
    '<input type="text" class="flink-label-zh" value="' + escapeHtml(link.labelZh || '') + '" placeholder="名称(ZH)" style="flex:1">' +
    '<input type="text" class="flink-url" value="' + escapeHtml(link.url || '') + '" placeholder="https://..." style="flex:2">' +
    '<button type="button" onclick="moveFriendLink(this,-1)" title="上移" style="padding:3px 7px;background:transparent;border:1px solid var(--border);border-radius:4px;color:var(--text);cursor:pointer">↑</button>' +
    '<button type="button" onclick="moveFriendLink(this,1)" title="下移" style="padding:3px 7px;background:transparent;border:1px solid var(--border);border-radius:4px;color:var(--text);cursor:pointer">↓</button>' +
    '<button type="button" onclick="this.closest(\'.friend-link-row\').remove()" style="padding:3px 8px;background:rgba(220,50,50,.15);border:1px solid rgba(220,50,50,.4);border-radius:4px;color:#f88;cursor:pointer">✕</button>';
  return row;
}

function addFriendLink() {
  var container = document.getElementById('friendLinksList');
  container.appendChild(createFriendLinkRow({ icon: '🔗', labelEn: '', labelZh: '', url: '' }));
}

function moveFriendLink(btn, dir) {
  var row = btn.closest('.friend-link-row');
  var container = row.parentNode;
  var rows = Array.from(container.children);
  var idx = rows.indexOf(row);
  var newIdx = idx + dir;
  if (newIdx < 0 || newIdx >= rows.length) return;
  if (dir === -1) container.insertBefore(row, rows[newIdx]);
  else container.insertBefore(rows[newIdx], row);
}

function collectFriendLinks() {
  var rows = document.querySelectorAll('#friendLinksList .friend-link-row');
  var items = [];
  rows.forEach(function(row) {
    items.push({
      icon: row.querySelector('.flink-icon').value.trim(),
      labelEn: row.querySelector('.flink-label-en').value.trim(),
      labelZh: row.querySelector('.flink-label-zh').value.trim(),
      url: row.querySelector('.flink-url').value.trim()
    });
  });
  return items;
}

// 颜色选择器同步 input[type=color] 与文字输入框
function syncColorFromText(colorId, textId) {
  var textEl = document.getElementById(textId);
  var colorEl = document.getElementById(colorId);
  var val = textEl.value.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(val)) colorEl.value = val;
}

// ============ 持久化存储 ============
function saveProductsToStorage() {
  try {
    localStorage.setItem('aecAdmin_products', JSON.stringify(stripTransientFields(APP_DATA.products)));
  } catch (e) {
    showToast('产品数据保存失败，请检查浏览器存储空间', 'error');
  }
}

function saveCategoriesToStorage() {
  try {
    localStorage.setItem('aecAdmin_categories', JSON.stringify(APP_DATA.categories));
  } catch (e) {
    showToast('分类数据保存失败', 'error');
  }
}

function saveCompanyToStorage() {
  try {
    localStorage.setItem('aecAdmin_company', JSON.stringify(APP_DATA.company));
  } catch (e) {
    showToast('公司信息保存失败', 'error');
  }
}

function saveHeaderFooterToStorage() {
  try {
    localStorage.setItem('aecAdmin_headerFooter', JSON.stringify(APP_DATA.headerFooter));
  } catch (e) {
    showToast('页眉页脚保存失败', 'error');
  }
}

async function saveAllData() {
  saveProductsToStorage();
  saveCategoriesToStorage();
  saveCompanyToStorage();
  saveHeaderFooterToStorage();
  var diskOk = await writeProductsDataToDisk(true);

  var now = new Date().toLocaleString('zh-CN');
  localStorage.setItem('aecAdmin_lastSave', now);
  document.getElementById('lastSave').textContent = now;
  if (diskOk) {
    document.getElementById('statusIndicator').innerHTML = '● 已同步到前端';
    document.getElementById('statusIndicator').style.color = 'var(--green)';
    showToast('所有数据已保存并同步到前端 💾');
  } else {
    document.getElementById('statusIndicator').innerHTML = '⚠️ 未同步（未连接文件夹）';
    document.getElementById('statusIndicator').style.color = '#ff9800';
    // 未连接时已在 persistChange 里自动触发下载
    setTimeout(function() {
      alert('⚠️ 未连接网站文件夹\n\n' +
        '已自动下载 products-data.js\n\n' +
        '请将下载文件复制到 aec-project/ 文件夹后刷新前端页面。\n\n' +
        '建议：左侧"文件管理" → 选择 aec-project 文件夹，之后每次保存将自动同步。');
    }, 400);
  }
}

// ============ 表单初始化 ============
function initForms() {
  var productForm = document.getElementById('productForm');
  if (productForm) productForm.addEventListener('submit', saveProduct);

  var categoryForm = document.getElementById('categoryForm');
  if (categoryForm) categoryForm.addEventListener('submit', saveCategory);

  var pageForm = document.getElementById('pageForm');
  if (pageForm) pageForm.addEventListener('submit', savePage);

  // 弹窗关闭（点击背景）
  document.querySelectorAll('.modal').forEach(function(modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) modal.classList.remove('active');
    });
  });
}

// ============ 导出/导入 ============
function exportData() {
  var data = {
    version: '2.0',
    exportDate: new Date().toISOString(),
    products: APP_DATA.products,
    categories: APP_DATA.categories,
    company: APP_DATA.company,
    headerFooter: APP_DATA.headerFooter
  };
  var json = JSON.stringify(data, null, 2);
  var blob = new Blob([json], { type: 'application/json' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'aec-backup-' + new Date().toISOString().slice(0, 10) + '.json';
  a.click();
  URL.revokeObjectURL(url);
  showToast('数据已导出 📤');
}

function importData(event) {
  var file = event.target.files[0];
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var data = JSON.parse(e.target.result);
      if (data.products && data.products.length > 0) {
        APP_DATA.products = data.products;
        saveProductsToStorage();
      }
      if (data.categories && data.categories.length > 0) {
        APP_DATA.categories = data.categories;
        saveCategoriesToStorage();
      }
      if (data.company) {
        APP_DATA.company = data.company;
        saveCompanyToStorage();
      }
      if (data.headerFooter) {
        APP_DATA.headerFooter = data.headerFooter;
        saveHeaderFooterToStorage();
      }

      // 重新计算 NEXT_ID
      var maxId = 0;
      APP_DATA.products.forEach(function(p) { if (p.id > maxId) maxId = p.id; });
      NEXT_ID = maxId + 1;

      // 同步保存时间
      var now = new Date().toLocaleString('zh-CN');
      localStorage.setItem('aecAdmin_lastSave', now);

      renderProductsTable();
      renderCategoriesTable();
      loadCompanyInfo();
      if (typeof loadHeaderFooterInfo === 'function') loadHeaderFooterInfo();
      updateDashboard();
      populateCategoryFilter(document.getElementById('filterCategory'));
      writeProductsDataToDisk(true); // 导入后也自动同步到磁盘
      showToast('数据导入成功 ✅ (' + data.products.length + ' 个产品, ' + (data.categories ? data.categories.length : 0) + ' 个分类)');
    } catch (err) {
      showToast('导入失败：数据格式不正确', 'error');
    }
  };
  reader.readAsText(file);
  event.target.value = ''; // 重置以便重复导入
}

// ============ 文件夹授权持久化 (IndexedDB) ============
// File System Access API 的文件夹句柄(handle)本身可以存进 IndexedDB，
// 这样下次打开后台时不需要重新"选择文件夹"，只需重新点一下"恢复连接"授权即可
// （浏览器安全策略要求每次会话必须有一次用户手势才能重新拿到读写权限，
// 但比起重新弹窗选择文件夹，这只是简单的一次点击）
function openHandleDB() {
  return new Promise(function(resolve, reject) {
    if (!window.indexedDB) { reject(new Error('当前浏览器不支持 IndexedDB')); return; }
    var req = indexedDB.open('aecAdminFS', 1);
    req.onupgradeneeded = function() {
      if (!req.result.objectStoreNames.contains('handles')) {
        req.result.createObjectStore('handles');
      }
    };
    req.onsuccess = function() { resolve(req.result); };
    req.onerror = function() { reject(req.error); };
  });
}

async function idbSetHandle(handle) {
  try {
    var db = await openHandleDB();
    await new Promise(function(resolve, reject) {
      var tx = db.transaction('handles', 'readwrite');
      tx.objectStore('handles').put(handle, 'siteFolder');
      tx.oncomplete = function() { resolve(); };
      tx.onerror = function() { reject(tx.error); };
    });
  } catch (e) { /* IndexedDB 不可用时静默忽略，不影响主流程 */ }
}

async function idbGetHandle() {
  try {
    var db = await openHandleDB();
    return await new Promise(function(resolve, reject) {
      var tx = db.transaction('handles', 'readonly');
      var req = tx.objectStore('handles').get('siteFolder');
      req.onsuccess = function() { resolve(req.result || null); };
      req.onerror = function() { reject(req.error); };
    });
  } catch (e) { return null; }
}

function updateFolderStatusUI(name, connected) {
  var el = document.getElementById('folderStatus');
  var reconnectBtn = document.getElementById('btnReconnectFolder');
  if (!el) return;
  if (connected) {
    el.textContent = '✅ 已连接: ' + name + '（修改将自动同步到磁盘文件）';
    el.style.color = 'var(--green)';
    if (reconnectBtn) reconnectBtn.style.display = 'none';
  } else {
    el.textContent = '⚠️ 检测到曾连接过 "' + name + '"，浏览器权限已过期，请点击右侧按钮重新授权';
    el.style.color = 'var(--gold)';
    if (reconnectBtn) reconnectBtn.style.display = 'inline-block';
  }
}

// 页面打开时静默尝试恢复之前保存的文件夹授权（不弹窗，只查询权限状态）
async function restoreFolderHandle() {
  if (!window.showDirectoryPicker) return; // 浏览器不支持该 API，跳过
  var handle = await idbGetHandle();
  if (!handle) return;
  try {
    var perm = await handle.queryPermission({ mode: 'readwrite' });
    if (perm === 'granted') {
      window._siteFolderHandle = handle;
      updateFolderStatusUI(handle.name, true);
      // ★ 关键：从磁盘读取最新数据，确保后台与前端一致
      await readProductsDataFromFolder();
    } else {
      window._pendingFolderHandle = handle;
      updateFolderStatusUI(handle.name, false);
    }
  } catch (e) { /* 句柄可能已失效（例如文件夹被移动/删除），忽略 */ }
}

// 用户点击"恢复连接"按钮时调用：这是一次真实的用户手势，可以重新申请权限
async function reconnectFolder() {
  if (!window._pendingFolderHandle) {
    showToast('没有可恢复的文件夹记录，请改用"选择网站文件夹"重新连接', 'error');
    return;
  }
  try {
    var perm = await window._pendingFolderHandle.requestPermission({ mode: 'readwrite' });
    if (perm === 'granted') {
      window._siteFolderHandle = window._pendingFolderHandle;
      updateFolderStatusUI(window._siteFolderHandle.name, true);
      showToast('文件夹授权已恢复 ✅ 正在从磁盘加载最新数据...');
      // ★ 直接从磁盘读取，不需要整页重载（避免丢失用户未保存的其他设置）
      var ok = await readProductsDataFromFolder();
      if (!ok) { setTimeout(function() { location.reload(); }, 800); }
    } else {
      showToast('授权被拒绝，请改用"选择网站文件夹"重新连接', 'error');
    }
  } catch (e) {
    showToast('恢复失败: ' + e.message, 'error');
  }
}

// ============ 自动写盘同步 ============
// 把当前 APP_DATA 写入 aec-project/products-data.js（真正的同步，不是下载）
// silent=true 时不弹大提示，只更新状态指示灯，用于"每次修改自动触发"的场景
// ★ 所有磁盘写入必须经过 ProductsSyncGuard.safeWriteProductsData()，
//   它会在数量异常骤降时自动拦截，并在写入前自动备份旧文件到 backups/ 子目录。
//   见 products-sync-guard.js。
async function writeProductsDataToDisk(silent, force) {
  if (!window._siteFolderHandle) return false;
  if (typeof window.ProductsSyncGuard === 'undefined') {
    console.error('products-sync-guard.js 未加载，为安全起见拒绝写盘。');
    if (!silent) showToast('安全模块未加载，已取消写盘（请检查 index.html 是否引入了 products-sync-guard.js）', 'error');
    return false;
  }
  var data = getAdminProductsForFrontend();
  // ── Auto-fill detailLink for any product that still has an empty one ──
  // This ensures EVERY product is clickable on the frontend via product.html?id=N
  data.products = data.products.map(function(p) {
    if (!p.detailLink || !p.detailLink.trim()) {
      return Object.assign({}, p, { detailLink: 'product.html?id=' + p.id });
    }
    return p;
  });

  var result = await window.ProductsSyncGuard.safeWriteProductsData(window._siteFolderHandle, data, { force: !!force });

  if (result.blocked) {
    // 危险下降：不写盘，弹出确认框，用户主动确认后才允许强制覆盖
    var confirmMsg = result.reason + '\n\n点击"确定"表示我已核实过，仍要用当前 ' + result.newCount + ' 个产品覆盖磁盘文件。';
    if (window.confirm(confirmMsg)) {
      return await writeProductsDataToDisk(silent, true); // 用户已确认，强制重试一次
    }
    showToast('⛔ 已取消写盘，磁盘上的产品数据未被修改（当前 ' + result.newCount + ' 个 vs 历史记录 ' + result.lastGoodCount + ' 个）', 'error');
    return false;
  }

  if (result.ok) {
    var statusEl = document.getElementById('statusIndicator');
    if (statusEl) {
      statusEl.innerHTML = '● 已自动同步 ' + new Date().toLocaleTimeString('zh-CN') + '（' + result.newCount + ' 个产品，已自动备份旧文件）';
      statusEl.style.color = 'var(--green)';
    }
    if (!silent) showToast('✅ 已同步到 aec-project/products-data.js（' + result.newCount + ' 个产品）');
    return true;
  }

  if (!silent) showToast('自动同步失败：' + result.reason, 'error');
  return false;
}

// ── 从已连接文件夹读取最新 products-data.js，作为后台的唯一真实数据源 ──────────
// 问题背景：
//   admin/index.html 的 <script src="products-data.js"> 加载的是 admin/ 目录下的副本，
//   这份副本可能是旧版本（甚至空模板）。
//   aec-project/products-data.js 才是前端真正读取的那份、也是用户每次保存后写入的那份。
//   连接文件夹后必须从磁盘重新读取，确保后台看到的数据和前端完全一致。
async function readProductsDataFromFolder() {
  if (!window._siteFolderHandle) return false;
  try {
    var fileHandle = await window._siteFolderHandle.getFileHandle('products-data.js');
    var file = await fileHandle.getFile();
    var text = await file.text();
    // 提取 JSON 数据（匹配 var productsData = {...};）
    var match = text.match(/var\s+productsData\s*=\s*(\{[\s\S]*?\});\s*(?:\n|if)/);
    if (!match) {
      // 尝试更宽松的匹配
      var start = text.indexOf('{');
      var end = text.lastIndexOf('}');
      if (start !== -1 && end !== -1) {
        try {
          var pd2 = JSON.parse(text.slice(start, end + 1));
          if (pd2 && pd2.products) {
            applyDiskData(pd2);
            return true;
          }
        } catch(e) {}
      }
      return false;
    }
    try {
      var pd = JSON.parse(match[1]);
      if (pd && pd.products && pd.categories) {
        applyDiskData(pd);
        return true;
      }
    } catch(e) { return false; }
  } catch(e) {
    // products-data.js 不在该文件夹里（可能用户选错了文件夹）
    return false;
  }
  return false;
}

function applyDiskData(pd) {
  APP_DATA.products   = pd.products   || [];
  APP_DATA.categories = pd.categories || [];
  // ★ 防御性清理：如果磁盘上的 products-data.js 之前已经被 _blobUrl 污染过
  // （历史遗留问题），这里统一清掉，这样 loadProductImageBlobUrls() 才会
  // 重新为每个产品生成本次会话有效的 blob URL，而不是一直沿用磁盘里那个
  // 早已失效的 "blob:null/xxxx" 死链接。
  APP_DATA.products.forEach(function(p) { delete p._blobUrl; });
  // 重置 NEXT_ID 避免 ID 冲突
  var maxId = 0;
  APP_DATA.products.forEach(function(p) { if (p.id > maxId) maxId = p.id; });
  NEXT_ID = maxId + 1;
  // ★ 关键修复：不清除 deletedIds！
  // 磁盘文件可能是旧版本（写盘失败时），如果清除墓碑，刷新后已删除的产品会从旧文件复活。
  // 正确做法：把磁盘里实际存在的产品 ID 从墓碑中移除（它们是合法存在的），
  // 但不在磁盘里的 ID 如果在墓碑里，说明它们之前被删除了，继续保持墓碑。
  try {
    var diskIds = {};
    APP_DATA.products.forEach(function(p) { diskIds[p.id] = true; });
    var tombstoneRaw = localStorage.getItem('aecAdmin_deletedIds');
    var tombstones   = tombstoneRaw ? JSON.parse(tombstoneRaw) : [];
    // 只保留那些「磁盘里也没有」的墓碑条目（磁盘有的说明是合法保留的）
    var filteredTombstones = tombstones.filter(function(id) { return !diskIds[id]; });
    localStorage.setItem('aecAdmin_deletedIds', JSON.stringify(filteredTombstones));
  } catch(e) {}
  // 用磁盘数据刷新 localStorage
  try {
    localStorage.setItem('aecAdmin_products',   JSON.stringify(APP_DATA.products));
    localStorage.setItem('aecAdmin_categories', JSON.stringify(APP_DATA.categories));
  } catch(e) {}
  renderProductsTable();
  renderCategoriesTable();
  updateDashboard();
  populateCategoryFilter(document.getElementById('filterCategory'));
}

// 统一的"保存并同步"入口：每次产品/分类数据变更后调用
async function persistChange() {
  saveProductsToStorage();
  saveCategoriesToStorage();
  var diskOk = await writeProductsDataToDisk(true);
  if (!diskOk && !window._siteFolderHandle) {
    // 未连接文件夹：强制下载，不允许静默失败
    _triggerProductsDataDownload();
  }
  return diskOk;
}

// 下载 products-data.js 的通用方法（未连接文件夹时的兜底方案）
function _triggerProductsDataDownload() {
  var data = getAdminProductsForFrontend();
  var js = '// Auto-generated by AEC Admin - ' + new Date().toISOString() + '\n';
  js += 'var productsData = ' + JSON.stringify(data, null, 2) + ';\n';
  js += 'if (typeof window !== "undefined") { window.productsData = productsData; }\n';
  var blob = new Blob([js], { type: 'text/javascript' });
  var url  = URL.createObjectURL(blob);
  var a    = document.createElement('a');
  a.href     = url;
  a.download = 'products-data.js';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function() { URL.revokeObjectURL(url); }, 5000);
}
// 说明：admin 后台所在文件夹 (files--/admin) 和真正的前端网站文件夹 (aec-project)
// 是 Desktop 下的两个并列文件夹，所以从 admin/index.html 用相对路径 "../../aec-project/products.html"
// 就能精确定位到： C:\Users\DELL\Desktop\aec-project\products.html
// ============ 预览网站 ============
// file:// 协议下 blob: URL 无法正确加载有相对路径依赖的页面（JS/CSS 全失效）
// 正确方式：直接推算出前端页面的 file:// 绝对路径并 window.open()
function previewSite() {
  var currentHref = window.location.href;
  // 当前: file:///C:/Users/DELL/Desktop/admin/index.html
  // 目标: file:///C:/Users/DELL/Desktop/aec-project/products.html
  var adminDir    = currentHref.substring(0, currentHref.lastIndexOf('/'));
  var desktopDir  = adminDir.substring(0, adminDir.lastIndexOf('/'));
  var frontendUrl = desktopDir + '/aec-project/products.html';

  var win = window.open(frontendUrl, '_blank');
  if (!win) {
    alert('预览提示：\n\n浏览器阻止了弹窗。\n\n请在浏览器地址栏手动输入：\n' + frontendUrl);
    return;
  }
  showToast('✅ 已打开前端页面。如内容未更新，请先「同步到前端网站」再刷新（F5）');
}

function _showPreviewInstructions() {
  alert('同步提示：\n\n' +
    '前端页面数据 100% 来自 aec-project\\products-data.js\n\n' +
    '同步步骤：\n' +
    '① 点左侧「同步到前端网站」按钮，下载 products-data.js\n' +
    '② 将下载的文件复制到：\n' +
    '   C:\\Users\\DELL\\Desktop\\aec-project\\products-data.js（覆盖）\n' +
    '③ 刷新前端页面（F5）即可看到最新内容\n\n' +
    '💡 连接文件夹后可自动同步：\n' +
    '   左侧菜单「文件管理」→「选择网站文件夹」→ 选 aec-project');
}

// ============ 同步到前端网站 ============
async function syncToFrontend() {
  // 方案1：已连接 aec-project 文件夹 → 直接写盘
  if (window._siteFolderHandle) {
    var ok = await writeProductsDataToDisk(false);
    if (ok) {
      showToast('✅ 已同步！products-data.js 已写入 aec-project，刷新前端页面即可（F5）');
      return;
    }
  }

  // 方案2：未连接文件夹 → 下载文件，提示手动替换
  var data = getAdminProductsForFrontend();
  var js = '// Auto-generated by AEC Admin - ' + new Date().toISOString() + '\n';
  js += 'var productsData = ' + JSON.stringify(data, null, 2) + ';\n';
  js += 'if (typeof window !== \'undefined\') { window.productsData = productsData; }\n';

  // 用 <a download> 触发下载（避免 blob:null origin 错误）
  var blob = new Blob([js], { type: 'text/javascript' });
  var url  = URL.createObjectURL(blob);
  var a    = document.createElement('a');
  a.href     = url;
  a.download = 'products-data.js';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function() { URL.revokeObjectURL(url); }, 5000);

  showToast('📥 已下载 products-data.js，请复制到 aec-project\\ 文件夹后刷新前端页面');
  setTimeout(function() { _showPreviewInstructions(); }, 600);
}

// 保留旧名，避免 onclick="exportAsProductsData()" 报错
async function exportAsProductsData() {
  return syncToFrontend();
}

// ============ 文件管理 ============
async function selectFolder() {
  try {
    // 使用 File System Access API 选择文件夹
    if (!window.showDirectoryPicker) {
      showToast('当前浏览器不支持 File System Access API，请使用 Chrome 或 Edge', 'error');
      return;
    }
    window._siteFolderHandle = await window.showDirectoryPicker();
    await idbSetHandle(window._siteFolderHandle);
    updateFolderStatusUI(window._siteFolderHandle.name, true);
    showToast('文件夹已连接，正在读取最新数据...');
    // ★ 关键：优先从磁盘读取 aec-project/products-data.js（前端真实数据）
    // 而不是使用 admin/ 目录下可能过时的副本。
    var diskReadOk = await readProductsDataFromFolder();
    if (diskReadOk) {
      showToast('✅ 已连接 ' + window._siteFolderHandle.name + '，从磁盘加载了最新数据');
    } else {
      // ★ 安全修复：以前这里会自动把当前后台数据写盘"初始化"文件，
      //   如果选错了文件夹、或者 products-data.js 解析失败，
      //   就会用后台里(可能很少)的数据直接覆盖掉磁盘上真实的文件。
      //   现在改为：只提示、不写盘，交由用户确认后手动点「同步到前端网站」。
      showToast('⚠️ 未能在该文件夹中读取到有效的 products-data.js。如果这是新网站请手动点"同步到前端网站"创建；如果不是，请确认选择的是正确的 aec-project 文件夹，避免误覆盖', 'error');
    }
    // 加载产品图片预览
    loadProductImageBlobUrls();
  } catch (e) {
    if (e.name !== 'AbortError') {
      showToast('文件夹选择失败: ' + e.message, 'error');
    }
  }
}

// ============ 工具函数 ============
function showToast(msg, type) {
  var toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = 'toast ' + (type || '') + ' show';
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(function() {
    toast.classList.remove('show');
  }, 3000);
}

// ============ 产品图片预览（从文件夹句柄加载 blob URL）============
// 因为后台(admin/)和前端(aec-project/)在不同目录，相对路径 "images/xxx.jpg"
// 在后台中无法直接用 <img src="images/xxx.jpg"> 显示（路径是 aec-project/images/）。
// 解决方案：当文件夹已连接时，通过 File System Access API 读取图片文件并生成 blob URL。
// blob URL 存入 p._blobUrl，renderProductsTable 重新渲染时自动使用。
async function loadProductImageBlobUrls() {
  if (!window._siteFolderHandle) return;
  var products = APP_DATA.products;
  var changed = false;
  for (var i = 0; i < products.length; i++) {
    var p = products[i];
    if (!p.image || p._blobUrl) continue; // 已加载或无图片则跳过
    try {
      var imgPath = p.image; // e.g. "images/AEC-group-foo.jpg"
      var parts = imgPath.split('/');
      var dirHandle = window._siteFolderHandle;
      // Navigate into subdirectory if needed (e.g. "images/")
      for (var d = 0; d < parts.length - 1; d++) {
        dirHandle = await dirHandle.getDirectoryHandle(parts[d]);
      }
      var fileHandle = await dirHandle.getFileHandle(parts[parts.length - 1]);
      var file = await fileHandle.getFile();
      p._blobUrl = URL.createObjectURL(file);
      changed = true;
    } catch (e) {
      // File not found or permission error — leave _blobUrl empty, onerror handler shows placeholder
    }
  }
  if (changed) renderProductsTable();
}

// ============ 自动翻译（英→中）============
// 使用 Google 免费翻译接口，无需 API Key，适合本地后台低频使用。
// 如果网络不可用或请求失败会给出提示。

async function translateToZh(text) {
  if (!text || !text.trim()) return '';
  // 去除 HTML 标签（如果描述里含富文本，先转为纯文本再翻译）
  var plain = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  var url = 'https://translate.googleapis.com/translate_a/single' +
    '?client=gtx&sl=en&tl=zh-CN&dt=t&q=' + encodeURIComponent(plain);
  try {
    var resp = await fetch(url);
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    var data = await resp.json();
    // 响应格式：[[ ["翻译片段","原文",...], ...], ...]
    var result = '';
    if (data && data[0]) {
      data[0].forEach(function(part) { if (part && part[0]) result += part[0]; });
    }
    return result;
  } catch(e) {
    throw e;
  }
}

// translateField：读取源字段(input/textarea)的值，翻译后写入目标字段
// btnId 用于显示加载状态
async function translateField(sourceId, targetId, btnId) {
  var source = document.getElementById(sourceId);
  var target = document.getElementById(targetId);
  var btn    = btnId ? document.getElementById(btnId) : null;
  if (!source || !target) return;

  var text = source.value ? source.value.trim() : (source.textContent || '').trim();
  if (!text) { showToast('请先填写英文内容', 'error'); return; }

  // 超过2000字符时截断（避免接口限制）
  if (text.length > 2000) {
    text = text.substring(0, 2000);
    showToast('英文内容较长，仅翻译前2000字符', 'error');
  }

  if (btn) { btn.textContent = '⏳ 翻译中...'; btn.disabled = true; }

  try {
    var zh = await translateToZh(text);
    if (zh) {
      target.value = zh;
      showToast('翻译完成 ✅');
    } else {
      showToast('翻译返回空结果，请手动填写', 'error');
    }
  } catch(e) {
    showToast('翻译失败：' + (e.message || '请检查网络连接') + ' — 请手动填写中文', 'error');
  } finally {
    if (btn) { btn.textContent = '🌐 自动翻译英文'; btn.disabled = false; }
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ============ 图片上传 ============
function handleImageUpload(event) {
  var file = event.target.files[0];
  if (!file) return;

  // 检查文件类型和大小
  if (!file.type.startsWith('image/')) {
    showToast('请选择图片文件', 'error');
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    showToast('图片大小不能超过 10MB', 'error');
    return;
  }

  // 读取为 data URL 用于预览
  var reader = new FileReader();
  reader.onload = function(e) {
    var img = document.getElementById('imagePreviewImg');
    img.src = e.target.result;
    document.getElementById('imagePreview').style.display = 'block';
    // 自动填充文件名作为路径
    var pathInput = document.getElementById('productImage');
    if (!pathInput.value) {
      pathInput.value = 'images/' + file.name;
    }
  };
  reader.readAsDataURL(file);

  // 尝试保存到本地 images 文件夹（需要 File System Access API）
  trySaveImageToDisk(file);
}

function trySaveImageToDisk(file) {
  // 检查是否已有已选择的文件夹句柄
  if (!window._siteFolderHandle) {
    // 之前这里是静默返回，用户完全不知道图片其实没有真正保存到磁盘——
    // 现在改成明确提示，避免"保存产品"之后前端网站图片打不开还查不出原因。
    showToast('⚠️ 图片仅预览，尚未保存到磁盘！请先"选择网站文件夹"连接 aec-project，再重新选择这张图片', 'error');
    return;
  }

  window._siteFolderHandle.getDirectoryHandle('images', { create: true }).then(function(imagesDir) {
    return imagesDir.getFileHandle(file.name, { create: true });
  }).then(function(fileHandle) {
    return fileHandle.createWritable();
  }).then(function(writable) {
    return writable.write(file).then(function() { return writable.close(); });
  }).then(function() {
    showToast('✅ 图片已真实保存到 aec-project/images/' + file.name);
  }).catch(function(err) {
    showToast('⚠️ 图片保存到磁盘失败：' + err.message, 'error');
    console.warn('自动保存图片失败:', err.message);
  });
}

function clearImagePreview() {
  document.getElementById('imagePreview').style.display = 'none';
  document.getElementById('imagePreviewImg').src = '';
  document.getElementById('productImage').value = '';
  document.getElementById('productImageFile').value = '';
}

// ============ 富文本编辑器辅助 ============
function execRichCmd(editorId, cmd, value) {
  var el = document.getElementById(editorId);
  if (!el) return;
  el.focus();
  document.execCommand(cmd, false, value || null);
}

function insertRichTable(editorId) {
  var rows = parseInt(prompt('表格行数（含标题行）：', '3') || '0');
  var cols = parseInt(prompt('表格列数：', '3') || '0');
  if (!rows || !cols || rows < 1 || cols < 1) return;
  var html = '<table><thead><tr>';
  for (var c = 0; c < cols; c++) html += '<th>标题' + (c + 1) + '</th>';
  html += '</tr></thead><tbody>';
  for (var r = 1; r < rows; r++) {
    html += '<tr>';
    for (var cc = 0; cc < cols; cc++) html += '<td>&nbsp;</td>';
    html += '</tr>';
  }
  html += '</tbody></table><p><br></p>';
  var el = document.getElementById(editorId);
  if (!el) return;
  el.focus();
  document.execCommand('insertHTML', false, html);
}

function insertRichLink(editorId) {
  var url = prompt('链接地址（如 https://...）：', 'https://');
  if (!url) return;
  var text = prompt('链接显示文字：', url);
  if (!text) text = url;
  var html = '<a href="' + escapeHtml(url) + '" target="_blank">' + escapeHtml(text) + '</a>';
  var el = document.getElementById(editorId);
  if (!el) return;
  el.focus();
  document.execCommand('insertHTML', false, html);
}

function insertRichHRule(editorId) {
  var el = document.getElementById(editorId);
  if (!el) return;
  el.focus();
  document.execCommand('insertHTML', false, '<hr><p><br></p>');
}

function insertTechSpecsTemplate(editorId) {
  var html = '<h2>产品技术参数</h2>' +
    '<table><thead><tr><th>项目</th><th>参数</th><th>单位</th></tr></thead><tbody>' +
    '<tr><td>厚度范围</td><td>&nbsp;</td><td>μm</td></tr>' +
    '<tr><td>宽度范围</td><td>&nbsp;</td><td>mm</td></tr>' +
    '<tr><td>卷芯直径</td><td>&nbsp;</td><td>mm</td></tr>' +
    '<tr><td>最大卷径</td><td>&nbsp;</td><td>mm</td></tr>' +
    '</tbody></table>' +
    '<h3>物理性能</h3>' +
    '<table><thead><tr><th>性能指标</th><th>数值（MD）</th><th>数值（TD）</th><th>单位</th></tr></thead><tbody>' +
    '<tr><td>拉伸强度</td><td>&nbsp;</td><td>&nbsp;</td><td>MPa</td></tr>' +
    '<tr><td>断裂伸长率</td><td>&nbsp;</td><td>&nbsp;</td><td>%</td></tr>' +
    '<tr><td>热收缩率</td><td>&nbsp;</td><td>&nbsp;</td><td>%</td></tr>' +
    '</tbody></table>' +
    '<h3>光学性能</h3>' +
    '<table><thead><tr><th>性能指标</th><th>数值</th><th>单位</th></tr></thead><tbody>' +
    '<tr><td>雾度</td><td>&nbsp;</td><td>%</td></tr>' +
    '<tr><td>透光率</td><td>&nbsp;</td><td>%</td></tr>' +
    '<tr><td>光泽度</td><td>&nbsp;</td><td>GU</td></tr>' +
    '</tbody></table>' +
    '<p><br></p>';
  var el = document.getElementById(editorId);
  if (!el) return;
  el.focus();
  document.execCommand('insertHTML', false, html);
}

// ============ 查重功能 ============
function showDuplicatesPanel() {
  var panel = document.getElementById('duplicatesPanel');
  var result = document.getElementById('duplicatesResult');
  panel.style.display = 'block';

  var products = APP_DATA.products;

  // 1. 按英文名称（忽略大小写、去除首尾空格）查重
  var nameMap = {};
  products.forEach(function(p) {
    var key = (p.nameEn || '').trim().toLowerCase();
    if (!key) return;
    if (!nameMap[key]) nameMap[key] = [];
    nameMap[key].push(p);
  });

  // 2. 按 detailLink 查重（忽略空值）
  var linkMap = {};
  products.forEach(function(p) {
    var key = (p.detailLink || '').trim().toLowerCase();
    if (!key || key === '#') return;
    if (!linkMap[key]) linkMap[key] = [];
    linkMap[key].push(p);
  });

  var html = '';
  var totalGroups = 0;

  // Name duplicates
  Object.keys(nameMap).forEach(function(key) {
    var group = nameMap[key];
    if (group.length < 2) return;
    totalGroups++;
    html += '<div class="dup-group">';
    html += '<div class="dup-group-title">📛 相同名称：「' + escapeHtml(group[0].nameEn) + '」（' + group.length + ' 条）</div>';
    group.forEach(function(p) {
      var catPath = getCategoryPath(p.category).map(function(c) { return c.nameEn; }).join(' › ');
      html += '<div class="dup-item">' +
        '<input type="checkbox" onchange="toggleProductSelect(' + p.id + ',this.checked)" style="cursor:pointer;width:14px;height:14px;flex-shrink:0">' +
        '<span style="font-family:monospace;color:var(--gold)">#' + p.id + '</span>' +
        '<strong>' + escapeHtml(p.nameEn) + '</strong>' +
        '<span>' + escapeHtml(catPath) + '</span>' +
        '<span class="status-' + p.status + '">' + (p.status === 'active' ? '上架' : '下架') + '</span>' +
        '<button class="btn-edit btn-sm" onclick="editProduct(' + p.id + ')">✏️ 编辑</button>' +
        '<button class="btn-danger btn-sm" onclick="deleteProduct(' + p.id + ')">🗑 删除</button>' +
      '</div>';
    });
    html += '</div>';
  });

  // Link duplicates (skip if already shown as name dup)
  Object.keys(linkMap).forEach(function(key) {
    var group = linkMap[key];
    if (group.length < 2) return;
    // Check if all IDs are already covered by a name-dup group
    totalGroups++;
    html += '<div class="dup-group">';
    html += '<div class="dup-group-title">🔗 相同链接：「' + escapeHtml(key) + '」（' + group.length + ' 条）</div>';
    group.forEach(function(p) {
      var catPath = getCategoryPath(p.category).map(function(c) { return c.nameEn; }).join(' › ');
      html += '<div class="dup-item">' +
        '<input type="checkbox" onchange="toggleProductSelect(' + p.id + ',this.checked)" style="cursor:pointer;width:14px;height:14px;flex-shrink:0">' +
        '<span style="font-family:monospace;color:var(--gold)">#' + p.id + '</span>' +
        '<strong>' + escapeHtml(p.nameEn) + '</strong>' +
        '<span>' + escapeHtml(catPath) + '</span>' +
        '<span class="status-' + p.status + '">' + (p.status === 'active' ? '上架' : '下架') + '</span>' +
        '<button class="btn-edit btn-sm" onclick="editProduct(' + p.id + ')">✏️ 编辑</button>' +
        '<button class="btn-danger btn-sm" onclick="deleteProduct(' + p.id + ')">🗑 删除</button>' +
      '</div>';
    });
    html += '</div>';
  });

  if (totalGroups === 0) {
    html = '<p style="color:var(--green);padding:8px 0">✅ 未发现重复产品！所有产品名称和链接均唯一。</p>';
  } else {
    html = '<p style="color:#e86450;margin-bottom:12px">发现 <strong>' + totalGroups + '</strong> 组重复，请逐一检查并删除多余条目：</p>' + html;
  }

  result.innerHTML = html;
  panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
