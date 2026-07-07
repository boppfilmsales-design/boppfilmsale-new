// ============================================================
// api-bridge.js — Online mode for admin panel
// When admin is deployed on Vercel, this script overrides
// local file operations with API calls to NeonDB.
// ============================================================
(function() {
  'use strict';

  // ── Detect if we're online ──────────────────────────────
  var isOnline = window.location.hostname !== 'localhost' &&
                 window.location.hostname !== '127.0.0.1' &&
                 !window.location.href.startsWith('file://');

  if (!isOnline) {
    console.log('[API Bridge] Local mode — keeping file system access');
    return; // Keep existing local behavior
  }

  console.log('[API Bridge] Online mode — using API for data operations');

  var API_BASE = window.location.origin + '/api/data';
  var LOADED_FROM_API = false;

  // ── Helper: fetch wrapper ───────────────────────────────
  async function apiCall(method, body) {
    var opts = {
      method: method,
      headers: { 'Content-Type': 'application/json' }
    };
    if (body) opts.body = JSON.stringify(body);

    var resp = await fetch(API_BASE, opts);
    if (!resp.ok) {
      var err = await resp.text();
      throw new Error('API error: ' + err);
    }
    return await resp.json();
  }

  // ── Load data from API ──────────────────────────────────
  async function loadDataFromApi() {
    try {
      var result = await apiCall('GET');
      if (result.success && result.data) {
        var d = result.data;
        if (d.products) APP_DATA.products = d.products;
        if (d.categories) APP_DATA.categories = d.categories;
        if (d.company) APP_DATA.company = d.company;
        if (d.headerFooter) APP_DATA.headerFooter = d.headerFooter;
        LOADED_FROM_API = true;
        console.log('[API Bridge] Loaded data from API:',
          (d.products || []).length, 'products,',
          (d.categories || []).length, 'categories');
        return true;
      }
    } catch (e) {
      console.error('[API Bridge] Failed to load from API:', e);
    }
    return false;
  }

  // ── Save data to API ────────────────────────────────────
  async function saveDataToApi(data) {
    try {
      var result = await apiCall('POST', { data: data });
      if (result.success) {
        console.log('[API Bridge] Data saved to API');
        return true;
      }
    } catch (e) {
      console.error('[API Bridge] Failed to save to API:', e);
    }
    return false;
  }

  // ── Build full dataset ──────────────────────────────────
  function buildFullData() {
    return {
      products: APP_DATA.products || [],
      categories: APP_DATA.categories || [],
      company: APP_DATA.company || {},
      headerFooter: APP_DATA.headerFooter || {}
    };
  }

  // ── OVERRIDE: loadData ──────────────────────────────────
  // Replace the original loadData with one that tries API first
  var originalLoadData = window.loadData;
  window.loadData = async function() {
    // Try API first
    var apiOk = await loadDataFromApi();

    if (apiOk) {
      // Still run localStorage restore for any extra state
      try {
        var saved = localStorage.getItem('aecAdmin_products');
        if (saved) {
          var parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0 &&
              parsed.length <= APP_DATA.products.length * 1.5) {
            // Merge any extra fields from localStorage that API might not have
            // But prefer API data
          }
        }
      } catch(e) {}

      // Update UI
      updateDashboard();
      renderProductsTable();
      renderCategoriesTable();
      loadCompanyInfo();

      // Update status indicator
      var statusEl = document.getElementById('statusIndicator');
      if (statusEl) {
        statusEl.innerHTML = '● 在线模式（已从云端加载 ' + APP_DATA.products.length + ' 个产品）';
        statusEl.style.color = '#28F064';
      }
      var lastSave = document.getElementById('lastSave');
      if (lastSave) lastSave.textContent = new Date().toLocaleString('zh-CN');

      return;
    }

    // Fallback to original loadData
    if (typeof originalLoadData === 'function') {
      await originalLoadData();
      // Still mark as online-available
    }
  };

  // ── OVERRIDE: saveAllData ───────────────────────────────
  var originalSaveAll = window.saveAllData;
  window.saveAllData = async function() {
    // Save to localStorage (quick)
    if (window.saveProductsToStorage) saveProductsToStorage();
    if (window.saveCategoriesToStorage) saveCategoriesToStorage();
    if (window.saveCompanyToStorage) saveCompanyToStorage();
    if (window.saveHeaderFooterToStorage) saveHeaderFooterToStorage();

    // Save to API
    var fullData = buildFullData();
    var apiOk = await saveDataToApi(fullData);

    var now = new Date().toLocaleString('zh-CN');
    localStorage.setItem('aecAdmin_lastSave', now);
    var lastSaveEl = document.getElementById('lastSave');
    if (lastSaveEl) lastSaveEl.textContent = now;

    var statusEl = document.getElementById('statusIndicator');
    if (apiOk) {
      if (statusEl) {
        statusEl.innerHTML = '● 已保存到云端 ✅ ' + now;
        statusEl.style.color = '#28F064';
      }
      showToast('✅ 数据已保存到云端！刷新前端页面即可看到更新');
    } else {
      if (statusEl) {
        statusEl.innerHTML = '⚠️ 保存到云端失败';
        statusEl.style.color = '#ff9800';
      }
      showToast('❌ 云端保存失败，请重试', 'error');
    }
  };

  // ── OVERRIDE: syncToFrontend ────────────────────────────
  window.syncToFrontend = async function() {
    // When online, sync = save to API
    var fullData = buildFullData();
    var apiOk = await saveDataToApi(fullData);
    if (apiOk) {
      showToast('✅ 数据已同步到云端！前端网站下次刷新将显示最新内容');
    } else {
      showToast('❌ 同步失败，请重试', 'error');
    }
  };

  // ── OVERRIDE: writeProductsDataToDisk → save to API ────
  window.writeProductsDataToDisk = async function(silent, force) {
    var fullData = buildFullData();
    var apiOk = await saveDataToApi(fullData);
    if (apiOk) {
      if (!silent) showToast('✅ 已保存到云端');
      return true;
    }
    if (!silent) showToast('❌ 保存到云端失败', 'error');
    return false;
  };

  // ── OVERRIDE: selectFolder — disabled in online mode ──
  window.selectFolder = function() {
    showToast('ℹ️ 在线模式下无需连接文件夹，数据直接保存到云端');
  };

  // ── OVERRIDE: exportData ────────────────────────────────
  var originalExport = window.exportData;
  window.exportData = function() {
    var data = buildFullData();
    data.version = '2.0';
    data.exportDate = new Date().toISOString();
    var json = JSON.stringify(data, null, 2);
    var blob = new Blob([json], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'aec-backup-' + new Date().toISOString().slice(0, 10) + '.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('数据已导出 📤');
  };

  // ── Add online badge to UI ──────────────────────────────
  function addOnlineBadge() {
    var sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    var badge = document.createElement('div');
    badge.style.cssText = 'padding:8px 16px;margin:4px 12px;border-radius:6px;background:rgba(40,240,100,0.12);border:1px solid rgba(40,240,100,0.3);font-size:12px;color:#28F064;text-align:center';
    badge.innerHTML = '🌐 云模式 | 数据保存到云端';
    var saveBtn = document.querySelector('.btn-save-all');
    if (saveBtn && saveBtn.parentNode) {
      saveBtn.parentNode.insertBefore(badge, saveBtn);
    }
  }

  // ── Init after DOM ready ────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addOnlineBadge);
  } else {
    addOnlineBadge();
  }

})();
