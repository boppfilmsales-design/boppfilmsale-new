// Admin Panel JavaScript
const API_BASE = '/api';

// State
let currentUser = null;
let authToken = null;
let currentCategoryId = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  // Check for saved session
  const savedToken = localStorage.getItem('admin_token');
  if (savedToken) {
    authToken = savedToken;
    showDashboard();
    loadDashboard();
  }

  // Login form handler
  document.getElementById('loginForm').addEventListener('submit', handleLogin);

  // Product form handler
  document.getElementById('productForm').addEventListener('submit', handleProductSave);

  // Category form handler
  document.getElementById('categoryForm').addEventListener('submit', handleCategorySave);

  // Page form handler
  document.getElementById('pageForm').addEventListener('submit', handlePageSave);
});

// Login
async function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.success) {
      authToken = data.token;
      currentUser = data.user;
      localStorage.setItem('admin_token', authToken);
      document.getElementById('loginError').style.display = 'none';
      showDashboard();
      loadDashboard();
    } else {
      document.getElementById('loginError').style.display = 'block';
    }
  } catch (error) {
    console.error('Login error:', error);
    document.getElementById('loginError').textContent = 'Login failed. Please try again.';
    document.getElementById('loginError').style.display = 'block';
  }
}

// Logout
function logout() {
  localStorage.removeItem('admin_token');
  authToken = null;
  currentUser = null;
  document.getElementById('adminDashboard').style.display = 'none';
  document.getElementById('loginPage').style.display = 'flex';
}

// Show Dashboard
function showDashboard() {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('adminDashboard').style.display = 'block';
}

// Navigation
function showPage(pageName) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  // Show selected page
  document.getElementById(`page-${pageName}`).style.display = 'block';
  // Update nav
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  event.target.classList.add('active');

  // Load page data
  switch(pageName) {
    case 'dashboard': loadDashboard(); break;
    case 'products': loadProducts(); break;
    case 'categories': loadCategories(); break;
    case 'pages': loadPages(); break;
    case 'messages': loadMessages(); break;
    case 'settings': loadSettings(); break;
  }
}

// Load Dashboard
async function loadDashboard() {
  try {
    const [productsRes, categoriesRes, messagesRes] = await Promise.all([
      fetch(`${API_BASE}/products?limit=100`),
      fetch(`${API_BASE}/categories`),
      fetch(`${API_BASE}/messages`)
    ]);

    const products = await productsRes.json();
    const categories = await categoriesRes.json();
    const messages = await messagesRes.json();

    document.getElementById('stat-products').textContent = products.total || 0;
    document.getElementById('stat-categories').textContent = categories.categories?.length || 0;
    document.getElementById('stat-messages').textContent = messages.messages?.filter(m => !m.is_read).length || 0;
    document.getElementById('stat-pages').textContent = 0;

    // Recent products
    const tbody = document.getElementById('recentProducts');
    tbody.innerHTML = (products.products || []).slice(0, 5).map(p => `
      <tr>
        <td>${p.name_en}</td>
        <td>${p.category_name_en || '-'}</td>
        <td>${p.price || '-'}</td>
        <td>${new Date(p.updated_at).toLocaleDateString()}</td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Dashboard load error:', error);
  }
}

// Load Products
async function loadProducts() {
  try {
    const res = await fetch(`${API_BASE}/products?limit=100`);
    const data = await res.json();

    const tbody = document.getElementById('productsTable');
    tbody.innerHTML = (data.products || []).map(p => `
      <tr>
        <td>${p.icon || '📦'}</td>
        <td>${p.name_en}</td>
        <td>${p.category_name_en || '-'}</td>
        <td>${p.price || '-'}</td>
        <td><span style="color:${p.is_active ? '#2e7d32' : '#e53e3e'}">${p.is_active ? 'Active' : 'Inactive'}</span></td>
        <td>
          <button class="btn btn-sm btn-secondary" onclick="editProduct(${p.id})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteProduct(${p.id})">Delete</button>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Products load error:', error);
  }
}

// Load Categories
async function loadCategories() {
  try {
    const res = await fetch(`${API_BASE}/categories`);
    const data = await res.json();

    const tbody = document.getElementById('categoriesTable');
    tbody.innerHTML = (data.categories || []).map(c => `
      <tr>
        <td>${c.icon || '📁'}</td>
        <td>${c.name_en}</td>
        <td>${c.name_zh || '-'}</td>
        <td>${c.slug}</td>
        <td>${c.product_count || 0}</td>
        <td><span style="color:${c.is_active ? '#2e7d32' : '#e53e3e'}">${c.is_active ? 'Active' : 'Inactive'}</span></td>
        <td>
          <button class="btn btn-sm btn-secondary" onclick="editCategory(${c.id})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteCategory(${c.id})">Delete</button>
        </td>
      </tr>
    `).join('');

    // Update category dropdown in product modal
    const select = document.getElementById('productCategory');
    select.innerHTML = '<option value="">Select Category</option>' +
      (data.categories || []).map(c => `<option value="${c.id}">${c.name_en}</option>`).join('');
  } catch (error) {
    console.error('Categories load error:', error);
  }
}

// Load Pages
async function loadPages() {
  try {
    const res = await fetch(`${API_BASE}/pages`);
    const data = await res.json();

    const tbody = document.getElementById('pagesTable');
    tbody.innerHTML = (data.pages || []).map(p => `
      <tr>
        <td>${p.title_en}</td>
        <td>${p.slug}</td>
        <td><span style="color:${p.is_published ? '#2e7d32' : '#e53e3e'}">${p.is_published ? 'Published' : 'Draft'}</span></td>
        <td>${new Date(p.updated_at).toLocaleDateString()}</td>
        <td>
          <button class="btn btn-sm btn-secondary" onclick="editPage(${p.id})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deletePage(${p.id})">Delete</button>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Pages load error:', error);
  }
}

// Load Messages
async function loadMessages() {
  try {
    const res = await fetch(`${API_BASE}/messages`);
    const data = await res.json();

    const tbody = document.getElementById('messagesTable');
    tbody.innerHTML = (data.messages || []).map(m => `
      <tr>
        <td>${m.name}</td>
        <td>${m.email}</td>
        <td>${m.phone || '-'}</td>
        <td>${m.message?.substring(0, 50)}...</td>
        <td>${new Date(m.created_at).toLocaleDateString()}</td>
        <td><span style="color:${m.is_read ? '#2e7d32' : '#e53e3e'}">${m.is_read ? 'Read' : 'New'}</span></td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Messages load error:', error);
  }
}

// Load Settings
async function loadSettings() {
  try {
    const res = await fetch(`${API_BASE}/settings`);
    const data = await res.json();

    const form = document.getElementById('settingsForm');
    form.innerHTML = Object.entries(data.settings || {}).map(([key, value]) => `
      <div class="form-group">
        <label>${key}</label>
        <input type="text" id="setting-${key}" value="${value || ''}">
      </div>
    `).join('');
  } catch (error) {
    console.error('Settings load error:', error);
  }
}

// Save Settings
async function saveSettings() {
  const inputs = document.querySelectorAll('#settingsForm input');
  const settings = {};

  for (const input of inputs) {
    const key = input.id.replace('setting-', '');
    settings[key] = input.value;

    try {
      await fetch(`${API_BASE}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value: input.value })
      });
    } catch (error) {
      console.error('Save setting error:', error);
    }
  }

  showToast('Settings saved successfully!', 'success');
}

// Product Modal
function openProductModal(categoryId = null) {
  currentCategoryId = categoryId;
  document.getElementById('productModalTitle').textContent = 'Add Product';
  document.getElementById('productForm').reset();
  document.getElementById('productId').value = '';
  document.getElementById('productModal').classList.add('active');
}

async function editProduct(id) {
  try {
    const res = await fetch(`${API_BASE}/products?id=${id}`);
    const data = await res.json();
    const p = data.product;

    document.getElementById('productModalTitle').textContent = 'Edit Product';
    document.getElementById('productId').value = p.id;
    document.getElementById('productNameEn').value = p.name_en || '';
    document.getElementById('productNameZh').value = p.name_zh || '';
    document.getElementById('productCategory').value = p.category_id || '';
    document.getElementById('productSlug').value = p.slug || '';
    document.getElementById('productTag').value = p.tag || '';
    document.getElementById('productPrice').value = p.price || '';
    document.getElementById('productDescEn').value = p.description_en || '';
    document.getElementById('productDescZh').value = p.description_zh || '';
    document.getElementById('productIcon').value = p.icon || '';
    document.getElementById('productSort').value = p.sort_order || 0;

    document.getElementById('productModal').classList.add('active');
  } catch (error) {
    console.error('Edit product error:', error);
  }
}

async function handleProductSave(e) {
  e.preventDefault();

  const id = document.getElementById('productId').value;
  const data = {
    name_en: document.getElementById('productNameEn').value,
    name_zh: document.getElementById('productNameZh').value,
    category_id: document.getElementById('productCategory').value,
    slug: document.getElementById('productSlug').value,
    tag: document.getElementById('productTag').value,
    price: document.getElementById('productPrice').value,
    description_en: document.getElementById('productDescEn').value,
    description_zh: document.getElementById('productDescZh').value,
    icon: document.getElementById('productIcon').value,
    sort_order: parseInt(document.getElementById('productSort').value) || 0
  };

  try {
    const url = id ? `${API_BASE}/products?id=${id}` : `${API_BASE}/products`;
    const method = id ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      showToast('Product saved successfully!', 'success');
      closeModal('productModal');
      loadProducts();
      loadDashboard();
    } else {
      const err = await res.json();
      showToast(err.error || 'Failed to save product', 'error');
    }
  } catch (error) {
    showToast('Failed to save product', 'error');
  }
}

async function deleteProduct(id) {
  if (!confirm('Are you sure you want to delete this product?')) return;

  try {
    const res = await fetch(`${API_BASE}/products?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      showToast('Product deleted successfully!', 'success');
      loadProducts();
      loadDashboard();
    }
  } catch (error) {
    showToast('Failed to delete product', 'error');
  }
}

// Category Modal
function openCategoryModal() {
  document.getElementById('categoryModalTitle').textContent = 'Add Category';
  document.getElementById('categoryForm').reset();
  document.getElementById('categoryId').value = '';
  document.getElementById('categoryModal').classList.add('active');
}

async function editCategory(id) {
  try {
    const res = await fetch(`${API_BASE}/categories?id=${id}`);
    const data = await res.json();
    const c = data.category;

    document.getElementById('categoryModalTitle').textContent = 'Edit Category';
    document.getElementById('categoryId').value = c.id;
    document.getElementById('categoryNameEn').value = c.name_en || '';
    document.getElementById('categoryNameZh').value = c.name_zh || '';
    document.getElementById('categorySlug').value = c.slug || '';
    document.getElementById('categoryIcon').value = c.icon || '';
    document.getElementById('categoryDescEn').value = c.description_en || '';
    document.getElementById('categoryDescZh').value = c.description_zh || '';

    document.getElementById('categoryModal').classList.add('active');
  } catch (error) {
    console.error('Edit category error:', error);
  }
}

async function handleCategorySave(e) {
  e.preventDefault();

  const id = document.getElementById('categoryId').value;
  const data = {
    name_en: document.getElementById('categoryNameEn').value,
    name_zh: document.getElementById('categoryNameZh').value,
    slug: document.getElementById('categorySlug').value,
    icon: document.getElementById('categoryIcon').value,
    description_en: document.getElementById('categoryDescEn').value,
    description_zh: document.getElementById('categoryDescZh').value
  };

  try {
    const url = id ? `${API_BASE}/categories?id=${id}` : `${API_BASE}/categories`;
    const method = id ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      showToast('Category saved successfully!', 'success');
      closeModal('categoryModal');
      loadCategories();
      loadDashboard();
    } else {
      const err = await res.json();
      showToast(err.error || 'Failed to save category', 'error');
    }
  } catch (error) {
    showToast('Failed to save category', 'error');
  }
}

async function deleteCategory(id) {
  if (!confirm('Are you sure you want to delete this category?')) return;

  try {
    const res = await fetch(`${API_BASE}/categories?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      showToast('Category deleted successfully!', 'success');
      loadCategories();
      loadDashboard();
    }
  } catch (error) {
    showToast('Failed to delete category', 'error');
  }
}

// Page Modal
function openPageModal() {
  document.getElementById('pageModalTitle').textContent = 'Add Page';
  document.getElementById('pageForm').reset();
  document.getElementById('pageId').value = '';
  document.getElementById('pageModal').classList.add('active');
}

async function editPage(id) {
  try {
    const res = await fetch(`${API_BASE}/pages?id=${id}`);
    const data = await res.json();
    const p = data.page;

    document.getElementById('pageModalTitle').textContent = 'Edit Page';
    document.getElementById('pageId').value = p.id;
    document.getElementById('pageTitleEn').value = p.title_en || '';
    document.getElementById('pageTitleZh').value = p.title_zh || '';
    document.getElementById('pageSlug').value = p.slug || '';
    document.getElementById('pageContentEn').value = p.content_en || '';
    document.getElementById('pageContentZh').value = p.content_zh || '';

    document.getElementById('pageModal').classList.add('active');
  } catch (error) {
    console.error('Edit page error:', error);
  }
}

async function handlePageSave(e) {
  e.preventDefault();

  const id = document.getElementById('pageId').value;
  const data = {
    title_en: document.getElementById('pageTitleEn').value,
    title_zh: document.getElementById('pageTitleZh').value,
    slug: document.getElementById('pageSlug').value,
    content_en: document.getElementById('pageContentEn').value,
    content_zh: document.getElementById('pageContentZh').value
  };

  try {
    const url = id ? `${API_BASE}/pages?id=${id}` : `${API_BASE}/pages`;
    const method = id ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      showToast('Page saved successfully!', 'success');
      closeModal('pageModal');
      loadPages();
    } else {
      const err = await res.json();
      showToast(err.error || 'Failed to save page', 'error');
    }
  } catch (error) {
    showToast('Failed to save page', 'error');
  }
}

async function deletePage(id) {
  if (!confirm('Are you sure you want to delete this page?')) return;

  try {
    const res = await fetch(`${API_BASE}/pages?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      showToast('Page deleted successfully!', 'success');
      loadPages();
    }
  } catch (error) {
    showToast('Failed to delete page', 'error');
  }
}

// Modal Helpers
function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}

// Toast Notification
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type}`;
  toast.style.display = 'block';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);
}

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', function(e) {
    if (e.target === this) {
      this.classList.remove('active');
    }
  });
});
