// Local Database Server - Uses JSON file as database
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const DB_PATH = path.join(__dirname, 'database.json');

// Read database
function readDB() {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return { products: [], categories: [], pages: [], company: {}, users: [] };
  }
}

// Write database
function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

// Parse URL and query
function parseUrl(url) {
  const [pathname, queryString] = url.split('?');
  const params = {};
  if (queryString) {
    queryString.split('&').forEach(pair => {
      const [key, value] = pair.split('=');
      params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    });
  }
  return { pathname, params };
}

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.writeHead(200).end();
  }

  const { pathname, params } = parseUrl(req.url);
  const db = readDB();

  // API Routes
  if (pathname === '/api/db' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { table, action, data, id, where } = JSON.parse(body);
        let result = [];

        switch (action) {
          case 'select':
            if (table === 'products') {
              result = db.products;
              if (where && where.category) {
                result = result.filter(p => p.category === where.category);
              }
            } else if (table === 'categories') {
              result = db.categories;
            } else if (table === 'pages') {
              result = db.pages;
            } else if (table === 'company') {
              result = [db.company];
            }
            break;

          case 'insert':
            if (table === 'products') {
              const newId = db.products.length > 0 ? Math.max(...db.products.map(p => p.id)) + 1 : 1;
              const newProduct = { ...data, id: newId, is_active: true, sort_order: db.products.length };
              db.products.push(newProduct);
              writeDB(db);
              result = [newProduct];
            } else if (table === 'categories') {
              const newId = db.categories.length > 0 ? Math.max(...db.categories.map(c => c.id)) + 1 : 1;
              const newCategory = { ...data, id: newId, sort_order: db.categories.length };
              db.categories.push(newCategory);
              writeDB(db);
              result = [newCategory];
            } else if (table === 'pages') {
              const newId = db.pages.length > 0 ? Math.max(...db.pages.map(p => p.id)) + 1 : 1;
              const newPage = { ...data, id: newId };
              db.pages.push(newPage);
              writeDB(db);
              result = [newPage];
            }
            break;

          case 'update':
            if (table === 'products') {
              const index = db.products.findIndex(p => p.id === id);
              if (index !== -1) {
                db.products[index] = { ...db.products[index], ...data };
                writeDB(db);
                result = [db.products[index]];
              }
            } else if (table === 'company') {
              db.company = { ...db.company, ...data };
              writeDB(db);
              result = [db.company];
            }
            break;

          case 'delete':
            if (table === 'products') {
              db.products = db.products.filter(p => p.id !== id);
              writeDB(db);
              result = [{ success: true }];
            } else if (table === 'categories') {
              db.categories = db.categories.filter(c => c.id !== id);
              writeDB(db);
              result = [{ success: true }];
            }
            break;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, data: result }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  // Health check
  if (pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', products: db.products.length }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`Database server running at http://localhost:${PORT}`);
  console.log(`Products in database: ${readDB().products.length}`);
});
